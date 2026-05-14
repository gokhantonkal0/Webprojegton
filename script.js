// ==========================================
// GELİŞMİŞ QUIZ MOTORU V3 - JOKER VE ANALİZ SİSTEMİ
// ==========================================

let oyuncuAdi = "";
let secilenKategori = "Tümü";
let secilenZorluk = "Tümü";
let secilenSoruSayisi = 10;

// Oynanacak ve filtrelenmiş tüm sorular
let tumFiltrelenmisSorular = [];
let suAnkiOyunSorulari = [];
let suAnkiSoruSirasi = 0;
let toplamPuanim = 0;
let dogruSayisi = 0;
let yanlisSayisi = 0;
let pasSayisi = 0;

let secimYapildiMi = false;

// Zamanlayıcı
let zamanSayaci;
let kalanSure = 20;

// Joker Durumları
let joker50Kullanildi = false;
let jokerCiftKullanildi = false;
let jokerPasKullanildi = false;

let ciftCevapAktifMi = false;
let ciftCevapIlkHataYapildiMi = false;

// Soru Geçmişini Tutacak Dizi
let soruGecmisi = [];

// Zayıf Konuları Analiz Etmek İçin Sözlük
let yanlisKonular = {};

$(window).on("load", function () {
    setTimeout(() => {
        $("#loading-ekrani").fadeOut(400, function () {
            $(this).remove();
        });
    }, 400);
});

$(document).ready(function () {
    liderlikTablosunuCiz();

    $("#btn-basla").click(() => oyunuBaslat());
    $("#btn-sonraki").click(() => sonrakiSoru());
    $("#btn-temizle").click(() => liderlikTemizle());
    
    // Joker Butonları Olay Dinleyicileri
    $("#btn-joker-50").click(function() {
        if (!joker50Kullanildi && !secimYapildiMi) joker50Kullan();
    });

    $("#btn-joker-cift").click(function() {
        if (!jokerCiftKullanildi && !secimYapildiMi) jokerCiftKullan();
    });

    $("#btn-joker-pas").click(function() {
        if (!jokerPasKullanildi && !secimYapildiMi) jokerPasKullan();
    });

    $("#oyuncu-ismi").keypress(function (e) {
        if (e.which == 13) oyunuBaslat();
    });

    $("#btn-dark-mode").click(function () {
        $("body").toggleClass("dark-mode");
    });

    $("#btn-modal-yeniden").click(() => {
        window.location.reload();
    });
});

// ==========================================
// DİZİ KARIŞTIRMA FONKSİYONU (SHUFFLE)
// ==========================================
function shuffleArray(array) {
    let newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
}

// ==========================================
// OYUN BAŞLATMA & FİLTRELEME
// ==========================================

function oyunuBaslat() {
    oyuncuAdi = $("#oyuncu-ismi").val().trim();
    secilenKategori = $("#secim-kategori").val();
    secilenZorluk = $("#secim-zorluk").val();
    secilenSoruSayisi = parseInt($("#secim-sayi").val());

    if (oyuncuAdi === "") {
        alert("Lütfen oyuna başlamadan önce adınızı giriniz.");
        return;
    }

    // Soruları Filtrele
    let filtrelenmis = questions.filter(q => {
        let katUygun = (secilenKategori === "Tümü" || q.category === secilenKategori);
        let zorUygun = (secilenZorluk === "Tümü" || q.difficulty === secilenZorluk);
        return katUygun && zorUygun;
    });

    if (filtrelenmis.length === 0) {
        alert("Bu filtrelere uygun soru bulunamadı. Lütfen filtreleri değiştirin.");
        return;
    }

    // Olası bir "Pas" durumunda yerine koymak üzere tüm uygun soruları karıştırıp saklayalım
    tumFiltrelenmisSorular = shuffleArray(filtrelenmis);

    if (tumFiltrelenmisSorular.length < secilenSoruSayisi) {
        alert(`Seçtiğiniz kriterlerde sadece ${tumFiltrelenmisSorular.length} soru bulundu. Oyun ${tumFiltrelenmisSorular.length} soru ile başlayacak.`);
        secilenSoruSayisi = tumFiltrelenmisSorular.length;
    }

    // Oynanacak ilk soruları al
    suAnkiOyunSorulari = tumFiltrelenmisSorular.slice(0, secilenSoruSayisi);

    // Değişkenleri Sıfırla
    suAnkiSoruSirasi = 0;
    toplamPuanim = 0;
    dogruSayisi = 0;
    yanlisSayisi = 0;
    pasSayisi = 0;
    soruGecmisi = [];
    yanlisKonular = {};
    
    joker50Kullanildi = false;
    jokerCiftKullanildi = false;
    jokerPasKullanildi = false;

    $("#giris-ekrani").addClass("d-none");
    $("#quiz-ekrani").removeClass("d-none");

    soruGoster();
}

