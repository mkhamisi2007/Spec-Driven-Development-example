# Research: Company Website

**Phase**: 0 | **Created**: 2026-06-21 | **Input**: Implementation plan technical decisions

## Research Findings

### 1. Real-Time Client-Side Search Performance

**Decision**: Use native JavaScript `Array.filter()` on products array with DOM re-rendering

**Rationale**: 
- Fast enough for 500 items (filter + DOM update <50ms)
- No external library dependency
- Simpler codebase, easier to maintain
- Aligns with Constitution's Simplicity First principle

**Performance Analysis**:
- Array.filter() on 500 items: <5ms
- DOM manipulation (creating product elements): <30ms
- Total: <50ms per keystroke (well under 200ms target)

**Alternatives Considered**:
- **MiniSearch library**: Adds ~10KB, provides indexing for 1000+ items. Overkill for this scale.
- **Lunr.js**: Adds ~15KB, full-text search. Excessive for simple substring matching.
- **Regex matching**: Slightly slower than string.includes(); marginally more complex code.

**Recommendation**: ✅ **Approved** — Vanilla `Array.filter()` is optimal choice.

---

### 2. JSON Data File Loading Pattern

**Decision**: Use Fetch API with error handling and localStorage caching

**Rationale**:
- Works in all modern browsers
- Explicit error handling for network failures
- Easy to cache in localStorage for offline access
- Simpler than ES6 import for data (import only works in module context)

**Code Pattern**:
```javascript
async function loadProducts() {
  try {
    const response = await fetch('/data/products.json');
    if (!response.ok) throw new Error('Failed to load products');
    return await response.json();
  } catch (error) {
    console.error('Error loading products:', error);
    return []; // Empty array fallback
  }
}
```

**Caching Strategy**:
- Cache in localStorage with timestamp
- Re-fetch if cache is stale (e.g., >1 hour old)
- Display cached data while fetching fresh data in background

**Alternatives Considered**:
- **ES6 import**: Only works in module context; requires build step
- **Script tag**: Unsafe for external data; outdated approach
- **Service Worker**: Good for offline, but adds complexity beyond scope

**Recommendation**: ✅ **Approved** — Fetch API with localStorage is standard pattern.

---

### 3. Mobile-First Responsive CSS Without Frameworks

**Decision**: CSS Grid/Flexbox with 768px media query breakpoint for mobile-first design

**Rationale**:
- No framework dependency (no Tailwind, Bootstrap, etc.)
- Grid and Flexbox widely supported in all modern browsers
- Mobile-first approach ensures core content is accessible on small screens
- Aligns with Constitution requirement for responsive 320px–1920px

**Breakpoints**:
- **Mobile** (<768px): Single-column layout, hamburger menu
- **Tablet/Desktop** (≥768px): Multi-column layout, horizontal navigation bar

**CSS Organization**:
```
css/
├── styles.css       # Base styles, mobile-first layout
├── navigation.css   # Navigation menu (hamburger + desktop)
└── components.css   # Reusable component styles
```

**Sample CSS Strategy**:
```css
/* Mobile-first base */
.product-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Desktop */
@media (min-width: 768px) {
  .product-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}
```

**Alternatives Considered**:
- **Tailwind CSS**: Adds 15–30KB (even with purging); violates Simplicity principle
- **Bootstrap**: Adds 30–50KB; overkill for simple layout
- **CSS-in-JS**: Adds runtime overhead; not suitable for static site

**Recommendation**: ✅ **Approved** — Vanilla CSS with Flexbox/Grid is optimal.

---

### 4. Accessible Hamburger Menu Implementation

**Decision**: Toggle class on `<nav>` element, controlled by button with ARIA attributes and minimal JavaScript

**Rationale**:
- Simple implementation (5–10 lines of JavaScript)
- Fully keyboard accessible (Enter, Space, Escape keys)
- Meets WCAG 2.1 AA accessibility standards
- No external library needed

**HTML Structure**:
```html
<button aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="navigation">
  <span>☰</span>
</button>
<nav id="navigation" class="navbar">
  <a href="index.html">About</a>
  <a href="products.html">Products</a>
  <a href="partners.html">Partners</a>
</nav>
```

**JavaScript**:
```javascript
const button = document.querySelector('button[aria-label*="Toggle"]');
const nav = document.querySelector('#navigation');

button.addEventListener('click', () => {
  nav.classList.toggle('is-open');
  button.setAttribute('aria-expanded', nav.classList.contains('is-open'));
});

// Close menu on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && nav.classList.contains('is-open')) {
    nav.classList.remove('is-open');
    button.setAttribute('aria-expanded', 'false');
  }
});
```

**CSS**:
```css
/* Mobile: menu hidden by default */
@media (max-width: 767px) {
  .navbar {
    display: none;
  }
  .navbar.is-open {
    display: block;
  }
}

/* Desktop: menu always visible */
@media (min-width: 768px) {
  .navbar {
    display: block;
  }
}
```

**Alternatives Considered**:
- **Alpine.js**: Adds ~15KB; unnecessary for simple toggle
- **Custom web components**: Over-engineered for this use case
- **CSS-only solution**: Requires checkbox hack; less semantic

**Recommendation**: ✅ **Approved** — Simple ARIA-based hamburger menu.

---

### 5. Lighthouse Performance Optimization Strategy

**Decision**: Image optimization (WebP), CSS critical path, deferred JavaScript, static asset caching

**Rationale**:
- Achieves 90+ Lighthouse scores on Performance and Accessibility
- Lightweight optimizations, no build complexity
- Aligns with <2s page load target

**Implementation Strategy**:

1. **Image Optimization**
   - Convert partner logos to WebP format (~30% smaller than PNG)
   - Provide PNG fallback for older browsers
   - Serve appropriate size based on viewport (srcset attribute)
   - Example: `<img src="logo.webp" alt="Partner" type="image/webp">`

2. **CSS Optimization**
   - Minify CSS for production (remove whitespace, compress)
   - Use critical CSS technique: inline essential above-fold styles
   - Defer non-critical styles with media queries
   - Total CSS budget: <30KB gzip

3. **JavaScript Optimization**
   - Defer non-critical scripts (async/defer attributes)
   - Load search filter only on Products page (conditional load)
   - Total JS budget: <50KB gzip

4. **Static Asset Caching**
   - Set appropriate cache headers (max-age)
   - Use content hashing for cache busting if deploying with version numbers
   - CDN caching for fast global delivery

5. **Accessibility Optimization**
   - Semantic HTML reduces DOM complexity
   - Proper color contrast (WCAG AA: 4.5:1 for text)
   - ARIA labels and roles for interactive elements
   - Keyboard navigation fully supported

**Performance Targets**:
- Page load: 1.5–2s on 4G (realistic network)
- Lighthouse Performance: 90+
- Lighthouse Accessibility: 90+
- Lighthouse Best Practices: 85+

**Alternatives Considered**:
- **Service Workers**: Good for offline caching, but adds complexity
- **Compression algorithms**: gzip is sufficient; Brotli adds minimal gains
- **CDN optimization**: Beneficial for production, but not required for MVP

**Recommendation**: ✅ **Approved** — Lightweight optimization strategy achieves targets.

---

## Conclusion

All technical decisions confirmed. No unknowns remain. The vanilla HTML/CSS/JS approach with JSON data files is optimal for this project. All performance targets are achievable without additional frameworks, build tools, or complex infrastructure.

**Status**: ✅ **Complete** — Ready for Phase 1 design.
