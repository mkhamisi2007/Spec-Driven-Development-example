# Data Model: International Contact Form & Security Hardening

**Date**: 2026-06-21  
**Feature**: International Contact Form & Security Hardening  
**Status**: ✅ Complete

## Overview

This document defines the data structures, entities, and relationships for the contact form, translation system, and language preference storage.

---

## Entities

### 1. Contact Form Submission

**Purpose**: Captures user inquiry data before submission to Formspree

**Structure**:
```javascript
{
  name: string,           // User's full name (required, non-empty)
  email: string,          // User's email address (required, valid email format)
  subject: string,        // Inquiry subject (required, non-empty)
  message: string         // Inquiry message (required, non-empty, max 5000 characters)
}
```

**Field Specifications**:

| Field | Type | Constraints | Validation |
|-------|------|-------------|-----------|
| name | string | Required, max 255 characters | Non-empty, no special injection patterns |
| email | string | Required, valid email format | Regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` |
| subject | string | Required, max 500 characters | Non-empty, no special injection patterns |
| message | string | Required, max 5000 characters | Non-empty, length check |

**Validation Rules**:
1. All fields are required (non-empty)
2. Email must match valid email format
3. Name, subject, message must not contain unescaped HTML characters (`<`, `>`, `&`, `"`, `'`)
4. Message limited to 5000 characters (prevents extremely large submissions)
5. No line breaks or special encoding in submission (sent as plain text via Formspree)

**State Transitions**:
- **Initial**: Form empty, ready for input
- **Partial**: User filling form, unsaved data in memory
- **Validation Failed**: User submits with errors; form data preserved; error messages shown
- **Validation Passed**: User submits valid data; progress bar shown; submit button disabled
- **Submitting**: Form data sent to Formspree; awaiting response
- **Success**: Formspree confirmed receipt; success message shown; form cleared
- **Error**: Formspree failed or network error; error message shown; form cleared; user can retry

**Storage**: Form data exists only in memory (input fields); not persisted to localStorage or server until submitted

### 2. Language Preference

**Purpose**: Stores user's selected language and enables persistence across sessions

**Structure**:
```javascript
{
  language: string,       // "en" or "fr" (required, exactly one of these values)
  timestamp: number       // Milliseconds since epoch (optional, for audit)
}
```

**Field Specifications**:

| Field | Type | Constraints | Default |
|-------|------|-------------|---------|
| language | enum | "en" or "fr" | Browser language or "en" |
| timestamp | number | Epoch milliseconds | Not stored (optional) |

**Valid Values**:
- `"en"`: English
- `"fr"`: French

**Fallback Rules**:
1. Check `localStorage['siteLanguage']`
   - If "en" or "fr" found, use that language
2. If not found, check `navigator.language`
   - If starts with "fr" (e.g., "fr-CA", "fr-FR"), use "fr"
   - Otherwise use "en" (default)
3. Store selected language in `localStorage['siteLanguage']`

**Storage**: `window.localStorage['siteLanguage']` persists across:
- Page navigation (within same site)
- Browser reload
- Browser close/reopen (until localStorage cleared)

**Scope**: Per domain (language preference shared across all pages on the site)

### 3. Translation Dictionary

**Purpose**: Stores translated strings for UI elements and messages

**Structure** (per language file):
```javascript
{
  "nav": {
    "home": string,
    "about": string,
    "products": string,
    "partners": string,
    "contact": string
  },
  "form": {
    "nameLabel": string,
    "nameRequired": string,
    "emailLabel": string,
    "emailRequired": string,
    "emailInvalid": string,
    "subjectLabel": string,
    "subjectRequired": string,
    "messageLabel": string,
    "messageRequired": string,
    "submitButton": string,
    "loadingMessage": string,
    "successMessage": string,
    "errorMessage": string
  },
  "contact": {
    "pageTitle": string,
    "pageDescription": string,
    "addressLabel": string,
    "address": string,
    "emailLabel": string,
    "email": string,
    "phoneLabel": string,
    "phone": string
  }
}
```

**Namespace Structure**:
- Flat keys with dot notation: `nav.home`, `form.nameLabel`, `contact.pageTitle`
- Organized by UI section (nav, form, contact, etc.)
- Language-specific messages grouped under `form` and `contact` sections

**Files**:
- `data/translations/en.json`: English translations
- `data/translations/fr.json`: French translations

**Encoding**: UTF-8 (supports accented characters, special characters)

**File Size Target**: <20KB each (uncompressed); <5KB each (gzipped)

### 4. Contact Information

**Purpose**: Stores company contact details displayed on Contact Us page

**Structure** (`data/contact-info.json`):
```javascript
{
  "address": {
    "street": string,
    "city": string,
    "state": string,
    "postalCode": string,
    "country": string
  },
  "email": string,            // Not used for form submission (Formspree handles that)
  "phone": string,
  "businessHours": {
    "weekdays": string,
    "weekends": string,
    "timezone": string
  }
}
```

