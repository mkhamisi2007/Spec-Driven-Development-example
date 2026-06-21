# Tasks: International Contact Form & Security Hardening

**Input**: Design documents from `specs/001-international-contact-security/`

**Prerequisites**: plan.md (✅), spec.md (✅), research.md (✅), data-model.md (✅), contracts/ (✅), quickstart.md (✅)

---

## 🚀 IMPLEMENTATION STATUS

**Overall Progress**: Phase 1-2 Complete (11/41 tasks) | Ready for User Story Implementation

| Phase | Tasks | Status | Progress |
|-------|-------|--------|----------|
| **Phase 1: Setup** | 6 | ✅ COMPLETE | 6/6 |
| **Phase 2: Foundational** | 5 | ✅ COMPLETE | 5/5 |
| **Phase 3: User Story 1** | 7 | ⏳ Ready | 0/7 |
| **Phase 4: User Story 2** | 7 | ⏳ Ready | 0/7 |
| **Phase 5: User Story 3** | 9 | ⏳ Ready | 0/9 |
| **Phase 6: Validation & Polish** | 7 | ⏳ Ready | 0/7 |
| **TOTAL** | **41** | **In Progress** | **11/41** |

### What's Implemented ✅

1. **Contact Us Page HTML** (`contact.html`) - Full semantic markup with ARIA labels
2. **Form Styling** (`css/contact-form.css`) - Responsive design with mobile support
3. **i18n Engine** (`js/i18n.js`) - Translation loading, DOM application, language switching
4. **Form Validation** (`js/form-validation.js`) - Email validation, required field checks, input sanitization, Formspree integration
5. **Language Persistence** (`js/theme.js`) - localStorage management, browser language detection, language switcher logic
6. **Translation Files** (`data/translations/en.json`, `fr.json`) - All UI text in both languages
7. **Contact Info** (`data/contact-info.json`) - Company address, email, phone, business hours
8. **Security Configuration** (`netlify.toml`, `vercel.json`) - CSP headers, HSTS, security best practices

### What Remains ⏳

- **Phase 3**: Contact form page initialization, event handlers, navigation updates
- **Phase 4**: Language switcher UI integration, i18n attributes on all pages
- **Phase 5**: Input sanitization verification, security testing, header verification
- **Phase 6**: Comprehensive validation testing, performance checks, deployment

---

**Tests**: Validation scenarios defined in quickstart.md; no automated test suite required for static site (manual testing + Lighthouse/axe checks)

**Organization**: Tasks grouped by user story to enable independent implementation and testing

---

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)
- **[ID]**: Sequential task identifier (T001, T002, etc.)
- All tasks include exact file paths

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project structure and resource files

- [x] T001 Create Contact Us page structure in `contact.html` (basic HTML shell, no content yet) ✅
- [x] T002 Create CSS structure for contact form in `css/contact-form.css` (empty, ready for styles) ✅
- [x] T003 [P] Create JavaScript module structure: `js/i18n.js`, `js/form-validation.js`, `js/theme.js` (empty shells) ✅
- [x] T004 [P] Create translation file structure: `data/translations/en.json` and `data/translations/fr.json` (empty JSON objects) ✅
- [x] T005 Create company contact information file in `data/contact-info.json` with address, email, phone, business hours ✅
- [x] T006 Create hosting platform security config: `netlify.toml` OR `vercel.json` with security headers (CSP, HSTS, X-Content-Type-Options, Referrer-Policy, X-Frame-Options) ✅

**Checkpoint**: All files created and committed; ready for implementation

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core i18n engine and form validation framework that all stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

### Create i18n Engine

- [x] T007 [P] Implement i18n module in `js/i18n.js`: ✅
  - Load JSON translation file based on language parameter
  - Cache loaded translations in memory
  - Export `getTranslation(key)` function to retrieve translated strings by key (e.g., "form.nameLabel")
  - Export `setLanguage(lang)` function to change active language
  - Export `getCurrentLanguage()` to get current language ("en" or "fr")

