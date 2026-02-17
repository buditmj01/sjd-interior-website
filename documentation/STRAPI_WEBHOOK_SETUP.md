# Strapi Webhook Configuration Guide

## Step 1: Create GitHub Personal Access Token (PAT)

1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Configure token:
   - **Note**: `Strapi Webhook - Frontend Rebuild`
   - **Expiration**: `No expiration` (or 1 year)
   - **Scopes**: Check `repo` (Full control of private repositories)
4. Click **"Generate token"**
5. **IMPORTANT**: Copy the token immediately (you won't see it again)

---

## Step 2: Configure Strapi Webhook

1. Log in to Strapi: https://cms.sjdinterior.com/admin
2. Navigate to: **Settings** → **Webhooks**
3. Click **"Create new webhook"**

### Basic Settings:
```
Name: GitHub Actions - Frontend Rebuild
URL: https://github.com/buditmj01/sjd-interior-website/actions/workflows/automation.yml/dispatches
```

> [!IMPORTANT]
> Since Strapi v4 doesn't support custom body in webhooks, we'll use a **simpler approach**: trigger the workflow manually via GitHub CLI or use a webhook relay service.

### Alternative: Use GitHub Workflow Dispatch (Recommended)

Instead of using Strapi webhooks directly, use **manual triggers** when you update content:

**Option A: GitHub CLI (Fastest)**
```bash
gh workflow run automation.yml --ref main
```

**Option B: GitHub Web Interface**
1. Go to: https://github.com/buditmj01/sjd-interior-website/actions
2. Click "Frontend Automation"
3. Click "Run workflow" → Select "main" → Run

**Option C: Create a Simple Webhook Relay**
I can create a small Node.js script that receives Strapi webhooks and triggers GitHub Actions.

### Simplified Webhook (No Custom Body Needed):

If you still want to try webhooks, use this simpler configuration:

```
Name: Trigger Frontend Rebuild
URL: https://api.github.com/repos/buditmj01/sjd-interior-website/dispatches
```

### Headers:
| Name | Value |
|------|-------|
| `Accept` | `application/vnd.github.v3+json` |
| `Authorization` | `Bearer YOUR_GITHUB_PAT_HERE` |
| `Content-Type` | `application/json` |

### Events:
- ✅ **entry.publish** (Trigger rebuild when new content is live)
- ✅ **entry.unpublish** (Trigger rebuild when content is hidden)
- ✅ **entry.delete** (Trigger rebuild when content is permanently removed)
- ⚠️ Skip entry.create, entry.update (to avoid excessive build queues)

> [!NOTE]
> Without custom body support, the webhook will send Strapi's default payload. GitHub will receive it but the workflow will still trigger.


---

## Step 3: Test the Webhook

1. In Strapi webhook settings, find your webhook
2. Click the **"Trigger"** button
3. Check the response - should see `204 No Content` (success)
4. Go to GitHub Actions: https://github.com/buditmj01/sjd-interior-website/actions
5. You should see a new workflow run starting

---

## Step 4: Verify End-to-End

1. Edit any content in Strapi (e.g., update a project description)
2. Save and publish
3. Wait 2-5 minutes
4. Visit https://sjdinterior.com and hard refresh (Cmd+Shift+R)
5. Your changes should be visible!

---

## Troubleshooting

### Webhook shows error in Strapi logs
- **401 Unauthorized**: GitHub PAT is invalid or missing `repo` scope
- **404 Not Found**: Repository URL is incorrect
- **422 Unprocessable**: JSON body format is incorrect

### Workflow doesn't trigger
- Verify webhook URL is exactly: `https://api.github.com/repos/buditmj01/sjd-interior-website/dispatches`
- Check Authorization header has `Bearer ` prefix (with space)
- Ensure PAT hasn't expired

### Need to regenerate PAT?
1. Go to https://github.com/settings/tokens
2. Delete old token
3. Create new token with same settings
4. Update Authorization header in Strapi webhook
