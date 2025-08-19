document.addEventListener('DOMContentLoaded', () => {
  // ===== Typing Effect =====
  const welcomeText = document.getElementById('welcomeText');
  const subtitle = document.getElementById('subtitle');

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
            }, 500);
          });
        });
      }, 1000);
    });
  }

  // ===== Welcome Text Animation =====
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

  // ===== Matrix Background Effect =====
  const matrixCanvas = document.createElement('canvas');
  const ctx = matrixCanvas.getContext('2d');
  document.getElementById('welcome').appendChild(matrixCanvas);
  matrixCanvas.style.position = 'absolute';
  matrixCanvas.style.top = '0';
  matrixCanvas.style.left = '0';
  matrixCanvas.style.width = '100%';
  matrixCanvas.style.height = '100%';
  matrixCanvas.width = matrixCanvas.offsetWidth;
  matrixCanvas.height = matrixCanvas.offsetHeight;

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const fontSize = 20;
  const columns = matrixCanvas.width / fontSize;
  const drops = Array(Math.floor(columns)).fill(1);

  function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
    ctx.fillStyle = "#0F0";
    ctx.font = fontSize + "px monospace";
    for (let i = 0; i < drops.length; i++) {
      const text = letters.charAt(Math.floor(Math.random() * letters.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      drops[i]++;
      if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
    }
  }
  setInterval(drawMatrix, 50);

  window.addEventListener('resize', () => {
    matrixCanvas.width = matrixCanvas.offsetWidth;
    matrixCanvas.height = matrixCanvas.offsetHeight;
  });
});
