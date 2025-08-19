document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;

  // ===== Theme Toggle =====
  const savedTheme = localStorage.getItem('theme') || 'dark';
  body.classList.add(`${savedTheme}-mode`);
  themeToggle.checked = savedTheme === 'light';
  themeToggle.addEventListener('change', () => {
    const newTheme = body.classList.contains('light-mode') ? 'dark' : 'light';
    body.classList.remove('light-mode','dark-mode');
    body.classList.add(`${newTheme}-mode`);
    localStorage.setItem('theme', newTheme);
  });

  // ===== Welcome Text Animation =====
  const welcomeText = document.getElementById('welcomeText');
  const subtitle = document.getElementById('subtitle');
  const mainHeader = "Welcome to Rayyan's Portfolio!";
  welcomeText.innerHTML = mainHeader.split(" ").map(word => `<span>${word}</span>`).join(" ");
  const wordSpans = welcomeText.querySelectorAll("span");

  function typeText(element, text, speed=50, callback){
    let i=0; element.textContent='';
    function typing(){ if(i<text.length){ element.textContent+=text[i]; i++; setTimeout(typing,speed);} else if(callback){callback();}}
    typing();
  }
  function deleteText(element, speed=50, callback){
    let i=element.textContent.length;
    function deleting(){ if(i>0){ element.textContent=element.textContent.substring(0,i-1); i--; setTimeout(deleting,speed);} else if(callback){callback();}}
    deleting();
  }
  function animateSubtitle(){
    subtitle.classList.remove('blink');
    typeText(subtitle,"Medical Professional & Tech Enthusiast",50,()=>{
      setTimeout(()=>{ deleteText(subtitle,30,()=>{ typeText(subtitle,"Please scroll!",50,()=>{ setTimeout(()=>{ subtitle.classList.add('blink'); },500); }); }); },1000);
    });
  }

  const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        wordSpans.forEach((span,index)=>{
          setTimeout(()=>{ span.classList.add("visible"); if(index===wordSpans.length-1){ setTimeout(animateSubtitle,500);} },index*400);
        });
        observer.disconnect();
      }
    });
  },{ threshold:0.1 });
  observer.observe(welcomeText);

  // ===== Matrix Canvas =====
  const canvas = document.getElementById('matrixCanvas');
  const ctx = canvas.getContext('2d');
  let W=canvas.width=window.innerWidth;
  let H=canvas.height=window.innerHeight;
  const cols = Math.floor(W/20)+1;
  const drops = Array(cols).fill(1);

  function matrix(){
    ctx.fillStyle = "rgba(0,0,0,0.05)";
    ctx.fillRect(0,0,W,H);
    ctx.fillStyle = "#bb00ff";
    ctx.font = "18px monospace";
    for(let i=0;i<drops.length;i++){
      const text = String.fromCharCode(33+Math.random()*94);
      ctx.fillText(text,i*20,drops[i]*20);
      if(drops[i]*20>H && Math.random()>0.975) drops[i]=0;
      drops[i]++;
    }
  }
  function resizeCanvas(){
    W=canvas.width=window.innerWidth;
    H=canvas.height=window.innerHeight;
  }
  window.addEventListener('resize',resizeCanvas);
  setInterval(matrix,35);
});