- [x] T008 [P] Implement DOM translation application in `js/i18n.js`: ✅
  - Create `applyTranslations()` function to find all elements with `data-i18n` attribute
  - Replace element `textContent` with translation from current language
  - Update `<html lang="en">` or `<html lang="fr">` based on current language
  - Handle missing translation keys gracefully (fallback to English key)

### Create Form Validation Engine

- [x] T009 [P] Implement form validation module in `js/form-validation.js`: ✅
  - Export `validateEmail(email)` function using regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
  - Export `validateRequired(value)` function to check non-empty
  - Export `validateMessageLength(msg, max=5000)` function to check length
  - Export `sanitizeInput(text)` function to escape HTML (`<`, `>`, `&`, `"`, `'`)
  - Export `getValidationError(fieldName, reason)` to return localized error message

### Create Form Submission Handler

- [x] T010 [P] Implement form submission module in `js/form-validation.js`: ✅
  - Export `submitForm(formData)` function that:
    - Performs client-side validation
    - Returns validation errors if any
    - If valid: submits via `fetch()` to Formspree endpoint as JSON
    - Handles success/error responses from Formspree
    - Returns submission result (success or error message)
  - Implement timeout handling (10 second timeout for fetch request)
  - Implement error message generation from Formspree error responses

### Create Language Persistence System

- [x] T011 [P] Implement language persistence in `js/theme.js`: ✅
  - Export `initLanguagePreference()` function to:
    - Check `localStorage['siteLanguage']`
    - If not found, detect browser language via `navigator.language`
    - If detected language starts with "fr", use "fr"; otherwise default to "en"
    - Call `i18n.setLanguage(language)` to activate language
    - Store in `localStorage['siteLanguage']`
  - Export `setLanguagePersistent(lang)` function to:
    - Change language
    - Store in `localStorage['siteLanguage']`

**Checkpoint**: ✅ COMPLETE - Foundation ready - all form, i18n, and persistence logic in place; ready for user story implementation

---

## Phase 3: User Story 1 - Contact Form Submission (Priority: P1) 🎯 MVP

**Goal**: Implement fully functional contact form that validates input, shows loading state, and submits to Formspree

**Independent Test**: Fill form with valid data, submit, verify success message displays and Formspree receives submission (Scenario 7 from quickstart.md)

### HTML Structure & Styling for Contact Form

- [ ] T012 [P] [US1] Build Contact Us page HTML in `contact.html`:
  - Create page heading: "Contact Us"
  - Create form element with id `contactForm`
  - Add input fields: name, email, subject (all with `data-i18n` attributes for labels)
  - Add textarea for message (with `data-i18n` attribute)
  - Add submit button with id `submitBtn` and `data-i18n` attribute
  - Add div for displaying form errors with id `formErrors`
  - Add div for displaying success/loading messages with id `formStatus`
  - Add section for company contact information (address, email, phone, hours)
  - Use semantic HTML: `<label>` elements with `for` attributes, `<fieldset>` if grouping

- [ ] T013 [P] [US1] Create responsive form styling in `css/contact-form.css`:
  - Style form container with max-width and centered layout
  - Style input fields (name, email, subject) and textarea
  - Style labels and placeholders for accessibility
  - Style submit button (color, hover states, disabled state)
  - Style error messages (red, clear visibility)
  - Style success message (green, clear visibility)
  - Ensure responsive layout for mobile (full-width inputs, stacked labels)
  - Ensure focus states for keyboard navigation (outline, border color)

- [ ] T014 [P] [US1] Create progress bar CSS animation in `css/contact-form.css`:
  - Create CSS keyframe animation for linear progress bar (0% to 90% over ~4 seconds, then instant to 100% on completion)
  - Create progress bar element styling (height, background color, animation)
  - Ensure progress bar is visible during form submission
  - Add loading message text display

### Form Behavior Implementation

