document.addEventListener('DOMContentLoaded', function () {
    // Get necessary elements
    const scrollArrow = document.getElementById('scrollArrow');
    const aboutSection = document.querySelector('.about-me-section');
    const contentSections = document.querySelectorAll('.about-me-content');
    const dropdowns = document.querySelectorAll('.dropdown');
    let isAnimating = false;

    // Dropdown handling
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        
        if (dropdownContent) {
            // Handle clicks for dropdown links on mobile
            link.addEventListener('click', function (e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();

                    // Close other dropdowns
                    dropdowns.forEach(d => {
                        if (d !== dropdown && d.classList.contains('active')) {
                            d.classList.remove('active');
                        }
                    });

                    dropdown.classList.toggle('active');
                }
            });

            // Close dropdown when clicking on links inside
            const links = dropdownContent.querySelectorAll('a');
            links.forEach(dropdownLink => {
                dropdownLink.addEventListener('click', function () {
                    dropdown.classList.remove('active');
                });
            });
        }
    });

    // Initialize content sections as hidden
    contentSections.forEach(section => {
        section.classList.remove('show');
    });

    // Show the first section after a delay
    setTimeout(() => {
        if (contentSections.length > 0) {
            contentSections[0].classList.add('show');
        }
    }, 500);

    function revealSection(index) {
        if (index < contentSections.length) {
            const section = contentSections[index];
            section.classList.add('show');
            
            // Smoothly scroll to the next section
            const targetY = section.getBoundingClientRect().top + window.pageYOffset - 100;
            window.scrollTo({
                top: targetY,
                behavior: 'smooth',
            });

            // Reveal the next section after a delay
            setTimeout(() => {
                if (isAnimating) {
                    revealSection(index + 1);
                }
            }, 1500); // Delay between revealing sections
        } else {
            isAnimating = false;

            // Scroll to the contact section at the end
            const contactSection = document.getElementById('get-in-touch');
            if (contactSection) {
                setTimeout(() => {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                }, 1000);
            }
        }
    }

    function startAnimation() {
        if (isAnimating) return; // Prevent multiple triggers

        isAnimating = true;

        // Reset all sections
        contentSections.forEach(section => {
            section.classList.remove('show');
        });

        // Scroll to the about section and start revealing sections
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

    // Attach event listener to the scroll arrow
    if (scrollArrow) {
        scrollArrow.addEventListener('click', function (e) {
            e.preventDefault();
            console.log('Scroll Arrow Clicked'); // Debugging log
            startAnimation();
        });

        // Stop the animation if the user interacts manually
        document.addEventListener('wheel', stopAnimation);
        document.addEventListener('touchstart', stopAnimation);
        document.addEventListener('keydown', stopAnimation);
    } else {
        console.error('Scroll arrow not found'); // Debugging log
    }

    // Close dropdowns when clicking outside
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });

    // ESC key to close dropdowns
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
            stopAnimation();
        }
    });

    // Handle window resize for dropdowns
    let resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            if (window.innerWidth > 768) {
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        }, 250);
    });

    // Contact form handling (if exists)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function () {
            const button = document.getElementById('submitButton');
            if (button) {
                button.classList.add('loading');
            }
        });
    }
});

