#!/bin/bash

# Prepare SJD Interior Design for Deployment
# This script helps set up environment files and build configurations

echo "🚀 Preparing SJD Interior Design for Deployment"
echo "================================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to generate random secrets
generate_secret() {
  openssl rand -base64 32
}

# Check if we're in the right directory
if [ ! -f "package.json" ] && [ ! -d "cms" ] && [ ! -d "frontend" ]; then
  echo -e "${RED}❌ Error: Not in project root directory${NC}"
  echo "Please run this script from the project root"
  exit 1
fi

echo "📋 Step 1: Generate Strapi Secrets"
echo "-----------------------------------"

APP_KEYS=$(generate_secret),$(generate_secret),$(generate_secret),$(generate_secret)
API_TOKEN_SALT=$(generate_secret)
ADMIN_JWT_SECRET=$(generate_secret)
TRANSFER_TOKEN_SALT=$(generate_secret)
JWT_SECRET=$(generate_secret)

echo -e "${GREEN}✓ Generated secure secrets${NC}"
echo ""

# Create CMS staging environment
echo "📝 Step 2: Creating CMS Environment Files"
echo "------------------------------------------"

cat > cms/.env.staging <<EOF
# Strapi Configuration - STAGING
HOST=0.0.0.0
PORT=1337

# Secrets (keep these secure!)
APP_KEYS=$APP_KEYS
API_TOKEN_SALT=$API_TOKEN_SALT
ADMIN_JWT_SECRET=$ADMIN_JWT_SECRET
TRANSFER_TOKEN_SALT=$TRANSFER_TOKEN_SALT
JWT_SECRET=$JWT_SECRET

# Database (PostgreSQL on Railway)
DATABASE_CLIENT=postgres
DATABASE_HOST=your-railway-db-host.railway.app
DATABASE_PORT=5432
DATABASE_NAME=railway
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your-db-password
DATABASE_SSL=false

# URLs
PUBLIC_URL=https://api-staging.sjdinterior.com
CLIENT_URL=https://staging.sjdinterior.com

# Environment
NODE_ENV=production
EOF

cat > cms/.env.production <<EOF
# Strapi Configuration - PRODUCTION
HOST=0.0.0.0
PORT=1337

# Secrets (use DIFFERENT secrets from staging!)
APP_KEYS=$APP_KEYS
API_TOKEN_SALT=$API_TOKEN_SALT
ADMIN_JWT_SECRET=$ADMIN_JWT_SECRET
TRANSFER_TOKEN_SALT=$TRANSFER_TOKEN_SALT
JWT_SECRET=$JWT_SECRET

# Database (PostgreSQL on Railway)
DATABASE_CLIENT=postgres
DATABASE_HOST=your-railway-db-host.railway.app
DATABASE_PORT=5432
DATABASE_NAME=railway
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your-db-password
DATABASE_SSL=false

# URLs
PUBLIC_URL=https://api.sjdinterior.com
CLIENT_URL=https://sjdinterior.com

# Environment
NODE_ENV=production
EOF

echo -e "${GREEN}✓ Created cms/.env.staging${NC}"
echo -e "${GREEN}✓ Created cms/.env.production${NC}"
echo ""

# Create Frontend environment files
cat > frontend/.env.staging <<EOF
# Frontend Configuration - STAGING
PUBLIC_STRAPI_URL=https://api-staging.sjdinterior.com
EOF

cat > frontend/.env.production <<EOF
# Frontend Configuration - PRODUCTION
PUBLIC_STRAPI_URL=https://api.sjdinterior.com
EOF

echo -e "${GREEN}✓ Created frontend/.env.staging${NC}"
echo -e "${GREEN}✓ Created frontend/.env.production${NC}"
echo ""

# Install PostgreSQL adapter for Strapi
echo "📦 Step 3: Installing PostgreSQL Support"
echo "-----------------------------------------"

cd cms
if npm list pg > /dev/null 2>&1; then
  echo -e "${YELLOW}⚠ PostgreSQL adapter already installed${NC}"
else
  npm install pg
  echo -e "${GREEN}✓ Installed pg (PostgreSQL adapter)${NC}"
fi
cd ..
echo ""

# Create database config
echo "⚙️  Step 4: Updating Database Configuration"
echo "-------------------------------------------"

