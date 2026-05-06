import type { Metadata } from 'next';
import { RealizationsPage } from '../../../views/Realizations';
import { SITE_NAME } from '../../../lib/site';

export const metadata: Metadata = {
  title: `Projects | ${SITE_NAME}`,
  description:
    'Discover MERLIN Cameroun projects: construction works and technical interventions carried out in Kribi and surrounding areas.',
  keywords: ['merlin cameroon projects', 'construction projects kribi', 'merlin worksites'],
  alternates: {
    canonical: '/en/realizations',
  },
};

export default function EnRealizationsPage() {
  return <RealizationsPage locale="en" />;
}
