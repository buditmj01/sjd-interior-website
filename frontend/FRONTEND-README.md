# SJD Interior - Frontend (Astro + Tailwind CSS)

Website interior design yang dibangun dengan **mobile-first responsive** approach menggunakan Astro dan Tailwind CSS.

## 🎨 Design System

### Colors
- **Primary**: `#0066FF` (Blue untuk CTA buttons)
- **Cream**: `#F5F1ED` (Background sections)
- **Dark**: `#1A1A1A` (Footer & text)

### Typography
- Mobile-first dengan `clamp()` untuk scalable font sizes
- H1: `clamp(2rem, 5vw, 3.5rem)`
- H2: `clamp(1.75rem, 4vw, 2.5rem)`
- H3: `clamp(1.5rem, 3vw, 2rem)`

### Responsive Breakpoints
```css
/* Mobile First */
default: 0-639px (mobile)
sm: 640px+ (large mobile)
md: 768px+ (tablet)
lg: 1024px+ (desktop)
xl: 1280px+ (large desktop)
```

## 📁 Project Structure

```
frontend/
├── public/
│   ├── images/           # Static images
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── common/       # Header, Footer, Button
│   │   ├── home/         # Hero, Stats, ProjectShowcase, etc.
│   │   ├── projects/     # ProjectCard
│   │   └── services/     # ServiceCard
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   └── index.astro   # Home page
│   └── styles/
│       └── global.css    # Tailwind config & base styles
└── package.json
```

## 🚀 Getting Started

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```
Open [http://localhost:4321](http://localhost:4321)

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🎯 Components Overview

### Header Component
- Fixed sticky navigation
- Mobile hamburger menu dengan smooth slide animation
- Active page indicator
- Responsive breakpoints: mobile (< 1024px) & desktop (1024px+)

### Hero Section
- Full-width background image dengan gradient overlay
- Responsive min-height: 500px (mobile), 600px (tablet), 700px (desktop)
- CTA button dengan hover effects

### Stats Section
- 4-column grid yang responsive:
  - Mobile: 1 column
  - Tablet: 2 columns
  - Desktop: 4 columns
- Hover effects dengan shadow & background transition

### ProjectShowcase Component
- Configurable grid columns (2, 3, or 4)
- Responsive grid:
  - Mobile: 1 column
  - Tablet: 2 columns
  - Desktop: 4 columns
- Image hover effects dengan scale & overlay

### ServicesGrid Component
- 4 service cards dengan responsive layout
- Icon dengan background color transition
- Hover effects pada border & title color

### Footer Component
- 4-column layout yang responsive:
  - Mobile: 1 column
  - Tablet: 2 columns
  - Desktop: 4 columns
- Social media links
- Contact information dengan icons

## 📱 Mobile-First Approach

Semua komponen dibangun dengan mobile-first approach:

1. **Base styles** untuk mobile (default)
2. **Progressive enhancement** untuk tablet & desktop dengan media queries
3. **Touch-friendly** spacing & button sizes di mobile
4. **Flexible typography** menggunakan `clamp()` untuk scalability
5. **Responsive images** dengan lazy loading

### Example Mobile-First CSS:
```css
/* Base (Mobile) */
.grid {
  grid-template-columns: 1fr;
}

/* Tablet */
@media (min-width: 640px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

## 🎨 Tailwind Utilities

### Custom Container
```html
<div class="container">
  <!-- Auto max-width: 1440px with responsive padding -->
</div>
```

### Custom Colors
```html
<div class="bg-primary">     <!-- #0066FF -->
<div class="bg-cream">       <!-- #F5F1ED -->
<div class="bg-dark">        <!-- #1A1A1A -->
```

### Responsive Grid
```html
<!-- Mobile: 1 col, Tablet: 2 cols, Desktop: 4 cols -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
```

## 🔧 Next Steps

### Integration dengan Strapi CMS:
1. Install API client (`npm install axios`)
2. Buat `src/lib/api.ts` untuk Strapi integration
3. Fetch data dari Strapi API endpoints
4. Replace static data dengan dynamic content

### Optimizations:
- [ ] Add image optimization (Sharp/Astro Image)
- [ ] Implement lazy loading untuk images
- [ ] Add scroll animations (AOS/Framer Motion)
- [ ] Setup i18n untuk Indonesian/English
- [ ] Add sitemap & robots.txt
- [ ] Configure SEO meta tags
- [ ] Add Google Analytics

### Additional Pages:
- [ ] About page (`src/pages/about.astro`)
- [ ] Projects listing page (`src/pages/projects/index.astro`)
- [ ] Project detail page (`src/pages/projects/[slug].astro`)
- [ ] Services page (`src/pages/services.astro`)
- [ ] Contact page with form (`src/pages/contact.astro`)

## 📸 Screenshots

> Website sudah menggunakan placeholder images dari Unsplash.
> Ganti dengan real project images saat sudah ada.

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

## 📝 Notes

- Semua komponen sudah **fully responsive** dengan mobile-first approach
- Typography menggunakan **fluid scaling** dengan `clamp()`
- Grid layouts menggunakan **CSS Grid** & **Flexbox** via Tailwind
- Touch-friendly button sizes & spacing untuk mobile users
- Smooth transitions & hover effects untuk better UX

---

**Tech Stack:**
- Astro 5.x
- Tailwind CSS 4.x
- TypeScript

**Design Reference:**
- Lihat `/mockup/Home.png` untuk design mockup
- Lihat `../DESIGN-ANALYSIS.md` untuk design breakdown
- Lihat `../ARCHITECTURE-UPDATED.md` untuk architecture details
