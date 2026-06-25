const heroPhrases = [
  'Biomedical Sciences @ UTD.',
  'Founder of Jana Ventures LLC.',
  'Drone cinematographer.',
  'Building across disciplines.'
];

const HOLD_MS = 3800;
const TRANSITION_MS = 550;

function startFadeAnimation() {
  const subtitle = document.getElementById('subtitle');
  if (!subtitle) return;

  subtitle.classList.add('subtitle-fade');
  let index = 0;

  function showPhrase() {
    subtitle.textContent = heroPhrases[index];
    requestAnimationFrame(() => {
      subtitle.classList.add('is-visible');
    });
  }

  function cycle() {
    subtitle.classList.remove('is-visible');
    setTimeout(() => {
      index = (index + 1) % heroPhrases.length;
      showPhrase();
      setTimeout(cycle, HOLD_MS + TRANSITION_MS);
    }, TRANSITION_MS);
  }

  showPhrase();
  setTimeout(cycle, HOLD_MS);
}

function initFadeIn() {
  const targets = document.querySelectorAll(
    '#about, #projects, #certifications, .project-detail, #contact, .project-card, .cert-card, .about-grid'
  );

  targets.forEach((el) => el.classList.add('fade-in'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );

  targets.forEach((el) => observer.observe(el));
}

function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
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

  sections.forEach((s) => observer.observe(s));
}

document.addEventListener('DOMContentLoaded', () => {
  startFadeAnimation();
  initFadeIn();
  initNavHighlight();
});
