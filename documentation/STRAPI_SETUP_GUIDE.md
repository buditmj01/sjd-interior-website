# Strapi CMS Setup Guide

## Current Status

✅ **Cleaned up collections** - Only keeping:
- **Projects** (Portfolio)
- **Insights** (Blog posts)
- **Site Settings** (Logos, contact info)

✅ **Sample data created**:
- 6 sample projects (portfolio items)
- 4 sample insights (blog articles)

## Next Steps: Configure API Permissions

The frontend needs public access to view projects and insights. Follow these steps:

### 1. Access Strapi Admin
Open your browser and go to: http://localhost:1337/admin

Login with:
- Email: `sjdstudiodesain@gmail.com`
- Password: `YourNewPassword123`

### 2. Configure Public Permissions

1. In the sidebar, click **Settings** (gear icon at the bottom)
2. Under "USERS & PERMISSIONS PLUGIN", click **Roles**
3. Click on **Public** role
4. Scroll down and expand the following sections:

#### Project
- ☑️ Enable `find`
- ☑️ Enable `findOne`

#### Insight
- ☑️ Enable `find`
- ☑️ Enable `findOne`

#### Site-setting
- ☑️ Enable `find`

5. Click **Save** button at the top right

### 3. Test the API

After saving, test if the API is working:

```bash
# Test projects
curl http://localhost:1337/api/projects

# Test insights
curl http://localhost:1337/api/insights

# Test site settings
curl http://localhost:1337/api/site-setting
```

All should return data (not errors).

## Managing Content

### Add New Project (Portfolio Item)

1. Go to **Content Manager** > **Project**
2. Click **Create new entry**
3. Fill in the required fields:
   - **Title**: Project name
   - **Category**: residential/commercial/office/etc
   - **Description**: Short description
   - **Content**: Full project description (rich text)
   - **Featured Image**: Main project image
   - **Gallery**: Additional images
   - **Location**: Project location
   - **Area Size**: e.g., "85m²"
   - **Completion Date**: When project was finished
4. Click **Save** then **Publish**

### Add New Insight (Blog Post)

1. Go to **Content Manager** > **Insight**
2. Click **Create new entry**
3. Fill in the required fields:
   - **Title**: Article title
   - **Category**: tips/trends/how-to/etc
   - **Excerpt**: Short summary
   - **Content**: Full article (rich text)
   - **Featured Image**: Main article image
   - **Author**: Author name
   - **Reading Time**: Estimated minutes to read
4. Click **Save** then **Publish**

### Update Logo and Site Settings

1. Go to **Content Manager** > **Site Setting**
2. Click on the existing entry (or create if none)
3. Under **Website Logos**:
   - **Logo**: Dark logo (for white backgrounds)
   - **Logo Light**: White logo (for hero/dark backgrounds)
   - **Footer Logo**: Logo for footer
   - **Favicon**: Browser tab icon
4. Fill in contact info if needed
5. Click **Save** then **Publish**

## Sample Data Included

### Projects (6 items):
1. Modern Minimalist Apartment Jakarta
2. Cozy Scandinavian House Bandung
3. Industrial Loft Office Surabaya
4. Luxury Penthouse Residence
5. Boutique Hotel Lobby Bali
6. Contemporary Cafe & Restaurant

### Insights (4 articles):
1. 10 Tips Memaksimalkan Ruang Kecil ala Apartemen Jepang
2. Tren Interior 2026: Sustainable & Mindful Living
3. Budget Interior: Cantik Tidak Harus Mahal
4. Cara Memilih Warna Cat yang Tepat untuk Setiap Ruangan

## Troubleshooting

### API returns "Forbidden" error
→ Make sure you've enabled public permissions (see step 2 above)

### Frontend shows no data
→ Check that content is **Published** (not just Saved as draft)

### Images not showing
→ Make sure to upload images through Strapi Media Library
