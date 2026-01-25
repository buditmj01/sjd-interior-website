# System Flow & Data Architecture

## Content Management Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                      CONTENT EDITOR                              │
│                    (Strapi Admin Panel)                          │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ Creates/Updates Content
                             ▼
                  ┌──────────────────────┐
                  │   STRAPI CMS API     │
                  │   (REST/GraphQL)     │
                  └──────────┬───────────┘
                             │
                ┌────────────┼────────────┐
                ▼            ▼            ▼
         ┌──────────┐  ┌─────────┐  ┌──────────┐
         │PostgreSQL│  │  Media  │  │  Cache   │
         │ Database │  │ Storage │  │  Layer   │
         └──────────┘  └─────────┘  └──────────┘
                             │
                             │ API Request
                             ▼
                  ┌──────────────────────┐
                  │   ASTRO BUILD TIME   │
                  │  (Static Generation) │
                  └──────────┬───────────┘
                             │
                             │ Generates Static HTML
                             ▼
                  ┌──────────────────────┐
                  │   STATIC ASSETS      │
                  │   (dist/ folder)     │
                  └──────────┬───────────┘
                             │
                             │ Deploy
                             ▼
                  ┌──────────────────────┐
                  │   CDN (Vercel/       │
                  │   Netlify/CloudFlare)│
                  └──────────┬───────────┘
                             │
                             │ HTTP Request
                             ▼
                  ┌──────────────────────┐
                  │    END USER          │
                  │    (Browser)         │
                  └──────────────────────┘
```

---

## Page Request Flow

### Static Pages (Projects, About, Services)

```
User Request
    │
    ▼
┌─────────────┐
│     CDN     │  ← Cached static HTML
└─────┬───────┘
      │
      │ Cache MISS (on build/deploy)
      ▼
┌─────────────┐
│ Astro Build │
└─────┬───────┘
      │
      │ Fetch data during build
      ▼
┌─────────────┐
│ Strapi API  │
└─────┬───────┘
      │
      │ Query database
      ▼
┌─────────────┐
│  Database   │
└─────────────┘
```

**Performance**:
- First request: ~50-100ms (CDN)
- Subsequent: ~10-20ms (cached at edge)
- No database queries per user request
- Static HTML served directly

---

## Dynamic Features Flow

### Contact Form Submission

```
User fills form
    │
    ▼
Frontend validation
    │
    ▼
POST request to Strapi
    │
    ▼
┌────────────────────┐
│  Strapi API        │
│  /api/contact      │
└────────┬───────────┘
         │
         │ Validate & Save
         ▼
┌────────────────────┐
│  Database          │
│  contact_submissions│
└────────┬───────────┘
         │
         │ Trigger webhook (optional)
         ▼
┌────────────────────┐
│  Email Service     │
│  (SendGrid/SES)    │
└────────────────────┘
```

### Project Filtering (Client-Side)

```
User selects filter
    │
    ▼
React Component State Update
    │
    ▼
Filter projects array (already loaded)
    │
    ▼
Re-render filtered results
```

**Performance**: Instant filtering, no API calls

---

## Build & Deploy Pipeline

```
┌─────────────────────────────────────────────────────────────┐
│                    DEVELOPMENT FLOW                          │
└─────────────────────────────────────────────────────────────┘

Content Editor Updates → Strapi Admin
                              │
                              ▼
                      Content Saved to DB
                              │
                              │ Webhook trigger (optional)
                              ▼
                      ┌──────────────────┐
                      │ Vercel/Netlify   │
                      │ Rebuild Triggered│
                      └────────┬─────────┘
                               │
                               ▼
                      ┌──────────────────┐
                      │  Git Pull        │
                      │  (frontend repo) │
                      └────────┬─────────┘
                               │
                               ▼
                      ┌──────────────────┐
                      │  npm run build   │
                      └────────┬─────────┘
                               │
                    ┌──────────┴──────────┐
                    ▼                     ▼
        Fetch content from Strapi    Optimize images
                    │                     │
                    └──────────┬──────────┘
                               ▼
                      Generate static HTML
                               │
                               ▼
                      Deploy to CDN edges
                               │
                               ▼
                      New version live!
```

---

## Data Structure & Relationships

```
┌──────────────┐
│   Projects   │
└──────┬───────┘
       │
       ├─── has many ────┐
       │                 ▼
       │         ┌──────────────┐
       │         │   Gallery    │
       │         │   (Images)   │
       │         └──────────────┘
       │
       ├─── belongs to many ──┐
       │                      ▼
       │              ┌──────────────┐
       │              │  Categories  │
       │              └──────────────┘
       │
       ├─── belongs to many ──┐
       │                      ▼
       │              ┌──────────────┐
       │              │   Services   │
       │              └──────────────┘
       │
       └─── has many ────┐
                         ▼
                 ┌──────────────┐
                 │ Testimonials │
                 └──────────────┘

┌──────────────┐
│  Blog Posts  │
└──────┬───────┘
       │
       ├─── belongs to ───┐
       │                  ▼
       │          ┌──────────────┐
       │          │    Author    │
       │          │(Team Member) │
       │          └──────────────┘
       │
       ├─── belongs to many ──┐
       │                      ▼
       │              ┌──────────────┐
       │              │  Categories  │
       │              └──────────────┘
       │
       └─── belongs to many ──┐
                              ▼
                      ┌──────────────┐
                      │     Tags     │
                      └──────────────┘
