// Theme Toggle with Guaranteed Gradients
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const welcomeSection = document.querySelector('.full-screen');

// Set default theme
const savedTheme = localStorage.getItem('theme') || 'dark';
body.classList.add(savedTheme + '-mode');
themeToggle.checked = (savedTheme === 'light');
applyGradient();

// Toggle function
themeToggle.addEventListener('change', () => {
  body.classList.toggle('light-mode');
  body.classList.toggle('dark-mode');
  localStorage.setItem('theme', body.classList.contains('light-mode') ? 'light' : 'dark');
  applyGradient();
});

function applyGradient() {
  welcomeSection.style.background = body.classList.contains('light-mode') 
    ? 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    : 'linear-gradient(135deg, #0f2027 0%, #2a5470 100%)';
}

// Typing Animation
const text = "Welcome to Rayyan's Portfolio!";
let index = 0;
const speed = 50;
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

// Dynamic Glass Effect
function updateGlassEffects() {
  const scrollY = window.scrollY;
  const docHeight = document.body.scrollHeight;
  const windowHeight = window.innerHeight;
  const scrollRatio = scrollY / (docHeight - windowHeight);

  // Toggle overlays
  document.querySelector('.top-glass').classList.toggle('active', scrollY > 10);
  document.querySelector('.bottom-glass').classList.toggle('active', scrollRatio < 0.98);

  // Dynamic blur (5px to 8px range)
  const dynamicBlur = 5 + (scrollY * 0.03);
  document.documentElement.style.setProperty('--blur-amount', `${Math.min(8, dynamicBlur)}px`);
}

// Initialize
window.addEventListener('scroll', updateGlassEffects);
updateGlassEffects();
typeText();
