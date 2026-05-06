// 1. 50 Soruluk Geniş Soru Havuzu (Kategori ve Zorluk eklendi)
const anaSorular = [
    // --- HTML ---
    { soru: "HTML'in açılımı nedir?", secenekler: ["Hyper Text Markup Language", "High Text Machine Language", "Hyper Tabular Markup Language", "Hiçbiri"], dogruCevap: 0, kategori: "HTML", zorluk: "Kolay" },
    { soru: "HTML'de en büyük başlık etiketi hangisidir?", secenekler: ["<heading>", "<h6>", "<h1>", "<head>"], dogruCevap: 2, kategori: "HTML", zorluk: "Kolay" },
    { soru: "HTML belgesinin ana içeriği hangi etiketler arasına yazılır?", secenekler: ["<head>", "<body>", "<html>", "<title>"], dogruCevap: 1, kategori: "HTML", zorluk: "Kolay" },
    { soru: "Bir satır atlamak (alt satıra geçmek) için hangi HTML etiketi kullanılır?", secenekler: ["<br>", "<hr>", "<enter>", "<break>"], dogruCevap: 0, kategori: "HTML", zorluk: "Kolay" },
    { soru: "HTML'de kalın (bold) yazı yazmak için hangi etiket kullanılır?", secenekler: ["<b>", "<i>", "<mark>", "<u>"], dogruCevap: 0, kategori: "HTML", zorluk: "Kolay" },
    { soru: "Numaralı (Sıralı) liste oluşturmak için hangi HTML etiketi kullanılır?", secenekler: ["<ul>", "<list>", "<ol>", "<li>"], dogruCevap: 2, kategori: "HTML", zorluk: "Orta" },
    { soru: "Web sayfasına resim eklemek için hangi HTML etiketi kullanılır?", secenekler: ["<image>", "<img>", "<pic>", "<src>"], dogruCevap: 1, kategori: "HTML", zorluk: "Orta" },
    { soru: "Bir link (bağlantı) oluşturmak için hangi HTML etiketi kullanılır?", secenekler: ["<link>", "<a>", "<href>", "<url>"], dogruCevap: 1, kategori: "HTML", zorluk: "Orta" },
    { soru: "Tablo oluşturmaya başlamak için hangi HTML etiketi kullanılır?", secenekler: ["<table>", "<tr>", "<td>", "<tbl>"], dogruCevap: 0, kategori: "HTML", zorluk: "Orta" },
    { soru: "Hangi HTML etiketinin kapatma (bitiş) etiketi yoktur?", secenekler: ["<p>", "<div>", "<img>", "<span>"], dogruCevap: 2, kategori: "HTML", zorluk: "Zor" },
    
    // --- CSS ---
    { soru: "CSS'de arka plan rengini değiştirmek için hangi özellik kullanılır?", secenekler: ["color", "bgcolor", "background-color", "background-image"], dogruCevap: 2, kategori: "CSS", zorluk: "Kolay" },
    { soru: "CSS'de 'margin' özelliği ne işe yarar?", secenekler: ["İç boşluk ayarlar", "Dış boşluk ayarlar", "Kenarlık belirler", "Genişlik ayarlar"], dogruCevap: 1, kategori: "CSS", zorluk: "Kolay" },
    { soru: "Yazı rengini değiştirmek için hangi CSS özelliği kullanılır?", secenekler: ["font-color", "text-color", "color", "fgcolor"], dogruCevap: 2, kategori: "CSS", zorluk: "Kolay" },
    { soru: "Tüm <p> etiketlerinin yazı tipini kalın yapmak için doğru CSS seçicisi hangisidir?", secenekler: ["p {font-weight:bold;}", "p {text-size:bold;}", "<p> {font-weight:bold;}", "all.p {font-weight:bold;}"], dogruCevap: 0, kategori: "CSS", zorluk: "Orta" },
    { soru: "Bir HTML elemanının id'si (kimliği) ile CSS'de nasıl seçilir?", secenekler: [".id_adi", "#id_adi", "*id_adi", "id_adi"], dogruCevap: 1, kategori: "CSS", zorluk: "Orta" },
    { soru: "CSS'de 'padding' özelliği ne işe yarar?", secenekler: ["İç boşluk ayarlar", "Dış boşluk ayarlar", "Arka plan rengi ayarlar", "Saydamlık ayarlar"], dogruCevap: 0, kategori: "CSS", zorluk: "Orta" },
    { soru: "Hangi CSS özelliği metnin altını çizer?", secenekler: ["text-decoration: underline;", "font-style: italic;", "text-transform: capitalize;", "text-decoration: line-through;"], dogruCevap: 0, kategori: "CSS", zorluk: "Orta" },
    { soru: "CSS dosyasını HTML belgesine bağlamak için hangi etiket kullanılır?", secenekler: ["<style>", "<link>", "<css>", "<script>"], dogruCevap: 1, kategori: "CSS", zorluk: "Zor" },
    { soru: "Flexbox yapısında elemanları yatayda (ana eksende) ortalamak için hangi özellik kullanılır?", secenekler: ["align-items", "text-align", "justify-content", "vertical-align"], dogruCevap: 2, kategori: "CSS", zorluk: "Zor" },
    { soru: "CSS'de font büyüklüğünü ayarlamak için hangi özellik kullanılır?", secenekler: ["font-weight", "text-size", "font-style", "font-size"], dogruCevap: 3, kategori: "CSS", zorluk: "Zor" },

    // --- JavaScript ---
    { soru: "JavaScript'te güncel olarak değişken tanımlamak için aşağıdakilerden hangisi kullanılır?", secenekler: ["variable", "let", "v", "dim"], dogruCevap: 1, kategori: "JS", zorluk: "Kolay" },
    { soru: "Aşağıdakilerden hangisi bir JavaScript veri türü (data type) DEĞİLDİR?", secenekler: ["String", "Boolean", "Character", "Undefined"], dogruCevap: 2, kategori: "JS", zorluk: "Kolay" },
    { soru: "JavaScript kodlarını HTML dosyası içine yazmak için hangi etiket kullanılır?", secenekler: ["<js>", "<scripting>", "<script>", "<javascript>"], dogruCevap: 2, kategori: "JS", zorluk: "Kolay" },
    { soru: "Konsola mesaj yazdırmak için hangi JavaScript komutu kullanılır?", secenekler: ["console.log()", "print()", "echo()", "console.print()"], dogruCevap: 0, kategori: "JS", zorluk: "Kolay" },
    { soru: "Ekrana uyarı mesajı (pop-up) çıkarmak için hangi fonksiyon kullanılır?", secenekler: ["msgBox()", "alert()", "warning()", "prompt()"], dogruCevap: 1, kategori: "JS", zorluk: "Kolay" },
    { soru: "Bir dizinin (array) eleman sayısını bulmak için hangi özellik kullanılır?", secenekler: ["size", "count", "length", "index"], dogruCevap: 2, kategori: "JS", zorluk: "Orta" },
    { soru: "JavaScript'te 'eşitlik ve tip' kontrolünü birlikte yapan operatör hangisidir?", secenekler: ["==", "===", "=", "!=="], dogruCevap: 1, kategori: "JS", zorluk: "Orta" },
    { soru: "Bir HTML elementini ID'sine göre seçmek için hangi standart JS metodu kullanılır?", secenekler: ["getElementByName()", "querySelector('#id')", "getElementById()", "İkisi de (2 ve 3)"], dogruCevap: 3, kategori: "JS", zorluk: "Orta" },
    { soru: "JavaScript'te tek satırlık yorum eklemek için hangi karakterler kullanılır?", secenekler: ["//", "/*", "<!--", "##"], dogruCevap: 0, kategori: "JS", zorluk: "Orta" },
    { soru: "JavaScript hangi tür bir dildir?", secenekler: ["Derlenen (Compiled)", "Yorumlanan (Interpreted)", "Makine Dili", "Sadece sunucu taraflı"], dogruCevap: 1, kategori: "JS", zorluk: "Zor" },
    { soru: "String bir ifadeyi tam sayıya çevirmek için hangi fonksiyon kullanılır?", secenekler: ["StringToInt()", "parseInteger()", "parseInt()", "Math.floor()"], dogruCevap: 2, kategori: "JS", zorluk: "Zor" },
    { soru: "JavaScript'te 'Sabit' (değeri değiştirilemeyen) değişken tanımlamak için ne kullanılır?", secenekler: ["var", "let", "const", "static"], dogruCevap: 2, kategori: "JS", zorluk: "Zor" },
    { soru: "Hangisi JavaScript'te bir döngü çeşidi DEĞİLDİR?", secenekler: ["for", "while", "do-while", "loop"], dogruCevap: 3, kategori: "JS", zorluk: "Zor" },
    { soru: "Bir fonksiyondan değer döndürmek için hangi anahtar kelime kullanılır?", secenekler: ["yield", "return", "output", "send"], dogruCevap: 1, kategori: "JS", zorluk: "Zor" },
    { soru: "Tarayıcı hafızasında kalıcı veri saklamak için JS'de ne kullanılır?", secenekler: ["sessionStorage", "cookies", "localStorage", "RAM"], dogruCevap: 2, kategori: "JS", zorluk: "Zor" },

    // --- JS/Diğer Karışık ---
    { soru: "DOM açılımı nedir?", secenekler: ["Document Object Model", "Data Object Model", "Document Oriented Model", "Data Oriented Model"], dogruCevap: 0, kategori: "JS", zorluk: "Orta" },
    { soru: "Hangisi geçerli bir JSON formatıdır?", secenekler: ["{name: 'Ali'}", "{'name': 'Ali'}", '{"name": "Ali"}', "['name': 'Ali']"], dogruCevap: 2, kategori: "JS", zorluk: "Zor" },
    { soru: "setTimeout() fonksiyonu ne işe yarar?", secenekler: ["Kodu belirli aralıklarla tekrar eder", "Kodu belirli bir süre sonra bir kez çalıştırır", "Sayfayı yeniler", "Zamanlayıcıyı durdurur"], dogruCevap: 1, kategori: "JS", zorluk: "Orta" },
    { soru: "Olay dinleyici eklemek için hangi metot kullanılır?", secenekler: ["on()", "listen()", "addEventListener()", "attach()"], dogruCevap: 2, kategori: "JS", zorluk: "Orta" },
    { soru: "Asenkron işlemlerde başarı durumunu yakalamak için Promise'de hangi blok kullanılır?", secenekler: ["catch", "finally", "then", "success"], dogruCevap: 2, kategori: "JS", zorluk: "Zor" },
    { soru: "Hangisi ES6 ile gelen bir özelliktir?", secenekler: ["var", "Arrow Functions (=>)", "for döngüsü", "function anahtar kelimesi"], dogruCevap: 1, kategori: "JS", zorluk: "Orta" },
    { soru: "NaN ne anlama gelir?", secenekler: ["Not a Null", "Not a Number", "New and Native", "No Action Needed"], dogruCevap: 1, kategori: "JS", zorluk: "Kolay" },
    { soru: "this anahtar kelimesi genel bağlamda (global scope) tarayıcıda nereyi işaret eder?", secenekler: ["document", "body", "window nesnesi", "undefined"], dogruCevap: 2, kategori: "JS", zorluk: "Zor" },
    { soru: "Bir dizinin sonuna eleman eklemek için hangi metot kullanılır?", secenekler: ["pop()", "push()", "shift()", "unshift()"], dogruCevap: 1, kategori: "JS", zorluk: "Kolay" },
    { soru: "Ternary operatörü (üçlü operatör) kullanımı nasıldır?", secenekler: ["if ? else :", "kosul ? dogru : yanlis", "kosul : dogru ? yanlis", "kosul -> dogru | yanlis"], dogruCevap: 1, kategori: "JS", zorluk: "Orta" },
    { soru: "typeof [] işleminin sonucu nedir?", secenekler: ["array", "list", "object", "undefined"], dogruCevap: 2, kategori: "JS", zorluk: "Zor" },
    { soru: "let x = '5' + 2; x'in değeri ne olur?", secenekler: ["7", "52", "NaN", "Hata verir"], dogruCevap: 1, kategori: "JS", zorluk: "Orta" },
    { soru: "BOM açılımı nedir?", secenekler: ["Browser Object Model", "Base Object Model", "Browser Output Model", "Binary Object Model"], dogruCevap: 0, kategori: "JS", zorluk: "Orta" },
    { soru: "URL'den parametreleri almak için hangi nesne kullanılır?", secenekler: ["URLParameters", "window.location.search", "document.query", "navigator.url"], dogruCevap: 1, kategori: "JS", zorluk: "Zor" },
    { soru: "Mobil cihaz ekran boyutlarını tespit edip duyarlı tasarım yapmak için CSS'de ne kullanılır?", secenekler: ["@media queries", "@responsive", "@mobile", "display: mobile"], dogruCevap: 0, kategori: "CSS", zorluk: "Orta" }
];

