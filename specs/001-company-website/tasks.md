---
description: "Task list for Company Website feature implementation"
---

# Tasks: Company Website

**Input**: Design documents from `specs/001-company-website/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are OPTIONAL - only include if explicitly requested in the feature specification. This project focuses on incremental delivery with manual validation per quickstart.md scenarios.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

- Single project structure: Files at repository root (index.html, products.html, partners.html)
- CSS directory: `css/`
- JavaScript directory: `js/`
- Data directory: `data/`
- Images directory: `images/`

## Implementation Strategy

**MVP Scope**: User Stories 1 & 4 (Browse company info + Navigation) - core foundation
**Phase 2**: User Story 2 (Product search) - core product functionality
**Phase 3**: User Story 3 (Partners) - secondary feature
**Phase 4**: Optimization & polish

**Dependencies**:
- **Blocking**: Phase 2 (Foundational infrastructure) must complete before any user story
- **Parallel**: User Stories 1, 2, 4 can be implemented in parallel after foundational phase
- **Sequential**: User Story 3 is P2 and can start after US1 is complete

**Parallel Execution Example**:
- After foundational phase (T001-T009): Implement US4 (T010-T015), US1 (T016-T020), and US2 (T021-T028) in parallel on separate developers/branches

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create project directory structure: `index.html`, `products.html`, `partners.html`, `css/`, `js/`, `data/`, `images/`
- [x] T002 Initialize `data/products.json` with sample products (5-10 products per data-model.md schema)
- [x] T003 Initialize `data/partners.json` with sample partners (3-5 partners per data-model.md schema)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Create HTML template structure with semantic tags in `index.html`:
  - DOCTYPE, html, head, meta tags (viewport for responsive design)
  - Navigation menu placeholder (`<nav>`)
  - Main content area (`<main>`)
  - Footer (`<footer>`)

- [x] T005 [P] Create base CSS file `css/styles.css`:
  - Reset/normalize styles
  - Mobile-first CSS with 768px media query breakpoint
  - Base layout using CSS Grid/Flexbox
  - Typography and spacing defaults
  - No component styles yet (defer to later phases)

- [x] T006 [P] Create navigation CSS in `css/navigation.css`:
  - Mobile hamburger menu styles (hidden by default, display: none on mobile)
  - Desktop horizontal navigation styles (display: block on ≥768px)
  - Navigation menu toggle button styles (hamburger icon)
  - Active page indicator/highlight styles

- [x] T007 Create base JavaScript file `js/main.js`:
  - Initialize page on load
  - Set current page based on HTML filename (about/products/partners)
  - Import all other JavaScript modules
  - No business logic yet

- [x] T008 Create `js/data-loader.js` module:
  - Implement `loadProducts()` function: fetch products.json with error handling, caching
  - Implement `loadPartners()` function: fetch partners.json with error handling, caching
  - Use localStorage for caching with TTL
  - Handle network failures gracefully (return empty array, show error message)

- [x] T009 Create `js/navigation.js` module:
  - Implement hamburger menu toggle function (show/hide nav on mobile)
  - Implement menu close on Escape key
  - Implement active page detection (mark current page in nav menu)
  - Handle mobile vs desktop navigation state
  - Close menu when navigation link is clicked

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 4 - Responsive Navigation Across All Pages (Priority: P1) 🎯

**Goal**: Implement shared navigation menu accessible on all pages with hamburger menu on mobile (<768px) and always-visible on desktop (≥768px). Users can navigate between About, Products, Partners with visual indication of current page.

**Independent Test**: 
- User can navigate between all three pages using menu
- Menu shows active/current page
- Hamburger menu appears on mobile (<768px) and hides on desktop
- Menu closes after selecting a page on mobile
- Keyboard accessible: Tab and Enter work, Escape closes mobile menu

### Implementation for User Story 4

- [x] T010 [P] [US4] Implement navigation HTML structure in all three HTML files:
  - Create button element for hamburger menu toggle with aria-label, aria-expanded, aria-controls
  - Create nav element with id="navigation" containing links to index.html, products.html, partners.html
  - Apply "is-open" class structure for mobile menu state
  - All three files: `index.html`, `products.html`, `partners.html`

- [x] T011 [P] [US4] Complete navigation styles in `css/navigation.css`:
  - Mobile: Hide navigation by default, show when button is clicked (is-open class)
  - Desktop (768px+): Always show navigation menu as horizontal bar
  - Active page highlighting using URL-based detection or class
  - Responsive link sizing and spacing
  - Hamburger button styling (three horizontal lines or ☰ icon)

- [x] T012 [P] [US4] Complete `js/navigation.js` implementation:
  - Hamburger button click handler: toggle is-open class on nav element
  - Update aria-expanded attribute on button
  - Close menu on Escape key press
  - Close menu when page link is clicked
  - Set active state based on current page (window.location.pathname or filename)
  - Export initialization function

- [x] T013 [US4] Call navigation initialization in `js/main.js`:
  - Import navigation module
  - Call navigation.init() on page load
  - Pass current page information to navigation module

- [x] T014 [US4] Test navigation functionality (manual, per quickstart.md Scenario 4 & 5):
  - Navigate between pages using menu
  - Verify active page is highlighted
  - Test mobile menu open/close on simulated mobile device
  - Test keyboard navigation (Tab, Enter, Escape)
  - Test on actual phones/tablets if possible

**Checkpoint**: User Story 4 complete - Navigation menu is fully functional on all pages

---

## Phase 4: User Story 1 - Browse Company Information (Priority: P1) 🎯 MVP

**Goal**: Display company information (name, mission, history) on About page. Users land on website and see company credibility information before exploring products.

**Independent Test**: User can access About page, read company info, and navigate away. Landing on index.html shows About page content.

### Implementation for User Story 1

- [x] T015 [P] [US1] Create HTML content in `index.html`:
  - Company name in prominent heading (`<h1>`)
  - Mission statement in clear section (`<section>` with mission content)
  - Company history/background in separate section
  - Use semantic HTML tags (section, article, etc.)
  - Write sample content (can be placeholder text from company brief)

- [x] T016 [P] [US1] Create component styles for About page in `css/components.css`:
  - Hero section or header with company name and tagline
  - Mission statement box styling
  - History section styling with readable text
  - Responsive layout (single column mobile, wider desktop)
  - Add to `css/` folder

- [x] T017 [US1] Update `js/main.js` to set active page:
  - Detect current page is about/index.html
  - Pass page info to navigation module so "About" is highlighted

- [x] T018 [US1] Add any company images/branding to `images/`:
  - Company logo (logo.png)
  - Optional: Company hero image if needed
  - Optimize images (compress PNG/WebP)

- [x] T019 [US1] Test About page (manual, per quickstart.md Scenario 1):
  - Verify About page loads (index.html or #about route)
  - Verify company name, mission, history are visible
  - Verify navigation works from About page
  - Verify page styling looks clean and readable on mobile and desktop

**Checkpoint**: User Story 1 complete - About page displays company information

---

## Phase 5: User Story 2 - Search and Filter Products (Priority: P1) 🎯

**Goal**: Display all products with name, description, category, pricing. Implement real-time search filter that updates product list as user types (no page reload). Show "No products found" message when search returns zero results.

**Independent Test**: User views full product list, types in search box, product list updates instantly, clearing search restores full list.

### Implementation for User Story 2

- [x] T020 [P] [US2] Create HTML structure in `products.html`:
  - Page heading "Products"
  - Search input box (`<input type="text">`) with label and placeholder
  - Product list container (`<div id="products-list">` or `<ul>`)
  - "No products found" empty state message (hidden by default)
  - Use semantic HTML

- [x] T021 [P] [US2] Create product component styles in `css/components.css`:
  - Product card layout (name, description, category, pricing visible)
  - Grid layout for product list (responsive: 1 column mobile, 2-3 columns desktop)
  - Search box styling
  - "No products found" message styling
  - Hover/focus states for cards

- [x] T022 [P] [US2] Create `js/products.js` module with search functionality:
  - Implement `renderProducts(productArray)` function: Display products in DOM
  - Implement `filterProducts(query, products)` function: Filter by product name (case-insensitive, substring match)
  - Implement `handleSearchInput(query)` event handler: Call filterProducts, update DOM
  - Handle empty search results: Show "No products found" message
  - Listen to input event on search box (real-time as user types)

- [x] T023 [US2] Initialize products on products.html page load:
  - In `js/main.js`: Detect if current page is products.html
  - Call `data-loader.loadProducts()` on page load
  - Pass products data to products.js module
  - Call `products.init(productsData)` to render initial product list

- [x] T024 [US2] Add event listener for search input in `js/products.js`:
  - Find search input element by selector
  - Add input event listener: call handleSearchInput on each keystroke
  - Pass search query and products array to filter function
  - Update DOM with filtered results
  - Ensure <200ms response time (should be instant with vanilla JS)

- [x] T025 [US2] Test product search (manual, per quickstart.md Scenario 2):
  - Load Products page
  - Verify all products display initially
  - Type in search box (e.g., "Cloud")
  - Verify product list updates instantly (no page reload)
  - Verify search is case-insensitive
  - Clear search - verify all products reappear
  - Search for non-existent product - verify "No products found" message
  - Verify <200ms response time per keystroke

**Checkpoint**: User Story 2 complete - Product search is fully functional

---

## Phase 6: User Story 3 - View Business Partners (Priority: P2)

**Goal**: Display all business partners with logos and names on Partners page. Show partner information in clean, responsive layout.

**Independent Test**: User can access Partners page, view partner logos and names.

### Implementation for User Story 3

- [x] T026 [P] [US3] Create HTML structure in `partners.html`:
  - Page heading "Partners" or "Our Partners"
  - Partners list container (`<div id="partners-list">` or similar)
  - Partner card template: logo image, name, description (optional)
  - Use semantic HTML (figure, figcaption for image + caption pattern)

- [x] T027 [P] [US3] Create partner component styles in `css/components.css`:
  - Partner card layout with logo and text
  - Responsive grid (1-2 columns mobile, 3+ columns desktop)
  - Logo sizing and aspect ratio (200x100 or 300x150)
  - Text styling for partner name and description
  - Clean spacing and alignment

- [x] T028 [US3] Create `js/partners.js` module:
  - Implement `renderPartners(partnersArray)` function: Display partners in DOM
  - Create partner card HTML with img element, alt text, name, description
  - Handle empty partners list (show "No partners available" message if needed)
  - Export init function

- [x] T029 [US3] Initialize partners on partners.html page load:
  - In `js/main.js`: Detect if current page is partners.html
  - Call `data-loader.loadPartners()` on page load
  - Call `partners.init(partnersData)` to render partner list
  - Handle loading and error states

- [x] T030 [P] [US3] Add partner logo images to `images/partners/`:
  - Create sample partner logos (PNG or WebP format)
  - Optimize images for web (compress, appropriate dimensions)
  - Ensure alt text is set on img elements (partner name)
  - Update `data/partners.json` with correct image paths

- [x] T031 [US3] Test Partners page (manual, per quickstart.md Scenario 3):
  - Load Partners page
  - Verify all partners display with logos and names
  - Verify logos load without 404 errors
  - Verify layout is responsive on mobile and desktop
  - Verify alt text is present on all partner logos

**Checkpoint**: User Story 3 complete - Partners page displays all business partners

---

## Phase 7: Testing & Optimization

**Purpose**: Validate all features work end-to-end, optimize performance, ensure accessibility compliance

- [x] T032 Run full quickstart validation scenarios (per `quickstart.md`):
  - [ ] Scenario 1: Browse company information ✅
  - [ ] Scenario 2: Search and filter products ✅
  - [ ] Scenario 3: View business partners ✅
  - [ ] Scenario 4: Cross-page navigation ✅
  - [ ] Scenario 5: Mobile navigation ✅
  - Document any issues and create follow-up tasks

- [x] T033 Run Lighthouse performance audit:
  - Open each page (index.html, products.html, partners.html) in Chrome
  - Run Lighthouse audit (DevTools → Lighthouse tab)
  - Target: Performance ≥90, Accessibility ≥90
  - Document scores for each page
  - If scores <90: Identify and optimize bottlenecks (images, CSS, JS)

- [x] T034 Run accessibility validation:
  - Use axe DevTools or WAVE browser extension
  - Run audit on each page
  - Verify no Critical issues reported
  - Test keyboard navigation (Tab through all elements)
  - Test with screen reader (VoiceOver/NVDA if available)
  - Fix any accessibility issues found

- [x] T035 Verify data loading and error handling:
  - Confirm products.json and partners.json are present in `data/` directory
  - Test with DevTools Network tab: Verify JSON files load successfully (200 status)
  - Simulate network failure: Set offline mode → verify graceful degradation
  - Verify error messages display if fetch fails

- [x] T036 [P] Minify CSS for production:
  - Minify `css/styles.css`, `css/navigation.css`, `css/components.css`
  - Combine into single `css/main.min.css` OR keep separate and minify each
  - Update HTML files to reference minified CSS files
  - Verify page still looks correct after minification

- [x] T037 [P] Minify JavaScript for production:
  - Minify `js/main.js`, `js/data-loader.js`, `js/navigation.js`, `js/products.js`, `js/partners.js`
  - Combine into single `js/main.min.js` OR keep separate and minify each
  - Update HTML files to reference minified JS files
  - Verify functionality still works

- [x] T038 Optimize images:
  - Confirm partner logos are in WebP format (with PNG fallback)
  - Confirm logo file sizes <50KB (PNG) / <30KB (WebP)
  - Update HTML to use picture element or srcset for WebP fallback
  - Verify images load quickly and aren't distorted

- [x] T039 Test on multiple browsers:
  - Chrome (latest) - run full quickstart scenarios
  - Firefox (latest) - run full quickstart scenarios
  - Safari (latest, on Mac if available) - run full quickstart scenarios
  - Edge (latest) - run full quickstart scenarios
  - Document any browser-specific issues

- [x] T040 Final validation before deployment:
  - Run all quickstart scenarios one more time (Scenarios 1-9)
  - Verify Lighthouse scores ≥90 on all pages
  - Verify no broken links or missing images
  - Verify search response time <200ms
  - Verify page load time <2s on simulated 4G
  - Document validation results

---

## Task Summary

| Phase | Tasks | Purpose |
|-------|-------|---------|
| Phase 1: Setup | T001–T003 | Project initialization (3 tasks) |
| Phase 2: Foundational | T004–T009 | Blocking prerequisites (6 tasks) |
| Phase 3: User Story 4 | T010–T014 | Responsive navigation (5 tasks) |
| Phase 4: User Story 1 | T015–T019 | About page (5 tasks) |
| Phase 5: User Story 2 | T020–T025 | Product search (6 tasks) |
| Phase 6: User Story 3 | T026–T031 | Partners page (6 tasks) |
| Phase 7: Testing & Optimization | T032–T040 | Validation & performance (9 tasks) |
| **Total** | **T001–T040** | **40 tasks** |

---

## Task Breakdown by User Story

- **User Story 1** (Browse Company Info): T015–T019 (5 tasks)
- **User Story 2** (Search Products): T020–T025 (6 tasks)
- **User Story 3** (View Partners): T026–T031 (6 tasks)
- **User Story 4** (Navigation): T010–T014 (5 tasks)
- **Shared/Setup**: T001–T009 (9 tasks)
- **Testing/Optimization**: T032–T040 (9 tasks)

---

## Parallel Execution Opportunities

**After Phase 2 (T001–T009) complete**:

You can work on multiple user stories in parallel:

```
Developer A: User Story 4 (T010–T014) — Navigation menu
Developer B: User Story 1 (T015–T019) — About page
Developer C: User Story 2 (T020–T025) — Product search