// ==========================================
// SORU GÖSTERME
// ==========================================

function soruGoster() {
    secimYapildiMi = false;
    ciftCevapAktifMi = false;
    ciftCevapIlkHataYapildiMi = false;

    $("#btn-sonraki").addClass("d-none");
    $("#aciklama-paneli").addClass("d-none").removeClass("show");
    
    jokerArayuzGuncelle();

    let soruObjesi = suAnkiOyunSorulari[suAnkiSoruSirasi];
    let toplamSoru = suAnkiOyunSorulari.length;

    $("#soru-sayaci-yazi").text(`Soru ${suAnkiSoruSirasi + 1}/${toplamSoru}`);
    $("#puan-gosterge").html(`<i class="bi bi-star-fill text-warning me-1"></i> Puan: ${toplamPuanim}`);
    
    let ilerlemeYuzdesi = ((suAnkiSoruSirasi) / toplamSoru) * 100;
    $("#quiz-progress-bar").css("width", ilerlemeYuzdesi + "%");

    let kategori = soruObjesi.category || "Genel";
    let zorluk = soruObjesi.difficulty || "Bilinmiyor";
    
    let zorlukClass = zorluk === "Kolay" ? "bg-success" : zorluk === "Orta" ? "bg-warning text-dark" : "bg-danger";

    $("#soru-kategori").text(kategori);
    $("#soru-zorluk").text(zorluk).removeClass().addClass(`badge ms-2 ${zorlukClass}`);
    $("#soru-metni").html(guvenliYazi(soruObjesi.question));

    let alan = $("#secenekler-alani");
    alan.empty();

    // Şıkları karıştırma işlemi
    let indeksliSiklar = soruObjesi.options.map((m, i) => {
        return { metin: m, originalIndex: i };
    });

    let karisikSiklar = shuffleArray(indeksliSiklar);

    karisikSiklar.forEach(obj => {
        let btn = $(`<button class="secenek-btn w-100 shadow-sm" data-index="${obj.originalIndex}">${guvenliYazi(obj.metin)}</button>`);
        btn.click(function () {
            cevapKontrol(obj.originalIndex, this, soruObjesi);
        });
        alan.append(btn);
    });

    sureBaslat(soruObjesi);
}

// ==========================================
// ZAMANLAYICI (TIMER)
// ==========================================

function sureBaslat(soruObjesi) {
    clearInterval(zamanSayaci);
    kalanSure = 20;
    
    $("#sure-sayaci").text(kalanSure).removeClass("text-danger");
    $("#timer-progress-bar").css({"width": "100%", "transition": "none"}).removeClass("bg-danger").addClass("bg-info");

    // Animasyon başlat
    setTimeout(() => {
        $("#timer-progress-bar").css("transition", "width 1s linear");
    }, 50);

    zamanSayaci = setInterval(() => {
        kalanSure--;
        $("#sure-sayaci").text(kalanSure);
        
        let yuzde = (kalanSure / 20) * 100;
        $("#timer-progress-bar").css("width", yuzde + "%");

        if (kalanSure <= 5) {
            $("#sure-sayaci").addClass("text-danger");
            $("#timer-progress-bar").removeClass("bg-info").addClass("bg-danger");
        }

        if (kalanSure <= 0) {
            clearInterval(zamanSayaci);
            sureBitti(soruObjesi);
        }
    }, 1000);
}

