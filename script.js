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

// ===== Welcome Text & Subtitle Animation =====
document.addEventListener('DOMContentLoaded', () => {
  const welcomeText = document.getElementById('welcomeText');
  const subtitle = document.getElementById('subtitle');

  // blur text animation
  const mainHeader = "Welcome to Rayyan's Portfolio!";
  welcomeText.innerHTML = mainHeader.split(" ").map(word => `<span>${word}</span>`).join(" ");
  const wordSpans = welcomeText.querySelectorAll("span");

  wordSpans.forEach((span, i) => setTimeout(() => { span.classList.add("visible"); }, i*400));

  // subtitle typing animation
  function typeText(el, text, speed=50, callback) {
    let i = 0; el.textContent = '';
    function typing() { if(i<text.length){ el.textContent+=text.charAt(i); i++; setTimeout(typing,speed);} else if(callback){callback();} }
    typing();
  }
  function deleteText(el, speed=30, callback) {
    let text = el.textContent; let i = text.length;
    function deleting(){ if(i>0){ el.textContent=text.substring(0,i-1); i--; setTimeout(deleting,speed);} else if(callback){callback();} }
    deleting();
  }

  function animateSubtitle() {
    subtitle.classList.remove('blink');
    typeText(subtitle,"Medical Professional & Tech Enthusiast",50,()=>{
      setTimeout(()=>{
        deleteText(subtitle,30,()=>{
          subtitle.textContent='';
          typeText(subtitle,"Please scroll!",50,()=>{
            setTimeout(()=>{ subtitle.classList.add('blink'); },1000);
          });
        });
      },1000);
    });
  }

  setTimeout(animateSubtitle, wordSpans.length*400);
});
