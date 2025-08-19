document.addEventListener('DOMContentLoaded', () => {
  // ===== Theme Toggle =====
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  const savedTheme = localStorage.getItem('theme') || 'dark';
  body.classList.add(`${savedTheme}-mode`);
  themeToggle.checked = savedTheme === 'light';

  function applyTheme(theme) {
    if (theme === 'light') {
      body.classList.add('light-mode'); body.classList.remove('dark-mode'); localStorage.setItem('theme', 'light');
    } else {
      body.classList.add('dark-mode'); body.classList.remove('light-mode'); localStorage.setItem('theme', 'dark');
    }
  }
  applyTheme(savedTheme);
  themeToggle.addEventListener('change', () => {
    const newTheme = body.classList.contains('light-mode') ? 'dark' : 'light';
    applyTheme(newTheme);
  });

  // ===== Typing Animation =====
  const welcomeText = document.getElementById('welcomeText');
  const subtitle = document.getElementById('subtitle');

  function typeText(element, text, speed = 50, callback) {
    let i = 0;
    element.textContent = '';
    function typing() {
      if (i < text.length) { element.textContent += text.charAt(i); i++; setTimeout(typing, speed); }
      else if (callback) callback();
    }
    typing();
  }

  function deleteText(element, speed = 50, callback) {
    let text = element.textContent;
    let i = text.length;
    function deleting() {
      if (i > 0) { element.textContent = text.substring(0, i-1); i--; setTimeout(deleting, speed); }
      else if (callback) callback();
    }
    deleting();
  }

  function animateSubtitle() {
    subtitle.classList.remove('blink');
    typeText(subtitle, "Medical Professional & Tech Enthusiast", 50, () => {
      setTimeout(() => {
        deleteText(subtitle, 30, () => {
          typeText(subtitle, "Please scroll!", 50, () => { subtitle.classList.add('blink'); });
        });
      }, 1000);
    });
  }

  // ===== Welcome Text Blur Animation =====
  const mainHeader = "Welcome to Rayyan's Portfolio!";
  welcomeText.innerHTML = mainHeader.split(" ").map(word => `<span>${word}</span>`).join(" ");
  const wordSpans = welcomeText.querySelectorAll("span");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        wordSpans.forEach((span, index) => {
          setTimeout(() => { span.classList.add("visible"); if (index === wordSpans.length-1) setTimeout(animateSubtitle, 500); }, index*400);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.1 });
  observer.observe(welcomeText);
});
