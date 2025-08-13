// Add this at the top of script.js
console.log("Script loaded!"); 
// Theme Toggle Functionality
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// Check for saved preference or use dark mode
const savedTheme = localStorage.getItem("theme") || "dark";
body.classList.add(savedTheme + "-mode");
updateToggleIcon(savedTheme);

themeToggle.addEventListener("click", () => {
  if (body.classList.contains("dark-mode")) {
    body.classList.replace("dark-mode", "light-mode");
    localStorage.setItem("theme", "light");
    updateToggleIcon("light");
  } else {
    body.classList.replace("light-mode", "dark-mode");
    localStorage.setItem("theme", "dark");
    updateToggleIcon("dark");
  }
});

function updateToggleIcon(theme) {
  themeToggle.textContent = theme === "dark" ? "🌙" : "☀️";
}

// Your existing typing animation and scroll effects remain below
// ...
