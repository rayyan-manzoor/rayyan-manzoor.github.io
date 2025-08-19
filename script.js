document.addEventListener('DOMContentLoaded', () => {
  // ===== Typing Effect =====
  const welcomeText = document.getElementById('welcomeText');
  const subtitle = document.getElementById('subtitle');

  const mainHeader = "Welcome to Rayyan's Portfolio!";
  welcomeText.innerHTML = mainHeader.split(" ").map(word => `<span>${word}</span>`).join(" ");
  const wordSpans = welcomeText.querySelectorAll("span");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        wordSpans.forEach((span, index) => {
          setTimeout(() => { span.classList.add("visible"); }, index*400);
        });
        setTimeout(animateSubtitle, wordSpans.length*400 + 500);
        observer.disconnect();
      }
    });
  }, { threshold: 0.1 });
  observer.observe(welcomeText);

  function typeText(element, text, speed = 50, callback) {
    let i = 0;
    element.textContent = '';
    function typing() {
      if(i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(typing, speed);
      } else if(callback) callback();
    }
    typing();
  }

  function deleteText(element, speed = 30, callback) {
    let text = element.textContent;
    let i = text.length;
    function deleting() {
      if(i > 0) {
        element.textContent = text.substring(0, i-1);
        i--;
        setTimeout(deleting, speed);
      } else if(callback) callback();
    }
    deleting();
  }

  function animateSubtitle() {
    subtitle.classList.remove('blink');
    typeText(subtitle, "Medical Professional & Tech Enthusiast", 50, () => {
      setTimeout(() => {
        deleteText(subtitle, 30, () => {
          subtitle.textContent = '';
          typeText(subtitle, "Please scroll!", 50, () => {
            setTimeout(() => { subtitle.classList.add('blink'); }, 500);
          });
        });
      }, 1000);
    });
  }

  // ===== Matrix Background =====
  const canvas = document.getElementById('matrixCanvas');
  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const fontSize = 16;
  const columns = Math.floor(width/fontSize);
  const drops = Array(columns).fill(1);

  function draw() {
    ctx.fillStyle = "rgba(0,0,0,0.05)";
    ctx.fillRect(0,0,width,height);
    ctx.fillStyle = "#a800ff"; // purple
    ctx.font = fontSize + "px monospace";
    for(let i=0;i<drops.length;i++){
      const text = letters.charAt(Math.floor(Math.random()*letters.length));
      ctx.fillText(text, i*fontSize, drops[i]*fontSize);
      drops[i]++;
      if(drops[i]*fontSize > height && Math.random() > 0.975) drops[i]=0;
    }
  }
  setInterval(draw, 50);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });
});
