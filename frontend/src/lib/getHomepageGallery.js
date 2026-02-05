import { fetchAPI, getStrapiMedia } from './strapi.js';

/**
 * Fetch homepage gallery data from Strapi
 * @returns {Promise<Object|null>} Gallery data with slides
 */
export async function getHomepageGallery() {
  try {
    const queryParams = new URLSearchParams({
      'populate[slides][populate][0]': 'image',
    });
    const response = await fetchAPI(`/homepage-gallery?${queryParams}`);

    if (!response?.data) {
      return null;
    }

    const attrs = response.data.attributes;

    // Transform slides with proper image URLs
    const slides = (attrs.slides || []).map((slide) => ({
      image: slide.image?.data ? getStrapiMedia(slide.image.data.attributes.url) : null,
      title: slide.title || '',
      subtitle: slide.subtitle || '',
      linkUrl: slide.link_url || '',
      linkText: slide.link_text || 'Lihat Detail'
    })).filter(slide => slide.image); // Only include slides with images

    return {
      sectionTitle: attrs.section_title || 'Inspirasi Desain',
      sectionSubtitle: attrs.section_subtitle || '',
      isVisible: attrs.is_visible !== false,
      autoplay: attrs.autoplay !== false,
      autoplayInterval: attrs.autoplay_interval || 5000,
      slides
    };
  } catch (error) {
    console.error('Error fetching homepage gallery:', error);
    return null;
  }
}
