# Hero Banner Setup Guide

The Hero Banner single type has been created in Strapi CMS. Follow these steps to configure it:

## 1. Enable Public Permissions

1. Go to Strapi Admin: http://localhost:1337/admin
2. Navigate to **Settings** → **Users & Permissions Plugin** → **Roles**
3. Click on **Public** role
4. Scroll down to find **Hero-banner** section
5. Check the **find** permission checkbox
6. Click **Save** at the top right

## 2. Create Hero Banner Content

1. Navigate to **Content Manager** → **Hero Banner** (Single Type)
2. Fill in the following fields:

### Required Fields:
- **Headline**: Main hero text (e.g., "Wujudkan ruang impian dengan desain interior yang personal dan fungsional.")
- **Background Type**: Choose either "image" or "video"

### Optional Fields:
- **Subheadline**: Secondary text below the headline
- **Background Image**: Upload an image (shown when background_type is "image")
- **Background Video**: Upload a video file (shown when background_type is "video")
- **Video Poster**: Upload a poster image for the video (thumbnail shown before video loads)

## 3. Upload Media

### For Image Background:
1. Set **Background Type** to "image"
2. Click **Add Media** in the **Background Image** field
3. Upload your hero image (recommended: 1920x1080px or larger, JPG/PNG)

### For Video Background:
1. Set **Background Type** to "video"
2. Click **Add Media** in the **Background Video** field
3. Upload your video file (recommended: MP4 format, max 50MB)
4. Optionally upload a **Video Poster** image

## 4. Save and Preview

1. Click **Save** button in the top right
2. Go to your frontend homepage to see the changes: http://localhost:4321

## Field Descriptions:

| Field | Type | Description |
|-------|------|-------------|
| **headline** | Text | Main hero headline displayed in large text |
| **subheadline** | Text | Supporting text below the headline (optional) |
| **background_type** | Enum | Choose "image" or "video" for the background |
| **background_image** | Media | Hero background image (used when background_type = "image") |
| **background_video** | Media | Hero background video (used when background_type = "video") |
| **video_poster** | Media | Thumbnail image shown before video loads (optional) |

## Tips:

- For best results, use high-quality images (1920x1080px or larger)
- Keep video files under 50MB for faster loading
- Use WebM or MP4 format for videos
- The dark gradient overlay is automatically applied for text readability
- Test on mobile devices to ensure text is readable

## Default Values:

If Strapi data is unavailable, the frontend will use these fallback values:
- **Headline**: "Wujudkan ruang impian dengan desain interior yang personal dan fungsional."
- **Subheadline**: "Kami hadir untuk mewujudkan ruang impian Anda dengan desain interior yang tidak hanya indah, tetapi juga mencerminkan kepribadian dan gaya hidup Anda."
- **Background**: Default Unsplash image

## Troubleshooting:

**Hero not updating on frontend?**
1. Check that public permissions are enabled for hero-banner API
2. Make sure you clicked "Save" in the Strapi admin
3. Hard refresh the frontend page (Cmd+Shift+R or Ctrl+Shift+R)
4. Check browser console for any errors

**Video not playing?**
1. Ensure the video file is MP4 format
2. Check the file size (should be under 50MB)
3. Try adding a video poster image
4. Check that background_type is set to "video"
