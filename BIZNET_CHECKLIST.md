# Biznet Gio Deployment Checklist (FTP/cPanel Only)

## Before Starting

- [ ] Login to Biznet Gio cPanel
- [ ] Verify Node.js is available (cPanel → Setup Node.js App)
- [ ] Have FTP credentials ready (or use cPanel File Manager)

---

## Phase 1: Database Setup (10 minutes)

### Staging Database
1. [ ] Go to cPanel → **MySQL® Databases**
2. [ ] Create database: `staging_sjd`
3. [ ] Create user: `staging_user`
4. [ ] Add user to database with **ALL PRIVILEGES**
5. [ ] Note the full names (cPanel adds a prefix like `user_`):
   - Database: `prefix_staging_sjd`
   - User: `prefix_staging_user`

### Production Database
6. [ ] Repeat steps 1-4 for production:
   - Database: `prefix_production_sjd`
   - User: `prefix_production_user`

### Update Local Files
7. [ ] Edit `cms/.env.staging` with the *actual* database names, users, and passwords.
8. [ ] Edit `cms/.env.production` with the *actual* database names, users, and passwords.

---

## Phase 2: Deploy Strapi Staging (30 minutes)

### Build Locally
1. [ ] `cd cms`
2. [ ] Copy `.env.staging` to `.env`
3. [ ] Run: `npm install`
4. [ ] Run: `npm run build`
5. [ ] **Crucial**: Zip the entire `cms` folder (including `node_modules`, `.env`, and `build` folders).

### Upload to Server
6. [ ] In cPanel → **File Manager**, create folder: `/home/username/nodejs/staging-cms/`
7. [ ] Upload the zipped `cms.zip` to that folder.
8. [ ] Extract the zip file in that folder.

### Configure Node.js App in cPanel
9. [ ] Go to cPanel → **Setup Node.js App**
10. [ ] Click **Create Application**
11. [ ] Fill in:
    - Node.js version: 20.x
    - Application mode: **Production**
    - Application root: `nodejs/staging-cms/cms`
    - Application URL: `staging.sjdinterior.com/api`
    - Application startup file: `server.js`
12. [ ] **Add All Variables** from `cms/.env.staging` to the "Environment variables" section in cPanel.
13. [ ] Click **Create**, then click **Run JS script** and select `npm install` (if available in UI).
14. [ ] Click **Start App**.

---

## Phase 3: Deploy Frontend Staging (15 minutes)

### Create Subdomain
1. [ ] cPanel → **Domains** → **Subdomains**
2. [ ] Subdomain: `staging`, Document root: `/public_html/staging`

### Build Frontend Locally
3. [ ] `cd frontend`
4. [ ] Run: `npm run build -- --mode staging`

### Upload Files
5. [ ] Upload everything *inside* `frontend/dist/` to `/public_html/staging/`
6. [ ] Upload `frontend/dist-staging/.htaccess` to `/public_html/staging/.htaccess`

---

## Phase 4: Deploy Production

Repeat Phase 2-3 but:
- Use **Production** database credentials.
- Upload Strapi to `/home/username/nodejs/production-cms/`
- Set Application URL to `sjdinterior.com/api` (port 3000).
- Upload Frontend `dist` to `/public_html/` (main directory).

---

## Post-Deployment
- [ ] cPanel → **SSL/TLS Status** → Run AutoSSL to get HTTPS.
- [ ] Visit `https://sjdinterior.com` and check the pages.
