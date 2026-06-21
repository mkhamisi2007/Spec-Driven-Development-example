# Quickstart & Validation Guide: Company Website

**Phase**: 1 | **Created**: 2026-06-21 | **Purpose**: End-to-end validation scenarios to verify feature completion

## Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge — latest version)
- Local HTTP server (or GitHub Pages/Netlify deployment)
- Browser DevTools (for network inspection and Lighthouse audits)
- Optional: axe DevTools or WAVE accessibility browser extension

## Local Setup

### Option 1: Python HTTP Server
```bash
cd /path/to/project
python -m http.server 8000
# Open http://localhost:8000 in browser
```

### Option 2: Node.js HTTP Server
```bash
cd /path/to/project
npx http-server
# Open http://localhost:8080 in browser
```

### Option 3: GitHub Pages
```bash
git push origin main
# Site automatically deploys to https://username.github.io/repository
```

### Option 4: Netlify
```bash
# Drag and drop project folder to Netlify
# Site is live in seconds
```

---

## Validation Scenarios

### Scenario 1: Browse Company Information (About Page)

**Objective**: Verify About page displays company information and navigation works

**Steps**:
1. Open `index.html` in browser (or navigate to home page)
2. Verify page displays company name
3. Verify mission statement is visible
4. Verify company history/background is displayed
5. Verify navigation menu is visible at top of page
6. Click "Products" link in navigation
7. Verify page transitions to Products page

**Expected Results**:
- ✅ About page loads without errors
- ✅ Company information is clearly readable
- ✅ Navigation menu is accessible and functional
- ✅ Navigation link to Products works

**Acceptance**: Scenario passes if all steps complete successfully

---

### Scenario 2: Search and Filter Products

**Objective**: Verify real-time product search filtering works correctly

**Steps**:
1. Navigate to Products page
2. Verify full product list displays (5+ products visible)
3. Verify each product shows: name, description, category, pricing
4. Click in search box
5. Type "Cloud" (or part of a product name)
6. Verify product list updates instantly (no page reload)
7. Verify only products matching search are displayed
8. Clear search box (delete text)
9. Verify all products are displayed again
10. Search for non-existent product (e.g., "xyz123")
11. Verify "No products found" message displays
12. Verify search is case-insensitive (type "cloud" and "CLOUD" show same results)

**Expected Results**:
- ✅ Product list displays on page load
- ✅ Search filters instantly as text is typed
- ✅ No page reload occurs during search
- ✅ Clearing search restores full list
- ✅ Empty search result shows clear message
- ✅ Search is case-insensitive
- ✅ Search filters by product name only

**Performance Targets**:
- ✅ Search response time: <200ms per keystroke
- ✅ No lag or visible delay in result updates

**Acceptance**: Scenario passes if all steps complete with expected results

---

### Scenario 3: View Business Partners

**Objective**: Verify Partners page displays partner information correctly

**Steps**:
1. Navigate to Partners page (click "Partners" in navigation)
2. Verify page title/heading displays "Partners" or similar
3. Verify partner list displays (3+ partners visible)
4. Verify each partner displays:
   - Partner logo (image loaded without error)
   - Partner name
   - Partner description (if included)
5. Verify logos are properly sized and don't distort layout
6. Verify logos have alt text (inspect with DevTools)
7. Scroll down to see all partners
8. Verify layout is clean and organized

**Expected Results**:
- ✅ Partners page loads successfully
- ✅ Partner logos load without 404 errors
- ✅ Partner names are clearly visible
- ✅ Layout is responsive and clean
- ✅ Alt text is present for all images

**Acceptance**: Scenario passes if all steps complete successfully

---

### Scenario 4: Cross-Page Navigation

**Objective**: Verify navigation menu works consistently across all pages

**Steps**:
1. Open website home page (index.html / About page)
2. Verify navigation menu displays and "About" is marked as active
3. Click "Products" link
4. Verify Products page loads and "Products" is marked as active in navigation
5. Click "Partners" link
6. Verify Partners page loads and "Partners" is marked as active
7. Click "About" link
8. Verify About page loads and "About" is marked as active
9. Click another page link and verify menu state updates correctly
10. Reload page and verify active state persists

**Expected Results**:
- ✅ Navigation menu is visible on all pages
- ✅ Current page is clearly highlighted/marked as active
- ✅ All navigation links work and load correct pages
- ✅ Active state updates when page changes
- ✅ Active state persists after page reload

**Acceptance**: Scenario passes if all navigation tests succeed

---

### Scenario 5: Mobile Navigation (Hamburger Menu)

**Objective**: Verify mobile navigation menu displays correctly on small screens

