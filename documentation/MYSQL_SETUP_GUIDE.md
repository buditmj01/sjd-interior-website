# Setup MySQL/MariaDB untuk SJD Interior Design
## Database Lokal + DBeaver Connection + Production Ready

---

## 🎯 Overview

Kita akan setup:
1. ✅ MySQL/MariaDB lokal untuk development
2. ✅ Strapi connect ke MySQL (bukan SQLite)
3. ✅ DBeaver untuk database management
4. ✅ Best practices untuk security & performance
5. ✅ Ready untuk production (Biznet Gio)

---

## Step 1: Install MySQL/MariaDB (10 menit)

### Pilih salah satu:

#### Option A: MySQL (Recommended for Mac)

**Download MySQL:**
- https://dev.mysql.com/downloads/mysql/

**Install via Homebrew (lebih mudah):**
```bash
# Install MySQL
brew install mysql

# Start MySQL service
brew services start mysql

# Secure installation
mysql_secure_installation
```

**Setup password root:**
- Saat diminta, set password: `root123` (atau password kuat lainnya)
- Remove anonymous users: Y
- Disallow root login remotely: Y
- Remove test database: Y
- Reload privilege tables: Y

#### Option B: MariaDB (Alternative)

```bash
# Install MariaDB
brew install mariadb

# Start MariaDB
brew services start mariadb

# Secure installation
mysql_secure_installation
```

---

## Step 2: Create Database & User (5 menit)

### Login ke MySQL:

```bash
mysql -u root -p
# Enter password: root123 (atau password yang Anda set)
```

### Create databases & users:

```sql
-- Development Database
CREATE DATABASE sjd_dev CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Staging Database
CREATE DATABASE sjd_staging CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Production Database (opsional untuk testing)
CREATE DATABASE sjd_production CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create dedicated user
CREATE USER 'sjd_user'@'localhost' IDENTIFIED BY 'SJD2026!Secure';

-- Grant privileges
GRANT ALL PRIVILEGES ON sjd_dev.* TO 'sjd_user'@'localhost';
GRANT ALL PRIVILEGES ON sjd_staging.* TO 'sjd_user'@'localhost';
GRANT ALL PRIVILEGES ON sjd_production.* TO 'sjd_user'@'localhost';

-- Flush privileges
FLUSH PRIVILEGES;

-- Verify
SHOW DATABASES;
SELECT User, Host FROM mysql.user;

-- Exit
EXIT;
```

**Test connection:**
```bash
mysql -u sjd_user -p sjd_dev
# Enter password: SJD2026!Secure
# Jika berhasil masuk → database ready!
EXIT;
```

---

## Step 3: Update Strapi Configuration

### A. Install MySQL Driver

```bash
cd cms
npm install mysql2
```

### B. Update Database Config

Edit **`cms/config/database.js`**:

```javascript
module.exports = ({ env }) => {
  const client = env('DATABASE_CLIENT', 'mysql2');

  const connections = {
    mysql2: {
      connection: {
        host: env('DATABASE_HOST', 'localhost'),
        port: env.int('DATABASE_PORT', 3306),
        database: env('DATABASE_NAME', 'sjd_dev'),
        user: env('DATABASE_USERNAME', 'sjd_user'),
        password: env('DATABASE_PASSWORD', 'SJD2026!Secure'),
        ssl: env.bool('DATABASE_SSL', false) && {
          rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false),
        },
      },
      pool: {
        min: env.int('DATABASE_POOL_MIN', 2),
        max: env.int('DATABASE_POOL_MAX', 10),
      },
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
    },
  };
};
```

### C. Create Environment Files

**`cms/.env.development`** (untuk local development):

```bash
# Server
HOST=0.0.0.0
PORT=1337
NODE_ENV=development

# Database - MySQL Local
DATABASE_CLIENT=mysql2
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_NAME=sjd_dev
DATABASE_USERNAME=sjd_user
DATABASE_PASSWORD=SJD2026!Secure
DATABASE_SSL=false

# Connection Pool (untuk development)
DATABASE_POOL_MIN=2
DATABASE_POOL_MAX=10
DATABASE_CONNECTION_TIMEOUT=60000

# Secrets (generate dengan: openssl rand -base64 32)
APP_KEYS=TuZKeziOIv8OfKt/8uKdRQ==,pDJxQshSVxH9LU2pPLfV+A==,l3PvZMHv8FnY8qPKG9wTvQ==,WwWP2oHG8N3rBfPqXYzHBg==
API_TOKEN_SALT=iJsEZ9UaP6cH4XqJk9nL5A==
ADMIN_JWT_SECRET=pKLqY8vHG9XwEzT4rFmN3Q==
TRANSFER_TOKEN_SALT=dEfGhIjKlMnOpQrStUvWxY==
JWT_SECRET=nOpQrStUvWxYzAbCdEfGhI==

# URLs
PUBLIC_URL=http://localhost:1337
CLIENT_URL=http://localhost:4321

# Admin Panel
ADMIN_PATH=/admin
```

