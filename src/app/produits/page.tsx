import type { Metadata } from 'next';
import { ProductsPage } from '../../views/Products';
import { PRODUCT_FAMILIES } from '../../constants';
import { SEO_KEYWORDS, SITE_NAME } from '../../lib/site';

const productKeywords = PRODUCT_FAMILIES.map((family) => family.title.toLowerCase());

export const metadata: Metadata = {
  title: `Produits | ${SITE_NAME}`,
  description:
    'Catalogue de produits MERLIN Cameroun: carrelage, sanitaires, ciment, outillages, quincaillerie, soudure de différentes sections pour les ferronniers, pompes et plus.',
  keywords: [...SEO_KEYWORDS, ...productKeywords],
  alternates: {
    canonical: '/produits',
  },
};

export default function Page() {
  return <ProductsPage />;
}
