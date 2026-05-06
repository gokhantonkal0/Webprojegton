// ==========================================
// MQTT KAHOOT BENZERİ CANLI QUIZ MOTORU
// Host/moderatör kalktı.
// Oda sahibi de oyuncudur.
// Herkes cevap verince veya süre bitince soru otomatik geçer.
// Canı biten elenir.
// ==========================================

const MQTT_BROKER = "wss://broker.hivemq.com:8884/mqtt";
let mqttClient;

let odaKodu = "";
let oyuncuID = "";
let oyuncuAdi = "";
let odaSahibiMi = false;

let suAnkiSoruSirasi = 0;
let zamanSayaci;
let kalanSure = 20;
let toplamPuanim = 0;
let canSayisi = 3;

let hostOyuncuListesi = {};
let aktifSoruCevaplari = {};
let oyunBasladiMi = false;

let soruHavuzu = [
    { soru: "HTML'in açılımı nedir?", secenekler: ["Hyper Text Markup Language", "High Text Machine Language", "Hyper Tabular Markup Language", "Hiçbiri"], dogruCevap: 0, kategori: "HTML", zorluk: "Kolay" },
    { soru: "Web sayfasına resim eklemek için hangi HTML etiketi kullanılır?", secenekler: ["<image>", "<img>", "<pic>", "<src>"], dogruCevap: 1, kategori: "HTML", zorluk: "Kolay" },
    { soru: "Bir link oluşturmak için hangi HTML etiketi kullanılır?", secenekler: ["<link>", "<a>", "<href>", "<url>"], dogruCevap: 1, kategori: "HTML", zorluk: "Kolay" },
    { soru: "CSS'de arka plan rengini değiştirmek için hangi özellik kullanılır?", secenekler: ["color", "bgcolor", "background-color", "background-image"], dogruCevap: 2, kategori: "CSS", zorluk: "Kolay" },
    { soru: "CSS'de margin özelliği ne işe yarar?", secenekler: ["İç boşluk ayarlar", "Dış boşluk ayarlar", "Kenarlık belirler", "Genişlik ayarlar"], dogruCevap: 1, kategori: "CSS", zorluk: "Orta" },
    { soru: "Hangi CSS özelliği metnin altını çizer?", secenekler: ["text-decoration: underline;", "font-style: italic;", "text-transform: capitalize;", "text-decoration: line-through;"], dogruCevap: 0, kategori: "CSS", zorluk: "Kolay" },
    { soru: "JavaScript'te değişken tanımlamak için hangisi kullanılır?", secenekler: ["variable", "let", "v", "dim"], dogruCevap: 1, kategori: "JS", zorluk: "Kolay" },
    { soru: "Konsola mesaj yazdırmak için hangi JavaScript komutu kullanılır?", secenekler: ["console.log()", "print()", "echo()", "console.print()"], dogruCevap: 0, kategori: "JS", zorluk: "Kolay" },
    { soru: "HTML elementini ID'sine göre seçmek için hangi JS metodu kullanılır?", secenekler: ["getElementByName()", "querySelector('#id')", "getElementById()", "İkisi de 2 ve 3"], dogruCevap: 3, kategori: "JS", zorluk: "Orta" },
    { soru: "Bootstrap 5 grid sisteminde bir satır en fazla kaç sütuna ayrılır?", secenekler: ["10", "12", "14", "16"], dogruCevap: 1, kategori: "Bootstrap", zorluk: "Kolay" },
    { soru: "Bootstrap'te mavi buton için hangi class kullanılır?", secenekler: ["btn-blue", "btn-info", "btn-primary", "btn-success"], dogruCevap: 2, kategori: "Bootstrap", zorluk: "Kolay" },
    { soru: "Bootstrap'te metni ortalamak için hangi class kullanılır?", secenekler: ["align-center", "text-center", "center-block", "justify-center"], dogruCevap: 1, kategori: "Bootstrap", zorluk: "Orta" },
    { soru: "jQuery'de HTML elementi seçmek için genelde hangi işaret kullanılır?", secenekler: ["$", "#", "@", "&"], dogruCevap: 0, kategori: "jQuery", zorluk: "Kolay" },
    { soru: "jQuery ile elementi gizlemek için hangi metot kullanılır?", secenekler: ["hide()", "displayNone()", "invisible()", "remove()"], dogruCevap: 0, kategori: "jQuery", zorluk: "Orta" },
    { soru: "jQuery'de click olayını yakalamak için hangi metot kullanılır?", secenekler: ["onclick()", "onClick()", "click()", "bindClick()"], dogruCevap: 2, kategori: "jQuery", zorluk: "Kolay" }
];

