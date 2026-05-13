// ui.js

function showLoading(show) {
    if (show) {
        $("#loading-ekrani").fadeIn(400);
    } else {
        setTimeout(() => {
            $("#loading-ekrani").fadeOut(400, function () {
                $(this).remove();
            });
        }, 400);
    }
}

function lobiEkraniniGoster(odaKodu, odaSahibiMi) {
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
        $("#host-filtre-alani").removeClass("d-none");
    } else {
        $("#btn-host-baslat").hide();
        $("#host-filtre-alani").addClass("d-none");
    }

    $("#btn-host-sonraki").hide();
    $("#btn-host-bitir").hide();

    $("#oyuncu-bekleme-ekrani").removeClass("d-none");
}

function ortakLiderlikTablosunuCiz(listeObjesi, benimOyuncuID) {
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

        let isimVurgu = kisi.id === benimOyuncuID
            ? `<span class="text-success fw-bold">${guvenliYazi(kisi.isim)} (Sen)</span>`
            : `<span class="text-truncate fw-bold">${guvenliYazi(kisi.isim)}</span>`;
            
        let detaylar = "";
        if (kisi.pasSayisi > 0) detaylar += `<span class="badge bg-secondary ms-1">P:${kisi.pasSayisi}</span>`;
        if (kisi.streak > 2) detaylar += `<span class="badge bg-warning text-dark ms-1">🔥 x${kisi.streak}</span>`;

        tablo.append(`
            <li class="list-group-item liderlik-item ${madalyaClass}">
                <div class="d-flex align-items-center">
                    <span class="liderlik-sira shadow-sm">${sira + 1}</span>
                    <div class="d-flex flex-column ms-2">
                        <div>${isimVurgu}</div>
                        <div style="font-size: 0.7rem;">${detaylar}</div>
                    </div>
                </div>
                <div class="text-end ms-auto">
                    <span class="badge bg-danger rounded-pill px-2 py-1">${durum}</span>
                    <span class="badge bg-primary rounded-pill px-2 py-1">${kisi.puan} Puan</span>
                </div>
            </li>
        `);
    });
}

function canlariGuncelleUI(canSayisi, maksCan) {
    let html = "";
    for (let i = 0; i < maksCan; i++) {
        if (i < canSayisi) {
            html += `<i class="bi bi-heart-fill"></i> `;
        } else {
            html += `<i class="bi bi-heartbreak text-muted"></i> `;
        }
    }
    $("#can-kapsayici").html(html);
}

function oyuncuSoruyuCizUI(soruVerisi, benimCanSayisi, onClickCallback) {
    $("#aciklama-paneli").addClass("d-none"); // Her soruda gizle
    
    // İzleyici modu kontrolü
    if (benimCanSayisi <= 0) {
        $("#soru-sayaci-yazi").text(`Soru ${soruVerisi.soruIndex + 1}/${soruVerisi.toplamSoru} — 👁️ İzliyorsunuz`);
        $("#quiz-progress-bar").css("width", ((soruVerisi.soruIndex + 1) / soruVerisi.toplamSoru * 100) + "%");
        $("#soru-metni").html(`<span class="badge bg-secondary me-2">${soruVerisi.soruObjesi.category}</span><span class="badge bg-dark me-2">${soruVerisi.soruObjesi.difficulty}</span> ${guvenliYazi(soruVerisi.soruObjesi.question)}`);
        $("#secenekler-alani").empty();
        $("#secenekler-alani").html(`<div class="alert alert-dark text-center fw-bold"><i class="bi bi-eye-fill me-2"></i>Elendiniz — Yarışmayı izliyorsunuz 👀</div>`);
        $("#sayac-metni").text("-");
        $(".joker-area").addClass("d-none"); // Jokerleri gizle
        return;
    }

    $(".joker-area").removeClass("d-none");

    $("#soru-sayaci-yazi").text(`Soru ${soruVerisi.soruIndex + 1}/${soruVerisi.toplamSoru}`);
    $("#quiz-progress-bar").css({"width": "100%", "transition": "none"}).removeClass("bg-danger").addClass("bg-success");
    
    // Timer bar animasyonu için kısa bir gecikme
    setTimeout(() => {
        $("#quiz-progress-bar").css("transition", `width ${soruVerisi.sureSaniye}s linear`);
    }, 50);

    let zorlukClass = soruVerisi.soruObjesi.difficulty === "Kolay" ? "bg-success" : soruVerisi.soruObjesi.difficulty === "Orta" ? "bg-warning text-dark" : "bg-danger";
    $("#soru-metni").html(`<span class="badge bg-secondary me-2">${soruVerisi.soruObjesi.category}</span><span class="badge ${zorlukClass} me-2">${soruVerisi.soruObjesi.difficulty}</span> ${guvenliYazi(soruVerisi.soruObjesi.question)}`);

    let alan = $("#secenekler-alani");
    alan.empty();

    let harfler = ["A", "B", "C", "D"];
    
    // Güvenli karıştırma
    let karisik = soruVerisi.soruObjesi.options.map((m, i) => {
        return { metin: m, originalIndex: i };
    });
    karisik = shuffleArray(karisik);

    karisik.forEach((obj, idx) => {
        let temizMetin = obj.metin.replace(/^[A-D][\)\-\.]\s*/i, '');
        let btn = $(`<button class="secenek-btn w-100 fw-bold" data-index="${obj.originalIndex}"><span class="badge bg-light text-dark me-2 border">${harfler[idx]})</span> ${guvenliYazi(temizMetin)}</button>`);
        btn.click(function (e) {
            onClickCallback(obj.originalIndex, this, e);
        });
        alan.append(btn);
    });
}

