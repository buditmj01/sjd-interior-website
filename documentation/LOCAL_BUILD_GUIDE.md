# Local Build + FTP Upload Guide

This guide shows you how to build the frontend locally and upload directly to cPanel via FTP, bypassing GitHub Actions.

## Quick Start

```bash
cd /Users/budi.triatmojo/Documents/Web\ Project/sjd-interior-new
./build-and-upload.sh
```

## What This Does

1. **Builds frontend locally** - Runs `npm run build` to generate static files
2. **Uploads via FTP** - Automatically uploads `dist/` folder to your cPanel

## First Time Setup

### Option 1: Automatic Upload (Recommended)

1. **Install lftp** (FTP client):
   ```bash
   brew install lftp
   ```

2. **Edit FTP credentials** in `build-and-upload.sh`:
   ```bash
   nano build-and-upload.sh
   ```
   
   Update these lines:
   ```bash
   FTP_HOST="ftp.sjdinterior.com"      # Your actual FTP hostname
   FTP_USER="your_ftp_username"         # Your cPanel username
   FTP_PASS="your_ftp_password"         # Your cPanel password
   FTP_DIR="/public_html"               # Where to upload
   ```

3. **Run the script**:
   ```bash
   ./build-and-upload.sh
   ```

### Option 2: Manual Upload

If you prefer to upload manually:

1. **Build locally**:
   ```bash
   cd frontend
   npm run build
   ```

2. **Upload using FTP client** (FileZilla, Cyberduck, etc.):
   - Connect to your cPanel FTP
   - Upload contents of `frontend/dist/` to `/public_html/`
   - Make sure to **overwrite** existing files

## When to Use This

Use this method when you:
- ✅ Want faster deployments (no GitHub Actions wait time)
- ✅ Want to test changes immediately
- ✅ Prefer direct control over uploads
- ✅ Don't want to commit every small change to Git

## Workflow

1. **Update content in Strapi CMS**
2. **Run build script**: `./build-and-upload.sh`
3. **Wait 30-60 seconds** for upload
4. **Check your site**: https://sjdinterior.com (hard refresh)

## Comparison

| Method | Speed | Requires Git Commit | Auto Deploy |
|--------|-------|---------------------|-------------|
| **Local Build + FTP** | ⚡ Fast (1-2 min) | ❌ No | ❌ No |
| **GitHub Actions** | 🐢 Slow (3-5 min) | ✅ Yes | ✅ Yes |

## Troubleshooting

### Build fails
```bash
cd frontend
npm install  # Reinstall dependencies
npm run build
```

### FTP upload fails
- Check FTP credentials in `build-and-upload.sh`
- Try manual upload with FTP client
- Verify FTP hostname and directory path

### Changes not appearing
- Hard refresh: `Cmd + Shift + R`
- Clear browser cache
- Check if files uploaded to correct directory
