// game.js

// Ortak ve Oyuncu Durumu
let odaKodu = "";
let oyuncuID = "";
let oyuncuAdi = "";
let odaSahibiMi = false;

let suAnkiSoruSirasi = 0;
let zamanSayaci;
let kalanSure = 20;

let toplamPuanim = 0;
let canSayisi = 5; // Max Can 5
let streak = 0;
let pasSayisi = 0;
let elendiMi = false;
let sonElenisNedeni = "Tüm canlarını kaybettin!";

let joker50Kullanildi = false;
let jokerCiftKullanildi = false;
let jokerPasKullanildi = false;
let ciftCevapAktifMi = false;
let ciftCevapIlkHataYapildiMi = false;
let secimYapildiMi = false;

// Soru geçmişi ve Analiz
let soruGecmisi = [];
let yanlisKonular = {};

// Host Değişkenleri
let hostOyuncuListesi = {};
let aktifSoruCevaplari = {};
let oyunBasladiMi = false;
let secilenSoruSayisi = 10;
let oyananacakSorular = [];

$(window).on("load", function () {
    showLoading(false);
});

$(document).ready(function () {
    connectMQTT(null, onMqttMessage);

    const urlParams = new URLSearchParams(window.location.search);
    const urlOdaKodu = urlParams.get("room");
    if (urlOdaKodu) {
        $("#rol-secim-ekrani").addClass("d-none");
        $("#oyuncu-giris-ekrani").removeClass("d-none");
        $("#oyuncu-oda-kodu").val(urlOdaKodu.toUpperCase());
    }

    $("#btn-host-sec").click(() => odaOlusturEkrani());
    $("#btn-oyuncu-sec").click(() => {
        $("#rol-secim-ekrani").addClass("d-none");
        $("#oyuncu-giris-ekrani").removeClass("d-none");
    });
    $("#btn-oyuncu-katil").click(() => oyuncuOdayaGir());
    $("#btn-host-baslat").click(() => oyunuBaslat());
    $("#btn-dark-mode").click(() => $("body").toggleClass("dark-mode"));
    $("#btn-modal-yeniden, #btn-elenis-ayril").click(() => window.location.href = window.location.pathname);
    
    $("#btn-elenis-izle").click(() => {
        let modal = bootstrap.Modal.getInstance(document.getElementById("elenisModal"));
        if (modal) modal.hide();
        $("#quiz-ekrani").removeClass("d-none");
    });

    // Joker Butonları
    $("#btn-joker-50").click(function() { if (!joker50Kullanildi && !secimYapildiMi) joker50Kullan(); });
    $("#btn-joker-cift").click(function() { if (!jokerCiftKullanildi && !secimYapildiMi) jokerCiftKullan(); });
    $("#btn-joker-pas").click(function() { if (!jokerPasKullanildi && !secimYapildiMi) jokerPasKullan(); });
});

function onMqttMessage(kanal, veri) {
    if (kanal === "OyuncuKatil" && odaSahibiMi) oyuncuListeyeEkle(veri);
    if (kanal === "OyuncuCevap" && odaSahibiMi) oyuncuCevabiniIsle(veri);
    if (kanal === "OyunDurumu") oyunDurumunuYorumla(veri);
    if (kanal === "Liderlik") {
        ortakLiderlikTablosunuCiz(veri, oyuncuID);
        if (veri[oyuncuID]) {
            let eskiCan = canSayisi;
            toplamPuanim = veri[oyuncuID].puan;
            canSayisi = veri[oyuncuID].can;
            streak = veri[oyuncuID].streak;
            pasSayisi = veri[oyuncuID].pasSayisi;
            
            $("#puan-gosterge").text(`Puan: ${toplamPuanim}`);
            canlariGuncelleUI(canSayisi, 5);

            if (eskiCan > 0 && canSayisi <= 0 && !elendiMi && oyunBasladiMi) {
                elendiMi = true;
                elenisPopupGosterUI(sonElenisNedeni);
            }
        }
    }
}

// HOST - ODA OLUŞTURMA
function odaOlusturEkrani() {
    odaKodu = Math.floor(100000 + Math.random() * 900000).toString();
    $("#oyuncu-oda-kodu").val(odaKodu).prop("disabled", true);
    odaSahibiMi = true;
    
    $("#rol-secim-ekrani").addClass("d-none");
    $("#oyuncu-giris-ekrani").removeClass("d-none");
}

