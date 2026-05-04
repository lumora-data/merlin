"use client";

import { motion } from 'motion/react';
import { ArrowRight, Hammer, Truck, ShoppingBag, Briefcase, Phone } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    icon: <Hammer size={32} />,
    title: 'Construction',
    desc: 'Travaux généraux, aménagement, suivi de chantier et fourniture de matériaux à Kribi et environs.',
    features: ['Construction générale', 'Suivi de chantier', 'Matériaux'],
  },
  {
    icon: <Truck size={32} />,
    title: 'Logistique & Transport',
    desc: 'Déplacement sécurisé de marchandises, équipements et matériaux avec une gestion optimisée.',
    features: ['Transport marchandises', 'Logistique chantier', 'Suivi livraisons'],
  },
  {
    icon: <ShoppingBag size={32} />,
    title: 'Commerce Général',
    desc: 'Mise à disposition de produits, équipements et fournitures pour entreprises et particuliers.',
    features: ['Fournitures Pro', 'Équipements', 'Solutions fiables'],
  },
  {
    icon: <Briefcase size={32} />,
    title: 'Négoce',
    desc: 'Intermédiation commerciale, approvisionnement et expertise du terrain pour vos transactions.',
    features: ['Approvisionnement', 'Intermédiation', 'Réseau solide'],
  },
];