**Setup**:
- Open browser DevTools (F12 or Cmd+Opt+I)
- Click "Toggle Device Toolbar" (or press Ctrl+Shift+M / Cmd+Shift+M)
- Set device to "iPhone 12" or similar mobile device

**Steps**:
1. Verify hamburger menu icon (☰) is visible on mobile screens (<768px)
2. Verify horizontal navigation menu is NOT visible on mobile
3. Tap hamburger menu icon
4. Verify navigation menu slides/expands into view
5. Verify menu displays all three links: About, Products, Partners
6. Click "Products" link in menu
7. Verify menu closes after clicking link
8. Verify Products page loads
9. Tap hamburger icon again
10. Verify menu can open and close multiple times
11. Press Escape key
12. Verify menu closes (if keyboard support implemented)

**Expected Results**:
- ✅ Hamburger menu visible on mobile (<768px)
- ✅ Menu is hidden by default
- ✅ Menu opens/closes with tap
- ✅ Menu closes after navigation
- ✅ Menu items are readable and easy to tap
- ✅ No overlapping content or layout issues

**Desktop Navigation (≥768px)**:
13. Resize browser to desktop width (≥768px)
14. Verify hamburger menu disappears
15. Verify horizontal navigation menu displays all links
16. Verify navigation menu is always visible (not hidden)

**Acceptance**: Scenario passes if mobile and desktop navigation both work correctly

---

### Scenario 6: Performance & Lighthouse Audit

**Objective**: Verify page performance meets targets using Lighthouse

**Setup**:
- Open Chrome browser
- Open browser DevTools (F12)
- Click "Lighthouse" tab (or use right-click → Run Lighthouse)

**Steps**:

**On Each Page** (About, Products, Partners):

1. Click "Analyze page load" (or similar button)
2. Wait for audit to complete (usually 30–60 seconds)
3. Record Performance score
4. Record Accessibility score
5. Check for Critical issues
6. Verify "Largest Contentful Paint" (LCP) < 2.5 seconds
7. Verify "Cumulative Layout Shift" (CLS) < 0.1

**Results**:
- ✅ Performance score ≥ 90 on all pages
- ✅ Accessibility score ≥ 90 on all pages
- ✅ No Critical issues reported
- ✅ LCP < 2.5 seconds
- ✅ CLS < 0.1

**Network Throttling**:
8. Switch to "Slow 4G" network throttling (in DevTools → Network tab)
9. Clear cache (Ctrl+Shift+Delete / Cmd+Shift+Delete)
10. Reload page
11. Observe page load time in Network tab
12. Verify initial load completes within 2 seconds

**Acceptance**: Scenario passes if Lighthouse scores ≥90 on Performance and Accessibility

---

### Scenario 7: Keyboard Navigation & Accessibility

**Objective**: Verify website is fully keyboard accessible (WCAG 2.1 AA)

**Steps**:

**Keyboard Navigation**:
1. Open website (index.html)
2. Press Tab key repeatedly
3. Verify focus moves through all interactive elements in logical order:
   - Navigation links
   - Search box (on Products page)
   - Any other clickable elements
4. Verify focus indicator is visible (typically a blue outline)
5. Press Enter on a focused link to activate it
6. Verify page navigates correctly
7. Test all pages (About, Products, Partners) for tab navigation
8. On Products page, press Escape to test menu close (if hamburger menu visible)

**Expected Results**:
- ✅ All interactive elements are keyboard accessible
- ✅ Tab order is logical and follows visual flow
- ✅ Focus indicator is visible (not invisible)
- ✅ Can navigate entire page using only keyboard
- ✅ Hamburger menu closes with Escape key

**Screen Reader Testing** (Optional - VoiceOver/NVDA):
9. Enable screen reader:
   - Mac: Cmd+F5 to enable VoiceOver
   - Windows: Use NVDA screen reader (free download)
10. Navigate page with screen reader
11. Verify:
    - Page title/heading is announced
    - Navigation structure is clear
    - Links are announced with descriptive text
    - Form labels (search box) are associated with input
    - Product list structure is understandable
12. Verify alt text is announced for partner logos

**Expected Results**:
- ✅ Page structure is understandable via screen reader
- ✅ All content is readable by screen reader
- ✅ Navigation links are descriptive
- ✅ Form labels are properly associated

**Accessibility Validation Tools**:
13. Install axe DevTools or WAVE browser extension
14. Run accessibility scan on each page
15. Verify no Critical or Serious issues reported
16. Review Warnings and fix if possible

**Expected Results**:
- ✅ No Critical issues in accessibility audit
- ✅ WCAG 2.1 AA compliance confirmed

**Acceptance**: Scenario passes if keyboard navigation works and axe/WAVE shows no Critical issues

---

### Scenario 8: Data Integrity & Image Loading