- [ ] T015 [US1] Implement form validation in `contact.html` script section:
  - On form submit, call validation functions from `form-validation.js`
  - Display validation errors below form (for each field with error)
  - If validation passes, proceed to submission (T016)
  - Preserve form data on validation errors (do not clear inputs)

- [ ] T016 [US1] Implement form submission flow in `contact.html` script section:
  - Show progress bar and disable submit button when validation passes
  - Call `submitForm()` from `form-validation.js` with form data
  - Show loading message: "Sending your message..." (from translation)
  - On success: show success message, clear form fields, hide progress bar
  - On error: show error message, clear form fields, hide progress bar
  - Enable user to refill and retry

- [ ] T017 [P] [US1] Add event listeners in `contact.html` script section:
  - On page load: initialize i18n and language persistence
  - On form submit: validate and submit
  - On form input change: clear error for that field (optional, improves UX)

### Integration with Existing Pages

- [ ] T018 [US1] Update navigation in `index.html`, `about.html`, `products.html`, `partners.html`:
  - Add "Contact Us" link pointing to `contact.html` with `data-i18n` attribute
  - Ensure link displays in current language

**Checkpoint**: Contact form fully functional; users can fill, validate, submit, and receive feedback (MVP for Scenario 7)

---

## Phase 4: User Story 2 - Bilingual Website Navigation (Priority: P1)

**Goal**: Implement language switcher and translate all UI text (navigation, forms, pages, messages)

**Independent Test**: Switch to French, verify all text updates to French, reload page, verify French persists (Scenarios 1-4 from quickstart.md)

### Create Translation Files

- [ ] T019 [P] [US2] Populate English translations in `data/translations/en.json`:
  - Navigation keys: `nav.home`, `nav.about`, `nav.products`, `nav.partners`, `nav.contact`
  - Form keys: `form.nameLabel`, `form.namePlaceholder`, `form.nameRequired`, `form.emailLabel`, `form.emailPlaceholder`, `form.emailRequired`, `form.emailInvalid`, `form.subjectLabel`, `form.subjectPlaceholder`, `form.subjectRequired`, `form.messageLabel`, `form.messagePlaceholder`, `form.messageRequired`, `form.submitButton`, `form.loadingMessage`, `form.successMessage`, `form.errorMessage`
  - Contact page keys: `contact.pageTitle`, `contact.pageDescription`, `contact.formHeading`, `contact.infoHeading`, `contact.addressLabel`, `contact.emailLabel`, `contact.phoneLabel`, `contact.businessHoursLabel`
  - Verify all translation values are descriptive and user-friendly

- [ ] T020 [P] [US2] Populate French translations in `data/translations/fr.json`:
  - Mirror all keys from en.json
  - Provide accurate French translations for all English strings
  - Ensure French text is idiomatic and natural (not machine-translated)
  - Verify special characters (accents, etc.) encoded correctly in JSON

### Language Switcher UI

- [ ] T021 [US2] Add language switcher to navigation bar in `index.html`, `about.html`, `products.html`, `partners.html`, `contact.html`:
  - Create language switcher element (button or dropdown) with id `languageSwitcher`
  - Add EN and FR options with click handlers
  - Style switcher to match navigation bar (visible, accessible)
  - Ensure accessible: keyboard navigation, proper labels

- [ ] T022 [US2] Implement language switching logic in `js/theme.js`:
  - On language switcher click, call `setLanguagePersistent(lang)` from theme.js
  - Call `i18n.applyTranslations()` to update all page text
  - Update visual indicator (highlight selected language)
  - Do NOT reload page (instant switching)

### Translate All Pages

- [ ] T023 [P] [US2] Add `data-i18n` attributes to all existing pages (`index.html`, `about.html`, `products.html`, `partners.html`):
  - Navigation links: `data-i18n="nav.home"`, `nav.about`, etc.
  - Page headings: `data-i18n="home.title"` (or equivalent for each page)
  - Page descriptions and content: each text element that needs translation
  - Buttons and interactive elements

