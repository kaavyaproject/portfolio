/* ============================================
   SAGE & IVORY ACADEMIC PORTFOLIO
   NAVIGATION AND INTERACTIVE FEATURES
   ============================================ */

document.addEventListener("DOMContentLoaded", function () {

    const menuBtn = document.getElementById("menu-btn");
    const navMenu = document.getElementById("nav-menu");
    const navbar = document.querySelector(".navbar");

    const navLinks = document.querySelectorAll(".nav-link");

    if (!navbar || !navLinks.length) {
        console.error("Navigation elements not found.");
        return;
    }

    /* ========================================
       MOBILE MENU
       ======================================== */

    function closeMenu() {
        if (!menuBtn || !navMenu) return;

        navMenu.classList.remove("active");
        menuBtn.classList.remove("active");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute(
            "aria-label",
            "Open navigation menu"
        );
    }

    if (menuBtn && navMenu) {

        menuBtn.addEventListener("click", function () {

            const isOpen =
                navMenu.classList.contains("active");

            if (isOpen) {
                closeMenu();
            } else {
                navMenu.classList.add("active");
                menuBtn.classList.add("active");
                menuBtn.setAttribute("aria-expanded", "true");
                menuBtn.setAttribute(
                    "aria-label",
                    "Close navigation menu"
                );
            }

        });

        navLinks.forEach(function (link) {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("click", function (event) {

            if (
                !navbar.contains(event.target) &&
                navMenu.classList.contains("active")
            ) {
                closeMenu();
            }

        });

        document.addEventListener("keydown", function (event) {

            if (event.key === "Escape") {
                closeMenu();
                menuBtn.focus();
            }

        });

        window.addEventListener("resize", function () {

            if (window.innerWidth > 900) {
                closeMenu();
            }

        });
    }

    /* ========================================
       ACTIVE NAVIGATION TRACKING
       ======================================== */

    function updateActiveNavigation() {

        const activationPoint =
            navbar.getBoundingClientRect().bottom + 40;

        let currentSection = null;

        navLinks.forEach(function (link) {

            const targetId =
                link.getAttribute("href");

            if (!targetId || !targetId.startsWith("#")) {
                return;
            }

            const section =
                document.getElementById(
                    targetId.substring(1)
                );

            if (!section) return;

            const sectionTop =
                section.getBoundingClientRect().top;

            if (sectionTop <= activationPoint) {
                currentSection = section;
            }

        });

        // Highlight last section at page bottom
        if (
            window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 5
        ) {
            const lastLink = navLinks[navLinks.length - 1];

            const lastId =
                lastLink.getAttribute("href").substring(1);

            currentSection =
                document.getElementById(lastId);
        }

        if (!currentSection) return;

        navLinks.forEach(function (link) {

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

    /* ========================================
       EVENT LISTENERS
       ======================================== */

    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );

    window.addEventListener(
        "resize",
        updateActiveNavigation
    );

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            // Update selection after navigation starts
            requestAnimationFrame(updateActiveNavigation);

        });

    });

    // Initial state
    updateActiveNavigation();

});