function sureBitti(soruObjesi) {
    if (secimYapildiMi) return;
    secimYapildiMi = true;

    $(".secenek-btn").prop("disabled", true);
    jokerleriKapat();
    yanlisSayisi++;
    
    // Konu Analizi için Yanlışı Kaydet
    konuyuEkle(soruObjesi.category);

    // Doğru cevabı bul
    let dogruIndeks = soruObjesi.answer;
    let dogruMetinHTML = "";

    $(".secenek-btn").each(function() {
        if (parseInt($(this).attr("data-index")) === dogruIndeks) {
            $(this).addClass("dogru").css("border-style", "dashed");
            dogruMetinHTML = $(this).text();
        }
    });

    gecmiseEkle(soruObjesi, "Süre Bitti", dogruMetinHTML, "Süre Bitti");
    aciklamayiGoster(soruObjesi);
}

// ==========================================
// JOKER SİSTEMİ
// ==========================================

function jokerArayuzGuncelle() {
    // 50/50
    if (joker50Kullanildi) $("#btn-joker-50").prop("disabled", true).addClass("btn-outline-secondary").removeClass("btn-warning").html('<i class="bi bi-x-circle"></i> 50/50');
    else $("#btn-joker-50").prop("disabled", false).addClass("btn-warning").removeClass("btn-outline-secondary").html('<i class="bi bi-magic"></i> 50/50');

    // Çift Cevap
    if (jokerCiftKullanildi) $("#btn-joker-cift").prop("disabled", true).addClass("btn-outline-secondary").removeClass("btn-info text-dark").html('<i class="bi bi-x-circle"></i> Çift Cevap');
    else $("#btn-joker-cift").prop("disabled", false).addClass("btn-info text-dark").removeClass("btn-outline-secondary").html('<i class="bi bi-bullseye"></i> Çift Cevap');

    // Pas
    if (jokerPasKullanildi) $("#btn-joker-pas").prop("disabled", true).addClass("btn-outline-secondary").removeClass("btn-secondary").html('<i class="bi bi-x-circle"></i> Pas');
    else $("#btn-joker-pas").prop("disabled", false).addClass("btn-secondary").removeClass("btn-outline-secondary").html('<i class="bi bi-skip-forward-fill"></i> Pas');
}

function jokerleriKapat() {
    $("#btn-joker-50, #btn-joker-cift, #btn-joker-pas").prop("disabled", true);
}

function joker50Kullan() {
    joker50Kullanildi = true;
    jokerArayuzGuncelle();
    
    let soruObjesi = suAnkiOyunSorulari[suAnkiSoruSirasi];
    let dogruIndeks = soruObjesi.answer;
    
    let yanlisButonlar = [];
    $(".secenek-btn").each(function() {
        if (parseInt($(this).attr("data-index")) !== dogruIndeks) {
            yanlisButonlar.push($(this));
        }
    });

    yanlisButonlar = shuffleArray(yanlisButonlar);
    yanlisButonlar[0].animate({opacity: 0}, 400, function() { $(this).css("visibility", "hidden"); });
    yanlisButonlar[1].animate({opacity: 0}, 400, function() { $(this).css("visibility", "hidden"); });
}

function jokerCiftKullan() {
    jokerCiftKullanildi = true;
    ciftCevapAktifMi = true;
    ciftCevapIlkHataYapildiMi = false;
    jokerArayuzGuncelle();
    // Butonu ekranda aktif olarak işaretleyelim (renk efekti vb.)
    $("#btn-joker-cift").removeClass("btn-outline-secondary").addClass("btn-success text-white").html('<i class="bi bi-bullseye"></i> Çift Seçim Aktif');
}

function jokerPasKullan() {
    jokerPasKullanildi = true;
    secimYapildiMi = true;
    clearInterval(zamanSayaci);
    jokerArayuzGuncelle();
    jokerleriKapat();
    pasSayisi++;

    let soruObjesi = suAnkiOyunSorulari[suAnkiSoruSirasi];
    
    // Doğru cevabı bul (sadece tabloya yazmak için)
    let dogruMetinHTML = soruObjesi.options[soruObjesi.answer];
    gecmiseEkle(soruObjesi, "Pas Geçildi", dogruMetinHTML, "Pas");

    // Soru değiştirme mekanizması
    // Havuzda kullanılmamış soru var mı bakalım:
    let kullanilanSoruMetinleri = suAnkiOyunSorulari.map(q => q.question);
    let yeniSoru = tumFiltrelenmisSorular.find(q => !kullanilanSoruMetinleri.includes(q.question));

    if (yeniSoru) {
        // Yerine yeni soru ekle
        suAnkiOyunSorulari.splice(suAnkiSoruSirasi + 1, 0, yeniSoru);
        alert("Pas jokeri kullanıldı! Bu soru atlanıp yerine yeni bir soru eklendi.");
    } else {
        alert("Pas jokeri kullanıldı! Havuzda başka uygun soru olmadığı için direkt atlanıyor.");
    }
    
    sonrakiSoru();
}

