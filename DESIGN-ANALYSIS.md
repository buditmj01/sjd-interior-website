# SJD Interior Design - Design Analysis from Figma Mockup

## Home Page Structure Analysis

Based on the Figma mockup (Home.png), here's a detailed breakdown of the website structure:

---

## 1. HEADER / NAVIGATION

### Components:
- **Logo**: "SJD Interior" (top left)
- **Navigation Menu** (horizontal, top right):
  - Home
  - About Us
  - Our Work
  - Services
  - Contact
- **CTA Button**: "Get Started" (primary blue button)

### Design Notes:
- Clean, minimal header
- Dark text on light background
- Fixed/sticky navigation (appears to be)

---

## 2. HERO SECTION

### Layout:
- **Full-width hero** with background image (modern living room)
- **Headline** (left-aligned):
  ```
  Be the next
  Your Design.
  ```
- **Subheadline/Description** (Indonesian language):
  ```
  SJD Interior adalah solusi desain lengkap
  personal dari Rumah, apartemen dan lainnya
  ```
- **CTA Button**: "Get Started" (primary blue)

### Design Elements:
- Large, bold typography
- Background image: Modern, bright living space
- Text overlay with good contrast
- Single primary CTA

---

## 3. PROJECT SHOWCASE / GALLERY

### Layout:
- **4-column grid** of project images
- Equal-sized thumbnail cards
- Clean spacing between items

### Projects Shown:
- Various interior spaces (living rooms, kitchens, bedrooms)
- Professional photography
- Consistent aspect ratio

### Interaction:
- Likely clickable to project detail pages
- Hover effects (to be implemented)

---

## 4. STATS / CREDENTIALS SECTION

### Content (4 columns):
1. **500+**
   - Rumah, Apartement, Kantor Kami Bisa
   - (Houses, Apartments, Offices We Can Do)

2. **12+**
   - Pengalaman
   - (Years of Experience)

3. **98%**
   - Client Satisfaction
   - (98% client satisfaction rate)

4. **25+**
   - Awards
   - (25+ Awards)

### Design:
- Light beige/cream background
- Large numbers (bold)
- Supporting text below
- 4-column grid layout

---

## 5. FEATURED PROJECTS SECTION

### Layout:
- **2-column grid**
- Left: Light-colored interior (bedroom/living space)
- Right: Dark, dramatic interior (appears to be a kitchen or lounge)

### Text Overlay:
- Project titles/descriptions
- Appears to have "Apakah masih renting 6 JG tahun?" text

### Design Notes:
- High-quality photography
- Contrast between light and dark spaces
- Likely linked to project details

---

## 6. SERVICES/PROCESS SECTION

### Content:
- White background
- Appears to show services or process steps
- Clean, minimal design

---

## 7. ANOTHER PROJECT SHOWCASE

### Layout:
- Large featured image (modern kitchen with orange floor)
- Additional smaller images below
- Text: "Eksplorasi rumah impian dalam impian nyaman"
  (Explore dream homes in comfortable dreams)

### Design:
- Bold, vibrant imagery
- Orange/terracotta flooring prominent
- Modern, open-plan kitchen

---

## 8. SERVICES GRID

### Layout:
- **4-icon grid** with services
- Icons appear to represent:
  - Interior design
  - Architecture/planning
  - Consultation
  - Another service (unclear from mockup)

### Design:
- Icons with labels
- Clean, minimal presentation
- Equal spacing

---

## 9. PROJECT GALLERY CAROUSEL/GRID

### Content:
- Multiple project images
- Appears to be clickable/interactive
- Text: "Heres We Work about"

### Layout:
- Grid or carousel format
- Professional interior photography

---

## 10. CALL-TO-ACTION SECTION

### Content:
- "Temukan di Bagian"
  "Desain rumah"
  (Find in the Design House Section)
- **CTA Button**: "Get Started" (blue)

### Design:
- Clean background
- Centered text
- Single primary action

---

## 11. LATEST PROJECTS SECTION

### Layout:
- **4-column grid**
- Project thumbnails with modern architecture
- Exterior shot of modern house visible
- Interior shots below

### Design:
- Consistent card design
- Equal-sized images
- Professional photography

---

## 12. FOOTER

### Layout:
- **Dark background** (appears black/dark gray)
- **4-column layout**:

#### Column 1: About/Logo
- SJD Interior branding
- Brief description

#### Column 2: Quick Links
- Navigation links
- Services links

#### Column 3: Contact Info
- Address
- Phone
- Email

#### Column 4: Social Media
- Social media icons/links

### Design:
- White text on dark background
- Organized column structure
- Social media integration

---

## Color Scheme

