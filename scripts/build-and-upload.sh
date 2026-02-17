#!/bin/bash

# Build and deploy Astro SSR frontend to cPanel via FTP
# Usage: ./build-and-upload.sh
# After upload: restart Node.js app in cPanel

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
FRONTEND_DIR="$PROJECT_DIR/frontend"

FTP_HOST="103.58.102.59"
FTP_USER="wwwsjdin"
FTP_PASS='W6|Iz4-N?S'
FTP_DIR="/frontend"

echo "========================================="
echo "  SJD Interior - Build & Deploy (SSR)"
echo "========================================="
echo ""

# Check lftp
if ! command -v lftp &> /dev/null; then
    echo "lftp is not installed. Install with: brew install lftp"
    exit 1
fi

# Step 1: Build
echo "[1/2] Building Astro SSR..."
cd "$FRONTEND_DIR"
PUBLIC_STRAPI_URL=https://cms.sjdinterior.com \
PUBLIC_SITE_URL=https://sjdinterior.com \
PUBLIC_GA_ID=G-4MRCD5LNDN \
npm run build

# Step 3: Patch absolute paths for server
echo "[1.5/2] Patching build files for server..."
node "$SCRIPT_DIR/patch-paths.js"

echo ""
echo "[2/2] Deploying to production via FTP..."

/opt/homebrew/bin/lftp -c "
set ssl:verify-certificate no
set ftp:ssl-allow yes
open -u $FTP_USER,'$FTP_PASS' $FTP_HOST
# Force clean deployment by removing remote dist folder
rm -rf $FTP_DIR/dist
mirror --reverse --delete --verbose=3 --ignore-time \
  --exclude node_modules/ \
  --exclude src/ \
  --exclude \"^\\.astro/\" \
  --exclude .gitignore \
  . $FTP_DIR/
# Trigger Node.js restart (Passenger)
mkdir -p $FTP_DIR/tmp
echo \"Restart triggered at $(date)\" > restart.txt
put restart.txt -o $FTP_DIR/tmp/restart.txt
bye
"
rm restart.txt


echo ""
echo "========================================="
echo "  Deploy complete!"
echo "  Next: Restart Node.js app in cPanel"
echo "  https://sjdinterior.com"
echo "========================================="
