import type { Metadata } from 'next';
import { cache } from 'react';
import { ProductsPage } from '../../views/Products';
import { SEO_KEYWORDS, SITE_NAME } from '../../lib/site';
import { getContent } from '../../lib/content/store';
import type { ProductFamily } from '../../types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const normalizeProducts = (products: ProductFamily[]): ProductFamily[] =>
  products.map((product) => ({
    ...product,
    images: product.images.map((image) => encodeURI(image)),
  }));

const getProducts = cache(async (): Promise<ProductFamily[]> => normalizeProducts(await getContent('products')));

export async function generateMetadata(): Promise<Metadata> {
  const products = await getProducts();
  const productKeywords = products.map((family) => family.title.toLowerCase());

  return {
    title: `Produits | ${SITE_NAME}`,
    description:
      'Catalogue de produits MERLIN Cameroun: carrelage, sanitaires, ciment, outillages, quincaillerie, matériel de soudure, soudure, pompes et plus.',
    keywords: [...SEO_KEYWORDS, ...productKeywords],
    alternates: {
      canonical: '/produits',
    },
  };
}

export default async function Page() {
  const products = await getProducts();
  return <ProductsPage products={products} />;
}
