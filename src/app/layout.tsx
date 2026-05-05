import type { Metadata } from 'next';
import './globals.css';
import { Header, Navbar, PromoBand, Footer, WhatsAppButton } from '../components/Layout';
import { COMPANY_INFO, SEO_KEYWORDS, SITE_DESCRIPTION, SITE_NAME, SITE_URL, SITE_URL_OBJECT } from '../lib/site';

export const metadata: Metadata = {
  metadataBase: SITE_URL_OBJECT,
  title: {
    default: `${SITE_NAME} | Matériaux et Outillages à Kribi`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: SEO_KEYWORDS,
  alternates: {
    canonical: '/',
  },
  category: 'business',
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  openGraph: {
    type: 'website',
    locale: 'fr_CM',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Matériaux et Outillages à Kribi`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: COMPANY_INFO.logoPath,
        width: 1200,
        height: 630,
        alt: `Logo ${SITE_NAME}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} | Matériaux et Outillages à Kribi`,
    description: SITE_DESCRIPTION,
    images: [COMPANY_INFO.logoPath],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: COMPANY_INFO.logoPath,
    shortcut: COMPANY_INFO.logoPath,
    apple: COMPANY_INFO.logoPath,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: COMPANY_INFO.legalName,
      url: SITE_URL,
      logo: `${SITE_URL}${COMPANY_INFO.logoPath}`,
      email: COMPANY_INFO.email,
      telephone: COMPANY_INFO.phoneE164,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'HardwareStore',
      name: COMPANY_INFO.legalName,
      url: SITE_URL,
      image: `${SITE_URL}${COMPANY_INFO.logoPath}`,
      description: SITE_DESCRIPTION,
      telephone: COMPANY_INFO.phoneE164,
      email: COMPANY_INFO.email,
      address: {
        '@type': 'PostalAddress',
        addressLocality: COMPANY_INFO.city,
        addressCountry: COMPANY_INFO.country,
      },
      areaServed: COMPANY_INFO.countryName,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: 'fr-CM',
    },
  ];

  return (
    <html lang="fr">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <div className="flex flex-col min-h-screen">
          <Header />
          <Navbar />
          <PromoBand />
          <main className="flex-grow">{children}</main>
          <Footer />
          <WhatsAppButton />
        </div>
      </body>
    </html>
  );
}
