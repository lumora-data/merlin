import type { MetadataRoute } from 'next';
import { SITE_URL, STATIC_ROUTES } from '../lib/site';
import { ROUTES } from '../lib/i18n';
import { getContent } from '../lib/content/store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const products = await getContent('products');

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === '/' ? 'daily' : 'weekly',
    priority: route === '/' ? 1 : 0.8,
  }));

  const productEntries: MetadataRoute.Sitemap = products.map((family) => ({
    url: `${SITE_URL}/produits/${family.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const englishStaticRoutes = Object.values(ROUTES.en);
  const englishStaticEntries: MetadataRoute.Sitemap = englishStaticRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === '/en' ? 'daily' : 'weekly',
    priority: route === '/en' ? 0.95 : 0.75,
  }));

  const englishProductEntries: MetadataRoute.Sitemap = products.map((family) => ({
    url: `${SITE_URL}/en/products/${family.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.65,
  }));

  return [...staticEntries, ...productEntries, ...englishStaticEntries, ...englishProductEntries];
}
