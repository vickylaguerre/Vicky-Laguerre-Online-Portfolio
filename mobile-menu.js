document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav ul');
    const dropdowns = document.querySelectorAll('.dropdown');
    
    // Toggle mobile menu
    menuToggle?.addEventListener('click', () => {
        nav?.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
    
    // Handle dropdown menus on mobile
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        const content = dropdown.querySelector('.dropdown-content');
        
        if (window.innerWidth <= 768) {
            link?.addEventListener('click', (e) => {
                e.preventDefault();
                content?.classList.toggle('active');
            });
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('nav') && !e.target.closest('.menu-toggle')) {
            nav?.classList.remove('active');
            menuToggle?.classList.remove('active');
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            nav?.classList.remove('active');
            menuToggle?.classList.remove('active');
        }
    });
});
