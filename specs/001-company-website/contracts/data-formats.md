# Data Format Contracts: Company Website

**Phase**: 1 | **Created**: 2026-06-21 | **Purpose**: Define data file format specifications and API contracts

## Products Data Format

**File**: `data/products.json`

**Content-Type**: `application/json`

**HTTP Response Example**:
```http
HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: max-age=86400
```

**JSON Schema**:
```json
{
  "products": [
    {
      "id": "string",          // Unique identifier (required)
      "name": "string",        // Product name (required)
      "description": "string", // Product description (required)
      "category": "string",    // Category label (required)
      "pricing": "string"      // Pricing text (required)
    }
  ]
}
```

**Field Specifications**:

| Field | Type | Length | Pattern | Example |
|-------|------|--------|---------|---------|
| `id` | string | 1-20 | `prod-\d+` | `"prod-001"` |
| `name` | string | 1-100 | Any | `"CloudSync Pro"` |
| `description` | string | 1-500 | Any | `"Real-time synchronization..."` |
| `category` | string | 1-50 | Any | `"Integration"` |
| `pricing` | string | 1-100 | Any | `"$299/month"` or `"Custom"` |

**Minimum Example**:
```json
{
  "products": [
    {
      "id": "prod-001",
      "name": "Product A",
      "description": "Description of product A",
      "category": "Category",
      "pricing": "$99/month"
    }
  ]
}
```

**Maximum Example** (10 products):
```json
{
  "products": [
    {
      "id": "prod-001",
      "name": "CloudSync Pro",
      "description": "Real-time data synchronization across cloud platforms with enterprise-grade security and compliance",
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

**Validation Rules**:
- Must be valid JSON (no syntax errors)
- Array `products` must contain at least 1 item
- Each product object must have all 5 required fields
- All string fields must be non-empty
- IDs within array must be unique
- File size: <200KB (uncompressed)

**Error Handling**:
- If file not found (404): Display "Unable to load products. Please try again later."
- If file is invalid JSON (500): Display "Error loading products. Please refresh the page."
- If file is empty: Display "No products available."

---

## Partners Data Format

**File**: `data/partners.json`

**Content-Type**: `application/json`

**HTTP Response Example**:
```http
HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: max-age=86400
```

**JSON Schema**:
```json
{
  "partners": [
    {
      "id": "string",           // Unique identifier (required)
      "name": "string",         // Partner name (required)
      "logo": "string",         // Logo image path/URL (required)
      "description": "string"   // Partner description (optional)
    }
  ]
}
```

**Field Specifications**:

| Field | Type | Length | Pattern | Example |
|-------|------|--------|---------|---------|
| `id` | string | 1-20 | `partner-\d+` | `"partner-001"` |
| `name` | string | 1-100 | Any | `"Acme Solutions"` |
| `logo` | string | 1-200 | Path or URL | `"/images/partners/logo.png"` |
| `description` | string | 0-300 | Any | `"Leading enterprise provider..."` |

**Minimum Example**:
```json
{
  "partners": [
    {
      "id": "partner-001",
      "name": "Partner A",
      "logo": "/images/partners/partner-a-logo.png"
    }
  ]
}
```

**Full Example** (5 partners):
```json
{
  "partners": [
    {
      "id": "partner-001",
      "name": "Acme Solutions",
      "logo": "/images/partners/acme-logo.png",
      "description": "Leading enterprise integration and API management platform"
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
    },
    {
      "id": "partner-004",
      "name": "TechCorp Global",
      "logo": "/images/partners/techcorp-logo.png"
    },
    {
      "id": "partner-005",
      "name": "InnovateSoft",
      "logo": "/images/partners/innovatesoft-logo.png",
      "description": "Innovation consulting and software development"
    }
  ]
}
```

**Validation Rules**:
- Must be valid JSON
- Array `partners` must contain at least 1 item
- Each partner must have `id`, `name`, and `logo` (required)
- `description` is optional but recommended
- IDs must be unique within array
- Logo path must reference valid image file
- File size: <100KB (uncompressed)

**Error Handling**:
- If file not found (404): Display "Unable to load partners. Please try again later."
- If file is invalid JSON (500): Display "Error loading partners. Please refresh the page."
- If file is empty: Display "No partners available."

---

## Image Format Specifications

### Partner Logos

**Location**: `images/partners/`

**Formats Supported**:
- PNG (.png) — universally compatible, recommended for fallback
- WebP (.webp) — modern format, ~30% smaller than PNG

**Dimensions**:
- Recommended: 200px × 100px or 300px × 150px
- Aspect ratio: 2:1 to 3:1 (wider logos)
- Scalable: Use CSS to maintain aspect ratio

**File Size**:
- PNG: <50KB per image
- WebP: <30KB per image

**Color Profile**:
- RGB (not CMYK)
- Include alpha channel for transparency if logo has transparent areas

**Quality**:
- Minimum 72 DPI (screen optimized)
- No interlacing required

**HTML Usage**:
```html
<!-- With WebP fallback -->
<img 
  src="/images/partners/acme-logo.webp" 
  alt="Acme Solutions" 
  type="image/webp"
/>
<img 
  src="/images/partners/acme-logo.png" 
  alt="Acme Solutions" 
/>

<!-- Or with picture element -->
<picture>
  <source srcset="/images/partners/acme-logo.webp" type="image/webp">
  <img src="/images/partners/acme-logo.png" alt="Acme Solutions">
</picture>
```

---

## API Request/Response Examples

### Load Products Request

**URL**: `/data/products.json`

**Method**: `GET`

**Headers**:
```
Host: example.com
User-Agent: Mozilla/5.0...
Accept: application/json
```

**JavaScript**:
```javascript
fetch('/data/products.json')
  .then(response => {
    if (!response.ok) throw new Error('Failed to load products');
    return response.json();
  })
  .then(data => console.log(data.products))
  .catch(error => console.error('Error:', error));
```

### Load Partners Request

**URL**: `/data/partners.json`

**Method**: `GET`

**JavaScript**:
```javascript
fetch('/data/partners.json')
  .then(response => {
    if (!response.ok) throw new Error('Failed to load partners');
    return response.json();
  })
  .then(data => console.log(data.partners))
  .catch(error => console.error('Error:', error));
```

---

## Caching Strategy

### Browser Cache Headers

**Recommended Headers** (for static files):
```
Cache-Control: public, max-age=86400
ETag: "abc123"
Last-Modified: Fri, 21 Jun 2026 10:00:00 GMT
```

**max-age Values**:
- `86400` = 1 day (recommended for data files)
- `31536000` = 1 year (for images with cache busting)

### localStorage Caching (Client-Side)

**Pattern**:
```javascript
const CACHE_KEY = 'products_cache';
const CACHE_TTL = 3600000; // 1 hour

function getCachedProducts() {
  const cached = JSON.parse(localStorage.getItem(CACHE_KEY));
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  return null;
}

function setCachedProducts(data) {
  localStorage.setItem(CACHE_KEY, JSON.stringify({
    data,
    timestamp: Date.now()
  }));
}
```

---

## Versioning

**Current Version**: 1.0

**Future Versions**:
- v1.1: Add `tags` array to products (e.g., "popular", "new")
- v2.0: Add `productUrl` field for product detail pages
- v2.0: Add `partnerUrl` field for partner website links

**Backward Compatibility**:
- New fields must be optional (not required)
- Existing clients must ignore unknown fields

---

## Status

✅ **Complete** — Data format contracts fully specified and ready for implementation.
