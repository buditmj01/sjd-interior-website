# Adding Video Background to Hero Section

## Option 1: Download Free Interior Design Videos

You can download free high-quality interior design videos from these sources:

### Pexels
1. Visit [Pexels Videos](https://www.pexels.com/search/videos/interior%20design/)
2. Search for "interior design", "modern home", or "luxury interior"
3. Download your preferred video (recommend 1920x1080 or higher)
4. Save as `frontend/public/images/hero-video.mp4`

### Coverr
1. Visit [Coverr](https://coverr.co/)
2. Search for "interior" or "architecture"
3. Download the video
4. Save as `frontend/public/images/hero-video.mp4`

### Pixabay
1. Visit [Pixabay Videos](https://pixabay.com/videos/search/interior/)
2. Search for "interior design"
3. Download free video
4. Save as `frontend/public/images/hero-video.mp4`

## Option 2: Enable Video in Hero Component

Once you have your video file:

1. Add the video to `frontend/public/images/hero-video.mp4`
2. Open `frontend/src/components/home/Hero.astro`
3. Uncomment the `<video>` tag in the file
4. The video will autoplay on loop with mute

## Video Recommendations

- **Resolution**: 1920x1080 (Full HD) minimum
- **Duration**: 10-30 seconds (will loop)
- **Format**: MP4 (H.264 codec for best compatibility)
- **File Size**: Keep under 10MB for fast loading
- **Content**: Modern interior, living room, or architectural walkthrough

## Current Setup

The hero section currently uses a high-quality static image as fallback. The video layer is commented out and ready to be enabled when you add your video file.