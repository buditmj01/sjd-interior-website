# SJD Interior Design

> Premium interior design company website — built with **Astro 5 SSR** and **Strapi 4 CMS**.

🌐 **Live:** [sjdinterior.com](https://sjdinterior.com) &nbsp;|&nbsp; 📝 **CMS:** [cms.sjdinterior.com](https://cms.sjdinterior.com/admin)

---

## ✨ Features

### 🎨 Frontend

| Feature | Description |
|---|---|
| **Server-Side Rendering** | Astro SSR with Node.js adapter for dynamic content at runtime |
| **Responsive Design** | Fully responsive across desktop, tablet, and mobile |
| **Glassmorphism Header** | Fixed navigation with translucent backdrop-blur on scroll |
| **GSAP Animations** | Parallax scrolling, staggered entry animations on portfolio & insight pages |
| **Preact Islands** | Interactive components (Stats Counter, FAQ Accordion) hydrated client-side |
| **Smooth Scrolling** | Lenis-powered buttery smooth scroll experience |
| **Content Protection** | Anti-copy/anti-select protection on published content |
| **Dynamic SEO** | Per-page meta titles, descriptions, and Open Graph tags from CMS |
| **Auto Sitemap** | Automatically generated `sitemap.xml` via `@astrojs/sitemap` |
| **Gallery Slideshow** | Full-width image carousel on the homepage |
| **Portfolio Filtering** | Filter projects by dynamic categories from CMS |
| **Insight Blog** | Full blog system with author bios, featured images, and rich text |
| **FAQ Accordion** | Collapsible FAQ section with smooth animations |
| **WhatsApp CTA** | Dynamic call-to-action integration with WhatsApp |
| **Logo Switching** | Automatic dark/light logo swap based on header scroll state |
| **404 Page** | Custom-designed error page |

### 📝 CMS (Strapi)

| Content Type | Purpose |
|---|---|
| **Project** | Portfolio items with gallery, category, themes, and featured flags |
| **Portfolio Category** | Dynamic project categories with ordering |
| **Insight** | Blog articles with author, featured image, and rich text body |
| **Author** | Writer profiles with photo for insight articles |
| **Hero Banner** | Homepage hero section with background media |
| **Homepage Gallery** | Slideshow images for the homepage carousel |
| **Stats** | Animated statistics counters (projects completed, etc.) |
| **FAQ** | Frequently asked questions for the homepage section |
| **Navigation** | Dynamic menu items and CTA button configuration |
| **Footer** | Footer content, links, and social media |
| **Contact Info** | Phone, email, WhatsApp number, and address |
| **Site Setting** | Global SEO settings (title, description, favicon) |
| **Website Logos** | Dark and light logo variants |
| **Workflow Hero** | Alur Kerja (workflow) page hero section with video |

### 🚀 Deployment & DevOps

- **FTP Deployment** to cPanel via `lftp` (automated build → upload → restart)
- **GitHub Actions** CI/CD pipeline for automated rebuilds
- **Strapi Webhooks** trigger frontend rebuilds on CMS content changes
- **Path Patching** for server compatibility with cPanel Node.js

---

## 🏗️ Tech Stack

| Layer | Technology | Version |
|---|---|---|
| **Framework** | [Astro](https://astro.build) | 5.16+ |
| **Styling** | [Tailwind CSS](https://tailwindcss.com) | 4.1+ |
| **Animations** | [GSAP](https://gsap.com) | 3.14+ |
| **Smooth Scroll** | [Lenis](https://lenis.darkroom.engineering) | 1.3+ |
| **Islands** | [Preact](https://preactjs.com) | 10.28+ |
| **Markdown** | [Marked](https://marked.js.org) | 17+ |
| **Sanitization** | [sanitize-html](https://github.com/apostrophecms/sanitize-html) | 2.17+ |
| **CMS** | [Strapi](https://strapi.io) | 4.25+ |
| **Database** | MySQL | 8.0+ |
| **Runtime** | Node.js | 18.x |
| **Hosting** | cPanel (Biznet) | — |

---

## 📁 Project Structure

```
sjd-interior-new/
├── frontend/                    # Astro SSR Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/          # Shared components
│   │   │   │   ├── Header.astro       # Glassmorphism navbar + mobile menu
│   │   │   │   ├── Footer.astro       # Dynamic footer from CMS
│   │   │   │   ├── FAQSection.astro   # Accordion FAQ component
│   │   │   │   ├── CTASection.astro   # Call-to-action banner
│   │   │   │   ├── InsightCard.astro  # Blog post card with hover effects
│   │   │   │   ├── PortfolioCard.astro # Project card with hover effects
│   │   │   │   └── Button.astro       # Reusable button component
│   │   │   ├── home/            # Homepage-specific components
│   │   │   │   ├── Hero.astro         # Hero banner with CMS media
│   │   │   │   ├── GallerySlideshow.astro # Image carousel
│   │   │   │   ├── Stats.astro        # Stats section wrapper
│   │   │   │   └── StatsIsland.tsx    # Preact animated counter
│   │   │   └── insight/         # Insight-specific components
│   │   │       └── AuthorBio.tsx      # Author bio island
│   │   ├── layouts/
│   │   │   └── BaseLayout.astro       # Base HTML with SEO meta tags
│   │   ├── lib/                 # API & utility functions
│   │   │   ├── strapi.js              # Core Strapi API client (with timeout)
│   │   │   ├── getProjects.js         # Portfolio data fetcher
│   │   │   ├── getInsights.js         # Blog data fetcher
│   │   │   ├── getNavigation.js       # Navigation menu fetcher
│   │   │   ├── getHeroBanner.js       # Hero banner fetcher
│   │   │   ├── getHomepageGallery.js  # Gallery images fetcher
│   │   │   ├── getSiteSettings.js     # SEO settings fetcher
│   │   │   ├── getWebsiteLogos.js     # Logo variants fetcher
│   │   │   ├── getContactInfo.js      # Contact info fetcher
│   │   │   ├── getFooter.js           # Footer content fetcher
│   │   │   ├── getFaqs.js             # FAQ data fetcher
│   │   │   ├── getStats.js            # Statistics fetcher
│   │   │   └── sanitize.js            # HTML sanitization utility
│   │   ├── pages/               # Route pages
│   │   │   ├── index.astro            # Homepage
│   │   │   ├── alur-kerja.astro       # Workflow page
│   │   │   ├── hubungi-kami.astro     # Contact page
│   │   │   ├── 404.astro              # Error page
│   │   │   ├── portfolio/
│   │   │   │   ├── index.astro        # Portfolio listing + filtering
│   │   │   │   └── [slug].astro       # Portfolio detail (dynamic)
│   │   │   └── insight/
│   │   │       ├── index.astro        # Blog listing
│   │   │       └── [slug].astro       # Blog detail (dynamic)
│   │   ├── styles/
│   │   │   └── global.css             # Global styles & Tailwind imports
│   │   ├── scripts/
│   │   │   └── ...                    # Client-side scripts
│   │   └── utils/
│   │       └── ...                    # Utility helpers
│   ├── public/                  # Static assets
│   │   ├── icons/                     # Icon sprite sheets
│   │   ├── images/                    # Static images
│   │   ├── favicon.svg                # Site favicon
│   │   └── robots.txt                 # SEO crawl rules
│   ├── astro.config.mjs         # Astro configuration
│   ├── app.cjs                  # Express middleware entry point
│   └── package.json
│
├── cms/                         # Strapi CMS
│   ├── src/
│   │   └── api/                 # 14 content type APIs
│   ├── config/                  # Database, server, middleware config
│   └── package.json
│
├── scripts/                     # Build & deployment tools
│   ├── build-and-upload.sh      # Main build + FTP deploy script
│   ├── rebuild-frontend.sh      # Trigger GitHub Actions rebuild
│   ├── restore-cms.sh           # CMS restoration utility
│   ├── patch-paths.js           # Fix absolute paths for cPanel
│   ├── prepare-deployment.sh    # Full deployment preparation
│   └── prepare-biznet-deployment.sh  # Biznet-specific deployment
│
├── documentation/               # Guides & references
│   ├── README.md                # Detailed project documentation
│   ├── DEPLOYMENT_FRAMEWORK.md  # Deployment architecture
│   ├── LOCAL_BUILD_GUIDE.md     # Local development setup
│   ├── QUICK_REBUILD_GUIDE.md   # Quick rebuild instructions
│   ├── SEO_STRATEGY.md          # SEO optimization strategy
│   ├── BIZNET_CHECKLIST.md      # Biznet hosting checklist
│   ├── STRAPI_SETUP_GUIDE.md    # CMS setup instructions
│   ├── STRAPI_WEBHOOK_SETUP.md  # Webhook configuration
│   ├── STRAPI_CUSTOM_BODY_GUIDE.md # Custom body field guide
│   ├── MYSQL_SETUP_GUIDE.md     # Database setup guide
│   ├── HERO_BANNER_SETUP.md     # Hero banner CMS guide
│   ├── LOGO_SETUP_GUIDE.md      # Logo management guide
│   ├── AUTHOR_SETUP.md          # Author content type guide
│   └── API_INTEGRATION_STATUS.md # API integration checklist
│
└── .github/                     # CI/CD workflows
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x
- **MySQL** 8.0+
- **npm** 6+

### 1. Clone & Install

```bash
git clone https://github.com/buditmj01/sjd-interior-website.git
cd sjd-interior-website

# Install frontend dependencies
cd frontend && npm install

# Install CMS dependencies
cd ../cms && npm install
```

### 2. Environment Setup

**Frontend** (`frontend/.env`):
```env
PUBLIC_STRAPI_URL=http://localhost:1337
PUBLIC_SITE_URL=http://localhost:4321
```

**CMS** (`cms/.env`):
```env
HOST=0.0.0.0
PORT=1337
DATABASE_CLIENT=mysql2
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_NAME=sjd_interior_cms
DATABASE_USERNAME=root
DATABASE_PASSWORD=your_password
APP_KEYS=your_app_keys
API_TOKEN_SALT=your_salt
ADMIN_JWT_SECRET=your_secret
JWT_SECRET=your_jwt_secret
```

### 3. Run Development

```bash
# Terminal 1: Start CMS
cd cms && npm run develop

# Terminal 2: Start Frontend
cd frontend && npm run dev
```

- **Frontend:** http://localhost:4321
- **CMS Admin:** http://localhost:1337/admin

---

## 📦 Deployment

### Build & Deploy to Production

```bash
./scripts/build-and-upload.sh
```

This command:
1. Builds the Astro SSR frontend with production environment variables
2. Patches absolute paths for cPanel compatibility
3. Uploads via FTP to the production server
4. Triggers a Node.js restart via Passenger

### Trigger Rebuild via GitHub Actions

```bash
./scripts/rebuild-frontend.sh
```

---

## 🌐 Pages

| Route | Page | Description |
|---|---|---|
| `/` | Beranda (Home) | Hero, gallery slideshow, stats, portfolio showcase, insights, FAQ, CTA |
| `/alur-kerja` | Alur Kerja (Workflow) | Step-by-step interior design process with video hero |
| `/portfolio` | Portofolio | Project listing with category filtering |
| `/portfolio/:slug` | Portfolio Detail | Full project showcase with gallery, specs, and GSAP parallax |
| `/insight` | Insight (Blog) | Article listing with featured images |
| `/insight/:slug` | Insight Detail | Full article with author bio, hero image, and rich content |
| `/hubungi-kami` | Hubungi Kami (Contact) | Contact form, map, and WhatsApp integration |

---

## 📄 License

MIT License — © SJD Interior Design
