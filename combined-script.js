document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu
    const mobileMenuBtn = document.querySelector('.mobile-menu-button');
    const nav = document.querySelector('nav');
    const dropdowns = document.querySelectorAll('.dropdown');

    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            nav.classList.toggle('mobile-menu-active');
            this.classList.toggle('active');
        });
    }

    // Dropdown handling for mobile
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation();
                
                // Close other dropdowns
                dropdowns.forEach(d => {
                    if (d !== dropdown) {
                        d.classList.remove('active');
                    }
                });
                
                dropdown.classList.toggle('active');
            }
        });
    });

    // Close mobile menu and dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            nav.classList.remove('mobile-menu-active');
            if (mobileMenuBtn) {
                mobileMenuBtn.classList.remove('active');
            }
            dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
        }
    });

    // Scroll Animation
    const scrollArrow = document.getElementById('scrollArrow');
    const aboutSection = document.querySelector('.about-me-section');
    const contentSections = document.querySelectorAll('.about-me-content');
    let isAnimating = false;

    // Initially hide all sections except first
    contentSections.forEach((section, index) => {
        if (index !== 0) {
            section.classList.remove('show');
        }
    });

    // Show first section by default
    setTimeout(() => {
        if (contentSections.length > 0) {
            contentSections[0].classList.add('show');
        }
    }, 500);

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
            }, 1500);
        } else {
            isAnimating = false;
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
        
        // Reset sections
        contentSections.forEach(section => {
            section.classList.remove('show');
        });

        // Start animation sequence
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
                revealSection(0);
            }, 500);
        }
    }

    function stopAnimation() {
        if (isAnimating) {
            isAnimating = false;
            contentSections.forEach(section => {
                section.classList.add('show');
            });
        }
    }

    // Scroll Arrow Event Listeners
    if (scrollArrow) {
        scrollArrow.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            startAnimation();
        });

        // Stop animation on user interaction
        document.addEventListener('wheel', stopAnimation);
        document.addEventListener('touchstart', stopAnimation);
        document.addEventListener('keydown', stopAnimation);
    }

    // ESC key handling
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            nav.classList.remove('mobile-menu-active');
            if (mobileMenuBtn) {
                mobileMenuBtn.classList.remove('active');
            }
            dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
            stopAnimation();
        }
    });
});
