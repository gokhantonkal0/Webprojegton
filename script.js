// ==========================================
// KÜRESEL SUNUCUSUZ (MQTT) KAHOOT MOTORU
// Herhangi bir API key veya backend gerektirmez!
// Github Pages ve Local dahil HER YERDE çalışır.
// ==========================================

const MQTT_BROKER = 'wss://broker.hivemq.com:8884/mqtt'; // Ücretsiz, Public MQTT Sunucusu
let mqttClient;
let odaKodu = "";
let benHostum = false;
let oyuncuID = "";
let oyuncuAdi = "";

// OYUN DEĞİŞKENLERİ
let soruHavuzu = [
    { soru: "HTML'in açılımı nedir?", secenekler: ["Hyper Text Markup Language", "High Text Machine Language", "Hyper Tabular Markup Language", "Hiçbiri"], dogruCevap: 0, kategori: "HTML", zorluk: "Kolay" },
    { soru: "Web sayfasına resim eklemek için hangi HTML etiketi kullanılır?", secenekler: ["<image>", "<img>", "<pic>", "<src>"], dogruCevap: 1, kategori: "HTML", zorluk: "Kolay" },
    { soru: "Bir link (bağlantı) oluşturmak için hangi HTML etiketi kullanılır?", secenekler: ["<link>", "<a>", "<href>", "<url>"], dogruCevap: 1, kategori: "HTML", zorluk: "Kolay" },
    { soru: "CSS'de arka plan rengini değiştirmek için hangi özellik kullanılır?", secenekler: ["color", "bgcolor", "background-color", "background-image"], dogruCevap: 2, kategori: "CSS", zorluk: "Kolay" },
    { soru: "CSS'de 'margin' özelliği ne işe yarar?", secenekler: ["İç boşluk ayarlar", "Dış boşluk ayarlar", "Kenarlık belirler", "Genişlik ayarlar"], dogruCevap: 1, kategori: "CSS", zorluk: "Orta" },
    { soru: "Hangi CSS özelliği metnin altını çizer?", secenekler: ["text-decoration: underline;", "font-style: italic;", "text-transform: capitalize;", "text-decoration: line-through;"], dogruCevap: 0, kategori: "CSS", zorluk: "Kolay" },
    { soru: "JavaScript'te güncel olarak değişken tanımlamak için aşağıdakilerden hangisi kullanılır?", secenekler: ["variable", "let", "v", "dim"], dogruCevap: 1, kategori: "JS", zorluk: "Kolay" },
    { soru: "Konsola mesaj yazdırmak için hangi JavaScript komutu kullanılır?", secenekler: ["console.log()", "print()", "echo()", "console.print()"], dogruCevap: 0, kategori: "JS", zorluk: "Kolay" },
    { soru: "Bir HTML elementini ID'sine göre seçmek için hangi standart JS metodu kullanılır?", secenekler: ["getElementByName()", "querySelector('#id')", "getElementById()", "İkisi de (2 ve 3)"], dogruCevap: 3, kategori: "JS", zorluk: "Orta" },
    { soru: "Bootstrap 5 grid sisteminde bir satır en fazla kaç sütuna (col) ayrılır?", secenekler: ["10", "12", "14", "16"], dogruCevap: 1, kategori: "Bootstrap", zorluk: "Kolay" },
    { soru: "Bootstrap'te bir butonu mavi (primary) renk yapmak için hangi class kullanılır?", secenekler: ["btn-blue", "btn-info", "btn-primary", "btn-success"], dogruCevap: 2, kategori: "Bootstrap", zorluk: "Kolay" },
    { soru: "Bootstrap'te içeriği yatayda ortalamak için hangi class kullanılır?", secenekler: ["align-center", "text-center", "center-block", "justify-center"], dogruCevap: 1, kategori: "Bootstrap", zorluk: "Orta" },
    { soru: "jQuery'de bir HTML elementini seçmek için genellikle hangi işaret kullanılır?", secenekler: ["$", "#", "@", "&"], dogruCevap: 0, kategori: "jQuery", zorluk: "Kolay" },
    { soru: "jQuery ile bir elementi gizlemek için hangi metot kullanılır?", secenekler: ["hide()", "displayNone()", "invisible()", "remove()"], dogruCevap: 0, kategori: "jQuery", zorluk: "Orta" },
    { soru: "jQuery'de tıklama (click) olayını yakalamak için hangi metot kullanılır?", secenekler: ["onclick()", "onClick()", "click()", "bindClick()"], dogruCevap: 2, kategori: "jQuery", zorluk: "Kolay" }
];

