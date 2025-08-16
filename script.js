document.addEventListener('DOMContentLoaded', () => {
  // ===== Theme Toggle & Section Elements =====
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  const aboutSection = document.getElementById('about');
  const welcomeSection = document.getElementById('welcome');
  const portfolioSection = document.getElementById('portfolio');
  const gifImage = document.querySelector('.fixed-gif img');

  // ===== Assets =====
  const lightGif = "images/light.gif";
  const darkGif = "images/dark.gif";

  const lightTextColor = "#000000";
  const darkTextColor = "#ffffff";

  // ===== Theme Backgrounds =====
  const backgrounds = {
    light: {
      mobile: "url('images/light-bg-mobile.jpg')",
      desktop: "url('images/light-bg-desktop.jpg')"
    },
    dark: {
      mobile: "url('images/dark-bg-mobile.jpg')",
      desktop: "url('images/dark-bg-desktop.jpg')"
    }
  };

  // ===== Apply Theme Function =====
  function applyTheme(theme) {
    if (theme === 'light') {
      body.classList.add('light-mode');
      body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
      gifImage.src = lightGif;
      body.style.color = lightTextColor;
      welcomeSection.style.color = lightTextColor;
      portfolioSection.style.color = lightTextColor;

      // Set responsive about background
      if (window.innerWidth <= 768) {
        aboutSection.style.backgroundImage = backgrounds.light.mobile;
      } else {
        aboutSection.style.backgroundImage = backgrounds.light.desktop;
      }
    } else {
      body.classList.add('dark-mode');
      body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
      gifImage.src = darkGif;
      body.style.color = darkTextColor;
      welcomeSection.style.color = darkTextColor;
      portfolioSection.style.color = darkTextColor;

      if (window.innerWidth <= 768) {
        aboutSection.style.backgroundImage = backgrounds.dark.mobile;
      } else {
        aboutSection.style.backgroundImage = backgrounds.dark.desktop;
      }
    }
  }

  // ===== Toggle Button =====
  themeToggle.addEventListener('click', () => {
    const newTheme = body.classList.contains('light-mode') ? 'dark' : 'light';
    applyTheme(newTheme);
  });

  // ===== Load Saved Theme =====
  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);

  // ===== Adjust Background on Resize =====
  window.addEventListener('resize', () => {
    const currentTheme = body.classList.contains('light-mode') ? 'light' : 'dark';
    applyTheme(currentTheme);
  });

  // ===== Typing Effect =====
  const welcomeText = document.getElementById('welcomeText');
  const subtitle = document.querySelector('.subtitle');

  function typeText(element, text, speed = 50, callback) {
    let i = 0;
    element.textContent = '';
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

  function deleteText(element, speed = 50, callback) {
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

  function animateSubtitle() {
    subtitle.classList.remove('blink');
    typeText(subtitle, "Medical Professional & Tech Enthusiast", 50, () => {
      setTimeout(() => {
        deleteText(subtitle, 30, () => {
          subtitle.textContent = '';
          typeText(subtitle, "Please scroll!", 50, () => {
            setTimeout(() => {
              subtitle.classList.add('blink');
            }, 1000);
          });
        });
      }, 1000);
    });
  }

  // ===== Animate Main Header =====
  const mainHeader = "Welcome to Rayyan's Portfolio!";
  welcomeText.innerHTML = mainHeader.split(" ").map(word => `<span>${word}</span>`).join(" ");
  const wordSpans = welcomeText.querySelectorAll("span");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        wordSpans.forEach((span, index) => {
          setTimeout(() => {
            span.classList.add("visible");
            if (index === wordSpans.length - 1) {
              setTimeout(animateSubtitle, 500);
            }
          }, index * 400);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.1 });

  observer.observe(welcomeText);

  // ===== Progressive Blur Overlays =====
  const topOverlay = document.querySelector('.top-glass');
  const bottomOverlay = document.querySelector('.bottom-glass');
  const maxBlur = 3;
  const scrollThreshold = 20;
  const rampLength = 600;

  function updateOverlayHeight() {
    const viewportHeight = window.innerHeight;
    if (topOverlay) topOverlay.style.height = `${viewportHeight}px`;
    if (bottomOverlay) bottomOverlay.style.height = `${viewportHeight}px`;
  }

  updateOverlayHeight();
  window.addEventListener('resize', updateOverlayHeight);

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const pageHeight = document.body.scrollHeight;

    let topFactor = Math.min(Math.max((scrollY - scrollThreshold) / rampLength, 0), 1);
    if (topOverlay) topOverlay.style.backdropFilter = `blur(${(topFactor * maxBlur).toFixed(2)}px)`;
    if (topOverlay) topOverlay.style.webkitBackdropFilter = `blur(${(topFactor * maxBlur).toFixed(2)}px)`;

    let bottomScroll = pageHeight - viewportHeight - scrollY;
    let bottomFactor = Math.min(Math.max((bottomScroll - scrollThreshold) / rampLength, 0), 1);
    if (bottomOverlay) bottomOverlay.style.backdropFilter = `blur(${(bottomFactor * maxBlur).toFixed(2)}px)`;
    if (bottomOverlay) bottomOverlay.style.webkitBackdropFilter = `blur(${(bottomFactor * maxBlur).toFixed(2)}px)`;
  });

  // ===== Make Scrolling Text Infinite =====
  document.querySelectorAll('.scrolling-text-line').forEach(line => {
    const content = line.innerHTML;
    line.innerHTML = content + content + content; // duplicate 3x
  });

});
