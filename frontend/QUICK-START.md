# Quick Start Guide - SJD Interior Frontend

Panduan cepat untuk mulai development website SJD Interior.

## 🚀 Setup (First Time)

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open browser
# http://localhost:4321
```

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server di port 4321 |
| `npm run build` | Build untuk production ke folder `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run astro` | Run Astro CLI commands |

## 📁 File Structure Overview

```
frontend/
├── src/
│   ├── components/       # All reusable components
│   │   ├── common/       # Header, Footer, Button
│   │   ├── home/         # Home page components
│   │   ├── projects/     # Project related
│   │   └── services/     # Service related
│   ├── layouts/
│   │   └── BaseLayout.astro  # Main layout
│   ├── pages/
│   │   └── index.astro   # Home page
│   └── styles/
│       └── global.css    # Global styles + Tailwind
├── public/               # Static assets
└── COMPONENTS-GUIDE.md   # Component documentation
```

## ✏️ Editing Pages

### Home Page
**File:** `src/pages/index.astro`

Untuk mengubah konten home page, edit file ini. Semua section sudah terintegrasi dengan component.

### Menambah Page Baru

1. Buat file di `src/pages/`:
```bash
# Example: About page
touch src/pages/about.astro
```

2. Gunakan BaseLayout:
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Header from '../components/common/Header.astro';
import Footer from '../components/common/Footer.astro';
---

<BaseLayout title="About Us - SJD Interior">
  <Header />
  <main>
    <h1>About Us</h1>
    <!-- Your content here -->
  </main>
  <Footer />
</BaseLayout>
```

## 🎨 Styling Guide

### Using Tailwind Classes

Semua styling menggunakan Tailwind CSS utility classes:

```html
<!-- Responsive padding -->
<div class="p-4 md:p-6 lg:p-8">

<!-- Responsive grid -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

<!-- Custom colors -->
<button class="bg-primary text-white">
```

### Custom Colors Available

- `bg-primary` - #0066FF (Blue)
- `bg-cream` - #F5F1ED (Cream background)
- `bg-dark` - #1A1A1A (Dark/footer)

### Mobile-First Breakpoints

```
default: mobile (0-639px)
sm: 640px+
md: 768px+
lg: 1024px+
xl: 1280px+
```

## 🖼️ Adding Images

### Method 1: Public Folder (Recommended for static images)

1. Put image in `public/images/`:
```bash
public/
└── images/
    └── hero-bg.jpg
```

2. Reference in code:
```astro
<img src="/images/hero-bg.jpg" alt="Hero" />
```

### Method 2: External URLs (Current method)

Using Unsplash placeholders (sudah diimplementasikan):
```astro
<Hero
  backgroundImage="https://images.unsplash.com/photo-..."
/>
```

**Note:** Ganti dengan real images saat production!

## 🎯 Common Tasks

### 1. Update Navigation Menu

**File:** `src/components/common/Header.astro`

```astro
const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  // Add more items here
];
```

### 2. Update Footer Content

**File:** `src/components/common/Footer.astro`

Cari section yang ingin diubah:
- About text
- Quick links
- Services
- Contact info
- Social media

### 3. Update Stats Numbers

**File:** `src/components/home/Stats.astro`

```astro
const stats: Stat[] = [
  {
    number: '500+',  // Change this
    label: 'Proyek Selesai',
    description: '...'
  },
  // ...
];
```

### 4. Update Services

**File:** `src/components/home/ServicesGrid.astro`

```astro
const services: Service[] = [
  {
    title: 'Desain Interior',
    description: '...',
    icon: 'interior'
  },
  // Add more services
];
```

### 5. Add Projects (temporary before Strapi)

**File:** `src/pages/index.astro`

```astro
const featuredProjects = [
  {
    title: 'Your Project',
    image: '/images/project.jpg',
    category: 'Residential',
    href: '/projects/your-project'
  },
  // Add more
];
```

## 🔧 Component Usage Examples

### Using Button Component

```astro
---
import Button from '../components/common/Button.astro';
---

<!-- Primary button -->
<Button href="/contact" variant="primary" size="lg">
  Get Started
</Button>

<!-- Outline button -->
<Button href="/projects" variant="outline">
  View Projects
</Button>

<!-- As regular button (no href) -->
<Button variant="secondary">
  Submit
</Button>
```

### Using Hero Component

```astro
---
import Hero from '../components/home/Hero.astro';
---

<Hero
  title="Your Custom Title"
  subtitle="Your subtitle here"
  backgroundImage="/images/custom-bg.jpg"
/>
```

### Using ProjectShowcase

```astro
---
import ProjectShowcase from '../components/home/ProjectShowcase.astro';

const projects = [
  // ... your projects
];
---

<ProjectShowcase
  title="Featured Projects"
  projects={projects}
  columns={4}  <!-- 2, 3, or 4 -->
/>
```

## 📱 Testing Responsive Design

### Browser DevTools

1. Open Chrome DevTools (F12)
2. Click "Toggle Device Toolbar" (Cmd+Shift+M on Mac)
3. Test these sizes:
   - iPhone SE: 375px
   - iPad: 768px
   - Desktop: 1440px

### Check These Elements:

- [ ] Mobile menu works (hamburger)
- [ ] All text is readable
- [ ] Images fit properly
- [ ] Buttons have good touch targets (min 44x44px)
- [ ] Grid layouts stack correctly
- [ ] Footer columns stack on mobile

## 🐛 Common Issues & Solutions

### Issue: Styles not applying

**Solution:** Make sure `global.css` is imported in BaseLayout:
```astro
---
import '../styles/global.css';
---
```

### Issue: Component not found

**Solution:** Check import path relative to current file:
```astro
// From pages/index.astro
import Header from '../components/common/Header.astro';

// From components/home/Hero.astro
import Button from '../common/Button.astro';
```

### Issue: Images not showing

**Solution:**
- If in `public/`: path should start with `/`
- Example: `/images/hero.jpg` NOT `./images/hero.jpg`

### Issue: Tailwind classes not working

**Solution:** Check that file is included in Tailwind content config:
```js
// tailwind.config.cjs should include:
content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}']
```

## 🚀 Deploy to Production

### Build

```bash
npm run build
```

Output akan ada di folder `dist/`

### Deploy to Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow prompts untuk setup

### Deploy to Netlify

1. Build project:
```bash
npm run build
```

2. Drag & drop folder `dist/` ke Netlify dashboard

OR

3. Connect GitHub repo di Netlify dashboard
   - Build command: `npm run build`
   - Publish directory: `dist`

## 📚 Documentation Files

- **FRONTEND-README.md** - Complete frontend overview
- **COMPONENTS-GUIDE.md** - Detailed component documentation
- **QUICK-START.md** - This file (quick reference)

## 🔗 Useful Links

- [Astro Docs](https://docs.astro.build)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Design Analysis](../DESIGN-ANALYSIS.md)
- [Architecture](../ARCHITECTURE-UPDATED.md)

---

## 🎯 Next Steps

1. ✅ Frontend sudah ready
2. ⬜ Setup Strapi CMS (backend)
3. ⬜ Connect frontend dengan Strapi API
4. ⬜ Add real project images
5. ⬜ Create additional pages (About, Services, Contact)
6. ⬜ Setup form handling untuk Contact page
7. ⬜ Add scroll animations
8. ⬜ Deploy to production

---

**Happy coding! 🚀**

Jika ada pertanyaan atau butuh help, refer ke COMPONENTS-GUIDE.md untuk detailed documentation.
