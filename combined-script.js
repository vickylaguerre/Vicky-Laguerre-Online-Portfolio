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

    // Fixed Scroll Animation Functionality
    const scrollArrow = document.getElementById('scrollArrow');
    const aboutMeSection = document.querySelector('.about-me-section');
    const contentSections = document.querySelectorAll('.about-me-content');
    let isAutoScrolling = false;
    let currentIndex = 0;
    let scrollTimeout;

    // Show first content section by default
    if (contentSections.length > 0) {
        contentSections[0].classList.add('show');
    }

    function showNextSection() {
        if (!isAutoScrolling || currentIndex >= contentSections.length) {
            return;
        }

        // Show current section
        if (contentSections[currentIndex]) {
            contentSections[currentIndex].classList.add('show');
            
            // Scroll to the current section
            const offset = contentSections[currentIndex].offsetTop - 100; // Adjust offset as needed
            window.scrollTo({
                top: offset,
                behavior: 'smooth'
            });

            currentIndex++;

            // Schedule next section
            if (currentIndex < contentSections.length) {
                scrollTimeout = setTimeout(showNextSection, 2000); // Adjust timing as needed
            } else {
                // At the end, scroll to contact section
                setTimeout(() => {
                    if (isAutoScrolling) {
                        const contactSection = document.getElementById('get-in-touch');
                        if (contactSection) {
                            contactSection.scrollIntoView({ behavior: 'smooth' });
                        }
                    }
                }, 2000);
            }
        }
    }

    function startAutoScroll() {
        if (!isAutoScrolling) {
            isAutoScrolling = true;
            currentIndex = 0;
            
            // Hide all sections initially
            contentSections.forEach(section => {
                section.classList.remove('show');
            });

            // Start the sequence
            if (aboutMeSection) {
                aboutMeSection.scrollIntoView({ behavior: 'smooth' });
                setTimeout(showNextSection, 1000);
            }
        }
    }

    function stopAutoScroll() {
        isAutoScrolling = false;
        clearTimeout(scrollTimeout);
        
        // Show all sections when stopping
        contentSections.forEach(section => {
            section.classList.add('show');
        });
    }

    // Event Listeners
    if (scrollArrow) {
        scrollArrow.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            startAutoScroll();
        });
    }

    // Stop auto-scroll when user interacts
    document.addEventListener('wheel', stopAutoScroll);
    document.addEventListener('touchstart', stopAutoScroll);
    document.addEventListener('keydown', stopAutoScroll);
    document.addEventListener('click', (e) => {
        if (!scrollArrow || !e.composedPath().includes(scrollArrow)) {
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
