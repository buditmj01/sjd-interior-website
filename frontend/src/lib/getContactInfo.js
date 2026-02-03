/**
 * Get Contact Information from Strapi CMS
 */

const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL || 'http://localhost:1337';

export async function getContactInfo() {
  try {
    const response = await fetch(`${STRAPI_URL}/api/contact-info`);

    if (!response.ok) {
      console.warn('Failed to fetch contact info from Strapi:', response.statusText);
      return null;
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching contact info:', error);
    return null;
  }
}
