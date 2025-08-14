// ===== Theme Toggle =====
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const savedTheme = localStorage.getItem('theme') || 'dark';
body.classList.add(savedTheme + '-mode');
themeToggle.checked = (savedTheme === 'light');

themeToggle.addEventListener('change', () => {
  body.classList.toggle('light-mode');
  body.classList.toggle('dark-mode');
  localStorage.setItem('theme', body.classList.contains('light-mode') ? 'light' : 'dark');
});

// ===== Typing & Blinking Subtitle =====
const subtitle = document.querySelector('.subtitle');

function typeEffect(element, text, speed=50, callback) {
  let i=0;
  element.textContent = "";
  function typing() {
    if(i<text.length){
      element.textContent += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    } else if(callback) { callback(); }
  }
  typing();
}

function blinkEffect(element){
  element.classList.add('blink');
}

document.addEventListener('DOMContentLoaded',()=>{
  typeEffect(subtitle,"Please scroll!",50,()=>{
    blinkEffect(subtitle);
  });
});

// ===== Glass Blur on Scroll =====
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  document.querySelector('.top-glass').style.backdropFilter = `blur(${Math.min(15,6 + scrollY*0.02)}px)`;
  document.querySelector('.bottom-glass').style.backdropFilter = `blur(${Math.min(15,6 + scrollY*0.02)}px)`;
});