// OYUNCU - ODAYA GİRİŞ
function oyuncuOdayaGir() {
    odaKodu = $("#oyuncu-oda-kodu").val().trim().toUpperCase();
    oyuncuAdi = $("#oyuncu-ismi").val().trim();

    if (odaKodu.length !== 6 || oyuncuAdi === "") {
        alert("Geçerli oda kodu ve isim gir.");
        return;
    }

    oyuncuID = "oyuncu_" + Math.floor(Math.random() * 10000000);
    mqttAboneOl(`GTonkalQuiz/${odaKodu}/OyunDurumu`);
    mqttAboneOl(`GTonkalQuiz/${odaKodu}/Liderlik`);

    if (odaSahibiMi) {
        mqttAboneOl(`GTonkalQuiz/${odaKodu}/OyuncuKatil`);
        mqttAboneOl(`GTonkalQuiz/${odaKodu}/OyuncuCevap`);
        
        oyuncuListeyeEkle({ id: oyuncuID, isim: oyuncuAdi, odaSahibi: true });
        mqttYayinla(`GTonkalQuiz/${odaKodu}/OyunDurumu`, { durum: "bekliyor" });
    } else {
        mqttYayinla(`GTonkalQuiz/${odaKodu}/OyuncuKatil`, { id: oyuncuID, isim: oyuncuAdi, odaSahibi: false });
    }

    lobiEkraniniGoster(odaKodu, odaSahibiMi);
}

// HOST - OYUNCU LİSTESİ
function oyuncuListeyeEkle(veri) {
    if (!hostOyuncuListesi[veri.id]) {
        hostOyuncuListesi[veri.id] = {
            id: veri.id, isim: veri.isim, puan: 0, can: 5, hayatta: true,
            cevapVerdi: false, streak: 0, pasSayisi: 0, odaSahibi: !!veri.odaSahibi
        };
    }
    liderligiYayinla();
}

function liderligiYayinla() {
    mqttYayinla(`GTonkalQuiz/${odaKodu}/Liderlik`, hostOyuncuListesi);
    $("#host-oyuncu-sayisi").text(Object.keys(hostOyuncuListesi).length);
}

// HOST - OYUN BAŞLAT
function oyunuBaslat() {
    if (!odaSahibiMi) return;
    
    let k = $("#secim-kategori").val();
    let z = $("#secim-zorluk").val();
    secilenSoruSayisi = parseInt($("#secim-sayi").val());
    
    let filtrelenmis = questions.filter(q => (k==="Tümü"||q.category===k) && (z==="Tümü"||q.difficulty===z));
    if (filtrelenmis.length === 0) { alert("Bu filtrelere uygun soru bulunamadı."); return; }
    
    oyananacakSorular = shuffleArray(filtrelenmis).slice(0, secilenSoruSayisi);
    
    oyunBasladiMi = true;
    Object.keys(hostOyuncuListesi).forEach(id => {
        hostOyuncuListesi[id].puan = 0; hostOyuncuListesi[id].can = 5; 
        hostOyuncuListesi[id].hayatta = true; hostOyuncuListesi[id].cevapVerdi = false;
        hostOyuncuListesi[id].streak = 0; hostOyuncuListesi[id].pasSayisi = 0;
    });
    
    liderligiYayinla();
    soruGonder(0);
}

// HOST - SORU GÖNDER
function soruGonder(index) {
    if (!odaSahibiMi) return;
    let aktifOyuncu = Object.values(hostOyuncuListesi).filter(o => o.hayatta).length;
    
    if (index >= oyananacakSorular.length || aktifOyuncu === 0) {
        oyunuBitir(); return;
    }
    
    suAnkiSoruSirasi = index;
    Object.keys(hostOyuncuListesi).forEach(id => hostOyuncuListesi[id].cevapVerdi = false);
    liderligiYayinla();

    let sObj = oyananacakSorular[index];
    let sureSn = sObj.difficulty === "Kolay" ? 20 : sObj.difficulty === "Orta" ? 15 : 10;
    let bitisZamani = Date.now() + (sureSn * 1000);

    mqttYayinla(`GTonkalQuiz/${odaKodu}/OyunDurumu`, {
        durum: "soru", soruObjesi: sObj, soruIndex: index, toplamSoru: oyananacakSorular.length,
        bitisZamani: bitisZamani, sureSaniye: sureSn
    });

    odaSahibiIcinSureBaslat(index, bitisZamani);
}

function odaSahibiIcinSureBaslat(index, bitisZamani) {
    clearInterval(zamanSayaci);
    zamanSayaci = setInterval(() => {
        if (Date.now() >= bitisZamani) {
            clearInterval(zamanSayaci);
            cevapVermeyenleriEle();
            liderligiYayinla();
            setTimeout(() => soruGonder(index + 1), 1500);
        }
    }, 500);
}

// TÜM OYUNCULAR - DURUM YORUMLAMA
let suAnkiSoruVerisi = null;

