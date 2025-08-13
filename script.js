// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Set default theme (dark) and apply saved preference
const savedTheme = localStorage.getItem('theme') || 'dark';
body.classList.add(savedTheme + '-mode');
themeToggle.checked = (savedTheme === 'light');

// Force initial gradient load (critical fix)
document.querySelector('.full-screen').style.background = 
  savedTheme === 'dark' 
    ? 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)'
    : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)';

// Toggle theme on switch click
themeToggle.addEventListener('change', () => {
  if (body.classList.contains('dark-mode')) {
    body.classList.replace('dark-mode', 'light-mode');
    localStorage.setItem('theme', 'light');
    // Apply light gradient
    document.querySelector('.full-screen').style.background = 
      'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)';
  } else {
    body.classList.replace('light-mode', 'dark-mode');
    localStorage.setItem('theme', 'dark');
    // Apply dark gradient
    document.querySelector('.full-screen').style.background = 
      'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)';
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

typeText();
