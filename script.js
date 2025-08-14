document.addEventListener('DOMContentLoaded', () => {
  // ===== Theme Toggle & Section Images =====
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  const aboutSection = document.getElementById('about');
  const welcomeSection = document.getElementById('welcome');
  const portfolioSection = document.getElementById('portfolio');

  const darkImage = "url('dallas.JPG')";
  const lightImage = "url('light-mode-image.jpg')";

  const savedTheme = localStorage.getItem('theme') || 'dark';
  body.classList.add(`${savedTheme}-mode`);
  themeToggle.checked = savedTheme === 'light';

  aboutSection.style.backgroundImage = savedTheme === 'light' ? lightImage : darkImage;
  welcomeSection.style.background = savedTheme === 'light' ? 
      "linear-gradient(135deg, #a8edea, #fed6e3)" : 
      "linear-gradient(135deg, #0f2027, #2a5470)";
  portfolioSection.style.background = savedTheme === 'light' ? 
      "linear-gradient(135deg, #a8edea, #fed6e3)" : 
      "linear-gradient(135deg, #0f2027, #2a5470)";

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

  // ===== Animate Subtitle =====
  function animateSubtitle() {
    subtitle.classList.remove('blink'); // reset blink
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
  typeText(welcomeText, mainHeader, 50, animateSubtitle);

});
