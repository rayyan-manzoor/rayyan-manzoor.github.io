document.addEventListener('DOMContentLoaded', () => {

  // ===== Welcome Text =====
  const welcomeText = document.getElementById('welcomeText');
  const subtitle = document.getElementById('subtitle');
  const mainHeader = "Welcome to Rayyan's Portfolio!";
  welcomeText.innerHTML = mainHeader.split(" ").map(word => `<span>${word}</span>`).join(" ");
  const wordSpans = welcomeText.querySelectorAll("span");

  // ===== Typing Effect Functions =====
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

  // ===== Observer for Welcome Text =====
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

// Immediately show spans and start subtitle animation
wordSpans.forEach((span, index) => {
  setTimeout(() => {
    span.classList.add("visible");
    if (index === wordSpans.length - 1) {
      setTimeout(animateSubtitle, 500);
    }
  }, index * 400);
});

