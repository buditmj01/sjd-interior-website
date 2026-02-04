#!/bin/bash

# Prepare SJD Interior Design for Biznet Gio Deployment
# This script prepares the project for deployment to Biznet Gio Neo Web Hosting

echo "🚀 Preparing for Biznet Gio Neo Deployment"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Generate secrets
generate_secret() {
  openssl rand -base64 32
}

echo -e "${BLUE}Your Biznet Gio Package Supports:${NC}"
echo "  ✓ Node.js (for Strapi)"
echo "  ✓ MySQL Databases (unlimited)"
echo "  ✓ 1 GB RAM"
echo "  ✓ 60 GB SSD Storage"
echo ""
echo -e "${GREEN}You can run EVERYTHING on Biznet Gio!${NC}"
echo ""

# Generate secrets
APP_KEYS=$(generate_secret),$(generate_secret),$(generate_secret),$(generate_secret)
API_TOKEN_SALT=$(generate_secret)
ADMIN_JWT_SECRET=$(generate_secret)
TRANSFER_TOKEN_SALT=$(generate_secret)
JWT_SECRET=$(generate_secret)

echo "📝 Step 1: Installing MySQL Dependencies"
echo "-----------------------------------------"

cd cms
if npm list mysql2 > /dev/null 2>&1; then
  echo -e "${YELLOW}⚠ MySQL2 already installed${NC}"
else
  npm install mysql2
  echo -e "${GREEN}✓ Installed mysql2 package${NC}"
fi
cd ..
echo ""

echo "⚙️  Step 2: Updating Database Configuration"
echo "-------------------------------------------"

cat > cms/config/database.js <<'EOF'
module.exports = ({ env }) => {
  const client = env('DATABASE_CLIENT', 'mysql2');

  const connections = {
    mysql2: {
      connection: {
        host: env('DATABASE_HOST', 'localhost'),
        port: env.int('DATABASE_PORT', 3306),
        database: env('DATABASE_NAME', 'strapi'),
        user: env('DATABASE_USERNAME', 'strapi'),
        password: env('DATABASE_PASSWORD', 'strapi'),
        ssl: env.bool('DATABASE_SSL', false) && {
          rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false),
        },
      },
      pool: {
        min: env.int('DATABASE_POOL_MIN', 2),
        max: env.int('DATABASE_POOL_MAX', 5), // Optimized for 1GB RAM
      },
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
    },
  };
};
EOF

echo -e "${GREEN}✓ Updated cms/config/database.js for MySQL${NC}"
echo ""

echo "📝 Step 3: Creating Environment Files"
echo "--------------------------------------"

cat > cms/.env.staging <<EOF
# Strapi Configuration - STAGING (Biznet Gio)
HOST=0.0.0.0
PORT=3001

# Secrets
APP_KEYS=$APP_KEYS
API_TOKEN_SALT=$API_TOKEN_SALT
ADMIN_JWT_SECRET=$ADMIN_JWT_SECRET
TRANSFER_TOKEN_SALT=$TRANSFER_TOKEN_SALT
JWT_SECRET=$JWT_SECRET

# MySQL Database - UPDATE THESE!
DATABASE_CLIENT=mysql2
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_NAME=cpanel_username_staging_sjd
DATABASE_USERNAME=cpanel_username_staging_user
DATABASE_PASSWORD=your_database_password
DATABASE_SSL=false

# Connection Pool (optimized for 1GB RAM)
DATABASE_POOL_MIN=2
DATABASE_POOL_MAX=5

# URLs - UPDATE THESE!
PUBLIC_URL=https://staging.sjdinterior.com/api
CLIENT_URL=https://staging.sjdinterior.com

# Environment
NODE_ENV=production
EOF

cat > cms/.env.production <<EOF
# Strapi Configuration - PRODUCTION (Biznet Gio)
HOST=0.0.0.0
PORT=3000

# Secrets (DIFFERENT from staging!)
APP_KEYS=$APP_KEYS
API_TOKEN_SALT=$API_TOKEN_SALT
ADMIN_JWT_SECRET=$ADMIN_JWT_SECRET
TRANSFER_TOKEN_SALT=$TRANSFER_TOKEN_SALT
JWT_SECRET=$JWT_SECRET

# MySQL Database - UPDATE THESE!
DATABASE_CLIENT=mysql2
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_NAME=cpanel_username_production_sjd
DATABASE_USERNAME=cpanel_username_production_user
DATABASE_PASSWORD=your_database_password
DATABASE_SSL=false

# Connection Pool (optimized for 1GB RAM)
DATABASE_POOL_MIN=2
DATABASE_POOL_MAX=5

# URLs - UPDATE THESE!
PUBLIC_URL=https://sjdinterior.com/api
CLIENT_URL=https://sjdinterior.com

# Environment
NODE_ENV=production
EOF

echo -e "${GREEN}✓ Created cms/.env.staging${NC}"
echo -e "${GREEN}✓ Created cms/.env.production${NC}"
echo ""

