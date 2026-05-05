import type { Metadata } from 'next';
import { Home } from '../views/Home';
import { SEO_KEYWORDS, SITE_DESCRIPTION, SITE_NAME } from '../lib/site';

export const metadata: Metadata = {
  title: `Accueil | ${SITE_NAME}`,
  description: SITE_DESCRIPTION,
  keywords: [...SEO_KEYWORDS, 'accueil merlin cameroun', 'fournisseur matériaux kribi'],
  alternates: {
    canonical: '/',
  },
};

export default function Page() {
  return <Home />;
}
