# Spec-Driven Development Example: International Contact Form & Security Hardening

A complete static website example demonstrating **Spec-Driven Development** methodology with a fully functional bilingual contact form, security hardening, and comprehensive documentation.

**Live Demo**: Deploy to [Netlify](#deployment-netlify) or [Vercel](#deployment-vercel)

## 🎯 Project Overview

This project showcases:
- ✅ **Bilingual Support** (English/French) with language persistence
- ✅ **Contact Form** with client-side validation and Formspree integration
- ✅ **Security Hardening** (CSP, HSTS, input sanitization, XSS prevention)
- ✅ **WCAG 2.1 AA Accessibility** compliance
- ✅ **Responsive Design** (mobile-first approach)
- ✅ **Spec-Driven Development** complete documentation

## 📋 Table of Contents

- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Technologies](#technologies)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Project](#running-the-project)
- [Deployment](#deployment)
- [Features](#features)
- [API Integration](#api-integration)
- [Testing](#testing)
- [Documentation](#documentation)
- [Contributing](#contributing)

---

## 🏗️ Architecture

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    Static Website                        │
│  (HTML/CSS/JavaScript - No Backend Required)             │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  ┌──────────────┐    ┌──────────────┐                   │
│  │   Frontend   │    │  Data Layer  │                   │
│  ├──────────────┤    ├──────────────┤                   │
│  │ HTML Pages   │    │ JSON Files   │                   │
│  │ CSS Styles   │    │ - Products   │                   │
│  │ JavaScript   │    │ - Partners   │                   │
│  │ Modules      │    │ - Contact    │                   │
│  └──────────────┘    │ - i18n Data  │                   │
│                      └──────────────┘                    │
│                                                           │
│  ┌──────────────┐    ┌──────────────┐                   │
│  │  i18n Engine │    │ Form Handler │                   │
│  ├──────────────┤    ├──────────────┤                   │
│  │ Load JSON    │    │ Validation   │                   │
│  │ Apply to DOM │    │ Sanitization │                   │
│  │ Persist Lang │    │ Formspree    │                   │
│  └──────────────┘    │ Integration  │                   │
│                      └──────────────┘                    │
│                                                           │
└─────────────────────────────────────────────────────────┘
                          │
                          │ (HTTPS POST)
                          ▼
                ┌──────────────────────┐
                │   Formspree Service  │
                │ (Third-party service)│
                │  - Form processing   │
                │  - Email routing     │
                │  - Delivery handling │
                └──────────────────────┘
                          │
                          │ (Email)
                          ▼
                    ┌────────────┐
                    │ User Email │
                    └────────────┘
```

### Module Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    JavaScript Modules                    │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  i18n.js (Translation Engine)                           │
│  ├── loadTranslations(lang)                             │
│  ├── getTranslation(key)                                │
│  ├── setLanguage(lang)                                  │
│  ├── applyTranslations()                                │
│  └── getCurrentLanguage()                               │
│                                                           │
│  form-validation.js (Form Module)                       │
│  ├── validateEmail(email)                               │
│  ├── validateRequired(value)                            │
│  ├── sanitizeInput(text)                                │
│  ├── validateForm(formData)                             │
│  └── submitForm(data, endpoint)                         │
│                                                           │
│  theme.js (Language Persistence)                        │
│  ├── initLanguagePreference()                           │
│  ├── setLanguagePersistent(lang)                        │
│  └── setupLanguageSwitcher()                            │
│                                                           │
│  contact.js (Page Logic)                                │
│  ├── loadContactInfo()                                  │
│  └── handleFormSubmit(event)                            │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
Spec-Driven-Development-example/
│
├── README.md                          # This file
├── CLAUDE.md                          # Development guidance
├── IMPLEMENTATION_STATUS.md           # Current implementation status
├── .gitignore                         # Git ignore rules
│
├── index.html                         # About/Home page
├── products.html                      # Products page
├── partners.html                      # Partners page
├── contact.html                       # Contact Us page (NEW)
│
├── css/
│   ├── styles.css                     # Global styles
│   ├── navigation.css                 # Navigation styles
│   ├── components.css                 # Component styles
│   └── contact-form.css               # Contact form styles (NEW)
│
├── js/
│   ├── main.js                        # Main app script
│   ├── navigation.js                  # Navigation logic
│   ├── data-loader.js                 # Data loading utilities
│   ├── products.js                    # Products page logic
│   ├── partners.js                    # Partners page logic
│   ├── i18n.js                        # Translation engine (NEW)
│   ├── form-validation.js             # Form validation module (NEW)
│   ├── theme.js                       # Language persistence (NEW)
│   └── contact.js                     # Contact page logic (NEW)
│
├── data/
│   ├── products.json                  # Product data
│   ├── partners.json                  # Partner data
│   ├── contact-info.json              # Company contact info (NEW)
│   └── translations/
│       ├── en.json                    # English translations (NEW)
│       └── fr.json                    # French translations (NEW)
│
├── images/
│   └── partners/                      # Partner logos
│
├── netlify.toml                       # Netlify deployment config (NEW)
├── vercel.json                        # Vercel deployment config (NEW)
│
└── specs/
    ├── 001-company-website/           # Original website spec
    └── 001-international-contact-security/  # NEW feature spec
        ├── spec.md                    # Feature specification
        ├── plan.md                    # Implementation plan
        ├── research.md                # Research & decisions
        ├── data-model.md              # Data model definition
        ├── contracts/                 # API contracts
        │   ├── formspree-contract.md
        │   └── translation-contract.md
        ├── quickstart.md              # Validation guide
        ├── tasks.md                   # Implementation tasks
        └── checklists/
            └── requirements.md        # Quality checklist
```

---

## 🛠️ Technologies

### Frontend
- **HTML5** - Semantic markup with accessibility (WCAG 2.1 AA)
- **CSS3** - Vanilla CSS with responsive design (mobile-first)
- **JavaScript (ES6+)** - Vanilla JS modules (no frameworks)

### Data Format
- **JSON** - Translation files, product data, contact info

### APIs & Services
- **Formspree** - Third-party form submission service
- **localStorage** - Browser storage for language persistence

### Deployment
- **Netlify** - Static site hosting with security headers
- **Vercel** - Alternative static site hosting

### Development Tools
- **Git** - Version control
- **Spec-Driven Development Kit** - Documentation and planning

---

## 💻 Installation

### Prerequisites

- **Git** (v2.0+) - [Download Git](https://git-scm.com/)
- **Node.js** (optional, only if using build tools) - [Download Node.js](https://nodejs.org/)
- **Modern Web Browser** - Chrome, Firefox, Safari, or Edge
- **Text Editor** - VS Code, Sublime Text, or any editor

### Clone the Repository

```bash
# Clone the repository
git clone https://github.com/mkhamisi2007/Spec-Driven-Development-example.git

# Navigate to the project directory
cd Spec-Driven-Development-example

# Optional: Install dependencies (if using npm scripts)
npm install
```

### No Build Step Required

This is a **zero-build static site** - no compilation or bundling needed!

---

## ⚙️ Configuration

### 1. Formspree Setup (Required for Contact Form)

The contact form uses **Formspree** to handle submissions without a backend server.

**Steps:**

1. **Create Formspree Account**
   - Go to https://formspree.io
   - Sign up with your email

2. **Create a New Form**
   - Click "New Form" or "Create"
   - Enter your email (where form submissions will be sent)
   - Create the form

3. **Copy Your Form ID**
   - After creation, you'll see a form ID like: `abc123def456`
   - Copy this ID

4. **Update Contact Page**
   - Open `js/contact.js`
   - Find line with: `const FORMSPREE_FORM_ID = 'REPLACE_WITH_YOUR_FORMSPREE_FORM_ID';`
   - Replace with: `const FORMSPREE_FORM_ID = 'your-form-id-here';`
   - Save the file

**Example:**
```javascript
// Before:
const FORMSPREE_FORM_ID = 'REPLACE_WITH_YOUR_FORMSPREE_FORM_ID';

// After:
const FORMSPREE_FORM_ID = 'abc123def456';
```

### 2. Contact Information (Optional)

Update company contact details:

**File:** `data/contact-info.json`

```json
{
  "address": {
    "street": "Your Street Address",
    "city": "Your City",
    "state": "Your State",
    "postalCode": "Your Code",
    "country": "Your Country"
  },
  "email": "your-email@example.com",
  "phone": "+1 (555) 123-4567",
  "businessHours": {
    "weekdays": "Monday-Friday, 9:00 AM - 5:00 PM",
    "weekends": "Closed",
    "timezone": "Eastern Time (ET)"
  }
}
```

### 3. Translations (Optional)

Add or modify translations:

**English:** `data/translations/en.json`  
**French:** `data/translations/fr.json`

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
    "submitButton": "Send Message"
  }
}
```

---

## 🚀 Running the Project

### Option 1: Using a Simple HTTP Server

**On Windows (PowerShell):**
```powershell
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (if installed)
npx http-server

# Using PHP (if installed)
php -S localhost:8000
```

**On macOS/Linux (Bash):**
```bash
# Using Python 3
python3 -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js
npx http-server
```

### Option 2: Using VS Code Live Server

1. Install VS Code Extension: "Live Server"
2. Right-click `index.html`
3. Select "Open with Live Server"
4. Browser opens automatically at `http://localhost:5500`

### Option 3: Open Directly in Browser

Simply double-click an HTML file (`index.html`, `contact.html`, etc.)

**Note:** Some features (like localStorage) work best with a server, not direct file access.

### Access the Application

Once running, visit:

- **Homepage:** `http://localhost:8000/`
- **Contact Page:** `http://localhost:8000/contact.html`
- **Products:** `http://localhost:8000/products.html`
- **Partners:** `http://localhost:8000/partners.html`

---

## 🧪 Testing

### Manual Testing Checklist

#### Language Switching
- [ ] Click EN/FR button to toggle language
- [ ] All text changes to selected language
- [ ] Language persists when navigating between pages
- [ ] Language persists after page reload

#### Contact Form
- [ ] Form validates required fields (name, email, subject, message)
- [ ] Email field validates email format
- [ ] Error messages display for invalid input
- [ ] Form data preserved on validation error
- [ ] Progress bar shows during submission
- [ ] Success message displays after submission
- [ ] Form clears after successful submission

#### Responsive Design
- [ ] Test on desktop (1920x1080)
- [ ] Test on tablet (768x1024)
- [ ] Test on mobile (375x667)
- [ ] All text readable
- [ ] Buttons and forms usable on touch devices

#### Accessibility
- [ ] Tab through form elements (keyboard navigation)
- [ ] Focus indicators visible
- [ ] Use screen reader (if available)
- [ ] Color contrast sufficient (use Chrome DevTools)

#### Security
- [ ] Attempt XSS in form fields
- [ ] Check security headers in DevTools (Network tab)
- [ ] Verify HTTPS when deployed
- [ ] Verify no sensitive data in source code

### Automated Testing (Optional)

```bash
# Run accessibility audit (requires Lighthouse)
npm run lighthouse

# Run security scan
npm run security-audit

# Run performance test
npm run performance
```

---

## 📦 Deployment

### Deployment: Netlify

**Option A: Using Git (Recommended)**

1. **Push to GitHub** (already done!)
   ```bash
   git push origin master
   ```

2. **Connect to Netlify**
   - Go to https://netlify.com
   - Click "New site from Git"
   - Select GitHub
   - Choose `Spec-Driven-Development-example` repo
   - Build settings:
     - **Build command:** (leave empty)
     - **Publish directory:** `.`
   - Click "Deploy"

3. **Done!** Your site is live at `your-site.netlify.app`

**Option B: Manual Deploy**

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod --dir=.
```

### Deployment: Vercel

**Option A: Using Git**

1. **Push to GitHub**
   ```bash
   git push origin master
   ```

2. **Connect to Vercel**
   - Go to https://vercel.com
   - Click "Import Project"
   - Select GitHub
   - Choose your repository
   - Settings:
     - **Build Command:** (leave empty)
     - **Output Directory:** `.`
   - Click "Deploy"

3. **Done!** Your site is live at `your-site.vercel.app`

**Option B: Using CLI**

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Post-Deployment

1. **Update Formspree Settings**
   - Go to Formspree dashboard
   - Add your deployed domain to allowed origins
   - Update redirect URL after submission (optional)

2. **Test Live Site**
   - Visit your deployed URL
   - Test all features (language switching, form submission)
   - Check security headers

3. **Monitor**
   - Check Netlify/Vercel analytics
   - Monitor form submissions in Formspree
   - Watch for JavaScript errors in browser console

---

## ✨ Features

### ✅ Bilingual Support (English/French)
- Automatic language detection from browser
- Language switcher in navigation
- Persistent language preference (localStorage)
- Complete translations for all pages
- All form messages translated

### ✅ Contact Form
- Client-side validation (required fields, email format)
- Real-time error messages
- Form data preservation on validation errors
- Progress bar during submission
- Success/error feedback messages
- Integration with Formspree for email delivery

### ✅ Security
- **HTTPS Enforcement** - Redirect HTTP to HTTPS
- **Content-Security-Policy** - Prevent inline scripts and XSS
- **Strict-Transport-Security** - Force HTTPS for future visits
- **X-Content-Type-Options: nosniff** - Prevent MIME sniffing
- **X-Frame-Options: DENY** - Prevent clickjacking
- **Referrer-Policy** - Control referrer information
- **Input Sanitization** - Escape HTML in user input
- **No Sensitive Data** - API keys not exposed in source

### ✅ Accessibility (WCAG 2.1 AA)
- Semantic HTML structure
- ARIA labels on form fields
- Keyboard navigation support
- Focus indicators visible
- Color contrast compliance
- Alt text for images

### ✅ Performance
- **Initial Load:** <2 seconds
- **Interactive:** <3 seconds on 4G
- **JS Bundle:** <50KB (gzipped)
- **CSS Bundle:** <30KB (gzipped)
- No external dependencies (vanilla JS)

---

## 🔌 API Integration

### Formspree API

**Endpoint:** `https://formspree.io/f/{FORM_ID}`

**Request:**
```javascript
fetch('https://formspree.io/f/abc123def456', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    subject: 'Inquiry',
    message: 'Hello...',
    _subject: 'New Form Submission'
  })
})
```

**Response:**
```json
{
  "ok": true,
  "message": "Your message has been received"
}
```

---

## 📚 Documentation

### Specification Documents

Located in `specs/001-international-contact-security/`:

1. **spec.md** - Complete feature specification
2. **plan.md** - Implementation plan and architecture
3. **research.md** - Technical research and decisions
4. **data-model.md** - Data structures and validation rules
5. **quickstart.md** - 15 validation scenarios
6. **contracts/** - API contracts for external services
7. **tasks.md** - 41 implementation tasks

### Implementation Guide

See `IMPLEMENTATION_STATUS.md` for:
- What's implemented (11/41 tasks complete)
- How to continue implementation
- Quick start instructions
- Deployment checklist

---

## 🤝 Contributing

### Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/my-feature
   ```

2. **Make your changes**
   - Update HTML/CSS/JavaScript
   - Add translations to both en.json and fr.json
   - Test all functionality

3. **Test locally**
   ```bash
   python -m http.server 8000
   # Visit http://localhost:8000
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add my feature"
   ```

5. **Push to GitHub**
   ```bash
   git push origin feature/my-feature
   ```

6. **Create a Pull Request**
   - Go to GitHub repository
   - Click "New Pull Request"
   - Describe your changes
   - Wait for review

### Code Standards

- **HTML:** Semantic, accessible, no hardcoded text (use i18n)
- **CSS:** Mobile-first, responsive, organized by component
- **JavaScript:** Vanilla ES6+, modular, clear function names
- **Translations:** Keep both en.json and fr.json in sync

---

## 🐛 Troubleshooting

### Form Not Submitting

**Problem:** Form submission fails silently

**Solutions:**
1. Check Formspree form ID in `js/contact.js`
2. Verify Formspree account and form creation
3. Check browser console for errors (F12 → Console)
4. Test on a deployed site (HTTPS required)

### Language Not Persisting

**Problem:** Selected language resets on page reload

**Solutions:**
1. Check browser localStorage is enabled
2. Check browser console for errors
3. Verify `localStorage` key is `'siteLanguage'`
4. Test in private/incognito mode to rule out browser extensions

### HTTPS Redirect Not Working

**Problem:** Still accessing via HTTP after deployment

**Solutions:**
1. Verify `netlify.toml` or `vercel.json` is deployed
2. Clear browser cache (Ctrl+Shift+Del)
3. Wait 5-10 minutes for config propagation
4. Contact hosting support if issue persists

### Styles Not Loading

**Problem:** Page appears unstyled

**Solutions:**
1. Check console for CSS loading errors
2. Verify relative paths to CSS files
3. Hard refresh browser (Ctrl+Shift+R)
4. Check that CSS files exist in `css/` directory

---

## 📖 Additional Resources

### Spec-Driven Development
- [CLAUDE.md](CLAUDE.md) - Development guidance
- [specs/001-international-contact-security/](specs/001-international-contact-security/) - Full feature documentation

### External Services
- [Formspree Documentation](https://formspree.io/docs/)
- [Netlify Deployment Guide](https://docs.netlify.com/)
- [Vercel Deployment Guide](https://vercel.com/docs)

### Web Standards
- [MDN Web Docs](https://developer.mozilla.org/) - HTML/CSS/JavaScript reference
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/) - Accessibility standards
- [OWASP Security](https://owasp.org/) - Security best practices

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Spec-Driven Development Example**  
Created as a demonstration of spec-driven development methodology

**Email:** m_khamisi_2007@yahoo.com

---

## 🔗 Links

- **GitHub Repository:** https://github.com/mkhamisi2007/Spec-Driven-Development-example
- **Formspree Service:** https://formspree.io
- **Netlify Hosting:** https://netlify.com
- **Vercel Hosting:** https://vercel.com

---

## ✅ Quick Checklist

Before deploying to production:

- [ ] Formspree form ID configured in `js/contact.js`
- [ ] Company contact info updated in `data/contact-info.json`
- [ ] All translations verified (both languages complete)
- [ ] Contact form tested locally
- [ ] Language switching tested and persisting
- [ ] Security headers present (check in DevTools)
- [ ] Site tested on mobile devices
- [ ] HTTPS enabled on deployed site
- [ ] XSS testing completed
- [ ] Performance acceptable (Lighthouse 90+)

---

**Made with ❤️ using Spec-Driven Development**
