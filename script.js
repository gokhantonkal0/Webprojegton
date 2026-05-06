// ==========================================
// AYARLAR (Gerçek sunucu için FIREBASE_KULLAN = true yapın)
// ==========================================
const FIREBASE_KULLAN = false;

const firebaseAyarlari = {
    apiKey: "BURAYA_API_KEY_GELECEK",
    authDomain: "PROJE_ID.firebaseapp.com",
    databaseURL: "https://PROJE_ID-default-rtdb.firebaseio.com",
    projectId: "PROJE_ID",
    storageBucket: "PROJE_ID.appspot.com",
    messagingSenderId: "SENDER_ID",
    appId: "APP_ID"
};

// ==========================================
// BASİTLEŞTİRİLMİŞ VERİTABANI YÖNETİCİSİ
// (Hem Firebase hem LocalStorage destekler)
// ==========================================
const Veritabani = {
    _lokalVeri: JSON.parse(localStorage.getItem('kahootDB')) || {},
    _dinleyiciler: {},

    baslat() {
        if (FIREBASE_KULLAN) {
            if (!firebase.apps.length) firebase.initializeApp(firebaseAyarlari);
            this.db = firebase.database();
        } else {
            console.warn("Lokal Test Modu: Veriler sadece tarayıcıda tutulur.");
            // FILE:// protokolünde sekme arası veri aktarımı için Polling (Sürekli kontrol)
            setInterval(() => {
                let yeniVeriStr = localStorage.getItem('kahootDB');
                let yeniVeri = yeniVeriStr ? JSON.parse(yeniVeriStr) : {};
                if (JSON.stringify(this._lokalVeri) !== JSON.stringify(yeniVeri)) {
                    this._lokalVeri = yeniVeri;
                    this._tetikleHerSey();
                }
            }, 500); // Saniyede 2 kez kontrol et
        }
    },

    yaz(yol, deger) {
        if (FIREBASE_KULLAN) {
            return this.db.ref(yol).set(deger);
        } else {
            this._yolAyarla(yol, deger);
            this._lokalKaydet();
            return Promise.resolve();
        }
    },

    guncelle(yol, obje) {
        if (FIREBASE_KULLAN) {
            return this.db.ref(yol).update(obje);
        } else {
            let mevcut = this._yolGetir(yol) || {};
            for (let anahtar in obje) {
                mevcut[anahtar] = obje[anahtar];
            }
            this._yolAyarla(yol, mevcut);
            this._lokalKaydet();
            return Promise.resolve();
        }
    },

    dinle(yol, callback) {
        if (FIREBASE_KULLAN) {
            this.db.ref(yol).on('value', snap => callback(snap.val()));
        } else {
            if (!this._dinleyiciler[yol]) this._dinleyiciler[yol] = [];
            this._dinleyiciler[yol].push(callback);
            callback(this._yolGetir(yol));
        }
    },

    oku(yol) {
        if (FIREBASE_KULLAN) {
            return this.db.ref(yol).once('value').then(s => s.val());
        } else {
            return Promise.resolve(this._yolGetir(yol));
        }
    },

    // --- LOKAL YARDIMCILAR ---
    _lokalKaydet() {
        localStorage.setItem('kahootDB', JSON.stringify(this._lokalVeri));
    },
    _yolAyarla(yol, deger) {
        let parcalar = yol.split('/');
        let aktif = this._lokalVeri;
        for (let i = 0; i < parcalar.length - 1; i++) {
            if (!aktif[parcalar[i]]) aktif[parcalar[i]] = {};
            aktif = aktif[parcalar[i]];
        }
        aktif[parcalar[parcalar.length - 1]] = deger;
    },
    _yolGetir(yol) {
        let parcalar = yol.split('/');
        let aktif = this._lokalVeri;
        for (let p of parcalar) {
            if (aktif === undefined || aktif === null) return null;
            aktif = aktif[p];
        }
        return aktif;
    },
    _tetikleHerSey() {
        for (let yol in this._dinleyiciler) {
            let deger = this._yolGetir(yol);
            this._dinleyiciler[yol].forEach(cb => cb(deger));
        }
    }
};

// ==========================================
// 15 SORULUK HAVUZ (Türkçe Değişkenler)
// ==========================================
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

// OYUN DURUMU
let odayaAitKod = "";
let benHostum = false;
let oyuncuID = "";
let oyuncuAdi = "";
let suAnkiSoruSirasi = 0;
let soruBaslamaZamani = 0;
let zamanSayaci;
let kalanSure = 20;
let toplamPuanim = 0;
let canSayisi = 3;

// UI HAZIRLIK
$(window).on('load', function() {
    setTimeout(() => {
        $("#loading-ekrani").css("opacity", "0");
        setTimeout(() => $("#loading-ekrani").remove(), 500);
    }, 400);
});