export default function Home() {
  return (
    <div id="home-page" className="relative overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-[1] noise-overlay" />

      <section id="hero" className="relative min-h-[90vh] md:min-h-screen flex items-center pt-28 md:pt-20 bg-industrial overflow-hidden">
        <div className="absolute inset-0 z-0 industrial-grid opacity-30" />

        <div className="absolute top-0 right-0 w-full md:w-[60%] h-full z-0">
          <motion.div
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.6 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="w-full h-full"
          >
            <img
              src="/images/hero.jpg"
              alt="Chantier et logistique MERLIN"
              className="w-full h-full object-cover grayscale brightness-50 md:brightness-75 object-center"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-transparent via-industrial/60 md:via-industrial/50 to-industrial z-[5]" />
          <div className="absolute inset-0 bg-gradient-to-b from-industrial/80 via-transparent to-transparent z-[6]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full h-full flex flex-col justify-center">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <h1 className="text-4xl sm:text-5xl md:text-8xl font-display font-bold text-white mb-6 md:mb-8 text-balance leading-tight md:leading-[0.9]">
                Bâtir l'avenir de <span className="text-brand">Kribi</span>
              </h1>
              <p className="text-base sm:text-lg md:text-2xl text-white/80 md:text-slate-muted mb-10 md:mb-12 max-w-xl font-light leading-relaxed">
                MERLIN Cameroun : l'excellence opérationnelle en construction, logistique et commerce général au service de vos ambitions.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto group relative px-10 py-5 bg-brand text-white overflow-hidden rounded-full text-center"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative font-display font-bold uppercase tracking-widest text-xs md:text-sm flex items-center justify-center gap-3">
                    Démarrer un projet <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <a
                  href="https://wa.me/237694425970"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-10 py-5 border border-white/20 text-white rounded-full hover:bg-white hover:text-industrial transition-all font-display font-bold uppercase tracking-widest text-xs md:text-sm text-center"
                >
                  WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
        >
          <span className="text-[10px] uppercase font-mono tracking-widest text-white">Scroll</span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-white to-transparent" />
        </motion.div>
      </section>

      <section id="services" className="py-20 md:py-32 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14 md:mb-20 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-6xl font-display font-bold mb-4 md:mb-6 uppercase"
            >
              Nos expertises <span className="text-brand">phares</span>
            </motion.h2>
            <div className="h-1 w-20 bg-accent mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group relative bg-white p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-gray-100 flex flex-col hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] transition-all duration-500"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rounded-full -mr-16 -mt-16 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="relative mb-10">
                  <div className="w-16 h-16 bg-paper rounded-2xl flex items-center justify-center border border-gray-100 shadow-sm text-brand group-hover:bg-brand group-hover:text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    {service.icon}
                  </div>
                  <div className="absolute -inset-2 bg-brand/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="relative z-10 flex-1 flex flex-col">
                  <h3 className="text-2xl font-display font-bold mb-4 text-industrial group-hover:text-brand transition-colors">{service.title}</h3>
                  <p className="text-slate-muted text-sm leading-relaxed mb-10 font-normal">{service.desc}</p>

                  <div className="pt-8 border-t border-gray-50 mt-auto">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-accent block mb-5">Expertises clés</span>
                    <div className="flex flex-wrap gap-2.5">
                      {service.features.map((feature) => (
                        <span
                          key={feature}
                          className="text-[9px] font-bold uppercase tracking-widest px-4 py-2 bg-paper rounded-xl border border-gray-100 text-industrial/60 group-hover:border-brand/20 group-hover:text-brand transition-all duration-300"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-paper px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          <div className="rounded-[2rem] overflow-hidden border border-gray-100">
            <img src="/images/image-02.webp" alt="Transport de matériaux" className="w-full h-64 md:h-80 object-cover" />
          </div>
          <div className="rounded-[2rem] overflow-hidden border border-gray-100">
            <img src="/images/image-03.webp" alt="Équipe opérationnelle sur le terrain" className="w-full h-64 md:h-80 object-cover" />
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-industrial px-6 relative">
        <div className="absolute inset-0 industrial-grid opacity-10" />
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 md:gap-20 items-center">
          <div className="w-full lg:flex-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-[2rem] overflow-hidden border border-white/10"
            >
              <img src="/images/image-01.webp" alt="Détail d'un chantier de construction" className="w-full h-[400px] md:h-[600px] object-cover opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-industrial via-transparent to-transparent" />
              <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10">
                <p className="text-brand font-display font-bold text-3xl md:text-5xl mb-1 md:mb-2">KRIBI</p>
                <p className="text-white/40 font-mono text-[10px] uppercase tracking-[0.4em]">Siège social & opérations</p>
              </div>
            </motion.div>
          </div>

          <div className="w-full lg:flex-1">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-10 md:mb-16 uppercase">
              Pourquoi nous <span className="text-accent">choisir</span> ?
            </h2>

            <div className="space-y-8 md:space-y-12">
              {[
                { title: 'Réactivité Absolue', desc: 'Nos équipes locales interviennent sous 24h pour vos urgences chantiers.' },
                { title: 'Qualité Certifiée', desc: 'Chaque matériau et chaque livraison respecte les normes de sécurité les plus strictes.' },
                { title: 'Partenaire de Confiance', desc: "Plus de 10 ans d'expertise au service des acteurs majeurs du Cameroun." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6 md:gap-8 group"
                >
                  <span className="text-accent font-mono text-lg md:text-xl pt-1">0{i + 1}/</span>
                  <div>
                    <h4 className="text-white text-xl md:text-2xl font-display font-bold mb-2 md:mb-3 group-hover:text-brand transition-colors tracking-tight">
                      {item.title}
                    </h4>
                    <p className="text-slate-muted text-sm md:text-base leading-relaxed font-light">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-40 bg-white px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-7xl font-display font-bold mb-6 md:mb-10 text-industrial leading-tight">
            Prêt à transformer vos <span className="text-brand">ambitions</span> ?
          </h2>
          <p className="text-slate-muted text-lg md:text-xl mb-10 md:mb-16 max-w-2xl mx-auto font-light leading-relaxed">
            De la première pierre à la livraison finale, MERLIN Cameroun est votre allié stratégique à Kribi.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-8">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-10 py-5 md:px-14 md:py-6 bg-industrial text-white rounded-full font-display font-bold uppercase tracking-widest text-xs md:text-sm hover:bg-brand transition-all shadow-2xl"
            >
              Parlons de votre projet
            </Link>
            <a
              href="tel:+237694425970"
              className="w-full sm:w-auto px-10 py-5 md:px-14 md:py-6 border border-gray-200 rounded-full font-display font-bold uppercase tracking-widest text-xs md:text-sm hover:border-accent transition-all flex items-center justify-center gap-3"
            >
              <Phone size={18} className="text-accent" />
              Appel direct
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
