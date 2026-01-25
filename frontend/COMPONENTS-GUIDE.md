# Components Guide - SJD Interior Frontend

Dokumentasi lengkap untuk semua komponen yang telah dibangun dengan **mobile-first responsive** approach.

## 📁 Component Structure

```
src/components/
├── common/           # Reusable common components
│   ├── Header.astro  # Navigation & mobile menu
│   ├── Footer.astro  # Footer dengan 4 columns
│   └── Button.astro  # Reusable button component
├── home/             # Home page specific components
│   ├── Hero.astro
│   ├── Stats.astro
│   ├── ProjectShowcase.astro
│   ├── ServicesGrid.astro
│   └── CTASection.astro
├── projects/         # Project related components
│   └── ProjectCard.astro
└── services/         # Service related components
    └── ServiceCard.astro
```

---

## 🎯 Common Components

### Header.astro

**Location:** `src/components/common/Header.astro`

**Features:**
- Fixed sticky navigation
- Mobile hamburger menu dengan slide animation
- Active page indicator
- Responsive: hamburger menu di < 1024px, full menu di >= 1024px

**Props:** None (menggunakan internal navigation items)

**Usage:**
```astro
---
import Header from '../components/common/Header.astro';
---

<Header />
```

**Responsive Behavior:**
- **Mobile (< 1024px):** Hamburger menu, mobile slide-out navigation
- **Desktop (>= 1024px):** Horizontal menu dengan CTA button

**Key Features:**
- Body scroll lock saat mobile menu terbuka
- Escape key untuk close menu
- Auto-close saat klik link
- Smooth slide animation (transform translateX)

---

### Footer.astro

**Location:** `src/components/common/Footer.astro`

**Features:**
- 4-column responsive layout
- Social media links dengan icons
- Contact information
- Quick links & services

**Props:** None (menggunakan internal data)

**Responsive Grid:**
- **Mobile:** 1 column
- **Tablet (>= 640px):** 2 columns
- **Desktop (>= 1024px):** 4 columns

**Usage:**
```astro
---
import Footer from '../components/common/Footer.astro';
---

<Footer />
```

**Sections:**
1. About & Social Media
2. Quick Links (navigation)
3. Services (layanan)
4. Contact Info (email, phone, address)

---

### Button.astro

**Location:** `src/components/common/Button.astro`

**Props:**
```typescript
interface Props {
  href?: string;           // Link URL (optional)
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  class?: string;          // Additional classes
}
```

