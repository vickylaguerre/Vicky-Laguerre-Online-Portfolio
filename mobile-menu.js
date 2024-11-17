document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown');
    let activeDropdown = null;

    // Handle dropdown clicks
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) { // Only for mobile
                e.preventDefault();
                
                if (activeDropdown && activeDropdown !== dropdown) {
                    activeDropdown.classList.remove('active');
                }
                
                dropdown.classList.toggle('active');
                activeDropdown = dropdown.classList.contains('active') ? dropdown : null;
            }
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown') && activeDropdown) {
            activeDropdown.classList.remove('active');
            activeDropdown = null;
        }
    });

    // Handle resize events
    let timeout = null;
    window.addEventListener('resize', function() {
        if (timeout) {
            clearTimeout(timeout);
        }
        
        timeout = setTimeout(function() {
            if (window.innerWidth > 768) {
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
                activeDropdown = null;
            }
        }, 200);
    });
});
