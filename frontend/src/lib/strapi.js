/**
 * Strapi API Helper
 * Utility functions for fetching data from Strapi CMS
 */

export const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL || 'http://localhost:1337';
export const API_TOKEN = import.meta.env.PUBLIC_STRAPI_TOKEN || '';

/**
 * Get full Strapi URL
 */
export const getStrapiURL = (path = '') => {
  return `${STRAPI_URL}${path}`;
};

/**
 * Get media URL from Strapi
 */
export const getStrapiMedia = (url) => {
  if (url == null) {
    return '';
  }
  if (url.startsWith('http') || url.startsWith('//')) {
    return url;
  }
  return `${STRAPI_URL}${url}`;
};

/**
 * Fetch data from Strapi API
 */
export const fetchAPI = async (endpoint, options = {}) => {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Add authorization header if token exists
  if (API_TOKEN) {
    defaultOptions.headers.Authorization = `Bearer ${API_TOKEN}`;
  }

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  // Add a timeout to the fetch request
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

  try {
    const response = await fetch(getStrapiURL(`/api${endpoint}`), {
      ...mergedOptions,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`Strapi API error: ${response.status} ${response.statusText} for ${endpoint}`);
      // Return empty data structure instead of throwing
      return { data: null };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching from Strapi:', error);
    // Return empty data structure instead of throwing
    return { data: null };
  }
};

/**
 * Fetch projects from Strapi
 */
export const getProjects = async (params = {}) => {
  const queryParams = new URLSearchParams({
    populate: '*',
    'sort[0]': 'order:asc',
    ...params,
  });
  return fetchAPI(`/projects?${queryParams}`);
};

/**
 * Fetch a single project by slug
 */
export const getProjectBySlug = async (slug) => {
  const queryParams = new URLSearchParams({
    'filters[slug][$eq]': slug,
    populate: '*',
  });
  const response = await fetchAPI(`/projects?${queryParams}`);
  return response.data?.[0] || null;
};

/**
 * Fetch featured projects
 */
export const getFeaturedProjects = async (limit = 6) => {
  const queryParams = new URLSearchParams({
    'filters[is_featured][$eq]': 'true',
    populate: '*',
    'sort[0]': 'order:asc',
    'pagination[limit]': limit.toString(),
  });
  return fetchAPI(`/projects?${queryParams}`);
};

/**
 * Fetch services from Strapi
 */
export const getServices = async (params = {}) => {
  const queryParams = new URLSearchParams({
    populate: '*',
    'sort[0]': 'order:asc',
    ...params,
  });
  return fetchAPI(`/services?${queryParams}`);
};

/**
 * Fetch a single service by slug
 */
export const getServiceBySlug = async (slug) => {
  const queryParams = new URLSearchParams({
    'filters[slug][$eq]': slug,
    populate: '*',
  });
  const response = await fetchAPI(`/services?${queryParams}`);
  return response.data?.[0] || null;
};

/**
 * Fetch testimonials from Strapi
 */
export const getTestimonials = async (params = {}) => {
  const queryParams = new URLSearchParams({
    populate: '*',
    'sort[0]': 'order:asc',
    ...params,
  });
  return fetchAPI(`/testimonials?${queryParams}`);
};

/**
 * Fetch featured testimonials
 */
export const getFeaturedTestimonials = async (limit = 6) => {
  const queryParams = new URLSearchParams({
    'filters[is_featured][$eq]': 'true',
    populate: '*',
    'sort[0]': 'order:asc',
    'pagination[limit]': limit.toString(),
  });
  return fetchAPI(`/testimonials?${queryParams}`);
};

/**
 * Fetch team members from Strapi
 */
export const getTeamMembers = async (params = {}) => {
  const queryParams = new URLSearchParams({
    populate: '*',
    'sort[0]': 'order:asc',
    ...params,
  });
  return fetchAPI(`/team-members?${queryParams}`);
};

/**
 * Fetch a single team member by slug
 */
export const getTeamMemberBySlug = async (slug) => {
  const queryParams = new URLSearchParams({
    'filters[slug][$eq]': slug,
    populate: '*',
  });
  const response = await fetchAPI(`/team-members?${queryParams}`);
  return response.data?.[0] || null;
};

/**
 * Fetch a page by slug
 */
export const getPageBySlug = async (slug) => {
  const queryParams = new URLSearchParams({
    'filters[slug][$eq]': slug,
    populate: '*',
  });
  const response = await fetchAPI(`/pages?${queryParams}`);
  return response.data?.[0] || null;
};

/**
 * Helper to extract image URL from Strapi media object
 */
export const getImageUrl = (media, size = 'medium') => {
  if (!media?.data?.attributes) {
    return null;
  }

  const { url, formats } = media.data.attributes;

  // Try to get the requested size, fallback to original
  if (formats && formats[size]) {
    return getStrapiMedia(formats[size].url);
  }

  return getStrapiMedia(url);
};

/**
 * Helper to extract multiple images from Strapi media array
 */
export const getGalleryUrls = (media, size = 'medium') => {
  if (!media?.data || !Array.isArray(media.data)) {
    return [];
  }

  return media.data.map((item) => {
    const { url, formats } = item.attributes;

    if (formats && formats[size]) {
      return getStrapiMedia(formats[size].url);
    }

    return getStrapiMedia(url);
  });
};

/**
 * Fetch insights/articles from Strapi
 */
export const getInsights = async (params = {}) => {
  const queryParams = new URLSearchParams({
    'populate[author][populate][0]': 'photo',
    'populate[featured_image][populate]': '*',
    'sort[0]': 'createdAt:desc',
    ...params,
  });
  return fetchAPI(`/insights?${queryParams}`);
};

/**
 * Fetch a single insight by slug
 */
export const getInsightBySlug = async (slug) => {
  const queryParams = new URLSearchParams({
    'filters[slug][$eq]': slug,
    'populate[author][populate][0]': 'photo',
    'populate[featured_image][populate]': '*',
    'populate[gallery][populate]': '*',
  });
  const response = await fetchAPI(`/insights?${queryParams}`);
  return response.data?.[0] || null;
};

/**
 * Fetch featured insights
 */
export const getFeaturedInsights = async (limit = 6) => {
  const queryParams = new URLSearchParams({
    'filters[is_featured][$eq]': 'true',
    populate: '*',
    'sort[0]': 'order:asc',
    'pagination[limit]': limit.toString(),
  });
  return fetchAPI(`/insights?${queryParams}`);
};

/**
 * Fetch insights by category
 */
export const getInsightsByCategory = async (category, limit = 10) => {
  const queryParams = new URLSearchParams({
    'filters[category][$eq]': category,
    populate: '*',
    'sort[0]': 'createdAt:desc',
    'pagination[limit]': limit.toString(),
  });
  return fetchAPI(`/insights?${queryParams}`);
};

/**
 * Fetch portfolio categories from Strapi
 */
export const getPortfolioCategories = async () => {
  try {
    const queryParams = new URLSearchParams({
      'sort[0]': 'order:asc',
    });
    const response = await fetchAPI(`/portfolio-categories?${queryParams}`);
    return response.data || [];
  } catch (error) {
    console.error('Error fetching portfolio categories:', error);
    return [];
  }
};

/**
 * Fetch workflow hero section data from Strapi
 */
export const getWorkflowHero = async () => {
  try {
    const queryParams = new URLSearchParams({
      'populate[video][populate]': '*',
      'populate[poster_image][populate]': '*',
    });
    const response = await fetchAPI(`/workflow-hero?${queryParams}`);
    return response.data || null;
  } catch (error) {
    console.error('Error fetching workflow hero:', error);
    return null;
  }
};

/**
 * Fetch a single author by ID
 */
export const getAuthorById = async (id) => {
  const queryParams = new URLSearchParams({
    populate: 'photo',
  });
  const response = await fetchAPI(`/authors/${id}?${queryParams}`);
  return response.data;
};
