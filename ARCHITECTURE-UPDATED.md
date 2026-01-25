# SJD Interior Design - Updated Architecture (Based on Figma Design)

## Overview
Modern Indonesian interior design website built with headless CMS architecture. Features Strapi for content management and Astro for a high-performance, bilingual (Indonesian/English) frontend.

**Design Analysis**: See [DESIGN-ANALYSIS.md](DESIGN-ANALYSIS.md) for detailed breakdown of the Figma mockup.

---

## Technology Stack

### Frontend (Astro)
- **Framework**: Astro 4.x
- **UI Framework**: React/Preact (for interactive components like filters, galleries)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion or AOS (Animate On Scroll)
- **Image Optimization**: Astro Image + Sharp
- **Lightbox**: react-image-lightbox or photoswipe
- **Language**: i18next for Indonesian/English support
- **Deployment**: Vercel (recommended) / Netlify

### Backend (Strapi CMS)
- **CMS**: Strapi 4.x
- **Database**: PostgreSQL (production) / SQLite (development)
- **File Storage**: Cloudinary (recommended for optimization)
- **Deployment**: Railway / Heroku / DigitalOcean
- **Language**: Indonesian content with optional English translations

---

## Updated Directory Structure (Based on Design)

### Frontend Structure
```
frontend/
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   └── assets/
│       ├── icons/          # Service icons
│       └── social/         # Social media icons
├── src/
│   ├── assets/
│   │   ├── images/
│   │   │   ├── hero-bg.jpg
│   │   │   └── placeholder.jpg
│   │   └── styles/
│   │       ├── global.css
│   │       └── animations.css
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.astro         # Navigation with logo + menu
│   │   │   ├── Footer.astro         # 4-column footer
│   │   │   ├── Button.astro         # Blue CTA button
│   │   │   ├── SEO.astro
│   │   │   └── Container.astro      # Max-width wrapper
│   │   │
│   │   ├── home/
│   │   │   ├── Hero.astro           # "Be the next Your Design"
│   │   │   ├── ProjectShowcase.astro # 4-column grid
│   │   │   ├── Stats.astro          # 500+, 12+, 98%, 25+
│   │   │   ├── FeaturedProjects.astro # 2-column featured
│   │   │   ├── ServicesGrid.astro   # 4 service icons
│   │   │   ├── CTASection.astro     # "Temukan di Bagian"
│   │   │   └── LatestProjects.astro # Bottom project grid
│   │   │
│   │   ├── projects/
│   │   │   ├── ProjectCard.astro    # Individual card
│   │   │   ├── ProjectGrid.astro    # Grid container
│   │   │   ├── ProjectFilter.tsx    # Category filtering
│   │   │   ├── ProjectGallery.tsx   # Lightbox gallery
│   │   │   └── ProjectHero.astro    # Detail page hero
│   │   │
│   │   ├── services/
│   │   │   ├── ServiceCard.astro
│   │   │   └── ServiceIcon.astro
│   │   │
│   │   └── contact/
│   │       └── ContactForm.tsx      # Form with validation
│   │
│   ├── layouts/
│   │   ├── BaseLayout.astro         # Main layout
│   │   ├── HomeLayout.astro         # Home-specific
│   │   └── ProjectLayout.astro      # Project detail layout
│   │
│   ├── pages/
│   │   ├── index.astro              # Home page (from mockup)
│   │   ├── about.astro              # About page
│   │   ├── services.astro           # Services page
│   │   ├── contact.astro            # Contact page
│   │   └── projects/
│   │       ├── index.astro          # Projects grid
│   │       └── [slug].astro         # Project detail
│   │
│   ├── lib/
│   │   ├── api.ts                   # Strapi API client
│   │   ├── types.ts                 # TypeScript types
│   │   ├── utils.ts                 # Utility functions
│   │   └── i18n.ts                  # Indonesian/English
│   │
│   └── env.d.ts
│
├── astro.config.mjs
├── tailwind.config.cjs
├── tsconfig.json
└── package.json
```

---

## Content Models (Updated for Actual Design)

