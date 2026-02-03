/**
 * Get Website Logos from Strapi CMS
 */

const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL || 'http://localhost:1337';

export async function getWebsiteLogos() {
  try {
    const response = await fetch(`${STRAPI_URL}/api/website-logos?populate[websiteLogos][populate]=*`);

    if (!response.ok) {
      console.warn('Failed to fetch website logos from Strapi:', response.statusText);
      return null;
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching website logos:', error);
    return null;
  }
}