function oyunDurumunuYorumla(veri) {
    if (veri.durum === "bekliyor") {
        $("#oyuncu-bekleme-ekrani").removeClass("d-none");
        $("#quiz-ekrani").addClass("d-none");
    }
    if (veri.durum === "soru") {
        $("#host-lobi-ekrani, #oyuncu-bekleme-ekrani").addClass("d-none");
        $("#quiz-ekrani").removeClass("d-none");
        
        suAnkiSoruVerisi = veri;
        secimYapildiMi = false;
        ciftCevapAktifMi = false; ciftCevapIlkHataYapildiMi = false;
        
        jokerArayuzGuncelleUI({joker50Kullanildi, jokerCiftKullanildi, jokerPasKullanildi});
        oyuncuSoruyuCizUI(veri, canSayisi, secenekTiklandi);
        oyuncuSureBaslat(veri);
    }
    if (veri.durum === "bitti") {
        clearInterval(zamanSayaci);
        $("#quiz-ekrani").addClass("d-none");
        sonucModalCizUI(soruGecmisi, yanlisKonular, toplamPuanim, canSayisi, veri.kazanan?.id, oyuncuID);
    }
}

// OYUNCU - ZAMANLAYICI
function oyuncuSureBaslat(veri) {
    clearInterval(zamanSayaci);
    let guncelle = () => {
        let kalanMs = veri.bitisZamani - Date.now();
        kalanSure = Math.max(0, Math.ceil(kalanMs / 1000));
        
        if (kalanSure <= 0) {
            clearInterval(zamanSayaci);
            if (!secimYapildiMi && canSayisi > 0) {
                secimYapildiMi = true;
                jokerleriKapatUI();
                $(".secenek-btn").prop("disabled", true);
                sonElenisNedeni = "Süre bitti!";
                gecmiseEkle(veri.soruObjesi, "Süre Bitti", veri.soruObjesi.options[veri.soruObjesi.answer], "Süre Bitti");
                if(veri.soruObjesi.category) yanlisKonular[veri.soruObjesi.category] = (yanlisKonular[veri.soruObjesi.category]||0)+1;
                
                aciklamayiGosterUI(veri.soruObjesi.explanation, false);
            }
        }
        $("#sayac-metni").text(kalanSure);
    };
    guncelle();
    zamanSayaci = setInterval(guncelle, 500);
}

// OYUNCU - JOKERLER
function joker50Kullan() {
    joker50Kullanildi = true;
    jokerArayuzGuncelleUI({joker50Kullanildi, jokerCiftKullanildi, jokerPasKullanildi});
    
    let dogruIndeks = suAnkiSoruVerisi.soruObjesi.answer;
    let yanlisButonlar = [];
    $(".secenek-btn").each(function() {
        if (parseInt($(this).attr("data-index")) !== dogruIndeks) yanlisButonlar.push($(this));
    });
    yanlisButonlar = shuffleArray(yanlisButonlar);
    yanlisButonlar[0].animate({opacity: 0}, 400, function() { $(this).css("visibility", "hidden"); });
    yanlisButonlar[1].animate({opacity: 0}, 400, function() { $(this).css("visibility", "hidden"); });
}

function jokerCiftKullan() {
    jokerCiftKullanildi = true; ciftCevapAktifMi = true; ciftCevapIlkHataYapildiMi = false;
    jokerArayuzGuncelleUI({joker50Kullanildi, jokerCiftKullanildi, jokerPasKullanildi});
    $("#btn-joker-cift").removeClass("btn-outline-secondary").addClass("btn-success text-white").html('<i class="bi bi-bullseye"></i> Çift Seçim');
}

function jokerPasKullan() {
    jokerPasKullanildi = true; secimYapildiMi = true;
    jokerleriKapatUI();
    $(".secenek-btn").prop("disabled", true);
    
    gecmiseEkle(suAnkiSoruVerisi.soruObjesi, "Pas Geçildi", suAnkiSoruVerisi.soruObjesi.options[suAnkiSoruVerisi.soruObjesi.answer], "Pas");
    
    mqttYayinla(`GTonkalQuiz/${odaKodu}/OyuncuCevap`, {
        id: oyuncuID, soruIndex: suAnkiSoruVerisi.soruIndex, dogruMu: "pas", puanAldi: 0
    });
}

