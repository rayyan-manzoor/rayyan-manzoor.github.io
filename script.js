document.addEventListener('DOMContentLoaded', () => {

  /* ===== Welcome Text Animation ===== */
  const welcomeText = document.getElementById('welcomeText');
  const subtitle = document.getElementById('subtitle');
  const mainHeader = "Welcome to Rayyan's Portfolio!";

  welcomeText.innerHTML = mainHeader.split(" ").map(word => `<span>${word}</span>`).join(" ");
  const wordSpans = welcomeText.querySelectorAll("span");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        wordSpans.forEach((span, index) => {
          setTimeout(() => { span.classList.add("visible"); }, index * 400);
        });
        setTimeout(animateSubtitle, wordSpans.length * 400 + 500);
        observer.disconnect();
      }
    });
  }, { threshold: 0.1 });
  observer.observe(welcomeText);

  function typeText(element, text, speed = 50, callback) {
    let i = 0; element.textContent = '';
    function typing() { if(i<text.length){ element.textContent+=text.charAt(i); i++; setTimeout(typing,speed); } else if(callback){callback();} }
    typing();
  }

  function deleteText(element, speed = 50, callback){
    let text = element.textContent, i = text.length;
    function deleting(){ if(i>0){ element.textContent = text.substring(0,i-1); i--; setTimeout(deleting,speed); } else if(callback){callback();} }
    deleting();
  }

  function animateSubtitle() {
    subtitle.classList.remove('blink');
    typeText(subtitle, "Medical Professional & Tech Enthusiast",50, ()=>{
      setTimeout(()=>{ deleteText(subtitle,30,()=>{ typeText(subtitle,"Please scroll!",50,()=>{ setTimeout(()=>{ subtitle.classList.add('blink'); },500); }); }); },1000);
    });
  }

  /* ===== Matrix Background ===== */
  const canvas = document.getElementById('matrix');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth; canvas.height = window.innerHeight;
  const cols = Math.floor(canvas.width / 20) + 1;
  const drops = Array(cols).fill(0);

  function drawMatrix(){
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = '#8f00ff';
    ctx.font = '20px monospace';
    for(let i=0;i<drops.length;i++){
      const text = String.fromCharCode(Math.floor(Math.random()*94+33));
      ctx.fillText(text,i*20,drops[i]*20);
      if(drops[i]*20>canvas.height || Math.random()>0.975) drops[i]=0;
      drops[i]++;
    }
  }
  setInterval(drawMatrix,50);
  window.addEventListener('resize',()=>{canvas.width=window.innerWidth; canvas.height=window.innerHeight;});
});
