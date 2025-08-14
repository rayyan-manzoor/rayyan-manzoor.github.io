// ===== Theme Toggle =====
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Retrieve saved theme from localStorage, default to 'dark' if not found
const savedTheme = localStorage.getItem('theme') || 'dark';
body.classList.add(savedTheme + '-mode'); // Apply the saved theme class

// Set the checkbox state based on the saved theme
themeToggle.checked = (savedTheme === 'light');

// Add event listener for theme toggle changes
themeToggle.addEventListener('change', () => {
    body.classList.toggle('light-mode'); // Toggle light mode class
    body.classList.toggle('dark-mode');  // Toggle dark mode class
    // Save the current theme preference to localStorage
    localStorage.setItem('theme', body.classList.contains('light-mode') ? 'light' : 'dark');
});

// ===== Typing Effect =====
const welcomeText = document.getElementById('welcomeText');
const mainHeader = "Welcome to Rayyan's Portfolio!";
const subtitle = document.querySelector('.subtitle');

/**
 * Types text into an HTML element with a given speed.
 * @param {HTMLElement} element - The HTML element to type into.
 * @param {string} text - The text to be typed.
 * @param {number} speed - Typing speed in milliseconds per character.
 * @param {function} [callback] - Optional callback function to execute after typing completes.
 */
function typeText(element, text, speed = 50, callback) {
    let i = 0;
    element.textContent = ""; // Clear existing text

    function typing() {
        if (i < text.length) {
            element.textContent += text.charAt(i); // Add one character
            i++;
            setTimeout(typing, speed); // Continue typing
        } else if (callback) {
            callback(); // Execute callback if provided
        }
    }
    typing(); // Start typing
}

/**
 * Deletes text from an HTML element with a given speed.
 * @param {HTMLElement} element - The HTML element to delete text from.
 * @param {number} speed - Deleting speed in milliseconds per character.
 * @param {function} [callback] - Optional callback function to execute after deleting completes.
 */
function deleteText(element, speed = 50, callback) {
    let text = element.textContent;
    let i = text.length; // Start from the end of the text

    function deleting() {
        if (i > 0) {
            element.textContent = text.substring(0, i - 1); // Remove one character
            i--;
            setTimeout(deleting, speed); // Continue deleting
        } else if (callback) {
            callback(); // Execute callback if provided
        }
    }
    deleting(); // Start deleting
}

// ===== Animate Subtitle Sequence =====
function animateSubtitle() {
    typeText(subtitle, "Medical Professional & Tech Enthusiast", 50, () => {
        // After typing, wait a bit, then delete
        setTimeout(() => {
            deleteText(subtitle, 30, () => {
                // After deleting, clear and type "Please scroll!", then add blink effect
                subtitle.textContent = ""; // Ensure it's completely clear before next type
                typeText(subtitle, "Please scroll!", 50, () => {
                    subtitle.classList.add("blink"); // Add blinking class for cursor effect
                });
            });
        }, 1500); // Wait 1.5 seconds before starting to delete
    });
}

// Start the welcome text animation when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    typeText(welcomeText, mainHeader, 50, animateSubtitle);
});

// ===== Smooth Glass Blur on Scroll =====
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    // Get the glass overlay elements
    const topGlass = document.querySelector('.top-glass');
    const bottomGlass = document.querySelector('.bottom-glass');

    if (topGlass && bottomGlass) {
        // Adjust the blur level based on scroll position
        // The blur increases as you scroll down
        const blurValue = 8 + scrollY * 0.015;
        topGlass.style.backdropFilter = `blur(${blurValue}px)`;
        topGlass.style.webkitBackdropFilter = `blur(${blurValue}px)`; // For Safari support

        bottomGlass.style.backdropFilter = `blur(${blurValue}px)`;
        bottomGlass.style.webkitBackdropFilter = `blur(${blurValue}px)`; // For Safari support
    }
});