// Uygulama Değişkenleri
let tumSorular = []; // Admin soruları dahil tüm sorular
let aktifSorular = []; 
let havuz = [];        
let mevcutSoruIndeksi = 0;
let dogruSayisi = 0;
let yanlisSayisi = 0;
let toplamPuan = 0;
let aktifOyuncu = "";
let can = 3;
let pasHakki = 1;

let sayac;
let sureDegeri = 15;
let toplamCozumSuresi = 0;
let soruBaslangicZamani;

let yanlisCevaplananlar = [];

const SORU_SAYISI = 10; 
const SORU_PUANI = 10;  

// Audio Nesneleri
const sesDogru = new Audio('data:audio/mp3;base64,//NExAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq');
const sesYanlis = new Audio('data:audio/mp3;base64,//NExAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq');
// Gerçek projede base64 dataları dolu olmalıdır, şimdilik sessiz çalar.

$(window).on('load', function() {
    setTimeout(() => {
        $("#loading-ekrani").css("opacity", "0");
        setTimeout(() => $("#loading-ekrani").remove(), 500);
    }, 600);
});

$(document).ready(function() {
    
    tumSorulariHazirla();
    liderlikTablosunuGoster();
    gununSorusunuBelirle();

    // Dark Mode Toggle
    $("#btn-dark-mode").click(function() {
        $("body").toggleClass("dark-mode");
        let isDark = $("body").hasClass("dark-mode");
        $(this).html(isDark ? '<i class="bi bi-sun-fill"></i> Light Mode' : '<i class="bi bi-moon-fill"></i> Dark Mode');
        $(this).toggleClass("btn-outline-warning btn-outline-light");
    });

    // Quizi Başlat
    $("#btn-basla").click(function() {
        let isim = $("#oyuncu-ismi").val().trim();
        if(isim === "") {
            $("#isim-hata").removeClass("d-none");
            return;
        }
        
        $("#isim-hata").addClass("d-none");
        aktifOyuncu = isim;
        quiziBaslat();
    });

    // Pas Geç Butonu
    $("#btn-atla").click(function() {
        if(pasHakki > 0) {
            pasHakki--;
            // Puan veya can gitmez, ama doğru cevap da alınmaz.
            // Sadece süre kapanır ve sıradakine geçilir.
            clearInterval(sayac);
            $(this).addClass("disabled");
            $(this).html('<i class="bi bi-x-circle"></i> Pas Hakkı Bitti');
            
            // Eğer son soruysa sonucu göster
            if (mevcutSoruIndeksi === aktifSorular.length - 1) {
                setTimeout(sonucuGoster, 500);
            } else {
                mevcutSoruIndeksi++;
                soruyuGoster();
            }
        }
    });

    // Sonraki Soru
    $("#btn-sonraki").click(function() {
        mevcutSoruIndeksi++; 
        if (mevcutSoruIndeksi < aktifSorular.length) {
            soruyuGoster();
        } else {
            sonucuGoster();
        }
    });

    // Modal Yeniden Başlat
    $("#btn-modal-yeniden").click(function() {
        $("#sonucModal").modal('hide');
        $("#quiz-ekrani").addClass("d-none");
        $("#baslangic-ekrani").removeClass("d-none");
    });

    // Admin Paneli Aç
    $("#btn-admin-panel").click(function() {
        $("#adminModal").modal('show');
    });

    // Admin Kaydet
    $("#btn-admin-kaydet").click(function() {
        let s = $("#admin-soru").val().trim();
        let c1 = $("#admin-sik1").val().trim();
        let c2 = $("#admin-sik2").val().trim();
        let c3 = $("#admin-sik3").val().trim();
        let c4 = $("#admin-sik4").val().trim();
        let kat = $("#admin-kategori").val();
        let zor = $("#admin-zorluk").val();

        if(s === "" || c1 === "" || c2 === "" || c3 === "" || c4 === "") {
            alert("Lütfen tüm alanları doldurun!");
            return;
        }

        let yeniSoru = {
            soru: s,
            secenekler: [c1, c2, c3, c4],
            dogruCevap: 0,
            kategori: kat,
            zorluk: zor
        };

        let custom = JSON.parse(localStorage.getItem("customSorular")) || [];
        custom.push(yeniSoru);
        localStorage.setItem("customSorular", JSON.stringify(custom));

        alert("Soru başarıyla DB'ye (LocalStorage) eklendi!");
        $("#adminModal").modal('hide');
        
        // Formu temizle
        $("#admin-soru, #admin-sik1, #admin-sik2, #admin-sik3, #admin-sik4").val("");
        
        tumSorulariHazirla(); // Listeyi güncelle
    });
});

