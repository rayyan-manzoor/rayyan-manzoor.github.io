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

// ===== Typing Effect =====
const welcomeText = document.getElementById('welcomeText');
const subtitle = document.querySelector('.subtitle');

function typeText(element, text, speed = 50, callback) {
  let i = 0;
  element.textContent = "";
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else if(callback) {
      setTimeout(callback, 1000);
    }
  }
  type();
}

function deleteText(element, speed = 50, callback) {
  let text = element.textContent;
  let i = text.length;
  function del() {
    if(i > 0) {
      element.textContent = text.substring(0, i - 1);
      i--;
      setTimeout(del, speed);
    } else if(callback) {
      setTimeout(callback, 500);
    }
  }
  del();
}

document.addEventListener('DOMContentLoaded', () => {
  // Welcome main heading typing
  typeText(welcomeText, "Welcome to Rayyan's Portfolio!", 50, () => {
    // Subtitle animation
    typeText(subtitle, "Medical Professional & Tech Enthusiast", 50, () => {
      deleteText(subtitle, 30, () => {
        subtitle.textContent = "Please scroll!";
        subtitle.classList.add("blink");
      });
    });
  });
});

// ===== Glass blur effect on scroll =====
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  document.querySelector('.top-glass').style.backdropFilter = `blur(${6 + scrollY*0.01}px)`;
  document.querySelector('.bottom-glass').style.backdropFilter = `blur(${6 + scrollY*0.01}px)`;
});