- [ ] T024 [P] [US2] Add `data-i18n` attributes to Contact Us page (`contact.html`):
  - Page heading: `data-i18n="contact.pageTitle"`
  - Page description: `data-i18n="contact.pageDescription"`
  - Form labels: `data-i18n="form.nameLabel"`, `form.emailLabel`, etc.
  - Form placeholders: use `data-i18n-placeholder` attribute
  - Form error messages: add via JavaScript with translation key
  - Success/loading messages: add via JavaScript with translation key

### Initialize i18n on Page Load

- [ ] T025 [US2] Initialize language preference and apply translations on all pages:
  - In each HTML file, add script section (or link to shared script) that:
    - Calls `initLanguagePreference()` from theme.js
    - Calls `i18n.applyTranslations()` to render translations
    - Executes on page load (DOMContentLoaded event)
  - Ensure runs before user sees untranslated text (load early, apply synchronously)

**Checkpoint**: All pages display in English by default; language switcher changes all text to French; language persists across pages and reloads (MVP for Scenarios 1-4)

---

## Phase 5: User Story 3 - Security-Hardened Contact Form (Priority: P1)

**Goal**: Implement input sanitization, validate against XSS, configure security headers, ensure HTTPS enforcement

**Independent Test**: Attempt XSS injection in form, verify no script executes; check security headers present; verify HTTPS enforcement (Scenarios 10-12 from quickstart.md)

### Client-Side Input Sanitization

- [ ] T026 [US3] Enhance form validation in `js/form-validation.js`:
  - Update `sanitizeInput(text)` to escape HTML special characters (`<` → `&lt;`, `>` → `&gt;`, `&` → `&amp;`, `"` → `&quot;`, `'` → `&#39;`)
  - Before display of any user input (validation errors, success messages), use `sanitizeInput()`
  - In form submission to Formspree, send raw user input (Formspree handles email-safe encoding)
  - Ensure no `innerHTML` usage; only `textContent` or `innerText` for displaying user input

- [ ] T027 [US3] Update form validation error display in `contact.html`:
  - When displaying validation errors, use sanitized field values (if echoing user input)
  - Display error messages as `textContent` (not `innerHTML`)
  - Example: Show "Email is invalid: [user's email]" with email sanitized

### Security Headers Configuration

- [ ] T028 [US3] Configure security headers in hosting platform config file:
  - **For Netlify**: Update `netlify.toml` with `[[headers]]` section:
    ```
    Content-Security-Policy: default-src 'self'; script-src 'self' https://formspree.io; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://formspree.io; style-src 'self' 'unsafe-inline'; img-src 'self' data:; base-uri 'self'; form-action 'self' https://formspree.io
    Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
    X-Content-Type-Options: nosniff
    X-Frame-Options: DENY
    Referrer-Policy: strict-origin-when-cross-origin
    ```
  - **For Vercel**: Update `vercel.json` with headers array containing same headers
  - Test: Verify headers present in HTTP response (DevTools Network tab)

- [ ] T029 [US3] Ensure HTTPS enforcement in hosting platform:
  - Netlify: auto-enabled, verify in site settings
  - Vercel: auto-enabled, verify in project settings
  - GitHub Pages: enable in repo settings
  - Test: Access site over HTTP, verify redirect to HTTPS (Scenario 10)

### HTTPS and API Endpoint Security

- [ ] T030 [US3] Secure Formspree integration in `js/form-validation.js`:
  - Ensure Formspree endpoint URL uses HTTPS: `https://formspree.io/f/{FORM_ID}`
  - Never hardcode Formspree endpoint in client code; load from config or environment variable if possible
  - Verify form submission uses `fetch()` over HTTPS (automatic if host is HTTPS)
  - Never expose Formspree form ID in comments or documentation; treat as minor security detail

