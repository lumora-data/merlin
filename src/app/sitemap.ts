import type { MetadataRoute } from 'next';
import { PRODUCT_FAMILIES } from '../constants';
import { SITE_URL, STATIC_ROUTES } from '../lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === '/' ? 'daily' : 'weekly',
    priority: route === '/' ? 1 : 0.8,
  }));

  const productEntries: MetadataRoute.Sitemap = PRODUCT_FAMILIES.map((family) => ({
    url: `${SITE_URL}/produits/${family.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticEntries, ...productEntries];
}
