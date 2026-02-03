// Fetch site settings from Strapi CMS
const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL || 'http://localhost:1337';

export async function getSiteSettings() {
  try {
    const response = await fetch(`${STRAPI_URL}/api/site-setting`);

    if (!response.ok) {
      console.warn('Failed to fetch site settings, using defaults');
      return getDefaultSettings();
    }

    const { data } = await response.json();

    if (!data || !data.attributes) {
      return getDefaultSettings();
    }

    return {
      siteName: data.attributes.siteName || 'SJD Interior Design',
      siteDescription: data.attributes.siteDescription || 'Professional interior design services',
    };
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return getDefaultSettings();
  }
}

function getDefaultSettings() {
  return {
    siteName: 'SJD Interior Design',
    siteDescription: 'Professional interior design services',
  };
}
