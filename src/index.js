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

});