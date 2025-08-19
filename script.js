document.addEventListener('DOMContentLoaded', () => {

  // ===== Welcome Text Typing =====
  const welcomeText = document.getElementById('welcomeText');
  const subtitle = document.getElementById('subtitle');
  const mainHeader = "Welcome to Rayyan's Portfolio!";
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
      } else if (callback) { callback(); }
    }
    typing();
  }

  function deleteText(element, speed = 50, callback) {
    let text = element.textContent;
    let i = text.length;
    function deleting() {
      if (i > 0) {
        element.textContent = text.substring(0, i-1);
        i--;
        setTimeout(deleting, speed);
      } else if (callback) { callback(); }
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
            setTimeout(() => { subtitle.classList.add('blink'); }, 500);
          });
        });
      }, 1000);
    });
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        wordSpans.forEach((span, index) => {
          setTimeout(() => {
            span.classList.add("visible");
            if (index === wordSpans.length - 1) setTimeout(animateSubtitle, 500);
          }, index * 400);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.1 });
  observer.observe(welcomeText);

  // ===== About Me Infinite Lines =====
  const line1 = document.querySelector(".line1");
  const line2 = document.querySelector(".line2");

  function fillLine(line, text) {
    const containerWidth = line.parentElement.offsetWidth;
    const textWidth = 300;
    const repeatCount = Math.ceil(containerWidth / textWidth) + 3;
    line.innerHTML = "";
    for (let i = 0; i < repeatCount; i++) {
      const span = document.createElement("span");
      span.textContent = text + "   ";
      line.appendChild(span);
    }
  }

  fillLine(line1, "Welcome To About Me");
  fillLine(line2, "Explore Projects About Me");

  window.addEventListener("resize", () => {
    fillLine(line1, "Welcome To About Me");
    fillLine(line2, "Explore Projects About Me");
  });
});
