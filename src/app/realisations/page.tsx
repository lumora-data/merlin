import type { Metadata } from 'next';
import { RealizationsPage } from '../../views/Realizations';
import { SITE_NAME } from '../../lib/site';

export const metadata: Metadata = {
  title: `Réalisations | ${SITE_NAME}`,
  description:
    'Découvrez les réalisations MERLIN Cameroun: projets de construction et interventions techniques menées à Kribi et environs.',
  keywords: ['réalisations merlin cameroun', 'projets construction kribi', 'chantiers merlin'],
  alternates: {
    canonical: '/realisations',
  },
};

export default function Page() {
  return <RealizationsPage />;
}