function aciklamayiGosterUI(aciklama, dogruMu) {
    let panel = $('#aciklama-paneli');
    let baslik = $('#aciklama-baslik');
    let metin = $('#aciklama-metni');
    
    panel.removeClass('d-none alert-success alert-danger alert-info border-success border-danger border-info text-success text-danger text-info');
    if(dogruMu) {
        panel.addClass('alert-success border-success');
        baslik.html('<i class="bi bi-check-circle-fill me-1"></i> Harika!').addClass('text-success');
    } else {
        panel.addClass('alert-danger border-danger');
        baslik.html('<i class="bi bi-info-circle-fill me-1"></i> Doğru Cevap / Açıklama:').addClass('text-danger');
    }
    metin.html(guvenliYazi(aciklama));
}

function jokerArayuzGuncelleUI(jokerDurumlari) {
    if (jokerDurumlari.joker50Kullanildi) $("#btn-joker-50").prop("disabled", true).addClass("btn-outline-secondary").removeClass("btn-warning").html('<i class="bi bi-x-circle"></i> 50/50');
    else $("#btn-joker-50").prop("disabled", false).addClass("btn-warning").removeClass("btn-outline-secondary").html('<i class="bi bi-magic"></i> 50/50');

    if (jokerDurumlari.jokerCiftKullanildi) $("#btn-joker-cift").prop("disabled", true).addClass("btn-outline-secondary").removeClass("btn-info text-dark").html('<i class="bi bi-x-circle"></i> Çift Cevap');
    else $("#btn-joker-cift").prop("disabled", false).addClass("btn-info text-dark").removeClass("btn-outline-secondary").html('<i class="bi bi-bullseye"></i> Çift Cevap');

    if (jokerDurumlari.jokerPasKullanildi) $("#btn-joker-pas").prop("disabled", true).addClass("btn-outline-secondary").removeClass("btn-secondary").html('<i class="bi bi-x-circle"></i> Pas');
    else $("#btn-joker-pas").prop("disabled", false).addClass("btn-secondary").removeClass("btn-outline-secondary").html('<i class="bi bi-skip-forward-fill"></i> Pas');
}

function jokerleriKapatUI() {
    $("#btn-joker-50, #btn-joker-cift, #btn-joker-pas").prop("disabled", true);
}

function elenisPopupGosterUI(neden) {
    let nedenMetni = neden || "Tüm canlarını kaybettin!";
    let ikon = "💀";
    let baslik = "Elendiniz!";

    if (nedenMetni.includes("Süre bitti")) {
        ikon = "⏰";
        baslik = "Süre Doldu!";
    } else if (nedenMetni.includes("Yanlış") || nedenMetni.includes("yanlis") || nedenMetni.includes("yanlış")) {
        ikon = "❌";
        baslik = "Elendiniz!";
    }

    $("#elenis-ikon").text(ikon);
    $("#elenis-baslik").text(baslik);
    $("#elenis-neden-metni").text(nedenMetni);

    let modal = new bootstrap.Modal(document.getElementById("elenisModal"));
    modal.show();
}