**`cms/.env.staging`** (untuk staging server):

```bash
# Server
HOST=0.0.0.0
PORT=3001
NODE_ENV=production

# Database - MySQL Staging
DATABASE_CLIENT=mysql2
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_NAME=cpanelusername_staging_sjd
DATABASE_USERNAME=cpanelusername_staging_user
DATABASE_PASSWORD=staging_password_here
DATABASE_SSL=false

# Connection Pool (optimized untuk 1GB RAM)
DATABASE_POOL_MIN=2
DATABASE_POOL_MAX=5
DATABASE_CONNECTION_TIMEOUT=60000

# Secrets (DIFFERENT from development!)
APP_KEYS=generate_new_keys_here
API_TOKEN_SALT=generate_new_salt_here
ADMIN_JWT_SECRET=generate_new_secret_here
TRANSFER_TOKEN_SALT=generate_new_token_here
JWT_SECRET=generate_new_jwt_here

# URLs
PUBLIC_URL=https://staging.sjdinterior.com/api
CLIENT_URL=https://staging.sjdinterior.com

# Admin Panel
ADMIN_PATH=/admin
```

**`cms/.env.production`** (untuk production server):

```bash
# Server
HOST=0.0.0.0
PORT=3000
NODE_ENV=production

# Database - MySQL Production
DATABASE_CLIENT=mysql2
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_NAME=cpanelusername_production_sjd
DATABASE_USERNAME=cpanelusername_production_user
DATABASE_PASSWORD=production_password_here
DATABASE_SSL=false

# Connection Pool (optimized untuk 1GB RAM)
DATABASE_POOL_MIN=2
DATABASE_POOL_MAX=5
DATABASE_CONNECTION_TIMEOUT=60000

# Secrets (DIFFERENT from staging!)
APP_KEYS=generate_new_keys_here
API_TOKEN_SALT=generate_new_salt_here
ADMIN_JWT_SECRET=generate_new_secret_here
TRANSFER_TOKEN_SALT=generate_new_token_here
JWT_SECRET=generate_new_jwt_here

# URLs
PUBLIC_URL=https://sjdinterior.com/api
CLIENT_URL=https://sjdinterior.com

# Admin Panel
ADMIN_PATH=/admin
```

**Generate secrets:**
```bash
# Jalankan 5x untuk dapat 5 random string
openssl rand -base64 32
```

---

## Step 4: Migrate Data from SQLite to MySQL (Opsional)

Jika sudah ada data di SQLite dan ingin migrate:

### A. Export dari SQLite

```bash
cd cms

# Install strapi-plugin-import-export-entries
npm install strapi-plugin-import-export-entries

# Jalankan Strapi dengan SQLite sekali lagi
npm run develop

# Export via admin panel:
# Settings → Import/Export Entries → Export All
```

### B. Switch ke MySQL

```bash
# Backup .env lama
cp .env .env.sqlite.backup

# Copy development config
cp .env.development .env

# Delete old SQLite data
rm -rf .tmp/data.db
```

### C. Start dengan MySQL

```bash
# Strapi akan auto-create tables di MySQL
npm run develop
```

### D. Import data (jika ada)

```
# Di Strapi admin panel:
Settings → Import/Export Entries → Import
# Upload file yang di-export tadi
```

---

## Step 5: Install & Setup DBeaver (Database Management)

### A. Download DBeaver

**Download:**
- https://dbeaver.io/download/

**Pilih:**
- **DBeaver Community Edition** (gratis)
- Mac: Download .dmg
- Install seperti biasa

### B. Create Connection ke MySQL

1. **Buka DBeaver**

2. **New Database Connection:**
   - Klik icon "New Database Connection" (atau Database → New Database Connection)
   - Pilih **MySQL** (atau **MariaDB** jika pakai MariaDB)
   - Klik "Next"

3. **Connection Settings:**
   ```
   Server Host: localhost
   Port: 3306
   Database: sjd_dev
   Username: sjd_user
   Password: SJD2026!Secure
   ```

