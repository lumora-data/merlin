'use client';

import React from 'react';
import { HeroSlider } from '../components/HeroSlider';
import { SERVICES, AGENCIES, PRODUCT_FAMILIES } from '../constants';
import { Settings, Truck, ShoppingBag, BarChart3, Clock, CheckCircle, Shield, MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'motion/react';
import type { Locale } from '../lib/i18n';
import { ROUTES } from '../lib/i18n';

const serviceIcons = {
  settings: Settings,
  truck: Truck,
  'shopping-bag': ShoppingBag,
  'bar-chart-3': BarChart3,
  shield: Shield,
  'check-circle': CheckCircle,
  clock: Clock,
  'map-pin': MapPin,
  'construction': Settings,
  'logistique': Truck,
  'transport': Truck,
  'commerce': ShoppingBag,
  'negoce': BarChart3,
};

export const Home = ({ locale = 'fr' }: { locale?: Locale }) => {
  const isEn = locale === 'en';
  const routes = ROUTES[locale];

  return (
    <div className="bg-merlin-gray">
      {/* Hero Section */}
      <HeroSlider />

      {/* Stats / Features Band */}
      <div className="bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
           {[
             { icon: Clock, title: isEn ? 'Speed' : 'Rapidité', text: isEn ? 'Response in less than 24h' : 'Réponse en moins de 24h' },
             { icon: CheckCircle, title: isEn ? 'Efficiency' : 'Efficacité', text: isEn ? 'Tailored solutions' : 'Solutions sur mesure' },
             { icon: Shield, title: isEn ? 'Reliability' : 'Fiabilité', text: isEn ? 'Quality commitment' : 'Engagement qualité' },
             { icon: MapPin, title: isEn ? 'Local Presence' : 'Présence Locale', text: isEn ? 'Based in Kribi' : 'Basé à Kribi' }
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
               <h2 className="text-xl md:text-3xl font-black font-outfit uppercase tracking-tighter">{isEn ? 'OUR PRODUCTS' : 'NOS PRODUITS'}</h2>
            </div>
            <Link href={routes.products} className="flex items-center gap-2 group font-black text-white hover:bg-white hover:text-merlin-red transition-all uppercase tracking-[0.2em] text-[10px] px-6 py-2 rounded-full border border-white/30">
              {isEn ? 'View full catalog' : 'Voir tout le catalogue'} <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
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
                      {isEn ? 'Explore range' : 'Découvrir la gamme'} <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
                <Link href={`${routes.products}/${family.slug}`} className="absolute inset-0 z-10" />
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
               <h2 className="text-xl md:text-3xl font-black font-outfit uppercase tracking-tighter">{isEn ? 'OUR SERVICES' : 'NOS SERVICES'}</h2>
            </div>
            <Link href={routes.contact} className="bg-merlin-black text-white px-8 py-2 rounded-full font-black text-[10px] tracking-widest hover:bg-white hover:text-merlin-black transition-all flex items-center gap-2 uppercase border border-transparent">
              {isEn ? 'Request a study' : 'Demander une étude'} <ArrowRight className="w-4 h-4" />
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
                    {React.createElement(serviceIcons[service.icon as keyof typeof serviceIcons] || serviceIcons[service.category as keyof typeof serviceIcons] || Settings, { className: "w-10 h-10" })}
                  </div>
                  <h3 className="text-2xl font-black mb-4 text-merlin-black uppercase tracking-tight leading-tight">{service.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-10 flex-1 italic font-medium">
                    {service.description}
                  </p>
                  <Link
                    href={routes.contact}
                    className="flex items-center gap-3 text-merlin-red font-black text-[10px] uppercase tracking-[0.3em] group-hover:gap-5 transition-all"
                  >
                    {isEn ? 'Request this service' : 'Demander ce service'} <ArrowRight className="w-4 h-4" />
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
               <h2 className="text-xl md:text-3xl font-black font-outfit uppercase tracking-tighter">{isEn ? 'OUR AGENCIES' : 'NOS AGENCES'}</h2>
            </div>
            <Link href={routes.agencies} className="flex items-center gap-2 group font-black text-white hover:bg-white hover:text-merlin-red transition-all uppercase tracking-[0.2em] text-[10px] px-8 py-2 rounded-full border border-white/30">
              {isEn ? 'View all locations' : 'Voir sur la carte'} <MapPin className="w-4 h-4" />
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
                      {isEn ? 'Open' : 'Dispo'}
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
            <h2 className="text-xl md:text-3xl font-black font-outfit uppercase tracking-tighter">{isEn ? 'OUR PARTNERS' : 'NOS PARTENAIRES'}</h2>
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
	               { label: isEn ? 'Completed projects' : 'Projets Livrés', value: '1.2k', sub: isEn ? 'Client satisfaction' : 'Satisfaction client' },
	               { label: isEn ? 'Material references' : 'Matériaux référencés', value: '5k+', sub: isEn ? 'Complete catalog' : 'Catalogue complet' },
	               { label: isEn ? 'Since' : 'Depuis', value: '2018', sub: isEn ? 'Active in Kribi' : 'Présence active à Kribi' },
	               { label: isEn ? 'Kribi agencies' : 'Agences Kribi', value: '04', sub: isEn ? 'Maximum availability' : 'Disponibilité maximale' }
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

	      {/* Services & Strengths */}
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
	                    <h4 className="font-black text-xl">{isEn ? 'Since 2018' : 'Depuis 2018'}</h4>
	                    <p className="text-xs text-gray-500">{isEn ? 'Years of experience supporting your projects' : 'Des années d\'expérience au service de vos projets'}</p>
	                  </div>
	                </div>
	              </div>
	            </div>
	          </div>

	          <div className="space-y-8">
	             <div className="space-y-4 text-center lg:text-left">
	                <span className="text-merlin-red font-black text-xs uppercase tracking-widest">{isEn ? 'Our services and strengths' : 'Nos Services Et Atouts'}</span>
	                <h2 className="text-4xl md:text-6xl font-black font-outfit uppercase">{isEn ? 'YOUR PROJECTS IN' : 'VOS PROJETS ENTRE DE'} <span className="text-merlin-green">{isEn ? 'GOOD HANDS' : 'BONNES MAINS'}</span></h2>
	             </div>

	             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
	                {[
                  { title: isEn ? 'Years of experience' : 'Années d\'expérience', desc: isEn ? 'Founded in 2018, we support projects of all sizes.' : 'Nous existons depuis 2018 et accompagnons des projets de toutes tailles.' },
                  { title: isEn ? 'Speed and efficiency' : 'Rapidité et efficacité', desc: isEn ? 'Our organization ensures fast handling and efficient service.' : 'Notre organisation permet une prise en charge rapide et un service efficace.' },
                  { title: isEn ? 'Affordable prices' : 'Prix accessibles', desc: isEn ? 'Rates adapted to all client profiles, individuals and professionals.' : 'Des tarifs adaptés à tous types de clients, particuliers comme professionnels.' },
                  { title: isEn ? 'Responsive support' : 'Service client réactif', desc: isEn ? 'A team available to answer quickly.' : 'Une équipe disponible pour répondre vite à vos questions et urgences.' },
                  { title: isEn ? 'Young and professional team' : 'Personnel jeune et professionnel', desc: isEn ? 'Dynamic and results-driven field team.' : 'Une équipe dynamique, engagée et orientée résultats sur le terrain.' },
                  { title: isEn ? 'Client account & phased supply' : 'Compte client et ravitaillement progressif', desc: isEn ? 'Open a client account and buy progressively based on project milestones.' : 'Possibilité d\'ouvrir un compte client et d\'acheter progressivement selon l\'avancement du chantier.' },
                  { title: isEn ? 'Order tracking' : 'Suivi des commandes', desc: isEn ? 'We track each order up to final destination.' : 'Nous suivons chaque commande jusqu\'à sa destination finale.' },
                  { title: isEn ? 'Fast delivery and truck fleet' : 'Livraison rapide et flotte de camions', desc: isEn ? 'Fleet available for lower-cost deliveries around Kribi.' : 'Flotte disponible pour des livraisons à moindre coût à Kribi et ses environs.' }
                ].map((item, i) => (
	                  <div key={i} className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
	                    <h4 className="text-lg font-black text-merlin-black mb-2">{item.title}</h4>
	                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
	                  </div>
	                ))}
	             </div>

             <div className="pt-8">
                <Link
                  href={routes.about}
                  className="inline-block bg-merlin-black text-white px-8 py-4 rounded-full font-bold text-sm tracking-widest hover:bg-merlin-red transition-all shadow-xl shadow-black/20"
	                >
	                  {isEn ? 'LEARN MORE ABOUT MERLIN' : 'EN SAVOIR PLUS SUR MERLIN'}
	                </Link>
	             </div>
	          </div>
	        </div>
	      </section>

	      {/* Testimonials */}
	      <section className="py-24 px-6 md:px-12 bg-white">
	        <div className="max-w-7xl mx-auto space-y-12">
	          <div className="text-center space-y-4">
	            <span className="text-merlin-red font-black text-xs uppercase tracking-widest">{isEn ? 'Client reviews' : 'Avis Clients'}</span>
	            <h2 className="text-4xl md:text-6xl font-black font-outfit uppercase">{isEn ? 'TESTIMONIALS' : 'TÉMOIGNAGES'}</h2>
	            <p className="text-gray-500 max-w-3xl mx-auto">
	              {isEn ? 'Customer satisfaction is at the heart of our daily commitment.' : 'La satisfaction de nos clients est au cœur de notre engagement quotidien.'}
	            </p>
	          </div>

	          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
	            {[
	              {
	                name: isEn ? 'Construction client in Kribi' : 'Client BTP à Kribi',
	                role: isEn ? 'Site supply' : 'Approvisionnement chantier',
	                quote: isEn ? 'MERLIN supplies materials quickly, with reliable end-to-end order tracking.' : 'MERLIN nous fournit rapidement les matériaux, et le suivi des commandes est très sérieux jusqu\'à la livraison finale.',
	              },
	              {
	                name: isEn ? 'Private client' : 'Cliente Particulière',
	                role: isEn ? 'Home construction project' : 'Projet de construction maison',
	                quote: isEn ? 'Affordable pricing, professional team, and progressive purchasing based on project progress.' : 'Les prix sont accessibles, l\'équipe est professionnelle et nous avons apprécié la possibilité d\'achat progressif selon l\'avancement du projet.',
	              },
	              {
	                name: isEn ? 'Local contractor' : 'Entrepreneur Local',
	                role: isEn ? 'Works and logistics' : 'Travaux et logistique',
	                quote: isEn ? 'Responsive support, fast deliveries and available truck fleet. A true local solution in Kribi.' : 'Service client réactif, livraisons rapides et flotte de camions disponible. Une vraie solution de proximité à Kribi.',
	              },
	            ].map((review, i) => (
	              <motion.div
	                key={i}
	                initial={{ opacity: 0, y: 20 }}
	                whileInView={{ opacity: 1, y: 0 }}
	                transition={{ delay: i * 0.1 }}
	                viewport={{ once: true }}
	                className="bg-merlin-gray/50 border border-gray-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-lg transition-all"
	              >
	                <p className="text-merlin-yellow text-lg tracking-[0.2em] mb-4">★★★★★</p>
	                <p className="text-gray-700 leading-relaxed mb-6">{review.quote}</p>
	                <div className="pt-4 border-t border-gray-200">
	                  <p className="font-black text-merlin-black uppercase text-sm">{review.name}</p>
	                  <p className="text-gray-500 text-xs uppercase tracking-widest mt-1">{review.role}</p>
	                </div>
	              </motion.div>
	            ))}
	          </div>
	        </div>
	      </section>

      {/* CTA Section */}
      <section className="bg-merlin-green py-20 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8 text-white">
           <h2 className="text-4xl md:text-5xl font-black font-outfit uppercase">{isEn ? 'Need a reliable partner for your project?' : 'Besoin d\'un partenaire fiable pour votre projet ?'}</h2>
           <p className="text-xl text-white/80 max-w-2xl mx-auto">{isEn ? 'Join the hundreds of customers who trust MERLIN for service excellence in Kribi.' : 'Rejoignez les centaines de clients qui font confiance à MERLIN pour l\'excellence de ses services à Kribi.'}</p>
           <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href={routes.contact} className="w-full sm:w-auto bg-white text-merlin-green px-8 py-4 rounded-full font-black text-base sm:text-lg hover:scale-105 transition-transform shadow-2xl uppercase tracking-widest">
                 {isEn ? 'Start my project' : 'Démarrer mon projet'}
              </Link>
              <a href="tel:+237695425970" className="w-full sm:w-auto text-center bg-merlin-black/20 border-2 border-white/30 text-white px-8 py-4 rounded-full font-black text-base sm:text-lg hover:bg-white/10 transition-colors uppercase tracking-widest">
                 {isEn ? 'Call us' : 'Nous appeler'}
              </a>
           </div>
        </div>
      </section>
    </div>
  );
};
