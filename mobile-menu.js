document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const mainLink = dropdown.querySelector('a');

        mainLink.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation();

                // Check if this dropdown is already active
                const isActive = dropdown.classList.contains('active');

                // First close all dropdowns
                dropdowns.forEach(other => {
                    other.classList.remove('active');
                });

                // If this dropdown wasn't active, open it
                if (!isActive) {
                    dropdown.classList.add('active');
                }
                // If it was active, it stays closed because we already removed the active class
            }
        });

        // Handle clicks on dropdown content links
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        if (dropdownContent) {
            const links = dropdownContent.querySelectorAll('a');
            links.forEach(link => {
                link.addEventListener('click', function(e) {
                    dropdown.classList.remove('active');
                });
            });
        }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });

    // Close dropdowns on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });

    // Handle scroll arrow
    const scrollArrow = document.querySelector('.scroll-arrow');
    if (scrollArrow) {
        scrollArrow.addEventListener('click', function() {
            const footer = document.querySelector('footer');
            if (footer) {
                footer.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
});