/**
 * Tüm soruları DB'den ve sabit listeden çekip birleştirir.
 */
function tumSorulariHazirla() {
    let custom = JSON.parse(localStorage.getItem("customSorular")) || [];
    let birlesik = [...anaSorular, ...custom];
    
    // Güvenlik Önlemi: Boş soru veya eksik/boş şık içeren tüm bozuk soruları otomatik çöpe at (filtrele)
    tumSorular = birlesik.filter(s => {
        return s && 
               typeof s.soru === 'string' && s.soru.trim() !== "" && 
               Array.isArray(s.secenekler) && s.secenekler.length === 4 &&
               s.secenekler.every(sik => typeof sik === 'string' && sik.trim() !== "");
    });
}

/**
 * Günün sorusu algoritması (Tarihe göre index belirler)
 */
function gununSorusunuBelirle() {
    if(tumSorular.length === 0) return;
    let bugun = new Date();
    let index = (bugun.getFullYear() + bugun.getMonth() + bugun.getDate()) % tumSorular.length;
    let tGunun = $('<div>').text(tumSorular[index].soru).html();
    $("#gunun-sorusu-metni").html(`<strong>[${tumSorular[index].kategori} - ${tumSorular[index].zorluk}]</strong> ${tGunun}`);
}

function quiziBaslat() {
    mevcutSoruIndeksi = 0;
    dogruSayisi = 0;
    yanlisSayisi = 0;
    toplamPuan = 0;
    can = 3;
    pasHakki = 1;
    toplamCozumSuresi = 0;
    yanlisCevaplananlar = [];

    canlariCiz();
    
    $("#btn-atla").removeClass("disabled").html('<i class="bi bi-skip-forward-fill"></i> Pas Geç (1 Hakkın Kaldı)');

    // Filtreleme İşlemi
    let secilenKat = $("#kategori-secimi").val();
    let secilenZorluk = $("#zorluk-secimi").val();
    
    havuz = tumSorular.filter(s => {
        let katUygun = (secilenKat === "Tümü" || s.kategori === secilenKat);
        let zorUygun = (secilenZorluk === "Tümü" || s.zorluk === secilenZorluk);
        return katUygun && zorUygun;
    });

    if (havuz.length < SORU_SAYISI) {
        alert(`Seçtiğiniz kriterlerde yeterli soru yok (${havuz.length} adet bulundu). Filtreleri esneterek rastgele tüm havuzu kullanıyoruz.`);
        havuz = [...tumSorular];
    }

    havuz.sort(() => Math.random() - 0.5);
    aktifSorular = havuz.splice(0, SORU_SAYISI);

    $("#baslangic-ekrani").addClass("d-none");
    $("#quiz-ekrani").removeClass("d-none");

    soruyuGoster();
}

