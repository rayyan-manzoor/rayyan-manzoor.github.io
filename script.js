// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Set default theme
const savedTheme = localStorage.getItem('theme') || 'dark';
body.classList.add(savedTheme + '-mode');
themeToggle.checked = (savedTheme === 'light');

// Toggle function
themeToggle.addEventListener('change', () => {
  body.classList.toggle('light-mode');
  body.classList.toggle('dark-mode');
  localStorage.setItem('theme', body.classList.contains('light-mode') ? 'light' : 'dark');
});

// Smart Typing Animation
const welcomeText = document.getElementById('welcomeText');
const isMobile = window.innerWidth < 768;
const text = isMobile ? "Welcome to Rayyan's Portfolio!" : "Welcome to Rayyan's Portfolio!";
let index = 0;
const speed = 50;

function typeText() {
  if (index < text.length) {
    welcomeText.textContent += text.charAt(index);
    index++;
    setTimeout(typeText, speed);
  } else {
    welcomeText.style.borderRight = "none";
  }
}

typeText();
