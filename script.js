// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Set default theme (dark)
const savedTheme = localStorage.getItem('theme') || 'dark';
body.classList.add(savedTheme + '-mode');
themeToggle.checked = (savedTheme === 'light');

// Apply correct gradient on load
updateGradient(savedTheme);

// Toggle theme on switch
themeToggle.addEventListener('change', () => {
  if (body.classList.contains('dark-mode')) {
    body.classList.replace('dark-mode', 'light-mode');
    localStorage.setItem('theme', 'light');
    updateGradient('light');
  } else {
    body.classList.replace('light-mode', 'dark-mode');
    localStorage.setItem('theme', 'dark');
    updateGradient('dark');
  }
});

// Typing Animation
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

// Helper function to update gradient
function updateGradient(theme) {
  const welcomeSection = document.querySelector('.full-screen');
  welcomeSection.style.background = 
    theme === 'dark' 
      ? 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)'
      : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)';
}

typeText();