function canlariCiz() {
    let html = "";
    for(let i=0; i<3; i++) {
        if(i < can) html += '<i class="bi bi-heart-fill"></i> ';
        else html += '<i class="bi bi-heartbreak text-muted"></i> ';
    }
    $("#can-kapsayici").html(html);
}

function sureyiBaslat() {
    clearInterval(sayac);
    sureDegeri = 15;
    soruBaslangicZamani = Date.now();
    $("#sayac-metni").text(sureDegeri);
    $(".timer-badge").removeClass("danger");

    sayac = setInterval(() => {
        sureDegeri--;
        $("#sayac-metni").text(sureDegeri);
        
        if(sureDegeri <= 5) {
            $(".timer-badge").addClass("danger");
        }

        if(sureDegeri <= 0) {
            clearInterval(sayac);
            zamanDoldu();
        }
    }, 1000);
}

function zamanDoldu() {
    sesYanlis.play().catch(e => {}); // Ses çalmayı dene
    
    canGitti();
    
    let dogruIndeks = aktifSorular[mevcutSoruIndeksi].dogruCevap;
    let tumSecenekler = $(".secenek-btn");
    tumSecenekler.prop("disabled", true);
    
    $(tumSecenekler[dogruIndeks]).addClass("dogru").append(" (Süre Bitti)");
    $("#btn-sonraki").removeClass("d-none");
    $("#btn-atla").addClass("disabled");
}

