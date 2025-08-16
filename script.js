document.addEventListener('DOMContentLoaded', () => {
  // ===== Theme Toggle & Section Images =====
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  const aboutSection = document.getElementById('about');
  const gifImage = document.querySelector('.fixed-gif img');

  // Light & Dark assets
  const lightImageMobile = "url('images/light-bg-mobile.jpg')";
  const lightImageDesktop = "url('images/light-bg-desktop.jpg')";
  const darkImageMobile = "url('images/dark-bg-mobile.jpg')";
  const darkImageDesktop = "url('images/dark-bg-desktop.jpg')";

  const lightGif = "images/light.gif";
  const darkGif = "images/dark.gif";

  const lightTextColor = "#000000";
  const darkTextColor = "#ffffff";

  // Apply theme function with responsive background handling
  function applyTheme(theme) {
    const isMobile = window.innerWidth <= 768;

    if (theme === 'light') {
      body.classList.add('light-mode');
      body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');

      aboutSection.style.backgroundImage = isMobile ? lightImageMobile : lightImageDesktop;
      body.style.color = lightTextColor;

      gifImage.src = lightGif;

    } else {
      body.classList.add('dark-mode');
      body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');

      aboutSection.style.backgroundImage = isMobile ? darkImageMobile : darkImageDesktop;
      body.style.color = darkTextColor;

      gifImage.src = darkGif;
    }
  }

  // Theme toggle button
  themeToggle.addEventListener('click', () => {
    const newTheme = body.classList.contains('light-mode') ? 'dark' : 'light';
    applyTheme(newTheme);
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
