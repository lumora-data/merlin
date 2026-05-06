import type { Metadata } from 'next';
import { AboutPage } from '../../../views/About';
import { SITE_NAME } from '../../../lib/site';

export const metadata: Metadata = {
  title: `About | ${SITE_NAME}`,
  description:
    'About MERLIN Cameroun: mission, vision and local expertise in Kribi across construction, logistics, transport and general trading.',
  keywords: ['about merlin cameroon', 'construction company kribi', 'merlin cameroun sarl'],
  alternates: {
    canonical: '/en/about',
  },
};

export default function EnAboutPage() {
  return <AboutPage locale="en" />;
}
