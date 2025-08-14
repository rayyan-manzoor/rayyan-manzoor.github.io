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

// Blinking effect for "Please scroll!"
function blinkCursorEffect(element) {
  element.style.borderRight = "3px solid";
  setInterval(() => {
    element.style.borderRight = element.style.borderRight === "3px solid" ? "none" : "3px solid";
  }, 500);
}

document.addEventListener('DOMContentLoaded', () => {
  // Step 1: Type welcome line
  typeEffect(welcomeText, "Welcome to Rayyan's Portfolio!", 50, () => {
    // Step 2: Type subtitle
    typeEffect(subtitle, "Medical Professional & Tech Enthusiast", 50, () => {
      // Step 3: Delete subtitle
      deleteEffect(subtitle, 30, () => {
        // Step 4: Type "Please scroll!" with blinking cursor
        typeEffect(subtitle, "Please scroll!", 50, () => {
          blinkCursorEffect(subtitle);
        });
      });
    });
  });
});

// Glass blur effect on scroll
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  document.querySelector('.top-glass').style.backdropFilter =
    `blur(${Math.min(15, 10 + scrollY * 0.02)}px)`;
});