4. **Test Connection:**
   - Klik "Test Connection"
   - Jika muncul "Download driver files?" → Klik Yes (download MySQL driver)
   - Harus muncul "Connected" ✅

5. **Save:**
   - Klik "Finish"

6. **Explore Database:**
   - Di sidebar kiri, expand connection
   - Expand "sjd_dev"
   - Lihat Tables, Views, dll

### C. DBeaver Features

**Useful features:**

1. **Browse Data:**
   - Double-click table → lihat data
   - Right-click → View Data

2. **Run Queries:**
   - SQL Editor: Ctrl+] atau Cmd+]
   - Write query:
     ```sql
     SELECT * FROM projects;
     SELECT * FROM insights;
     ```
   - Run: Ctrl+Enter atau Cmd+Enter

3. **ER Diagram:**
   - Database → ER Diagram
   - Visualize table relationships

4. **Export Data:**
   - Right-click table → Export Data
   - Choose format: CSV, JSON, XML, SQL

5. **Import Data:**
   - Right-click table → Import Data

---

## Step 6: Best Practices Configuration

### A. Update Server Config

**`cms/config/server.js`**:

```javascript
module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('PUBLIC_URL', 'http://localhost:1337'),
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
  // Add performance settings
  cron: {
    enabled: env.bool('CRON_ENABLED', true),
  },
});
```

### B. Add Database Indexes (Performance)

Create **`cms/database/migrations/add-indexes.js`**:

```javascript
'use strict';

/**
 * Add indexes for better query performance
 */

module.exports = {
  async up(knex) {
    // Projects indexes
    await knex.schema.table('projects', (table) => {
      table.index('slug', 'idx_projects_slug');
      table.index('is_featured', 'idx_projects_featured');
      table.index('published_at', 'idx_projects_published');
    });

    // Insights indexes
    await knex.schema.table('insights', (table) => {
      table.index('slug', 'idx_insights_slug');
      table.index('is_featured', 'idx_insights_featured');
      table.index('published_at', 'idx_insights_published');
      table.index('category', 'idx_insights_category');
    });

    console.log('✅ Database indexes created successfully');
  },

  async down(knex) {
    // Rollback indexes
    await knex.schema.table('projects', (table) => {
      table.dropIndex('slug', 'idx_projects_slug');
      table.dropIndex('is_featured', 'idx_projects_featured');
      table.dropIndex('published_at', 'idx_projects_published');
    });

    await knex.schema.table('insights', (table) => {
      table.dropIndex('slug', 'idx_insights_slug');
      table.dropIndex('is_featured', 'idx_insights_featured');
      table.dropIndex('published_at', 'idx_insights_published');
      table.dropIndex('category', 'idx_insights_category');
    });

    console.log('✅ Database indexes dropped successfully');
  },
};
```

### C. Database Backup Script

Create **`cms/scripts/backup-database.sh`**:

```bash
#!/bin/bash

# MySQL Database Backup Script
# Usage: ./scripts/backup-database.sh

# Load environment variables
if [ -f .env ]; then
  export $(cat .env | grep -v '^#' | xargs)
fi

# Backup directory
BACKUP_DIR="./backups"
mkdir -p $BACKUP_DIR

# Filename with timestamp
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/sjd_backup_$TIMESTAMP.sql"

# Dump database
echo "📦 Backing up database: $DATABASE_NAME"

mysqldump \
  --host=$DATABASE_HOST \
  --port=$DATABASE_PORT \
  --user=$DATABASE_USERNAME \
  --password=$DATABASE_PASSWORD \
  --single-transaction \
  --routines \
  --triggers \
  --databases $DATABASE_NAME \
  > $BACKUP_FILE

# Compress
gzip $BACKUP_FILE

echo "✅ Backup completed: ${BACKUP_FILE}.gz"

# Keep only last 7 backups
find $BACKUP_DIR -name "sjd_backup_*.sql.gz" -mtime +7 -delete

echo "🗑️  Old backups cleaned (kept last 7 days)"
```

Make executable:
```bash
chmod +x cms/scripts/backup-database.sh
```

### D. Database Restore Script

Create **`cms/scripts/restore-database.sh`**:

