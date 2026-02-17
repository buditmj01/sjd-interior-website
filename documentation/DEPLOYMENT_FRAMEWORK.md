# 🚀 SJD Interior - Deployment Framework (100% Working)

This framework provides a guaranteed way to update your production website directly from your local machine, **without using GitHub Actions**.

## 🛠 Prerequisites
- **lftp** installed on your Mac (`brew install lftp`)
- Latest files pulled from your local project directory.

## 📦 How to Update (One-Step Deployment)

Simply run the following command in your terminal from the project root:

```bash
./build-and-upload.sh
```

### What this script does:
1.  **Builds the Frontend**: Runs `npm run build` with the correct production URLs.
2.  **Patches Paths**: Automatically fixes hardcoded local paths to work on your cPanel server using `scripts/patch-paths.js`.
3.  **Uploads via FTP**: Mirrors your local `dist` folder to the `/frontend` directory on the server.
4.  **Triggers Restart**: Automatically creates `tmp/restart.txt` on the server to force the Node.js application to reload.

---

## 🔍 Verification Checklist

After the script finishes (usually ~1 minute):
1.  Visit [https://sjdinterior.com](https://sjdinterior.com)
2.  Check the **Portfolio** and **Insight** pages.
3.  If you see old content, do a **Hard Refresh** (`Cmd + Shift + R`).

## 🛠 Manual Fixes (If needed)

### Force Manual Restart
If changes don't appear after a few minutes, you can still restart manually in cPanel:
1.  Log in to **cPanel**.
2.  Go to **"Setup Node.js App"**.
3.  Click **"Restart"** for the `sjdinterior.com` application.

### Troubleshooting "Internal Server Error"
- **Check Paths**: Ensure `scripts/patch-paths.js` has the correct `SERVER_PATH` (currently set to `/home/wwwsjdin/frontend/`).
- **Check Logs**: Download `/frontend/stderr.log` from the server to see specific Node.js errors.
