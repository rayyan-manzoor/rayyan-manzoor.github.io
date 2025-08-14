// ===== Theme Toggle & Section Images =====
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const aboutSection = document.getElementById('about');
const welcomeSection = document.getElementById('welcome');
const portfolioSection = document.getElementById('portfolio');

const darkImage = "url('dallas.JPG')";
const lightImage = "url('light-mode-image.jpg')";

// Retrieve saved theme or default to dark
const savedTheme = localStorage.getItem('theme') || 'dark';
body.classList.add(`${savedTheme}-mode`);
themeToggle.checked = savedTheme === 'light';

// Set initial section backgrounds based on saved theme
document.addEventListener('DOMContentLoaded', () => {
  aboutSection.style.backgroundImage = savedTheme === 'light' ? lightImage : darkImage;
  welcomeSection.style.background = savedTheme === 'light' ? 
      "linear-gradient(135deg, #a8edea, #fed6e3)" : 
      "linear-gradient(135deg, #0f2027, #2a5470)";
  portfolioSection.style.background = savedTheme === 'light' ? 
      "linear-gradient(135deg, #a8edea, #fed6e3)" : 
      "linear-gradient(135deg, #0f2027, #2a5470)";
});

// Toggle theme and update section backgrounds
themeToggle.addEventListener('change', () => {
  body.classList.toggle('light-mode');
  body.classList.toggle('dark-mode');

  if (body.classList.contains('light-mode')) {
    localStorage.setItem('theme', 'light');
    aboutSection.style.backgroundImage = lightImage;
    welcomeSection.style.background = "linear-gradient(135deg, #a8edea, #fed6e3)";
    portfolioSection.style.background = "linear-gradient(135deg, #a8edea, #fed6e3)";
  } else {
    localStorage.setItem('theme', 'dark');
    aboutSection.style.backgroundImage = darkImage;
    welcomeSection.style.background = "linear-gradient(135deg, #0f2027, #2a5470)";
    portfolioSection.style.background = "linear-gradient(135deg, #0f2027, #2a5470)";
  }
});
