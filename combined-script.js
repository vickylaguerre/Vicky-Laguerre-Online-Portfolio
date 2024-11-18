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

    mobileMenuButton.addEventListener('click', function(e) {
        e.stopPropagation();
        nav.classList.toggle('mobile-menu-active');
        mobileMenuButton.classList.toggle('active');
        mobileMenuButton.setAttribute('aria-expanded', nav.classList.contains('mobile-menu-active'));
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (nav.classList.contains('mobile-menu-active') && 
            !nav.contains(e.target) && 
            !mobileMenuButton.contains(e.target)) {
            nav.classList.remove('mobile-menu-active');
            mobileMenuButton.classList.remove('active');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
        }
    });

    // Scroll Animation Functionality
    const scrollArrow = document.getElementById('scrollArrow');
    const aboutSection = document.querySelector('.about-me-section');
    const contentSections = document.querySelectorAll('.about-me-content');
    let isAnimating = false;

    // Initially hide all sections
    contentSections.forEach(section => {
        section.classList.remove('show');
    });

    function revealSection(index) {
        if (index < contentSections.length) {
            const section = contentSections[index];
            section.classList.add('show');
            
            const targetY = section.getBoundingClientRect().top + window.pageYOffset - 100;
            window.scrollTo({
                top: targetY,
                behavior: 'smooth'
            });

            setTimeout(() => {
                if (isAnimating) {
                    revealSection(index + 1);
                }
            }, 1500); // Delay between sections
        } else {
            isAnimating = false;
            // Scroll to contact section at the end
            const contactSection = document.getElementById('get-in-touch');
            if (contactSection) {
                setTimeout(() => {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                }, 1000);
            }
        }
    }

    function startAnimation() {
        if (isAnimating) return;
        
        isAnimating = true;
        
        // Hide all sections first
        contentSections.forEach(section => {
            section.classList.remove('show');
        });

        // Scroll to about section
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
            
            // Start revealing sections after initial scroll
            setTimeout(() => {
                revealSection(0);
            }, 500);
        }
    }

    function stopAnimation() {
        isAnimating = false;
        // Show all sections immediately
        contentSections.forEach(section => {
            section.classList.add('show');
        });
    }

    // Event Listeners
    if (scrollArrow && aboutSection) {
        scrollArrow.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            startAnimation();
        });

        // Stop animation on user interaction
        document.addEventListener('wheel', stopAnimation);
        document.addEventListener('touchstart', stopAnimation);
        document.addEventListener('keydown', stopAnimation);
        document.addEventListener('click', function(e) {
            if (!scrollArrow.contains(e.target)) {
                stopAnimation();
            }
        });
    }

    // Contact Form Functionality
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const button = document.getElementById('submitButton');
            if (button) {
                button.classList.add('loading');
            }
        });
    }

    // Show first section by default after a short delay
    setTimeout(() => {
        const firstSection = contentSections[0];
        if (firstSection) {
            firstSection.classList.add('show');
        }
    }, 500);
});
