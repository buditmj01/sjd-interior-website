/**
 * Get FAQs from Strapi CMS
 */

const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL || 'http://localhost:1337';

export async function getFaqs() {
  try {
    const response = await fetch(`${STRAPI_URL}/api/faqs?sort=id:asc`);

    if (!response.ok) {
      console.warn('Failed to fetch FAQs from Strapi:', response.statusText);
      return null;
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return null;
  }
}
