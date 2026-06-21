# Feature Specification: International Contact Form & Security Hardening

**Feature Branch**: `001-international-contact-security`

**Created**: 2026-06-21

**Status**: Draft

**Input**: Add Contact Us page with form, bilingual support (English/French), and security hardening (HTTPS, CSP, security headers, input sanitization)

## Clarifications

### Session 2026-06-21

- Q: Should accessibility requirements be explicit in the spec? → A: No, treat accessibility as inherited from the project constitution (WCAG 2.1 AA mandate applies to all features).
- Q: What feedback should users receive during form submission? → A: Show a linear animating progress bar with an estimated time message (e.g., "Sending your message...").
- Q: Should form data be preserved if submission fails? → A: Preserve on validation errors (user mistakes); clear on submission/network errors (system failures).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Contact Us Form Submission (Priority: P1)

A visitor to the website wants to send an inquiry to the company. They navigate to the Contact Us page, fill out a contact form with their details, and submit the form. The form captures their name, email, subject, and message. Before submission, the form validates that all required fields are filled and the email format is valid. Upon successful submission, the form is sent to the company via a third-party form service (e.g., Formspree) without requiring backend infrastructure.

**Why this priority**: This is the core value of the feature—enabling direct communication with customers. Without working contact forms, potential customers cannot reach the company, directly impacting business inquiries and lead generation.

**Independent Test**: Can be fully tested by filling out a form with valid data, submitting it, and verifying that the submission is received by the third-party service.

**Acceptance Scenarios**:

1. **Given** a user is on the Contact Us page, **When** they fill in valid data (name, email, subject, message) and submit, **Then** a linear progress bar appears with an estimated time message, the submit button is disabled, and a success message is shown after submission completes.
2. **Given** a user leaves required fields empty, **When** they attempt to submit, **Then** validation errors appear, the form data is preserved, and the form is not submitted.
3. **Given** a user enters an invalid email format, **When** they attempt to submit, **Then** an email validation error appears and the form data is preserved for correction.
4. **Given** a form submission fails due to a network or service error, **When** the error is received, **Then** an error message is shown, the form fields are cleared, and the user can fill and resubmit.
5. **Given** a user successfully submits the form, **When** they refresh the page, **Then** the form fields are cleared and the page returns to the initial state.

---

### User Story 2 - Bilingual Website Navigation (Priority: P1)

A French-speaking visitor arrives at the website and sees it in English. They want to browse the site in French. A language switcher in the navigation bar allows them to toggle between English and French. When they switch languages, the entire site (navigation, pages, content, forms, buttons) displays in French. As they navigate between pages, the selected language persists. If they close and reopen the browser, the language preference is remembered.

**Why this priority**: International audience access and inclusivity are fundamental. Without bilingual support, French-speaking visitors cannot effectively use the site, limiting market reach. This is core to the feature's value proposition.

**Independent Test**: Can be fully tested by switching to French, verifying all UI elements and content display in French, navigating between pages, and confirming language persistence after page reload.

**Acceptance Scenarios**:

1. **Given** a user is on the homepage in English, **When** they click the French language option, **Then** the entire page (navigation, headings, content, buttons) switches to French.
2. **Given** a user has selected French and navigates to another page, **When** the page loads, **Then** it displays in French by default.
3. **Given** a user selects French and then closes the browser, **When** they return to the site, **Then** the site displays in French (language preference persists).
4. **Given** a user is viewing the Contact Us form in French, **When** they interact with the form, **Then** all labels, placeholders, validation messages, and success messages appear in French.

---

### User Story 3 - Security-Hardened Contact Form (Priority: P1)

A developer deploying the website wants to ensure that the contact form is protected from injection attacks and that user input cannot compromise the site's security. The form should sanitize all user inputs to prevent XSS (cross-site scripting) attacks and validate that inputs conform to expected patterns. Additionally, the site should enforce HTTPS, include security headers (CSP, X-Content-Type-Options, Referrer-Policy), and avoid exposing sensitive information like API keys or email addresses in client-side code.

**Why this priority**: Security is non-negotiable. Without proper input sanitization, XSS attacks could compromise user trust and data. Security headers and HTTPS enforcement protect against various attack vectors. This ensures customer data and company reputation remain safe.

**Independent Test**: Can be fully tested by attempting to inject malicious scripts in form fields, verifying that the injected content is sanitized or rejected, and verifying that security headers are present in HTTP responses.

**Acceptance Scenarios**:

1. **Given** a user attempts to submit a form field with script tags (e.g., `<script>alert('xss')</script>`), **When** the form is submitted, **Then** the input is sanitized or rejected, and no script executes.
2. **Given** a browser makes an HTTP request to the site, **When** the response is received, **Then** it includes security headers (Content-Security-Policy, X-Content-Type-Options: nosniff, Referrer-Policy).
3. **Given** a user is submitting the contact form, **When** the form data is sent to the third-party service, **Then** the connection is encrypted (HTTPS) and API keys are not exposed in the request payload or client-side source.
4. **Given** a browser attempts to load the site over HTTP, **When** the request is received, **Then** it is redirected to HTTPS.

---

### Edge Cases

