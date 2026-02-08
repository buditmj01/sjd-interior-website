# Biznet Gio Deployment Guide

**Hosting:** Biznet Gio Personal Large (cPanel, Node.js 18, no SSH)
**Architecture:** Subdomain

| Component | URL | Tech |
|-----------|-----|------|
| CMS | https://cms.sjdinterior.com | Strapi 4 + Node.js 18 + MySQL |
| Frontend | https://sjdinterior.com | Astro (static HTML) |

> **IMPORTANT:** Must use **Node.js 18** (not 20). Node 20 causes WebAssembly OOM crash on CloudLinux.

---

## Phase 1: Build Locally (on your Mac)

```bash
cd cms
cp .env.production .env
npm install --legacy-peer-deps
NODE_ENV=production npm run build
```

After build completes, the `deploy-biznet/cms/` folder is ready, or use the full `cms/` folder directly.

If you want to auto-generate the upload folder:
```bash
bash scripts/prepare-biznet-deployment.sh
```

---

## Phase 2: Create CMS Subdomain (cPanel)

1. Login to cPanel
2. Go to **Domains** > **Create a New Domain**
3. Enter domain: `cms.sjdinterior.com`
4. Uncheck "Share document root" if prompted
5. Note the document root path (e.g., `/home/wwwsjdin/cms.sjdinterior.com`)
6. Click **Submit**

---

## Phase 3: Upload CMS Files

Upload via **cPanel File Manager** or **FTP client** (FileZilla, Cyberduck, etc.).

### FTP Settings
```
Host:     sjdinterior.com (or ftp.sjdinterior.com)
Username: your cPanel username
Password: your cPanel password
Port:     21
```

### Upload to: `/home/wwwsjdin/cms/` (or wherever your app root will be)

Upload these files/folders from your local `cms/` directory:

```
cms/
  app.js                  <-- REQUIRED: cPanel entry point
  package.json            <-- REQUIRED: dependencies
  package-lock.json       <-- REQUIRED: lock file
  .env                    <-- REQUIRED: production env vars (copied from .env.production)
  server.js               <-- Strapi server file
  config/                 <-- REQUIRED: all config files
    admin.js
    api.js
    database.js
    middlewares.js
    plugins.js
    server.js
  src/                    <-- REQUIRED: source code
    index.js
    seed-data.js
    admin/
    api/
    components/
    middlewares/
  public/                 <-- REQUIRED: uploads folder
    uploads/
  build/                  <-- REQUIRED: pre-built admin panel (200+ files)
  database/               <-- Strapi migrations
  types/                  <-- TypeScript types
```

### DO NOT upload:
- `node_modules/` (will be installed on server via cPanel)
- `.tmp/`
- `.cache/`
- `.env.production` (already copied as `.env`)
- `.env.example`
- `.env.staging`

### Verify after upload:
- `.env` file exists with production values
- `app.js` file exists (the startup file)
- `build/` folder has 200+ `.chunk.js` files inside
- `config/database.js` exists

---

## Phase 4: Setup Node.js App (cPanel)

### 4.1 Create Application

1. Go to cPanel > **Setup Node.js App**
2. Click **Create Application**
3. Fill in:

| Setting | Value |
|---------|-------|
| Node.js version | **18** |
| Application mode | **Production** |
| Application root | `cms` |
| Application URL | `cms.sjdinterior.com` |
| Application startup file | **app.js** |

4. Click **Create**

### 4.2 Add Environment Variables (BEFORE npm install)

Click **"Add Variable"** for each row below:

| Variable | Value |
|----------|-------|
| `NODE_ENV` | `production` |
| `NODE_OPTIONS` | `--max-old-space-size=512` |
| `HOST` | `0.0.0.0` |
| `PORT` | `1337` |
| `DATABASE_CLIENT` | `mysql2` |
| `DATABASE_HOST` | `localhost` |
| `DATABASE_PORT` | `3306` |
| `DATABASE_NAME` | `wwwsjdin_sjd_cms` |
| `DATABASE_USERNAME` | `wwwsjdin_sjd_user` |
| `DATABASE_PASSWORD` | `SjdInterior123` |
| `DATABASE_SSL` | `false` |
| `DATABASE_POOL_MIN` | `2` |
| `DATABASE_POOL_MAX` | `5` |
| `DATABASE_CONNECTION_TIMEOUT` | `60000` |
| `APP_KEYS` | `sjdQ8G3cyFCSkZMlhQwf75Q6PqbnlHFh1mh,sjdOsvxORwzhw2vViack4x4ddxiTxl82PJuw` |
| `API_TOKEN_SALT` | `d7928b64-8250-43ca-8b6c-36b8e7c897c3` |
| `ADMIN_JWT_SECRET` | `518815a4-334f-47d3-90f7-1232dddafbea` |
| `TRANSFER_TOKEN_SALT` | `00253191-78b2-40c9-8e8d-e69f7686e5bb` |
| `JWT_SECRET` | `4a9f0c3d-8f7b-423f-9c49-62ab07e7b4a1` |
| `PUBLIC_URL` | `https://cms.sjdinterior.com` |
| `CLIENT_URL` | `https://sjdinterior.com` |
| `ADMIN_PATH` | `/admin` |
| `STRAPI_TELEMETRY_DISABLED` | `true` |

