/* ============================================
   Navigation & Interactive Features
   Professional Portfolio Script
   ============================================ */

// Toggle hamburger menu
function initializeHamburgerMenu() {
  const hamburger = document.querySelector('.hamburger');
  const sidebar = document.querySelector('.sidebar');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!hamburger) return;

  // Toggle menu open/close on hamburger click
  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('active');
    sidebar.classList.toggle('mobile-menu-open');
    hamburger.setAttribute('aria-expanded', hamburger.classList.contains('active'));
  });

  // Close menu when a navigation link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      hamburger.classList.remove('active');
      sidebar.classList.remove('mobile-menu-open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu when clicking outside of sidebar
  document.addEventListener('click', function (e) {
    const isClickInsideSidebar = sidebar.contains(e.target);
    const isClickOnHamburger = hamburger.contains(e.target);

    if (!isClickInsideSidebar && !isClickOnHamburger && sidebar.classList.contains('mobile-menu-open')) {
      hamburger.classList.remove('active');
      sidebar.classList.remove('mobile-menu-open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
}

// Highlight active navigation link based on scroll position
function initializeNavigationTracking() {
  const sections = document.querySelectorAll('section, header');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    threshold: 0.3,
    rootMargin: '-50px 0px -50%'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-link[data-section="${entry.target.id}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

// Initialize portfolio functionality when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  initializeNavigationTracking();
  initializeHamburgerMenu();

  console.log('🎨 Professional Portfolio Initialized!');
});