- What happens when the third-party form service (Formspree) is temporarily unavailable? (Error message shown; form fields cleared; user advised to try again or contact support.)
- How does the system handle form submissions with special characters (é, ñ, etc.)? (UTF-8 encoding handles these; no data loss; form data preserved on validation errors if user needs to modify.)
- What if a user's browser has cookies disabled? (Language preference cannot persist; site defaults to the browser's language preference or English.)
- What happens when a user attempts XSS injection with encoded payloads (e.g., HTML entities)? (Sanitization decodes and removes any potentially malicious content.)
- What if a user submits a validation error, sees the error message, corrects one field, but their other fields are empty again? (System preserves all form data on validation errors; user only needs to correct the flagged field.)

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a "Contact Us" page accessible from the main navigation with a contact form.
- **FR-002**: Contact form MUST accept and display input fields for name, email, subject, and message.
- **FR-003**: System MUST validate on the client side that all required fields (name, email, subject, message) are filled before submission.
- **FR-004**: System MUST validate on the client side that the email field contains a valid email format (e.g., example@domain.com).
- **FR-005**: System MUST submit form data to a third-party form service (e.g., Formspree) without requiring custom backend infrastructure.
- **FR-006**: System MUST display a success message after successful form submission.
- **FR-007**: System MUST display clear validation error messages when form submission fails due to missing or invalid input.
- **FR-007a**: System MUST preserve the user's form input data when validation errors occur, allowing the user to correct and resubmit without retyping.
- **FR-007b**: System MUST show a linear animating progress bar with an estimated time message (e.g., "Sending your message...") during form submission to the third-party service.
- **FR-007c**: System MUST disable the submit button while form submission is in progress to prevent duplicate submissions.
- **FR-007d**: System MUST clear form fields after a successful submission or a submission/network error (but NOT on validation errors) and show an appropriate success or error message.
- **FR-008**: System MUST display company contact information (address, email, phone) on the Contact Us page.
- **FR-009**: System MUST provide a language switcher in the main navigation bar that toggles between English and French.
- **FR-010**: System MUST translate all UI text, navigation labels, button text, form labels, placeholders, and validation messages into both English and French.
- **FR-011**: System MUST persist the user's language selection across page navigation within the same session.
- **FR-012**: System MUST persist the user's language selection across browser sessions (using localStorage or similar mechanism).
- **FR-013**: System MUST sanitize all user input on the contact form to prevent XSS injection attacks.
- **FR-014**: System MUST validate all user input to ensure it conforms to expected patterns (e.g., email, alphanumeric text).
- **FR-015**: System MUST enforce HTTPS for all connections and redirect HTTP requests to HTTPS.
- **FR-016**: System MUST include a Content-Security-Policy (CSP) header to prevent inline script execution and restrict resource loading.
- **FR-017**: System MUST include an X-Content-Type-Options header set to "nosniff" to prevent MIME type sniffing.
- **FR-018**: System MUST include a Referrer-Policy header to control referrer information.
- **FR-019**: System MUST NOT expose API keys, form service credentials, or sensitive configuration in client-side source code.
- **FR-020**: System MUST NOT display email addresses in plain text where avoidable; use contact forms as the primary communication method.

### Key Entities

- **Contact Form**: Contains fields (name, email, subject, message), validation rules, and integration with third-party form service.
- **Language Preference**: User's selected language (English or French), stored and retrieved from localStorage.
- **Security Configuration**: HTTPS enforcement, CSP, security headers, and input sanitization rules applied site-wide.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can successfully submit a contact form with valid data within 2 minutes of arrival on the Contact Us page.
- **SC-002**: 100% of form validation errors (missing fields, invalid email) are caught on the client side before submission, and user input data is preserved for correction.
- **SC-002a**: During form submission, a linear progress bar with estimated time message is displayed; submit button remains disabled until submission completes.
- **SC-003**: Users can switch the site language and have the selected language persist across all pages and browser sessions (100% persistence for returning visitors).
- **SC-004**: No XSS vulnerabilities are present on the contact form; all injection attempts are sanitized or rejected.
- **SC-005**: All HTTP requests are redirected to HTTPS (100% enforcement).
- **SC-006**: Security headers (CSP, X-Content-Type-Options, Referrer-Policy) are present in all HTTP responses (100% coverage).
- **SC-007**: API keys and sensitive credentials are completely absent from client-side source code and network requests.
- **SC-008**: Contact form submission succeeds in 95%+ of cases (accounting for third-party service availability); on failure, error message is shown and form fields are cleared for retry.
- **SC-009**: French-language content is complete and accurate across all pages and forms (100% translation coverage).

## Assumptions

- **Third-Party Form Service**: Formspree or a similar third-party service is used for form submission; no custom backend is developed.
- **Language Support**: Only English and French are supported; additional languages are out of scope.
- **Storage Mechanism**: Browser localStorage is available and enabled; if disabled, language preference reverts to browser default or English.
- **Static Site Structure**: The site is entirely static (HTML, CSS, JavaScript); no server-side rendering is used.
- **Client-Side Validation**: Email validation and required field checks are performed in the browser; third-party service may perform additional validation.
- **UTF-8 Encoding**: All content is UTF-8 encoded to support special characters in both English and French.
- **Form Service Integration**: Formspree or similar service handles email notifications; no custom email backend is required.
- **Mobile Responsiveness**: Contact form and language switcher are responsive and functional on mobile devices and tablets.
- **Browser Compatibility**: Site supports modern browsers (Chrome, Firefox, Safari, Edge) from the last 2 years.