$(window).on("load", function () {
    setTimeout(() => {
        $("#loading-ekrani").fadeOut(400, function () {
            $(this).remove();
        });
    }, 400);
});

$(document).ready(function () {
    mqttClient = mqtt.connect(MQTT_BROKER);

    mqttClient.on("connect", function () {
        console.log("MQTT bağlandı");
    });

    mqttClient.on("message", function (topic, message) {
        let veri;
        try {
            veri = JSON.parse(message.toString());
        } catch (e) {
            return;
        }

        let kanal = topic.split("/").pop();

        if (kanal === "OyuncuKatil" && odaSahibiMi) {
            oyuncuListeyeEkle(veri);
        }

        if (kanal === "OyuncuCevap" && odaSahibiMi) {
            oyuncuCevabiniIsle(veri);
        }

        if (kanal === "OyunDurumu") {
            oyunDurumunuYorumla(veri);
        }

        if (kanal === "Liderlik") {
            ortakLiderlikTablosunuCiz(veri);
            if (veri[oyuncuID]) {
                toplamPuanim = veri[oyuncuID].puan;
                canSayisi = veri[oyuncuID].can;
                $("#puan-gosterge").text(`Puan: ${toplamPuanim}`);
                canlariGuncelle();
            }
        }
    });

    const urlParams = new URLSearchParams(window.location.search);
    const urlOdaKodu = urlParams.get("room");

    if (urlOdaKodu) {
        $("#rol-secim-ekrani").addClass("d-none");
        $("#oyuncu-giris-ekrani").removeClass("d-none");
        $("#oyuncu-oda-kodu").val(urlOdaKodu.toUpperCase());
    }

    let bugun = new Date();
    let gIndex = (bugun.getFullYear() + bugun.getMonth() + bugun.getDate()) % soruHavuzu.length;
    $("#gunun-sorusu-metni").html(`<strong>[${soruHavuzu[gIndex].kategori}]</strong> ${guvenliYazi(soruHavuzu[gIndex].soru)}`);

    $("#btn-host-sec").click(() => odaOlusturEkrani());
    $("#btn-oyuncu-sec").click(() => {
        $("#rol-secim-ekrani").addClass("d-none");
        $("#oyuncu-giris-ekrani").removeClass("d-none");
    });

    $("#btn-oyuncu-katil").click(() => oyuncuOdayaGir(false));
    $("#btn-host-baslat").click(() => oyunuBaslat());
    $("#btn-host-sonraki").hide();
    $("#btn-host-bitir").click(() => oyunuBitir());

    $("#btn-dark-mode").click(function () {
        $("body").toggleClass("dark-mode");
    });

    $("#btn-modal-yeniden").click(() => {
        window.location.href = window.location.pathname;
    });

    $("#btn-admin-panel").click(() => {
        alert("Bu modda soru ekleme kapalıdır.");
    });
});

// ==========================================
// ODA OLUŞTURMA
// ==========================================

function odaOlusturEkrani() {
    $("#rol-secim-ekrani").addClass("d-none");
    $("#oyuncu-giris-ekrani").removeClass("d-none");

    odaKodu = Math.floor(100000 + Math.random() * 900000).toString();
    $("#oyuncu-oda-kodu").val(odaKodu);
    $("#oyuncu-oda-kodu").prop("disabled", true);

    odaSahibiMi = true;

    alert("Oda oluşturuldu. İsmini yazıp katıl. Odayı sen başlatacaksın ama sen de oyuncusun.");
}

