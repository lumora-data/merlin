'use client';

import React from 'react';
import { HeroSlider } from '../components/HeroSlider';
import { SERVICES, AGENCIES, PRODUCT_FAMILIES } from '../constants';
import { Settings, Truck, ShoppingBag, BarChart3, Clock, CheckCircle, Shield, MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'motion/react';

const serviceIcons = {
  'construction': Settings,
  'logistique': Truck,
  'commerce': ShoppingBag,
  'negoce': BarChart3,
};

export const Home = () => {
  return (
    <div className="bg-merlin-gray">
      {/* Hero Section */}
      <HeroSlider />

      {/* Stats / Features Band */}
      <div className="bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
           {[
             { icon: Clock, title: 'Rapidité', text: 'Réponse en moins de 24h' },
             { icon: CheckCircle, title: 'Efficacité', text: 'Solutions sur mesure' },
             { icon: Shield, title: 'Fiabilité', text: 'Engagement qualité' },
             { icon: MapPin, title: 'Présence Locale', text: 'Basé à Kribi' }
           ].map((item, i) => (
             <div key={i} className="flex flex-col items-center text-center space-y-2 group">
                <div className="w-12 h-12 rounded-2xl bg-merlin-gray flex items-center justify-center text-merlin-green group-hover:bg-merlin-green group-hover:text-white transition-all transform group-hover:rotate-12">
                   <item.icon className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-sm uppercase tracking-wider">{item.title}</h4>
                <p className="text-xs text-gray-500">{item.text}</p>
             </div>
           ))}
        </div>
      </div>

      {/* Products Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />
        
        <div className="w-full bg-merlin-red text-white py-4 mb-16 shadow-lg border-b-4 border-merlin-black/10 relative z-10">
          <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
               <div className="w-1 h-8 bg-white/30 hidden md:block" />
               <h2 className="text-xl md:text-3xl font-black font-outfit uppercase tracking-tighter">NOS PRODUITS</h2>
            </div>
            <Link href="/produits" className="flex items-center gap-2 group font-black text-white hover:bg-white hover:text-merlin-red transition-all uppercase tracking-[0.2em] text-[10px] px-6 py-2 rounded-full border border-white/30">
              Voir tout le catalogue <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {PRODUCT_FAMILIES.slice(0, 6).map((family, i) => (
              <motion.div
                key={family.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative h-[480px] rounded-[3.5rem] overflow-hidden shadow-2xl transition-all duration-500 border-4 border-white hover:shadow-merlin-red/10"
              >
                <img
                  src={family.images[0]}
                  alt={family.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-merlin-black via-merlin-black/20 to-transparent p-12 flex flex-col justify-end">
                  <div className="space-y-4 translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="w-12 h-1 bg-merlin-green mb-4" />
                    <h3 className="text-white text-3xl font-black uppercase tracking-tight leading-tight">{family.title}</h3>
                    <p className="text-white/70 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-2 font-medium">
                      {family.description}
                    </p>
                    <div className="pt-6 flex items-center gap-3 text-merlin-green font-bold text-xs uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all">
                      Découvrir la gamme <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
                <Link href={`/produits/${family.slug}`} className="absolute inset-0 z-10" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-merlin-gray/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:32px_32px] opacity-20 pointer-events-none" />

        <div className="w-full bg-merlin-red text-white py-4 mb-16 shadow-lg border-b-4 border-merlin-black/10 relative z-10">
          <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
               <div className="w-1 h-8 bg-white/30 hidden md:block" />
               <h2 className="text-xl md:text-3xl font-black font-outfit uppercase tracking-tighter">NOS SERVICES</h2>
            </div>
            <Link href="/contact" className="bg-merlin-black text-white px-8 py-2 rounded-full font-black text-[10px] tracking-widest hover:bg-white hover:text-merlin-black transition-all flex items-center gap-2 uppercase border border-transparent">
              Demander une étude <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {SERVICES.map((service, i) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white border border-gray-100 p-10 rounded-[3rem] hover:shadow-2xl transition-all duration-500 group h-full flex flex-col relative overflow-hidden hover:border-merlin-green/30"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-merlin-green/5 rounded-bl-[4rem] group-hover:scale-110 transition-transform" />
                  <div className="w-20 h-20 rounded-[2rem] bg-merlin-green/5 flex items-center justify-center text-merlin-green mb-10 group-hover:bg-merlin-green group-hover:text-white transition-all shadow-inner border border-merlin-green/10">
                    {React.createElement(serviceIcons[service.category as keyof typeof serviceIcons] || Settings, { className: "w-10 h-10" })}
                  </div>
                  <h3 className="text-2xl font-black mb-4 text-merlin-black uppercase tracking-tight leading-tight">{service.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-10 flex-1 italic font-medium">
                    {service.description}
                  </p>
                  <Link
                    href="/contact"
                    className="flex items-center gap-3 text-merlin-red font-black text-[10px] uppercase tracking-[0.3em] group-hover:gap-5 transition-all"
                  >
                    Demander ce service <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              ))}
            </div>
        </div>
      </section>

      {/* Agencies Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />

        <div className="w-full bg-merlin-red text-white py-4 mb-16 shadow-lg border-b-4 border-merlin-black/10 relative z-10">
          <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
               <div className="w-1 h-8 bg-white/30 hidden md:block" />
               <h2 className="text-xl md:text-3xl font-black font-outfit uppercase tracking-tighter">NOS AGENCES</h2>
            </div>
            <Link href="/agences" className="flex items-center gap-2 group font-black text-white hover:bg-white hover:text-merlin-red transition-all uppercase tracking-[0.2em] text-[10px] px-8 py-2 rounded-full border border-white/30">
              Voir sur la carte <MapPin className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {AGENCIES.map((agency, i) => (
              <motion.div
                key={agency.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-[3.5rem] p-12 border border-gray-100 hover:border-merlin-red hover:shadow-2xl transition-all duration-500 group relative overflow-hidden h-full flex flex-col shadow-2xl"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-merlin-red/5 rounded-bl-[5rem] group-hover:scale-125 transition-transform" />
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-12">
                    <div className="w-16 h-16 bg-merlin-gray rounded-[1.5rem] flex items-center justify-center text-merlin-red group-hover:bg-merlin-red group-hover:text-white transition-all shadow-sm">
                      <MapPin className="w-8 h-8" />
                    </div>
                    <span className="bg-red-50 text-merlin-red text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-widest border border-red-100">
                      Dispo
                    </span>
                  </div>
                  <h3 className="text-3xl font-black mb-4 uppercase tracking-tight group-hover:text-merlin-red transition-colors">{agency.name}</h3>
                  <p className="text-gray-500 font-bold text-sm mb-12 flex items-center gap-3 italic">
                    <span className="w-2 h-2 rounded-full bg-merlin-green" />
                    {agency.location}
                  </p>
                  <div className="space-y-4 pt-12 border-t border-gray-100 mt-auto">
                     <a
                      href={`tel:${agency.phone.replace(/\s/g, '')}`}
                      className="flex items-center gap-4 text-merlin-black font-black text-sm hover:text-merlin-red transition-colors"
                    >
                      <div className="w-12 h-12 rounded-full bg-merlin-gray flex items-center justify-center group-hover:bg-red-50 transition-colors shadow-inner">
                         <Truck className="w-5 h-5" />
                      </div>
                      {agency.phone}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-24 relative overflow-hidden bg-merlin-gray/60">
        <div className="absolute inset-0 bg-[radial-gradient(#f3f4f6_1px,transparent_1px)] [background-size:32px_32px] opacity-50 pointer-events-none" />
        
        <div className="w-full bg-merlin-gray text-merlin-black py-4 mb-20 shadow-lg border-b-4 border-gray-100 relative z-10">
          <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-center">
            <h2 className="text-xl md:text-3xl font-black font-outfit uppercase tracking-tighter">NOS PARTENAIRES</h2>
          </div>
        </div>

        <div className="relative z-10 overflow-hidden flex py-10">
          <motion.div 
            animate={{ x: [0, -2500] }}
            transition={{ 
              duration: 40, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="flex gap-12 md:gap-24 items-center whitespace-nowrap"
          >
             {[...Array(3)].flatMap(() => [
               encodeURI('/images/accueil/partenaires-detoures/PHOTO-2026-05-04-17-59-33.png'),
               encodeURI('/images/accueil/partenaires-detoures/PHOTO-2026-05-04-17-59-34 2.png'),
               encodeURI('/images/accueil/partenaires-detoures/PHOTO-2026-05-04-17-59-34 3.png'),
               encodeURI('/images/accueil/partenaires-detoures/PHOTO-2026-05-04-17-59-34 4.png'),
               encodeURI('/images/accueil/partenaires-detoures/PHOTO-2026-05-04-17-59-34.png'),
               encodeURI('/images/accueil/partenaires-detoures/PHOTO-2026-05-04-18-02-26 2.png'),
               encodeURI('/images/accueil/partenaires-detoures/PHOTO-2026-05-04-18-02-26.png'),
               encodeURI('/images/accueil/partenaires-detoures/PHOTO-2026-05-04-18-02-27 2.png'),
               encodeURI('/images/accueil/partenaires-detoures/PHOTO-2026-05-04-18-02-27 3.png'),
               encodeURI('/images/accueil/partenaires-detoures/PHOTO-2026-05-04-18-02-27 4.png'),
               encodeURI('/images/accueil/partenaires-detoures/PHOTO-2026-05-04-18-02-27 5.png'),
               encodeURI('/images/accueil/partenaires-detoures/PHOTO-2026-05-04-18-02-27.png'),
               encodeURI('/images/accueil/partenaires-detoures/PHOTO-2026-05-04-18-02-28.png'),
               encodeURI('/images/accueil/partenaires-detoures/PHOTO-2026-05-04-18-05-44.png'),
               encodeURI('/images/accueil/partenaires-detoures/PHOTO-2026-05-04-18-07-02.png'),
             ]).map((partner, i) => (
                <img
                  key={i}
                  src={partner}
                  alt="Partenaire Merlin"
                  className="h-14 sm:h-16 md:h-20 w-auto object-contain shrink-0 mix-blend-multiply opacity-90 hover:opacity-100 transition-opacity duration-300"
                />
             ))}
          </motion.div>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="py-20 md:py-32 bg-merlin-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16 text-center">
             {[
               { label: 'Projets Livrés', value: '1.2k', sub: 'Satisfaction client' },
               { label: 'Matériaux référencés', value: '5k+', sub: 'Catalogue complet' },
               { label: 'Années d\'expertise', value: '15', sub: 'Savoir-faire local' },
               { label: 'Agences Kribi', value: '03', sub: 'Disponibilité maximale' }
             ].map((stat, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    delay: i * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                   <motion.p 
                     initial={{ scale: 0.5 }}
                     whileInView={{ scale: 1 }}
                     transition={{ delay: (i * 0.1) + 0.2, duration: 0.5 }}
                     className="text-5xl md:text-7xl font-black font-outfit text-merlin-green leading-none"
                   >
                    {stat.value}
                   </motion.p>
                   <div className="space-y-1">
                     <p className="text-xs font-black uppercase tracking-[0.3em] text-white/50">{stat.label}</p>
                     <p className="text-[10px] text-white/30 italic uppercase">{stat.sub}</p>
                   </div>
                </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-6 md:px-12 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-merlin-green/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-merlin-red/10 rounded-full blur-3xl" />
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl h-[500px]">
              <img
                src={encodeURI('/images/accueil/know-us.jpg')}
                alt="Expertise"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur p-8 rounded-3xl shadow-2xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-merlin-green flex items-center justify-center text-white">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-black text-xl">100% Qualité</h4>
                    <p className="text-xs text-gray-500">Engagement total sur chaque projet</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
             <div className="space-y-4 text-center lg:text-left">
                <span className="text-merlin-red font-black text-xs uppercase tracking-widest">Notre Différence</span>
                <h2 className="text-4xl md:text-6xl font-black font-outfit uppercase">POURQUOI CHOISIR <span className="text-merlin-green">MERLIN ?</span></h2>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: 'Rapidité', desc: 'Nous comprenons l\'urgence de vos besoins et agissons vite.' },
                  { title: 'Efficacité', desc: 'Chaque service est optimisé pour un résultat parfait.' },
                  { title: 'Fiabilité', desc: 'Une transparence totale et un respect des engagements.' },
                  { title: 'Présence locale', desc: 'Ancré à Kribi, nous connaissons le terrain sur le bout des doigts.' }
                ].map((item, i) => (
                  <div key={i} className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="text-lg font-black text-merlin-black mb-2">{item.title}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
             </div>

             <div className="pt-8">
                <Link
                  href="/a-propos"
                  className="inline-block bg-merlin-black text-white px-8 py-4 rounded-full font-bold text-sm tracking-widest hover:bg-merlin-red transition-all shadow-xl shadow-black/20"
                >
                  DÉCOUVRIR NOTRE HISTOIRE
                </Link>
             </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-merlin-green py-20 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8 text-white">
           <h2 className="text-4xl md:text-5xl font-black font-outfit uppercase">Besoin d'un partenaire fiable pour votre projet ?</h2>
           <p className="text-xl text-white/80 max-w-2xl mx-auto">Rejoignez les centaines de clients qui font confiance à MERLIN pour l'excellence de ses services à Kribi.</p>
           <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/contact" className="w-full sm:w-auto bg-white text-merlin-green px-8 py-4 rounded-full font-black text-base sm:text-lg hover:scale-105 transition-transform shadow-2xl uppercase tracking-widest">
                 Démarrer mon projet
              </Link>
              <a href="tel:+237695425970" className="w-full sm:w-auto text-center bg-merlin-black/20 border-2 border-white/30 text-white px-8 py-4 rounded-full font-black text-base sm:text-lg hover:bg-white/10 transition-colors uppercase tracking-widest">
                 Nous appeler
              </a>
           </div>
        </div>
      </section>
    </div>
  );
};
