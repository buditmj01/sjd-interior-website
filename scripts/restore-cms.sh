#!/bin/bash

# Restore Strapi CMS folder to cPanel
# This script re-uploads the CMS files that were accidentally deleted

echo "📦 Preparing to restore Strapi CMS..."

# Navigate to cms directory
cd cms

# Define FTP credentials (same as build-and-upload.sh)
FTP_HOST="103.58.102.59"
FTP_USER="wwwsjdin"
FTP_PASS='W6|Iz4-N?S'
# Target the Passenger App Root as well
CMS_ROOT_DIR="/cms"
CMS_PUBLIC_DIR="/public_html/cms.sjdinterior.com"

# Check if lftp is installed
if ! command -v lftp &> /dev/null; then
    echo "❌ lftp is not installed"
    exit 1
fi

echo "🚀 Uploading CMS files to $CMS_ROOT_DIR and $CMS_PUBLIC_DIR..."

# Upload CMS source code to the actual app root
lftp -c "
set ssl:verify-certificate no;
open -u '$FTP_USER','$FTP_PASS' $FTP_HOST;
mkdir -p $CMS_ROOT_DIR;
cd $CMS_ROOT_DIR;
mirror -R --verbose \
  --exclude node_modules/ \
  --exclude .strapi/ \
  --exclude build/ \
  --exclude .DS_Store \
  --exclude .env \
  --exclude public/uploads/ \
  ./ ./;
put .env.production -o .env;

# Also sync the public directory (usually for .htaccess and static files)
mkdir -p $CMS_PUBLIC_DIR;
cd $CMS_PUBLIC_DIR;
mirror -R --verbose \
  --exclude node_modules/ \
  --exclude .strapi/ \
  --exclude build/ \
  --exclude .DS_Store \
  --exclude .env \
  --exclude public/uploads/ \
  ./ ./;
put .env.production -o .env;
bye
"

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ CMS files re-uploaded successfully!"
    echo "⚠️ NOTE: You MUST go to cPanel -> 'Setup Node.js App' and RE-SAVE the settings to regenerate the .htaccess file."
    echo "💡 This will fix the 'FileNotFoundError' you are seeing."
else
    echo ""
    echo "❌ Restore failed!"
    exit 1
fi