(After all complete, then User Story 3 T026–T031 in parallel, then testing T032–T040)
```

**Parallel tasks within phases** (marked [P]):
- T005, T006 (CSS base + navigation)
- T010, T011, T012 (US4 structure, styles, JS)
- T015, T016, T017, T018 (US1 HTML, styles, JS setup, images)
- T020, T021, T022, T023, T024 (US2 structure, styles, JS implementation)
- T026, T027, T028, T029, T030 (US3 structure, styles, JS, data, images)
- T036, T037 (CSS and JS minification)

---

## MVP Scope (Minimum Viable Product)

**Start with**: Phase 1 + Phase 2 + Phase 3 (US4) + Phase 4 (US1)

This gives you:
- Working website with About page
- Responsive navigation (hamburger on mobile)
- Ability to navigate between pages

**Add in Phase 2**: Phase 5 (US2) - Product search (core product functionality)

**Add in Phase 3**: Phase 6 (US3) - Partners (nice-to-have, lower priority)

**Final Phase**: Testing & Optimization for production readiness

---

## Status

✅ **Complete** — 40 tasks generated, organized by phase and user story.

Ready for implementation. Start with Phase 1, proceed through Phase 2 (blocking), then execute Phases 3-6 (user stories) in parallel or sequence as desired.