let suAnkiSoruSirasi = 0;
let soruBaslamaZamani = 0;
let zamanSayaci;
let kalanSure = 20;
let toplamPuanim = 0;
let canSayisi = 3;

// Host için Liderlik Listesi Hafızası
let hostOyuncuListesi = {}; 
let hostAktifSoruCevaplari = {};

// ==========================================
// YÜKLEME EKRANI & BAŞLANGIÇ
// ==========================================
$(window).on('load', function() {
    // Sitenin ilk açılışındaki "Yükleniyor..." u kaldır
    setTimeout(() => {
        $("#loading-ekrani").fadeOut(400, function() { $(this).remove(); });
    }, 400);
});

$(document).ready(function() {
    
    // MQTT Sunucusuna Bağlan
    mqttClient = mqtt.connect(MQTT_BROKER);
    
    mqttClient.on('connect', function () {
        console.log("MQTT Sunucusuna Bağlanıldı!");
    });

    mqttClient.on('message', function (topic, message) {
        let veri;
        try { veri = JSON.parse(message.toString()); } catch(e) { return; }
        
        let yolTuru = topic.split('/').pop(); // "Host", "Liderlik", "OyuncuKatil", "OyuncuCevap"

        if (benHostum) {
            // SADECE HOST'UN DİNLEDİĞİ KANALLAR
            if (yolTuru === "OyuncuKatil") {
                // Yeni oyuncu listeye eklendi
                hostOyuncuListesi[veri.id] = { isim: veri.isim, puan: 0 };
                hostLiderligiGuncelleVeYayinla();
            }
            else if (yolTuru === "OyuncuCevap") {
                // Oyuncu soruya cevap verdi
                hostAktifSoruCevaplari[veri.id] = true;
                if(hostOyuncuListesi[veri.id]) {
                    hostOyuncuListesi[veri.id].puan += veri.puanAldi;
                }
                $("#host-cevap-veren-sayisi").text(Object.keys(hostAktifSoruCevaplari).length);
                hostLiderligiGuncelleVeYayinla();
            }
        } 
        else {
            // SADECE OYUNCUNUN DİNLEDİĞİ KANALLAR
            if (yolTuru === "Host") {
                oyuncuHostDurumunuYorumla(veri);
            }
            else if (yolTuru === "Liderlik") {
                // Kendi puanını bul ve UI güncelle
                if(veri[oyuncuID]) {
                    toplamPuanim = veri[oyuncuID].puan;
                    $("#puan-gosterge").text(`Puan: ${toplamPuanim}`);
                }
            }
        }
    });

    // Günün Sorusunu Göster
    let bugun = new Date();
    let gIndex = (bugun.getFullYear() + bugun.getMonth() + bugun.getDate()) % soruHavuzu.length;
    let tGunun = $('<div>').text(soruHavuzu[gIndex].soru).html();
    $("#gunun-sorusu-metni").html(`<strong>[${soruHavuzu[gIndex].kategori}]</strong> ${tGunun}`);

    // Link Parametresi Okuma (QR Koddan gelenler)
    const urlParams = new URLSearchParams(window.location.search);
    const urlOdaKodu = urlParams.get('room');
    if(urlOdaKodu) {
        $("#rol-secim-ekrani").addClass("d-none");
        $("#oyuncu-giris-ekrani").removeClass("d-none");
        $("#oyuncu-oda-kodu").val(urlOdaKodu.toUpperCase());
    }

    // Tıklamalar
    $("#btn-host-sec").click(() => { $("#rol-secim-ekrani").addClass("d-none"); hostOdasiniKur(); });
    $("#btn-oyuncu-sec").click(() => { $("#rol-secim-ekrani").addClass("d-none"); $("#oyuncu-giris-ekrani").removeClass("d-none"); });
    $("#btn-oyuncu-katil").click(() => oyuncuOdayaGir());
    
    $("#btn-host-baslat").click(() => hostSoruGonder(0));
    $("#btn-host-sonraki").click(() => hostSoruGonder(suAnkiSoruSirasi + 1));
    $("#btn-host-bitir").click(() => hostOyunuBitir());

    $("#btn-dark-mode").click(function() { $("body").toggleClass("dark-mode"); });
    $("#btn-modal-yeniden").click(() => window.location.href = window.location.pathname);
    $("#btn-admin-panel").click(() => alert("Soru Ekleme alanı Multiplayer modda kapalıdır."));
});

