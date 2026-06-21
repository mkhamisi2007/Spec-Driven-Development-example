# Research & Technical Decisions: International Contact Form & Security Hardening

**Date**: 2026-06-21  
**Feature**: International Contact Form & Security Hardening  
**Status**: ✅ Complete

## Overview

This document consolidates research and technical decision-making for the i18n implementation, form submission strategy, and security hardening approach. All decisions are informed by the project constitution (simplicity-first, static architecture, performance constraints) and user guidance.

---

## 1. Bilingual Support (English/French) - i18n Approach

### Decision: JSON-Based Vanilla JavaScript i18n

**Chosen Approach**: 
- Separate JSON translation files (`en.json`, `fr.json`) in `data/translations/`
- Custom JavaScript i18n module (`js/i18n.js`) for loading and applying translations
- Language preference stored in `localStorage` under key `siteLanguage`
- HTML `lang` attribute set on `<html>` element

### Rationale

1. **Simplicity**: No external i18n framework (i18n-js, i18next, etc.). Custom module is ~200 lines of vanilla JS, fully maintainable.
2. **Performance**: 
   - JSON files are small (<20KB each, further reduced with gzip)
   - Minimal JavaScript footprint (~5KB minified)
   - Fits within constitutional performance budget
3. **Maintainability**: Non-developer translators can edit JSON files directly; clear key structure
4. **Static Site Compatibility**: Works without any build tools or preprocessing
5. **Browser Compatibility**: `localStorage` supported in all modern browsers (IE11+)

### Alternatives Considered & Rejected

| Alternative | Why Rejected |
|-------------|-------------|
| **i18next** | Industry-standard but overkill for 2 languages on static site; adds ~50KB (gzipped); requires build process |
| **Polyglot.js** | Lighter than i18next but still 7KB+ minified; not worth the dependency |
| **Server-side rendering (separate pages per language)** | Violates static architecture; duplicates content; harder to maintain |
| **CSS-based switching with pseudo-elements** | Fragile; not accessible; doesn't scale beyond trivial text |
| **Hardcoded translations in HTML** | Violates DRY principle; error-prone updates |

### Implementation Details

**Translation File Structure** (`en.json` and `fr.json`):
```json
{
  "nav": {
    "home": "Home",
    "about": "About",
    "products": "Products",
    "partners": "Partners",
    "contact": "Contact Us"
  },
  "form": {
    "nameLabel": "Your Name",
    "nameRequired": "Name is required",
    "emailLabel": "Email Address",
    "emailRequired": "Email is required",
    "emailInvalid": "Please enter a valid email",
    "subjectLabel": "Subject",
    "subjectRequired": "Subject is required",
    "messageLabel": "Message",
    "messageRequired": "Message is required",
    "submitButton": "Send Message",
    "successMessage": "Thank you! Your message has been sent.",
    "errorMessage": "Failed to send message. Please try again."
  }
}
```

**Language Switching Logic**:
1. User clicks language switcher (EN/FR button in nav)
2. `setLanguage(lang)` updates `localStorage['siteLanguage']`
3. `applyTranslations()` retrieves all elements with `data-i18n` attribute
4. Replaces element content with translated text from current language object
5. Updates `<html lang="en">` or `<html lang="fr">`

**Persistence**:
- On page load, check `localStorage['siteLanguage']`
- If found, use that language; otherwise detect from browser language (navigator.language) or default to English
- Language choice persists across page navigation and browser reloads

---

## 2. Contact Form - Formspree Integration

### Decision: Formspree Third-Party Service + Vanilla JavaScript

**Chosen Approach**:
- Form submits to Formspree endpoint via `fetch()` API
- Client-side validation before submission (vanilla JavaScript)
- No custom backend or email processing
- Loading state: CSS-animated progress bar + disabled submit button

### Rationale

1. **No Backend Required**: Formspree handles email routing; eliminates server infrastructure
2. **Simplicity**: No node server, no email library, no SMTP configuration
3. **Cost Effective**: Free tier sufficient for small business contact forms
4. **Reliability**: Formspree handles delivery, retries, and spam filtering
5. **Security**: Formspree handles SMTP credentials; not exposed in client code
6. **Static Compatible**: Works with any static host (GitHub Pages, Netlify, Vercel)

### Alternatives Considered & Rejected

| Alternative | Why Rejected |
|-------------|-------------|
| **Custom Node/Express backend** | Violates static architecture constraint; adds complexity and deployment burden |
| **Firebase Cloud Functions** | Adds vendor lock-in; more complex than Formspree for simple forms |
| **AWS Lambda** | Overkill for single contact form; requires IAM/permissions setup |
| **Netlify Functions** | Adds build/deploy complexity; Formspree is simpler for this use case |
| **Client-side localStorage (no submission)** | Doesn't meet spec requirement for form submission to company |

### Implementation Details

**Form Submission Flow**:
1. User fills form and clicks "Send Message"
2. Client-side validation runs:
   - Name: required, non-empty
   - Email: required, regex validation (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)
   - Subject: required, non-empty
   - Message: required, non-empty, max 5000 characters
3. If validation passes:
   - Show progress bar and disable submit button
   - Fetch POST to `https://formspree.io/f/{FORM_ID}`
   - Form data sent as JSON: `{ "name": "...", "email": "...", "subject": "...", "message": "..." }`
