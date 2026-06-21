// Contact Page Script

// Configure your Formspree form ID here
const FORMSPREE_FORM_ID = 'REPLACE_WITH_YOUR_FORMSPREE_FORM_ID';
const FORMSPREE_ENDPOINT = `https://formspree.io/f/${FORMSPREE_FORM_ID}`;

document.addEventListener('DOMContentLoaded', async () => {
    // Initialize language preference and translations
    await theme.initLanguagePreference();
    theme.setupLanguageSwitcher();

    // Load contact information
    await loadContactInfo();

    // Setup form event listeners
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
});

// Load and display contact information
async function loadContactInfo() {
    try {
        const response = await fetch('/data/contact-info.json');
        if (!response.ok) {
            console.warn('Failed to load contact information');
            return;
        }

        const contactInfo = await response.json();

        // Display address
        const addressEl = document.getElementById('address');
        if (addressEl && contactInfo.address) {
            const { street, city, state, postalCode, country } = contactInfo.address;
            addressEl.innerHTML = `${street}<br>${city}, ${state} ${postalCode}<br>${country}`;
        }

        // Display email
        const emailEl = document.getElementById('email-display');
        if (emailEl && contactInfo.email) {
            emailEl.innerHTML = `<a href="mailto:${formValidation.sanitizeInput(contactInfo.email)}">${formValidation.sanitizeInput(contactInfo.email)}</a>`;
        }

        // Display phone
        const phoneEl = document.getElementById('phone');
        if (phoneEl && contactInfo.phone) {
            phoneEl.innerHTML = `<a href="tel:${contactInfo.phone.replace(/\s/g, '')}">${formValidation.sanitizeInput(contactInfo.phone)}</a>`;
        }

        // Display business hours
        const hoursEl = document.getElementById('hours');
        if (hoursEl && contactInfo.businessHours) {
            hoursEl.innerHTML = `
                <strong>Weekdays:</strong> ${formValidation.sanitizeInput(contactInfo.businessHours.weekdays)}<br>
                <strong>Weekends:</strong> ${formValidation.sanitizeInput(contactInfo.businessHours.weekends)}<br>
                <strong>Timezone:</strong> ${formValidation.sanitizeInput(contactInfo.businessHours.timezone)}
            `;
        }
    } catch (error) {
        console.error('Error loading contact information:', error);
    }
}

// Handle form submission
async function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const submitBtn = form.querySelector('#submitBtn');
    const formErrorsDiv = document.getElementById('formErrors');
    const formStatusDiv = document.getElementById('formStatus');
    const progressContainer = document.querySelector('.progress-bar-container');

    // Clear previous messages
    formErrorsDiv.innerHTML = '';
    formErrorsDiv.classList.remove('show');
    formStatusDiv.innerHTML = '';
    formStatusDiv.classList.remove('show', 'success', 'error');

    // Get form data
    const formData = {
        name: form.querySelector('#name').value,
        email: form.querySelector('#email').value,
        subject: form.querySelector('#subject').value,
        message: form.querySelector('#message').value
    };

    // Validate form
    const validation = formValidation.validateForm(formData);

    if (!validation.isValid) {
        // Display validation errors
        const errorsList = Object.values(validation.errors)
            .map(err => `<li>${formValidation.sanitizeInput(err)}</li>`)
            .join('');

        formErrorsDiv.innerHTML = `<ul>${errorsList}</ul>`;
        formErrorsDiv.classList.add('show');
        return;
    }

    // Show progress bar and disable submit button
    if (progressContainer) {
        progressContainer.classList.add('show');
    }
    submitBtn.disabled = true;

    // Show loading message
    const loadingMsg = i18n.getTranslation('form.loadingMessage', 'Sending your message...');
    formStatusDiv.innerHTML = `<span>${formValidation.sanitizeInput(loadingMsg)}</span>`;
    formStatusDiv.classList.add('show');

    // Submit form to Formspree
    const result = await formValidation.submitForm(formData, FORMSPREE_ENDPOINT);

    // Hide progress bar
    if (progressContainer) {
        progressContainer.classList.remove('show');
    }

    // Display result message
    formStatusDiv.innerHTML = `<span>${formValidation.sanitizeInput(result.message)}</span>`;
    formStatusDiv.classList.add('show');

    if (result.success) {
        formStatusDiv.classList.add('success');
        // Clear form on success
        form.reset();
    } else {
        formStatusDiv.classList.add('error');
    }

    // Re-enable submit button
    submitBtn.disabled = false;

    // Auto-hide success message after 5 seconds
    if (result.success) {
        setTimeout(() => {
            formStatusDiv.classList.remove('show');
        }, 5000);
    }
}