// ==========================================
// OYUNCU GİRİŞİ
// ==========================================

function oyuncuOdayaGir() {
    odaKodu = $("#oyuncu-oda-kodu").val().trim().toUpperCase();
    oyuncuAdi = $("#oyuncu-ismi").val().trim();

    if (odaKodu.length !== 6 || oyuncuAdi === "") {
        alert("Geçerli oda kodu ve isim gir.");
        return;
    }

    oyuncuID = "oyuncu_" + Math.floor(Math.random() * 10000000);

    mqttClient.subscribe(`GTonkalQuiz/${odaKodu}/OyunDurumu`);
    mqttClient.subscribe(`GTonkalQuiz/${odaKodu}/Liderlik`);

    if (odaSahibiMi) {
        mqttClient.subscribe(`GTonkalQuiz/${odaKodu}/OyuncuKatil`);
        mqttClient.subscribe(`GTonkalQuiz/${odaKodu}/OyuncuCevap`);

        soruHavuzu.sort(() => Math.random() - 0.5);

        oyuncuListeyeEkle({
            id: oyuncuID,
            isim: oyuncuAdi,
            odaSahibi: true
        });

        mqttYayinla(`GTonkalQuiz/${odaKodu}/OyunDurumu`, {
            durum: "bekliyor",
            odaKodu: odaKodu
        });
    } else {
        mqttClient.publish(`GTonkalQuiz/${odaKodu}/OyuncuKatil`, JSON.stringify({
            id: oyuncuID,
            isim: oyuncuAdi,
            odaSahibi: false
        }));
    }

    lobiEkraniniGoster();
}

// ==========================================
// LOBİ
// ==========================================

function lobiEkraniniGoster() {
    $("#oyuncu-giris-ekrani").addClass("d-none");
    $("#host-lobi-ekrani").removeClass("d-none");

    $("#host-oda-kodu").text(odaKodu);

    let katilmaLinki = window.location.href.split("?")[0] + "?room=" + odaKodu;
    $("#host-join-link").attr("href", katilmaLinki).text(katilmaLinki);

    $("#qrcode").empty();
    if (typeof QRCode !== "undefined") {
        new QRCode(document.getElementById("qrcode"), {
            text: katilmaLinki,
            width: 200,
            height: 200
        });
    }

    if (odaSahibiMi) {
        $("#btn-host-baslat").show().prop("disabled", false);
    } else {
        $("#btn-host-baslat").hide();
    }

    $("#btn-host-sonraki").hide();
    $("#btn-host-bitir").hide();

    $("#oyuncu-bekleme-ekrani").removeClass("d-none");
}

// ==========================================
// ODA SAHİBİ OYUNCU LİSTESİ
// ==========================================

function oyuncuListeyeEkle(veri) {
    if (!hostOyuncuListesi[veri.id]) {
        hostOyuncuListesi[veri.id] = {
            id: veri.id,
            isim: veri.isim,
            puan: 0,
            can: 3,
            hayatta: true,
            cevapVerdi: false,
            odaSahibi: !!veri.odaSahibi
        };
    }

    liderligiYayinla();
}

function liderligiYayinla() {
    mqttYayinla(`GTonkalQuiz/${odaKodu}/Liderlik`, hostOyuncuListesi);

    let kisiSayisi = Object.keys(hostOyuncuListesi).length;
    $("#host-oyuncu-sayisi").text(kisiSayisi);
    $("#host-toplam-oyuncu").text(hayattaOyuncuSayisi());
}

// ==========================================
// OYUN BAŞLATMA
// ==========================================

function oyunuBaslat() {
    if (!odaSahibiMi) return;

    oyunBasladiMi = true;
    suAnkiSoruSirasi = 0;

    Object.keys(hostOyuncuListesi).forEach(id => {
        hostOyuncuListesi[id].puan = 0;
        hostOyuncuListesi[id].can = 3;
        hostOyuncuListesi[id].hayatta = true;
        hostOyuncuListesi[id].cevapVerdi = false;
    });

    liderligiYayinla();
    soruGonder(0);
}