// OYUNCU - SEÇENEK TIKLAMA
function secenekTiklandi(secilenIndeks, btnEl, e) {
    if (secimYapildiMi) return;
    let dogruIndeks = suAnkiSoruVerisi.soruObjesi.answer;

    if (ciftCevapAktifMi && !ciftCevapIlkHataYapildiMi && secilenIndeks !== dogruIndeks) {
        ciftCevapIlkHataYapildiMi = true;
        playSound("yanlis");
        applyShakeEffect(btnEl);
        $(btnEl).addClass("yanlis text-white").prop("disabled", true);
        return;
    }

    secimYapildiMi = true;
    jokerleriKapatUI();
    $(".secenek-btn").prop("disabled", true);
    
    let dogruMu = (secilenIndeks === dogruIndeks);
    let puanAldi = 0;
    let dogruMetinHTML = "";
    
    $(".secenek-btn").each(function() {
        if (parseInt($(this).attr("data-index")) === dogruIndeks) dogruMetinHTML = $(this).text();
    });

    if (dogruMu) {
        playSound("dogru");
        applyWinEffect(btnEl);
        $(btnEl).addClass("dogru").append(" ✅");
        
        let kalanMs = Math.max(0, suAnkiSoruVerisi.bitisZamani - Date.now());
        let msPuan = Math.floor((kalanMs / (suAnkiSoruVerisi.sureSaniye * 1000)) * 50); // Hız Puanı
        
        let tabanPuan = suAnkiSoruVerisi.soruObjesi.difficulty === "Kolay" ? 100 : suAnkiSoruVerisi.soruObjesi.difficulty === "Orta" ? 150 : 200;
        puanAldi = tabanPuan + msPuan;
        
        if (ciftCevapIlkHataYapildiMi) puanAldi = Math.floor(puanAldi / 2); // Yarım puan
        
        showFloatingPoints(puanAldi, e.clientX, e.clientY);
        gecmiseEkle(suAnkiSoruVerisi.soruObjesi, $(btnEl).text(), dogruMetinHTML, ciftCevapIlkHataYapildiMi ? "Doğru (2. Hak)" : "Doğru");
    } else {
        playSound("yanlis");
        applyShakeEffect(btnEl);
        $(btnEl).addClass("yanlis").append(" ❌");
        sonElenisNedeni = "Yanlış cevap verdin!";
        gecmiseEkle(suAnkiSoruVerisi.soruObjesi, $(btnEl).text(), dogruMetinHTML, "Yanlış");
        if(suAnkiSoruVerisi.soruObjesi.category) yanlisKonular[suAnkiSoruVerisi.soruObjesi.category] = (yanlisKonular[suAnkiSoruVerisi.soruObjesi.category]||0)+1;
    }

    aciklamayiGosterUI(suAnkiSoruVerisi.soruObjesi.explanation, dogruMu);

    mqttYayinla(`GTonkalQuiz/${odaKodu}/OyuncuCevap`, {
        id: oyuncuID, soruIndex: suAnkiSoruVerisi.soruIndex, dogruMu: dogruMu, puanAldi: puanAldi
    });
}

function gecmiseEkle(soruObj, verilen, dogru, durum) {
    soruGecmisi.push({ soru: soruObj.question, kategori: soruObj.category, zorluk: soruObj.difficulty, verilen, dogru, durum });
}

// HOST - CEVAP İŞLEME
function oyuncuCevabiniIsle(veri) {
    if (!odaSahibiMi) return;
    let o = hostOyuncuListesi[veri.id];
    if (!o || !o.hayatta || o.cevapVerdi || veri.soruIndex !== suAnkiSoruSirasi) return;

    o.cevapVerdi = true;
    
    if (veri.dogruMu === "pas") {
        o.pasSayisi++;
        o.streak = 0;
    } else if (veri.dogruMu === true) {
        o.puan += veri.puanAldi;
        o.streak++;
        if (o.streak % 3 === 0 && o.can < 5) o.can++; // Her 3 streakte 1 can bonusu
    } else {
        o.can--;
        o.streak = 0;
        if (o.can <= 0) { o.can = 0; o.hayatta = false; }
    }

    liderligiYayinla();
    
    // Herkes cevap verdiyse hemen geç
    let hayattaVeyaCevapBekleyen = Object.values(hostOyuncuListesi).filter(x => x.hayatta && !x.cevapVerdi).length;
    if (hayattaVeyaCevapBekleyen === 0) {
        clearInterval(zamanSayaci);
        setTimeout(() => soruGonder(suAnkiSoruSirasi + 1), 1500);
    }
}

function cevapVermeyenleriEle() {
    Object.keys(hostOyuncuListesi).forEach(id => {
        let o = hostOyuncuListesi[id];
        if (o.hayatta && !o.cevapVerdi) {
            o.can--; o.streak = 0;
            if (o.can <= 0) { o.can = 0; o.hayatta = false; }
        }
    });
}

function oyunuBitir() {
    if (!odaSahibiMi) return;
    clearInterval(zamanSayaci);
    let liste = Object.values(hostOyuncuListesi).sort((a,b) => (b.puan!==a.puan?b.puan-a.puan:b.can-a.can));
    let kazanan = liste.length > 0 ? liste[0] : null;
    mqttYayinla(`GTonkalQuiz/${odaKodu}/OyunDurumu`, { durum: "bitti", kazanan: kazanan });
}