function canGitti() {
    can--;
    yanlisSayisi++;
    canlariCiz();
    
    // Yanlış listesine ekle
    yanlisCevaplananlar.push(aktifSorular[mevcutSoruIndeksi]);

    if(can === 0) {
        clearInterval(sayac);
        setTimeout(() => {
            sonucuGoster();
        }, 1500);
    }
}

function soruyuGoster() {
    $("#btn-sonraki").addClass("d-none");
    if(pasHakki > 0) $("#btn-atla").removeClass("disabled");
    else $("#btn-atla").addClass("disabled");
    
    let soruNesnesi = aktifSorular[mevcutSoruIndeksi];
    
    $("#soru-sayaci-yazi").text(`${mevcutSoruIndeksi + 1}/${aktifSorular.length} soru tamamlandı`);
    $("#puan-gosterge").text(`Puan: ${toplamPuan}`);
    
    // Progress bar hesaplama
    let yuzde = ((mevcutSoruIndeksi) / aktifSorular.length) * 100;
    $("#quiz-progress-bar").css("width", yuzde + "%");
    
    let temizSoru = $('<div>').text(soruNesnesi.soru).html();
    $("#soru-metni").html(`<span class="badge bg-secondary me-2">${soruNesnesi.zorluk}</span> ${temizSoru}`);
    
    let seceneklerAlani = $("#secenekler-alani");
    seceneklerAlani.empty();
    
    // Şıkları karıştırırken doğru cevabın yeni indeksini takip etmek için array of objects yapalım
    let karisikSiklar = soruNesnesi.secenekler.map((metin, index) => {
        return { metin: metin, orjIndex: index };
    });
    
    // Şıkları karıştır
    karisikSiklar.sort(() => Math.random() - 0.5);
    
    // Yeni doğru cevabı bul
    let yeniDogruIndeks = karisikSiklar.findIndex(s => s.orjIndex === soruNesnesi.dogruCevap);
    
    // Geçici olarak nesneye kaydedelim
    soruNesnesi.aktifDogruIndeks = yeniDogruIndeks;

    $.each(karisikSiklar, function(indeks, obj) {
        let temizSik = $('<div>').text(obj.metin).html();
        let buton = $(`<button class="secenek-btn w-100">${temizSik}</button>`);
        buton.click(function() {
            cevapKontrol(indeks, this);
        });
        seceneklerAlani.append(buton);
    });

    sureyiBaslat();
}

