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
  // ===== ABOUT SECTION SCRAMBLE EFFECT LOGIC (NEW) =====
  // =========================================================

  const aboutParagraph = document.querySelector('.about-description');
  // Store the final text for the animation, then clear the element immediately.
  const finalAboutText = aboutParagraph ? aboutParagraph.textContent : '';

  // Array of random characters for the scramble effect
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;':\",./<>?~";
  
  function scrambleText(element, finalText, duration = 1800) {
    if (element.dataset.animated) return; // Prevent re-triggering
    element.dataset.animated = 'true';
    
    let startTime;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsedTime = timestamp - startTime;
      // Progress from 0 to 1
      const progress = Math.min(elapsedTime / duration, 1);

      let newText = '';
      for (let i = 0; i < finalText.length; i++) {
        // Calculate the relative time when this specific character should finish scrambling
        const revealTime = i / finalText.length;
        
        if (progress >= revealTime) {
          // If the reveal time is passed, show the final correct character
          newText += finalText[i];
        } else {
          // Otherwise, show a random scramble character
          const scrambleCharacter = characters[Math.floor(Math.random() * characters.length)];
          newText += scrambleCharacter;
        }
      }

      element.textContent = newText;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    // Start the animation loop
    requestAnimationFrame(animate);
  }

  // ===== Scroll Trigger for Scramble Effect (Intersection Observer) =====
  if (aboutParagraph) {
    // Clear the text content so the user sees a blank space before the animation starts
    aboutParagraph.textContent = ''; 

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // When the paragraph scrolls into view, start the scramble
          scrambleText(aboutParagraph, finalAboutText, 1800);
          
          // Stop observing once the animation is triggered
          observer.unobserve(aboutParagraph);
        }
      });
    }, {
      root: null, // Viewport is the root
      threshold: 0.1, // Trigger when 10% of the element is visible
    });

    // Tell the observer to watch the paragraph
    observer.observe(aboutParagraph);
  }
  
  // =========================================================
  // ===== PROJECT DETAIL NAVIGATION LOGIC (Strip Swapping) =====
  // =========================================================

  const projectDetailSections = document.querySelectorAll('.project-detail-section');
  const backLinks = document.querySelectorAll('.back-link');
  // Select all sections that form the "Main Strip"
  const mainSections = document.querySelectorAll('#welcome, #about, #portfolio, #contact');


  // Function to show a specific detail section (and hide the entire Main Strip)
  function showSection(targetId) {
    // 1. HIDE the entire Main Strip
    mainSections.forEach(section => {
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
    
    // Scroll smoothly to the top of the browser window
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
    document.getElementById('welcome').style.display = 'flex';
    document.getElementById('about').style.display = 'block';
    document.getElementById('portfolio').style.display = 'flex';
    document.getElementById('contact').style.display = 'flex';
    
    // Scroll smoothly back to the Portfolio section
    document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' });
  }
  
  // 4. Attach click listeners to all project links (e.g., View Project Details)
  document.querySelectorAll('.project-link').forEach(link => {
    link
