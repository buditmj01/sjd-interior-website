// Fetch site settings from Strapi CMS
const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL || 'http://localhost:1337';

export async function getSiteSettings() {
  try {
    const response = await fetch(`${STRAPI_URL}/api/site-setting?populate=websiteLogos.logo,websiteLogos.logoLight,websiteLogos.footerLogo,websiteLogos.favicon,socialMedia`);

    if (!response.ok) {
      console.warn('Failed to fetch site settings, using defaults');
      return getDefaultSettings();
    }

    const { data } = await response.json();

    if (!data) {
      return getDefaultSettings();
    }

    const logos = data.attributes?.websiteLogos || {};

    return {
      siteName: data.attributes?.siteName || 'SJD Interior Design',
      siteDescription: data.attributes?.siteDescription || 'Professional interior design services',
      contactEmail: data.attributes?.contactEmail || '',
      contactPhone: data.attributes?.contactPhone || '',
      address: data.attributes?.address || '',
      logo: logos.logo?.data ? {
        url: `${STRAPI_URL}${logos.logo.data.attributes.url}`,
        alt: logos.logo.data.attributes.alternativeText || 'Logo',
        width: logos.logo.data.attributes.width,
        height: logos.logo.data.attributes.height,
      } : null,
      logoLight: logos.logoLight?.data ? {
        url: `${STRAPI_URL}${logos.logoLight.data.attributes.url}`,
        alt: logos.logoLight.data.attributes.alternativeText || 'Logo Light',
        width: logos.logoLight.data.attributes.width,
        height: logos.logoLight.data.attributes.height,
      } : null,
      footerLogo: logos.footerLogo?.data ? {
        url: `${STRAPI_URL}${logos.footerLogo.data.attributes.url}`,
        alt: logos.footerLogo.data.attributes.alternativeText || 'Footer Logo',
        width: logos.footerLogo.data.attributes.width,
        height: logos.footerLogo.data.attributes.height,
      } : null,
      favicon: logos.favicon?.data ? {
        url: `${STRAPI_URL}${logos.favicon.data.attributes.url}`,
        type: logos.favicon.data.attributes.mime,
      } : null,
      socialMedia: data.attributes?.socialMedia || {},
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
    contactEmail: '',
    contactPhone: '',
    address: '',
    logo: null,
    logoLight: null,
    footerLogo: null,
    favicon: null,
    socialMedia: {},
  };
}
