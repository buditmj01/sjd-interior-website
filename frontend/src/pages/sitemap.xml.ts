import type { APIRoute } from 'astro';
import { fetchAPI } from '../lib/strapi';

export const GET: APIRoute = async () => {
    const siteUrl = 'https://sjdinterior.com';

    // Static pages with priorities
    const staticPages = [
        { url: '/', priority: '1.0', changefreq: 'weekly' },
        { url: '/portfolio/', priority: '0.9', changefreq: 'weekly' },
        { url: '/insight/', priority: '0.9', changefreq: 'daily' },
        { url: '/alur-kerja/', priority: '0.7', changefreq: 'monthly' },
        { url: '/hubungi-kami/', priority: '0.7', changefreq: 'monthly' },
    ];

    // Fetch all published insights from Strapi
    let insightUrls: { url: string; lastmod: string; priority: string; changefreq: string }[] = [];
    try {
        const insightsResponse = await fetchAPI('/insights', {
            'pagination[limit]': '100',
            'fields[0]': 'slug',
            'fields[1]': 'updatedAt',
            'sort[0]': 'publishedAt:desc',
        });

        if (insightsResponse?.data) {
            insightUrls = insightsResponse.data.map((item: any) => ({
                url: `/insight/${item.attributes.slug}/`,
                lastmod: item.attributes.updatedAt?.split('T')[0] || new Date().toISOString().split('T')[0],
                priority: '0.8',
                changefreq: 'monthly',
            }));
        }
    } catch (e) {
        console.warn('Sitemap: Failed to fetch insights', e);
    }

    // Fetch all published projects from Strapi
    let projectUrls: { url: string; lastmod: string; priority: string; changefreq: string }[] = [];
    try {
        const projectsResponse = await fetchAPI('/projects', {
            'pagination[limit]': '100',
            'fields[0]': 'slug',
            'fields[1]': 'updatedAt',
            'sort[0]': 'createdAt:desc',
        });

        if (projectsResponse?.data) {
            projectUrls = projectsResponse.data.map((item: any) => ({
                url: `/portfolio/${item.attributes.slug}/`,
                lastmod: item.attributes.updatedAt?.split('T')[0] || new Date().toISOString().split('T')[0],
                priority: '0.8',
                changefreq: 'monthly',
            }));
        }
    } catch (e) {
        console.warn('Sitemap: Failed to fetch projects', e);
    }

    // Combine all URLs
    const allUrls = [
        ...staticPages.map(p => ({
            ...p,
            lastmod: new Date().toISOString().split('T')[0],
        })),
        ...insightUrls,
        ...projectUrls,
    ];

    // Generate XML
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allUrls
            .map(
                (entry) => `  <url>
    <loc>${siteUrl}${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
            )
            .join('\n')}
</urlset>`;

    return new Response(xml, {
        status: 200,
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
        },
    });
};
