// effects.js
function playSound(type) {
    let audio = null;
    if (type === 'dogru') {
        audio = document.getElementById('ses-dogru');
    } else if (type === 'yanlis') {
        audio = document.getElementById('ses-yanlis');
    }
    
    if (audio) {
        audio.currentTime = 0;
        audio.play().catch(e => console.log("Ses oynatılamadı:", e));
    }
}

// Shake (Yanlış cevap) efekti
function applyShakeEffect(element) {
    $(element).addClass("shake-anim");
    setTimeout(() => {
        $(element).removeClass("shake-anim");
    }, 400);
}

// Win (Doğru cevap) efekti
function applyWinEffect(element) {
    $(element).addClass("win-anim");
    setTimeout(() => {
        $(element).removeClass("win-anim");
    }, 400);
}

// Puan Kazanım Animasyonu (+Puan yazısının yukarı süzülmesi)
function showFloatingPoints(points, x, y) {
    let floatEl = $(`<div class="floating-points fw-bold text-success shadow-sm">+${points} Puan</div>`);
    floatEl.css({
        position: 'absolute',
        left: x + 'px',
        top: y + 'px',
        zIndex: 9999,
        fontSize: '1.5rem',
        background: 'rgba(255,255,255,0.9)',
        padding: '5px 10px',
        borderRadius: '10px'
    });
    $("body").append(floatEl);
    
    floatEl.animate({ top: y - 100, opacity: 0 }, 1500, function() {
        $(this).remove();
    });
}