4. On success:
   - Hide progress bar
   - Show success message
   - Clear form fields
5. On error:
   - Hide progress bar
   - Show error message with retry option
   - Clear form fields (user must refill)

**Loading State Implementation**:
- CSS keyframe animation for fake linear progress bar (from 0% to 90%, then wait for actual response)
- Progress bar animates for duration of typical form submission (~3-5 seconds)
- Once response received (success or error), progress bar completes to 100% or closes

**Formspree Setup**:
- User creates Formspree account and form
- Gets form ID (e.g., `f/abc123def456`)
- Endpoint: `https://formspree.io/f/{FORM_ID}`
- Formspree automatically sends emails to configured address

---

## 3. Security Hardening

### Decision: Platform-Level Security Headers + Client-Side Input Sanitization

**Chosen Approach**:
- Security headers configured via hosting platform config file (netlify.toml or vercel.json)
- HTTPS enforced automatically by hosting platform
- Content-Security-Policy (CSP) restricts resource loading
- Client-side input sanitization prevents XSS attacks
- No sensitive data (API keys, endpoints) hardcoded in source

### Rationale

1. **Platform Handling**: Hosting platforms (Netlify, Vercel, GitHub Pages) handle HTTPS and header injection; no custom middleware needed
2. **CSP Flexibility**: CSP header whitelist allows only necessary external resources (Formspree, fonts)
3. **Client-Side Validation**: Catches and rejects injection attempts before submission
4. **Maintainability**: Configuration in single file (netlify.toml or vercel.json); easy to audit and update
5. **Performance**: No server-side processing; headers added at edge

### Alternatives Considered & Rejected

| Alternative | Why Rejected |
|-------------|-------------|
| **Custom Express/Node server** | Violates static architecture; defeats purpose of static hosting |
| **Cloudflare Workers** | Adds complexity and vendor lock-in; platform-level headers sufficient |
| **Content Security Policy generator tools** | Unnecessary for simple static site; manual configuration is clear |
| **DOMPurify library** | Overkill for simple form validation; custom sanitization sufficient |

### Implementation Details

**Netlify Configuration** (`netlify.toml`):
```toml
[[headers]]
  for = "/*"
  [headers.values]
    Content-Security-Policy = "default-src 'self'; script-src 'self' https://formspree.io; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://formspree.io; style-src 'self' 'unsafe-inline'; img-src 'self' data:; base-uri 'self'; form-action 'self' https://formspree.io"
    Strict-Transport-Security = "max-age=31536000; includeSubDomains; preload"
    X-Content-Type-Options = "nosniff"
    X-Frame-Options = "DENY"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

**Vercel Configuration** (`vercel.json`):
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' https://formspree.io; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://formspree.io; style-src 'self' 'unsafe-inline'; img-src 'self' data:; base-uri 'self'; form-action 'self' https://formspree.io"
        },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains; preload"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ]
}
```

**Client-Side Input Sanitization** (`js/form-validation.js`):
- Email regex validation to reject malformed addresses
- XSS prevention: escape HTML special characters (`<`, `>`, `&`, `"`, `'`) before any display
- Use `textContent` or `innerText` instead of `innerHTML` for displaying user input
- Required field checks prevent empty submissions
- Message length validation (max 5000 characters)

**Security Whitelist in CSP**:
- `'self'`: Only load same-origin resources
- `https://formspree.io`: Allow Formspree form submission endpoint
- `https://fonts.gstatic.com`: Allow Google Fonts (if using)
- No inline JavaScript (`'unsafe-inline'` NOT allowed for scripts)
- No `eval()` or data URIs for scripts
- Form action restricted to `'self'` and `https://formspree.io`

### Security Decisions Rationale

| Decision | Why |
|----------|-----|
| No inline scripts | Prevents XSS; requires external JS files |
| CSP header strict | Blocks malicious script injection; only allows necessary external resources |
| HSTS enabled | Forces HTTPS; prevents downgrade attacks |
| X-Frame-Options: DENY | Prevents clickjacking; site cannot be framed by other domains |
| Input sanitization | Escapes user input to prevent XSS even if CSP bypassed |
| No sensitive data in source | API endpoints, secrets never exposed client-side |

---

## Summary

### Key Decisions

| Feature | Decision | Justification |
|---------|----------|----------------|
| **i18n** | JSON + vanilla JS | Simple, performant, static-compatible |
| **Form Submission** | Formspree + vanilla JS | No backend needed; reliable; secure |
| **Security Headers** | Platform config (netlify.toml / vercel.json) | Centralized, maintainable, performant |
| **Input Sanitization** | Client-side escaping + validation | Prevents XSS; lightweight |
| **Language Persistence** | localStorage | Works across sessions; no backend required |

### Constitutional Compliance

✅ **Simplicity First**: No frameworks, minimal dependencies, clear code structure  
✅ **Static Architecture**: No backend, no database, third-party form service  
✅ **Performance**: All solutions fit within budget (<2s load, <50KB JS)  
✅ **Accessibility**: Semantic HTML, keyboard navigation, ARIA labels support  

### Ready for Phase 1

All research complete. No ambiguities remain. Phase 1 can proceed with:
- Data model definition (form fields, translation structure)
- Contract definition (Formspree API, i18n JSON schema)
- Quickstart validation guide

---

**Research Status**: ✅ COMPLETE | **Recommendations**: Proceed to Phase 1 Design