// ==========================================
// 1. HOST (SUNUCU) MANTIĞI
// ==========================================
function hostOdasiniKur() {
    benHostum = true;
    odaKodu = Math.floor(100000 + Math.random() * 900000).toString(); // 6 haneli random
    
    soruHavuzu.sort(() => Math.random() - 0.5); // Soruları karıştır

    // Host kanallarını dinlemeye başla
    mqttClient.subscribe(`GTonkalQuiz/${odaKodu}/OyuncuKatil`);
    mqttClient.subscribe(`GTonkalQuiz/${odaKodu}/OyuncuCevap`);

    // Başlangıç statüsünü yayınla
    mqttYayinla(`GTonkalQuiz/${odaKodu}/Host`, { durum: "bekliyor" });

    // Arayüzü Göster
    $("#host-lobi-ekrani").removeClass("d-none");
    $("#host-oda-kodu").text(odaKodu);
    
    let katilmaLinki = window.location.href.split('?')[0] + "?room=" + odaKodu;
    $("#host-join-link").attr("href", katilmaLinki).text(katilmaLinki);
    new QRCode(document.getElementById("qrcode"), { text: katilmaLinki, width: 200, height: 200 });
}

function hostLiderligiGuncelleVeYayinla() {
    // 1. Veriyi Odaya Yayınla (Oyuncular Puanlarını Görsün Diye)
    mqttYayinla(`GTonkalQuiz/${odaKodu}/Liderlik`, hostOyuncuListesi);

    // 2. Kendi Ekranındaki Tabloyu Çiz
    let tablo = $("#liderlik-tablosu");
    tablo.empty();
    
    let liste = Object.keys(hostOyuncuListesi).map(k => hostOyuncuListesi[k]);
    liste.sort((a, b) => b.puan - a.puan);
    
    let kisiSayisi = liste.length;
    
    liste.forEach((kisi, sira) => {
        let madalyaClass = sira === 0 ? "top-1" : (sira === 1 ? "top-2" : (sira === 2 ? "top-3" : ""));
        tablo.append(`
            <li class="list-group-item liderlik-item ${madalyaClass}">
                <div class="d-flex align-items-center">
                    <span class="liderlik-sira shadow-sm">${sira + 1}</span>
                    <span class="text-truncate fw-bold">${kisi.isim}</span>
                </div>
                <div class="text-end">
                    <span class="badge bg-primary rounded-pill px-2 py-1">${kisi.puan} Puan</span>
                </div>
            </li>
        `);
    });

    if(kisiSayisi === 0) tablo.append('<li class="list-group-item text-muted text-center py-4">Bekleniyor...</li>');

    $("#host-oyuncu-sayisi").text(kisiSayisi);
    $("#host-toplam-oyuncu").text(kisiSayisi);
    $("#btn-host-baslat").prop("disabled", kisiSayisi === 0);
}

