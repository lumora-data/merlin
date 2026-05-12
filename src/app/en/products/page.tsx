import type { Metadata } from 'next';
import { cache } from 'react';
import { ProductsPage } from '../../../views/Products';
import { SITE_NAME } from '../../../lib/site';
import { localizeProductFamilies } from '../../../lib/localized-content';
import { getContent } from '../../../lib/content/store';
import type { ProductFamily } from '../../../types';

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
  const productKeywords = localizeProductFamilies(products, 'en').map((family) => family.title.toLowerCase());

  return {
    title: `Products | ${SITE_NAME}`,
    description:
      'MERLIN Cameroun product catalog: tiles, sanitary products, cement, tools, hardware, welding equipment, pumps and more.',
    keywords: [...productKeywords, 'building materials catalog cameroon', 'hardware and tools kribi'],
    alternates: {
      canonical: '/en/products',
    },
  };
}

export default async function EnProductsPage() {
  const products = await getProducts();
  return <ProductsPage locale="en" products={products} />;
}
