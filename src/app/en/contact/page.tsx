import type { Metadata } from 'next';
import { ContactPage } from '../../../views/Contact';
import { COMPANY_INFO, SITE_NAME } from '../../../lib/site';

export const metadata: Metadata = {
  title: `Contact | ${SITE_NAME}`,
  description: `Contact ${SITE_NAME} in Kribi by phone, WhatsApp or email for quote requests and product information.`,
  keywords: ['contact merlin cameroon', 'whatsapp merlin cameroon', 'building materials quote kribi'],
  alternates: {
    canonical: '/en/contact',
  },
};

export default function EnContactPage() {
  const contactJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPoint',
    contactType: 'Customer service',
    telephone: COMPANY_INFO.phoneE164,
    email: COMPANY_INFO.email,
    areaServed: 'CM',
    availableLanguage: ['en', 'fr'],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }} />
      <ContactPage locale="en" />
    </>
  );
}