cat > frontend/.env.staging <<EOF
# Frontend Configuration - STAGING
PUBLIC_STRAPI_URL=https://staging.sjdinterior.com/api
EOF

cat > frontend/.env.production <<EOF
# Frontend Configuration - PRODUCTION
PUBLIC_STRAPI_URL=https://sjdinterior.com/api
EOF

echo -e "${GREEN}✓ Created frontend/.env.staging${NC}"
echo -e "${GREEN}✓ Created frontend/.env.production${NC}"
echo ""

echo "🔒 Step 4: Creating .htaccess for Reverse Proxy"
echo "------------------------------------------------"

mkdir -p frontend/dist-staging
mkdir -p frontend/dist-production

cat > frontend/dist-staging/.htaccess <<'EOF'
# Biznet Gio - Staging Environment

<IfModule mod_rewrite.c>
  RewriteEngine On

  # Redirect to HTTPS
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

  # Proxy API requests to Node.js app (port 3001)
  RewriteCond %{REQUEST_URI} ^/api/(.*)$ [NC]
  RewriteRule ^api/(.*)$ http://127.0.0.1:3001/$1 [P,L]

  # Handle Astro routing
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_URI} !^/api/
  RewriteRule ^(.*)$ /index.html [L]
</IfModule>

# Cache Static Assets
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>

# Gzip Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript application/json
</IfModule>
EOF

cat > frontend/dist-production/.htaccess <<'EOF'
# Biznet Gio - Production Environment

<IfModule mod_rewrite.c>
  RewriteEngine On

  # Redirect to HTTPS
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

  # Proxy API requests to Node.js app (port 3000)
  RewriteCond %{REQUEST_URI} ^/api/(.*)$ [NC]
  RewriteRule ^api/(.*)$ http://127.0.0.1:3000/$1 [P,L]

  # Handle Astro routing
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_URI} !^/api/
  RewriteRule ^(.*)$ /index.html [L]
</IfModule>

# Cache Static Assets
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>

# Gzip Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript application/json
</IfModule>
EOF

echo -e "${GREEN}✓ Created .htaccess for staging${NC}"
echo -e "${GREEN}✓ Created .htaccess for production${NC}"
echo ""

echo "📄 Step 5: Creating Deployment Instructions"
echo "--------------------------------------------"

cat > BIZNET_CHECKLIST.md <<'EOF'
# Biznet Gio Deployment Checklist

## Before Starting

- [ ] Login to Biznet Gio cPanel
- [ ] Verify Node.js is available (should be!)
- [ ] Request SSH access from Biznet support (if not enabled)
- [ ] Have FTP credentials ready

---

## Phase 1: Database Setup (10 minutes)

### Staging Database
1. [ ] Go to cPanel → "MySQL® Databases"
2. [ ] Create database: `staging_sjd`
3. [ ] Create user: `staging_user` (strong password!)
4. [ ] Add user to database with ALL PRIVILEGES
5. [ ] Note the full names (cPanel adds prefix):
   - Database: `cpanel_username_staging_sjd`
   - User: `cpanel_username_staging_user`

### Production Database
6. [ ] Create database: `production_sjd`
7. [ ] Create user: `production_user` (different password!)
8. [ ] Add user to database with ALL PRIVILEGES
9. [ ] Note the full names

### Update Environment Files
10. [ ] Edit `cms/.env.staging` with database credentials
11. [ ] Edit `cms/.env.production` with database credentials

---

## Phase 2: Deploy Strapi Staging (30 minutes)

### Build Locally
1. [ ] `cd cms`
2. [ ] `npm install`
3. [ ] Copy `.env.staging` to `.env`
4. [ ] `NODE_ENV=production npm run build`

### Upload to Server (via FTP/SFTP)
5. [ ] Create directory on server: `/home/username/nodejs/staging-cms/`
6. [ ] Upload entire `cms/` folder to `/home/username/nodejs/staging-cms/`
7. [ ] Upload `.env.staging` as `.env` in the cms folder

### Configure Node.js App in cPanel
8. [ ] Go to cPanel → "Setup Node.js App"
9. [ ] Click "Create Application"
10. [ ] Fill in:
    - Node.js version: 20.x
    - Application mode: Production
    - Application root: `nodejs/staging-cms/cms`
    - Application URL: `staging.sjdinterior.com/api`
    - Application startup file: `server.js`
    - Port: 3001 (or auto-assigned)
11. [ ] Add all environment variables from `.env.staging`
12. [ ] Click "Create"

### Install Dependencies via SSH
13. [ ] SSH: `ssh username@yoursite.com`
14. [ ] `cd ~/nodejs/staging-cms/cms`
15. [ ] `npm install --production`
16. [ ] `pm2 start server.js --name strapi-staging` (if PM2 available)

### Start Application
17. [ ] In cPanel Node.js App → Click "Start App"
18. [ ] Check logs for errors
19. [ ] Test: `https://staging.sjdinterior.com/api/admin`