**Objective**: Verify all data files load correctly and images display without errors

**Setup**:
- Open DevTools → Network tab
- Set filter to "Fetch/XHR" to see data file requests

**Steps**:
1. Open Products page
2. Verify `products.json` loads successfully (200 status code)
3. Verify Products page displays product data
4. Open Partners page
5. Verify `partners.json` loads successfully (200 status code)
6. Verify partner data displays correctly
7. Check Network tab for any 404 errors on images
8. Verify partner logos display without broken image icons
9. Right-click a partner logo → "Inspect"
10. Verify `<img>` tag has proper `src` and `alt` attributes
11. Disable JavaScript in DevTools (Settings → Disable JavaScript)
12. Reload page
13. Verify page still displays content (graceful degradation)
14. Re-enable JavaScript

**Expected Results**:
- ✅ JSON files load with 200 status (no 404s)
- ✅ No broken image errors in Network tab
- ✅ Partner logos display correctly
- ✅ Images have proper alt text
- ✅ Page structure is present even if JS disabled

**Acceptance**: Scenario passes if all data loads and images display correctly

---

### Scenario 9: Browser Compatibility

**Objective**: Verify website works in all modern browsers

**Test Browsers**:
- Chrome (latest)
- Firefox (latest)
- Safari (latest, on Mac)
- Edge (latest)

**Steps** (on each browser):
1. Open website (index.html)
2. Verify About page displays correctly
3. Click through Products page
4. Test product search
5. Verify Partners page loads
6. Test mobile layout (open DevTools, toggle Device Toolbar)
7. Verify hamburger menu works on mobile
8. Check browser console for errors (DevTools → Console)
9. Verify no JavaScript errors logged

**Expected Results**:
- ✅ Website displays correctly in all browsers
- ✅ No JavaScript errors in console
- ✅ Search functionality works
- ✅ Navigation is consistent
- ✅ Mobile layout works

**Acceptance**: Scenario passes if website works in all tested browsers

---

### Scenario 10: Offline Functionality (Optional)

**Objective**: Verify site works offline after initial load (with caching)

**Steps**:
1. Open Products page
2. In DevTools Network tab, set offline mode
3. Reload page
4. Verify Products page still displays (from cache)
5. Try to navigate to Partners page
6. Verify navigation menu is functional
7. Try to search products
8. Verify search still works (filtered from cached data)

**Expected Results**:
- ✅ Cached pages load offline
- ✅ Navigation works offline
- ✅ Search works with cached data

**Note**: This is optional for MVP; can be a future enhancement

**Acceptance**: Scenario is optional but nice-to-have enhancement

---

## Definition of Done

✅ **Feature is complete when:**

| Scenario | Status |
|----------|--------|
| 1. Browse company information | ✅ Pass |
| 2. Search and filter products | ✅ Pass |
| 3. View business partners | ✅ Pass |
| 4. Cross-page navigation | ✅ Pass |
| 5. Mobile navigation | ✅ Pass |
| 6. Lighthouse audit (≥90) | ✅ Pass |
| 7. Keyboard navigation & accessibility | ✅ Pass |
| 8. Data integrity & images | ✅ Pass |
| 9. Browser compatibility | ✅ Pass |

**Acceptance Criteria**:
- All 9 scenarios pass validation
- Lighthouse Performance ≥90 on all pages
- Lighthouse Accessibility ≥90 on all pages
- No Critical accessibility issues (axe/WAVE)
- All browsers tested successfully
- Zero broken links or missing images
- Search responds in <200ms
- Page load time <2 seconds on 4G

---

## Testing Checklist

- [ ] Scenario 1: About page displays and navigation works
- [ ] Scenario 2: Product search filters in real-time
- [ ] Scenario 3: Partners page displays with logos
- [ ] Scenario 4: Navigation menu active state updates correctly
- [ ] Scenario 5: Mobile hamburger menu works
- [ ] Scenario 6: Lighthouse Performance ≥90
- [ ] Scenario 6: Lighthouse Accessibility ≥90
- [ ] Scenario 7: Keyboard navigation works
- [ ] Scenario 7: axe/WAVE shows no Critical issues
- [ ] Scenario 8: All images load without errors
- [ ] Scenario 9: Works in Chrome, Firefox, Safari, Edge

---

## Notes

- Run Lighthouse on a fresh page load with cleared cache for most accurate results
- Test mobile layout at actual breakpoint (768px) to verify hamburger menu switch
- Test search with 100+ products if possible to verify <200ms performance target
- Verify alt text for all images using Accessibility Insights or axe DevTools
- For production deployment, ensure proper cache headers are set on static files

---

**Status**: ✅ **Complete** — Validation guide ready for implementation and testing phase.