$(document).ready(function() {
    Veritabani.baslat();
    
    // Günün Sorusunu Belirle (Sabit Havuzdan)
    if(soruHavuzu.length > 0) {
        let bugun = new Date();
        let index = (bugun.getFullYear() + bugun.getMonth() + bugun.getDate()) % soruHavuzu.length;
        let tGunun = $('<div>').text(soruHavuzu[index].soru).html();
        $("#gunun-sorusu-metni").html(`<strong>[${soruHavuzu[index].kategori} - ${soruHavuzu[index].zorluk}]</strong> ${tGunun}`);
    }

    // Linkten gelen oda kodu varsa
    const urlParametreleri = new URLSearchParams(window.location.search);
    const linktenGelenOda = urlParametreleri.get('room');
    if(linktenGelenOda) {
        $("#rol-secim-ekrani").addClass("d-none");
        $("#oyuncu-giris-ekrani").removeClass("d-none");
        $("#oyuncu-oda-kodu").val(linktenGelenOda.toUpperCase());
    }

    // Buton Tıklamaları
    $("#btn-host-sec").click(() => { $("#rol-secim-ekrani").addClass("d-none"); hostOdasiniKur(); });
    $("#btn-oyuncu-sec").click(() => { $("#rol-secim-ekrani").addClass("d-none"); $("#oyuncu-giris-ekrani").removeClass("d-none"); });
    $("#btn-oyuncu-katil").click(() => oyuncuOdayaGir());
    $("#btn-host-baslat").click(() => hostOyunuBaslat());
    $("#btn-host-sonraki").click(() => hostSonrakiSoru());
    $("#btn-host-bitir").click(() => Veritabani.yaz(`odalar/${odayaAitKod}/durum`, "bitti"));
    
    // Admin Paneli ve Yeniden Oynama (Hata vermesin diye)
    $("#btn-admin-panel").click(function() { alert("Admin paneli şu an multiplayer modda devre dışıdır."); });
    $("#btn-modal-yeniden").click(function() { window.location.href = window.location.pathname; });
    
    // Dark Mode
    $("#btn-dark-mode").click(function() {
        $("body").toggleClass("dark-mode");
    });
});