// ==========================================
// CEVAP KONTROL & AÇIKLAMA
// ==========================================

function cevapKontrol(secilenIndeks, butonHTML, soruObjesi) {
    if (secimYapildiMi) return;
    
    let dogruIndeks = soruObjesi.answer;

    // --- ÇİFT CEVAP JOKERİ AKTİF VE İLK SEÇİM YANLIŞ İSE ---
    if (ciftCevapAktifMi && !ciftCevapIlkHataYapildiMi && secilenIndeks !== dogruIndeks) {
        ciftCevapIlkHataYapildiMi = true;
        $(butonHTML).addClass("yanlis").prop("disabled", true).append(' <i class="bi bi-x-circle-fill float-end fs-5"></i>');
        // Süre devam eder, seçim bitmemiştir
        return; 
    }

    // --- NORMAL VEYA İKİNCİ SEÇİM AKIŞI ---
    secimYapildiMi = true;
    clearInterval(zamanSayaci);
    $(".secenek-btn").prop("disabled", true);
    jokerleriKapat();
    
    let kazanilanPuan = 0;
    let durum = "";
    let verilenCevapHTML = $(butonHTML).text();
    let dogruMetinHTML = "";

    // Doğru cevabın butonunu ve metnini bul
    $(".secenek-btn").each(function() {
        if (parseInt($(this).attr("data-index")) === dogruIndeks) {
            dogruMetinHTML = $(this).text();
        }
    });

    if (secilenIndeks === dogruIndeks) {
        // DOĞRU
        $(butonHTML).addClass("dogru win-anim").append(' <i class="bi bi-check-circle-fill float-end fs-5"></i>');
        
        // Puan hesaplama
        if (soruObjesi.difficulty === "Kolay") kazanilanPuan = 10;
        else if (soruObjesi.difficulty === "Orta") kazanilanPuan = 15;
        else if (soruObjesi.difficulty === "Zor") kazanilanPuan = 20;
        else kazanilanPuan = 10;

        // Çift cevap jokerinde 2. hakkında bildiyse yarım puan
        if (ciftCevapIlkHataYapildiMi) {
            kazanilanPuan = kazanilanPuan / 2;
            durum = "Doğru (2. Hak)";
        } else {
            durum = "Doğru";
        }

        toplamPuanim += kazanilanPuan;
        dogruSayisi++;
        $("#puan-gosterge").html(`<i class="bi bi-star-fill text-warning me-1"></i> Puan: ${toplamPuanim}`);
    } else {
        // YANLIŞ
        $(butonHTML).addClass("yanlis").append(' <i class="bi bi-x-circle-fill float-end fs-5"></i>');
        yanlisSayisi++;
        durum = "Yanlış";
        
        konuyuEkle(soruObjesi.category);

        // Doğru şıkkı yeşil işaretle
        $(".secenek-btn").each(function() {
            if (parseInt($(this).attr("data-index")) === dogruIndeks) {
                $(this).addClass("dogru text-opacity-75").css("border-style", "dashed");
            }
        });
    }

    gecmiseEkle(soruObjesi, verilenCevapHTML, dogruMetinHTML, durum);
    aciklamayiGoster(soruObjesi);
}

function konuyuEkle(kategori) {
    let kat = kategori || "Diğer";
    if (!yanlisKonular[kat]) yanlisKonular[kat] = 0;
    yanlisKonular[kat]++;
}

function aciklamayiGoster(soruObjesi) {
    $("#aciklama-metni").html(guvenliYazi(soruObjesi.explanation));
    $("#aciklama-paneli").removeClass("d-none");
    
    setTimeout(() => {
        $("#aciklama-paneli").addClass("show");
    }, 50);

    $("#btn-sonraki").removeClass("d-none");
}

