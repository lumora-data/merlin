import type { Metadata } from 'next';
import { Home } from '../../views/Home';
import { SEO_KEYWORDS, SITE_NAME } from '../../lib/site';

export const metadata: Metadata = {
  title: `Home | ${SITE_NAME}`,
  description:
    'MERLIN Cameroun SARL in Kribi: construction materials, tools, hardware, welding equipment, pumps and supplies for professionals and individuals.',
  keywords: [...SEO_KEYWORDS, 'merlin cameroon', 'building materials kribi', 'hardware store cameroon'],
  alternates: {
    canonical: '/en',
  },
};

export default function EnHomePage() {
  return <Home locale="en" />;
}
