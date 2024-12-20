console.log("❅❄️❆ Hello, world! ❅❄️❆");
const canvas = document.getElementById("fireCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const amount = 100; // Number of sparks
const sizeRate = 0.99; // Rate at which sparks shrink
const speedRate = 0.3; // Speed of sparks
const windSpeed = 0.1; // Wind speed

const sparks = [];

let sizeReductionEnabled;

document.getElementById('toggleSizeReduction').addEventListener('change', (event) => {
    sizeReductionEnabled = event.target.checked;
});

class Spark {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 10 + 2;
    this.speedX = (Math.random() - 0.5) * speedRate;
    this.speedY = (Math.random() + 0.3) * -speedRate;
    this.opacity = 1;
  }

  update() {
    this.x += this.speedX + (Math.random() - 0.5) * windSpeed;
    this.y -= this.speedY * 5;
    if (sizeReductionEnabled) {
      this.size *= sizeRate;
    }
    // this.opacity *= sizeRate;

    // Randomly change direction
    if (Math.random() < 0.05) {
      this.speedX = (Math.random() - 0.5) * speedRate;
    }
  }

  draw() {
    ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(
        this.x + this.size * Math.cos((i * Math.PI) / 3),
        this.y + this.size * Math.sin((i * Math.PI) / 3)
      );
    }
    ctx.stroke();
  }
}

const maxAmount = 200; // Максимальное количество снежинок
let currentAmount = 0; // Текущее количество снежинок

function init() {
  // Удаляем существующие снежинки
  sparks.length = 0;
  currentAmount = 0;
}

function addSpark() {
  if (currentAmount < maxAmount) {
    const x = Math.random() * canvas.width;
    const y = 0;
    sparks.push(new Spark(x, y));
    currentAmount++;
  }
}

let animationRunning = true;

document.getElementById('toggleAnimation').addEventListener('change', (event) => {
    animationRunning = event.target.checked;
    if (animationRunning) {
        animate();
    }
});

function animate() {
    if (!animationRunning) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    sparks.forEach((spark, index) => {
        spark.update();
        spark.draw();

        // Remove spark if it's too small or outside the canvas
        if (spark.size < 0.6 || spark.opacity < 0.1 || spark.y > canvas.height) {
            sparks.splice(index, 1);
            currentAmount--;
        }
    });

    // Добавляем новую снежинку на каждом кадре, пока не достигнем максимального количества
    addSpark();

    requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

init();
animate();
