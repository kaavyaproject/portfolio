// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeNavigationTracking();
  initializeHamburgerMenu();
  initializeProjectCards();
  initializeContactForm();
  initializeScrollAnimations();
});

// Toggle hamburger menu
function initializeHamburgerMenu() {
  const hamburger = document.querySelector('.hamburger');
  const sidebar = document.querySelector('.sidebar');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!hamburger) return;

  hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    sidebar.classList.toggle('mobile-menu-open');
    hamburger.setAttribute('aria-expanded', hamburger.classList.contains('active'));
  });

  // Close menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      hamburger.classList.remove('active');
      sidebar.classList.remove('mobile-menu-open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    const isClickInsideSidebar = sidebar.contains(e.target);
    const isClickOnHamburger = hamburger.contains(e.target);
    
    if (!isClickInsideSidebar && !isClickOnHamburger && sidebar.classList.contains('mobile-menu-open')) {
      hamburger.classList.remove('active');
      sidebar.classList.remove('mobile-menu-open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
}

// Track active navigation link based on scroll position
function initializeNavigationTracking() {
  const sections = document.querySelectorAll('section, header');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    threshold: 0.3,
    rootMargin: '-50px 0px -50%'
  };

  const observer = new IntersectionObserver(function(entries) {
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

// Initialize project card expand/collapse
function initializeProjectCards() {
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    card.addEventListener('click', function() {
      toggleProjectCard(this);
    });
  });
}

// Toggle project card expanded state
function toggleProjectCard(card) {
  card.classList.toggle('expanded');
}

// Initialize contact form validation
function initializeContactForm() {
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      // Email validation regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
      }

      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
      }

      alert('Thank you for your message! I will get back to you soon.');
      contactForm.reset();
    });
  }
}

// Initialize scroll animations for fade-in effect
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease-in-out, transform 0.6s ease-in-out';
    observer.observe(section);
  });
}
