// ==========================================
// FIREBASE & LOCAL MOCK AYARLARI
// ==========================================
const USE_FIREBASE = false; // LOKAL TEST İÇİN FALSE YAPIN! (Gerçek sunucuya geçince true yaparsınız)

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

let db;

if (USE_FIREBASE) {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    db = firebase.database();
} else {
    console.warn("UYARI: Local Test Modu Aktif. Veriler sadece bu tarayıcıda sekmeler arası senkronize edilir.");
    const LocalDB = {
        data: JSON.parse(localStorage.getItem('quizMockDB')) || {},
        listeners: {},
        _save() { localStorage.setItem('quizMockDB', JSON.stringify(this.data)); },
        _getRef(path) {
            let keys = path.split('/');
            let current = this.data;
            for(let i=0; i<keys.length-1; i++) {
                if(current[keys[i]] === undefined) current[keys[i]] = {};
                current = current[keys[i]];
            }
            return { parent: current, key: keys[keys.length-1] };
        },
        _getValue(path) {
            let keys = path.split('/');
            let current = this.data;
            for(let k of keys) {
                if(current === undefined || current === null) return null;
                current = current[k];
            }
            return current;
        },
        ref(path) {
            return {
                set: (val) => {
                    let r = LocalDB._getRef(path);
                    r.parent[r.key] = val;
                    LocalDB._save(); LocalDB._trigger(path);
                    return Promise.resolve();
                },
                update: (obj) => {
                    let r = LocalDB._getRef(path);
                    if(typeof r.parent[r.key] !== 'object') r.parent[r.key] = {};
                    for(let k in obj) {
                        r.parent[r.key][k] = obj[k];
                        LocalDB._trigger(path + '/' + k);
                    }
                    LocalDB._save(); LocalDB._trigger(path);
                    return Promise.resolve();
                },
                on: (event, callback) => {
                    if(!LocalDB.listeners[path]) LocalDB.listeners[path] = [];
                    LocalDB.listeners[path].push(callback);
                    let v = LocalDB._getValue(path);
                    callback({ val: () => v, exists: () => v !== null && v !== undefined });
                },
                once: (event) => {
                    let v = LocalDB._getValue(path);
                    return Promise.resolve({ val: () => v, exists: () => v !== null && v !== undefined });
                }
            };
        },
        _trigger(path) {
            if(LocalDB.listeners[path]) {
                let v = LocalDB._getValue(path);
                LocalDB.listeners[path].forEach(cb => cb({ val: () => v, exists: () => v !== null }));
            }
            for(let key in LocalDB.listeners) {
                if (path.startsWith(key) && path !== key) {
                    let v = LocalDB._getValue(key);
                    LocalDB.listeners[key].forEach(cb => cb({ val: () => v, exists: () => v !== null }));
                }
            }
        }
    };

    window.addEventListener('storage', (e) => {
        if(e.key === 'quizMockDB') {
            LocalDB.data = JSON.parse(e.newValue) || {};
            for(let path in LocalDB.listeners) {
                let v = LocalDB._getValue(path);
                LocalDB.listeners[path].forEach(cb => cb({ val: () => v, exists: () => v !== null }));
            }
        }
    });

    db = LocalDB;
    // Sahte ServerValue
    window.firebase = { database: { ServerValue: { TIMESTAMP: Date.now() } } };
}