### Primary Colors:
- **Blue**: Primary CTA buttons (#0066FF or similar)
- **White**: Main background
- **Beige/Cream**: Section backgrounds (#F5F1ED or similar)
- **Dark Gray/Black**: Footer, text (#1A1A1A or similar)

### Accent Colors:
- Orange/Terracotta (in imagery)
- Natural wood tones
- Neutral grays

---

## Typography

### Hierarchy:
1. **Hero Headline**: Very large, bold, modern sans-serif
2. **Section Headers**: Large, bold
3. **Body Text**: Medium weight, readable
4. **Stats/Numbers**: Extra bold, large
5. **Descriptions**: Regular weight, smaller

### Font Style:
- Modern sans-serif (possibly Inter, Plus Jakarta Sans, or similar)
- Clean, professional
- Good readability

---

## Image Requirements

### Types Needed:
1. **Hero Background**: Full-width, high-quality interior shots
2. **Project Thumbnails**: Square or 4:3 ratio, consistent sizing
3. **Featured Projects**: Larger format, high detail
4. **Service Icons**: Simple, line-based icons
5. **Client Logos**: If applicable (not visible in mockup)

### Quality:
- Professional photography
- High resolution (at least 1920px wide for hero)
- Consistent color grading
- Natural lighting emphasis

---

## Interactive Elements

### Buttons:
- **Primary CTA**: Blue, rounded corners, white text
- Hover states needed
- Active states needed

### Navigation:
- Hover effects on menu items
- Active page indicator
- Mobile hamburger menu (responsive)

### Project Cards:
- Hover overlay effects
- Click to detail pages
- Possible lightbox/gallery view

### Forms:
- Contact form (not visible but implied)
- Input fields styling
- Submit button

---

## Responsive Design Considerations

### Desktop (1920px+):
- Multi-column layouts (4 columns for projects)
- Full-width hero
- Horizontal navigation

### Tablet (768px - 1024px):
- 2-column grids for projects
- Stacked sections
- Maintain navigation

### Mobile (< 768px):
- Single column
- Hamburger menu
- Stacked stats
- Card-based project display

---

## Content Types for Strapi CMS

Based on the design, we need:

### 1. Projects
- Title
- Description (Indonesian)
- Featured image
- Gallery images (multiple)
- Category/type
- Client (optional)
- Location
- Year/Date
- Is featured flag

### 2. Services
- Title
- Icon (name or upload)
- Description
- Order (for display sequence)

### 3. Stats/Achievements
- Number/Value
- Label
- Description
- Order

### 4. Site Settings
- Logo
- Tagline
- Contact information
- Social media links
- Footer text

### 5. Pages (Single Types)
- Home page hero text
- About section content
- CTA text blocks

---

## Key Features to Implement

### 1. Project Gallery
- Filterable by category
- Masonry or grid layout
- Lightbox for full-size images
- Project detail pages

### 2. Smooth Scrolling
- Anchor links to sections
- Smooth scroll behavior

### 3. Animations
- Fade-in on scroll
- Hover effects on cards
- Button interactions

### 4. Image Optimization
- Lazy loading
- Responsive images
- WebP format
- Blur-up technique

### 5. Internationalization
- Indonesian language (primary)
- English (optional)
- Language switcher

---

## Technical Implementation Notes

### Astro Pages Needed:
```
pages/
├── index.astro          # Home page (this design)
├── about.astro          # About page
├── projects/
│   ├── index.astro      # Projects grid
│   └── [slug].astro     # Project detail
├── services.astro       # Services page
└── contact.astro        # Contact page
```

### Components to Build:
```
components/
├── common/
│   ├── Header.astro         # Navigation
│   ├── Footer.astro         # Footer
│   ├── Button.astro         # CTA buttons
│   └── SEO.astro
├── home/
│   ├── Hero.astro           # Hero section
│   ├── Stats.astro          # 500+, 12+, 98%, 25+ section
│   ├── ProjectGrid.astro    # 4-column project grid
│   ├── FeaturedProjects.astro
│   ├── ServicesGrid.astro   # Services icons
│   └── CTASection.astro     # Call-to-action blocks
└── projects/
    ├── ProjectCard.astro
    ├── ProjectFilter.tsx    # Interactive filtering
    └── ProjectGallery.tsx   # Lightbox gallery
```

---

## Design System

### Spacing:
- Container max-width: 1440px
- Section padding: 80px - 120px vertical
- Grid gap: 24px - 32px
- Card padding: 16px - 24px

### Border Radius:
- Buttons: 8px (rounded-lg)
- Cards: 4px - 8px
- Images: 0px (sharp) or 4px (slight round)

### Shadows:
- Cards: Subtle shadow on hover
- Buttons: None or minimal
- Overall: Clean, flat design

---

## Next Steps

1. ✅ Analyzed home page design
2. ⬜ Create updated architecture based on actual design
3. ⬜ Set up Strapi content types matching requirements
4. ⬜ Build Astro components matching design
5. ⬜ Implement responsive layouts
6. ⬜ Add animations and interactions
7. ⬜ Optimize images and performance
8. ⬜ Test across devices

---

This analysis provides the foundation for building the website exactly as designed in Figma!
