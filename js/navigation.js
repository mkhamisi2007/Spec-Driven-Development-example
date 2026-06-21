/**
 * Navigation Module
 * Handles hamburger menu and navigation state management
 */

function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = getCurrentPage();

    // Set active page link
    navLinks.forEach(link => {
        link.classList.remove('active');

        const href = link.getAttribute('href');
        let linkPage = getPageFromHref(href);

        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });

    // Hamburger menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', toggleMenu);
    }

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu on Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navbar && navbar.classList.contains('is-open')) {
            closeMenu();
        }
    });
}

function toggleMenu() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');

    if (!navbar || !navToggle) return;

    const isOpen = navbar.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', isOpen);
}

function closeMenu() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');

    if (navbar) {
        navbar.classList.remove('is-open');
    }
    if (navToggle) {
        navToggle.setAttribute('aria-expanded', 'false');
    }
}

function getCurrentPage() {
    const path = window.location.pathname;
    const filename = path.split('/').pop() || 'index.html';

    if (filename === 'index.html' || filename === '' || filename === 'default.html') {
        return 'about';
    } else if (filename === 'products.html') {
        return 'products';
    } else if (filename === 'partners.html') {
        return 'partners';
    }
    return 'about';
}

function getPageFromHref(href) {
    if (href.includes('products')) {
        return 'products';
    } else if (href.includes('partners')) {
        return 'partners';
    }
    return 'about';
}