// ==========================================
// SORU HAVUZU (Min 15 Soru)
// ==========================================
const anaSorular = [
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

// ==========================================
// UYGULAMA DEĞİŞKENLERİ
// ==========================================
let tumSorular = [];
let aktifSorular = [];

// Oyun Durumu
let roomCode = "";
let isHost = false;
let playerId = "";
let playerName = "";

// Sayaç & Puan
let currentQuestionIndex = 0;
let questionStartTime = 0;
let sayac;
let sureDegeri = 20; // 20 saniye
let oyuncuPuani = 0;
let can = 3;

// Sesler
const sesDogru = new Audio('data:audio/mp3;base64,//NExAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq');
const sesYanlis = new Audio('data:audio/mp3;base64,//NExAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq');

// ==========================================
// BAŞLANGIÇ & UI YÖNETİMİ
// ==========================================
$(window).on('load', function() {
    setTimeout(() => {
        $("#loading-ekrani").css("opacity", "0");
        setTimeout(() => $("#loading-ekrani").remove(), 500);
    }, 600);
});

$(document).ready(function() {
    tumSorulariHazirla();
    gununSorusunuBelirle();

    const urlParams = new URLSearchParams(window.location.search);
    const roomFromUrl = urlParams.get('room');
    if(roomFromUrl) {
        $("#rol-secim-ekrani").addClass("d-none");
        $("#oyuncu-giris-ekrani").removeClass("d-none");
        $("#oyuncu-oda-kodu").val(roomFromUrl.toUpperCase());
    }

    $("#btn-dark-mode").click(function() {
        $("body").toggleClass("dark-mode");
        let isDark = $("body").hasClass("dark-mode");
        $(this).html(isDark ? '<i class="bi bi-sun-fill"></i> Light Mode' : '<i class="bi bi-moon-fill"></i> Dark Mode');
        $(this).toggleClass("btn-outline-warning btn-outline-light");
    });

    $("#nav-brand-btn").click(function(e) {
        e.preventDefault();
        window.location.href = window.location.pathname; 
    });

    $("#btn-host-sec").click(function() {
        $("#rol-secim-ekrani").addClass("d-none");
        hostOdaKur();
    });

    $("#btn-oyuncu-sec").click(function() {
        $("#rol-secim-ekrani").addClass("d-none");
        $("#oyuncu-giris-ekrani").removeClass("d-none");
    });

    $("#btn-oyuncu-katil").click(function() {
        let code = $("#oyuncu-oda-kodu").val().trim().toUpperCase();
        let name = $("#oyuncu-ismi").val().trim();
        
        if(code.length !== 6 || name === "") {
            alert("Lütfen 6 haneli oda kodunu ve isminizi girin.");
            return;
        }
        oyuncuOdayaKatil(code, name);
    });

    $("#btn-host-baslat").click(function() {
        hostSinaviBaslat();
    });

    $("#btn-host-sonraki").click(function() {
        hostSonrakiSoru();
    });

    $("#btn-host-bitir").click(function() {
        hostSinaviBitir();
    });

    $("#btn-modal-yeniden").click(function() {
        window.location.href = window.location.pathname;
    });

    $("#btn-admin-panel").click(function() {
        $("#adminModal").modal('show');
    });

    $("#btn-admin-kaydet").click(function() {
        let s = $("#admin-soru").val().trim();
        let c1 = $("#admin-sik1").val().trim();
        let c2 = $("#admin-sik2").val().trim();
        let c3 = $("#admin-sik3").val().trim();
        let c4 = $("#admin-sik4").val().trim();
        if(s===""||c1===""||c2===""||c3===""||c4===""){alert("Doldurun!");return;}
        
        let custom = JSON.parse(localStorage.getItem("customSorular")) || [];
        custom.push({ soru: s, secenekler: [c1, c2, c3, c4], dogruCevap: 0, kategori: "Özel", zorluk: "Orta" });
        localStorage.setItem("customSorular", JSON.stringify(custom));
        alert("Soru eklendi!"); $("#adminModal").modal('hide'); tumSorulariHazirla();
    });
});

function tumSorulariHazirla() {
    let custom = JSON.parse(localStorage.getItem("customSorular")) || [];
    let birlesik = [...anaSorular, ...custom];
    tumSorular = birlesik.filter(s => s && typeof s.soru === 'string' && s.soru.trim() !== "");
}

function gununSorusunuBelirle() {
    if(tumSorular.length === 0) return;
    let bugun = new Date();
    let index = (bugun.getFullYear() + bugun.getMonth() + bugun.getDate()) % tumSorular.length;
    let tGunun = $('<div>').text(tumSorular[index].soru).html();
    $("#gunun-sorusu-metni").html(`<strong>[${tumSorular[index].kategori} - ${tumSorular[index].zorluk}]</strong> ${tGunun}`);
}

// ==========================================
// HOST (SUNUCU) MANTIĞI
// ==========================================
function hostOdaKur() {
    isHost = true;
    roomCode = Math.floor(100000 + Math.random() * 900000).toString(); 
    
    let havuz = [...tumSorular];
    havuz.sort(() => Math.random() - 0.5);
    aktifSorular = havuz.splice(0, 15);

    db.ref(`rooms/${roomCode}`).set({
        status: "waiting",
        currentQuestion: 0,
        questions: aktifSorular,
        players: {},
        answers: {}
    }).then(() => {
        $("#host-lobi-ekrani").removeClass("d-none");
        $("#host-oda-kodu").text(roomCode);
        
        let joinUrl = window.location.href.split('?')[0] + "?room=" + roomCode;
        $("#host-join-link").attr("href", joinUrl).text(joinUrl);
        new QRCode(document.getElementById("qrcode"), {
            text: joinUrl,
            width: 200,
            height: 200,
        });

        db.ref(`rooms/${roomCode}/players`).on('value', snapshot => {
            let p = snapshot.val();
            let tablo = $("#liderlik-tablosu");
            tablo.empty();
            let pCount = 0;
            if(p) {
                let playerArray = Object.keys(p).map(k => p[k]);
                playerArray.sort((a,b) => b.score - a.score);
                
                playerArray.forEach((oy, index) => {
                    pCount++;
                    let siralamClass = index === 0 ? "top-1" : (index === 1 ? "top-2" : (index === 2 ? "top-3" : ""));
                    tablo.append(`
                        <li class="list-group-item liderlik-item ${siralamClass}">
                            <div class="d-flex align-items-center">
                                <span class="liderlik-sira shadow-sm">${index + 1}</span>
                                <span class="text-truncate fw-bold">${oy.name}</span>
                            </div>
                            <div class="text-end">
                                <span class="badge bg-primary rounded-pill px-2 py-1">${oy.score} P</span>
                            </div>
                        </li>
                    `);
                });
            } else {
                tablo.append('<li class="list-group-item text-muted text-center py-4">Bekleniyor...</li>');
            }
            $("#host-oyuncu-sayisi").text(pCount);
            if(pCount > 0) $("#btn-host-baslat").prop("disabled", false);
            else $("#btn-host-baslat").prop("disabled", true);
            $("#host-toplam-oyuncu").text(pCount);
        });

    }).catch(err => {
        alert("Bağlantı hatası: " + err.message);
    });
}

function hostSinaviBaslat() {
    db.ref(`rooms/${roomCode}`).update({
        status: "started",
        currentQuestion: 0,
        questionStartTime: window.firebase.database.ServerValue.TIMESTAMP
    });
    
    $("#host-lobi-ekrani").addClass("d-none");
    $("#quiz-ekrani").removeClass("d-none");
    $("#host-kontrol-alani").removeClass("d-none");
    
    hostSoruyuDinle();
}

function hostSonrakiSoru() {
    currentQuestionIndex++;
    if(currentQuestionIndex >= aktifSorular.length) {
        hostSinaviBitir();
        return;
    }
    
    db.ref(`rooms/${roomCode}`).update({
        currentQuestion: currentQuestionIndex,
        questionStartTime: window.firebase.database.ServerValue.TIMESTAMP
    });
}

function hostSinaviBitir() {
    db.ref(`rooms/${roomCode}`).update({
        status: "finished"
    });
}

function hostSoruyuDinle() {
    db.ref(`rooms/${roomCode}/currentQuestion`).on('value', snap => {
        let qIdx = snap.val();
        if(qIdx === null) return;
        currentQuestionIndex = qIdx;
        
        let soruNesnesi = aktifSorular[qIdx];
        if(!soruNesnesi) return;

        $("#soru-sayaci-yazi").text(`Soru ${qIdx + 1}/${aktifSorular.length} (Host Ekranı)`);
        
        let tSoru = $('<div>').text(soruNesnesi.soru).html();
        $("#soru-metni").html(`<span class="badge bg-secondary me-2">${soruNesnesi.zorluk}</span> ${tSoru}`);
        
        let seceneklerAlani = $("#secenekler-alani");
        seceneklerAlani.empty();
        
        soruNesnesi.secenekler.forEach((metin) => {
            let tSik = $('<div>').text(metin).html();
            seceneklerAlani.append(`<button class="secenek-btn w-100 disabled text-center">${tSik}</button>`);
        });

        sureDegeri = 20;
        clearInterval(sayac);
        $("#sayac-metni").text(sureDegeri);
        sayac = setInterval(() => {
            sureDegeri--;
            $("#sayac-metni").text(sureDegeri);
            if(sureDegeri <= 0) clearInterval(sayac);
        }, 1000);

        db.ref(`rooms/${roomCode}/answers/${qIdx}`).on('value', asnap => {
            let ans = asnap.val();
            let sayi = ans ? Object.keys(ans).length : 0;
            $("#host-cevap-veren-sayisi").text(sayi);
        });
        
        if(qIdx === aktifSorular.length - 1) {
            $("#btn-host-sonraki").addClass("d-none");
            $("#btn-host-bitir").removeClass("d-none");
        }
    });

    db.ref(`rooms/${roomCode}/status`).on('value', snap => {
        if(snap.val() === "finished") {
            ortakSonucuGoster();
        }
    });
}

// ==========================================
// OYUNCU MANTIĞI
// ==========================================
function oyuncuOdayaKatil(code, name) {
    roomCode = code;
    playerName = name;
    playerId = 'player_' + Math.random().toString(36).substr(2, 9);
    
    db.ref(`rooms/${roomCode}/status`).once('value').then(snap => {
        if(!snap.exists()) {
            alert("Böyle bir oda bulunamadı!");
            return;
        }
        if(snap.val() === "finished") {
            alert("Bu sınav zaten bitmiş!");
            return;
        }
        
        db.ref(`rooms/${roomCode}/players/${playerId}`).set({
            name: playerName,
            score: 0,
            joinedAt: window.firebase.database.ServerValue.TIMESTAMP,
            answeredCurrentQuestion: false
        }).then(() => {
            $("#oyuncu-giris-ekrani").addClass("d-none");
            
            if(snap.val() === "waiting") {
                $("#oyuncu-bekleme-ekrani").removeClass("d-none");
            } else {
                $("#quiz-ekrani").removeClass("d-none");
            }

            oyuncuDurumDinle();

        });
    });
}

function oyuncuDurumDinle() {
    db.ref(`rooms/${roomCode}/status`).on('value', snap => {
        let st = snap.val();
        if(st === "started") {
            $("#oyuncu-bekleme-ekrani").addClass("d-none");
            $("#quiz-ekrani").removeClass("d-none");
        } else if (st === "finished") {
            ortakSonucuGoster();
        }
    });

    db.ref(`rooms/${roomCode}/questions`).once('value').then(qSnap => {
        aktifSorular = qSnap.val() || [];
        
        db.ref(`rooms/${roomCode}/currentQuestion`).on('value', snap => {
            let qIdx = snap.val();
            if(qIdx === null) return;
            currentQuestionIndex = qIdx;
            
            db.ref(`rooms/${roomCode}/questionStartTime`).once('value').then(tSnap => {
                questionStartTime = tSnap.val() || Date.now();
                oyuncuSoruyuGoster(qIdx);
            });
        });
    });

    db.ref(`rooms/${roomCode}/players/${playerId}/score`).on('value', snap => {
        oyuncuPuani = snap.val() || 0;
        $("#puan-gosterge").text(`Puan: ${oyuncuPuani}`);
    });
}

function oyuncuSoruyuGoster(qIdx) {
    let soruNesnesi = aktifSorular[qIdx];
    if(!soruNesnesi) return;

    if(can <= 0) {
        $("#soru-metni").html("<h3 class='text-danger'>Canınız bitti! Host ekranından maçı takip edin. 💀</h3>");
        $("#secenekler-alani").empty();
        return;
    }

    $("#soru-sayaci-yazi").text(`Soru ${qIdx + 1}/${aktifSorular.length}`);
    let yuzde = ((qIdx) / aktifSorular.length) * 100;
    $("#quiz-progress-bar").css("width", yuzde + "%");

    let tSoru = $('<div>').text(soruNesnesi.soru).html();
    $("#soru-metni").html(`<span class="badge bg-secondary me-2">${soruNesnesi.zorluk}</span> ${tSoru}`);
    
    let seceneklerAlani = $("#secenekler-alani");
    seceneklerAlani.empty();

    let karisikSiklar = soruNesnesi.secenekler.map((m, i) => { return { metin: m, index: i }; });
    karisikSiklar.sort(() => Math.random() - 0.5);

    karisikSiklar.forEach((obj) => {
        let tSik = $('<div>').text(obj.metin).html();
        let buton = $(`<button class="secenek-btn w-100">${tSik}</button>`);
        buton.click(function() {
            oyuncuCevapVer(obj.index, this);
        });
        seceneklerAlani.append(buton);
    });

    sureDegeri = 20;
    clearInterval(sayac);
    $("#sayac-metni").text(sureDegeri);
    sayac = setInterval(() => {
        sureDegeri--;
        $("#sayac-metni").text(sureDegeri);
        if(sureDegeri <= 0) {
            clearInterval(sayac);
            $(".secenek-btn").prop("disabled", true);
            can--;
            canlariCiz();
            seceneklerAlani.prepend('<div class="alert alert-danger fw-bold text-center">Süre Bitti! Cevap veremediniz.</div>');
            oyuncuCevapGonder(-1, false, 0); 
        }
    }, 1000);
}

function oyuncuCevapVer(secilenIndeks, butonElement) {
    clearInterval(sayac);
    let tumSecenekler = $(".secenek-btn");
    tumSecenekler.prop("disabled", true);
    
    let soruNesnesi = aktifSorular[currentQuestionIndex];
    let isCorrect = (secilenIndeks === soruNesnesi.dogruCevap);
    
    let timeTakenMs = Date.now() - questionStartTime;
    let timeTakenSec = Math.floor(timeTakenMs / 1000);
    
    let points = 0;
    if(isCorrect) {
        sesDogru.play().catch(e=>{});
        $(butonElement).addClass("dogru").append(' <span class="float-end">✅ 😎</span>');
        points = Math.max(10, 100 - (timeTakenSec * 5));
    } else {
        sesYanlis.play().catch(e=>{});
        $(butonElement).addClass("yanlis").append(' <span class="float-end">❌</span>');
        can--;
        canlariCiz();
    }

    $("#secenekler-alani").prepend('<div class="alert alert-success fw-bold text-center"><i class="bi bi-check-circle-fill"></i> Cevabınız kaydedildi! Host bekleniyor...</div>');

    oyuncuCevapGonder(secilenIndeks, isCorrect, points, timeTakenSec);
}

function oyuncuCevapGonder(secilenIndeks, isCorrect, points, timeTakenSec = 20) {
    db.ref(`rooms/${roomCode}/answers/${currentQuestionIndex}/${playerId}`).set({
        answer: secilenIndeks,
        correct: isCorrect,
        points: points,
        time: timeTakenSec
    });

    if(points > 0) {
        db.ref(`rooms/${roomCode}/players/${playerId}`).once('value').then(snap => {
            let p = snap.val();
            db.ref(`rooms/${roomCode}/players/${playerId}`).update({
                score: p.score + points
            });
        });
    }
}

function canlariCiz() {
    let html = "";
    for(let i=0; i<3; i++) {
        if(i < can) html += '<i class="bi bi-heart-fill"></i> ';
        else html += '<i class="bi bi-heartbreak text-muted"></i> ';
    }
    $("#can-kapsayici").html(html);
}

function ortakSonucuGoster() {
    clearInterval(sayac);
    $("#quiz-ekrani").addClass("d-none");
    
    let sonucModal = new bootstrap.Modal(document.getElementById('sonucModal'));
    
    if(isHost) {
        $("#modal-puan").text("Tablodan Bakınız");
        $("#rozet-isim").text("Sınav Tamamlandı");
    } else {
        $("#modal-puan").text(oyuncuPuani);
        if(can <= 0) {
            $("#rozet-ikon").text("💀");
            $("#rozet-isim").text("Game Over");
        } else if(oyuncuPuani > 800) {
            $("#rozet-ikon").text("👑");
            $("#rozet-isim").text("JS Ninja");
        } else {
            $("#rozet-ikon").text("🏆");
            $("#rozet-isim").text("Web Master");
        }
    }

    sonucModal.show();
}
