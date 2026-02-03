/**
 * Get Stats from Strapi CMS
 */

const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL || 'http://localhost:1337';

export async function getStats() {
  try {
    const response = await fetch(`${STRAPI_URL}/api/stats?populate=*`);

    if (!response.ok) {
      console.warn('Failed to fetch stats from Strapi:', response.statusText);
      return null;
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching stats:', error);
    return null;
  }
}
