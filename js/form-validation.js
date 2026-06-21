// Form Validation Module

const formValidation = (() => {
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate email format
    const validateEmail = (email) => {
        return emailRegex.test(email);
    };

    // Validate required field (non-empty)
    const validateRequired = (value) => {
        return typeof value === 'string' && value.trim().length > 0;
    };

    // Validate message length
    const validateMessageLength = (message, max = 5000) => {
        return typeof message === 'string' && message.length <= max;
    };

    // Sanitize input to prevent XSS (escape HTML special characters)
    const sanitizeInput = (text) => {
        if (typeof text !== 'string') return text;

        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    };

    // Get validation error message
    const getValidationError = (fieldName, reason) => {
        const errorMessages = {
            name: {
                required: i18n.getTranslation('form.nameRequired', 'Name is required')
            },
            email: {
                required: i18n.getTranslation('form.emailRequired', 'Email is required'),
                invalid: i18n.getTranslation('form.emailInvalid', 'Please enter a valid email address')
            },
            subject: {
                required: i18n.getTranslation('form.subjectRequired', 'Subject is required')
            },
            message: {
                required: i18n.getTranslation('form.messageRequired', 'Message is required')
            }
        };

        return (errorMessages[fieldName] && errorMessages[fieldName][reason]) || 'Invalid input';
    };

    // Validate entire form
    const validateForm = (formData) => {
        const errors = {};

        // Validate name
        if (!validateRequired(formData.name)) {
            errors.name = getValidationError('name', 'required');
        }

        // Validate email
        if (!validateRequired(formData.email)) {
            errors.email = getValidationError('email', 'required');
        } else if (!validateEmail(formData.email)) {
            errors.email = getValidationError('email', 'invalid');
        }

        // Validate subject
        if (!validateRequired(formData.subject)) {
            errors.subject = getValidationError('subject', 'required');
        }

        // Validate message
        if (!validateRequired(formData.message)) {
            errors.message = getValidationError('message', 'required');
        } else if (!validateMessageLength(formData.message)) {
            errors.message = `Message must be less than 5000 characters`;
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors: errors
        };
    };

    // Submit form to Formspree
    const submitForm = async (formData, formspreeEndpoint) => {
        try {
            const response = await fetch(formspreeEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                    _subject: `New Contact Form Submission: ${formData.subject}`
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            return {
                success: true,
                message: i18n.getTranslation('form.successMessage', 'Thank you! Your message has been sent.')
            };
        } catch (error) {
            console.error('Form submission error:', error);
            return {
                success: false,
                message: i18n.getTranslation('form.errorMessage', 'Failed to send message. Please try again.')
            };
        }
    };

    return {
        validateEmail,
        validateRequired,
        validateMessageLength,
        sanitizeInput,
        getValidationError,
        validateForm,
        submitForm
    };
})();
