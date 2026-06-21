# Data Model: Company Website

**Phase**: 1 | **Created**: 2026-06-21 | **Input**: Feature specification and research findings

## Entity Definitions

### Product

**File**: `data/products.json`

**Purpose**: Store information about company software products

**Fields**:

| Field | Type | Required | Description | Constraints |
|-------|------|----------|-------------|-------------|
| id | string | Yes | Unique product identifier | Must be unique; format: "prod-NNN" |
| name | string | Yes | Product name | Non-empty; max 100 characters |
| description | string | Yes | Product description | Non-empty; max 500 characters |
| category | string | Yes | Product category | Non-empty; examples: "CRM", "Analytics", "Security", "Integration" |
| pricing | string | Yes | Pricing information | Non-empty; flexible format (e.g., "$99/month", "$50–500/month", "Contact sales") |

**Example**:
```json
{
  "id": "prod-001",
  "name": "CloudSync Pro",
  "description": "Real-time data synchronization across cloud platforms with enterprise-grade security and compliance",
  "category": "Integration",
  "pricing": "$299/month"
}
```

**Validation Rules**:
- `id` must be unique within the products array
- `name` must not be empty; used for search filtering
- `description` provides context; displayed on product list
- `category` enables product organization
- `pricing` is a flexible string; no validation format required

**Search Behavior**:
- Search matches `name` field only (case-insensitive substring match)
- Example: Search "sync" matches "CloudSync Pro"

---

### Partner

**File**: `data/partners.json`

**Purpose**: Store information about business partner organizations

**Fields**:

| Field | Type | Required | Description | Constraints |
|-------|------|----------|-------------|-------------|
| id | string | Yes | Unique partner identifier | Must be unique; format: "partner-NNN" |
| name | string | Yes | Partner organization name | Non-empty; max 100 characters |
| logo | string | Yes | Path or URL to partner logo | Non-empty; must reference valid image file |
| description | string | No | Partner description | Optional; max 300 characters |

**Example**:
```json
{
  "id": "partner-001",
  "name": "Acme Solutions",
  "logo": "/images/partners/acme-logo.png",
  "description": "Leading enterprise integration and API management platform"
}
```

**Validation Rules**:
- `id` must be unique within the partners array
- `name` must not be empty
- `logo` must reference a valid image file in the `/images/partners/` directory
- `description` is optional but recommended for context

**Image Requirements**:
- Format: PNG or WebP (PNG for universal compatibility, WebP for optimization)
- Dimensions: Recommended 200x100 or 300x150 pixels
- File size: <50KB per image
- Alt text: Partner name automatically used as alt text

---

## Relationships

**One-to-Many**: 
- One feature (Company Website) has many Products
- One feature (Company Website) has many Partners

**No direct relationships between Products and Partners** — they are independent entity types.

---

## Data Lifecycle

### Products

**Create**: 
- New product added to `products.json` array
- Assigned unique ID and all required fields

**Read**: 
- Fetched via Fetch API on Products page load
- Cached in browser localStorage
- Filtered by search query on user input

**Update**: 
- Edit `products.json` file
- No API endpoint; requires manual file update
- Browser cache cleared on next refresh or manual cache clear

**Delete**: 
- Remove product object from `products.json` array
- Redeployment of static files

### Partners

**Create**: 
- New partner added to `partners.json` array
- Assigned unique ID, name, and logo path

**Read**: 
- Fetched via Fetch API on Partners page load
- Cached in browser localStorage
- Rendered as card layout with logo and name

**Update**: 
- Edit `partners.json` file or update logo image
- Redeployment required

**Delete**: 
- Remove partner object from `partners.json` array
- Remove logo image file
- Redeployment required

---

## Scale and Performance

### Product Scale

**Expected Range**: 5–10 sample products for demonstration; up to 500 for production

**Performance Impact**:
- 500 products: ~150KB uncompressed JSON
- Filter operation: <50ms
- DOM rendering: <100ms
- Total search response: <200ms ✅

### Partner Scale

**Expected Range**: 3–5 partners for demonstration

**Performance Impact**: Minimal — small array, no filtering

---

## Client-Side State

### Temporary Runtime State (Not Persisted)

**Products Page Search State**:
```javascript
{
  searchQuery: "string",           // Current search text
  filteredProducts: [Product],     // Current filtered product list
  isLoading: boolean,              // Data loading state
  error: string | null             // Error message if load fails
}
```

**Navigation State**:
```javascript
{
  currentPage: "about" | "products" | "partners",  // Active page
  menuOpen: boolean                                 // Mobile menu toggle state
}
```

---

## Data Storage Locations

| Type | Location | Format | Update Method |
|------|----------|--------|----------------|
| Products | `/data/products.json` | JSON | Manual file edit + redeploy |
| Partners | `/data/partners.json` | JSON | Manual file edit + redeploy |
| Product Cache | Browser localStorage | JSON (stringified) | Automatic on page load |
| Partner Cache | Browser localStorage | JSON (stringified) | Automatic on page load |

---

## Constraints and Assumptions

**Constraints**:
- No database; all data is static JSON files
- No content management system; updates require manual file editing
- Maximum 500 products supported before requiring architectural changes (backend API)
- No user-generated content; all data is pre-defined by company

**Assumptions**:
- Partner logos are pre-optimized PNG/WebP files provided by company
- Pricing is a simple string; no complex pricing tier logic
- No need for product images; only name and description
- Data does not change frequently (static content)
- Single product/partner list (no filtering by region, industry, etc.)

---

## Example Data

### products.json

```json
{
  "products": [
    {
      "id": "prod-001",
      "name": "CloudSync Pro",
      "description": "Real-time data synchronization across cloud platforms",
      "category": "Integration",
      "pricing": "$299/month"
    },
    {
      "id": "prod-002",
      "name": "SecureVault",
      "description": "Enterprise-grade encryption and secure credential storage",
      "category": "Security",
      "pricing": "$199/month"
    },
    {
      "id": "prod-003",
      "name": "Analytics Dashboard",
      "description": "Comprehensive analytics and reporting for business intelligence",
      "category": "Analytics",
      "pricing": "$149–499/month"
    },
    {
      "id": "prod-004",
      "name": "APIGateway",
      "description": "Central API management with rate limiting and monitoring",
      "category": "Infrastructure",
      "pricing": "Custom pricing"
    },
    {
      "id": "prod-005",
      "name": "WorkflowAutomation",
      "description": "Low-code workflow automation for business processes",
      "category": "Automation",
      "pricing": "$99–299/month"
    }
  ]
}
```

### partners.json

```json
{
  "partners": [
    {
      "id": "partner-001",
      "name": "Acme Solutions",
      "logo": "/images/partners/acme-logo.png",
      "description": "Leading enterprise integration platform"
    },
    {
      "id": "partner-002",
      "name": "SecureCloud Inc",
      "logo": "/images/partners/securecloud-logo.png",
      "description": "Cloud infrastructure and security solutions"
    },
    {
      "id": "partner-003",
      "name": "DataFlow Analytics",
      "logo": "/images/partners/dataflow-logo.png",
      "description": "Advanced data analytics and insights platform"
    }
  ]
}
```

---

## Status

✅ **Complete** — Data model fully specified. Ready for implementation.
