document.addEventListener('DOMContentLoaded', () => {
    // Personalización de nombres
    const inputDestino = document.getElementById('input-destino');
    const inputFirma = document.getElementById('input-firma');
    const nombreDestino = document.getElementById('nombre-destino');
    const nombreFirma = document.getElementById('nombre-firma');

    inputDestino.addEventListener('input', () => {
        nombreDestino.textContent = inputDestino.value || '[Su Nombre]';
    });
    inputFirma.addEventListener('input', () => {
        nombreFirma.textContent = inputFirma.value || '[Tu Nombre]';
    });

    // Botón de reproducir música
    const playBtn = document.getElementById('play-btn');
    const song = document.getElementById('song');
    let played = false;
    
    playBtn.addEventListener('click', () => {
        if (!played) {
            song.play();
            playBtn.textContent = '⏸️ Pausar canción';
            played = true;
        } else {
            song.pause();
            playBtn.textContent = '▶️ Escuchar canción';
            played = false;
        }
    });

    // Galería de imágenes
    const mainSnoopy = document.querySelector('.main-snoopy');
    const smallSnoopys = document.querySelectorAll('.small-snoopy');

    smallSnoopys.forEach(img => {
        img.addEventListener('click', () => {
            const tempSrc = mainSnoopy.src;
            mainSnoopy.src = img.src;
            img.src = tempSrc;
            mainSnoopy.classList.add('rotate-animation');
            setTimeout(() => mainSnoopy.classList.remove('rotate-animation'), 500);
        });
    });

    // Partículas animadas (flores/corazones)
    const canvas = document.getElementById('particles-bg');
    const ctx = canvas.getContext('2d');
    let W = window.innerWidth, H = window.innerHeight;
    canvas.width = W; canvas.height = H;

    window.addEventListener('resize', () => {
        W = window.innerWidth;
        H = window.innerHeight;
        canvas.width = W;
        canvas.height = H;
    });

    function drawHeart(x, y, size, color, alpha) {
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.moveTo(x, y + size/4);
        ctx.bezierCurveTo(x, y, x - size/2, y, x - size/2, y + size/4);
        ctx.bezierCurveTo(x - size/2, y + size/2, x, y + size*0.8, x, y + size);
        ctx.bezierCurveTo(x, y + size*0.8, x + size/2, y + size/2, x + size/2, y + size/4);
        ctx.bezierCurveTo(x + size/2, y, x, y, x, y + size/4);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
    }

    function drawFlower(x, y, size, color, alpha) {
        ctx.save();
        ctx.globalAlpha = alpha;
        for(let i=0; i<6; i++) {
            ctx.beginPath();
            ctx.ellipse(x, y, size/3, size/1.8, Math.PI/3*i, 0, 2*Math.PI);
            ctx.fillStyle = color;
            ctx.shadowColor = color;
            ctx.shadowBlur = 6;
            ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(x, y, size/4, 0, 2*Math.PI);
        ctx.fillStyle = "#fff8";
        ctx.fill();
        ctx.restore();
    }

    const particles = [];
    const colors = ['#ffb6b9', '#fcb69f', '#ffe0e9', '#fff6f6', '#f9c6c9'];
    for(let i=0; i<30; i++) {
        particles.push({
            x: Math.random()*W,
            y: Math.random()*H,
            size: 16 + Math.random()*18,
            speed: 0.3 + Math.random()*0.7,
            drift: (Math.random()-0.5)*0.5,
            alpha: 0.7 + Math.random()*0.3,
            color: colors[Math.floor(Math.random()*colors.length)],
            type: Math.random() > 0.5 ? 'heart' : 'flower'
        });
    }

    function animateParticles() {
        ctx.clearRect(0,0,W,H);
        for(let p of particles) {
            if(p.type === 'heart') {
                drawHeart(p.x, p.y, p.size, p.color, p.alpha);
            } else {
                drawFlower(p.x, p.y, p.size, p.color, p.alpha);
            }
            p.y += p.speed;
            p.x += p.drift;
            if(p.y > H + 30) {
                p.y = -30;
                p.x = Math.random()*W;
            }
            if(p.x > W + 30) p.x = -30;
            if(p.x < -30) p.x = W + 30;
        }
        requestAnimationFrame(animateParticles);
    }

    animateParticles();
});