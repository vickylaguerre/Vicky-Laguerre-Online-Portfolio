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
        mobileMenuButton.setAttribute('aria-expanded', nav.classList.contains('mobile-menu-active'));
    });

    // Scroll Arrow Functionality
    const scrollArrow = document.getElementById('scrollArrow');
    const contentSections = document.querySelectorAll('.about-me-content');
    let currentIndex = 0;
    let isScrolling = false;

    function showSection(index) {
        if (index >= 0 && index < contentSections.length) {
            contentSections[index].classList.add('show');
            contentSections[index].scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }
    }

    function startScrollSequence() {
        if (isScrolling) return;
        isScrolling = true;
        
        // Hide all sections initially
        contentSections.forEach(section => section.classList.remove('show'));
        currentIndex = 0;

        // Show sections one by one
        function showNext() {
            if (currentIndex < contentSections.length && isScrolling) {
                showSection(currentIndex);
                currentIndex++;
                setTimeout(showNext, 2000); // Adjust timing as needed
            } else {
                isScrolling = false;
            }
        }

        showNext();
    }

    // Stop scroll sequence if user interacts
    function stopScrollSequence() {
        isScrolling = false;
        contentSections.forEach(section => section.classList.add('show'));
    }

    // Event Listeners
    if (scrollArrow) {
        scrollArrow.addEventListener('click', function(e) {
            e.preventDefault();
            startScrollSequence();
        });
    }

    // Stop auto-scroll on user interaction
    document.addEventListener('wheel', stopScrollSequence);
    document.addEventListener('touchstart', stopScrollSequence);
    document.addEventListener('keydown', stopScrollSequence);
    document.addEventListener('click', function(e) {
        if (!scrollArrow.contains(e.target)) {
            stopScrollSequence();
        }
    });

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
});
