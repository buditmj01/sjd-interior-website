/**
 * Fetch insights/articles from Strapi
 */

const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL || 'http://localhost:1337';

export async function getInsights(options = {}) {
  const {
    limit = 25,
    featured = null,
    sort = 'publishedAt:desc',
    populate = 'author.photo,featured_image',
    excludeSlug = null
  } = options;

  try {
    let url = `${STRAPI_URL}/api/insights?`;

    if (populate) {
      url += `populate=${populate}&`;
    }
    if (limit) {
      url += `pagination[limit]=${limit}&`;
    }
    if (sort) {
      url += `sort=${sort}&`;
    }
    if (featured !== null) {
      url += `filters[is_featured][$eq]=${featured}&`;
    }
    if (excludeSlug) {
      url += `filters[slug][$ne]=${excludeSlug}&`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      console.error('Failed to fetch insights:', response.statusText);
      return null;
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching insights:', error);
    return null;
  }
}

export async function getInsightBySlug(slug) {
  try {
    // Explicitly populate author.photo to ensure it's included
    const response = await fetch(
      `${STRAPI_URL}/api/insights?filters[slug][$eq]=${slug}&populate[author][populate][0]=photo&populate[featured_image][populate]=*&populate[gallery][populate]=*`
    );

    if (!response.ok) {
      console.error('Failed to fetch insight:', response.statusText);
      return null;
    }

    const data = await response.json();
    return data.data && data.data.length > 0 ? data.data[0] : null;
  } catch (error) {
    console.error('Error fetching insight:', error);
    return null;
  }
}