### 1. Project (Collection)
```json
{
  "title": "String (required)",
  "title_id": "String (Indonesian title)",
  "title_en": "String (English title)",
  "slug": "UID (auto-generated from title)",
  "description": "Text (short excerpt)",
  "description_id": "Text (Indonesian)",
  "description_en": "Text (English)",
  "content": "Rich Text (full description)",
  "content_id": "Rich Text (Indonesian)",
  "content_en": "Rich Text (English)",
  "featured_image": "Media (single, required)",
  "gallery": "Media (multiple, for lightbox)",
  "thumbnail": "Media (optimized for grid display)",
  "project_type": "Enumeration (Residential, Commercial, Office, Apartment)",
  "location": "String",
  "year": "Number",
  "square_meters": "Number",
  "client_name": "String (optional)",
  "is_featured": "Boolean (for homepage featured section)",
  "display_order": "Number (for sorting)",
  "seo": "Component (SEO meta)",
  "published_at": "DateTime"
}
```

### 2. Service (Collection)
```json
{
  "title": "String (required)",
  "title_id": "String (Indonesian)",
  "title_en": "String (English)",
  "slug": "UID",
  "description": "Text",
  "description_id": "Text (Indonesian)",
  "description_en": "Text (English)",
  "icon": "String (icon name/class) or Media",
  "featured_image": "Media",
  "order": "Number (for display sequence)",
  "seo": "Component (SEO)"
}
```

### 3. Stats/Achievement (Collection)
```json
{
  "number": "String (e.g., '500+', '12+', '98%', '25+')",
  "label": "String (required)",
  "label_id": "String (Indonesian)",
  "label_en": "String (English)",
  "description": "Text",
  "description_id": "Text (Indonesian)",
  "description_en": "Text (English)",
  "order": "Number (1-4 for homepage display)"
}
```

### 4. Home Page Settings (Single Type)
```json
{
  "hero_title": "String (Be the next Your Design.)",
  "hero_title_id": "String (Indonesian)",
  "hero_title_en": "String (English)",
  "hero_subtitle": "Text (SJD Interior adalah...)",
  "hero_subtitle_id": "Text (Indonesian)",
  "hero_subtitle_en": "Text (English)",
  "hero_background": "Media",
  "hero_cta_text": "String (Get Started)",
  "hero_cta_link": "String (/contact)",
  "showcase_title": "String",
  "showcase_title_id": "String",
  "showcase_title_en": "String",
  "cta_section_title": "String (Temukan di Bagian)",
  "cta_section_title_id": "String",
  "cta_section_title_en": "String",
  "cta_section_subtitle": "String (Desain rumah)",
  "cta_section_button_text": "String",
  "latest_projects_title": "String",
  "latest_projects_title_id": "String",
  "latest_projects_title_en": "String"
}
```

### 5. Site Settings (Single Type)
```json
{
  "site_name": "String (SJD Interior)",
  "site_description": "Text",
  "logo": "Media",
  "favicon": "Media",
  "primary_color": "String (#0066FF)",
  "secondary_color": "String",
  "contact": {
    "email": "Email",
    "phone": "String",
    "whatsapp": "String",
    "address": "Text",
    "address_id": "Text (Indonesian)",
    "address_en": "Text (English)",
    "google_maps_url": "String"
  },
  "social_media": {
    "facebook": "String (URL)",
    "instagram": "String (URL)",
    "linkedin": "String (URL)",
    "youtube": "String (URL)",
    "tiktok": "String (URL)"
  },
  "footer": {
    "about_text": "Text",
    "about_text_id": "Text (Indonesian)",
    "about_text_en": "Text (English)",
    "copyright": "String"
  },
  "seo_defaults": "Component (SEO)"
}
```

### 6. Navigation (Single Type)
```json
{
  "menu_items": [
    {
      "label": "String (Home, About Us, Our Work, Services, Contact)",
      "label_id": "String (Indonesian)",
      "label_en": "String (English)",
      "url": "String",
      "order": "Number"
    }
  ]
}
```

---

## Home Page Component Breakdown (Matching Mockup)

### Section 1: Header/Navigation
```astro
<Header>
  <Logo />
  <Nav items={["Home", "About Us", "Our Work", "Services", "Contact"]} />
  <Button text="Get Started" link="/contact" />
</Header>
```

### Section 2: Hero
```astro
<Hero
  title="Be the next Your Design."
  subtitle="SJD Interior adalah solusi desain lengkap personal dari Rumah, apartemen dan lainnya"
  backgroundImage={heroImage}
  ctaText="Get Started"
  ctaLink="/contact"
/>
```

