# Quick Rebuild Guide

Since Strapi webhooks don't work with GitHub's API (Error 422), use this simple manual approach:

## When You Update Content in Strapi:

### Option 1: Use the Script (Easiest)
```bash
cd /Users/budi.triatmojo/Documents/Web\ Project/sjd-interior-new
./rebuild-frontend.sh
```

### Option 2: GitHub CLI Command
```bash
gh workflow run automation.yml --ref main
```

### Option 3: GitHub Web Interface
1. Go to: https://github.com/buditmj01/sjd-interior-website/actions
2. Click "Frontend Automation"
3. Click "Run workflow" → Select "main" → Click "Run workflow"

## First Time Setup (GitHub CLI)

If you haven't used GitHub CLI before:

```bash
# Install GitHub CLI (Mac)
brew install gh

# Authenticate
gh auth login
```

## Workflow

1. **Update content** in Strapi CMS
2. **Run rebuild script** (or use one of the options above)
3. **Wait 2-5 minutes** for build to complete
4. **Check your site** at https://sjdinterior.com

That's it! Simple and reliable.

## Why Webhooks Don't Work

Strapi v4 sends its own webhook format, but GitHub's `repository_dispatch` API expects a specific JSON structure. Since Strapi doesn't allow custom body configuration, we can't make them compatible without a middleware service.

The manual trigger approach is actually more reliable and gives you control over when rebuilds happen.
