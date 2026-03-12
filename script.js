/* =========================================
   1. SPLASH SCREEN & WELCOME ANIMATION 
   ========================================= */
const splash = document.querySelector('#entry-splash');
const welcomeText = document.getElementById('welcomeText');
const subtitle = document.getElementById('subtitle');
const mainHeader = "Welcome to Rayyan's Portfolio!";

// Prepare the spans for the animation immediately
if (welcomeText) {
    welcomeText.innerHTML = mainHeader
      .split(" ")
      .map(word => `<span>${word}</span>`)
      .join(" ");
}

const wordSpans = document.querySelectorAll("#welcomeText span");

// The "Enter" Logic: Handles the fade and starts the welcome text
if (splash) {
  splash.addEventListener('click', function() {
    // Start the fade out
    this.style.opacity = '0';
    
    // After the transition ends (800ms), remove it and unlock scroll
    setTimeout(() => {
      this.style.display = 'none';
      document.body.classList.remove('no-scroll');
      
      // KICKOFF THE WELCOME ANIMATION ONLY AFTER ENTRY
      startWelcomeAnimation(); 
    }, 800);
  });
}

function startWelcomeAnimation() {
  wordSpans.forEach((span, index) => {
    setTimeout(() => {
      span.classList.add("visible"); 
      if (index === wordSpans.length - 1) {
        setTimeout(animateSubtitle, 500);
      }
    }, index * 400);
  });
}

/* =========================================
   2. TYPING EFFECT FUNCTIONS
   ========================================= */
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
  if (!subtitle) return;
  subtitle.classList.remove('blink');
  typeText(subtitle, "Medical & Tech Enthusiast.", 50, () => {
    setTimeout(() => {
      deleteText(subtitle, 30, () => {
        typeText(subtitle, "Please scroll!", 50, () => {
          setTimeout(() => subtitle.classList.add('blink'), 500);
        });
      });
    }, 1000);
  });
} 

/* =========================================
   3. NAVIGATION & PROJECT LOGIC
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
  const projectDetailSections = document.querySelectorAll('.project-detail-section');
  const backLinks = document.querySelectorAll('.back-link');
  const mainSections = document.querySelectorAll('#welcome, #about, #portfolio, #contact');

  function showSection(targetId) {
    // Hide main strip
    mainSections.forEach(section => section.style.display = 'none');

    // Hide all details
    projectDetailSections.forEach(section => {
      section.classList.remove('active');
      section.style.display = 'none';
    });

    // Show target
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.classList.add('active');
      targetSection.style.display = 'block';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function showPortfolio() {
    projectDetailSections.forEach(section => {
      section.classList.remove('active');
      section.style.display = 'none';
    });

    document.getElementById('welcome').style.display = 'flex';
    document.getElementById('about').style.display = 'block';
    document.getElementById('portfolio').style.display = 'flex';
    document.getElementById('contact').style.display = 'flex';
    
    document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' });
  }

  // Attach click listeners to project links
  document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      // Only run swap logic if it points to a project section
      if (href && href.startsWith('#project-')) {
        e.preventDefault();
        showSection(href.substring(1));
      }
    });
  });

  // Attach click listeners to back links
  backLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      showPortfolio();
    });
  });
}); 

/* =========================================
   4. SCROLL HANDLING
   ========================================= */
window.addEventListener('load', () => {
  const welcomeSection = document.getElementById('welcome');
  if (welcomeSection) {
    window.scrollTo(0, 0); 
    welcomeSection.scrollIntoView({ behavior: 'auto' });
  }
});