### Section 3: Project Showcase (4-column grid)
```astro
<ProjectShowcase
  title="Featured Projects"
  projects={featuredProjects.slice(0, 4)}
  columns={4}
/>
```

### Section 4: Stats Section
```astro
<Stats
  stats={[
    { number: "500+", label: "Rumah, Apartement, Kantor Kami Bisa" },
    { number: "12+", label: "Pengalaman" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "25+", label: "Awards" }
  ]}
  backgroundColor="cream"
/>
```

### Section 5: Featured Projects (2-column)
```astro
<FeaturedProjects
  projects={featuredProjects.slice(0, 2)}
  layout="2-column"
/>
```

### Section 6: Services Grid
```astro
<ServicesGrid
  services={allServices}
  columns={4}
/>
```

### Section 7: Large Project Feature
```astro
<ProjectFeature
  title="Eksplorasi rumah impian dalam impian nyaman"
  project={featuredProject}
  layout="large-with-gallery"
/>
```

### Section 8: CTA Section
```astro
<CTASection
  title="Temukan di Bagian"
  subtitle="Desain rumah"
  ctaText="Get Started"
  ctaLink="/projects"
/>
```

### Section 9: Latest Projects (4-column grid)
```astro
<LatestProjects
  title="Latest Projects"
  projects={latestProjects.slice(0, 8)}
  columns={4}
/>
```

### Section 10: Footer
```astro
<Footer
  columns={[
    { title: "About", content: "..." },
    { title: "Quick Links", links: [...] },
    { title: "Contact", content: contactInfo },
    { title: "Follow Us", socials: [...] }
  ]}
/>
```

---

## Tailwind Config (Design System)

```javascript
// tailwind.config.cjs
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0066FF',  // Blue CTA button
          dark: '#0052CC',
          light: '#3384FF',
        },
        cream: {
          DEFAULT: '#F5F1ED',  // Stats section background
          light: '#FAF8F6',
        },
        dark: {
          DEFAULT: '#1A1A1A',  // Footer background
          light: '#2D2D2D',
        },
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': ['4rem', { lineHeight: '1.1', fontWeight: '700' }],
        'section': ['2.5rem', { lineHeight: '1.2', fontWeight: '700' }],
        'stat': ['3rem', { lineHeight: '1', fontWeight: '800' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'button': '8px',
      },
      maxWidth: {
        'container': '1440px',
      },
      gridTemplateColumns: {
        'projects': 'repeat(auto-fill, minmax(300px, 1fr))',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
```

---

## API Endpoints Structure

### Projects
```
GET /api/projects
  ?populate[0]=featured_image
  &populate[1]=thumbnail
  &populate[2]=gallery
  &filters[is_featured][$eq]=true
  &sort=display_order:asc
  &locale=id

GET /api/projects/:slug
  ?populate=deep
  &locale=id
```

### Services
```
GET /api/services
  ?populate=*
  &sort=order:asc
  &locale=id
```

### Stats
```
GET /api/stats
  ?sort=order:asc
  &locale=id
```

### Home Page Settings
```
GET /api/home-page-setting
  ?populate=hero_background
  &locale=id
```

### Site Settings
```
GET /api/site-setting
  ?populate[0]=logo
  &populate[1]=favicon
  &locale=id
```

---

## Key Features Implementation

### 1. Project Gallery with Lightbox
```typescript
// components/projects/ProjectGallery.tsx
import Lightbox from 'react-image-lightbox';

export function ProjectGallery({ images }) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="grid grid-cols-4 gap-6">
        {images.map((img, index) => (
          <img
            key={index}
            src={img.url}
            onClick={() => { setPhotoIndex(index); setIsOpen(true); }}
            className="cursor-pointer hover:opacity-80 transition"
          />
        ))}
      </div>
      {isOpen && (
        <Lightbox
          mainSrc={images[photoIndex].url}
          nextSrc={images[(photoIndex + 1) % images.length].url}
          prevSrc={images[(photoIndex + images.length - 1) % images.length].url}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() => setPhotoIndex((photoIndex + images.length - 1) % images.length)}
          onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % images.length)}
        />
      )}
    </>
  );
}
```