5. Click **Save**

### 4.3 Install Dependencies

1. Click **"Run NPM Install"** button
2. Wait 2-5 minutes for it to complete
3. You should see a success message

### 4.4 Start the App

1. Click **"Start App"** (or **"Restart"** if already running)
2. Wait 30-60 seconds for Strapi to boot

---

## Phase 5: Enable SSL

1. Go to cPanel > **SSL/TLS** > **AutoSSL** (or **Let's Encrypt**)
2. Run AutoSSL for:
   - `sjdinterior.com`
   - `www.sjdinterior.com`
   - `cms.sjdinterior.com`
3. Wait a few minutes for certificates to be issued

---

## Phase 6: Test CMS

- [ ] Visit https://cms.sjdinterior.com/admin
  - First time: create your admin account
  - Should see the Strapi admin dashboard
- [ ] Visit https://cms.sjdinterior.com/api/projects
  - Should return JSON (empty array `[]` is OK if no content yet)
- [ ] Check browser console (F12) for errors

---

## Phase 7: Deploy Frontend (later)

```bash
cd frontend
cp .env.production .env
npm install
npm run build
```

Upload `frontend/dist/` contents to `/public_html/` via FTP.

Make sure `.htaccess` is included (may be hidden in FTP - enable "show hidden files").

Test: visit https://sjdinterior.com

---

## Troubleshooting

### "Out of memory" / WebAssembly OOM
- **Switch to Node.js 18** in cPanel (Node 20 causes this on CloudLinux)
- Verify `NODE_OPTIONS` is set to `--max-old-space-size=512`
- Lower `DATABASE_POOL_MAX` to `3` if still happening
- Restart the app after changing env vars

### "Node.js app won't start"
- cPanel > Setup Node.js App > click your app > check **Log** output
- Verify `app.js` exists in the application root
- Verify all environment variables are set (especially `APP_KEYS`)
- Click "Run NPM Install" again if modules are missing

### "502 Bad Gateway" or "503 Service Unavailable"
- The app crashed. Check logs in cPanel Node.js App settings.
- Most common cause: wrong database credentials
- Most common cause: missing `APP_KEYS` or `JWT_SECRET`
- Make sure `DATABASE_NAME` matches exactly what cPanel created (with prefix)

### "Admin panel shows blank white page"
- `build/` folder is missing or incomplete - re-upload it
- `PUBLIC_URL` env var must be `https://cms.sjdinterior.com`
- Rebuild locally: `NODE_ENV=production npm run build` then re-upload `build/`

### "CORS error in browser console"
- Already configured in `config/middlewares.js`
- Verify the file was uploaded correctly
- Check that `https://sjdinterior.com` is in the CORS origin list

### "NPM Install fails in cPanel"
- Make sure `package.json` and `package-lock.json` are uploaded
- Set `NODE_OPTIONS=--max-old-space-size=512` BEFORE running install
- Remove existing `node_modules/` folder and try again

### "Database connection error"
- Verify database exists: cPanel > MySQL Databases
- Check username has ALL PRIVILEGES on the database
- Confirm `DATABASE_NAME`, `DATABASE_USERNAME`, `DATABASE_PASSWORD` are correct
- Note: cPanel auto-prefixes names (e.g., `wwwsjdin_sjd_cms`)

---

## Updating the Site

### Update CMS content types or config:
1. Make changes locally in `cms/`
2. Build: `cd cms && NODE_ENV=production npm run build`
3. Upload changed files via FTP (especially `build/`, `config/`, `src/`)
4. In cPanel > Setup Node.js App > click **Restart**

### Update Frontend:
1. Make changes locally in `frontend/`
2. Build: `cd frontend && npm run build`
3. Upload `frontend/dist/` contents to `/public_html/`
4. No restart needed (static files)

---

## Database Info

```
Host:     localhost
Port:     3306
Database: wwwsjdin_sjd_cms
Username: wwwsjdin_sjd_user
Password: SjdInterior123
```

Manage via cPanel > **phpMyAdmin**
