// Main initialization script
document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation
    initializeNavigation();

    // Initialize page-specific functionality
    initializePage();
});

/**
 * Get current page identifier based on filename
 */
function getCurrentPage() {
    const path = window.location.pathname;
    const filename = path.split('/').pop() || 'index.html';

    if (filename === 'index.html' || filename === '') {
        return 'about';
    } else if (filename === 'products.html') {
        return 'products';
    } else if (filename === 'partners.html') {
        return 'partners';
    }
    return 'about';
}

/**
 * Initialize navigation menu
 */
function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = getCurrentPage();

    // Set active page
    navLinks.forEach(link => {
        link.classList.remove('active');

        const href = link.getAttribute('href');
        let linkPage = 'about';
        if (href.includes('products')) {
            linkPage = 'products';
        } else if (href.includes('partners')) {
            linkPage = 'partners';
        }

        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });

    // Hamburger menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            const isOpen = navbar.classList.toggle('is-open');
            navToggle.setAttribute('aria-expanded', isOpen);
        });
    }

    // Close menu when link clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navbar) {
                navbar.classList.remove('is-open');
                if (navToggle) {
                    navToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });

    // Close menu on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navbar && navbar.classList.contains('is-open')) {
            navbar.classList.remove('is-open');
            if (navToggle) {
                navToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });
}

/**
 * Initialize page-specific functionality
 */
function initializePage() {
    const currentPage = getCurrentPage();

    if (currentPage === 'products') {
        if (typeof initializeProducts === 'function') {
            initializeProducts();
        }
    } else if (currentPage === 'partners') {
        if (typeof initializePartners === 'function') {
            initializePartners();
        }
    }
}