function cevapKontrol(secilenIndeks, butonElement) {
    clearInterval(sayac); // Süreyi durdur
    $("#btn-atla").addClass("disabled");
    
    // Harcanan süreyi hesapla ve toplam süreye ekle
    let harcananSure = Math.floor((Date.now() - soruBaslangicZamani) / 1000);
    toplamCozumSuresi += harcananSure;

    let dogruIndeks = aktifSorular[mevcutSoruIndeksi].aktifDogruIndeks;
    let tumSecenekler = $(".secenek-btn");
    
    tumSecenekler.prop("disabled", true);
    
    if (secilenIndeks === dogruIndeks) {
        sesDogru.play().catch(e=>{});
        $(butonElement).addClass("dogru");
        $(butonElement).append(' <span class="float-end">✅ 😎</span>');
        dogruSayisi++;
        
        // Süre bonusu (Hızlı çözen daha çok alır)
        let bonus = Math.max(0, 15 - harcananSure);
        toplamPuan += (SORU_PUANI + bonus);
        
        $("#puan-gosterge").text(`Puan: ${toplamPuan}`);
    } else {
        sesYanlis.play().catch(e=>{});
        $(butonElement).addClass("yanlis");
        $(butonElement).append(' <span class="float-end">❌</span>');
        $(tumSecenekler[dogruIndeks]).addClass("dogru").append(' <span class="float-end">👈 Doğru</span>');
        
        canGitti();
    }
    
    if(can > 0) {
        $("#btn-sonraki").removeClass("d-none");
    }
}

