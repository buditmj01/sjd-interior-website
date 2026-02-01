# SJD Interior Design

Full-stack website for SJD Interior Design featuring Awwwards-style parallax scrolling and smooth animations.

## Tech Stack

**Frontend:**
- Astro.js 5.16.9 - Static site framework
- TailwindCSS 4.1.18 - Utility-first CSS
- GSAP 3.14.2 + ScrollTrigger - Animation engine
- Lenis 1.x - Smooth scrolling

**Backend:**
- Strapi CMS 4.26.1 - Headless CMS
- Node.js 18-20 - Runtime
- SQLite (dev) / PostgreSQL (prod) - Database

**Deployment:**
- Docker & Docker Compose - Containerization

## Quick Start (Local Development)

### Prerequisites
- Node.js 18-20
- npm 6+

### 1. Install Dependencies

```bash
# Install CMS dependencies
cd cms
npm install --legacy-peer-deps

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Configure Environment

**CMS (.env):**
```bash
cd cms
# .env file already configured with SQLite
```

**Frontend (.env):**
```bash
cd frontend
# .env file already configured for localhost
```

### 3. Start Development Servers

**Terminal 1 - Start Strapi CMS:**
```bash
cd cms
npm run develop
```
- Admin: http://localhost:1337/admin
- API: http://localhost:1337/api

**Terminal 2 - Start Frontend:**
```bash
cd frontend
npm run dev
```
- Frontend: http://localhost:4321

### 4. Create Admin User

On first run, visit http://localhost:1337/admin and create your admin account.

## Project Structure

```
sjd-interior-design/
├── cms/                      # Strapi CMS Backend
│   ├── src/
│   │   ├── api/             # API endpoints
│   │   │   ├── insight/     # Insight content type
│   │   │   ├── portfolio/   # Portfolio projects
│   │   │   └── ...
│   │   └── seed-data.js     # Database seeding
│   ├── config/              # Strapi configuration
│   └── .env                 # CMS environment variables
│
├── frontend/                # Astro.js Frontend
│   ├── src/
│   │   ├── components/      # UI components
│   │   │   └── home/        # Homepage sections
│   │   │       ├── Hero.astro
│   │   │       ├── IntroGrid.astro
│   │   │       ├── Stats.astro
│   │   │       ├── ProjectShowcase.astro
│   │   │       ├── Testimonials.astro
│   │   │       └── ProcessSteps.astro
│   │   ├── layouts/         # Page layouts
│   │   ├── pages/           # Routes
│   │   ├── scripts/         # Client-side scripts
│   │   │   └── scroll-init.ts  # Lenis smooth scroll
│   │   ├── utils/           # Utilities
│   │   │   ├── gsap.ts      # GSAP helpers
│   │   │   └── animations.ts # Animation presets
│   │   ├── lib/
│   │   │   └── strapi.js    # Strapi API client
│   │   └── styles/
│   │       └── global.css   # Global styles
│   └── .env                 # Frontend environment variables
│
├── docker-compose.yml       # Docker orchestration
└── README.md               # This file
```

## Parallax & Animation Features

### Smooth Scrolling (Lenis)
- 60fps buttery-smooth scrolling
- Integrated with GSAP ScrollTrigger
- Respects `prefers-reduced-motion`
- Disabled on touch devices for performance

### Animated Sections

**Hero Section**
- Background parallax (0.5x speed)
- Staggered text reveal
- Fade-out on scroll

**IntroGrid**
- Multi-layer depth parallax (0.3x - 0.9x)
- Card rotation + scale reveal
- Image zoom effects

**Stats Section**
- Counter animations (0 → target)
- Bounce-in effect with `back.out(1.4)`
- Staggered card reveals

**Project Showcase**
- Ken Burns effect (scale 1.2 → 1)
- Horizontal parallax backgrounds
- Slide-in animations

**Testimonials**
- 3D card reveal with rotationX
- Interactive hover tilt
- Layered parallax

**Process Steps**
- Timeline stepper animation
- Sequential box + line drawing
- Rotate + bounce effects

### Performance Optimizations

- GPU acceleration with `translate3d`
- Strategic `will-change` usage
- Mobile-optimized (reduced animations)
- Fully accessible with reduced motion support

### Adding Custom Animations

```typescript
// In your component script
import { createParallax, createReveal } from '../../utils/gsap';

// Parallax effect
createParallax('[data-my-element]', {
  speed: 0.5,
  direction: 'vertical',
});

// Reveal animation
createReveal('[data-my-element]', {
  from: { opacity: 0, y: 50 },
  to: { opacity: 1, y: 0 },
  stagger: 0.1,
});
```

## Content Management (Strapi)

### Content Types

- **Portfolio** - Project showcase items
- **Insight** - Blog posts and articles
- **Service** - Service offerings
- **Testimonial** - Client testimonials

### API Usage

```javascript
// Fetch all portfolio items
const response = await fetch('http://localhost:1337/api/portfolios?populate=*');
const data = await response.json();
```

### Media Library

Upload images and files through the Strapi admin panel. Files are stored in `cms/public/uploads/`.

## Docker Deployment (Optional)

### Development Mode

```bash
# Start with Docker
docker compose --profile development up -d

