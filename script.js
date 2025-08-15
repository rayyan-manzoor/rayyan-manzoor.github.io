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
      gifImage.src = lightGif;
    } else {
      body.classList.add('dark-mode');
      body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
      aboutSection.style.backgroundImage = darkImage;
      welcomeSection.style.background = "linear-gradient(135deg, #2a5470, #0f2027)";
      portfolioSection.style.background = "linear-gradient(135deg, #0f2027, #2a5470)";
      body.style.color = darkTextColor;
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
  const mainHeader = "Welcome to Rayyan's Portfolio!";

  // Wrap each word in span
  welcomeText.innerHTML = mainHeader.split(" ").map(word => `<span>${word}</span>`).join(" ");
  const wordSpans = welcomeText.querySelectorAll("span");

  function typeText(element, text, speed = 50, callback) {
    let i = 0;
    element.textContent = '';
    function typing() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(typing, speed);
      } else if (callback) callback();
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
      } else if (callback) callback();
    }
    deleting();
  }

  function animateSubtitle() {
    subtitle.classList.remove('blink');
    typeText(subtitle, "Medical Professional & Tech Enthusiast", 50, () => {
      setTimeout(() => {
        deleteText(subtitle, 30, () => {
          typeText(subtitle, "Please scroll!", 50, () => {
            setTimeout(() => subtitle.classList.add('blink'), 500);
          });
        });
      }, 1000);
    });
  }

  // ===== Word Fade-In Animation =====
  setTimeout(() => {
    wordSpans.forEach((span, index) => {
      setTimeout(() => {
        span.classList.add("visible");
        if (index === wordSpans.length - 1) animateSubtitle();
      }, index * 250);
    });
  }, 100);

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
    const pageHeight = document.body.scrollHeight;

    let topFactor = Math.min(Math.max((scrollY - scrollThreshold) / rampLength, 0), 1);
    let bottomScroll = pageHeight - viewportHeight - scrollY;
    let bottomFactor = Math.min(Math.max((bottomScroll - scrollThreshold) / rampLength, 0), 1);

    topOverlay.style.backdropFilter = `blur(${(topFactor * maxBlur).toFixed(2)}px)`;
    bottomOverlay.style.backdropFilter = `blur(${(bottomFactor * maxBlur).toFixed(2)}px)`;
    topOverlay.style.webkitBackdropFilter = topOverlay.style.backdropFilter;
    bottomOverlay.style.webkitBackdropFilter = bottomOverlay.style.backdropFilter;
  });

  // ===== Make Scrolling Text Infinite =====
  document.querySelectorAll('.scrolling-text-line').forEach(line => {
    const content = line.innerHTML;
    line.innerHTML = content + content + content; // triple for seamless scroll
  });

  // ===== Reactive scrolling lines =====
  const line1 = document.querySelector('.line1');
  const line2 = document.querySelector('.line2');
  let lastScrollY = window.scrollY;
  let pos1 = 0;
  let pos2 = 0;
  const baseSpeed = 0.2;
  const scrollFactor = 0.05;

  function animateLines() {
    const scrollY = window.scrollY;
    const delta = scrollY - lastScrollY;

    pos1 += baseSpeed - delta * scrollFactor;
    pos2 -= baseSpeed - delta * scrollFactor;

    if (pos1 > 50) pos1 = -50;
    if (pos1 < -50) pos1 = 50;
    if (pos2 > 50) pos2 = -50;
    if (pos2 < -50) pos2 = 50;

    line1.style.transform = `translateX(${pos1}%)`;
    line2.style.transform = `translateX(${pos2}%)`;

    lastScrollY = scrollY;
    requestAnimationFrame(animateLines);
  }

  animateLines();
});
