// Mobile menu handling
document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            // Toggle active class on click
            this.classList.toggle('active');
            
            // Close other dropdowns
            dropdowns.forEach(other => {
                if (other !== this) {
                    other.classList.remove('active');
                }
            });
            
            // Prevent link navigation on dropdown toggle
            if (e.target.classList.contains('dropdown')) {
                e.preventDefault();
            }
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
});