```

---

## API Endpoint Structure

### Strapi REST API Endpoints

```
GET /api/projects
├─ ?populate=*                          # Get all fields and relations
├─ ?filters[is_featured][$eq]=true      # Featured projects only
├─ ?sort=project_date:desc              # Sort by date
├─ ?pagination[page]=1&pagination[pageSize]=10  # Pagination
└─ ?fields[0]=title&fields[1]=slug      # Specific fields

GET /api/projects/:id
└─ ?populate=deep                        # Deep populate all relations

GET /api/services
├─ ?sort=order:asc                      # Ordered by custom order field
└─ ?populate=*                          # Include all relations

GET /api/blog-posts
├─ ?populate[author][populate]=*        # Populate nested author
├─ ?populate[categories][populate]=*    # Populate categories
└─ ?filters[published_at][$notNull]=true # Only published

GET /api/testimonials
└─ ?filters[is_featured][$eq]=true      # Featured testimonials

POST /api/contact-submissions
Body: {
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Hello..."
  }
}
```

---

## Caching Strategy

```
┌────────────────────────────────────────────────────────────┐
│                    CACHE LAYERS                             │
└────────────────────────────────────────────────────────────┘

Level 1: CDN Edge Cache
├─ Location: Worldwide edge nodes
├─ TTL: Until new deployment
├─ Content: Static HTML, CSS, JS, Images
└─ Hit Rate: ~95%+

Level 2: Strapi Response Cache (Optional)
├─ Location: Strapi server
├─ TTL: 5-60 minutes (configurable)
├─ Content: API responses
└─ Hit Rate: N/A (build time only)

Level 3: Database Query Cache
├─ Location: PostgreSQL
├─ TTL: Per query
├─ Content: Query results
└─ Hit Rate: Varies

Level 4: Browser Cache
├─ Location: User's browser
├─ TTL: Based on headers
├─ Content: Static assets
└─ Hit Rate: Varies per user
```

---

## Security Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    SECURITY LAYERS                           │
└─────────────────────────────────────────────────────────────┘

Frontend (Astro)
├─ HTTPS only (enforced)
├─ Content Security Policy headers
├─ XSS protection (auto-escaped templates)
├─ No sensitive data in client
└─ Environment variables for API URLs

API Layer (Strapi)
├─ CORS configuration
├─ Rate limiting (optional: nginx/cloudflare)
├─ API token authentication
├─ Role-based access control (RBAC)
│  ├─ Public: Read-only access to published content
│  ├─ Authenticated: Additional permissions
│  └─ Admin: Full access
├─ Input validation & sanitization
└─ SQL injection protection (ORM)

Database Layer
├─ Encrypted connections (SSL/TLS)
├─ Strong password requirements
├─ Limited database user permissions
├─ Regular backups
└─ Network isolation (private network)

Infrastructure
├─ Environment variable secrets
├─ Secure file upload validation
├─ Regular security updates
└─ Monitoring & logging
```

---

## Performance Metrics (Expected)

### Frontend (Astro)
```
Lighthouse Score Target:
├─ Performance: 95-100
├─ Accessibility: 90-100
├─ Best Practices: 90-100
└─ SEO: 90-100

Page Load Times:
├─ First Contentful Paint (FCP): < 1.0s
├─ Largest Contentful Paint (LCP): < 2.0s
├─ Time to Interactive (TTI): < 2.5s
└─ Total Blocking Time (TBT): < 200ms

Bundle Sizes:
├─ Initial JS: < 50KB (gzipped)
├─ Initial CSS: < 30KB (gzipped)
└─ Images: Optimized WebP/AVIF
```

### Backend (Strapi)
```
API Response Times:
├─ Simple query: < 100ms
├─ Complex query with relations: < 300ms
└─ Image upload: < 2s

Database:
├─ Connection pool: 10-20 connections
└─ Query optimization: Indexed fields
```

---

## Scaling Considerations

### Vertical Scaling (Single Server)
```
Strapi Server:
├─ RAM: Start with 1GB, scale to 4GB+
├─ CPU: 1-2 cores initially
└─ Storage: 20GB+ for media

Database:
├─ RAM: 2GB minimum
├─ CPU: 2 cores
└─ Storage: 50GB+ with growth
```

### Horizontal Scaling (Multiple Servers)
```
Load Balancer
    │
    ├─── Strapi Instance 1
    ├─── Strapi Instance 2
    └─── Strapi Instance 3
              │
              ▼
    Shared PostgreSQL Database
              │
              ▼
    Shared Media Storage (S3/Cloudinary)
```

---

## Monitoring & Analytics

```
Frontend Monitoring:
├─ Vercel Analytics (built-in)
├─ Google Analytics (optional)
└─ Error tracking: Sentry (optional)

Backend Monitoring:
├─ Application logs
├─ Database performance metrics
├─ API response times
└─ Error rates

Infrastructure:
├─ Uptime monitoring
├─ SSL certificate expiry
└─ Disk space alerts
```

---

## Backup Strategy

```
Database Backups:
├─ Frequency: Daily automated backups
├─ Retention: 30 days
├─ Location: Separate storage region
└─ Testing: Monthly restore tests

Media Files:
├─ Storage: Cloud provider (S3/Cloudinary)
├─ Redundancy: Multi-region replication
└─ Versioning: Enabled

Code:
├─ Version control: Git
├─ Repository: GitHub/GitLab
└─ Branches: main, develop, feature/*
```

This architecture is designed for:
- High performance (static generation)
- Easy content management (Strapi CMS)
- Scalability (horizontal scaling ready)
- Security (multiple layers)
- Cost efficiency (minimal server costs with static hosting)
