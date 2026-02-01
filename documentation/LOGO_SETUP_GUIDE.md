# How to Upload Logos via Strapi CMS

## ✅ Setup Complete!

Your website is now configured to use dynamic logos from Strapi CMS. You can upload and change:
- **Navigation Logo (Dark)** - appears in header on white background
- **Navigation Logo (Light)** - appears in header on hero banner (transparent background)
- **Footer Logo** - appears in footer
- **Favicon** - browser tab icon

## Step-by-Step Instructions

### 1. Access Strapi Admin

1. Open Strapi admin panel: http://localhost:1337/admin
2. Login with your credentials:
   - Email: `sjdstudiodesain@gmail.com`
   - Password: `YourNewPassword123`

### 2. Find Site Settings

1. In the left sidebar, look for **"Site Setting"** (under Content Manager)
2. Click on **"Site Setting"**
3. You'll see the Site Settings configuration page

### 3. Upload Logos

**Open Website Logos Section:**
1. Find the **"Website Logos"** section (collapsible)
2. Click to expand it - you'll see all logo fields grouped together

**Upload Navigation Logo (Dark Version):**
1. Inside Website Logos section, find the **"Logo"** field
2. Click the **"Add new assets"** button
3. Upload your dark colored logo (PNG, JPG, SVG recommended)
4. Recommended size: 200x80px (or similar aspect ratio)
5. This logo shows when header has white background (after scrolling)
6. Click **"Upload"**

**Upload Navigation Logo (Light Version):**
1. Find the **"Logo Light"** field (for dark backgrounds/hero banner)
2. Click the **"Add new assets"** button
3. Upload your white/light colored logo
4. Same size as dark logo: 200x80px
5. This logo shows on transparent header (hero banner)
6. Click **"Upload"**

**Upload Footer Logo:**
1. Find the **"Footer Logo"** field
2. Click **"Add new assets"** button
3. Upload your footer logo (can be same as main logo or different)
4. Recommended size: 250x100px
5. Click **"Upload"**

**Upload Favicon (Optional):**
1. Find the **"Favicon"** field
2. Click **"Add new assets"** button
3. Upload your favicon (ICO, PNG, or SVG)
4. Recommended sizes: 32x32px or 512x512px PNG/ICO
5. **Note:** If you don't upload a favicon, it will automatically use your Logo (dark version)
6. Click **"Upload"**

### 4. Save Changes

1. Click the **"Save"** button at the top right
2. Wait for the success notification

### 5. Make API Public (IMPORTANT!)

For the logos to appear on your website, you need to make the Site Setting API public:

1. Go to **Settings** (left sidebar, gear icon at bottom)
2. Click **"Users & Permissions Plugin"**
3. Click **"Roles"**
4. Click **"Public"**
5. Scroll down to find **"Site-setting"**
6. Check the box for **"find"** permission
7. Click **"Save"** at the top right

### 6. Refresh Your Website

1. Open your website: http://localhost:4321
2. Refresh the page (Ctrl+R or Cmd+R)
3. Your new logos should now appear!
4. **Test the logo switching:** Scroll down on homepage - logo should change from light to dark version

## Logo Specifications

### Navigation Logo (Dark Version)
- **Format:** PNG, SVG (transparent background recommended)
- **Size:** 200x80px or similar (displays at 64-80px height on screen)
- **Color:** Dark colored logo (black, dark blue, etc.)
- **Usage:** Shown when header has white background (after scrolling)

### Navigation Logo (Light Version)
- **Format:** PNG, SVG (transparent background recommended)
- **Size:** 200x80px or similar (same as dark version)
- **Color:** White or light colored logo
- **Usage:** Shown on transparent header over hero banner

### Footer Logo
- **Format:** PNG, SVG (transparent background for white version)
- **Size:** 250x100px
- **Color:** Light colored logo (footer has dark background)

### Favicon
- **Format:** ICO, PNG, SVG
- **Size:** 32x32px, 512x512px, or scalable SVG
- **Color:** Recognizable at small sizes

## Logo Switching Behavior

The navigation logo automatically switches based on scroll position:

**On Hero Banner (Top of page):**
- Header background: Transparent
- Logo shown: **Light version** (white logo)

**After Scrolling:**
- Header background: White
- Logo shown: **Dark version** (dark logo)

## Additional Fields

The Site Settings also include:

- **Site Name** - Your website name
- **Site Description** - Meta description for SEO
- **Contact Email** - Your business email
- **Contact Phone** - Your phone number
- **Address** - Your business address
- **Social Media** - Links to social profiles

## Fallback Behavior

If no logo is uploaded:
- **Navigation:** Shows "SJD Interior" text logo
- **Logo switching:** If only one logo uploaded, it will be used for both states
- **Footer:** Shows "SJD Interior" text logo
- **Favicon:** Uses default /favicon.svg

## Troubleshooting

**Logos not showing?**
1. Make sure you clicked "Save" in Strapi
2. Check if you enabled Public API permissions
3. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
4. Check browser console for errors (F12)

**Logo not switching on scroll?**
1. Make sure you uploaded BOTH logo versions (Logo and Logo Light)
2. Test on the homepage (logo switching only works on homepage)
3. Clear browser cache

**Images too large?**
- Resize images before uploading
- Recommended max file size: 500KB per image

**Need help?**
- Check Strapi logs: `tail -f cms-dev.log`
- Check frontend logs: `tail -f frontend-dev.log`

## Pro Tips

1. **Use SVG format** for logos when possible - they scale perfectly and have small file sizes
2. **Make logos crisp** - ensure your light logo has enough contrast against dark backgrounds
3. **Test on mobile** - logos are slightly smaller on mobile devices
4. **Brand consistency** - use the same logo design in different colors (light/dark versions)

---

**Last Updated:** February 1, 2026
