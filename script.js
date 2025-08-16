document.addEventListener('DOMContentLoaded', () => {
  // ===== Theme Toggle & Section Images =====
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  const aboutSection = document.getElementById('about');
  const welcomeSection = document.getElementById('welcome');
  const portfolioSection = document.getElementById('portfolio');

  const gifImage = document.querySelector('.fixed-gif img');
  const darkGif = "newgif.gif";
  const lightGif = "newgif-blacktext.gif";

  const darkImage = "url('dallas.JPG')";
  const lightImage = "url('light-mode-image.jpg')";

  const darkTextColor = "#fff";
  const lightTextColor = "#333";

  const savedTheme = localStorage.getItem('theme') || 'dark';
  body.classList.add(`${savedTheme}-mode`);
  themeToggle.checked = savedTheme === 'light';

  function applyTheme(theme) {
    if (theme === 'light') {
      body.classList.add('light-mode');
      body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');

      aboutSection.style.backgroundImage = lightImage;
      welcomeSection.style.background = "linear-gradient(135deg, #a8edea, #fed6e3)";
      portfolioSection.style.background = "linear-gradient(135deg, #a8edea, #fed6e3)";

      body.style.color = lightTextColor;
      welcomeSection.style.color = lightTextColor;
      portfolioSection.style.color = lightTextColor;

      gifImage.src = lightGif;
    } else {
      body.classList.add('dark-mode');
      body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');

      aboutSection.style.backgroundImage = darkImage;
      welcomeSection.style.background = "linear-gradient(135deg, #000000, #1a1a1a)";
      portfolioSection.style.background = "linear-gradient(135deg, ##1a1a1a, #000000)";

      body.style.color = darkTextColor;
      welcomeSection.style.color = darkTextColor;
      portfolioSection.style.color = darkTextColor;

      gifImage.src = darkGif;
    }
  }

  applyTheme(savedTheme);

  themeToggle.addEventListener('change', () => {
    const newTheme = body.classList.contains('light-mode') ? 'dark' : 'light';
    applyTheme(newTheme);
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
    topOverlay.style.height = `${viewportHeight}px`;
    bottomOverlay.style.height = `${viewportHeight}px`;
  }

  updateOverlayHeight();
  window.addEventListener('resize', updateOverlayHeight);

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const normalizedScroll = Math.min(scrollY / rampLength, 1);
    const blurValue = normalizedScroll * maxBlur;
    topOverlay.style.backdropFilter = `blur(${blurValue}px)`;
    bottomOverlay.style.backdropFilter = `blur(${blurValue}px)`;
  });
});
