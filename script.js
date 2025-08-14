// Theme Toggle
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

// Typing & Deleting Effect for Subtitle
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
      setTimeout(callback, 1000, callback);
      if (element.textContent === "Please scroll!") {
        element.classList.add('blink'); // blinking only for final text
      }
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
      setTimeout(callback, 500, callback);
    }
  }
  deleting();
}

document.addEventListener('DOMContentLoaded', () => {
  typeEffect(subtitle, "Medical Professional & Tech Enthusiast", 50, () => {
    deleteEffect(subtitle, 30, () => {
      typeEffect(subtitle, "Please scroll!", 50);
    });
  });
});

// Soft Glass Blur on Scroll
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const topGlass = document.querySelector('.top-glass');
  const bottomGlass = document.querySelector('.bottom-glass');

  topGlass.style.backdropFilter = `blur(${6 + scrollY * 0.02}px)`;
  bottomGlass.style.backdropFilter = `blur(${6 + scrollY * 0.02}px)`;
});
