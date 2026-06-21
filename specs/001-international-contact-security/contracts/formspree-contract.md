# Formspree Integration Contract

**Date**: 2026-06-21  
**Service**: Formspree (Third-party form submission service)  
**Scope**: Contact form submission for International Contact Form feature

## Service Overview

Formspree is a third-party form backend service that handles form submissions without requiring a custom backend. When a form is submitted to a Formspree endpoint, the service:
1. Receives the form data via HTTP POST
2. Validates and processes the submission
3. Sends email notification to configured recipient(s)
4. Returns success/error response to client

**Service URL**: `https://formspree.io/f/{FORM_ID}`

---

## Request Contract

### HTTP Method
```
POST https://formspree.io/f/{FORM_ID}
```

### Headers
```
Content-Type: application/json
Accept: application/json
```

### Request Body (JSON)

```javascript
{
  "name": string,           // User's full name (required)
  "email": string,          // User's email address (required, must be valid email)
  "subject": string,        // Inquiry subject (required)
  "message": string,        // Inquiry message (required)
  "_subject": string        // (Optional) Custom email subject override
}
```

**Example**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Question about Products",
  "message": "I'd like to know more about your product offerings.",
  "_subject": "New Contact Form Submission: Question about Products"
}
```

### Field Requirements

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| name | string | Yes | Non-empty, max 255 characters |
| email | string | Yes | Valid email format (checked client-side before submission) |
| subject | string | Yes | Non-empty, max 500 characters |
| message | string | Yes | Non-empty, max 5000 characters |
| _subject | string | No | Custom email subject (optional; default: form data) |

---

## Response Contract

### Success Response (HTTP 200 or 201)

```javascript
{
  "ok": true,
  "message": "Your message has been received",
  "next": null
}
```

**Status Code**: 200 or 201 OK

**Headers**:
```
Content-Type: application/json
```

**Meaning**: Form submission accepted; email will be sent.

**Client Action**: Show success message to user; clear form fields.

### Error Response (HTTP 4xx or 5xx)

```javascript
{
  "ok": false,
  "errors": [
    {
      "field": string,     // Field name (e.g., "email")
      "message": string    // Error description
    }
  ]
}
```

**Status Codes**:
- `400 Bad Request`: Invalid request format, missing required fields, or invalid email
- `422 Unprocessable Entity`: Validation error (e.g., invalid email format)
- `429 Too Many Requests`: Rate limit exceeded (Formspree limits submissions)
- `5xx Server Error`: Formspree service error

**Meaning**: Submission rejected or service unavailable.

**Client Action**: Display error message to user; keep form fields cleared (per spec requirement).

**Example Error**:
```json
{
  "ok": false,
  "errors": [
    {
      "field": "email",
      "message": "Invalid email address"
    }
  ]
}
```

---

## Behavior & Constraints

### Rate Limiting
- Formspree free tier allows ~50 submissions per month per form
- Exceeding limit returns HTTP 429
- Client should show "Rate limit exceeded, please try later" message

### Email Delivery
- Formspree sends confirmation email from submission (sender email must be valid)
- Email routed to Formspree-configured recipient (set in Formspree dashboard)
- No guarantee of immediate delivery; may be delayed minutes/hours

### CORS (Cross-Origin Resource Sharing)
- Formspree CORS policy allows requests from any origin
- Preflight OPTIONS request handled by Formspree
- No custom CORS configuration needed

### HTTPS
- Formspree endpoint is HTTPS only
- All requests must use `https://` (not `http://`)

### Timeout
- Client should set fetch timeout to ~10 seconds
- Formspree typically responds within 1-3 seconds
- Longer timeouts indicate network or service issue

---

## Error Handling

### Client-Side Strategy

1. **Network Error** (fetch fails):
   ```
   Display: "Unable to connect to form service. Please check your connection and try again."
   Action: Clear form fields; user can retry
   ```

2. **Validation Error** (HTTP 400/422):
   ```
   Display: Show specific field error from Formspree response
   Action: Clear form fields; user can retry with corrected data
   ```

3. **Rate Limit** (HTTP 429):
   ```
   Display: "Too many submissions. Please try again later."
   Action: Clear form fields; user can retry later
   ```

4. **Server Error** (HTTP 5xx):
   ```
   Display: "Form service temporarily unavailable. Please try again in a few moments."
   Action: Clear form fields; user can retry
   ```

5. **Timeout** (No response within 10 seconds):
   ```
   Display: "Request timed out. Please try again."
   Action: Clear form fields; user can retry
   ```

---

## Security Considerations

### CSRF Protection
- Formspree does NOT require CSRF tokens
- Client-side fetch requests are safe (SOP prevents browser from sending to cross-origin by default)
- No token exchange needed

### Input Validation
- Client validates email format before submission (faster feedback)
- Formspree also validates on receipt
- No need for server-side validation beyond client-side checks

### Data Transmission
- All data transmitted via HTTPS (encrypted in transit)
- No sensitive credentials exposed in request
- Form data is plain JSON (no encoding tricks)

### Spam Prevention
- Formspree provides built-in spam filtering (optional, enable in dashboard)
- Client-side validation reduces spam submissions
- Rate limiting naturally limits submission volume

---

## Setup Instructions (Out of Scope)

1. Create Formspree account at https://formspree.io
2. Create new form in Formspree dashboard
3. Configure recipient email address
4. Copy form ID from Formspree (format: `abc123def456`)
5. Construct endpoint URL: `https://formspree.io/f/{FORM_ID}`
6. Add form ID to `contact.html` or environment configuration

---

## Testing Checklist

- [ ] POST request to Formspree with valid data returns HTTP 200/201
- [ ] Response includes `"ok": true` for successful submission
- [ ] Invalid email format returns HTTP 400/422 error
- [ ] Missing required fields returns HTTP 400/422 error
- [ ] Email received at configured recipient address
- [ ] Fetch timeout returns error (if configured)
- [ ] Rate limit (429) handled gracefully by client
- [ ] Success message displays after valid submission
- [ ] Error message displays on failure
- [ ] Form fields cleared after submission (success or error)

---

## Contract Status

✅ **COMPLETE** | **Verified**: Formspree API v1 as of 2026-06-21 | **Ready for Implementation**
