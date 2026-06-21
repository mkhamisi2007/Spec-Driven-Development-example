# Implementation Plan: International Contact Form & Security Hardening

**Branch**: `001-international-contact-security` | **Date**: 2026-06-21 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/001-international-contact-security/spec.md`

## Summary

This feature adds three core capabilities to the static website: a Contact Us page with form submission via Formspree, bilingual support (English/French) using JSON-based translation files, and security hardening via hosting platform configuration. The implementation uses vanilla HTML, CSS, and JavaScript to maintain simplicity and performance per the constitution. No backend infrastructure, databases, or heavy frameworks are required.

## Technical Context

**Language/Version**: HTML5, CSS3, JavaScript (ES6+)

**Primary Dependencies**: 
- Formspree (third-party form service)
- Vanilla JavaScript (no frameworks)
- JSON translation files (en.json, fr.json)

**Storage**: Static JSON files for translations; localStorage for language preference

**Testing**: Manual testing for form submission and language switching; automated accessibility checks (Lighthouse, axe)

**Target Platform**: Modern browsers (Chrome, Firefox, Safari, Edge) from the last 2 years

**Project Type**: Static website (client-side only)

**Performance Goals**: Initial page load <2 seconds, fully interactive <3 seconds on 4G networks

**Constraints**: 
- HTML <50KB per page (gzip)
- CSS <30KB total (gzip)
- JS <50KB total (gzip)
- WCAG 2.1 AA compliance mandatory
- No external frameworks (React, Vue, Angular)
- No server-side logic or database

**Scale/Scope**: 5 pages (Home, About, Products, Partners, Contact Us); bilingual interface; form submissions

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Principle Compliance

1. **Simplicity First**: ✅ PASS
   - Vanilla HTML, CSS, JavaScript
   - No frameworks, no build tools
   - Simple JSON file structure for i18n
   - Client-side form validation, no backend

2. **Static Architecture**: ✅ PASS
   - No backend logic
   - No database
   - All form submissions via third-party service (Formspree)
   - Static file hosting compatible

3. **Responsive & Clean UI**: ✅ PASS
   - Contact form responsive design required
   - Language switcher in navigation
   - Minimal, focused interface

4. **Web Accessibility (WCAG 2.1 AA)**: ✅ PASS
   - Semantic HTML form structure
   - Form labels associated with inputs
   - Validation errors clear and associated
   - Keyboard navigation on form and language switcher
   - Color contrast compliance required in final CSS

5. **Performance & Fast Page Load**: ✅ PASS
   - JSON i18n files small and cached
   - Vanilla JS has minimal footprint
   - No external frameworks

6. **Maintainable Code**: ✅ PASS
   - Well-organized file structure
   - Self-documenting JavaScript
   - Clear naming conventions

### Gate Status

**GATE RESULT**: ✅ **PASSED** — All constitutional constraints satisfied. Implementation may proceed.

## Project Structure

### Documentation (this feature)

```text
specs/001-international-contact-security/
├── plan.md                      # This file
├── research.md                  # Phase 0 (research decisions)
├── data-model.md                # Phase 1 (form/translation data structure)
├── quickstart.md                # Phase 1 (validation guide)
├── contracts/                   # Phase 1 (Formspree contract, translation format)
│   ├── formspree-contract.md    # Form submission API expectations
│   └── translation-contract.md  # i18n JSON structure and keys
├── checklists/
│   └── requirements.md          # Spec quality validation
└── tasks.md                     # Phase 2 (implementation tasks)
```

### Source Code (repository root - static site)

```text
index.html                       # Homepage
about.html                       # About page
products.html                    # Products page
partners.html                    # Partners page
contact.html                     # Contact Us page (NEW)

css/
├── styles.css                   # Main stylesheet
└── contact-form.css             # Contact form styles (NEW)

js/
├── i18n.js                      # Translation engine (NEW)
├── form-validation.js           # Form validation & submission (NEW)
└── theme.js                     # Language switcher & persistence (NEW)

data/
├── translations/
│   ├── en.json                  # English translations (NEW)
│   └── fr.json                  # French translations (NEW)
└── contact-info.json            # Company contact information (NEW)

