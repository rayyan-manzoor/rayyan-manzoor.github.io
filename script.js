document.addEventListener('DOMContentLoaded', () => {
  // ===== Theme Toggle & Section Images =====
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  const aboutSection = document.getElementById('about');
  const welcomeSection = document.getElementById('welcome');
  const portfolioSection = document.getElementById('portfolio');

  const gifImage = document.querySelector('.fixed-gif img');

  // Light & Dark assets
  const lightImage = "url('images/light-bg.jpg')";
  const darkImage = "url('images/dark-bg.jpg')";
  const lightGif = "images/light.gif";
  const darkGif = "images/dark.gif";

  const lightTextColor = "#000000";
  const darkTextColor = "#ffffff";

  // Apply theme function with responsive background handling
  function applyTheme(theme) {
    if (theme === 'light') {
      body.classList.add('light-mode');
      body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');

      // Responsive background for light mode
      if (window.innerWidth <= 768) {
        welcomeSection.style.background = "linear-gradient(135deg, #dbeafe, #fbcfe8)";
        portfolioSection.style.background = "linear-gradient(135deg, #dbeafe, #fbcfe8)";
      } else {
        welcomeSection.style.background = "linear-gradient(135deg, #a8edea, #fed6e3)";
        portfolioSection.style.background = "linear-gradient(135deg, #a8edea, #fed6e3)";
      }

      aboutSection.style.backgroundImage = lightImage;
      body.style.color = lightTextColor;
      welcomeSection.style.color = lightTextColor;
      portfolioSection.style.color = lightTextColor;

      gifImage.src = lightGif;
    } else {
      body.classList.add('dark-mode');
      body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');

      // Responsive background for dark mode
      if (window.innerWidth <= 768) {
        welcomeSection.style.background = "linear-gradient(135deg, #111827, #1f2937)";
        portfolioSection.style.background = "linear-gradient(135deg, #111827, #1f2937)";
      } else {
        welcomeSection.style.background = "linear-gradient(135deg, #000000, #1a1a1a)";
        portfolioSection.style.background = "linear-gradient(135deg, #1a1a1a, #000000)";
      }

      aboutSection.style.backgroundImage = darkImage;
      body.style.color = darkTextColor;
      welcomeSection.style.color = darkTextColor;
      portfolioSection.style.color = darkTextColor;

      gifImage.src = darkGif;
    }
  }

  // Theme toggle button
  themeToggle.addEventListener('click', () => {
    if (body.classList.contains('light-mode')) {
      applyTheme('dark');
    } else {
      applyTheme('light');
    }
  });

  // Load saved theme
  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);

  // Reapply correct backgrounds on resize
  window.addEventListener('resize', () => {
    const currentTheme = body.classList.contains('light-mode') ? 'light' : 'dark';
    applyTheme(currentTheme);
  });
});