function sonucuGoster() {
    clearInterval(sayac);
    $("#quiz-progress-bar").css("width", "100%");
    
    // Modal Bilgilerini Doldur
    $("#modal-dogru").text(dogruSayisi);
    $("#modal-yanlis").text(yanlisSayisi);
    $("#modal-sure").text(toplamCozumSuresi + "s");
    $("#modal-puan").text(toplamPuan);

    // Rozet Belirleme
    let maxOlasipuan = (SORU_SAYISI * SORU_PUANI) + (SORU_SAYISI * 15); // Max Puan ~250
    let rozetIkon = "🥉";
    let rozetIsim = "Beginner";
    
    if(toplamPuan > 180) {
        rozetIkon = "👑";
        rozetIsim = "JS Ninja";
    } else if (toplamPuan > 100) {
        rozetIkon = "🏆";
        rozetIsim = "Web Master";
    }

    if(can === 0) {
        rozetIkon = "💀";
        rozetIsim = "Game Over";
    }

    $("#rozet-ikon").text(rozetIkon);
    $("#rozet-isim").text(rozetIsim);

    // Yanlışları Listele
    let listUI = $("#yanlis-sorular-listesi");
    listUI.empty();
    if(yanlisCevaplananlar.length > 0) {
        $("#yanlis-sorular-alani").removeClass("d-none");
        yanlisCevaplananlar.forEach(s => {
            let tSoru = $('<div>').text(s.soru).html();
            let tCevap = $('<div>').text(s.secenekler[s.dogruCevap]).html();
            listUI.append(`<li class="list-group-item bg-danger bg-opacity-10 border-danger text-dark small">
                <strong>Soru:</strong> ${tSoru} <br>
                <strong>Cevap:</strong> ${tCevap}
            </li>`);
        });
    } else {
        $("#yanlis-sorular-alani").addClass("d-none");
    }

    // Modal'ı Göster
    let sonucModal = new bootstrap.Modal(document.getElementById('sonucModal'));
    sonucModal.show();
    
    // Skoru Kaydet
    if(toplamPuan > 0) skoruKaydet();
}

function skoruKaydet() {
    let skorlar = JSON.parse(localStorage.getItem("webQuizLiderlik")) || [];
    
    let yeniSkor = {
        isim: aktifOyuncu,
        puan: toplamPuan,
        sure: toplamCozumSuresi
    };
    
    skorlar.push(yeniSkor);
    
    // Puanlara göre azalan, puan eşitse süreye göre artan (kısa süre daha iyi) sırala
    skorlar.sort((a, b) => {
        if(b.puan === a.puan) {
            return a.sure - b.sure;
        }
        return b.puan - a.puan;
    });
    
    if(skorlar.length > 10) skorlar = skorlar.slice(0, 10);
    
    localStorage.setItem("webQuizLiderlik", JSON.stringify(skorlar));
    liderlikTablosunuGoster();
}

function liderlikTablosunuGoster() {
    let skorlar = JSON.parse(localStorage.getItem("webQuizLiderlik")) || [];
    let tablo = $("#liderlik-tablosu");
    
    tablo.empty();
    
    if(skorlar.length === 0) {
        tablo.append('<li class="list-group-item text-muted text-center py-4">Henüz skor kaydedilmedi.</li>');
        return;
    }
    
    $.each(skorlar, function(indeks, skorObje) {
        let siralamClass = "";
        if(indeks === 0) siralamClass = "top-1"; 
        else if (indeks === 1) siralamClass = "top-2"; 
        else if (indeks === 2) siralamClass = "top-3"; 
        
        let satir = `
            <li class="list-group-item liderlik-item ${siralamClass}">
                <div class="d-flex align-items-center">
                    <span class="liderlik-sira shadow-sm">${indeks + 1}</span>
                    <span class="text-truncate fw-bold" style="max-width: 150px;" title="${skorObje.isim}">${skorObje.isim}</span>
                </div>
                <div class="text-end">
                    <span class="badge bg-primary rounded-pill px-2 py-1 shadow-sm d-block mb-1">${skorObje.puan} Puan</span>
                    <small class="text-muted" style="font-size:0.75rem;"><i class="bi bi-clock"></i> ${skorObje.sure}s</small>
                </div>
            </li>
        `;
        tablo.append(satir);
    });
}
