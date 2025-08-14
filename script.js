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

// ===== Typing Effect for Welcome Header =====
const welcomeText = document.getElementById('welcomeText');
const mainHeader = "Welcome to Rayyan's Portfolio!";
const subtitle = document.querySelector('.subtitle');

function typeText(element, text, speed=50, callback){
  let i = 0;
  element.textContent = "";
  function typing() {
    if(i < text.length){
      element.textContent += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    } else if(callback){
      callback();
    }
  }
  typing();
}

// ===== Subtitle animation sequence =====
function animateSubtitle(){
  typeText(subtitle, "Medical Professional & Tech Enthusiast", 50, () => {
    deleteText(subtitle, 30, () => {
      typeText(subtitle, "Please scroll!", 50);
    });
  });
}

function deleteText(element, speed=50, callback){
  let text = element.textContent;
  let i = text.length;
  function deleting(){
    if(i > 0){
      element.textContent = text.substring(0, i-1);
      i--;
      setTimeout(deleting, speed);
    } else if(callback){
      callback();
    }
  }
  deleting();
}

document.addEventListener('DOMContentLoaded', () => {
  typeText(welcomeText, mainHeader, 50, animateSubtitle);
});

// ===== Smooth Glass Blur on Scroll =====
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  document.querySelector('.top-glass').style.backdropFilter =
    `blur(${8 + scrollY*0.015}px)`;
  document.querySelector('.bottom-glass').style.backdropFilter =
    `blur(${8 + scrollY*0.015}px)`;
});
