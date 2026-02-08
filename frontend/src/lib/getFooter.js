/**
 * Get Footer data from Strapi CMS
 */

const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL || 'http://localhost:1337';

export async function getFooter() {
  try {
    const url = `${STRAPI_URL}/api/footer?populate=*`;
    console.log('[DEBUG] Fetching footer from:', url);
    const response = await fetch(url);

    if (!response.ok) {
      console.warn('[DEBUG] Failed to fetch footer from Strapi:', response.status, response.statusText);
      return null;
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching footer:', error);
    return null;
  }
}