function gecmiseEkle(soruObjesi, verilen, dogru, durum) {
    soruGecmisi.push({
        soru: soruObjesi.question,
        verilen: verilen,
        dogru: dogru,
        durum: durum,
        kategori: soruObjesi.category,
        zorluk: soruObjesi.difficulty
    });
}

// ==========================================
// SONRAKİ SORU / BİTİŞ & ANALİZ
// ==========================================

function sonrakiSoru() {
    suAnkiSoruSirasi++;

    if (suAnkiSoruSirasi >= suAnkiOyunSorulari.length) {
        oyunuBitir();
    } else {
        soruGoster();
    }
}

function oyunuBitir() {
    $("#quiz-progress-bar").css("width", "100%");
    clearInterval(zamanSayaci);
    
    setTimeout(() => {
        let maxPotansiyelPuan = 0;
        suAnkiOyunSorulari.forEach(q => {
            if (q.difficulty === "Kolay") maxPotansiyelPuan += 10;
            else if (q.difficulty === "Orta") maxPotansiyelPuan += 15;
            else if (q.difficulty === "Zor") maxPotansiyelPuan += 20;
            else maxPotansiyelPuan += 10;
        });

        let basariYuzdesi = maxPotansiyelPuan > 0 ? Math.round((toplamPuanim / maxPotansiyelPuan) * 100) : 0;
        
        // Zayıf konu tespiti
        let enZayif = "Yok";
        let zayifListe = Object.keys(yanlisKonular).sort((a,b) => yanlisKonular[b] - yanlisKonular[a]);
        if (zayifListe.length > 0) enZayif = zayifListe[0];

        skorKaydet(basariYuzdesi, enZayif);
        
        // Modal Bilgileri
        $("#sonuc-oyuncu-adi").text(oyuncuAdi);
        $("#modal-puan").text(toplamPuanim);
        $("#modal-dogru").text(dogruSayisi);
        $("#modal-yanlis").text(yanlisSayisi);
        $("#modal-pas").text(pasSayisi);
        $("#modal-yuzde").text(`%${basariYuzdesi}`);

        if (basariYuzdesi >= 91) {
            $("#rozet-ikon").text("👑");
            $("#rozet-isim").text("Web Uzmanı").removeClass().addClass("text-success fw-bold mb-1");
        } else if (basariYuzdesi >= 71) {
            $("#rozet-ikon").text("🎖️");
            $("#rozet-isim").text("Başarılı").removeClass().addClass("text-primary fw-bold mb-1");
        } else if (basariYuzdesi >= 41) {
            $("#rozet-ikon").text("📈");
            $("#rozet-isim").text("Gelişiyor").removeClass().addClass("text-warning fw-bold mb-1");
        } else {
            $("#rozet-ikon").text("🌱");
            $("#rozet-isim").text("Başlangıç Seviyesi").removeClass().addClass("text-secondary fw-bold mb-1");
        }

        // Eksik Konu Analizi Çizimi
        let analizKutusu = $("#analiz-icerik");
        analizKutusu.empty();
        
        if (zayifListe.length === 0) {
            analizKutusu.append(`<div class="text-success fw-bold"><i class="bi bi-emoji-sunglasses"></i> Hiç yanlışın yok, harikasın!</div>`);
        } else {
            let html = `<ul class="list-group list-group-flush mb-3">`;
            zayifListe.forEach(kat => {
                html += `<li class="list-group-item d-flex justify-content-between align-items-center bg-transparent px-0 py-1 border-0">
                            ${kat}
                            <span class="badge bg-danger rounded-pill">${yanlisKonular[kat]} yanlış</span>
                         </li>`;
            });
            html += `</ul>`;
            html += `<div class="alert alert-warning py-2 px-3 mb-0" style="font-size: 0.85rem;">
                        <strong>Öneri:</strong> En çok <b>${zayifListe[0]}</b> konusunda hata yaptın, bu konuyu tekrar etmen iyi olur.
                     </div>`;
            analizKutusu.append(html);
        }

        // Geçmiş Tablosu
        let tabloBody = $("#sonuc-gecmis-tablosu");
        tabloBody.empty();

        soruGecmisi.forEach((g, i) => {
            let durumClass = g.durum.includes("Doğru") ? "text-success" : (g.durum === "Pas" ? "text-secondary" : (g.durum === "Süre Bitti" ? "text-warning" : "text-danger"));
            let durumIkon = g.durum.includes("Doğru") ? "bi-check-circle-fill" : (g.durum === "Pas" ? "bi-skip-forward-fill" : (g.durum === "Süre Bitti" ? "bi-clock-fill" : "bi-x-circle-fill"));
            
            tabloBody.append(`
                <tr>
                    <td class="fw-bold">${i + 1}</td>
                    <td>
                        <div class="fw-medium">${guvenliYazi(g.soru)}</div>
                        <span class="badge bg-secondary" style="font-size: 0.65rem;">${g.kategori} - ${g.zorluk}</span>
                    </td>
                    <td class="${durumClass}">${guvenliYazi(g.verilen)}</td>
                    <td class="text-success">${guvenliYazi(g.dogru)}</td>
                    <td class="fw-bold ${durumClass}"><i class="bi ${durumIkon}"></i> ${g.durum === "Doğru (2. Hak)" ? "<small>(2.Hak)</small>" : ""}</td>
                </tr>
            `);
        });

        let modal = new bootstrap.Modal(document.getElementById("sonucModal"));
        modal.show();
    }, 500);
}

