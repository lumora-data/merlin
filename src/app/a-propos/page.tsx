import type { Metadata } from 'next';
import { AboutPage } from '../../views/About';
import { SITE_NAME } from '../../lib/site';

export const metadata: Metadata = {
  title: `À propos | ${SITE_NAME}`,
  description:
    'À propos de MERLIN Cameroun: mission, vision et expertise locale à Kribi dans la construction, la logistique et le commerce général.',
  keywords: ['à propos merlin cameroun', 'entreprise construction kribi', 'merlin cameroun sarl'],
  alternates: {
    canonical: '/a-propos',
  },
};

export default function Page() {
  return <AboutPage />;
}
