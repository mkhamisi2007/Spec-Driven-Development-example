/**
 * Products Module
 * Handles product list rendering and real-time search filtering
 */

let allProducts = [];

async function initializeProducts() {
    try {
        // Load products data
        allProducts = await DataLoader.loadProducts();

        if (!allProducts || allProducts.length === 0) {
            displayNoResults();
            return;
        }

        // Render initial product list
        renderProducts(allProducts);

        // Setup search event listener
        setupSearchListener();
    } catch (error) {
        console.error('Error initializing products:', error);
        displayError('Failed to load products. Please refresh the page.');
    }
}

/**
 * Render products in the DOM
 */
function renderProducts(productsToShow) {
    const productsList = document.getElementById('products-list');
    const noResults = document.getElementById('no-results');

    if (!productsList) return;

    if (productsToShow.length === 0) {
        productsList.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }

    noResults.style.display = 'none';

    productsList.innerHTML = productsToShow.map(product => `
        <div class="product-card">
            <h3>${escapeHtml(product.name)}</h3>
            <span class="product-category">${escapeHtml(product.category)}</span>
            <p class="product-description">${escapeHtml(product.description)}</p>
            <div class="product-pricing">${escapeHtml(product.pricing)}</div>
        </div>
    `).join('');
}

/**
 * Filter products based on search query
 */
function filterProducts(query) {
    if (!query || query.trim() === '') {
        return allProducts;
    }

    const lowerQuery = query.toLowerCase();
    return allProducts.filter(product =>
        product.name.toLowerCase().includes(lowerQuery)
    );
}

/**
 * Setup search input event listener
 */
function setupSearchListener() {
    const searchInput = document.getElementById('search-input');

    if (!searchInput) return;

    searchInput.addEventListener('input', function(e) {
        const query = e.target.value;
        const filteredProducts = filterProducts(query);
        renderProducts(filteredProducts);
    });

    // Set focus on search input for accessibility
    searchInput.focus();
}

/**
 * Display no results message
 */
function displayNoResults() {
    const productsList = document.getElementById('products-list');
    const noResults = document.getElementById('no-results');

    if (productsList) {
        productsList.innerHTML = '';
    }
    if (noResults) {
        noResults.style.display = 'block';
        noResults.innerHTML = '<h3>No products found</h3><p>Please check back soon.</p>';
    }
}

/**
 * Display error message
 */
function displayError(message) {
    const productsList = document.getElementById('products-list');

    if (productsList) {
        productsList.innerHTML = `<div class="empty-state"><p>${escapeHtml(message)}</p></div>`;
    }
}

/**
 * Escape HTML special characters for security
 */
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}
