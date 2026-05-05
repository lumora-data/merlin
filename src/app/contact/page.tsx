import type { Metadata } from 'next';
import { ContactPage } from '../../views/Contact';
import { COMPANY_INFO, SITE_NAME } from '../../lib/site';

export const metadata: Metadata = {
  title: `Contact | ${SITE_NAME}`,
  description: `Contactez ${SITE_NAME} à Kribi par téléphone, WhatsApp ou email pour vos demandes de devis et d'informations produits.`,
  keywords: ['contact merlin cameroun', 'whatsapp merlin cameroun', 'devis matériaux kribi'],
  alternates: {
    canonical: '/contact',
  },
};

export default function Page() {
  const contactJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPoint',
    contactType: 'Service client',
    telephone: COMPANY_INFO.phoneE164,
    email: COMPANY_INFO.email,
    areaServed: 'CM',
    availableLanguage: ['fr', 'en'],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }} />
      <ContactPage />
    </>
  );
}
