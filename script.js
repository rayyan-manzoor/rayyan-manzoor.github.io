// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Set default theme (dark)
const savedTheme = localStorage.getItem('theme') || 'dark';
body.classList.add(savedTheme + '-mode');
themeToggle.checked = (savedTheme === 'light');

// Toggle theme on switch
themeToggle.addEventListener('change', () => {
  if (body.classList.contains('dark-mode')) {
    body.classList.replace('dark-mode', 'light-mode');
    localStorage.setItem('theme', 'light');
  } else {
    body.classList.replace('light-mode', 'dark-mode');
    localStorage.setItem('theme', 'dark');
  }
});

// Typing Animation (Keep original)
const text = "Welcome to my portfolio!";
let index = 0;
const speed = 100;
const welcomeText = document.getElementById('welcomeText');

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