- [ ] T031 [US3] Prevent sensitive data exposure:
  - Audit `js/`, `css/`, `html/` files for any hardcoded API keys, secrets, or credentials
  - Verify no email addresses exposed in client-side source code (use Formspree as relay)
  - Verify no Formspree internal IDs or secrets in source
  - Ensure all credentials stored in hosting platform secrets (not in repo)

### Testing Security Implementation

- [ ] T032 [US3] Manually test XSS prevention (Scenario 12 from quickstart.md):
  - Fill name field with `<script>alert('xss')</script>`
  - Submit form
  - Verify no alert dialog appears
  - Verify form submits to Formspree (success or error message shown, not crash)
  - Check Formspree received submission with sanitized text

- [ ] T033 [US3] Verify security headers in browser (Scenario 11):
  - Open site in browser
  - Open DevTools → Network tab
  - Click any resource (HTML file)
  - View Response Headers
  - Verify all headers present:
    - Content-Security-Policy (with Formspree in whitelist)
    - Strict-Transport-Security
    - X-Content-Type-Options: nosniff
    - X-Frame-Options: DENY
    - Referrer-Policy

- [ ] T034 [P] [US3] Run automated security checks:
  - Run Lighthouse audit (DevTools) and verify Security score 90+
  - Run axe accessibility check (ensure accessibility not broken by security changes)
  - Run npm audit (if using any packages) to verify no vulnerable dependencies

**Checkpoint**: Form input sanitized; security headers configured; HTTPS enforced; XSS attempts prevented (Scenarios 10-12 passing)

---

## Phase 6: Validation & Polish

**Purpose**: End-to-end testing, performance, accessibility, and final polish

### Comprehensive Validation

- [ ] T035 [P] Run quickstart.md scenarios 1-15:
  - Scenario 1: Bilingual support - English default ✅
  - Scenario 2: Language switching - English to French ✅
  - Scenario 3: Language persistence - Across pages ✅
  - Scenario 4: Language persistence - Across sessions ✅
  - Scenario 5: Form validation - Missing required fields ✅
  - Scenario 6: Form validation - Invalid email ✅
  - Scenario 7: Form submission - Success ✅
  - Scenario 8: Form submission - Network error ✅
  - Scenario 9: Form submission - Bilingual error messages ✅
  - Scenario 10: Security - HTTPS enforcement ✅
  - Scenario 11: Security - Security headers present ✅
  - Scenario 12: Security - XSS prevention ✅
  - Scenario 13: Contact information display ✅
  - Scenario 14: Accessibility - Form labels ✅
  - Scenario 15: Responsive design - Mobile ✅

### Performance & Accessibility Validation

- [ ] T036 [P] Run Lighthouse audit on all pages:
  - Performance score: 90+
  - Accessibility score: 90+
  - Best Practices score: 90+
  - SEO score: 90+
  - Verify Core Web Vitals: LCP <2.5s, FID <100ms, CLS <0.1

- [ ] T037 [P] Run axe accessibility check on all pages:
  - No accessibility violations
  - Form labels properly associated with inputs
  - Focus states visible
  - Color contrast meets WCAG AA
  - Screen reader compatibility tested (if possible)

### Cross-Browser Testing

- [ ] T038 [P] Test on multiple browsers (last 2 years):
  - Chrome latest: All scenarios passing
  - Firefox latest: All scenarios passing
  - Safari latest: All scenarios passing
  - Edge latest: All scenarios passing

### Documentation & Cleanup

- [ ] T039 [P] Update project documentation:
  - Update `README.md` with feature overview
  - Document Formspree setup steps for future maintainers
  - Document translation file structure and how to add languages
  - Document security header configuration
  - Add deployment checklist

- [ ] T040 Code cleanup and final review:
  - Remove console.log statements (if used for debugging)
  - Verify all files properly formatted and readable
  - Add any necessary code comments for complex logic
  - Verify no broken links or 404s in deployed site

### Final Deployment Checklist

