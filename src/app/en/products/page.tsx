import type { Metadata } from 'next';
import { ProductsPage } from '../../../views/Products';
import { PRODUCT_FAMILIES } from '../../../constants';
import { SITE_NAME } from '../../../lib/site';
import { localizeProductFamilies } from '../../../lib/localized-content';

const productKeywords = localizeProductFamilies(PRODUCT_FAMILIES, 'en').map((family) => family.title.toLowerCase());

export const metadata: Metadata = {
  title: `Products | ${SITE_NAME}`,
  description:
    'MERLIN Cameroun product catalog: tiles, sanitary products, cement, tools, hardware, welding equipment, pumps and more.',
  keywords: [...productKeywords, 'building materials catalog cameroon', 'hardware and tools kribi'],
  alternates: {
    canonical: '/en/products',
  },
};

export default function EnProductsPage() {
  return <ProductsPage locale="en" />;
}