function hostSoruGonder(index) {
    if (index >= soruHavuzu.length || index >= 15) {
        hostOyunuBitir();
        return;
    }

    suAnkiSoruSirasi = index;
    hostAktifSoruCevaplari = {}; // Yeni soru için cevapları sıfırla
    $("#host-cevap-veren-sayisi").text("0");

    let gidenSoru = soruHavuzu[index];
    
    // UI Değişimi
    $("#host-lobi-ekrani").addClass("d-none");
    $("#quiz-ekrani").removeClass("d-none");
    $("#host-kontrol-alani").removeClass("d-none");
    
    $("#soru-sayaci-yazi").text(`Soru ${index + 1}/${Math.min(soruHavuzu.length, 15)} (Host Ekranı)`);
    $("#soru-metni").html(`<span class="badge bg-secondary me-2">${gidenSoru.zorluk}</span> ${$('<div>').text(gidenSoru.soru).html()}`);
    
    let btnAlan = $("#secenekler-alani");
    btnAlan.empty();
    gidenSoru.secenekler.forEach(s => btnAlan.append(`<button class="secenek-btn w-100 disabled text-center">${$('<div>').text(s).html()}</button>`));

    if (index === Math.min(soruHavuzu.length, 15) - 1) {
        $("#btn-host-sonraki").addClass("d-none");
        $("#btn-host-bitir").removeClass("d-none");
    }

    // Soru sayacı
    kalanSure = 20;
    clearInterval(zamanSayaci);
    $("#sayac-metni").text(kalanSure);
    zamanSayaci = setInterval(() => {
        kalanSure--;
        $("#sayac-metni").text(kalanSure);
        if (kalanSure <= 0) clearInterval(zamanSayaci);
    }, 1000);

    // OYUNCULARA SORUYU YAYINLA
    mqttYayinla(`GTonkalQuiz/${odaKodu}/Host`, {
        durum: "soru",
        soruObjesi: gidenSoru,
        soruIndex: index,
        toplamSoru: Math.min(soruHavuzu.length, 15),
        bitisZamani: Date.now() + 20000 // 20 Saniye Süre
    });
}

function hostOyunuBitir() {
    mqttYayinla(`GTonkalQuiz/${odaKodu}/Host`, { durum: "bitti" });
    oyunuBitirveGoster();
}


// ==========================================
// 2. OYUNCU MANTIĞI
// ==========================================
function oyuncuOdayaGir() {
    odaKodu = $("#oyuncu-oda-kodu").val().trim().toUpperCase();
    oyuncuAdi = $("#oyuncu-ismi").val().trim();
    oyuncuID = 'oyuncu_' + Math.floor(Math.random() * 10000000);
    
    if(odaKodu.length !== 6 || oyuncuAdi === "") {
        alert("Geçerli bir kod ve isim girin!"); return;
    }

    $("#oyuncu-giris-ekrani").addClass("d-none");
    $("#oyuncu-bekleme-ekrani").removeClass("d-none");

    // Host yayınlarını dinlemeye başla
    mqttClient.subscribe(`GTonkalQuiz/${odaKodu}/Host`);
    mqttClient.subscribe(`GTonkalQuiz/${odaKodu}/Liderlik`);

    // Host'a ben geldim mesajı at (Retain=false)
    mqttClient.publish(`GTonkalQuiz/${odaKodu}/OyuncuKatil`, JSON.stringify({ id: oyuncuID, isim: oyuncuAdi }));
}

function oyuncuHostDurumunuYorumla(veri) {
    if (veri.durum === "bekliyor") {
        $("#oyuncu-bekleme-ekrani").removeClass("d-none");
        $("#quiz-ekrani").addClass("d-none");
    } 
    else if (veri.durum === "bitti") {
        oyunuBitirveGoster();
    }
    else if (veri.durum === "soru") {
        $("#oyuncu-bekleme-ekrani").addClass("d-none");
        $("#quiz-ekrani").removeClass("d-none");
        oyuncuSoruyuCiz(veri);
    }
}

