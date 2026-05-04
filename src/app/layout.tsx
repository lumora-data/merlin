import type { Metadata } from 'next';
import './globals.css';
import { Header, Navbar, PromoBand, Footer, WhatsAppButton } from '../components/Layout';

export const metadata: Metadata = {
  title: 'MERLIN Cameroun | Matériaux et Outillages à Kribi',
  description:
    'MERLIN Cameroun SARL: matériaux de construction, quincaillerie, équipements hydrauliques et électroménager à Kribi.',
  icons: {
    icon: '/images/logo.jpg',
    shortcut: '/images/logo.jpg',
    apple: '/images/logo.jpg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
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