```bash
#!/bin/bash

# MySQL Database Restore Script
# Usage: ./scripts/restore-database.sh <backup_file.sql.gz>

if [ -z "$1" ]; then
  echo "❌ Usage: ./scripts/restore-database.sh <backup_file.sql.gz>"
  exit 1
fi

BACKUP_FILE=$1

if [ ! -f "$BACKUP_FILE" ]; then
  echo "❌ Backup file not found: $BACKUP_FILE"
  exit 1
fi

# Load environment variables
if [ -f .env ]; then
  export $(cat .env | grep -v '^#' | xargs)
fi

echo "⚠️  WARNING: This will OVERWRITE database: $DATABASE_NAME"
read -p "Continue? (y/N): " -n 1 -r
echo

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "❌ Restore cancelled"
  exit 1
fi

echo "📦 Restoring database from: $BACKUP_FILE"

# Decompress and restore
gunzip < $BACKUP_FILE | mysql \
  --host=$DATABASE_HOST \
  --port=$DATABASE_PORT \
  --user=$DATABASE_USERNAME \
  --password=$DATABASE_PASSWORD \
  $DATABASE_NAME

echo "✅ Database restored successfully"
```

Make executable:
```bash
chmod +x cms/scripts/restore-database.sh
```

---

## Step 7: Security Best Practices

### A. MySQL Security Settings

**Edit MySQL config** (`/etc/my.cnf` or `/usr/local/etc/my.cnf`):

```ini
[mysqld]
# Character set
character-set-server=utf8mb4
collation-server=utf8mb4_unicode_ci

# Connection limits
max_connections=200
max_user_connections=50

# Buffer pool (adjust based on RAM)
innodb_buffer_pool_size=256M

# Query cache (for better performance)
query_cache_size=32M
query_cache_type=1

# Logging
log_error=/usr/local/var/mysql/error.log
slow_query_log=1
slow_query_log_file=/usr/local/var/mysql/slow-query.log
long_query_time=2

# Security
local_infile=0
symbolic-links=0
```

**Restart MySQL:**
```bash
brew services restart mysql
```

### B. Strapi Security Middlewares

**`cms/config/middlewares.js`**:

```javascript
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
        'http://localhost:4321',
        'https://sjdinterior.com',
        'https://staging.sjdinterior.com',
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
```

### C. Environment Variables Security

**Update `.gitignore`**:

```bash
# Environment files
.env
.env.*
!.env.example

# Database
*.sql
*.sql.gz
/backups/

# Strapi cache
.cache/
.tmp/
build/
dist/

# Logs
*.log
logs/

# OS files
.DS_Store
Thumbs.db
```

### D. Create .env.example

**`cms/.env.example`**:

```bash
# Server
HOST=0.0.0.0
PORT=1337
NODE_ENV=development

# Database - MySQL
DATABASE_CLIENT=mysql2
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_NAME=your_database_name
DATABASE_USERNAME=your_database_user
DATABASE_PASSWORD=your_database_password
DATABASE_SSL=false

# Connection Pool
DATABASE_POOL_MIN=2
DATABASE_POOL_MAX=10
DATABASE_CONNECTION_TIMEOUT=60000

# Secrets (generate with: openssl rand -base64 32)
APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=your-salt
ADMIN_JWT_SECRET=your-secret
TRANSFER_TOKEN_SALT=your-token
JWT_SECRET=your-jwt

# URLs
PUBLIC_URL=http://localhost:1337
CLIENT_URL=http://localhost:4321

# Admin Panel
ADMIN_PATH=/admin
```

---

## Step 8: Test Everything

### A. Start Strapi dengan MySQL

```bash
cd cms

# Make sure .env.development is loaded
cp .env.development .env

# Start Strapi
npm run develop
```

**Check console:**
- Should see: "Database connection name: default"
- Should see: "Server started on http://localhost:1337"
- No errors about database connection

### B. Create Admin User

1. Open browser: `http://localhost:1337/admin`
2. Create first admin user
3. Login to admin panel

### C. Test CRUD Operations

**In Strapi admin:**
1. Create 1 portfolio project
2. Create 1 insight article
3. Publish them
4. Check if they appear in Content Manager

### D. Check Database in DBeaver

**In DBeaver:**
1. Refresh connection
2. Expand "sjd_dev" → "Tables"
3. Find table "projects"
4. Right-click → View Data
5. Should see your created project ✅

### E. Test Frontend

```bash
cd frontend
npm run dev
```

Open `http://localhost:4321`:
- Homepage should load
- Projects should appear from MySQL
- Insights should appear from MySQL

---

## Step 9: Deploy to Production (Biznet Gio)

### A. Export Production Data

