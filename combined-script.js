document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Functionality
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.className = 'mobile-menu-button';
    mobileMenuButton.setAttribute('aria-label', 'Toggle mobile menu');
    mobileMenuButton.innerHTML = `
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
    `;

    const nav = document.querySelector('nav');
    nav.parentNode.insertBefore(mobileMenuButton, nav);

    mobileMenuButton.addEventListener('click', function() {
        nav.classList.toggle('mobile-menu-active');
        mobileMenuButton.classList.toggle('active');
        
        // Toggle aria-expanded
        const isExpanded = nav.classList.contains('mobile-menu-active');
        mobileMenuButton.setAttribute('aria-expanded', isExpanded);
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!nav.contains(event.target) && !mobileMenuButton.contains(event.target)) {
            nav.classList.remove('mobile-menu-active');
            mobileMenuButton.classList.remove('active');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
        }
    });

    // Scroll Animation Functionality
    const scrollArrow = document.getElementById('scrollArrow');
    const textElements = document.querySelectorAll('.about-me-content .about-me-text p');
    const contentSections = document.querySelectorAll('.about-me-content');
    let currentIndex = 0;
    let autoScrollActive = false;
    let autoScrollTimeout;

    function scrollToNextParagraph() {
        if (currentIndex < textElements.length && autoScrollActive) {
            const targetContent = textElements[currentIndex].closest('.about-me-content');
            
            const offset = targetContent.getBoundingClientRect().top + window.scrollY - 
                          (window.innerHeight / 2) + (targetContent.offsetHeight / 2) - 50;

            window.scrollTo({ top: offset, behavior: 'smooth' });
            targetContent.classList.add('show');
            currentIndex++;

            const isLastText = textElements[currentIndex - 1].textContent.includes("I can't wait to design for you");

            if (isLastText) {
                autoScrollTimeout = setTimeout(() => {
                    if (autoScrollActive) {
                        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                    }
                }, 4000);
            } else {
                autoScrollTimeout = setTimeout(scrollToNextParagraph, 4000);
            }
        }
    }

    function stopAutoScroll() {
        if (autoScrollActive) {
            autoScrollActive = false;
            clearTimeout(autoScrollTimeout);
            currentIndex = 0;
            contentSections.forEach(section => section.classList.add('show'));
        }
    }

    function startAutoScroll() {
        stopAutoScroll();
        autoScrollActive = true;
        currentIndex = 0;

        contentSections.forEach((section, index) => {
            section.classList.toggle('show', index === 0);
        });

        scrollToNextParagraph();
    }

    if (scrollArrow) {
        scrollArrow.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            startAutoScroll();
        });
    }

    document.addEventListener('click', function(event) {
        if (autoScrollActive && (!scrollArrow || !event.composedPath().includes(scrollArrow))) {
            stopAutoScroll();
        }
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const button = document.getElementById('submitButton');
            if (button) {
                button.classList.add('loading');
                button.textContent = 'Sending...';
            }
        });
    }
});
