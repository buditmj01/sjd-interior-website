const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL || 'http://localhost:1337';

export async function getHeroBanner() {
  try {
    const response = await fetch(`${STRAPI_URL}/api/hero-banner?populate=*`);

    if (!response.ok) {
      throw new Error(`Failed to fetch hero banner: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching hero banner:', error);
    return null;
  }
}

// Helper function to get media URL
export function getMediaUrl(media) {
  if (!media?.data?.attributes?.url) return null;
  const url = media.data.attributes.url;
  return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
}

// Helper function to check if media is video
export function isVideo(media) {
  if (!media?.data?.attributes?.mime) return false;
  return media.data.attributes.mime.startsWith('video/');
}
