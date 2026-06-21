# Quickstart & Validation Guide

**Date**: 2026-06-21  
**Feature**: International Contact Form & Security Hardening  
**Purpose**: Validate feature completeness with end-to-end testing scenarios

---

## Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge from last 2 years)
- Static site deployed to Netlify, Vercel, or similar hosting platform
- Formspree account with form created and form ID configured
- Translation files (`en.json`, `fr.json`) in place
- All HTML, CSS, and JavaScript files deployed

## Setup

### 1. Verify File Structure

```
Your static site root should contain:

index.html, about.html, products.html, partners.html, contact.html
css/styles.css, css/contact-form.css
js/i18n.js, js/form-validation.js, js/theme.js
data/translations/en.json, data/translations/fr.json
data/contact-info.json
netlify.toml (or vercel.json)
```

### 2. Verify Formspree Integration

- [ ] Formspree account created (https://formspree.io)
- [ ] Form created in Formspree dashboard
- [ ] Form ID copied (format: `abc123def456`)
- [ ] Recipient email configured in Formspree
- [ ] Form ID added to `contact.html` (e.g., `https://formspree.io/f/abc123def456`)

### 3. Verify Hosting Platform Config

**Netlify**:
- [ ] `netlify.toml` file present in repo root
- [ ] Security headers configured in `[[headers]]` section
- [ ] Deploy to Netlify from repo

**Vercel**:
- [ ] `vercel.json` file present in repo root
- [ ] Security headers configured in `headers` array
- [ ] Deploy to Vercel from repo

---

## Validation Scenarios

### Scenario 1: Bilingual Support - English Default

**Goal**: Verify site loads in English by default and language preference works

**Steps**:
1. Open site in new browser (no localStorage history)
2. Verify all text appears in English:
   - Navigation: "Home", "About Us", "Products", "Partners", "Contact Us"
   - Contact page: "Contact Us", "Send us a Message", "Contact Information"
   - Form labels: "Your Name", "Email Address", "Subject", "Message", "Send Message"

**Expected Result**: ✅ All text in English

**Pass Criteria**: All navigation and form text display in English

---

### Scenario 2: Language Switching - English to French

**Goal**: Verify language switcher toggles all text to French

**Steps**:
1. Locate language switcher in navigation bar (typically EN/FR button or dropdown)
2. Click French (FR) option
3. Observe all page text updates to French

**Expected Result**: ✅ All text switches to French
- Navigation: "Accueil", "À propos de nous", "Produits", "Partenaires", "Nous contacter"
- Contact page: "Nous contacter", "Envoyez-nous un message", "Coordonnées"
- Form: "Votre nom", "Adresse e-mail", "Sujet", "Message", "Envoyer le message"

**Pass Criteria**: All UI text displays in French without page reload

---

### Scenario 3: Language Persistence - Across Pages

**Goal**: Verify selected language persists when navigating between pages

**Steps**:
1. Set language to French (Scenario 2)
2. Click "Home" in navigation (or navigate to another page)
3. Verify page loads in French (no need to switch language again)
4. Navigate to different page (e.g., "About Us", "Products")
5. Verify each page displays in French

**Expected Result**: ✅ All pages display in French without re-selecting

**Pass Criteria**: Language preference persists across all pages

---

### Scenario 4: Language Persistence - Across Sessions

**Goal**: Verify language preference survives browser reload/close

**Steps**:
1. Set language to French
2. Close browser tab (or reload page with F5/Cmd+R)
3. Reopen site (or refresh page)
4. Verify page loads in French

**Expected Result**: ✅ Site loads in French without re-selecting

**Pass Criteria**: Language selection stored in localStorage and retrieved on page load

---

### Scenario 5: Form Validation - Missing Required Fields

**Goal**: Verify form prevents submission with missing fields and shows error messages

**Steps**:
1. Navigate to Contact Us page
2. Leave all form fields empty
3. Click "Send Message" button
4. Observe validation errors appear

**Expected Result**: ✅ Error messages appear for each empty field
- "Name is required"
- "Email is required"
- "Subject is required"
- "Message is required"
- Form does NOT submit to Formspree

**Pass Criteria**: 
- Each required field shows specific error message
- Form data preserved (values still in input fields)
- No network request to Formspree

---

### Scenario 6: Form Validation - Invalid Email Format

**Goal**: Verify form rejects invalid email format

**Steps**:
1. Navigate to Contact Us page
2. Fill in form with:
   - Name: "John Doe"
   - Email: "notanemail" (invalid)
   - Subject: "Test"
   - Message: "Test message"
3. Click "Send Message"
4. Observe email validation error

**Expected Result**: ✅ Error message appears
- "Please enter a valid email address"
- Form does NOT submit

**Pass Criteria**:
- Email validation error specific to email field
- Other fields preserved
- No network request to Formspree

---

### Scenario 7: Form Submission - Success

**Goal**: Verify successful form submission shows success message

**Steps**:
1. Navigate to Contact Us page
2. Fill form with valid data:
   - Name: "Jane Smith"
   - Email: "jane@example.com"
   - Subject: "Product Inquiry"
   - Message: "I'd like more information about your products."
3. Click "Send Message"
4. Observe progress bar during submission
5. Observe success message appears

**Expected Result**: ✅ Success flow completes
- Progress bar animates during submission
- Success message: "Thank you! Your message has been sent successfully." (or French equivalent)
- Form fields cleared
- Email received at Formspree recipient address

**Pass Criteria**:
- Loading state visible (progress bar, disabled button)
- Success message displays
- Form cleared after success
- Email received by configured recipient

---

### Scenario 8: Form Submission - Network Error

**Goal**: Verify error handling when Formspree unavailable

**Steps**:
1. (Simulate offline) Open DevTools → Network tab → Throttle to "Offline"
2. Navigate to Contact Us page
3. Fill form with valid data
4. Click "Send Message"
5. Observe error message

**Expected Result**: ✅ Error flow handles gracefully
- Error message displays (e.g., "Failed to send message. Please try again.")
- Form fields cleared
- User can refill and retry when online

**Pass Criteria**:
- Error message clear and helpful
- Form cleared (ready for retry)
- No crash or frozen state

---

### Scenario 9: Form Submission - Bilingual Error Messages

**Goal**: Verify error and success messages display in selected language

**Steps**:
1. Set language to French
2. Fill form with invalid email ("notanemail")
3. Click "Send Message"
4. Verify error message in French: "Veuillez entrer une adresse e-mail valide"
5. Fill with valid data
6. Click "Send Message"
7. Verify success message in French: "Merci! Votre message a été envoyé avec succès."

**Expected Result**: ✅ All messages display in selected language

**Pass Criteria**:
- Validation errors in French
- Success/error messages in French

---

### Scenario 10: Security - HTTPS Enforcement

**Goal**: Verify site enforces HTTPS

**Steps**:
1. Try to access site over HTTP (e.g., `http://yoursite.com`)
2. Observe automatic redirect to HTTPS (e.g., `https://yoursite.com`)

**Expected Result**: ✅ HTTP redirected to HTTPS

**Pass Criteria**: All HTTP requests redirect to HTTPS

---

### Scenario 11: Security - Security Headers Present

**Goal**: Verify security headers are sent with responses

**Steps**:
1. Open site in browser
2. Open DevTools → Network tab
3. Click any resource (e.g., contact.html)
4. View Response Headers
5. Verify headers present:
   - `Content-Security-Policy`: Present and restrictive
   - `Strict-Transport-Security`: Present
   - `X-Content-Type-Options: nosniff`: Present
   - `X-Frame-Options: DENY`: Present
   - `Referrer-Policy`: Present

**Expected Result**: ✅ All security headers present

**Example Headers**:
```
Content-Security-Policy: default-src 'self'; script-src 'self' https://formspree.io; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://formspree.io; style-src 'self' 'unsafe-inline'; img-src 'self' data:; base-uri 'self'; form-action 'self' https://formspree.io
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
```

**Pass Criteria**: All headers present and values match security plan

---

### Scenario 12: Security - XSS Prevention

**Goal**: Verify form input is sanitized against XSS attacks

**Steps**:
1. Navigate to Contact Us page
2. Fill form with:
   - Name: `<script>alert('xss')</script>`
   - Email: `test@example.com`
   - Subject: `Test`
   - Message: `Test`
3. Submit form
4. Verify no JavaScript alert executes
5. Verify success message appears (form submitted)
6. Check Formspree received submission with sanitized text

**Expected Result**: ✅ XSS payload sanitized
- No alert dialog appears
- Form submits successfully
- Formspree received: `&lt;script&gt;alert('xss')&lt;/script&gt;` or similar

**Pass Criteria**:
- No JavaScript execution from form input
- Form submits with sanitized data

---

### Scenario 13: Contact Information Display

**Goal**: Verify contact information displays on Contact Us page

**Steps**:
1. Navigate to Contact Us page
2. Scroll to "Contact Information" section
3. Verify information visible:
   - Address: Full company address
   - Email: Company email
   - Phone: Company phone number
   - Business Hours: Operating hours

**Expected Result**: ✅ All contact information displayed

**Pass Criteria**: All contact fields populated and visible

---

### Scenario 14: Accessibility - Form Labels

**Goal**: Verify form labels properly associated with inputs

**Steps**:
1. Open DevTools → Inspector
2. Click on form input field (e.g., Name)
3. Verify `<label>` element with `for` attribute pointing to input `id`
4. Verify clicking label focuses input field

**Expected Result**: ✅ Labels properly associated

**Pass Criteria**:
- Each input has associated `<label>` with matching `for` attribute
- Clicking label focuses input
- Screen readers can read label

---

### Scenario 15: Responsive Design - Mobile

**Goal**: Verify form responsive on mobile devices

**Steps**:
1. Open site on mobile device (or use browser DevTools device emulation)
2. Navigate to Contact Us page
3. Verify form elements responsive:
   - Input fields full-width or appropriately sized
   - Labels visible above inputs
   - Button clickable and accessible
   - Contact information readable
   - Language switcher accessible

**Expected Result**: ✅ Form fully responsive on mobile

**Pass Criteria**:
- All elements visible and usable on mobile
- No horizontal scrolling needed
- Touch targets (buttons, inputs) appropriately sized

---

## Full End-to-End Test Flow

**Time**: ~10-15 minutes

1. **Scenario 1-2**: Verify bilingual switching (2 min)
2. **Scenario 3-4**: Verify language persistence (3 min)
3. **Scenario 5-9**: Verify form validation and submission (5 min)
4. **Scenario 10-12**: Verify security (3 min)
5. **Scenario 13-15**: Verify contact info and accessibility (3 min)

**Success Criteria**: All scenarios pass

---

## Browser Testing Matrix

Test following scenarios across multiple browsers:

| Browser | Version | Scenarios |
|---------|---------|-----------|
| Chrome | Latest | All |
| Firefox | Latest | All |
| Safari | Latest | All |
| Edge | Latest | All |

---

## Performance Validation

**Lighthouse Audit** (run in browser DevTools):

- [ ] Performance score: 90+
- [ ] Accessibility score: 90+
- [ ] Best Practices score: 90+
- [ ] SEO score: 90+

**Core Web Vitals**:
- [ ] Largest Contentful Paint (LCP): <2.5 seconds
- [ ] First Input Delay (FID): <100 milliseconds
- [ ] Cumulative Layout Shift (CLS): <0.1

---

## Checklist: Feature Complete

- [ ] Bilingual support works (EN/FR switching and persistence)
- [ ] Form validation prevents empty fields and invalid emails
- [ ] Form submission to Formspree succeeds and sends emails
- [ ] Loading state shows progress during submission
- [ ] Success and error messages display in correct language
- [ ] Form data preserved on validation errors, cleared on submission
- [ ] HTTPS enforced
- [ ] Security headers present
- [ ] XSS attempts are sanitized
- [ ] Contact information displays
- [ ] Form accessible (labels, keyboard nav, screen readers)
- [ ] Responsive on mobile
- [ ] Performance meets targets

---

## Rollback Plan

If critical issue found:

1. **Validation failure**: Fix and re-test scenario
2. **Security issue**: Revert changes, audit CSP configuration, re-deploy
3. **Form submission failure**: Check Formspree form ID and endpoint, verify CORS allowed
4. **Translation missing**: Verify JSON files valid and keys match

---

**Validation Status**: ✅ Ready for Testing | **Next Step**: Execute test scenarios
