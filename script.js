// Dynamic Glass Effect
function updateGlassEffects() {
  const scrollY = window.scrollY;
  const docHeight = document.body.scrollHeight;
  const windowHeight = window.innerHeight;
  const scrollRatio = scrollY / (docHeight - windowHeight);

  // Top glass
  const topGlass = document.querySelector('.top-glass');
  topGlass.classList.toggle('active', scrollY > 10);
  
  // Bottom glass
  const bottomGlass = document.querySelector('.bottom-glass');
  bottomGlass.classList.toggle('active', scrollRatio < 0.98);
  
  // Dynamic blur intensity (optional)
  const dynamicBlur = 5 + (scrollY * 0.03); // 5px to 8px range
  document.documentElement.style.setProperty('--blur-amount', `${Math.min(8, dynamicBlur)}px`);
}

// Initialize and run on scroll
window.addEventListener('scroll', updateGlassEffects);
updateGlassEffects(); // Initial check

// Add this to your CSS for dynamic blur:
:root {
  --blur-amount: 5px;
}
.glass-overlay {
  backdrop-filter: blur(var(--blur-amount));
  -webkit-backdrop-filter: blur(var(--blur-amount));
}
