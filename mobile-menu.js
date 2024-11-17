document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown');
    let activeDropdown = null;
    
    // Function to close dropdown
    function closeDropdown(dropdown) {
        if (dropdown) {
            dropdown.classList.remove('active');
            if (activeDropdown === dropdown) {
                activeDropdown = null;
            }
        }
    }

    // Function to open dropdown
    function openDropdown(dropdown) {
        if (activeDropdown && activeDropdown !== dropdown) {
            closeDropdown(activeDropdown);
        }
        dropdown.classList.add('active');
        activeDropdown = dropdown;
    }

    // Handle dropdown clicks
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) { // Only for mobile
                e.preventDefault();
                e.stopPropagation();
                
                if (dropdown.classList.contains('active')) {
                    closeDropdown(dropdown);
                } else {
                    openDropdown(dropdown);
                }
            }
        });

        // Prevent closing when clicking inside dropdown content
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        if (dropdownContent) {
            dropdownContent.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.stopPropagation();
                }
            });
        }
    });

    // Close active dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (activeDropdown && !e.target.closest('.dropdown')) {
            closeDropdown(activeDropdown);
        }
    });

    // Handle resize events
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 768 && activeDropdown) {
                closeDropdown(activeDropdown);
            }
        }, 250);
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

    // Close dropdowns when pressing ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && activeDropdown) {
            closeDropdown(activeDropdown);
        }
    });
});
