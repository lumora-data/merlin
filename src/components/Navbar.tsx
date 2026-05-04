"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';

const navLinks = [
  { name: 'Accueil', path: '/' },
  { name: 'À Propos', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isHome = pathname === '/';
  const shouldBeGlass = scrolled || !isHome;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled ? 'py-4' : 'py-6 md:py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div
          className={`flex items-center justify-between transition-all duration-500 rounded-2xl px-4 sm:px-6 lg:px-8 py-3 ${
            shouldBeGlass
              ? 'glass-navbar shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/40'
              : 'bg-transparent'
          }`}
        >
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/images/logo.jpg"
              alt="Logo MERLIN Cameroun"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl object-cover shadow-xl transition-transform duration-500 group-hover:rotate-6"
            />
            <div className="flex flex-col">
              <span
                className={`font-display font-bold text-xl sm:text-2xl tracking-tighter leading-none transition-colors duration-500 ${
                  shouldBeGlass ? 'text-industrial' : 'text-white'
                }`}
              >
                MERLIN
              </span>
              <span
                className={`text-[10px] font-mono tracking-[0.35em] uppercase leading-none mt-1 opacity-70 transition-colors duration-500 ${
                  shouldBeGlass ? 'text-industrial font-bold' : 'text-white'
                }`}
              >
                Cameroun
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-[11px] font-display font-bold uppercase tracking-[0.2em] transition-all relative group ${
                  shouldBeGlass ? 'text-industrial hover:text-brand' : 'text-white/80 hover:text-white'
                }`}
              >
                {link.name}
                <motion.span
                  className={`absolute -bottom-1 left-0 h-[2px] transition-all bg-accent ${
                    pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://wa.me/237694425970"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2.5 rounded-full transition-all hover:scale-110 ${
                shouldBeGlass
                  ? 'bg-accent/10 text-accent hover:bg-accent hover:text-white shadow-sm'
                  : 'bg-white/10 text-white hover:bg-white hover:text-industrial'
              }`}
            >
              <MessageCircle size={18} />
            </a>
            <Link
              href="/contact"
              className={`px-7 py-3 rounded-full font-display font-bold uppercase tracking-widest text-[10px] transition-all hover:shadow-xl active:scale-95 ${
                shouldBeGlass ? 'bg-industrial text-white hover:bg-brand' : 'bg-white text-industrial hover:bg-accent'
              }`}
            >
              Devis Gratuit
            </Link>
          </div>

          <button
            className={`md:hidden p-2 rounded-full transition-colors ${shouldBeGlass ? 'text-industrial bg-gray-50' : 'text-white bg-white/10'}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Ouvrir le menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="absolute top-24 sm:top-28 left-4 right-4 glass-navbar rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-6 sm:p-8 border border-white/40 md:hidden overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rounded-full -mr-16 -mt-16 blur-2xl" />

            <div className="flex flex-col gap-5 relative z-10">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`text-xl font-display font-bold tracking-tighter uppercase p-2 ${
                    pathname === link.path ? 'text-brand' : 'text-industrial'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-industrial/10" />
              <div className="flex flex-col gap-3">
                <a
                  href="tel:+237694425970"
                  className="w-full bg-industrial text-white py-4 rounded-[1.25rem] flex items-center justify-center gap-3 font-display font-bold text-[10px] uppercase tracking-widest shadow-lg active:scale-[0.98] transition-transform"
                >
                  <Phone size={16} /> Appeler Merlin
                </a>
                <a
                  href="https://wa.me/237694425970"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-accent text-white py-4 rounded-[1.25rem] flex items-center justify-center gap-3 font-display font-bold text-[10px] uppercase tracking-widest shadow-lg active:scale-[0.98] transition-transform"
                >
                  <MessageCircle size={16} /> WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
