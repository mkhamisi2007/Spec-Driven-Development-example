# Translation JSON Contract

**Date**: 2026-06-21  
**Format**: JSON  
**Scope**: i18n translation files for English and French

## Overview

Translation files store all user-facing text strings in a structured JSON format. Two files are required:
- `data/translations/en.json` — English translations
- `data/translations/fr.json` — French translations

Both files follow the same schema (same keys, different values).

---

## File Structure

### Root Level
The translation file is a single JSON object with top-level keys representing content sections.

### Sections

#### 1. Navigation (`nav`)
UI text for site navigation bar.

```javascript
"nav": {
  "home": string,
  "about": string,
  "products": string,
  "partners": string,
  "contact": string
}
```

**Example** (English):
```json
"nav": {
  "home": "Home",
  "about": "About Us",
  "products": "Products",
  "partners": "Partners",
  "contact": "Contact Us"
}
```

**Example** (French):
```json
"nav": {
  "home": "Accueil",
  "about": "À propos de nous",
  "products": "Produits",
  "partners": "Partenaires",
  "contact": "Nous contacter"
}
```

#### 2. Form (`form`)
Labels, placeholders, validation messages, and button text for the contact form.

```javascript
"form": {
  "nameLabel": string,           // Input label
  "namePlaceholder": string,     // Input placeholder
  "nameRequired": string,        // Validation error message
  "emailLabel": string,
  "emailPlaceholder": string,
  "emailRequired": string,
  "emailInvalid": string,        // Email format validation error
  "subjectLabel": string,
  "subjectPlaceholder": string,
  "subjectRequired": string,
  "messageLabel": string,
  "messagePlaceholder": string,
  "messageRequired": string,
  "submitButton": string,        // Submit button text
  "loadingMessage": string,      // Progress bar text
  "successMessage": string,      // Success notification
  "errorMessage": string         // Generic error notification
}
```

**Example** (English):
```json
"form": {
  "nameLabel": "Your Name",
  "namePlaceholder": "John Doe",
  "nameRequired": "Name is required",
  "emailLabel": "Email Address",
  "emailPlaceholder": "john@example.com",
  "emailRequired": "Email is required",
  "emailInvalid": "Please enter a valid email address",
  "subjectLabel": "Subject",
  "subjectPlaceholder": "What is this about?",
  "subjectRequired": "Subject is required",
  "messageLabel": "Message",
  "messagePlaceholder": "Tell us more...",
  "messageRequired": "Message is required",
  "submitButton": "Send Message",
  "loadingMessage": "Sending your message...",
  "successMessage": "Thank you! Your message has been sent successfully.",
  "errorMessage": "Failed to send message. Please try again."
}
```

**Example** (French):
```json
"form": {
  "nameLabel": "Votre nom",
  "namePlaceholder": "Jean Dupont",
  "nameRequired": "Le nom est requis",
  "emailLabel": "Adresse e-mail",
  "emailPlaceholder": "jean@exemple.com",
  "emailRequired": "L'e-mail est requis",
  "emailInvalid": "Veuillez entrer une adresse e-mail valide",
  "subjectLabel": "Sujet",
  "subjectPlaceholder": "De quoi s'agit-il?",
  "subjectRequired": "Le sujet est requis",
  "messageLabel": "Message",
  "messagePlaceholder": "Dites-nous plus...",
  "messageRequired": "Le message est requis",
  "submitButton": "Envoyer le message",
  "loadingMessage": "Envoi de votre message...",
  "successMessage": "Merci! Votre message a été envoyé avec succès.",
  "errorMessage": "Échec de l'envoi du message. Veuillez réessayer."
}
```

#### 3. Contact Page (`contact`)
Heading, descriptions, and company contact information display.

```javascript
"contact": {
  "pageTitle": string,
  "pageDescription": string,
  "formHeading": string,
  "infoHeading": string,
  "addressLabel": string,
  "emailLabel": string,
  "phoneLabel": string,
  "businessHoursLabel": string
}
```

**Example** (English):
```json
"contact": {
  "pageTitle": "Contact Us",
  "pageDescription": "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
  "formHeading": "Send us a Message",
  "infoHeading": "Contact Information",
  "addressLabel": "Address",
  "emailLabel": "Email",
  "phoneLabel": "Phone",
  "businessHoursLabel": "Business Hours"
}
```

**Example** (French):
```json
"contact": {
  "pageTitle": "Nous contacter",
  "pageDescription": "Nous aimerions avoir de vos nouvelles. Envoyez-nous un message et nous répondrons dès que possible.",
  "formHeading": "Envoyez-nous un message",
  "infoHeading": "Coordonnées",
  "addressLabel": "Adresse",
  "emailLabel": "E-mail",
  "phoneLabel": "Téléphone",
  "businessHoursLabel": "Heures d'ouverture"
}
```

---

## Complete File Template

