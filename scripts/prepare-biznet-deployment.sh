#!/bin/bash

# Prepare SJD Interior Design for Biznet Gio Personal Large Deployment
# Architecture: Subdomain approach
#   - CMS (Strapi): cms.sjdinterior.com
#   - Frontend (Astro): sjdinterior.com
# No SSH required - uses cPanel UI + FTP

set -e

echo "Preparing for Biznet Gio Personal Large Deployment"
echo "==================================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

echo -e "${BLUE}Biznet Gio Personal Large:${NC}"
echo "  - Node.js support (cPanel Setup Node.js App)"
echo "  - MySQL Databases (unlimited)"
echo "  - No SSH needed (cPanel UI + FTP)"
echo ""
echo -e "${BLUE}Architecture:${NC}"
echo "  - CMS:      https://cms.sjdinterior.com (Strapi)"
echo "  - Frontend:  https://sjdinterior.com (Astro static)"
echo ""

# ============================================
# Step 1: Build CMS (Strapi)
# ============================================
echo "Step 1: Building CMS for production"
echo "------------------------------------"

if [ ! -f "$PROJECT_DIR/cms/.env.production" ]; then
  echo -e "${RED}ERROR: cms/.env.production not found!${NC}"
  echo "Create it first with your Biznet database credentials."
  exit 1
fi

# Copy production env
cp "$PROJECT_DIR/cms/.env.production" "$PROJECT_DIR/cms/.env"
echo -e "${GREEN}Copied .env.production -> .env${NC}"

# Install dependencies
cd "$PROJECT_DIR/cms"
echo "Installing CMS dependencies..."
npm install --legacy-peer-deps
echo -e "${GREEN}Dependencies installed${NC}"

# Build Strapi admin panel
echo "Building Strapi admin panel (this may take a few minutes)..."
NODE_ENV=production npm run build
echo -e "${GREEN}Strapi admin panel built${NC}"

cd "$PROJECT_DIR"
echo ""

# ============================================
# Step 2: Build Frontend (Astro)
# ============================================
echo "Step 2: Building Frontend for production"
echo "-----------------------------------------"

if [ ! -f "$PROJECT_DIR/frontend/.env.production" ]; then
  echo -e "${RED}ERROR: frontend/.env.production not found!${NC}"
  exit 1
fi

# Copy production env
cp "$PROJECT_DIR/frontend/.env.production" "$PROJECT_DIR/frontend/.env"
echo -e "${GREEN}Copied .env.production -> .env${NC}"

cd "$PROJECT_DIR/frontend"
echo "Installing frontend dependencies..."
npm install
echo -e "${GREEN}Dependencies installed${NC}"

echo "Building Astro site..."
npm run build
echo -e "${GREEN}Frontend built to frontend/dist/${NC}"

cd "$PROJECT_DIR"
echo ""

# ============================================
# Step 3: Create .htaccess for frontend
# ============================================
echo "Step 3: Creating .htaccess for frontend"
echo "----------------------------------------"

cat > "$PROJECT_DIR/frontend/dist/.htaccess" <<'HTACCESS'
# SJD Interior - Frontend (Astro Static Site)
# Deployed to: sjdinterior.com

<IfModule mod_rewrite.c>
  RewriteEngine On

  # Redirect to HTTPS
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

  # Redirect www to non-www
  RewriteCond %{HTTP_HOST} ^www\.sjdinterior\.com$ [NC]
  RewriteRule ^(.*)$ https://sjdinterior.com/$1 [L,R=301]

  # Handle Astro routing (SPA fallback)
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^(.*)$ /index.html [L]
</IfModule>

# Cache Static Assets
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType font/woff2 "access plus 1 year"
</IfModule>

# Gzip Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript application/json image/svg+xml
</IfModule>
HTACCESS

echo -e "${GREEN}Created frontend/dist/.htaccess${NC}"
echo ""

# ============================================
# Step 4: Prepare CMS upload package
# ============================================
echo "Step 4: Preparing CMS upload package"
echo "-------------------------------------"

UPLOAD_DIR="$PROJECT_DIR/deploy-biznet"
rm -rf "$UPLOAD_DIR"
mkdir -p "$UPLOAD_DIR/cms"
mkdir -p "$UPLOAD_DIR/frontend"

# Copy CMS files (exclude node_modules - install via cPanel)
echo "Copying CMS files..."
rsync -a --exclude='node_modules' --exclude='.tmp' --exclude='.cache' \
  --exclude='.env.staging' --exclude='.env.example' \
  "$PROJECT_DIR/cms/" "$UPLOAD_DIR/cms/"

# Copy frontend dist
echo "Copying frontend build..."
cp -r "$PROJECT_DIR/frontend/dist/"* "$UPLOAD_DIR/frontend/"
cp "$PROJECT_DIR/frontend/dist/.htaccess" "$UPLOAD_DIR/frontend/.htaccess"

echo -e "${GREEN}Upload package ready at: deploy-biznet/${NC}"
echo ""

# ============================================
# Summary
# ============================================
echo "==================================================="
echo -e "${GREEN}Build complete!${NC}"
echo "==================================================="
echo ""
echo "Upload package: deploy-biznet/"
echo "  deploy-biznet/cms/       -> Upload to Biznet for CMS"
echo "  deploy-biznet/frontend/  -> Upload to /public_html/"
echo ""
echo -e "${YELLOW}NEXT STEPS (in cPanel):${NC}"
echo ""
echo "1. Create subdomain 'cms.sjdinterior.com' in cPanel"
echo "   - cPanel -> Domains -> Create a New Domain"
echo "   - Domain: cms.sjdinterior.com"
echo ""
echo "2. Upload CMS files via FTP/File Manager"
echo "   - Upload deploy-biznet/cms/ contents to the app root"
echo "   - e.g., /home/wwwsjdin/cms/"
echo ""
echo "3. Setup Node.js App in cPanel"
echo "   - cPanel -> Setup Node.js App -> Create Application"
echo "   - Node.js version: 18 or 20"
echo "   - Application mode: Production"
echo "   - Application root: cms"
echo "   - Application URL: cms.sjdinterior.com"
echo "   - Application startup file: app.js"
echo ""
echo "4. In the Node.js App settings, click 'Run NPM Install'"
echo ""
echo "5. Add environment variables in cPanel Node.js App:"
echo "   (copy values from cms/.env.production)"
echo ""
echo "6. Click 'Start App' or 'Restart App'"
echo ""
echo "7. Upload frontend files via FTP/File Manager"
echo "   - Upload deploy-biznet/frontend/ contents to /public_html/"
echo ""
echo "8. Enable SSL: cPanel -> SSL/TLS -> AutoSSL"
echo ""
echo "9. Test: https://cms.sjdinterior.com/admin"
echo ""
echo "See BIZNET_CHECKLIST.md for the full step-by-step guide."
echo ""
