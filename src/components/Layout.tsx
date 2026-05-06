'use client';

import React from 'react';
import { Search, Menu, Phone, ArrowRight, Globe2, ChevronDown, Check } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { COMPANY_INFO } from '../lib/site';
import { detectLocaleFromPath, getPathForLocale, ROUTES } from '../lib/i18n';

const FacebookIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={`${className} fill-current`} viewBox="0 0 320 512" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
  </svg>
);

const LanguageSwitcher = ({
  locale,
  switchToFr,
  switchToEn,
}: {
  locale: 'fr' | 'en';
  switchToFr: string;
  switchToEn: string;
}) => {
  const isEn = locale === 'en';
  const [open, setOpen] = React.useState(false);
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const options = [
    { code: 'fr', flag: '🇫🇷', href: switchToFr, label: isEn ? 'French' : 'Français' },
    { code: 'en', flag: '🇬🇧', href: switchToEn, label: isEn ? 'English' : 'Anglais' },
  ] as const;

  const currentOption = options.find((option) => option.code === locale) ?? options[0];

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-label={isEn ? 'Language selector' : 'Sélection de langue'}
        title={isEn ? 'Choose language' : 'Choisir la langue'}
        className="inline-flex h-10 items-center gap-2 rounded-full border border-gray-200 bg-white px-3 pr-2 text-[10px] font-black uppercase tracking-wider text-gray-700 shadow-sm transition hover:border-merlin-red/40"
      >
        <span className="hidden sm:flex h-6 w-6 items-center justify-center rounded-full bg-gray-50 text-gray-500">
          <Globe2 className="h-3.5 w-3.5" />
        </span>
        <span className="text-xs leading-none" aria-hidden="true">
          {currentOption.flag}
        </span>
        <span>{currentOption.code.toUpperCase()}</span>
        <ChevronDown className={`h-3.5 w-3.5 transition ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.16 }}
            className="absolute right-0 top-12 z-[60] min-w-[160px] overflow-hidden rounded-2xl border border-gray-200 bg-white p-1.5 shadow-2xl"
          >
            {options.map((option) => {
              const active = locale === option.code;
              return (
                <Link
                  key={option.code}
                  href={option.href}
                  onClick={() => setOpen(false)}
                  title={option.label}
                  className={`flex items-center justify-between rounded-xl px-3 py-2 text-xs font-bold transition ${
                    active ? 'bg-merlin-red/10 text-merlin-red' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-sm leading-none" aria-hidden="true">
                      {option.flag}
                    </span>
                    <span>{option.label}</span>
                  </span>
                  {active ? <Check className="h-3.5 w-3.5" /> : null}
                </Link>
              );
            })}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export const Header = () => {
  const pathname = usePathname();
  const locale = detectLocaleFromPath(pathname);
  const routes = ROUTES[locale];
  const isEn = locale === 'en';
  const switchToFr = getPathForLocale(pathname, 'fr');
  const switchToEn = getPathForLocale(pathname, 'en');

  return (
    <header className="bg-white border-b border-gray-100 py-3 px-4 sm:px-6 md:px-12 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <Link href={routes.home} className="shrink-0 flex items-center gap-2 sm:gap-3" aria-label={isEn ? 'Home' : 'Accueil'}>
          <img
            src="/images/logo.jpg"
            alt={isEn ? 'Merlin Cameroon logo' : 'Logo Merlin Cameroun'}
            className="h-12 w-auto sm:h-14 object-contain"
          />
          <div className="flex items-baseline gap-1 leading-none">
            <span className="text-base sm:text-lg font-black font-outfit tracking-tight text-merlin-red">MERLIN</span>
            <span className="text-base sm:text-lg font-black font-outfit tracking-tight text-merlin-red">CAMEROUN</span>
          </div>
        </Link>

        <div className="hidden md:flex flex-1 max-w-xl relative">
          <input
            type="text"
            placeholder={isEn ? 'Search for a product...' : 'Rechercher un produit...'}
            className="w-full pl-10 pr-4 py-2 bg-merlin-gray rounded-full border-none focus:ring-2 focus:ring-merlin-green text-sm"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>

	        <div className="flex items-center gap-3">
            <LanguageSwitcher locale={locale} switchToFr={switchToFr} switchToEn={switchToEn} />
	          <a
	            href="tel:+237695425970"
	            className="hidden lg:flex items-center gap-2 text-merlin-black font-semibold text-sm hover:text-merlin-red transition-colors"
	          >
	            <Phone className="w-4 h-4 text-merlin-red" />
	            +237 695 42 59 70
	          </a>
	          <Link
	            href={routes.contact}
	            className="bg-merlin-red text-white px-3 sm:px-5 py-2 rounded-full font-bold text-[11px] sm:text-sm hover:bg-red-700 transition-colors shadow-lg shadow-red-500/20 whitespace-nowrap"
	          >
	            {isEn ? 'REQUEST A QUOTE' : 'DEMANDER UN DEVIS'}
	          </Link>
	          <a
	            href={COMPANY_INFO.facebookUrl}
	            target="_blank"
	            rel="noopener noreferrer"
	            className="bg-[#1877F2] text-white w-10 h-10 sm:w-11 sm:h-11 rounded-full hover:bg-[#1666cf] transition-colors shadow-lg flex items-center justify-center"
              aria-label={isEn ? 'Official Facebook' : 'Facebook officiel'}
	          >
	            <FacebookIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="sr-only">{isEn ? 'Official Facebook' : 'Facebook officiel'}</span>
	          </a>
	        </div>
	      </div>
	    </header>
  );
};

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();
  const locale = detectLocaleFromPath(pathname);
  const routes = ROUTES[locale];
  const isEn = locale === 'en';

  const links = [
    { name: isEn ? 'Home' : 'Accueil', path: routes.home },
    { name: isEn ? 'Products' : 'Nos produits', path: routes.products },
    { name: isEn ? 'Agencies' : 'Nos agences', path: routes.agencies },
    { name: isEn ? 'Projects' : 'Réalisations', path: routes.realizations },
    { name: isEn ? 'About' : 'À propos', path: routes.about },
    { name: isEn ? 'Contact' : 'Contact', path: routes.contact },
  ];

  const isActive = (path: string) => {
    if (path === '/' || path === '/en') return pathname === path;
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <nav className="bg-merlin-green text-white sticky top-[72px] md:top-[73px] z-40 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center h-14 px-4 sm:px-6 md:px-12">
        <button
          className="flex items-center gap-2 bg-merlin-green h-full px-4 md:px-6 border-r border-white/10 hover:bg-green-700 transition-colors uppercase font-black text-[10px] md:text-xs tracking-[0.2em]"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isEn ? 'Open menu' : 'Ouvrir le menu'}
        >
          <Menu className="w-4 h-4" />
          {isEn ? 'Catalog' : 'Catalogue'}
        </button>

        <div className="hidden lg:flex flex-1 items-center justify-center h-full">
          {links.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`flex items-center px-6 h-full text-[11px] font-black uppercase tracking-[0.2em] hover:bg-green-700 transition-all ${
                isActive(link.path) ? 'bg-green-800' : ''
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex lg:hidden flex-1 justify-end h-full">
          <button
            className="flex items-center gap-2 px-4 hover:bg-green-700 transition-colors h-full"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isEn ? 'Toggle mobile menu' : 'Basculer le menu mobile'}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-14 left-0 w-full bg-white text-merlin-black shadow-2xl lg:w-72 border-b border-gray-100 overflow-hidden"
          >
            <ul className="flex flex-col py-2">
              {links.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="flex justify-between items-center px-8 py-5 hover:bg-merlin-gray font-black text-xs uppercase tracking-widest hover:text-merlin-green transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                    <ArrowRight className="w-4 h-4 text-merlin-red" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export const PromoBand = () => {
  const pathname = usePathname();
  const locale = detectLocaleFromPath(pathname);
  const isEn = locale === 'en';

  return (
    <div className="bg-merlin-red py-4 overflow-hidden border-b-4 border-merlin-black/10">
      <div className="flex justify-center text-center px-4">
        <span className="text-white text-[10px] md:text-xs font-black tracking-[0.2em] md:tracking-[0.3em] uppercase">
          {isEn ? 'THE LEADER IN SPEED AND SERVICE EFFICIENCY' : 'LE LEADER EN RAPIDITÉ ET EN EFFICACITÉ DES SERVICES'}
        </span>
      </div>
    </div>
  );
};

export const Footer = () => {
  const pathname = usePathname();
  const locale = detectLocaleFromPath(pathname);
  const routes = ROUTES[locale];
  const isEn = locale === 'en';

  return (
    <footer className="bg-merlin-black text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <img
              src="/images/logo.jpg"
              alt={isEn ? 'Merlin Cameroon logo' : 'Logo Merlin Cameroun'}
              className="h-16 w-auto object-contain"
            />
            <div className="flex items-baseline gap-1 leading-none">
              <span className="text-xl font-black font-outfit tracking-tight text-merlin-red">MERLIN</span>
              <span className="text-xl font-black font-outfit tracking-tight text-merlin-red">CAMEROUN</span>
            </div>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            {isEn
              ? 'MERLIN Cameroun is your trusted partner in Kribi for construction, logistics and general trading projects.'
              : 'MERLIN Cameroun est votre partenaire de confiance à Kribi pour vos projets de construction, logistique et commerce général.'}
          </p>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6 border-l-4 border-merlin-green pl-4">{isEn ? 'Quick links' : 'Liens rapides'}</h4>
          <ul className="space-y-4">
            <li><Link href={routes.products} className="text-gray-400 hover:text-white transition-colors">{isEn ? 'Products' : 'Nos produits'}</Link></li>
            <li><Link href={routes.agencies} className="text-gray-400 hover:text-white transition-colors">{isEn ? 'Agencies' : 'Nos agences'}</Link></li>
            <li><Link href={routes.realizations} className="text-gray-400 hover:text-white transition-colors">{isEn ? 'Projects' : 'Nos réalisations'}</Link></li>
            <li><Link href={routes.contact} className="text-gray-400 hover:text-white transition-colors">{isEn ? 'Contact us' : 'Contactez-nous'}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6 border-l-4 border-merlin-red pl-4">{isEn ? 'Business sectors' : 'Secteurs d’activité'}</h4>
          <ul className="space-y-4">
            <li className="text-gray-400 italic">{isEn ? 'Construction' : 'Construction'}</li>
            <li className="text-gray-400 italic">{isEn ? 'Logistics & Transport' : 'Logistique & Transport'}</li>
            <li className="text-gray-400 italic">{isEn ? 'General trading' : 'Commerce général'}</li>
            <li className="text-gray-400 italic">{isEn ? 'Trading & Distribution' : 'Négoce & Distribution'}</li>
          </ul>
        </div>

	        <div>
	          <h4 className="text-lg font-bold mb-6 border-l-4 border-merlin-yellow pl-4">{isEn ? 'Contact' : 'Nous contacter'}</h4>
	          <ul className="space-y-4 text-sm text-gray-400">
            <li className="flex items-start gap-3">
              <span className="font-bold text-white">{isEn ? 'Address:' : 'Adresse:'}</span>
              {isEn ? 'Kribi, Cameroon' : 'Kribi, Cameroun'}
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold text-white">{isEn ? 'Phone:' : 'Téléphone:'}</span>
              <span>
                +237 695 42 59 70
                <br />
                +237 222 462 523
              </span>
            </li>
	            <li className="flex items-start gap-3">
	              <span className="font-bold text-white">Email:</span>
	              <span className="break-all">merlincameroun@gmail.com</span>
	            </li>
	            <li className="pt-2">
	              <a
	                href={COMPANY_INFO.facebookUrl}
	                target="_blank"
	                rel="noopener noreferrer"
	                className="inline-flex items-center justify-center bg-[#1877F2] text-white w-10 h-10 rounded-full hover:bg-[#1666cf] transition-colors"
                  aria-label={isEn ? 'Official Facebook' : 'Facebook officiel'}
	              >
	                <FacebookIcon className="w-5 h-5" />
                  <span className="sr-only">{isEn ? 'Official Facebook' : 'Facebook officiel'}</span>
	              </a>
	            </li>
	          </ul>
	        </div>
	      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 pt-8 border-t border-white/10 text-center text-gray-500 text-xs space-y-2">
        <p>
          &copy; {new Date().getFullYear()} MERLIN Cameroun. {isEn ? 'All rights reserved.' : 'Tous droits réservés.'}
        </p>
        <p>
          <Link href="/admin/login" className="opacity-70 hover:opacity-100 transition-opacity underline-offset-4 hover:underline">
            {isEn ? 'Admin area' : 'Espace admin'}
          </Link>
        </p>
      </div>
    </footer>
  );
};

export const WhatsAppButton = () => {
  const pathname = usePathname();
  const locale = detectLocaleFromPath(pathname);
  const isEn = locale === 'en';

  return (
    <a
      href={COMPANY_INFO.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-[#25D366] text-white p-3 sm:p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center"
      title={isEn ? 'Contact us on WhatsApp' : 'Contactez-nous sur WhatsApp'}
      aria-label={isEn ? 'WhatsApp contact' : 'Contact WhatsApp'}
    >
      <svg className="w-7 h-7 sm:w-8 sm:h-8 fill-current" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.2-8.5-44.2-27.3-16.4-14.6-27.4-32.7-30.6-38.2-3.2-5.6-.3-8.6 2.4-11.4 2.5-2.5 5.5-6.5 8.3-9.7 2.8-3.3 3.7-5.6 5.5-9.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.2 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.8 23.5 9.2 31.5 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
      </svg>
    </a>
  );
};
