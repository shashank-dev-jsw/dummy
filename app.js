const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

let starsArray = [];
for (let i = 0; i < 150; i++) {
    starsArray.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5,
        brightness: Math.random() * 0.8 + 0.2,
        blinkSpeed: Math.random() * 0.02 + 0.01,
    });
}

class Firework {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 5 - 2;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = `hsl(${Math.random() * 360}deg, 100%, 50%)`;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.size *= 0.98;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

let fireworksArray = [];

canvas.addEventListener('mousemove', (event) => {
    for (let i = 0; i < 5; i++) {
        fireworksArray.push(new Firework(event.x, event.y));
    }
});

function drawStars() {
    starsArray.forEach(star => {
        star.brightness += star.blinkSpeed; 

        if (star.brightness > 1 || star.brightness < 0.2) {
            star.blinkSpeed *= -1; 
        }

        ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
    });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawStars();

    fireworksArray.forEach((firework, index) => {
        firework.update();
        firework.draw();
        if (firework.size <= 0.1) {
            fireworksArray.splice(index, 1);
        }
    });

    requestAnimationFrame(animate);
}

animate();