// ==========================================
// SORU GÖNDERME
// ==========================================

function soruGonder(index) {
    if (!odaSahibiMi) return;

    if (index >= soruHavuzu.length || index >= 15) {
        oyunuBitir();
        return;
    }

    if (hayattaOyuncuSayisi() <= 1 && Object.keys(hostOyuncuListesi).length > 1) {
        oyunuBitir();
        return;
    }

    suAnkiSoruSirasi = index;
    aktifSoruCevaplari = {};

    Object.keys(hostOyuncuListesi).forEach(id => {
        hostOyuncuListesi[id].cevapVerdi = false;
    });

    liderligiYayinla();

    let soruObjesi = soruHavuzu[index];
    let bitisZamani = Date.now() + 20000;

    mqttYayinla(`GTonkalQuiz/${odaKodu}/OyunDurumu`, {
        durum: "soru",
        soruObjesi: soruObjesi,
        soruIndex: index,
        toplamSoru: Math.min(soruHavuzu.length, 15),
        bitisZamani: bitisZamani
    });

    odaSahibiIcinSureBaslat(index, bitisZamani);
}

function odaSahibiIcinSureBaslat(index, bitisZamani) {
    clearInterval(zamanSayaci);

    zamanSayaci = setInterval(() => {
        let kalanMs = bitisZamani - Date.now();
        kalanSure = Math.ceil(kalanMs / 1000);

        if (kalanSure <= 0) {
            clearInterval(zamanSayaci);
            cevapVermeyenleriEle();
            liderligiYayinla();

            setTimeout(() => {
                soruGonder(index + 1);
            }, 1200);
        }
    }, 500);
}

// ==========================================
// OYUN DURUMU YORUMLAMA
// ==========================================

function oyunDurumunuYorumla(veri) {
    if (veri.durum === "bekliyor") {
        $("#oyuncu-bekleme-ekrani").removeClass("d-none");
        $("#quiz-ekrani").addClass("d-none");
    }

    if (veri.durum === "soru") {
        $("#host-lobi-ekrani").addClass("d-none");
        $("#oyuncu-bekleme-ekrani").addClass("d-none");
        $("#quiz-ekrani").removeClass("d-none");
        oyuncuSoruyuCiz(veri);
    }

    if (veri.durum === "bitti") {
        oyunuBitirveGoster(veri);
    }
}

// ==========================================
// OYUNCU SORU EKRANI
// ==========================================

function oyuncuSoruyuCiz(soruVerisi) {
    suAnkiSoruSirasi = soruVerisi.soruIndex;

    if (canSayisi <= 0) {
        $("#soru-sayaci-yazi").text("Elendin");
        $("#soru-metni").html("<h3 class='text-danger'>Canın bitti! Oyunu izleyebilirsin. 💀</h3>");
        $("#secenekler-alani").empty();
        $("#sayac-metni").text("-");
        return;
    }

    $("#soru-sayaci-yazi").text(`Soru ${suAnkiSoruSirasi + 1}/${soruVerisi.toplamSoru}`);
    $("#quiz-progress-bar").css("width", ((suAnkiSoruSirasi + 1) / soruVerisi.toplamSoru * 100) + "%");

    $("#soru-metni").html(`<span class="badge bg-secondary me-2">${soruVerisi.soruObjesi.zorluk}</span> ${guvenliYazi(soruVerisi.soruObjesi.soru)}`);

    let alan = $("#secenekler-alani");
    alan.empty();

    let karisik = soruVerisi.soruObjesi.secenekler.map((m, i) => {
        return { metin: m, index: i };
    });

    karisik.sort(() => Math.random() - 0.5);

    karisik.forEach(obj => {
        let btn = $(`<button class="secenek-btn w-100">${guvenliYazi(obj.metin)}</button>`);
        btn.click(function () {
            oyuncuCevapVer(obj.index, this, soruVerisi);
        });
        alan.append(btn);
    });

    oyuncuSureBaslat(soruVerisi);
}

