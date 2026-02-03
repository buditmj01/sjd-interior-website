/**
 * Fetch projects/portfolios from Strapi
 */

const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL || 'http://localhost:1337';

export async function getProjects(options = {}) {
  const {
    limit = 25,
    featured = null,
    sort = 'publishedAt:desc',
    populate = '*'
  } = options;

  try {
    let url = `${STRAPI_URL}/api/projects?`;

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

    const response = await fetch(url);

    if (!response.ok) {
      console.error('Failed to fetch projects:', response.statusText);
      return null;
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return null;
  }
}

export async function getProjectBySlug(slug) {
  try {
    const response = await fetch(`${STRAPI_URL}/api/projects?filters[slug][$eq]=${slug}&populate=*`);

    if (!response.ok) {
      console.error('Failed to fetch project:', response.statusText);
      return null;
    }

    const data = await response.json();
    return data.data && data.data.length > 0 ? data.data[0] : null;
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}
