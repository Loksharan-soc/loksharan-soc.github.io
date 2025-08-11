// ====== MOBILE NAVIGATION TOGGLE ======
// Select hamburger button and navigation links container
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

// Toggle the 'active' class on nav-links to show/hide menu on mobile
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// ====== SMOOTH SCROLL FOR ANCHOR LINKS ======
// Select all anchor links starting with '#'
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault(); // prevent default jump

    // Get the target element to scroll to
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      // Smoothly scroll to the target element at the top of viewport
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      // If nav is open (mobile), close it after clicking a link
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
      }
    }
  });
});

// ====== THEME TOGGLE LOGIC ======

// Select the checkbox input for theme toggle
const themeToggleCheckbox = document.getElementById('theme-toggle');
// Reference to body to set data-theme attribute
const body = document.body;
// Optional: Element to show theme icon (sun/moon)
const themeIcon = document.getElementById('theme-icon');

// Function to apply theme and save preference
function applyTheme(theme) {
  if (theme === 'light') {
    body.setAttribute('data-theme', 'light'); // add light theme attribute
    if (themeIcon) themeIcon.textContent = '🌞'; // sun icon
    themeToggleCheckbox.checked = true; // check toggle
  } else {
    body.setAttribute('data-theme', 'dark'); // add dark theme attribute
    if (themeIcon) themeIcon.textContent = '🌙'; // moon icon
    themeToggleCheckbox.checked = false; // uncheck toggle
  }
  // Save user preference to localStorage
  localStorage.setItem('theme', theme);
}

// Load saved theme or default to dark if none saved
const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

// Listen for changes on the toggle checkbox
themeToggleCheckbox.addEventListener('change', () => {
  if (themeToggleCheckbox.checked) {
    applyTheme('light');
  } else {
    applyTheme('dark');
  }
});