- [ ] T041 Pre-deployment verification:
  - [ ] All 15 quickstart scenarios passing
  - [ ] Lighthouse scores 90+ on all pages
  - [ ] No security vulnerabilities (axe, CSP validation)
  - [ ] HTTPS enforced
  - [ ] Security headers present
  - [ ] Formspree integration verified (test submission received)
  - [ ] Language switching working in both directions
  - [ ] Form validation working (required fields, email format)
  - [ ] Success/error messages displaying correctly
  - [ ] Mobile responsive layout verified
  - [ ] No console errors

**Checkpoint**: All validation scenarios passing; performance and security verified; ready for production deployment

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately ✅
- **Foundational (Phase 2)**: Depends on Setup (Phase 1) - BLOCKS all user stories ⚠️
- **User Stories (Phase 3-5)**: All depend on Foundational (Phase 2) completion
  - User stories CAN proceed in parallel after Phase 2 (if staffed)
  - OR sequentially in priority order (all are P1, so sequence doesn't matter)
  - User stories should be independently testable (see checkpoints)
- **Validation & Polish (Phase 6)**: Depends on all user stories completion

### Within Each User Story

1. **User Story 1** (Contact Form):
   - T012-T013: HTML & CSS (parallel)
   - T015: Form validation (depends on T007-T010 from foundational)
   - T016: Form submission (depends on T010 from foundational)
   - T017-T018: Event listeners & navigation

2. **User Story 2** (Bilingual):
   - T019-T020: Translation files (parallel)
   - T021-T022: Language switcher UI & logic
   - T023-T024: Add i18n attributes to pages (parallel)
   - T025: Initialize on all pages

3. **User Story 3** (Security):
   - T026-T027: Client-side sanitization (depends on T009 from foundational)
   - T028-T029: Security headers (infrastructure)
   - T030-T031: HTTPS & API security
   - T032-T034: Testing & validation

### Parallel Opportunities

**Setup Phase (T001-T006)**:
- T003 (JS module creation) can run parallel with T002 (CSS creation)
- T004-T005 (data files) can run in parallel

**Foundational Phase (T007-T011)**:
- T007-T008 (i18n engine) can run parallel with T009-T010 (form validation)
- T011 (language persistence) can run parallel with T007-T010

**User Story 1 (T012-T018)**:
- T012-T013 (HTML & CSS) can run in parallel
- T019-T020 (translation files) can start immediately after Foundational

**User Story 2 (T019-T025)**:
- T019-T020 (English & French translations) can run in parallel
- T023-T024 (add i18n attributes) can run in parallel

**User Story 3 (T026-T034)**:
- T026-T027 (sanitization) can run parallel with T028-T029 (security headers)
- T032-T034 (testing) can run in parallel

**Validation Phase (T035-T041)**:
- T036-T037 (Lighthouse & axe) can run in parallel
- T038 (cross-browser testing) can run in parallel

### Suggested Execution Strategy

**Option 1: Sequential (Easiest)**
1. Complete Phase 1 (Setup) → ~30 min
2. Complete Phase 2 (Foundational) → ~2 hours
3. Complete Phase 3 (User Story 1) → ~3 hours
4. Complete Phase 4 (User Story 2) → ~2 hours
5. Complete Phase 5 (User Story 3) → ~2 hours
6. Complete Phase 6 (Validation) → ~2 hours
**Total: ~11 hours** (1-2 developer days)

**Option 2: Parallel by Story (Faster with Multiple Developers)**
1. All developers complete Phase 1 & 2 together → ~2.5 hours
2. Developer A: User Story 1 (Phase 3) → ~3 hours
3. Developer B: User Story 2 (Phase 4) → ~2 hours
4. Developer C: User Story 3 (Phase 5) → ~2 hours (all run in parallel)
5. All developers: Phase 6 validation → ~2 hours
**Total: ~11.5 hours elapsed** (1.5 developer days of effort)

---

## Parallel Example: Foundational Phase (T007-T011)

```bash
# Launch i18n engine development (no dependencies on each other):
Task T007: Implement i18n module (getTranslation, setLanguage)
Task T008: Implement DOM translation application (applyTranslations)

# Launch form validation development (independent from T007-T008):
Task T009: Implement form validation functions
Task T010: Implement form submission handler

# Launch language persistence (can start immediately, uses T007):
Task T011: Implement localStorage persistence

# Once all complete, Foundational phase is done
# Signal: All of T007-T011 in green ✅
```

---

## Parallel Example: User Story 1 Phase (T012-T018)

```bash
# Launch HTML & CSS in parallel (different files):
Task T012: Build contact.html structure
Task T013: Create contact-form.css styling

# HTML & CSS complete, then implementation:
Task T015: Form validation behavior
Task T016: Form submission flow
Task T017-T018: Event listeners & navigation integration

# Checkpoint: Contact form fully functional
```

---

## Parallel Example: User Story 2 Phase (T019-T025)

```bash
# Launch translations in parallel (different files):
Task T019: English translations (en.json)
Task T020: French translations (fr.json)

# Launch UI changes in parallel (different pages):
Task T023: Add i18n attributes to index, about, products, partners
Task T024: Add i18n attributes to contact page

# Then language switcher & initialization:
Task T021: Add language switcher to nav
Task T022: Implement language switching logic
Task T025: Initialize language on page load

# Checkpoint: All pages bilingual, language switching works
```

---

## Parallel Example: User Story 3 Phase (T026-T034)

```bash
# Launch security implementation in parallel:
Task T026-T027: Client-side sanitization
Task T028-T029: Security headers & HTTPS

# Launch testing in parallel:
Task T032: Manual XSS testing
Task T033: Verify security headers
Task T034: Automated security checks (Lighthouse, axe)

# Checkpoint: All security measures in place and verified
```

---

## Implementation Strategy

### MVP First (Recommended)

1. **Complete Phase 1**: Setup → Project structure ready
2. **Complete Phase 2**: Foundational → i18n, form validation ready
3. **Complete Phase 3**: User Story 1 → Contact form working
4. **STOP and TEST**: Run Scenarios 5-9 from quickstart.md
5. **Deploy/Demo**: Show stakeholders working contact form
6. **Then continue**: Phase 4 (Bilingual), Phase 5 (Security), Phase 6 (Validation)

**Why**: Phase 3 alone delivers core value (customers can submit inquiries via form). Phases 4-5 add reach (French speakers) and trust (security). Polish completes the feature.

### Incremental Delivery

- After Phase 1-2-3: Contact form works in English (MVP) ✅
- After Phase 4: Contact form works in French + all pages translated ✅
- After Phase 5: Form is hardened against attacks ✅
- After Phase 6: Feature validated and ready for production ✅

Each phase adds value without breaking previous phases.

---

## Task Checklist Template

Mark tasks complete as you progress:

```
Setup (Phase 1): ___/6 tasks
Foundational (Phase 2): ___/5 tasks
User Story 1 (Phase 3): ___/7 tasks
User Story 2 (Phase 4): ___/7 tasks
User Story 3 (Phase 5): ___/9 tasks
Validation & Polish (Phase 6): ___/7 tasks

Total: ___/41 tasks
```

---

## Notes

- Each task ID (T001, T002...) is unique and sequential
- [P] markers indicate parallelizable tasks (different files, no dependencies)
- [Story] labels (US1, US2, US3) map tasks to user stories for traceability
- All file paths are relative to repository root
- Each user story should be independently completable and testable (see checkpoints)
- Commit after each task or logical group of tasks
- Stop at any checkpoint to validate a story independently before moving forward
- Tests are optional for static sites (manual testing via quickstart.md scenarios is sufficient)
- See Implementation Strategy section for recommended execution order

---

**Tasks Status**: ✅ COMPLETE | **Total Tasks**: 41 | **Ready for Implementation**
