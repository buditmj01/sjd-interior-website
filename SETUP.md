# Setup Guide - SJD Interior Design Website

This guide will walk you through setting up the complete development environment.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Quick Setup (Docker)](#quick-setup-docker)
3. [Manual Setup](#manual-setup)
4. [Initial Configuration](#initial-configuration)
5. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required
- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **npm** 9.x or higher (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))

### Optional
- **Docker** and **Docker Compose** (for containerized setup)
- **PostgreSQL** 14+ (for production-like local setup)

### Verify Installation
```bash
node --version    # Should be v18.x or higher
npm --version     # Should be v9.x or higher
git --version
```

---

## Quick Setup (Docker)

The fastest way to get started is using Docker Compose:

### 1. Start All Services
```bash
# From project root
docker-compose up -d
```

This will start:
- PostgreSQL database on port 5432
- Strapi CMS on port 1337

### 2. Access Strapi Admin
1. Open browser to `http://localhost:1337/admin`
2. Create your first admin user
3. Start adding content

### 3. Setup Frontend (Run Separately)
```bash
cd frontend
npm install
npm run dev
```

Frontend will be available at `http://localhost:4321`

### Stop Services
```bash
docker-compose down
```

---

## Manual Setup

### Step 1: Setup Strapi CMS

#### 1.1 Create Strapi Project
```bash
# Navigate to project root
cd /path/to/sjd-interior-design

# Create Strapi CMS
npx create-strapi-app@latest cms --quickstart
```

Choose the following options:
- Installation type: `Quickstart (recommended)`
- Skip database configuration (we'll configure later)

#### 1.2 Configure Database (Optional - PostgreSQL)

If using PostgreSQL instead of SQLite:

```bash
cd cms

# Install PostgreSQL dependencies
npm install pg
```

Create `cms/.env`:
```env
HOST=0.0.0.0
PORT=1337

# Database
DATABASE_CLIENT=postgres
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
DATABASE_NAME=sjd_interior
DATABASE_USERNAME=your_username
DATABASE_PASSWORD=your_password
DATABASE_SSL=false

# Secrets (generate random strings)
APP_KEYS=toBeModified1,toBeModified2
API_TOKEN_SALT=tobemodified
ADMIN_JWT_SECRET=tobemodified
JWT_SECRET=tobemodified
TRANSFER_TOKEN_SALT=tobemodified
```

**Generate secure secrets:**
```bash
# Run this 5 times to get 5 different secrets
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

#### 1.3 Start Strapi
```bash
cd cms
npm run develop
```

First time setup:
1. Browser will open to `http://localhost:1337/admin`
2. Create admin account
3. Strapi admin panel is ready!

---

### Step 2: Setup Astro Frontend

#### 2.1 Create Astro Project
```bash
# From project root
npm create astro@latest frontend
```

Choose these options:
- Template: `Empty`
- TypeScript: `Yes (strict)`
- Install dependencies: `Yes`
- Git: `No` (already in git repo)

#### 2.2 Install Dependencies
```bash
cd frontend

# Install Tailwind CSS
npx astro add tailwind

# Install React for interactive components
npx astro add react

# Install additional packages
npm install @astrojs/image sharp
```

#### 2.3 Configure Environment
Create `frontend/.env`:
```env
STRAPI_URL=http://localhost:1337
PUBLIC_SITE_URL=http://localhost:4321
```

#### 2.4 Start Development Server
```bash
npm run dev
```

Frontend available at `http://localhost:4321`

---

## Initial Configuration

### 1. Create Strapi Content Types

Access Strapi admin panel (`http://localhost:1337/admin`) and create these content types:

#### Project Content Type
1. Go to **Content-Type Builder**
2. Click **Create new collection type**
3. Name: `project`
4. Add fields:
   - `title` (Text, Required, Short text)
   - `slug` (UID, Attached to title)
   - `description` (Text, Long text)
   - `content` (Rich text)
   - `featured_image` (Media, Single image)
   - `gallery` (Media, Multiple images)
   - `client_name` (Text)
   - `project_date` (Date)
   - `location` (Text)
   - `is_featured` (Boolean)
5. Save and configure permissions

#### Service Content Type
1. Create collection type: `service`
2. Add fields:
   - `title` (Text, Required)
   - `slug` (UID)
   - `description` (Text)
   - `content` (Rich text)
   - `icon` (Text) - for icon class names
   - `featured_image` (Media)
   - `order` (Number)
3. Save

#### Testimonial Content Type
1. Create collection type: `testimonial`
2. Add fields:
   - `client_name` (Text, Required)
   - `client_position` (Text)
   - `company` (Text)
   - `content` (Text, Required)
   - `rating` (Number, 1-5)
   - `photo` (Media)
   - `is_featured` (Boolean)
3. Save

### 2. Configure API Permissions

1. Go to **Settings → Roles → Public**
2. Enable `find` and `findOne` for:
   - Project
   - Service
   - Testimonial
   - Blog-post (if created)
3. Save

### 3. Add Sample Content

Add a few sample projects, services, and testimonials to test the integration.

---

## Frontend API Integration

### Create API Client

Create `frontend/src/lib/api.ts`:
```typescript
const STRAPI_URL = import.meta.env.STRAPI_URL || 'http://localhost:1337';

interface StrapiResponse<T> {
  data: T;
  meta?: any;
}

export async function fetchAPI<T>(endpoint: string): Promise<T> {
  const url = `${STRAPI_URL}/api${endpoint}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const json: StrapiResponse<T> = await response.json();
    return json.data;
  } catch (error) {
    console.error('API Fetch Error:', error);
    throw error;
  }
}

export async function getProjects() {
  return fetchAPI('/projects?populate=*');
}

export async function getProjectBySlug(slug: string) {
  const data = await fetchAPI(`/projects?filters[slug][$eq]=${slug}&populate=*`);
  return Array.isArray(data) ? data[0] : data;
}

export async function getServices() {
  return fetchAPI('/services?populate=*&sort=order:asc');
}

export async function getTestimonials() {
  return fetchAPI('/testimonials?populate=*');
}
```

### Test API Connection

Create `frontend/src/pages/test.astro`:
```astro
---
import { getProjects } from '../lib/api';

const projects = await getProjects();
---

<html>
  <head>
    <title>API Test</title>
  </head>
  <body>
    <h1>Projects from Strapi</h1>
    <pre>{JSON.stringify(projects, null, 2)}</pre>
  </body>
</html>
```

Visit `http://localhost:4321/test` to verify the connection.

---

## Troubleshooting

### Strapi Issues

**Port 1337 already in use:**
```bash
# Find process using port 1337
lsof -i :1337

# Kill the process
kill -9 <PID>
```

**Database connection errors:**
- Verify PostgreSQL is running
- Check database credentials in `.env`
- Ensure database exists: `createdb sjd_interior`

**Admin panel won't load:**
```bash
cd cms
npm run build
npm run develop
```

### Astro Issues

**Module not found errors:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

**API connection fails:**
- Verify Strapi is running on port 1337
- Check `STRAPI_URL` in `.env`
- Verify API permissions in Strapi admin

**Build errors:**
```bash
# Clear Astro cache
rm -rf .astro
npm run build
```

### Docker Issues

**Containers won't start:**
```bash
docker-compose down
docker-compose up -d --build
```

**Database connection in Docker:**
- Use service name as host: `postgres` instead of `localhost`
- Check `docker-compose.yml` environment variables

**View container logs:**
```bash
docker-compose logs -f strapi
docker-compose logs -f postgres
```

---

## Next Steps

1. Review [ARCHITECTURE.md](ARCHITECTURE.md) for system design
2. Create remaining content types
3. Add sample content
4. Build out frontend pages
5. Configure deployment

## Useful Commands

```bash
# Strapi
npm run develop      # Development with auto-reload
npm run start        # Production mode
npm run build        # Build admin panel
npm run strapi       # CLI commands

# Astro
npm run dev          # Development server
npm run build        # Production build
npm run preview      # Preview build locally

# Docker
docker-compose up -d          # Start services
docker-compose down           # Stop services
docker-compose logs -f        # View logs
docker-compose restart        # Restart services
```

## Support Resources

- [Astro Documentation](https://docs.astro.build)
- [Strapi Documentation](https://docs.strapi.io)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

Ready to build something amazing! 🚀