cat > cms/config/database.js <<'EOF'
module.exports = ({ env }) => ({
  connection: {
    client: env('DATABASE_CLIENT', 'postgres'),
    connection: {
      host: env('DATABASE_HOST', '127.0.0.1'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'strapi'),
      user: env('DATABASE_USERNAME', 'strapi'),
      password: env('DATABASE_PASSWORD', 'strapi'),
      ssl: env.bool('DATABASE_SSL', false) && {
        rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false),
      },
    },
    debug: false,
  },
});
EOF

echo -e "${GREEN}✓ Updated cms/config/database.js${NC}"
echo ""

# Update CORS and security
echo "🔒 Step 5: Updating Security & CORS"
echo "------------------------------------"

cat > cms/config/middlewares.js <<'EOF'
module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'https://sjdinterior.com',
            'https://staging.sjdinterior.com',
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'https://sjdinterior.com',
            'https://staging.sjdinterior.com',
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: [
        'https://sjdinterior.com',
        'https://staging.sjdinterior.com',
        'http://localhost:4321',
        'http://localhost:3000',
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      keepHeaderOnError: true,
    },
  },
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
EOF

echo -e "${GREEN}✓ Updated cms/config/middlewares.js${NC}"
echo ""

# Create .htaccess for frontend
echo "🌐 Step 6: Creating .htaccess for Frontend"
echo "-------------------------------------------"

cat > frontend/public/.htaccess <<'EOF'
# SJD Interior Design - Apache Configuration

# Enable Rewrite Engine
<IfModule mod_rewrite.c>
  RewriteEngine On

  # Redirect to HTTPS
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

  # Handle Astro routing (SPA fallback)
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^(.*)$ /index.html [L]
</IfModule>

# Cache Static Assets
<IfModule mod_expires.c>
  ExpiresActive On

  # Images
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"

  # CSS and JavaScript
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"

  # Fonts
  ExpiresByType application/font-woff2 "access plus 1 year"
  ExpiresByType application/font-woff "access plus 1 year"

  # HTML (no cache for dynamic content)
  ExpiresByType text/html "access plus 0 seconds"
</IfModule>

# Gzip Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/plain
  AddOutputFilterByType DEFLATE text/xml
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE text/javascript
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE application/json
  AddOutputFilterByType DEFLATE image/svg+xml
</IfModule>

# Security Headers
<IfModule mod_headers.c>
  # Prevent MIME type sniffing
  Header set X-Content-Type-Options "nosniff"

  # Enable XSS protection
  Header set X-XSS-Protection "1; mode=block"

  # Prevent clickjacking
  Header set X-Frame-Options "SAMEORIGIN"

  # Referrer Policy
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# Disable directory browsing
Options -Indexes

# Protect sensitive files
<FilesMatch "^\.">
  Order allow,deny
  Deny from all
</FilesMatch>
EOF

echo -e "${GREEN}✓ Created frontend/public/.htaccess${NC}"
echo ""

# Create build info file
echo "📄 Step 7: Creating Deployment Checklist"
echo "-----------------------------------------"

cat > DEPLOYMENT_CHECKLIST.md <<'EOF'
# Deployment Checklist

## Before Deploying

### Staging Deployment
- [ ] Update database credentials in `cms/.env.staging`
- [ ] Update PUBLIC_STRAPI_URL in `frontend/.env.staging`
- [ ] Test CMS locally with PostgreSQL
- [ ] Build frontend for staging: `cd frontend && npm run build:staging`
- [ ] Upload frontend files to Biznet Gio staging subdomain
- [ ] Deploy Strapi to Railway staging
- [ ] Test all pages on staging site
- [ ] Test all Strapi API endpoints
- [ ] Verify images and media load correctly
- [ ] Test forms and user interactions

