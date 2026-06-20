// ─────────────────────────────────────────────
// Typing animation — hero subtitle
// To change phrases, edit the array below.
// ─────────────────────────────────────────────
const phrases = [
  'Biomedical Sciences @ UTD.',
  'Founder of Jana Ventures LLC.',
  'Drone cinematographer.',
  'Building across disciplines.',
];

let phraseIndex = 0;
let charIndex   = 0;
let isDeleting  = false;

const subtitleEl = document.getElementById('subtitle');

function type() {
  if (!subtitleEl) return;

  const current = phrases[phraseIndex];

  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  subtitleEl.textContent = current.slice(0, charIndex);

  let delay = isDeleting ? 38 : 62;

  if (!isDeleting && charIndex === current.length) {
    delay = 2400;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting  = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay       = 420;
  }

  setTimeout(type, delay);
}

// ─────────────────────────────────────────────
// Scroll fade-in
// Adds .fade-in to key sections; IntersectionObserver
// adds .visible when they enter the viewport.
// ─────────────────────────────────────────────
function initFadeIn() {
  const targets = document.querySelectorAll(
    '#about, #projects, #certifications, .project-detail, #contact, .project-card, .cert-card, .about-grid'
  );

  targets.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );

  targets.forEach(el => observer.observe(el));
}

// ─────────────────────────────────────────────
// Nav active-link highlight on scroll
// ─────────────────────────────────────────────
function initNavHighlight() {
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.toggle(
              'active',
              link.getAttribute('href') === `#${entry.target.id}`
            );
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(s => observer.observe(s));
}

// ─────────────────────────────────────────────
// Init
// ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(type, 700);
  initFadeIn();
  initNavHighlight();
});
