import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

export const metadata: Metadata = {
  title: 'MERLIN Cameroun | Construction, Logistique & Négoce à Kribi',
  description:
    "MERLIN Cameroun accompagne vos projets de construction, logistique, transport et commerce général à Kribi et partout au Cameroun.",
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-paper text-industrial font-sans selection:bg-brand selection:text-white relative">
        <Navbar />
        <main>{children}</main>
        <WhatsAppButton />
        <Footer />
      </body>
    </html>
  );
}
