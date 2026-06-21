/**
 * Partners Module
 * Handles partner list rendering
 */

async function initializePartners() {
    try {
        // Load partners data
        const partners = await DataLoader.loadPartners();

        if (!partners || partners.length === 0) {
            displayNoPartners();
            return;
        }

        // Render partner list
        renderPartners(partners);
    } catch (error) {
        console.error('Error initializing partners:', error);
        displayError('Failed to load partners. Please refresh the page.');
    }
}

/**
 * Render partners in the DOM
 */
function renderPartners(partners) {
    const partnersList = document.getElementById('partners-list');
    const noPartners = document.getElementById('no-partners');

    if (!partnersList) return;

    if (partners.length === 0) {
        partnersList.innerHTML = '';
        if (noPartners) {
            noPartners.style.display = 'block';
        }
        return;
    }

    if (noPartners) {
        noPartners.style.display = 'none';
    }

    partnersList.innerHTML = partners.map(partner => `
        <div class="partner-card">
            <img src="${escapeHtml(partner.logo)}" alt="${escapeHtml(partner.name)}" class="partner-logo">
            <h3 class="partner-name">${escapeHtml(partner.name)}</h3>
            ${partner.description ? `<p class="partner-description">${escapeHtml(partner.description)}</p>` : ''}
        </div>
    `).join('');
}

/**
 * Display no partners message
 */
function displayNoPartners() {
    const partnersList = document.getElementById('partners-list');
    const noPartners = document.getElementById('no-partners');

    if (partnersList) {
        partnersList.innerHTML = '';
    }
    if (noPartners) {
        noPartners.style.display = 'block';
    }
}

/**
 * Display error message
 */
function displayError(message) {
    const partnersList = document.getElementById('partners-list');

    if (partnersList) {
        partnersList.innerHTML = `<div class="empty-state"><p>${escapeHtml(message)}</p></div>`;
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
