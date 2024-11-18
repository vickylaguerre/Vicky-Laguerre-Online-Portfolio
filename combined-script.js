document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Setup
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

    // Mobile Menu Toggle
    mobileMenuButton.addEventListener('click', function(e) {
        e.stopPropagation();
        nav.classList.toggle('mobile-menu-active');
        mobileMenuButton.classList.toggle('active');
        mobileMenuButton.setAttribute('aria-expanded', nav.classList.contains('mobile-menu-active'));
    });

    // Dropdown Management
    const dropdowns = document.querySelectorAll('.dropdown');
    let currentlyOpenDropdown = null;

    dropdowns.forEach(dropdown => {
        const mainLink = dropdown.querySelector('a');
        
        mainLink.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                
                if (currentlyOpenDropdown && currentlyOpenDropdown !== dropdown) {
                    currentlyOpenDropdown.classList.remove('active');
                }
                
                dropdown.classList.toggle('active');
                currentlyOpenDropdown = dropdown.classList.contains('active') ? dropdown : null;
            }
        });

        // Handle dropdown content links
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        if (dropdownContent) {
            const links = dropdownContent.querySelectorAll('a');
            links.forEach(link => {
                link.addEventListener('click', function() {
                    dropdown.classList.remove('active');
                    currentlyOpenDropdown = null;
                    nav.classList.remove('mobile-menu-active');
                    mobileMenuButton.classList.remove('active');
                });
            });
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !mobileMenuButton.contains(e.target)) {
            nav.classList.remove('mobile-menu-active');
            mobileMenuButton.classList.remove('active');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
            
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
            currentlyOpenDropdown = null;
        }
    });

    // Scroll Animation Setup
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
        isAnimating = false;
        contentSections.forEach(section => {
            section.classList.add('show');
        });
    }

    // Scroll Arrow Event Listeners
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
    }

    // ESC key handler
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            nav.classList.remove('mobile-menu-active');
            mobileMenuButton.classList.remove('active');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
            
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
            currentlyOpenDropdown = null;
        }
    });

    // Show first section by default
    setTimeout(() => {
        const firstSection = contentSections[0];
        if (firstSection) {
            firstSection.classList.add('show');
        }
    }, 500);
});
