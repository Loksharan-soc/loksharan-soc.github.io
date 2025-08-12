// ====== MOBILE NAVIGATION TOGGLE ======

// Select the hamburger button element
const navToggle = document.querySelector('.nav-toggle');

// Select the navigation links container
const navLinks = document.querySelector('.nav-links');

// Add click event listener to hamburger button
navToggle.addEventListener('click', () => {
  // Toggle 'active' class on nav-links to show/hide menu on mobile
  navLinks.classList.toggle('active');
});


// ====== SMOOTH SCROLL FOR ANCHOR LINKS ======

// Select all anchor links that link to an id within the page (href starts with '#')
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault(); // Prevent default jump to anchor

    // Get the target element to scroll to using href attribute value
    const target = document.querySelector(this.getAttribute('href'));

    if (target) {
      // Smoothly scroll the target element into view, aligned at the top
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      // If mobile nav is open, close it after clicking a link
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
      }
    }
  });
});