function oyuncuSureBaslat(soruVerisi) {
    clearInterval(zamanSayaci);

    let alan = $("#secenekler-alani");

    let guncelle = () => {
        let kalanMs = soruVerisi.bitisZamani - Date.now();
        kalanSure = Math.ceil(kalanMs / 1000);

        if (kalanSure <= 0) {
            kalanSure = 0;
            clearInterval(zamanSayaci);
            $(".secenek-btn").prop("disabled", true);
            alan.prepend(`<div class="alert alert-danger fw-bold text-center">Süre bitti! Cevap vermediysen can gider.</div>`);
        }

        $("#sayac-metni").text(kalanSure);
    };

    guncelle();
    zamanSayaci = setInterval(guncelle, 500);
}

// ==========================================
// CEVAP VERME
// ==========================================

function oyuncuCevapVer(secilenIndeks, butonHTML, soruVerisi) {
    clearInterval(zamanSayaci);
    $(".secenek-btn").prop("disabled", true);

    let dogruMu = secilenIndeks === soruVerisi.soruObjesi.dogruCevap;
    let kazanilanPuan = 0;

    if (dogruMu) {
        $(butonHTML).addClass("dogru").append(" ✅");
        let kalanMs = Math.max(0, soruVerisi.bitisZamani - Date.now());
        kazanilanPuan = Math.max(10, Math.floor((kalanMs / 20000) * 1000));
    } else {
        $(butonHTML).addClass("yanlis").append(" ❌");
    }

    $("#secenekler-alani").prepend(`<div class="alert alert-success fw-bold text-center">Cevabın kaydedildi. Diğer oyuncular bekleniyor...</div>`);

    mqttClient.publish(`GTonkalQuiz/${odaKodu}/OyuncuCevap`, JSON.stringify({
        id: oyuncuID,
        soruIndex: soruVerisi.soruIndex,
        cevap: secilenIndeks,
        dogruMu: dogruMu,
        puanAldi: kazanilanPuan
    }));
}

// ==========================================
// ODA SAHİBİ CEVAP İŞLEME
// ==========================================

function oyuncuCevabiniIsle(veri) {
    if (!odaSahibiMi) return;

    let oyuncu = hostOyuncuListesi[veri.id];
    if (!oyuncu) return;
    if (!oyuncu.hayatta) return;
    if (oyuncu.cevapVerdi) return;
    if (veri.soruIndex !== suAnkiSoruSirasi) return;

    oyuncu.cevapVerdi = true;
    aktifSoruCevaplari[veri.id] = true;

    if (veri.dogruMu) {
        oyuncu.puan += veri.puanAldi;
    } else {
        oyuncu.can -= 1;
        if (oyuncu.can <= 0) {
            oyuncu.can = 0;
            oyuncu.hayatta = false;
        }
    }

    liderligiYayinla();

    if (tumHayattaOyuncularCevapVerdi()) {
        clearInterval(zamanSayaci);

        setTimeout(() => {
            soruGonder(suAnkiSoruSirasi + 1);
        }, 1200);
    }
}

// ==========================================
// CEVAP VERMEYENLERİ ELEME
// ==========================================

function cevapVermeyenleriEle() {
    Object.keys(hostOyuncuListesi).forEach(id => {
        let oyuncu = hostOyuncuListesi[id];

        if (oyuncu.hayatta && !oyuncu.cevapVerdi) {
            oyuncu.can -= 1;

            if (oyuncu.can <= 0) {
                oyuncu.can = 0;
                oyuncu.hayatta = false;
            }
        }
    });
}

// ==========================================
// OYUN BİTİRME
// ==========================================

function oyunuBitir() {
    if (!odaSahibiMi) return;

    clearInterval(zamanSayaci);

    let kazanan = kazananBul();

    mqttYayinla(`GTonkalQuiz/${odaKodu}/OyunDurumu`, {
        durum: "bitti",
        kazanan: kazanan
    });

    liderligiYayinla();
}