### 2. Project Filtering
```typescript
// components/projects/ProjectFilter.tsx
export function ProjectFilter({ projects }) {
  const [filter, setFilter] = useState('all');

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.project_type === filter);

  return (
    <div>
      <div className="flex gap-4 mb-8">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('Residential')}>Residential</button>
        <button onClick={() => setFilter('Commercial')}>Commercial</button>
        <button onClick={() => setFilter('Office')}>Office</button>
      </div>
      <ProjectGrid projects={filteredProjects} />
    </div>
  );
}
```

### 3. Scroll Animations
```astro
---
// Use AOS (Animate On Scroll)
import AOS from 'aos';
import 'aos/dist/aos.css';
---

<script>
  AOS.init({
    duration: 800,
    once: true,
    offset: 100,
  });
</script>

<div data-aos="fade-up">
  <ProjectCard />
</div>
```

### 4. Indonesian/English Language Support
```typescript
// lib/i18n.ts
export const translations = {
  id: {
    'hero.title': 'Be the next Your Design.',
    'hero.subtitle': 'SJD Interior adalah solusi desain lengkap...',
    'cta.button': 'Mulai',
  },
  en: {
    'hero.title': 'Be the next Your Design.',
    'hero.subtitle': 'SJD Interior is a complete design solution...',
    'cta.button': 'Get Started',
  }
};

export function t(key: string, locale: string = 'id') {
  return translations[locale][key] || key;
}
```

---

## Performance Optimizations

### Image Optimization
```astro
---
import { Image } from '@astrojs/image/components';
---

<Image
  src={project.featured_image.url}
  alt={project.title}
  width={600}
  height={400}
  format="webp"
  quality={80}
  loading="lazy"
  class="w-full h-auto"
/>
```

### Critical CSS
```astro
<style is:inline>
  /* Critical CSS for above-the-fold content */
  .hero { ... }
  .nav { ... }
</style>
```

### Code Splitting
```javascript
// astro.config.mjs
export default defineConfig({
  build: {
    inlineStylesheets: 'auto',
    split: true,
  },
});
```

---

## Responsive Breakpoints

```css
/* Desktop First Approach */
.project-grid {
  grid-template-columns: repeat(4, 1fr); /* Desktop: 4 columns */
}

@media (max-width: 1024px) {
  .project-grid {
    grid-template-columns: repeat(2, 1fr); /* Tablet: 2 columns */
  }
}

@media (max-width: 640px) {
  .project-grid {
    grid-template-columns: 1fr; /* Mobile: 1 column */
  }
}
```

---

## SEO Implementation

```astro
---
// components/common/SEO.astro
const {
  title = 'SJD Interior - Solusi Desain Interior Terbaik',
  description = 'SJD Interior adalah solusi desain lengkap personal dari Rumah, apartemen dan lainnya',
  image = '/og-image.jpg',
  locale = 'id_ID',
} = Astro.props;
---

<head>
  <title>{title}</title>
  <meta name="description" content={description} />

  <!-- Open Graph -->
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={image} />
  <meta property="og:locale" content={locale} />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={image} />

  <!-- Schema.org JSON-LD -->
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "SJD Interior",
      "url": "https://sjdinterior.com",
      "logo": "/logo.png",
      "sameAs": [
        "https://instagram.com/sjdinterior",
        "https://facebook.com/sjdinterior"
      ]
    }
  </script>
</head>
```

---

## Deployment Configuration

### Vercel (vercel.json)
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "astro",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/$1"
    }
  ]
}
```

### Environment Variables
```env
# Frontend (.env)
STRAPI_URL=https://cms.sjdinterior.com
PUBLIC_SITE_URL=https://sjdinterior.com
PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

---

## Development Workflow

1. **Start Strapi CMS**:
   ```bash
   cd cms
   npm run develop
   ```

2. **Start Astro Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```

3. **Add Content in Strapi**:
   - Create projects with images
   - Configure home page settings
   - Add stats/achievements
   - Set up services

4. **Build for Production**:
   ```bash
   npm run build
   npm run preview
   ```

---

## Next Steps

1. ✅ Design analyzed from Figma
2. ✅ Architecture updated to match design
3. ⬜ Initialize Strapi with content types
4. ⬜ Initialize Astro with component structure
5. ⬜ Build components matching mockup
6. ⬜ Implement Indonesian language support
7. ⬜ Add image optimization
8. ⬜ Deploy to staging
9. ⬜ User acceptance testing
10. ⬜ Production deployment

---

This updated architecture precisely matches your Figma design and provides a complete blueprint for implementation! 🚀