**From development:**
```bash
cd cms
./scripts/backup-database.sh
```

### B. On Biznet Gio Server

1. **Create database** (sudah dijelaskan di BIZNET_NO_SSH_DEPLOYMENT.md)

2. **Upload backup:**
   - Upload `backups/sjd_backup_XXXXXX.sql.gz` via FTP

3. **Restore via cPanel:**
   - cPanel → phpMyAdmin
   - Select production database
   - Import → Choose .sql file
   - Or via command line if SSH available

4. **Update `.env.production`** dengan database credentials

---

## DBeaver Quick Reference

### Useful Queries

**Check all tables:**
```sql
SHOW TABLES;
```

**Count records:**
```sql
SELECT COUNT(*) FROM projects;
SELECT COUNT(*) FROM insights;
```

**Search by slug:**
```sql
SELECT * FROM projects WHERE slug = 'modern-minimalist-living-room';
```

**Find featured items:**
```sql
SELECT title, slug, is_featured FROM projects WHERE is_featured = 1;
SELECT title, slug, is_featured FROM insights WHERE is_featured = 1;
```

**Check latest entries:**
```sql
SELECT id, title, published_at FROM projects ORDER BY published_at DESC LIMIT 10;
SELECT id, title, published_at FROM insights ORDER BY published_at DESC LIMIT 10;
```

### Keyboard Shortcuts

- **New SQL Script:** `Cmd+]` (Mac) or `Ctrl+]` (Windows)
- **Execute Query:** `Cmd+Enter` or `Ctrl+Enter`
- **Format SQL:** `Cmd+Shift+F` or `Ctrl+Shift+F`
- **Auto-complete:** `Ctrl+Space`

---

## Troubleshooting

### "Can't connect to MySQL server"

**Check if MySQL running:**
```bash
brew services list | grep mysql
# Should show "started"

# If not started:
brew services start mysql
```

### "Access denied for user"

**Reset password:**
```bash
mysql -u root -p
# Enter old password

ALTER USER 'sjd_user'@'localhost' IDENTIFIED BY 'NewPassword123!';
FLUSH PRIVILEGES;
```

### "Table doesn't exist"

**Strapi will auto-create tables on first run.**

If missing:
```bash
cd cms
rm -rf .cache .tmp
npm run develop
# Strapi will recreate all tables
```

### DBeaver "Driver not found"

**Download driver:**
- Database → Driver Manager → MySQL
- Download/Update

---

## Performance Tips

### 1. Add Indexes (already in migration script)

### 2. Optimize Queries

**In Strapi controllers, use select:**
```javascript
// Instead of:
await strapi.db.query('api::project.project').findMany();

// Use:
await strapi.db.query('api::project.project').findMany({
  select: ['id', 'title', 'slug', 'featured_image'],
  where: { publishedAt: { $notNull: true } },
  limit: 10,
});
```

### 3. Enable Query Caching

**In database config:**
```javascript
pool: {
  min: 2,
  max: 10,
  // Add caching
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
}
```

### 4. Regular Maintenance

**Monthly:**
```sql
-- Analyze tables
ANALYZE TABLE projects, insights, authors;

-- Optimize tables
OPTIMIZE TABLE projects, insights, authors;

-- Check table status
SHOW TABLE STATUS;
```

---

## Backup Strategy

### Automated Daily Backups

**Add to cron (Mac):**
```bash
# Edit crontab
crontab -e

# Add this line (backup every day at 2 AM)
0 2 * * * cd /path/to/cms && ./scripts/backup-database.sh
```

### Weekly Full Backup

**Create backup script:**
```bash
#!/bin/bash
# Full backup including uploads
tar -czf sjd_full_backup_$(date +%Y%m%d).tar.gz \
  cms/backups/ \
  cms/public/uploads/ \
  cms/.env.production
```

---

## Summary

✅ **What We Did:**
1. Installed MySQL/MariaDB
2. Created databases (dev, staging, production)
3. Updated Strapi to use MySQL
4. Configured DBeaver for database management
5. Added security best practices
6. Created backup/restore scripts
7. Optimized for performance

✅ **Ready For:**
- Local development with MySQL
- Database management via DBeaver
- Production deployment to Biznet Gio
- Automated backups
- Scaling

✅ **Connection Details:**
```
Host: localhost
Port: 3306
Database: sjd_dev
User: sjd_user
Password: SJD2026!Secure
```

---

**Next:** Start Strapi dan test semua fungsi! 🚀