function oyuncuSoruyuCiz(soruVerisi) {
    suAnkiSoruSirasi = soruVerisi.soruIndex;

    if (canSayisi <= 0) {
        $("#soru-metni").html("<h3 class='text-danger'>Canınız bitti! Host ekranını izleyin. 💀</h3>");
        $("#secenekler-alani").empty();
        return;
    }

    $("#soru-sayaci-yazi").text(`Soru ${suAnkiSoruSirasi + 1}/${soruVerisi.toplamSoru}`);
    $("#quiz-progress-bar").css("width", (suAnkiSoruSirasi / soruVerisi.toplamSoru * 100) + "%");

    $("#soru-metni").html(`<span class="badge bg-secondary me-2">${soruVerisi.soruObjesi.zorluk}</span> ${$('<div>').text(soruVerisi.soruObjesi.soru).html()}`);
    
    let alan = $("#secenekler-alani");
    alan.empty();

    let karisik = soruVerisi.soruObjesi.secenekler.map((m, i) => { return { metin: m, index: i }; });
    karisik.sort(() => Math.random() - 0.5);

    karisik.forEach(obj => {
        let btn = $(`<button class="secenek-btn w-100">${$('<div>').text(obj.metin).html()}</button>`);
        btn.click(function() { oyuncuCevapVer(obj.index, this, soruVerisi); });
        alan.append(btn);
    });

    // Zamanlayıcı
    clearInterval(zamanSayaci);
    
    let guncelZamanHesapla = () => {
        let kalanMs = soruVerisi.bitisZamani - Date.now();
        kalanSure = Math.ceil(kalanMs / 1000);
        
        if (kalanSure <= 0) {
            kalanSure = 0;
            clearInterval(zamanSayaci);
            $(".secenek-btn").prop("disabled", true);
            canGitti();
            alan.prepend('<div class="alert alert-danger fw-bold text-center">Süre Bitti!</div>');
            oyuncuCevabiGonder(-1, false, 0); 
        }
        $("#sayac-metni").text(kalanSure);
    };
    
    guncelZamanHesapla();
    zamanSayaci = setInterval(guncelZamanHesapla, 1000);
}

function oyuncuCevapVer(secilenIndeks, butonHTML, soruVerisi) {
    clearInterval(zamanSayaci);
    $(".secenek-btn").prop("disabled", true);
    
    let dogruMu = (secilenIndeks === soruVerisi.soruObjesi.dogruCevap);
    let kazanilanPuan = 0;

    if (dogruMu) {
        $(butonHTML).addClass("dogru").append(' <span class="float-end">✅ 😎</span>');
        kazanilanPuan = Math.max(10, kalanSure * 5); // 20 saniyede max 100
    } else {
        $(butonHTML).addClass("yanlis").append(' <span class="float-end">❌</span>');
        canGitti();
    }

    $("#secenekler-alani").prepend('<div class="alert alert-success fw-bold text-center"><i class="bi bi-hourglass-split"></i> Kaydedildi! Host bekleniyor...</div>');
    oyuncuCevabiGonder(secilenIndeks, dogruMu, kazanilanPuan);
}

function oyuncuCevabiGonder(cevapIndeks, dogruMu, puan) {
    mqttClient.publish(`GTonkalQuiz/${odaKodu}/OyuncuCevap`, JSON.stringify({
        id: oyuncuID,
        cevap: cevapIndeks,
        puanAldi: puan
    }));
}


// ==========================================
// ORTAK FONKSİYONLAR
// ==========================================
function mqttYayinla(topic, dataObj) {
    // Retain true: Son girenler statüyü anında okuyabilsin diye
    mqttClient.publish(topic, JSON.stringify(dataObj), { retain: true });
}

function canGitti() {
    canSayisi--;
    let html = "";
    for (let i = 0; i < 3; i++) {
        if (i < canSayisi) html += '<i class="bi bi-heart-fill"></i> ';
        else html += '<i class="bi bi-heartbreak text-muted"></i> ';
    }
    $("#can-kapsayici").html(html);
}

function oyunuBitirveGoster() {
    clearInterval(zamanSayaci);
    $("#quiz-ekrani").addClass("d-none");
    
    let modal = new bootstrap.Modal(document.getElementById('sonucModal'));
    
    if (benHostum) {
        $("#modal-puan").text("Tablodan İnceleyin");
        $("#rozet-isim").text("Sınav Tamamlandı!");
        $("#rozet-ikon").text("🏆");
    } else {
        $("#modal-puan").text(toplamPuanim);
        if (canSayisi <= 0) {
            $("#rozet-ikon").text("💀");
            $("#rozet-isim").text("Elenerek Bitti");
        } else if (toplamPuanim > 500) {
            $("#rozet-ikon").text("👑");
            $("#rozet-isim").text("JS Ninja");
        } else {
            $("#rozet-ikon").text("🎖️");
            $("#rozet-isim").text("Başarılı");
        }
    }

    modal.show();
}
