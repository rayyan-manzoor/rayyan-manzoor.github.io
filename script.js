// Typing animation for welcome text
const text = "Welcome to my portfolio!";
let index = 0;
const speed = 100;
const welcomeText = document.getElementById("welcomeText");

function typeText() {
  if (index < text.length) {
    welcomeText.textContent += text.charAt(index);
    index++;
    setTimeout(typeText, speed);
  } else {
    welcomeText.style.borderRight = "none"; // remove cursor
  }
}

typeText();

// Scroll animation for portfolio sections
const sections = document.querySelectorAll('.portfolio-section');

function checkFade() {
  const triggerBottom = window.innerHeight * 0.85;

  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    if(sectionTop < triggerBottom) {
      section.classList.add('fade-in');
    }
  });
}

window.addEventListener('scroll', checkFade);
window.addEventListener('load', checkFade);
