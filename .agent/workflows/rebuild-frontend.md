---
description: Rebuild and deploy frontend after Strapi content updates
---

# Rebuild Frontend Workflow

This workflow is automatically triggered when you update content in Strapi CMS.

## Automatic Trigger (Recommended)

When properly configured, the frontend rebuilds automatically:

1. **Update content in Strapi** (https://cms.sjdinterior.com/admin)
2. **Strapi webhook fires** → Sends event to GitHub
3. **GitHub Actions runs** → Builds frontend with latest content
4. **Auto-deploys to production** → Changes live in 2-5 minutes

## Manual Trigger

If you need to rebuild manually:

### Via GitHub CLI
```bash
gh workflow run automation.yml --ref main
```

### Via GitHub Web Interface
1. Go to: https://github.com/buditmj01/sjd-interior-website/actions
2. Click "Frontend Automation" workflow
3. Click "Run workflow" button
4. Select branch: `main`
5. Click "Run workflow"

## Verification

After rebuild completes:

1. Visit https://sjdinterior.com
2. Hard refresh: `Cmd + Shift + R` (Mac) or `Ctrl + Shift + R` (Windows)
3. Verify your content changes appear

## Troubleshooting

### Changes not appearing?
- Wait 5 minutes (build + deploy time)
- Hard refresh browser to clear cache
- Check GitHub Actions logs for errors

### Webhook not triggering?
- Check Strapi: Settings → Webhooks → View logs
- Verify GitHub PAT is valid and has `repo` scope
- Test webhook manually in Strapi admin

### Build failing?
- Check GitHub Actions logs
- Verify Strapi CMS is accessible
- Ensure FTP credentials are correct in GitHub Secrets
