import type { Metadata } from 'next';
import { AgenciesPage } from '../../../views/Agencies';
import { AGENCIES } from '../../../constants';
import { SITE_NAME } from '../../../lib/site';

export const metadata: Metadata = {
  title: `Agencies | ${SITE_NAME}`,
  description:
    'Find MERLIN Cameroun agencies in Kribi: Dombe, Bossigui, Mpangou and Bilolo. Quickly contact the nearest service point.',
  keywords: ['merlin cameroon agencies', 'merlin bossigui', 'merlin dombe', 'merlin mpangou', 'merlin bilolo'],
  alternates: {
    canonical: '/en/agencies',
  },
};

export default function EnAgenciesPage() {
  const agencyListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'MERLIN Cameroun Agencies',
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
      <AgenciesPage locale="en" />
    </>
  );
}
