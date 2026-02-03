/**
 * Fetch navigation data from Strapi
 */

const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL || 'http://localhost:1337';

export async function getNavigation() {
  try {
    const response = await fetch(`${STRAPI_URL}/api/navigation?populate=*`);

    if (!response.ok) {
      console.error('Failed to fetch navigation:', response.statusText);
      return null;
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching navigation:', error);
    return null;
  }
}