---

## Phase 3: Deploy Frontend Staging (15 minutes)

### Create Subdomain
1. [ ] cPanel → "Domains" → "Subdomains"
2. [ ] Subdomain: `staging`
3. [ ] Document root: `/public_html/staging`
4. [ ] Create

### Build Frontend
5. [ ] `cd frontend`
6. [ ] `npm install`
7. [ ] `npm run build -- --mode staging`

### Upload Files
8. [ ] Upload `frontend/dist/*` to `/public_html/staging/`
9. [ ] Upload `frontend/dist-staging/.htaccess` to `/public_html/staging/.htaccess`

### Test
10. [ ] Visit: `https://staging.sjdinterior.com`
11. [ ] Check all pages load
12. [ ] Verify content from Strapi displays
13. [ ] Check browser console for errors

---

## Phase 4: Deploy Production (Same as Staging)

Repeat Phase 2-3 but:
- Use `production_sjd` database
- Use port 3000
- Upload to `/public_html/` (main domain)
- Use `.env.production`

---

## Post-Deployment

- [ ] Set up SSL (cPanel → SSL/TLS → AutoSSL or Let's Encrypt)
- [ ] Set up automated backups (cPanel → Backup Wizard)
- [ ] Configure cron job for daily database backup
- [ ] Test all forms and functionality
- [ ] Monitor memory usage (should be under 1GB)
- [ ] Set up uptime monitoring (UptimeRobot)

---

## Database Credentials Reference

**Staging:**
```
Host: localhost
Database: cpanel_username_staging_sjd
User: cpanel_username_staging_user
Password: [from cPanel]
```

**Production:**
```
Host: localhost
Database: cpanel_username_production_sjd
User: cpanel_username_production_user
Password: [from cPanel]
```

---

## FTP Credentials

```
Host: ftp.sjdinterior.com (or your domain)
Username: [cPanel username]
Password: [cPanel password]
Port: 21 (FTP) or 22 (SFTP)
```

**Staging Upload Path:** `/public_html/staging/`
**Production Upload Path:** `/public_html/`
**Strapi Staging Path:** `/home/username/nodejs/staging-cms/cms/`
**Strapi Production Path:** `/home/username/nodejs/production-cms/cms/`

---

## Useful Commands (SSH)

```bash
# Check running processes
pm2 status

# Restart Strapi
pm2 restart strapi-staging

# View logs
pm2 logs strapi-staging

# Check memory usage
free -h

# Check disk space
df -h

# MySQL login
mysql -u username -p database_name
```

---

## Troubleshooting

**"Node.js app won't start"**
- Check cPanel → Node.js App → View Logs
- Verify database credentials
- Check if port is available

**"Frontend not connecting to Strapi"**
- Verify .htaccess proxy rules
- Check CORS in cms/config/middlewares.js
- Test API directly: https://staging.sjdinterior.com/api/

**"Out of memory"**
- Lower DATABASE_POOL_MAX in .env (try 3)
- Restart Node.js apps
- Check PM2 memory usage

---

## Monthly Cost

**Biznet Gio Neo Personal Large:** Rp 61,000/month
**Includes:** Everything you need!

No additional costs needed. 🎉
EOF

echo -e "${GREEN}✓ Created BIZNET_CHECKLIST.md${NC}"
echo ""

echo "=============================================="
echo -e "${GREEN}✅ Biznet Gio deployment preparation complete!${NC}"
echo "=============================================="
echo ""
echo "📝 What was created:"
echo "  • MySQL database configuration (cms/config/database.js)"
echo "  • Environment files (.env.staging, .env.production)"
echo "  • .htaccess files for reverse proxy"
echo "  • BIZNET_CHECKLIST.md (step-by-step guide)"
echo ""
echo "⚠️  IMPORTANT NEXT STEPS:"
echo ""
echo "1. Create MySQL databases in cPanel:"
echo "   - Staging: staging_sjd"
echo "   - Production: production_sjd"
echo ""
echo "2. Update cms/.env.staging with:"
echo "   - DATABASE_NAME (from cPanel)"
echo "   - DATABASE_USERNAME (from cPanel)"
echo "   - DATABASE_PASSWORD (from cPanel)"
echo ""
echo "3. Update cms/.env.production with:"
echo "   - DATABASE_NAME (from cPanel)"
echo "   - DATABASE_USERNAME (from cPanel)"
echo "   - DATABASE_PASSWORD (from cPanel)"
echo ""
echo "4. Follow BIZNET_GIO_DEPLOYMENT.md for full instructions"
echo ""
echo "5. Use BIZNET_CHECKLIST.md to track your progress"
echo ""
echo -e "${BLUE}💰 Monthly Cost: Rp 61,000 (All-in-one!)${NC}"
echo ""
echo "📚 Read full guide: BIZNET_GIO_DEPLOYMENT.md"
echo ""
