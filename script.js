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
//document.addEventListener('DOMContentLoaded', function () {
//  initializeNavigationTracking();
//  initializeHamburgerMenu();
//  console.log('🎨 Professional Portfolio Initialized!');
//});

// ============================================
// RESPONSIVE DROPDOWN NAVIGATION
// ============================================

document.addEventListener("DOMContentLoaded", function () {

    const menuBtn = document.getElementById("menu-btn");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    if (!menuBtn || !navMenu) {
        console.error("Navigation elements not found. Check your HTML IDs.");
        return;
    }

    // Open and close dropdown
    menuBtn.addEventListener("click", function () {

        const isOpen = navMenu.classList.toggle("active");

        menuBtn.classList.toggle("active", isOpen);

        menuBtn.setAttribute("aria-expanded", isOpen);

        menuBtn.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });

    // Close menu after clicking a navigation link
    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navMenu.classList.remove("active");
            menuBtn.classList.remove("active");

            menuBtn.setAttribute("aria-expanded", "false");
            menuBtn.setAttribute("aria-label", "Open navigation menu");

            // Update active navigation link
            navLinks.forEach(function (item) {
                item.classList.remove("active");
            });

            link.classList.add("active");
        });

    });

    // Close menu when clicking outside
    document.addEventListener("click", function (event) {

        if (
            !menuBtn.contains(event.target) &&
            !navMenu.contains(event.target)
        ) {
            navMenu.classList.remove("active");
            menuBtn.classList.remove("active");

            menuBtn.setAttribute("aria-expanded", "false");
            menuBtn.setAttribute("aria-label", "Open navigation menu");
        }

    });

    // Close menu using Escape key
    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            navMenu.classList.remove("active");
            menuBtn.classList.remove("active");

            menuBtn.setAttribute("aria-expanded", "false");
            menuBtn.setAttribute("aria-label", "Open navigation menu");

            menuBtn.focus();
        }

    });

});

/* =========================================
   ACTIVE NAVIGATION ON SCROLL
   ========================================= */
document.addEventListener("DOMContentLoaded", function () {

    const navLinks = document.querySelectorAll(".nav-link");

    const sections = Array.from(navLinks)
        .map(link => document.querySelector(link.getAttribute("href")))
        .filter(section => section !== null);

    function updateActiveLink() {

        const navbar = document.querySelector(".navbar");
        const navbarHeight = navbar ? navbar.offsetHeight : 0;

        const scrollPosition =
            window.scrollY + navbarHeight + 50;

        let currentSection = sections[0];

        sections.forEach(section => {
            if (section.offsetTop <= scrollPosition) {
                currentSection = section;
            }
        });

        // Highlight the last section at the bottom of the page
        if (
            window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 5
        ) {
            currentSection = sections[sections.length - 1];
        }

        navLinks.forEach(link => {
            const isActive =
                link.getAttribute("href") ===
                "#" + currentSection.id;

            link.classList.toggle("active", isActive);

            if (isActive) {
                link.setAttribute("aria-current", "location");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    }

    window.addEventListener("scroll", updateActiveLink, {
        passive: true
    });

    window.addEventListener("resize", updateActiveLink);

    // Set correct selection when page loads
    updateActiveLink();

});

