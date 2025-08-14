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

// ===== Typing Animation for Welcome & Subtitle =====
const welcomeText = document.getElementById('welcomeText');
const subtitle = document.querySelector('.subtitle');

function typeEffect(element, text, speed = 50, callback) {
  let i = 0;
  element.textContent = "";
  function typing() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    } else if (callback) {
      setTimeout(callback, 500);
      callback();
    }
  }
  typing();
}

function deleteEffect(element, speed = 50, callback) {
  let text = element.textContent;
  let i = text.length;
  function deleting() {
    if (i > 0) {
      element.textContent = text.substring(0, i - 1);
      i--;
      setTimeout(deleting, speed);
    } else if (callback) {
      setTimeout(callback, 500);
      callback();
    }
  }
  deleting();
}

document.addEventListener('DOMContentLoaded', () => {
  typeEffect(welcomeText, "Welcome to Rayyan's Portfolio!", 50, () => {
    typeEffect(subtitle, "Medical Professional & Tech Enthusiast", 50, () => {
      deleteEffect(subtitle, 30, () => {
        subtitle.textContent = "Please scroll!";
        subtitle.classList.add('blink');
      });
    });
  });
});

// ===== Glass blur effect on scroll =====
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  document.querySelector('.top-glass').style.backdropFilter =
    `blur(${Math.min(6, 3 + scrollY * 0.02)}px)`;
  document.querySelector('.bottom-glass').style.backdropFilter =
    `blur(${Math.min(6, 3 + scrollY * 0.02)}px)`;
});