function oyunuBitirveGoster(veri) {
    clearInterval(zamanSayaci);
    $("#quiz-ekrani").addClass("d-none");

    let modal = new bootstrap.Modal(document.getElementById("sonucModal"));

    $("#modal-puan").text(toplamPuanim);

    if (canSayisi <= 0) {
        $("#rozet-ikon").text("💀");
        $("#rozet-isim").text("Elendin");
    } else if (veri && veri.kazanan && veri.kazanan.id === oyuncuID) {
        $("#rozet-ikon").text("🏆");
        $("#rozet-isim").text("Kazandın!");
    } else if (toplamPuanim > 1000) {
        $("#rozet-ikon").text("👑");
        $("#rozet-isim").text("Başarılı Oyuncu");
    } else {
        $("#rozet-ikon").text("🎖️");
        $("#rozet-isim").text("Quiz Tamamlandı");
    }

    modal.show();
}

// ==========================================
// YARDIMCI FONKSİYONLAR
// ==========================================

function hayattaOyuncuSayisi() {
    return Object.values(hostOyuncuListesi).filter(o => o.hayatta).length;
}

function tumHayattaOyuncularCevapVerdi() {
    let hayattaOyuncular = Object.values(hostOyuncuListesi).filter(o => o.hayatta);
    if (hayattaOyuncular.length === 0) return false;

    return hayattaOyuncular.every(o => o.cevapVerdi);
}

function kazananBul() {
    let liste = Object.values(hostOyuncuListesi);
    liste.sort((a, b) => {
        if (b.puan !== a.puan) return b.puan - a.puan;
        return b.can - a.can;
    });

    if (liste.length === 0) return null;

    return {
        id: liste[0].id,
        isim: liste[0].isim,
        puan: liste[0].puan,
        can: liste[0].can
    };
}

function ortakLiderlikTablosunuCiz(listeObjesi) {
    let tablo = $("#liderlik-tablosu");
    tablo.empty();

    if (!listeObjesi) return;

    let liste = Object.keys(listeObjesi).map(k => listeObjesi[k]);

    liste.sort((a, b) => {
        if (b.puan !== a.puan) return b.puan - a.puan;
        return b.can - a.can;
    });

    if (liste.length === 0) {
        tablo.append(`<li class="list-group-item text-muted text-center py-4">Oyuncu bekleniyor...</li>`);
        return;
    }

    liste.forEach((kisi, sira) => {
        let madalyaClass = sira === 0 ? "top-1" : sira === 1 ? "top-2" : sira === 2 ? "top-3" : "";
        let durum = kisi.hayatta ? `❤️ ${kisi.can}` : "💀 Elendi";

        let isimVurgu = kisi.id === oyuncuID
            ? `<span class="text-success fw-bold">${guvenliYazi(kisi.isim)} (Sen)</span>`
            : `<span class="text-truncate fw-bold">${guvenliYazi(kisi.isim)}</span>`;

        tablo.append(`
            <li class="list-group-item liderlik-item ${madalyaClass}">
                <div class="d-flex align-items-center">
                    <span class="liderlik-sira shadow-sm">${sira + 1}</span>
                    ${isimVurgu}
                </div>
                <div class="text-end">
                    <span class="badge bg-danger rounded-pill px-2 py-1">${durum}</span>
                    <span class="badge bg-primary rounded-pill px-2 py-1">${kisi.puan} Puan</span>
                </div>
            </li>
        `);
    });
}

function canlariGuncelle() {
    let html = "";

    for (let i = 0; i < 3; i++) {
        if (i < canSayisi) {
            html += `<i class="bi bi-heart-fill"></i> `;
        } else {
            html += `<i class="bi bi-heartbreak text-muted"></i> `;
        }
    }

    $("#can-kapsayici").html(html);
}

function mqttYayinla(topic, dataObj) {
    mqttClient.publish(topic, JSON.stringify(dataObj), { retain: true });
}

function guvenliYazi(metin) {
    return $("<div>").text(metin).html();
}