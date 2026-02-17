# Where to Add Custom Body in Strapi Webhook

## Visual Guide

The **Custom Body** field is located at the **bottom** of the webhook creation form in Strapi.

## Step-by-Step Location:

1. **Navigate to Webhooks**
   - Settings → Webhooks → Create new webhook

2. **Fill in Basic Info** (top of form)
   - Name: `GitHub Actions - Frontend Rebuild`
   - URL: `https://api.github.com/repos/buditmj01/sjd-interior-website/dispatches`

3. **Add Headers** (middle of form)
   - Accept: `application/vnd.github.v3+json`
   - Authorization: `Bearer YOUR_GITHUB_PAT`
   - Content-Type: `application/json`

4. **Select Events** (middle of form)
   - Check: entry.create, entry.update, entry.delete, entry.publish, entry.unpublish

5. **Enable Custom Body** (bottom of form) ⬅️ **THIS IS WHERE YOU ADD IT**
   - Look for a toggle/checkbox that says **"Use custom body"** or **"Custom body"**
   - **Enable/Check it**
   - A text area will appear below

6. **Paste JSON** (in the text area that appears)
   ```json
   {
     "event_type": "strapi-content-update",
     "client_payload": {
       "model": "{{ model }}",
       "entry": "{{ entry.id }}",
       "event": "{{ event }}"
     }
   }
   ```

## Important Notes:

- The custom body option is **at the very bottom** of the webhook form
- You must **enable/toggle it first** before the JSON editor appears
- If you don't see it, scroll down - it's below the Events section
- The JSON must be valid - Strapi will validate it when you save

## What It Looks Like:

```
┌─────────────────────────────────────────┐
│ Name: [GitHub Actions...]              │
│ URL: [https://api.github.com/repos...] │
│                                         │
│ Headers:                                │
│ ├─ Accept: application/vnd.github...   │
│ ├─ Authorization: Bearer ghp_...       │
│ └─ Content-Type: application/json      │
│                                         │
│ Events:                                 │
│ ☑ entry.create                         │
│ ☑ entry.update                         │
│ ☑ entry.delete                         │
│ ☑ entry.publish                        │
│ ☑ entry.unpublish                      │
│                                         │
│ ┌───────────────────────────────────┐  │
│ │ ☑ Use custom body            ⬅️  │  │ ← ENABLE THIS
│ └───────────────────────────────────┘  │
│                                         │
│ ┌───────────────────────────────────┐  │
│ │ {                                 │  │
│ │   "event_type": "strapi-content-  │  │ ← PASTE JSON HERE
│ │   "client_payload": {             │  │
│ │     ...                           │  │
│ │   }                               │  │
│ │ }                                 │  │
│ └───────────────────────────────────┘  │
│                                         │
│           [Save] [Cancel]              │
└─────────────────────────────────────────┘
```