**Variants:**
- `primary`: Blue background (#0066FF)
- `secondary`: Dark background (#1A1A1A)
- `outline`: Border dengan transparent background

**Sizes:**
- `sm`: Small button (px-4 py-2)
- `md`: Medium button (px-6 py-2.5) - default
- `lg`: Large button (px-8 py-3)

**Usage:**
```astro
<Button href="/contact" variant="primary" size="lg">
  Get Started
</Button>

<Button variant="outline">
  Learn More
</Button>
```

---

## 🏠 Home Components

### Hero.astro

**Location:** `src/components/home/Hero.astro`

**Props:**
```typescript
interface Props {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
}
```

**Features:**
- Full-width background image dengan gradient overlay
- Responsive min-height
- Scroll indicator (bounce animation)
- CTA button integration

**Responsive Heights:**
- **Mobile:** min-h-[500px]
- **Tablet:** min-h-[600px]
- **Desktop:** min-h-[700px]

**Usage:**
```astro
<Hero
  title="Be the next Your Design."
  subtitle="SJD Interior adalah solusi desain lengkap..."
  backgroundImage="https://example.com/hero.jpg"
/>
```

---

### Stats.astro

**Location:** `src/components/home/Stats.astro`

**Features:**
- 4 stat cards dengan responsive grid
- Hover effects (shadow & background)
- Cream background section

**Props:** None (menggunakan internal stats data)

**Responsive Grid:**
- **Mobile:** 1 column
- **Tablet (>= 640px):** 2 columns
- **Desktop (>= 1024px):** 4 columns

**Usage:**
```astro
<Stats />
```

**Default Stats:**
- 500+ Proyek Selesai
- 12+ Tahun Pengalaman
- 98% Client Satisfaction
- 25+ Awards

---

### ProjectShowcase.astro

**Location:** `src/components/home/ProjectShowcase.astro`

**Props:**
```typescript
interface Props {
  title?: string;
  projects: Project[];
  columns?: 2 | 3 | 4;  // Number of columns on desktop
}

interface Project {
  title: string;
  image: string;
  category?: string;
  href?: string;
}
```

**Features:**
- Responsive grid layout
- Configurable columns (2, 3, or 4)
- Empty state handling

**Responsive Grid (4 columns):**
- **Mobile:** 1 column
- **Tablet (>= 640px):** 2 columns
- **Desktop (>= 1024px):** 4 columns

**Usage:**
```astro
<ProjectShowcase
  title="Proyek Unggulan"
  projects={featuredProjects}
  columns={4}
/>
```

---

### ServicesGrid.astro

**Location:** `src/components/home/ServicesGrid.astro`

**Props:**
```typescript
interface Props {
  title?: string;
}
```

**Features:**
- 4 service cards dengan icons
- Responsive grid
- Hover effects pada border & title

**Responsive Grid:**
- **Mobile:** 1 column
- **Tablet (>= 640px):** 2 columns
- **Desktop (>= 1024px):** 4 columns

**Usage:**
```astro
<ServicesGrid title="Layanan Kami" />
```

**Default Services:**
1. Desain Interior
2. Konsultasi Desain
3. Renovasi & Remodeling
4. Custom Furniture

---

### CTASection.astro

**Location:** `src/components/home/CTASection.astro`

**Props:**
```typescript
interface Props {
  title?: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImage?: string;  // Optional
}
```

**Features:**
- Gradient background (atau background image)
- Centered content dengan max-width
- Large typography untuk emphasis
- Decorative blur elements

**Usage:**
```astro
<CTASection
  title="Temukan di Bagian"
  subtitle="Desain rumah"
  description="Wujudkan rumah impian Anda..."
  ctaText="Get Started"
  ctaLink="/contact"
/>
```

---

## 📦 Project Components

### ProjectCard.astro

**Location:** `src/components/projects/ProjectCard.astro`

**Props:**
```typescript
interface Props {
  title: string;
  image: string;
  category?: string;
  href?: string;
  featured?: boolean;  // Changes aspect ratio
}
```

**Features:**
- Image hover effects (scale & overlay)
- Category badge
- Gradient overlay pada hover
- Smooth transitions

**Aspect Ratios:**
- Normal: `aspect-[4/3]`
- Featured: `aspect-[4/5]`

**Usage:**
```astro
<ProjectCard
  title="Modern Living Room"
  image="/images/project-1.jpg"
  category="Residential"
  href="/projects/modern-living-room"
/>
```

**Hover Effects:**
- Image scale: 1.0 → 1.1
- Overlay: opacity 0 → 1
- Title slide up effect

---

## 🛠️ Service Components

### ServiceCard.astro

**Location:** `src/components/services/ServiceCard.astro`

**Props:**
```typescript
interface Props {
  title: string;
  description: string;
  icon?: string;
}
```

**Features:**
- Icon dengan colored background
- Hover effects pada border & title
- Responsive padding

**Usage:**
```astro
<ServiceCard
  title="Desain Interior"
  description="Menciptakan ruang yang fungsional..."
  icon="interior"
/>
```

**Hover Effects:**
- Border color: gray → primary blue
- Icon background: primary/10 → primary/20
- Title color: dark → primary
- Box shadow appears

---

## 🎨 Styling Guidelines

### Mobile-First Approach

Semua komponen menggunakan mobile-first approach:

```css
/* Base styles untuk mobile */
.component {
  /* Mobile styles */
}

/* Tablet breakpoint */
@media (min-width: 640px) {
  .component {
    /* Tablet enhancements */
  }
}

/* Desktop breakpoint */
@media (min-width: 1024px) {
  .component {
    /* Desktop enhancements */
  }
}
```

### Tailwind Responsive Classes

```html
<!-- Mobile: 1 col, Tablet: 2 cols, Desktop: 4 cols -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
```

### Typography Scaling

Semua heading menggunakan fluid typography:

```css
h1 { font-size: clamp(2rem, 5vw, 3.5rem); }
h2 { font-size: clamp(1.75rem, 4vw, 2.5rem); }
h3 { font-size: clamp(1.5rem, 3vw, 2rem); }
```

---

## 🔄 Reusability Tips

### Extending Components

Untuk membuat variant baru dari existing component:

```astro
---
import Button from '../components/common/Button.astro';
---

<!-- Custom styled button -->
<Button
  variant="primary"
  class="shadow-xl ring-2 ring-primary/20"
>
  Custom Button
</Button>
```

### Creating New Components

Template untuk component baru:

```astro
---
interface Props {
  // Define props here
}

const { /* destructure props */ } = Astro.props;
---

<div class="mobile-base tablet:enhanced desktop:optimized">
  <slot />
</div>

<style>
  /* Component-specific styles (if needed) */
</style>
```

---

## 📱 Testing Responsiveness

### Breakpoints to Test

1. **Mobile:** 375px, 414px (iPhone sizes)
2. **Tablet:** 768px, 834px (iPad sizes)
3. **Desktop:** 1024px, 1280px, 1440px

### Browser DevTools

```
Chrome DevTools > Toggle Device Toolbar (Cmd+Shift+M)
- Test each breakpoint
- Check touch targets (min 44x44px)
- Verify text readability
- Check image loading
```

---

## ✨ Animation & Transitions

All components menggunakan smooth transitions:

```css
button, a {
  transition: all 0.3s ease;
}
```

### Hover Effects Standard

- **Buttons:** Background color change + scale down (0.95) on active
- **Cards:** Shadow + translate-y(-4px)
- **Images:** Scale (1.1) dengan overflow hidden

---

## 🚀 Performance Tips

1. **Lazy Loading Images:**
   ```html
   <img loading="lazy" ... />
   ```

2. **Optimize Grid:**
   Gunakan `gap` instead of margin untuk grid spacing

3. **Minimize Reflows:**
   Avoid fixed heights, gunakan min-height atau aspect-ratio

4. **Use Will-Change:**
   Untuk animated elements yang kompleks:
   ```css
   .animated {
     will-change: transform;
   }
   ```

---

**Semua komponen sudah production-ready dan fully responsive!** 🎉

Untuk update atau modifikasi, pastikan tetap mengikuti mobile-first approach dan design system yang sudah ditetapkan.
