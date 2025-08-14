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
      setTimeout(callback, 1000);
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
    }
  }
  deleting();
}

document.addEventListener('DOMContentLoaded', () => {
  // Animate Subtitle
  typeEffect(subtitle, "Medical Professional & Tech Enthusiast", 50, () => {
    deleteEffect(subtitle, 30, () => {
      // Blinking "Please scroll!"
      subtitle.textContent = "Please scroll!";
      subtitle.classList.add('blink');
    });
  });
});

// Soft Glass blur effect on scroll
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  document.querySelector('.top-glass').style.backdropFilter =
    `blur(${6 + scrollY * 0.02}px)`;
  document.querySelector('.bottom-glass').style.backdropFilter =
    `blur(${6 + scrollY * 0.02}px)`;
});
