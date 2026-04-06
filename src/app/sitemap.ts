import { MetadataRoute } from 'next';
import { sectionsApi, postsApi, eventsApi, djProfilesApi } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://lamanijaofficial.com';

    // Páginas estáticas
    const staticPages: MetadataRoute.Sitemap = [
        { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
        { url: `${baseUrl}/contacto`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    ];

    try {
        // Secciones
        const sections = await sectionsApi.getAll();
        const sectionPages: MetadataRoute.Sitemap = sections
            .filter(s => s.show_in_menu)
            .map(s => ({
                url: `${baseUrl}/section/${s.slug}`,
                lastModified: new Date(s.updated_at),
                changeFrequency: 'weekly' as const,
                priority: 0.8,
            }));

        // Posts de cada sección
        const postPages: MetadataRoute.Sitemap = sections
            .filter(s => s.posts && s.posts.length > 0)
            .flatMap(s => (s.posts || []).map(p => ({
                url: `${baseUrl}/posts/${p.slug}`,
                lastModified: new Date(p.updated_at),
                changeFrequency: 'weekly' as const,
                priority: 0.7,
            })));

        // DJs
        let djPages: MetadataRoute.Sitemap = [];
        try {
            const djs = await djProfilesApi.getFeatured(50);
            djPages = (Array.isArray(djs) ? djs : []).map(dj => ({
                url: `${baseUrl}/dj/${dj.slug}`,
                lastModified: new Date(dj.updated_at),
                changeFrequency: 'weekly' as const,
                priority: 0.6,
            }));
        } catch {}

        return [...staticPages, ...sectionPages, ...postPages, ...djPages];
    } catch {
        return staticPages;
    }
}