# Access points
# - Frontend: http://localhost:4321
# - Strapi: http://localhost:1337/admin
```

### Production Mode

```bash
# Generate secure secrets
JWT_SECRET=$(openssl rand -base64 32)
ADMIN_JWT_SECRET=$(openssl rand -base64 32)
APP_KEYS="$(openssl rand -base64 32),$(openssl rand -base64 32),$(openssl rand -base64 32),$(openssl rand -base64 32)"
API_TOKEN_SALT=$(openssl rand -base64 32)
TRANSFER_TOKEN_SALT=$(openssl rand -base64 32)
POSTGRES_PASSWORD=$(openssl rand -base64 24)

# Update .env with secrets above

# Start production containers
docker compose --profile production up -d --build

# Access points
# - Frontend: http://localhost:8080
# - Strapi: http://localhost:1337/admin
```

### Docker Features

**CMS Container:**
- Multi-stage build (~400MB production image)
- PostgreSQL database
- Non-root user execution
- Health checks

**Frontend Container:**
- Nginx static server (~50MB production image)
- Security-hardened configuration
- Optimized for performance

**Database Container:**
- PostgreSQL 15 Alpine
- Persistent volume storage
- Automatic health checks

### Docker Commands

```bash
# View logs
docker compose logs -f

# Stop services
docker compose down

# Rebuild containers
docker compose build --no-cache

# Access container shell
docker compose exec strapi-dev sh

# Database backup
docker compose exec postgres pg_dump -U strapi sjd_interior > backup.sql

# Database restore
docker compose exec -T postgres psql -U strapi sjd_interior < backup.sql
```

## Development Workflow

### Local Development

```bash
# Terminal 1: Start Strapi
cd cms && npm run develop

# Terminal 2: Start Frontend
cd frontend && npm run dev
```

### Managing Processes

```bash
# View CMS logs
tail -f cms-dev.log

# View frontend logs
tail -f frontend-dev.log

# Stop CMS
kill $(cat .cms.pid)

# Stop frontend
kill $(cat .frontend.pid)
```

### Building for Production

```bash
# Build Strapi admin panel
cd cms
npm run build

# Build Astro static site
cd frontend
npm run build

# Preview production build
npm run preview
```

## Environment Variables

### CMS (cms/.env)

```bash
HOST=0.0.0.0
PORT=1337

# Generate with: openssl rand -base64 32
APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=your_salt_here
ADMIN_JWT_SECRET=your_secret_here
TRANSFER_TOKEN_SALT=your_salt_here
JWT_SECRET=your_secret_here

# Development: SQLite
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db

# Production: PostgreSQL
# DATABASE_CLIENT=postgres
# DATABASE_HOST=postgres
# DATABASE_PORT=5432
# DATABASE_NAME=sjd_interior
# DATABASE_USERNAME=strapi
# DATABASE_PASSWORD=your_password_here
```

### Frontend (frontend/.env)

```bash
PUBLIC_SITE_URL=http://localhost:4321
PUBLIC_STRAPI_URL=http://localhost:1337
PUBLIC_STRAPI_TOKEN=
```

## Troubleshooting

### CMS won't start

**Dependency issues:**
```bash
cd cms
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

**Database issues:**
```bash
# Reset SQLite database
rm -rf cms/.tmp
```

### Frontend can't fetch from Strapi

1. Check Strapi is running: http://localhost:1337/api
2. Verify `PUBLIC_STRAPI_URL` in `frontend/.env`
3. Check CORS settings in `cms/config/middlewares.js`

### Animations not working

1. Clear browser cache
2. Check console for JavaScript errors
3. Verify GSAP and Lenis are loaded
4. Test with reduced motion disabled

### Port already in use

```bash
# Find process using port 1337
lsof -i :1337
kill -9 <PID>

# Find process using port 4321
lsof -i :4321
kill -9 <PID>
```

### Docker issues

```bash
# Clean Docker cache
docker system prune -a

# Rebuild from scratch
docker compose build --no-cache

# Check container logs
docker compose logs strapi-dev
```

## Production Deployment Checklist

- [ ] Generate unique secrets for production
- [ ] Set `NODE_ENV=production`
- [ ] Configure production URLs
- [ ] Set up PostgreSQL database
- [ ] Configure SSL/TLS certificates
- [ ] Set up CORS whitelist
- [ ] Configure CDN for media files
- [ ] Set up automated backups
- [ ] Configure monitoring and logging
- [ ] Test all API endpoints
- [ ] Verify all animations work
- [ ] Test on mobile devices

## Performance Metrics

**Target Performance:**
- FPS: 60fps (constant)
- First Paint: < 1.5s
- Time to Interactive: < 3s
- Lighthouse Score: 90+

**Optimization Techniques:**
- Static site generation with Astro
- Image optimization and lazy loading
- Code splitting and tree shaking
- GPU-accelerated animations
- Efficient bundle sizes

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari 14+, Chrome Mobile)

## License

MIT

---

**Last Updated:** February 1, 2026
**Version:** 1.0.0
**Author:** SJD Interior Design Team
