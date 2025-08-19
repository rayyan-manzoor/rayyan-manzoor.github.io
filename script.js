document.addEventListener('DOMContentLoaded', () => {
  const welcomeText = document.getElementById('welcomeText');
  const subtitle = document.getElementById('subtitle');

  // Main header text
  const mainHeader = "Welcome to Rayyan's Portfolio!";
  welcomeText.innerHTML = mainHeader.split(" ").map(word => `<span>${word}</span>`).join(" ");
  const wordSpans = welcomeText.querySelectorAll("span");

  // Animate header words
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        wordSpans.forEach((span,i)=>{
          setTimeout(()=>{span.classList.add('visible');}, i*400);
        });
        setTimeout(()=>{animateSubtitle();}, wordSpans.length*400 + 200);
        observer.disconnect();
      }
    });
  }, { threshold: 0.1 });
  observer.observe(welcomeText);

  // Subtitle typing effect
  function typeText(el, text, speed=50, callback){
    let i=0; el.textContent='';
    function typing(){ if(i<text.length){ el.textContent+=text.charAt(i); i++; setTimeout(typing,speed); } 
      else if(callback) callback(); }
    typing();
  }
  function deleteText(el, speed=50, callback){
    let text = el.textContent, i=text.length;
    function deleting(){ if(i>0){ el.textContent=text.substring(0,i-1); i--; setTimeout(deleting,speed); } 
      else if(callback) callback(); }
    deleting();
  }
  function animateSubtitle(){
    subtitle.classList.remove('blink');
    typeText(subtitle,"Medical Professional & Tech Enthusiast",50,()=>{
      setTimeout(()=>{
        deleteText(subtitle,30,()=>{
          typeText(subtitle,"Please scroll!",50,()=>{
            setTimeout(()=>{ subtitle.classList.add('blink'); }, 500);
          });
        });
      },1000);
    });
  }
});
