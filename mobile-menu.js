document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    // Handle dropdown clicks
    dropdowns.forEach(dropdown => {
        // Get both the main link and the dropdown content
        const mainLink = dropdown.querySelector('a');
        
        // Add click event to the main dropdown link
        mainLink.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) { // Only for mobile devices
                e.preventDefault(); // Prevent navigation
                
                // Toggle this dropdown
                dropdown.classList.toggle('active');
                
                // Close other dropdowns
                dropdowns.forEach(other => {
                    if (other !== dropdown && other.classList.contains('active')) {
                        other.classList.remove('active');
                    }
                });
            }
        });
        
        // Handle clicks on dropdown content links
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        if (dropdownContent) {
            const links = dropdownContent.querySelectorAll('a');
            links.forEach(link => {
                link.addEventListener('click', function(e) {
                    // Allow navigation for these links
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

    // Handle scroll arrow
    const scrollArrow = document.querySelector('.scroll-arrow');
    if (scrollArrow) {
        scrollArrow.addEventListener('click', function() {
            const footer = document.querySelector('footer');
            if (footer) {
                footer.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Close dropdowns on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
});
