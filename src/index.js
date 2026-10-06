// =====================================================
// PORTFOLIO JAVASCRIPT
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

    // =====================================================
    // MOBILE MENU
    // =====================================================

    const menuBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileLinks = document.querySelectorAll(".mobile-link");

    if (menuBtn && mobileMenu) {

        menuBtn.addEventListener("click", () => {

            mobileMenu.classList.toggle("hidden");

            const icon = menuBtn.querySelector("i");

            if (mobileMenu.classList.contains("hidden")) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

                menuBtn.setAttribute("aria-label", "Open menu");
            } else {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");

                menuBtn.setAttribute("aria-label", "Close menu");
            }
        });

        // Close menu when a link is clicked
        mobileLinks.forEach(link => {

            link.addEventListener("click", () => {

                mobileMenu.classList.add("hidden");

                const icon = menuBtn.querySelector("i");

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

                menuBtn.setAttribute("aria-label", "Open menu");
            });

        });
    }


    // =====================================================
    // SMOOTH SCROLLING
    // =====================================================

    const allLinks = document.querySelectorAll('a[href^="#"]');

    allLinks.forEach(link => {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const header = document.querySelector("header");

            const headerHeight = header
                ? header.offsetHeight
                : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    // =====================================================
    // ACTIVE NAVIGATION LINK
    // =====================================================

    const sections = document.querySelectorAll("main section[id]");
    const desktopLinks = document.querySelectorAll(
        'nav ul li a[href^="#"]'
    );

    function updateActiveLink() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 180;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }

        });

        desktopLinks.forEach(link => {

            link.classList.remove(
                "text-blue-600"
            );

            const linkTarget = link.getAttribute("href");

            if (linkTarget === `#${currentSection}`) {

                link.classList.add(
                    "text-blue-600"
                );
            }

        });
    }

    window.addEventListener(
        "scroll",
        updateActiveLink
    );

    updateActiveLink();

        // ===================================================== 
    // CONTACT FORM 
    // ===================================================== 
 
    const contactForm = 
        document.getElementById("contactForm"); 
 
    if (contactForm) { 
 
        contactForm.addEventListener( 
            "submit", 
            function (event) { 
 
                event.preventDefault(); 
 
                const name = 
                    document.getElementById("name").value.trim(); 
 
                const email = 
                    document.getElementById("email").value.trim(); 
 
                const subject = 
                    document.getElementById("subject").value.trim(); 
 
                const message = 
                    document.getElementById("message").value.trim(); 
 
                // ----------------------------------------- 
                // VALIDATION 
                // ----------------------------------------- 
 
                if (!name || !email || !subject || !message) { 
 
                    showMessage( 
                        "Please fill in all fields.", 
                        "error" 
                    ); 
 
                    return; 
                } 
 
                // Email validation 
                const emailPattern = 
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
 
                if (!emailPattern.test(email)) { 
 
                    showMessage( 
                        "Please enter a valid email address.", 
                        "error" 
                    ); 
 
                    return; 
                } 
 
 
                // ----------------------------------------- 
                // BUTTON 
                // ----------------------------------------- 
 
                const submitButton = 
                    contactForm.querySelector( 
                        'button[type="submit"]' 
                    ); 
 
                const originalButton = 
                    submitButton.innerHTML; 
 
                submitButton.disabled = true; 
 
                submitButton.innerHTML = ` 
                    <i class="fas fa-spinner fa-spin mr-2"></i> 
                    Preparing Message... 
                `; 
 
 
                // ----------------------------------------- 
                // CREATE EMAIL 
                // ----------------------------------------- 
 
                const recipient = 
                    "adeoyaoluwafemivictor@gmail.com"; 
 
                const emailSubject = 
                    encodeURIComponent( 
                        subject 
                    ); 
 
                const emailBody = 
                    encodeURIComponent( 
                        `Hello Oluwafemi, 
 
Name: ${name} 
Email: ${email} 
 
Message: 
${message}` 
                    ); 
 
 
                // ----------------------------------------- 
                // OPEN EMAIL CLIENT 
                // ----------------------------------------- 
 
                const mailtoLink = 
                    `mailto:${recipient}?subject=${emailSubject}&body=${emailBody}`; 
 
 
                setTimeout(() => { 
 
                    window.location.href = 
                        mailtoLink; 
 
                    submitButton.disabled = false; 
 
                    submitButton.innerHTML = 
                        originalButton; 
 
                }, 700); 
 
            } 
        ); 
 
    } 
 
 
    // ===================================================== 
    // FORM MESSAGE 
    // ===================================================== 
 
    function showMessage(message, type) { 
 
        // Remove existing message 
        const existingMessage = 
            document.getElementById( 
                "form-message" 
            ); 
 
        if (existingMessage) { 
            existingMessage.remove(); 
        } 
 
 
        const messageElement = 
            document.createElement("div"); 
 
        messageElement.id = 
            "form-message"; 
 
        messageElement.className = 
            type === "error" 
                ? "mb-5 rounded-lg bg-red-100 px-4 py-3 text-sm text-red-700" 
                : "mb-5 rounded-lg bg-green-100 px-4 py-3 text-sm text-green-700"; 
 
 
        messageElement.innerHTML = ` 
            <i class="fas ${ 
                type === "error" 
                    ? "fa-circle-exclamation" 
                    : "fa-circle-check" 
            } mr-2"></i> 
 
            ${message} 
        `; 
 
 
        contactForm.prepend( 
            messageElement 
        ); 
 
 
        // Remove message after 4 seconds 
        setTimeout(() => { 
 
            messageElement.remove(); 
 
        }, 4000); 
 
    } 
 
    // =====================================================
    // SCROLL REVEAL
    // =====================================================

    const revealElements =
        document.querySelectorAll(
            "section > div"
        );

    revealElements.forEach(element => {

        element.classList.add(
            "reveal-element"
        );

    });


    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "reveal-visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.1
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(
            element
        );

    });


    // =====================================================
    // DYNAMIC COPYRIGHT YEAR
    // =====================================================

    const copyright =
        document.querySelector(
            "footer p"
        );

    if (copyright) {

        const currentYear =
            new Date().getFullYear();

        copyright.innerHTML =
            `&copy; ${currentYear} Oluwafemi Adeoya. All rights reserved.`;

    }


    // =====================================================
    // ESC KEY CLOSES MOBILE MENU
    // =====================================================

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                mobileMenu &&
                !mobileMenu.classList.contains("hidden")
            ) {

                mobileMenu.classList.add(
                    "hidden"
                );

                const icon =
                    menuBtn.querySelector("i");

                icon.classList.remove(
                    "fa-xmark"
                );

                icon.classList.add(
                    "fa-bars"
                );

            }

        }
    );


    // =====================================================
    // PREVENT BROKEN EXTERNAL LINKS
    // =====================================================

    const externalLinks =
        document.querySelectorAll(
            'a[target="_blank"]'
        );

    externalLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                link.setAttribute(
                    "rel",
                    "noopener noreferrer"
                );

            }
        );

    });


    // =====================================================
    // PROJECTS: project.html is the single source of truth
    // Homepage always shows the latest 3 projects.
    // Add a new project at the TOP of project.html and it
    // will automatically become the newest homepage project.
    // =====================================================
    const homepageGrid = document.getElementById("homepage-project-grid");
    const projectPageGrid = document.getElementById("all-projects-grid");

    async function loadProjects() {
        let sourceCards = [];

        try {
            const response = await fetch("./project.html", { cache: "no-store" });
            if (!response.ok) throw new Error("Could not load project.html");

            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");

            sourceCards = [...doc.querySelectorAll("#all-projects-grid [data-project-status]")];
        } catch (error) {
            // Fallback: use any project cards already present on this page.
            sourceCards = [...document.querySelectorAll("[data-project-status]")];
        }

        const completedProjects = sourceCards.filter(
            card => card.dataset.projectStatus === "completed"
        ).length;

        const pendingProjects = sourceCards.filter(
            card => card.dataset.projectStatus === "pending"
        ).length;

        const totalProjects = sourceCards.length;

        function animateProjectCounter(element, target) {
            if (!element) return;

            const startTime = performance.now();
            const duration = 900;

            function tick(now) {
                const progress = Math.min((now - startTime) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);

                element.textContent = String(
                    Math.round(target * eased)
                ).padStart(2, "0");

                if (progress < 1) requestAnimationFrame(tick);
            }

            requestAnimationFrame(tick);
        }

        animateProjectCounter(
            document.getElementById("completed-count"),
            completedProjects
        );

        animateProjectCounter(
            document.getElementById("pending-count"),
            pendingProjects
        );

        animateProjectCounter(
            document.getElementById("total-count"),
            totalProjects
        );

        // On the homepage, only the first 3 projects from project.html are shown.
        if (homepageGrid) {
            homepageGrid.innerHTML = "";

            sourceCards.slice(0, 3).forEach(card => {
                const clonedCard = card.cloneNode(true);
                homepageGrid.appendChild(clonedCard);
            });
        }

        // On project.html, the cards already exist in the page.
        // This keeps the full archive visible.
        const visibleProjectCards = homepageGrid
            ? [...homepageGrid.querySelectorAll("[data-project-status]")]
            : [...document.querySelectorAll("#all-projects-grid [data-project-status]")];

        const projectFilters = document.querySelectorAll(".project-filter");

        projectFilters.forEach(filter => {
            filter.addEventListener("click", () => {
                const selected = filter.dataset.filter;

                projectFilters.forEach(button =>
                    button.classList.remove("active")
                );

                filter.classList.add("active");

                visibleProjectCards.forEach(card => {
                    const matches =
                        selected === "all" ||
                        card.dataset.projectStatus === selected;

                    card.style.display = matches ? "" : "none";
                });
            });
        });
    }

    loadProjects();

});