**Example**:
```json
{
  "address": {
    "street": "123 Main Street",
    "city": "Montreal",
    "state": "QC",
    "postalCode": "H1A 1A1",
    "country": "Canada"
  },
  "email": "info@company.com",
  "phone": "+1 (555) 123-4567",
  "businessHours": {
    "weekdays": "Monday-Friday, 9:00 AM - 5:00 PM",
    "weekends": "Closed",
    "timezone": "Eastern Time (ET)"
  }
}
```

**Security Note**: Email stored here is for display only. Form submission goes to Formspree endpoint (not this email address).

---

## Relationships

### Form → Language

- Form submission is submitted in the language currently selected by the user
- Language preference does NOT change based on form submission
- Form labels, placeholders, error messages, and success messages all display in the selected language

### Form → Contact Information

- Contact information and form exist on the same Contact Us page
- Contact information is displayed above or alongside the form
- Both are translated based on user's language preference

### Language Preference → Translation Dictionary

- Selected language determines which translation file is loaded
- Language preference value ("en" or "fr") maps directly to file name (en.json, fr.json)
- When language changes, all DOM elements with `data-i18n` attribute are updated with new translations

---

## Validation Rules

### Form Field Validation

**Name Field**:
- Required: non-empty
- Max length: 255 characters
- No HTML injection: Sanitize before display
- Validation message (if invalid): "Name is required" (or French equivalent)

**Email Field**:
- Required: non-empty
- Format: Must match `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- No validation on domain existence (Formspree handles)
- Validation messages:
  - If empty: "Email is required"
  - If invalid format: "Please enter a valid email"

**Subject Field**:
- Required: non-empty
- Max length: 500 characters
- No HTML injection: Sanitize before display
- Validation message: "Subject is required"

**Message Field**:
- Required: non-empty
- Max length: 5000 characters
- No HTML injection: Sanitize before display
- Validation messages:
  - If empty: "Message is required"
  - If too long: "Message must be less than 5000 characters"

### Language Validation

- Language value must be exactly "en" or "fr"
- Invalid values ignored; fallback to detected or default language
- No custom/undeclared languages supported

---

## State Consistency Rules

1. **Form ↔ Language**: Form data and language preference are independent; changing language does NOT clear form data
2. **Language ↔ DOM**: Changing language updates all DOM elements marked with `data-i18n` attribute
3. **Form ↔ Submission**: Once form submitted successfully, all form fields cleared; on error, form cleared (not preserved)
4. **Persistence**: Language preference persists; form data does not (lives only in memory during editing)

---

## Security Constraints

1. **No Sensitive Data in Form**: Formspree endpoint ID and credentials NOT hardcoded in form submission; configured separately
2. **Input Sanitization**: All user input sanitized before display to prevent XSS
3. **Email Not Exposed**: Company email in `contact-info.json` is for display; Formspree handles actual email routing
4. **No File Upload**: Contact form does not support file attachments
5. **No User Tracking**: Language preference stored locally; no analytics or tracking data collected
6. **CSP Compliance**: All external resources (Formspree, fonts) whitelisted in Content-Security-Policy header

---

## Data Flow Diagram

```
User Input (Form)
    ↓
Client-Side Validation (JS)
    ├─ If Invalid → Show Error Messages → Form Data Preserved
    └─ If Valid → Show Progress Bar → Fetch to Formspree
           ↓
    Formspree API
    ├─ If Success → Show Success Message → Clear Form
    └─ If Error → Show Error Message → Clear Form

Language Selection
    ↓
Store in localStorage['siteLanguage']
    ↓
Load Translation File (en.json or fr.json)
    ↓
Apply Translations to DOM (data-i18n attributes)
    ↓
Update <html lang="en"> or <html lang="fr">
```

---

## Size & Performance Targets

| Data | Size (uncompressed) | Size (gzipped) | Target |
|------|-------------------|-----------------|--------|
| en.json | <20 KB | <5 KB | ✅ Meets budget |
| fr.json | <20 KB | <5 KB | ✅ Meets budget |
| contact-info.json | <2 KB | <1 KB | ✅ Meets budget |
| i18n.js | ~8 KB | ~3 KB | ✅ Meets budget |
| form-validation.js | ~12 KB | ~4 KB | ✅ Meets budget |
| contact-form.css | ~5 KB | ~2 KB | ✅ Meets budget |
| **Total JS** | ~20 KB | ~7 KB | ✅ Meets <50KB budget |
| **Total CSS** | ~5 KB | ~2 KB | ✅ Meets <30KB budget |

---

**Data Model Status**: ✅ COMPLETE | **Ready for**: Quickstart & Contracts
