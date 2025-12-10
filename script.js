document.addEventListener('DOMContentLoaded', () => {

  // ===== Welcome Text Variables & Setup =====
  const welcomeText = document.getElementById('welcomeText');
  const subtitle = document.getElementById('subtitle');
  const mainHeader = "Welcome to Rayyan's Portfolio!";

  // Split text into spans for gradient animation
  welcomeText.innerHTML = mainHeader
    .split(" ")
    .map(word => `<span>${word}</span>`)
    .join(" ");

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


  // =========================================================
  // ===== PROJECT DETAIL NAVIGATION LOGIC (Strip Swapping) =====
  // =========================================================

  // New variables to target ALL main sections for hiding/showing
  const projectDetailSections = document.querySelectorAll('.project-detail-section');
  const backLinks = document.querySelectorAll('.back-link');
  // Select all sections that form the "Main Strip"
  const mainSections = document.querySelectorAll('#welcome, #about, #portfolio, #contact');


  // Function to show a specific detail section (and hide the entire Main Strip)
  function showSection(targetId) {
    // 1. HIDE the entire Main Strip
    mainSections.forEach(section => {
      // Use 'none' to completely remove the main content from view/flow
      section.style.display = 'none'; 
    });

    // 2. Hide all detail sections just in case
    projectDetailSections.forEach(section => {
      section.classList.remove('active');
      section.style.display = 'none';
    });

    // 3. Show the target detail section
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.classList.add('active');
      targetSection.style.display = 'block';
    }
    
    // Scroll smoothly to the top of the browser window (where the new page appears)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Function to return to the main portfolio view (showing the entire Main Strip)
  function showPortfolio() {
    // 1. Hide all detail sections
    projectDetailSections.forEach(section => {
      section.classList.remove('active');
      section.style.display = 'none';
    });

    // 2. SHOW the entire Main Strip (using the correct display types)
    // We must show them one by one using the display style defined in CSS:
    document.getElementById('welcome').style.display = 'flex';   // #welcome uses flex
    document.getElementById('about').style.display = 'block';    // #about uses block
    document.getElementById('portfolio').style.display = 'flex'; // #portfolio uses flex
    document.getElementById('contact').style.display = 'flex';   // #contact uses flex
    
    // Scroll smoothly back to the Portfolio section
    document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' });
  }
  
  // 4. Attach click listeners to all project links (e.g., View Project Details)
  document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault(); // Prevents the default hash jump
      const targetId = this.getAttribute('href').substring(1); // Gets 'project-jana' from '#project-jana'
      showSection(targetId);
    });
  });

  // 5. Attach click listeners to all 'Back to Projects' links
  backLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      showPortfolio();
    });
  });

  // =========================================================
  // ===== END PROJECT DETAIL NAVIGATION LOGIC =============
  // =========================================================


  // ===== Show Header Immediately (Animation Kickoff) =====
  wordSpans.forEach((span, index) => {
    setTimeout(() => {
      span.classList.add("visible"); // removes blur & sets opacity
      if (index === wordSpans.length - 1) {
        setTimeout(animateSubtitle, 500);
      }
    }, index * 400);
  });

}); // <-- End of DOMContentLoaded listener


// Scroll to the welcome section on page load
window.addEventListener('load', () => {
  const welcomeSection = document.getElementById('welcome');
  if (welcomeSection) {
    welcomeSection.scrollIntoView({ behavior: 'auto' });
  }
});
