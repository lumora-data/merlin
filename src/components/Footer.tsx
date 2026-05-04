import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, MessageCircle } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="app-footer" className="bg-industrial text-white pt-16 pb-8 border-t-4 border-brand">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-1">
          <Link href="/" className="flex items-center gap-3 mb-8 group">
            <img
              src="/images/logo.jpg"
              alt="Logo MERLIN Cameroun"
              className="w-10 h-10 rounded-lg object-cover transition-transform group-hover:rotate-6"
            />
            <div className="flex flex-col">
              <span className="font-display font-bold text-xl tracking-tighter leading-none text-white">MERLIN</span>
              <span className="text-[8px] font-mono tracking-[0.4em] uppercase leading-none mt-1 opacity-60 text-white">Cameroun</span>
            </div>
          </Link>
          <p className="text-white/40 text-sm leading-relaxed mb-8 max-w-xs font-light">
            L'excellence opérationnelle en construction, logistique et commerce général au service de vos ambitions à Kribi et partout au Cameroun.
          </p>
          <div className="flex gap-4">
            {[Facebook, Instagram, Linkedin].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand hover:border-brand transition-all text-white/40 hover:text-white"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold mb-6 tracking-widest text-brand">ENTREPRISE</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li>
              <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white transition-colors">À Propos</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">Politique de Confidentialité</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold mb-6 tracking-widest text-brand">NOS SERVICES</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li>
              <Link href="/#services" className="hover:text-white transition-colors">Construction</Link>
            </li>
            <li>
              <Link href="/#services" className="hover:text-white transition-colors">Logistique & Transport</Link>
            </li>
            <li>
              <Link href="/#services" className="hover:text-white transition-colors">Commerce Général</Link>
            </li>
            <li>
              <Link href="/#services" className="hover:text-white transition-colors">Négoce</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold mb-6 tracking-widest text-brand">COORDONNÉES</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-accent shrink-0" />
              <span>Kribi, Cameroun</span>
            </li>
            <li className="flex items-start gap-3">
              <Phone size={18} className="text-accent shrink-0" />
              <div>
                <p>+237 694 42 59 70</p>
                <p>+237 222 462 523</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Mail size={18} className="text-accent shrink-0" />
              <span className="break-all">merlincameroun@gmail.com</span>
            </li>
            <li className="flex items-start gap-3">
              <MessageCircle size={18} className="text-accent shrink-0" />
              <a
                href="https://wa.me/237694425970"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                WhatsApp Direct
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 uppercase tracking-widest text-center md:text-left">
        <p>© {currentYear} MERLIN Cameroun. Tous droits réservés.</p>
        <p>Expert en Construction & Logistique</p>
      </div>
    </footer>
  );
}
