import type { Metadata } from 'next';
import { AgenciesPage } from '../../views/Agencies';
import { AGENCIES } from '../../constants';
import { SITE_NAME } from '../../lib/site';

export const metadata: Metadata = {
  title: `Agences | ${SITE_NAME}`,
  description:
    'Retrouvez les agences MERLIN Cameroun à Kribi: Dombe, Bossigui, Mpangou et Bilolo. Contactez rapidement le point de service le plus proche.',
  keywords: ['agences merlin cameroun', 'merlin bossigui', 'merlin dombe', 'merlin mpangou', 'merlin bilolo'],
  alternates: {
    canonical: '/agences',
  },
};

export default function Page() {
  const agencyListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Agences MERLIN Cameroun',
    itemListElement: AGENCIES.map((agency, index) => ({
      '@type': 'LocalBusiness',
      position: index + 1,
      name: agency.name,
      address: {
        '@type': 'PostalAddress',
        addressLocality: agency.location,
        addressCountry: 'CM',
      },
      telephone: agency.phone,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(agencyListJsonLd) }} />
      <AgenciesPage />
    </>
  );
}
