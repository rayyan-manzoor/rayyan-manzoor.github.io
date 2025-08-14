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

// Typing & Deleting Effect
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
      callback();
    }
  }
  deleting();
}

// Blinking text effect (fade in/out)
function blinkText(element) {
  setInterval(() => {
    element.style.visibility = (element.style.visibility === 'hidden') ? 'visible' : 'visible' === element.style.visibility ? 'hidden' : 'visible';
  }, 500);
}

document.addEventListener('DOMContentLoaded', () => {
  // Step 1: Type welcome line
  typeEffect(welcomeText, "Welcome to Rayyan's Portfolio!", 50, () => {
    // Step 2: Type subtitle
    typeEffect(subtitle, "Medical Professional & Tech Enthusiast", 50, () => {
      // Step 3: Delete subtitle
      deleteEffect(subtitle, 30, () => {
        // Step 4: Type "Please scroll!" and start blinking
        typeEffect(subtitle, "Please scroll!", 50, () => {
          blinkText(subtitle);
        });
      });
    });
  });
});

// Glass blur effect on scroll (soft edges + reduced blur)
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const maxBlur = 9; // 60% of original 15px
  const minBlur = 6; // 60% of original 10px
  const blurValue = Math.min(maxBlur, minBlur + scrollY * 0.02);

  document.querySelector('.top-glass').style.backdropFilter = `blur(${blurValue}px)`;
  document.querySelector('.bottom-glass').style.backdropFilter = `blur(${blurValue}px)`;

  // Add smooth transition
  document.querySelector('.top-glass').style.transition = 'backdrop-filter 0.2s ease-out';
  document.querySelector('.bottom-glass').style.transition = 'backdrop-filter 0.2s ease-out';
});
