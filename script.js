// ===== Theme Toggle & About Section Image =====
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const aboutSection = document.getElementById('about');

const darkImage = "url('dallas.JPG')";
const lightImage = "url('light-mode-image.jpg')";

// Retrieve saved theme or default to dark
const savedTheme = localStorage.getItem('theme') || 'dark';
body.classList.add(`${savedTheme}-mode`);
themeToggle.checked = savedTheme === 'light';

// Set initial About section image based on saved theme
document.addEventListener('DOMContentLoaded', () => {
  aboutSection.style.backgroundImage = savedTheme === 'light' ? lightImage : darkImage;
});

// Toggle theme and About section image
themeToggle.addEventListener('change', () => {
  body.classList.toggle('light-mode');
  body.classList.toggle('dark-mode');

  if (body.classList.contains('light-mode')) {
    localStorage.setItem('theme', 'light');
    aboutSection.style.backgroundImage = lightImage;
  } else {
    localStorage.setItem('theme', 'dark');
    aboutSection.style.backgroundImage = darkImage;
  }
});

// ===== Typing Effect =====
const welcomeText = document.getElementById('welcomeText');
const subtitle = document.querySelector('.subtitle');

function typeText(element, text, speed = 50, callback) {
  let i = 0;
  element.textContent = '';
  function typing() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    } else if (callback) {
      callback();
    }
  }
  typing();
}

function deleteText(element, speed = 50, callback) {
  let text = element.textContent;
  let i = text.length;
  function deleting() {
    if (i > 0) {
      element.textContent = text.substring(0, i - 1);
      i--;
      setTimeout(deleting, speed);
    } else if (callback) {
      callback();
    }
  }
  deleting();
}

// ===== Animate Subtitle =====
function animateSubtitle() {
  subtitle.classList.remove('blink'); // reset blink

  typeText(subtitle, "Medical Professional & Tech Enthusiast", 50, () => {
    setTimeout(() => { // wait 1s before deleting
      deleteText(subtitle, 30, () => {
        subtitle.textContent = '';
        typeText(subtitle, "Please scroll!", 50, () => {
          setTimeout(() => { // wait 1s after typing before blinking
            subtitle.classList.add('blink');
          }, 1000);
        });
      });
    }, 1000);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const mainHeader = "Welcome to Rayyan's Portfolio!";
  typeText(welcomeText, mainHeader, 50, animateSubtitle);
});

// ===== Smooth Glass Blur on Scroll =====
const topOverlay = document.querySelector('.top-glass');
const bottomOverlay = document.querySelector('.bottom-glass');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  topOverlay.style.backdropFilter = `blur(${8 + scrollY * 0.015}px)`;
  bottomOverlay.style.backdropFilter = `blur(${8 + scrollY * 0.015}px)`;
});
