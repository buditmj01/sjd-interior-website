# Author Collection Type - Setup Complete ✅

## What Was Created

A new **Author** collection type has been added to manage blog post writers.

### Author Fields:
- **Name** (required) - Author's full name
- **Job** (required) - Author's job title/position
- **Bio** (optional) - Author biography/profile summary
- **Photo** (optional) - Author profile photo
- **Email** (optional) - Author's email address

### Integration:
- The **Insight** collection now has a **relation** to Author
- Instead of text field, you can now select an author from the Author collection
- Author information displays on the insight detail page with:
  - Name
  - Job title
  - Bio
  - Photo (if uploaded)

## How to Use

### 1. Create Authors

1. Go to: http://localhost:1337/admin
2. Navigate to **Content Manager** > **Author**
3. Click **Create new entry**
4. Fill in:
   - **Name**: e.g., "Sarah Wijaya"
   - **Job**: e.g., "Interior Designer"
   - **Bio**: Short profile about the author
   - **Photo** (optional): Upload author profile picture
   - **Email** (optional): Author's contact email
5. Click **Save**

### 2. Assign Author to Insight Post

1. Go to **Content Manager** > **Insight**
2. Click on an insight to edit (or create new)
3. In the **Author** field, you'll now see a dropdown
4. Select the author from the list
5. Click **Save** and **Publish**

## Sample Authors Included

4 sample authors are ready to use:
1. **Sarah Wijaya** - Interior Designer
2. **Michael Chen** - Design Consultant
3. **Dina Putri** - Budget Interior Specialist
4. **Rina Kusuma** - Color Consultant

**Note:** Sample authors will be created automatically when you restart Strapi with `SEED_DATA=true`

## Frontend Display

On the insight detail page, the author section now shows:
- Author profile photo (or placeholder icon if no photo)
- "Tentang Penulis" heading
- Author name
- Author job title
- Author bio

## API Access

The Author API is publicly accessible:
- **List authors**: `GET /api/authors`
- **Get single author**: `GET /api/authors/:id`

## Migration Note

Existing insight posts still have the old text-based author field. You need to:
1. Create the authors in the Author collection
2. Edit each insight post
3. Select the appropriate author from the dropdown
4. Save and publish

The old text field has been replaced with a relation, so you must select an author from the list.

## Next Steps

1. ✅ Create your team of authors
2. ✅ Upload author photos (optional but recommended)
3. ✅ Assign authors to existing insights
4. ✅ New insights will have author selection dropdown

Happy writing! 🎉