### en.json
```json
{
  "nav": {
    "home": "Home",
    "about": "About Us",
    "products": "Products",
    "partners": "Partners",
    "contact": "Contact Us"
  },
  "form": {
    "nameLabel": "Your Name",
    "namePlaceholder": "John Doe",
    "nameRequired": "Name is required",
    "emailLabel": "Email Address",
    "emailPlaceholder": "john@example.com",
    "emailRequired": "Email is required",
    "emailInvalid": "Please enter a valid email address",
    "subjectLabel": "Subject",
    "subjectPlaceholder": "What is this about?",
    "subjectRequired": "Subject is required",
    "messageLabel": "Message",
    "messagePlaceholder": "Tell us more...",
    "messageRequired": "Message is required",
    "submitButton": "Send Message",
    "loadingMessage": "Sending your message...",
    "successMessage": "Thank you! Your message has been sent successfully.",
    "errorMessage": "Failed to send message. Please try again."
  },
  "contact": {
    "pageTitle": "Contact Us",
    "pageDescription": "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
    "formHeading": "Send us a Message",
    "infoHeading": "Contact Information",
    "addressLabel": "Address",
    "emailLabel": "Email",
    "phoneLabel": "Phone",
    "businessHoursLabel": "Business Hours"
  }
}
```

### fr.json
```json
{
  "nav": {
    "home": "Accueil",
    "about": "À propos de nous",
    "products": "Produits",
    "partners": "Partenaires",
    "contact": "Nous contacter"
  },
  "form": {
    "nameLabel": "Votre nom",
    "namePlaceholder": "Jean Dupont",
    "nameRequired": "Le nom est requis",
    "emailLabel": "Adresse e-mail",
    "emailPlaceholder": "jean@exemple.com",
    "emailRequired": "L'e-mail est requis",
    "emailInvalid": "Veuillez entrer une adresse e-mail valide",
    "subjectLabel": "Sujet",
    "subjectPlaceholder": "De quoi s'agit-il?",
    "subjectRequired": "Le sujet est requis",
    "messageLabel": "Message",
    "messagePlaceholder": "Dites-nous plus...",
    "messageRequired": "Le message est requis",
    "submitButton": "Envoyer le message",
    "loadingMessage": "Envoi de votre message...",
    "successMessage": "Merci! Votre message a été envoyé avec succès.",
    "errorMessage": "Échec de l'envoi du message. Veuillez réessayer."
  },
  "contact": {
    "pageTitle": "Nous contacter",
    "pageDescription": "Nous aimerions avoir de vos nouvelles. Envoyez-nous un message et nous répondrons dès que possible.",
    "formHeading": "Envoyez-nous un message",
    "infoHeading": "Coordonnées",
    "addressLabel": "Adresse",
    "emailLabel": "E-mail",
    "phoneLabel": "Téléphone",
    "businessHoursLabel": "Heures d'ouverture"
  }
}
```

---

## Key Naming Conventions

### Rules

1. **Flat Namespace**: Use dot notation for nesting (e.g., `nav.home`, `form.nameLabel`)
2. **Camel Case**: Keys use camelCase (e.g., `nameLabel`, not `name_label`)
3. **Semantic Naming**: Names reflect content purpose (e.g., `nameRequired` is the error message when name is missing)
4. **Consistency**: Same key exists in both `en.json` and `fr.json`
5. **No Duplicates**: Each key appears exactly once per file

### Examples

| Key | Purpose |
|-----|---------|
| `nav.home` | Navigation link text for home page |
| `form.nameLabel` | Label text for name input field |
| `form.nameRequired` | Validation error when name is empty |
| `form.emailInvalid` | Validation error when email format is wrong |
| `contact.pageTitle` | Page heading for contact page |

---

## Validation Rules

1. **Valid JSON**: Files must be valid JSON (no syntax errors)
2. **Same Keys**: Both `en.json` and `fr.json` must have identical key structure
3. **Non-Empty Values**: All string values must be non-empty (no empty strings `""`)
4. **UTF-8 Encoding**: Files must be UTF-8 encoded
5. **No Circular References**: No key references another key
6. **No Special Escapes**: No template variables or placeholders (values are static strings)

---

## Usage in Code

### Loading Translations (JavaScript)

```javascript
// Fetch translation file for current language
const language = localStorage.getItem('siteLanguage') || 'en';
const response = await fetch(`/data/translations/${language}.json`);
const translations = await response.json();

// Access translation
const nameLabel = translations.form.nameLabel;
console.log(nameLabel); // "Your Name" (en) or "Votre nom" (fr)
```

### Applying to HTML

```html
<!-- HTML with data-i18n attribute -->
<label data-i18n="form.nameLabel">Your Name</label>

<!-- JavaScript applies translation -->
document.querySelector('[data-i18n="form.nameLabel"]').textContent = translations.form.nameLabel;
```

---

## File Locations

- **English**: `/data/translations/en.json`
- **French**: `/data/translations/fr.json`

Both files located in `data/translations/` directory relative to site root.

---

## Size & Performance

| File | Target Size | Typical Size |
|------|-------------|-------------|
| en.json | <20 KB | ~15 KB |
| fr.json | <20 KB | ~15 KB |
| Both (gzipped) | <10 KB | ~6 KB |

Files are cached by browser; minimal impact on page load time.

---

## Testing Checklist

- [ ] Both `en.json` and `fr.json` exist in `data/translations/`
- [ ] Both files are valid JSON (no syntax errors)
- [ ] Both files have identical key structure (same sections and keys)
- [ ] All string values are non-empty
- [ ] No duplicate keys within a file
- [ ] Files are UTF-8 encoded
- [ ] Navigation keys match navbar UI elements
- [ ] Form keys match all form labels, placeholders, and error messages
- [ ] Contact page keys match page content
- [ ] French translations are accurate (not machine-generated)

---

## Contract Status

✅ **COMPLETE** | **Verified**: JSON Schema v7 compliant | **Ready for Implementation**
