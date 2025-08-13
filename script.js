
// Theme Toggle (keep your existing code)
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const savedTheme = localStorage.getItem('theme') || 'dark';
body.classList.add(savedTheme + '-mode');
themeToggle.checked = (savedTheme === 'light');

themeToggle.addEventListener('change', () => {
  body.classList.toggle('light-mode');
  body.classList.toggle('dark-mode');
  localStorage.setItem('theme', body.classList.contains('light-mode') ? 'light' : 'dark');
});

// Typing Animation (keep your existing code)
const text = "Welcome to Rayyan's Portfolio!";
let index = 0;
const speed = 50;
const welcomeText = document.getElementById('welcomeText');

function typeText() {
  if (index < text.length) {
    welcomeText.textContent += text.charAt(index);
    index++;
    setTimeout(typeText, speed);
  } else {
    welcomeText.style.borderRight = "none";
  }
}

// Diagonal Scroll Animation
document.addEventListener('DOMContentLoaded', () => {
  // Move all sections into the diagonal container
  const container = document.querySelector('.diagonal-scroll-content');
  document.querySelectorAll('section').forEach(section => {
    container.appendChild(section);
  });

  // GSAP Animation
  gsap.registerPlugin(ScrollTrigger);
  
  let sections = gsap.utils.toArray("section");
  let maxWidth = 0;
  
  sections.forEach((section, i) => {
    maxWidth += window.innerWidth;
    
    gsap.to(container, {
      x: -i * window.innerWidth,
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=100%",
        scrub: 1,
        pin: true,
        anticipatePin: 1
      }
    });
  });

  // Set container width
  gsap.set(container, { width: maxWidth });

  // Glass effect (keep your existing code)
  if (CSS.supports('backdrop-filter', 'blur(10px)')) {
    ScrollTrigger.create({
      onUpdate: (self) => {
        const scrollY = self.progress * 1000;
        document.querySelector('.top-glass').style.backdropFilter = `blur(${Math.min(15, 10 + scrollY * 0.1)}px)`;
      }
    });
  }

  typeText();
});