netlify.toml  OR  vercel.json    # Security headers configuration (NEW)
.gitignore                       # Version control exclusions
README.md                        # Project documentation
```

**Structure Decision**: Single static site structure. All pages are static HTML with client-side JavaScript for interactivity (language switching, form validation). Security headers configured via hosting platform (Netlify or Vercel) rather than a web server.

## Implementation Approach

### Bilingual Support (English/French)

**Approach**: JSON-based i18n using vanilla JavaScript
- Two translation files: `data/translations/en.json` and `data/translations/fr.json`
- JavaScript module `js/i18n.js` loads and applies translations
- Language preference stored in `localStorage` under key `siteLanguage`
- HTML `lang` attribute updated on `<html>` element to reflect current language
- Language switcher in navigation bar toggles between EN/FR

**Key Design Decisions**:
1. No i18n framework (i18n-js, i18next, etc.) — too heavy for static site
2. Translation keys structured as flat namespace (e.g., `nav.contactUs`, `form.nameLabel`)
3. Language defaults to browser language if localStorage is empty; fallback to English
4. Language persistence: localStorage survives page navigation and browser reload

### Contact Form (Formspree Integration)

**Approach**: Vanilla JavaScript form submission to Formspree
- HTML form with fields: name, email, subject, message
- Client-side validation in `js/form-validation.js`
- Form submits via POST to Formspree endpoint (`https://formspree.io/f/{FORM_ID}`)
- Loading state: linear progress bar during submission, disabled submit button
- Success/error messages shown after submission
- Form data preserved on validation errors; cleared on successful/error submission
- CSRF token handled by Formspree

**Key Design Decisions**:
1. Vanilla JavaScript form submission (fetch or XMLHttpRequest) — no jQuery
2. Client-side validation catches errors before POST (faster feedback)
3. Formspree endpoint configured in `contact.html` or environment (not hardcoded)
4. Progress bar is CSS-animated fake progress (no real progress tracking)
5. Form data stored temporarily in memory; no persistent local storage of submissions

### Security Hardening

**Approach**: Security headers via hosting platform configuration + client-side input sanitization

**Hosting Platform Configuration** (Netlify or Vercel):
- HTTPS enforcement (automatic)
- Content-Security-Policy (CSP) header:
  - Default: `default-src 'self'`
  - Script: `script-src 'self' https://formspree.io`
  - Font: `font-src 'self' https://fonts.gstatic.com`
  - Connect: `connect-src 'self' https://formspree.io`
  - Style: `style-src 'self' 'unsafe-inline'` (if CSS-in-head; otherwise remove `unsafe-inline`)
- Strict-Transport-Security (HSTS): `max-age=31536000; includeSubDomains`
- X-Content-Type-Options: `nosniff`
- Referrer-Policy: `no-referrer` or `strict-origin-when-cross-origin`
- X-Frame-Options: `DENY` (prevent clickjacking)

**Client-Side Input Sanitization**:
- Form validation in `js/form-validation.js`:
  - Email: regex validation (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)
  - Required fields: non-empty check
  - Message: length check (e.g., max 5000 characters)
  - XSS prevention: sanitize HTML by escaping `<`, `>`, `&`, `"`, `'` before display
- No `innerHTML` usage; use `textContent` or `innerText` for user input display
- Form submission via `fetch()` with `Content-Type: application/json` (Formspree accepts both)

**Key Design Decisions**:
1. Security headers via platform config (netlify.toml or vercel.json) — no middleware
2. CSP strict but allows Formspree endpoint and Google Fonts (if used)
3. Input sanitization prevents stored/reflected XSS
4. No sensitive data (API keys, Formspree endpoint secrets) in client-side code
5. Company email in `data/contact-info.json` is not a submission target (only Formspree)

## Complexity Tracking

No constitutional violations. Implementation is straightforward and aligns with simplicity-first principles.

| Area | Justification |
|------|---------------|
| Vanilla JS i18n module | Avoids heavy framework; JSON files are maintainable and cacheable |
| Formspree integration | Third-party eliminates backend complexity; client-side validation is sufficient |
| Platform-level security | Cleaner than custom middleware; CSP properly protects against common attacks |

---

## Next Phase

**Phase 0: Research** (if needed)
- All technical choices are explicit per user input; research step may be minimal
- Output: `research.md` documenting decisions

**Phase 1: Design & Contracts**
- Output: `data-model.md`, `quickstart.md`, `/contracts/`

**Phase 2: Tasks** (via `/speckit-tasks`)
- Output: `tasks.md` with dependency-ordered implementation tasks

---

**Document Status**: ✅ Ready for Phase 0 research and Phase 1 design