// ==========================================
// 1. HOST (SUNUCU) İŞLEMLERİ
// ==========================================
function hostOdasiniKur() {
    benHostum = true;
    odayaAitKod = Math.floor(100000 + Math.random() * 900000).toString(); // 6 haneli
    
    // Soruları karıştır ve odaya yaz
    soruHavuzu.sort(() => Math.random() - 0.5);

    let baslangicVerisi = {
        durum: "bekliyor",
        aktifSoruIndex: 0,
        sorular: soruHavuzu,
        oyuncular: {},
        cevaplar: {}
    };

    Veritabani.yaz(`odalar/${odayaAitKod}`, baslangicVerisi).then(() => {
        $("#host-lobi-ekrani").removeClass("d-none");
        $("#host-oda-kodu").text(odayaAitKod);
        
        let katilmaLinki = window.location.href.split('?')[0] + "?room=" + odayaAitKod;
        $("#host-join-link").attr("href", katilmaLinki).text(katilmaLinki);
        
        // QR Kod
        new QRCode(document.getElementById("qrcode"), { text: katilmaLinki, width: 200, height: 200 });

        // Oyuncuları Canlı Dinle
        Veritabani.dinle(`odalar/${odayaAitKod}/oyuncular`, (oyuncular) => {
            let tablo = $("#liderlik-tablosu");
            tablo.empty();
            let kisiSayisi = 0;

            if (oyuncular) {
                // Objeyi diziye çevir ve puana göre sırala
                let liste = Object.keys(oyuncular).map(k => oyuncular[k]);
                liste.sort((a, b) => b.puan - a.puan);
                
                liste.forEach((kisi, sira) => {
                    kisiSayisi++;
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
            } else {
                tablo.append('<li class="list-group-item text-muted text-center py-4">Bekleniyor...</li>');
            }
            
            $("#host-oyuncu-sayisi").text(kisiSayisi);
            $("#host-toplam-oyuncu").text(kisiSayisi);
            $("#btn-host-baslat").prop("disabled", kisiSayisi === 0);
        });
    });
}

function hostOyunuBaslat() {
    Veritabani.guncelle(`odalar/${odayaAitKod}`, {
        durum: "basladi",
        aktifSoruIndex: 0,
        zamanDamgasi: Date.now()
    });
    
    $("#host-lobi-ekrani").addClass("d-none");
    $("#quiz-ekrani").removeClass("d-none");
    $("#host-kontrol-alani").removeClass("d-none");
    
    hostSoruyuYonet();
}

function hostSonrakiSoru() {
    suAnkiSoruSirasi++;
    if (suAnkiSoruSirasi >= soruHavuzu.length) {
        Veritabani.yaz(`odalar/${odayaAitKod}/durum`, "bitti");
        return;
    }
    Veritabani.guncelle(`odalar/${odayaAitKod}`, {
        aktifSoruIndex: suAnkiSoruSirasi,
        zamanDamgasi: Date.now()
    });
}

function hostSoruyuYonet() {
    // Aktif Soru Değişimini Dinle
    Veritabani.dinle(`odalar/${odayaAitKod}/aktifSoruIndex`, (index) => {
        if (index === null) return;
        suAnkiSoruSirasi = index;
        let soruBilgisi = soruHavuzu[index];

        $("#soru-sayaci-yazi").text(`Soru ${index + 1}/${soruHavuzu.length} (Host Ekranı)`);
        
        let soruEkrani = $('<div>').text(soruBilgisi.soru).html(); // HTML Injection koruması
        $("#soru-metni").html(`<span class="badge bg-secondary me-2">${soruBilgisi.zorluk}</span> ${soruEkrani}`);
        
        let butonAlani = $("#secenekler-alani");
        butonAlani.empty();
        
        soruBilgisi.secenekler.forEach(metin => {
            let sikMetni = $('<div>').text(metin).html();
            butonAlani.append(`<button class="secenek-btn w-100 disabled text-center">${sikMetni}</button>`);
        });

        // Sayacı Sıfırla
        kalanSure = 20;
        clearInterval(zamanSayaci);
        $("#sayac-metni").text(kalanSure);
        zamanSayaci = setInterval(() => {
            kalanSure--;
            $("#sayac-metni").text(kalanSure);
            if (kalanSure <= 0) clearInterval(zamanSayaci);
        }, 1000);

        // Bu soruya kaç kişi cevap verdi dinle
        Veritabani.dinle(`odalar/${odayaAitKod}/cevaplar/${index}`, (cevaplar) => {
            let sayi = cevaplar ? Object.keys(cevaplar).length : 0;
            $("#host-cevap-veren-sayisi").text(sayi);
        });

        if (index === soruHavuzu.length - 1) {
            $("#btn-host-sonraki").addClass("d-none");
            $("#btn-host-bitir").removeClass("d-none");
        }
    });

    // Oyunun bitip bitmediğini dinle
    Veritabani.dinle(`odalar/${odayaAitKod}/durum`, (durum) => {
        if (durum === "bitti") oyunuBitirveGoster();
    });
}

// ==========================================
// 2. OYUNCU İŞLEMLERİ
// ==========================================
function oyuncuOdayaGir() {
    odayaAitKod = $("#oyuncu-oda-kodu").val().trim().toUpperCase();
    oyuncuAdi = $("#oyuncu-ismi").val().trim();
    oyuncuID = 'oyuncu_' + Math.floor(Math.random() * 1000000); // Rastgele ID
    
    Veritabani.oku(`odalar/${odayaAitKod}`).then(oda => {
        if (!oda) { alert("Oda bulunamadı!"); return; }
        if (oda.durum === "bitti") { alert("Bu sınav bitmiş!"); return; }
        
        // Oyuncuyu Odaya Kaydet
        Veritabani.yaz(`odalar/${odayaAitKod}/oyuncular/${oyuncuID}`, {
            isim: oyuncuAdi,
            puan: 0
        }).then(() => {
            $("#oyuncu-giris-ekrani").addClass("d-none");
            
            if (oda.durum === "bekliyor") {
                $("#oyuncu-bekleme-ekrani").removeClass("d-none");
            } else {
                $("#quiz-ekrani").removeClass("d-none");
            }

            oyuncuDurumunuDinle();
        });
    });
}

function oyuncuDurumunuDinle() {
    // Odadaki Durumu Dinle (Başladı mı, Bitti mi?)
    Veritabani.dinle(`odalar/${odayaAitKod}/durum`, durum => {
        if (durum === "basladi") {
            $("#oyuncu-bekleme-ekrani").addClass("d-none");
            $("#quiz-ekrani").removeClass("d-none");
        } else if (durum === "bitti") {
            oyunuBitirveGoster();
        }
    });

    // Soruları Oku
    Veritabani.oku(`odalar/${odayaAitKod}/sorular`).then(sorular => {
        soruHavuzu = sorular || [];
        
        // Aktif Soru Değişirse Ekrana Çiz
        Veritabani.dinle(`odalar/${odayaAitKod}/aktifSoruIndex`, index => {
            if (index === null) return;
            suAnkiSoruSirasi = index;
            
            Veritabani.oku(`odalar/${odayaAitKod}/zamanDamgasi`).then(zaman => {
                soruBaslamaZamani = zaman || Date.now();
                oyuncuSoruyuCiz(index);
            });
        });
    });

    // Kendi Puanını Dinle
    Veritabani.dinle(`odalar/${odayaAitKod}/oyuncular/${oyuncuID}/puan`, puan => {
        toplamPuanim = puan || 0;
        $("#puan-gosterge").text(`Puan: ${toplamPuanim}`);
    });
}

function oyuncuSoruyuCiz(index) {
    let soruBilgisi = soruHavuzu[index];
    if (!soruBilgisi) return;

    if (canSayisi <= 0) {
        $("#soru-metni").html("<h3 class='text-danger'>Canınız bitti! Host ekranını izleyin. 💀</h3>");
        $("#secenekler-alani").empty();
        return;
    }

    $("#soru-sayaci-yazi").text(`Soru ${index + 1}/${soruHavuzu.length}`);
    $("#quiz-progress-bar").css("width", ((index) / soruHavuzu.length * 100) + "%");

    let gSoru = $('<div>').text(soruBilgisi.soru).html();
    $("#soru-metni").html(`<span class="badge bg-secondary me-2">${soruBilgisi.zorluk}</span> ${gSoru}`);
    
    let alan = $("#secenekler-alani");
    alan.empty();

    // Şıkları Karıştır
    let karisik = soruBilgisi.secenekler.map((m, i) => { return { metin: m, index: i }; });
    karisik.sort(() => Math.random() - 0.5);

    karisik.forEach(obj => {
        let gSik = $('<div>').text(obj.metin).html();
        let btn = $(`<button class="secenek-btn w-100">${gSik}</button>`);
        btn.click(function() { oyuncuCevapVer(obj.index, this); });
        alan.append(btn);
    });

    // Sayacı Başlat
    kalanSure = 20;
    clearInterval(zamanSayaci);
    $("#sayac-metni").text(kalanSure);
    
    zamanSayaci = setInterval(() => {
        kalanSure--;
        $("#sayac-metni").text(kalanSure);
        if (kalanSure <= 0) {
            clearInterval(zamanSayaci);
            $(".secenek-btn").prop("disabled", true);
            canGitti();
            alan.prepend('<div class="alert alert-danger fw-bold text-center">Süre Bitti!</div>');
            oyuncuCevabiGonder(-1, false, 0); 
        }
    }, 1000);
}

function oyuncuCevapVer(secilenIndeks, butonHTML) {
    clearInterval(zamanSayaci);
    $(".secenek-btn").prop("disabled", true);
    
    let soruBilgisi = soruHavuzu[suAnkiSoruSirasi];
    let dogruMu = (secilenIndeks === soruBilgisi.dogruCevap);
    
    let gecenSaniye = Math.floor((Date.now() - soruBaslamaZamani) / 1000);
    let kazanilanPuan = 0;

    if (dogruMu) {
        $(butonHTML).addClass("dogru").append(' <span class="float-end">✅ 😎</span>');
        kazanilanPuan = Math.max(10, 100 - (gecenSaniye * 5)); // Hız Bonusu
    } else {
        $(butonHTML).addClass("yanlis").append(' <span class="float-end">❌</span>');
        canGitti();
    }

    $("#secenekler-alani").prepend('<div class="alert alert-success fw-bold text-center"><i class="bi bi-hourglass-split"></i> Kaydedildi! Host bekleniyor...</div>');
    oyuncuCevabiGonder(secilenIndeks, dogruMu, kazanilanPuan);
}

function oyuncuCevabiGonder(cevapIndeks, dogruMu, puan) {
    // 1. Cevabı Veritabanına Yaz
    Veritabani.yaz(`odalar/${odayaAitKod}/cevaplar/${suAnkiSoruSirasi}/${oyuncuID}`, {
        cevap: cevapIndeks,
        puanAldi: puan
    });

    // 2. Kazanılan Puanı Oyuncuya Ekle
    if (puan > 0) {
        Veritabani.oku(`odalar/${odayaAitKod}/oyuncular/${oyuncuID}/puan`).then(eskiPuan => {
            Veritabani.yaz(`odalar/${odayaAitKod}/oyuncular/${oyuncuID}/puan`, (eskiPuan || 0) + puan);
        });
    }
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
        } else if (toplamPuanim > 800) {
            $("#rozet-ikon").text("👑");
            $("#rozet-isim").text("JS Ninja");
        } else {
            $("#rozet-ikon").text("🎖️");
            $("#rozet-isim").text("Başarılı");
        }
    }

    modal.show();
}