// ==========================================
// LİDERLİK TABLOSU (LOCALSTORAGE)
// ==========================================

function skorKaydet(yuzde, enZayif) {
    let skorlar = JSON.parse(localStorage.getItem("quizSkorlarV3")) || [];
    
    let yeniSkor = {
        isim: oyuncuAdi,
        puan: toplamPuanim,
        yuzde: yuzde,
        pasSayisi: pasSayisi,
        enZayifKonu: enZayif,
        kategori: secilenKategori,
        zorluk: secilenZorluk,
        tarih: new Date().toLocaleDateString('tr-TR')
    };

    skorlar.push(yeniSkor);
    
    skorlar.sort((a, b) => {
        if (b.puan !== a.puan) return b.puan - a.puan;
        return b.yuzde - a.yuzde;
    });
    
    skorlar = skorlar.slice(0, 10);
    localStorage.setItem("quizSkorlarV3", JSON.stringify(skorlar));
    liderlikTablosunuCiz();
}

function liderlikTablosunuCiz() {
    let skorlar = JSON.parse(localStorage.getItem("quizSkorlarV3")) || [];
    let tablo = $("#liderlik-tablosu-govde");
    tablo.empty();

    if (skorlar.length === 0) {
        tablo.append(`<tr><td colspan="4" class="text-muted py-4"><i class="bi bi-info-circle mb-2 d-block fs-3"></i>Henüz kimse oynamadı.<br>İlk sen ol!</td></tr>`);
        return;
    }

    skorlar.forEach((kisi, sira) => {
        let madalyaIcon = sira === 0 ? "👑" : sira === 1 ? "🥈" : sira === 2 ? "🥉" : `<span class="text-muted">${sira + 1}</span>`;
        let highlightClass = (kisi.isim === oyuncuAdi) ? "table-primary fw-bold" : "";

        tablo.append(`
            <tr class="${highlightClass}">
                <td class="fs-5">${madalyaIcon}</td>
                <td class="text-start">
                    <div class="text-truncate" style="max-width: 120px;" title="${guvenliYazi(kisi.isim)}">${guvenliYazi(kisi.isim)}</div>
                    <div style="font-size: 0.65rem;" class="text-muted" title="Zayıf Konu: ${kisi.enZayifKonu}">
                        ${kisi.kategori} | P:${kisi.pasSayisi} | Z:${kisi.enZayifKonu.substring(0,3)}
                    </div>
                </td>
                <td class="fw-bold text-success">${kisi.puan}</td>
                <td>
                    <span class="badge ${kisi.yuzde >= 70 ? 'bg-success' : kisi.yuzde >= 40 ? 'bg-warning text-dark' : 'bg-danger'}">
                        %${kisi.yuzde}
                    </span>
                </td>
            </tr>
        `);
    });
}

function liderlikTemizle() {
    if(confirm("Liderlik tablosundaki tüm veriler silinecek. Emin misiniz?")) {
        localStorage.removeItem("quizSkorlarV3");
        liderlikTablosunuCiz();
    }
}

// ==========================================
// YARDIMCI FONKSİYONLAR
// ==========================================

function guvenliYazi(metin) {
    if (!metin) return "";
    return $("<div>").text(metin).html();
}