function sonucModalCizUI(oyuncuGecmisi, zayifKonular, genelPuan, canSayisi, kazananID, benimOyuncuID, siralama) {
    // Eleniş modalı kapat
    let elenisModalEl = document.getElementById("elenisModal");
    if (elenisModalEl) {
        let elenisModalInstance = bootstrap.Modal.getInstance(elenisModalEl);
        if (elenisModalInstance) elenisModalInstance.hide();
    }

    let modal = new bootstrap.Modal(document.getElementById("sonucModal"));
    $("#modal-puan").text(genelPuan);

    let teselli = "";
    if (canSayisi <= 0) {
        $("#rozet-ikon").text("💀");
        $("#rozet-isim").text("Elendin");
        teselli = "Sağlık olsun, sen harikasın, cansın! Bir dahakine kesin yaparsın.";
    } else if (kazananID === benimOyuncuID) {
        $("#rozet-ikon").text("🏆");
        $("#rozet-isim").text("Kazandın!");
        teselli = "Tebrikler şampiyon, cansın! Harika bir iş çıkardın.";
    } else if (genelPuan > 200) {
        $("#rozet-ikon").text("👑");
        $("#rozet-isim").text("Başarılı Oyuncu");
        teselli = "Gayet iyiydin, cansın! Biraz daha pratikle zirvedesin.";
    } else {
        $("#rozet-ikon").text("🎖️");
        $("#rozet-isim").text("Quiz Tamamlandı");
        teselli = "Emeğine sağlık, cansın! Hatalarından öğrenmek en büyük başarıdır.";
    }
    $("#teselli-mesaji").text(teselli);

    // PODYUM CIZIMI
    if (siralama && siralama.length > 0) {
        $("#podyum-kapsayici").removeClass("d-none").addClass("d-flex");
        let html1 = siralama.length > 0 ? `<div class="podyum-box bg-warning text-dark p-3 rounded-top shadow" style="height: 120px;"><h2>1</h2><div class="fw-bold text-truncate">${guvenliYazi(siralama[0].isim)}</div><small>${siralama[0].puan} P</small></div>` : "";
        let html2 = siralama.length > 1 ? `<div class="podyum-box bg-secondary text-white p-3 rounded-top shadow" style="height: 90px;"><h2>2</h2><div class="fw-bold text-truncate">${guvenliYazi(siralama[1].isim)}</div><small>${siralama[1].puan} P</small></div>` : "";
        let html3 = siralama.length > 2 ? `<div class="podyum-box bg-danger text-white p-3 rounded-top shadow" style="height: 70px;"><h2>3</h2><div class="fw-bold text-truncate">${guvenliYazi(siralama[2].isim)}</div><small>${siralama[2].puan} P</small></div>` : "";
        
        $("#podyum-1").html(html1);
        $("#podyum-2").html(html2);
        $("#podyum-3").html(html3);
    } else {
        $("#podyum-kapsayici").addClass("d-none").removeClass("d-flex");
    }

    // Zayıf konu analizi çizimi
    let analizKutusu = $("#analiz-icerik");
    analizKutusu.empty();
    
    let zayifListe = Object.keys(zayifKonular).sort((a,b) => zayifKonular[b] - zayifKonular[a]);
    if (zayifListe.length === 0) {
        analizKutusu.append(`<div class="text-success fw-bold"><i class="bi bi-emoji-sunglasses"></i> Hiç yanlışın yok, harikasın!</div>`);
    } else {
        let html = `<ul class="list-group list-group-flush mb-3 text-start">`;
        zayifListe.forEach(kat => {
            html += `<li class="list-group-item d-flex justify-content-between align-items-center bg-transparent px-0 py-1 border-0">
                        ${kat}
                        <span class="badge bg-danger rounded-pill">${zayifKonular[kat]} yanlış</span>
                     </li>`;
        });
        html += `</ul>`;
        html += `<div class="alert alert-warning py-2 px-3 mb-0 text-start" style="font-size: 0.85rem;">
                    <strong>Öneri:</strong> En çok <b>${zayifListe[0]}</b> konusunda hata yaptın, tekrar etmen iyi olur.
                 </div>`;
        analizKutusu.append(html);
    }

    // Soru geçmişi tablosu
    let tabloBody = $("#sonuc-gecmis-tablosu");
    tabloBody.empty();
    
    oyuncuGecmisi.forEach((g, i) => {
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

    modal.show();
}
