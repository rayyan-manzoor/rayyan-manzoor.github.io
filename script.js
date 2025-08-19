// ===== Matrix Background =====
const canvas = document.getElementById('matrixBackground');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "01";
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = [];

for (let x = 0; x < columns; x++) drops[x] = 1;

function drawMatrix() {
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "#ff6ec4";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = letters.charAt(Math.floor(Math.random()*letters.length));
    ctx.fillText(text, i*fontSize, drops[i]*fontSize);
    if (drops[i]*fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
}
setInterval(drawMatrix, 35);
window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });

// ===== Welcome Text Animation =====
const welcomeText = document.getElementById('welcomeText');
const subtitle = document.getElementById('subtitle');
const text = "Welcome to Rayyan's Portfolio!".split(" ");
welcomeText.innerHTML = text.map(word => `<span>${word}</span>`).join(" ");
const spans = welcomeText.querySelectorAll('span');

spans.forEach((span, i) => setTimeout(() => { span.classList.add('visible'); }, i*400));

setTimeout(() => { subtitle.textContent = "Medical Professional & Tech Enthusiast"; subtitle.style.opacity = 1; }, spans.length*400);