### Production Deployment
- [ ] Generate NEW secrets for production (don't reuse staging secrets)
- [ ] Update database credentials in `cms/.env.production`
- [ ] Update PUBLIC_STRAPI_URL in `frontend/.env.production`
- [ ] Create database backup from staging
- [ ] Build frontend for production: `cd frontend && npm run build:production`
- [ ] Upload frontend files to Biznet Gio production
- [ ] Deploy Strapi to Railway production
- [ ] Migrate content from staging to production
- [ ] Set up SSL certificates
- [ ] Configure custom domains (api.sjdinterior.com, sjdinterior.com)
- [ ] Test all pages on production site
- [ ] Set up monitoring (UptimeRobot)
- [ ] Configure automated backups

## After Deployment

- [ ] Monitor error logs for 24 hours
- [ ] Check site performance (PageSpeed Insights)
- [ ] Verify SEO meta tags
- [ ] Test on mobile devices
- [ ] Set up Google Analytics (optional)
- [ ] Submit sitemap to Google Search Console

## Railway Environment Variables

Copy these to Railway dashboard:

**Staging:**
- HOST=0.0.0.0
- PORT=1337
- APP_KEYS=[from .env.staging]
- API_TOKEN_SALT=[from .env.staging]
- ADMIN_JWT_SECRET=[from .env.staging]
- TRANSFER_TOKEN_SALT=[from .env.staging]
- JWT_SECRET=[from .env.staging]
- DATABASE_CLIENT=postgres
- DATABASE_HOST=[from Railway PostgreSQL]
- DATABASE_PORT=5432
- DATABASE_NAME=railway
- DATABASE_USERNAME=postgres
- DATABASE_PASSWORD=[from Railway PostgreSQL]
- DATABASE_SSL=false
- PUBLIC_URL=https://api-staging.sjdinterior.com
- CLIENT_URL=https://staging.sjdinterior.com
- NODE_ENV=production

**Production:**
Same as staging but with production URLs and DIFFERENT secrets.

## Biznet Gio FTP Details

**Staging:**
- Host: ftp.yoursite.com
- Username: [your cPanel username]
- Password: [your cPanel password]
- Port: 21 (FTP) or 22 (SFTP)
- Directory: /public_html/staging/

**Production:**
- Host: ftp.yoursite.com
- Username: [your cPanel username]
- Password: [your cPanel password]
- Port: 21 (FTP) or 22 (SFTP)
- Directory: /public_html/ (or /public_html/sjdinterior.com/)

## DNS Configuration

Add these records at your domain registrar:

**Staging:**
```
Type: CNAME
Name: staging
Value: yoursite.com (points to Biznet Gio)
```

```
Type: CNAME
Name: api-staging
Value: your-railway-app.up.railway.app
```

**Production:**
```
Type: A
Name: @
Value: [Biznet Gio IP address]
```

```
Type: CNAME
Name: www
Value: sjdinterior.com
```

```
Type: CNAME
Name: api
Value: your-railway-prod-app.up.railway.app
```

## Support Contacts

- Biznet Gio: https://portal.biznetgio.com/support
- Railway: https://railway.app/help
- GitHub Issues: [your repo]/issues
EOF

echo -e "${GREEN}✓ Created DEPLOYMENT_CHECKLIST.md${NC}"
echo ""

# Summary
echo "=============================================="
echo -e "${GREEN}✅ Deployment preparation complete!${NC}"
echo "=============================================="
echo ""
echo "📝 What was created:"
echo "  • cms/.env.staging (update database credentials)"
echo "  • cms/.env.production (update database credentials)"
echo "  • frontend/.env.staging"
echo "  • frontend/.env.production"
echo "  • cms/config/database.js (PostgreSQL support)"
echo "  • cms/config/middlewares.js (CORS & security)"
echo "  • frontend/public/.htaccess (Apache config)"
echo "  • DEPLOYMENT_CHECKLIST.md (step-by-step guide)"
echo ""
echo "⚠️  IMPORTANT NEXT STEPS:"
echo ""
echo "1. Edit cms/.env.staging and update:"
echo "   - DATABASE_HOST (from Railway PostgreSQL)"
echo "   - DATABASE_PASSWORD (from Railway PostgreSQL)"
echo ""
echo "2. Edit cms/.env.production and update:"
echo "   - DATABASE_HOST (from Railway PostgreSQL)"
echo "   - DATABASE_PASSWORD (from Railway PostgreSQL)"
echo "   - Generate NEW secrets (don't reuse staging!)"
echo ""
echo "3. Follow DEPLOYMENT_GUIDE.md for detailed instructions"
echo ""
echo "4. Use DEPLOYMENT_CHECKLIST.md to track progress"
echo ""
echo -e "${YELLOW}⚠️  SECURITY: Keep .env files private! Never commit them to Git.${NC}"
echo ""
echo "📚 Read full guide: DEPLOYMENT_GUIDE.md"
echo ""
