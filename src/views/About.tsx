'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Target, Eye, Heart, Award, Users, Globe } from 'lucide-react';
import type { Locale } from '../lib/i18n';

export const AboutPage = ({ locale = 'fr' }: { locale?: Locale }) => {
  const isEn = locale === 'en';

  return (
    <div className="bg-merlin-gray min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 px-6 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <span className="text-merlin-red font-black text-xs uppercase tracking-widest px-4 py-1 bg-red-50 rounded-full border border-red-100">{isEn ? 'Who are we?' : 'Qui sommes-nous ?'}</span>
            <h1 className="text-4xl sm:text-5xl md:text-8xl font-black font-outfit uppercase leading-[0.9]">{isEn ? 'DISCOVER' : 'DÉCOUVREZ'} <br /><span className="text-merlin-green">MERLIN</span> CAMEROUN</h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-500 leading-relaxed max-w-xl">
              {isEn
                ? 'MERLIN Cameroun is a Kribi-based company specialized in construction, logistics, transport, general trading and commerce. We support individuals, companies and organizations with fast, reliable and efficient services.'
                : 'MERLIN Cameroun est une entreprise basée à Kribi spécialisée dans la construction, la logistique, le transport, le commerce général et le négoce. Elle accompagne les particuliers, entreprises et organisations avec des services rapides, fiables et efficaces.'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="aspect-square rounded-[4rem] overflow-hidden shadow-2xl relative z-10">
              <img
                src={encodeURI('/images/about/about-us-01.jpg')}
                alt="Construction Project"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-merlin-yellow rounded-[3rem] -z-0 hidden md:block" />
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-merlin-green/10 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             {
               icon: Target,
               title: isEn ? 'Our Mission' : 'Notre Mission',
               text: isEn ? 'Deliver high-quality construction and logistics services focused on speed and operational efficiency.' : 'Fournir des services de construction et de logistique de haute qualité, en mettant l\'accent sur la rapidité d\'exécution et l\'efficacité opérationnelle.',
               color: 'bg-merlin-red'
             },
             {
               icon: Eye,
               title: isEn ? 'Our Vision' : 'Notre Vision',
               text: isEn ? 'Become a leading reference in Cameroon for general trading and transport, recognized for professionalism and strong local roots in Kribi.' : 'Devenir la référence incontournable au Cameroun pour le commerce général et le transport, reconnue pour son professionnalisme et son ancrage local à Kribi.',
               color: 'bg-merlin-green'
             },
             {
               icon: Heart,
               title: isEn ? 'Our Values' : 'Nos Valeurs',
               text: isEn ? 'Trust, speed, efficiency and professionalism guide each action and interaction with our partners.' : 'Confiance, Rapidité, Efficacité et Professionnalisme guident chacune de nos actions et interactions avec nos partenaires.',
               color: 'bg-merlin-black'
             }
           ].map((item, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               viewport={{ once: true }}
               className="bg-white p-12 rounded-[3rem] shadow-xl border border-gray-100 hover:-translate-y-2 transition-all group"
             >
               <div className={`w-16 h-16 ${item.color} rounded-3xl flex items-center justify-center text-white mb-8 group-hover:rotate-12 transition-transform shadow-lg`}>
                  <item.icon className="w-8 h-8" />
               </div>
               <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">{item.title}</h3>
               <p className="text-gray-500 leading-relaxed">{item.text}</p>
             </motion.div>
           ))}
        </div>
      </section>

      {/* Conferences */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center space-y-4">
            <span className="text-merlin-red font-black text-xs uppercase tracking-widest px-4 py-1 bg-red-50 rounded-full border border-red-100">
              {isEn ? 'Company life' : 'Vie de l\'entreprise'}
            </span>
            <h2 className="text-4xl md:text-6xl font-black font-outfit uppercase">
              {isEn ? 'CONFERENCES AT' : 'CONFÉRENCES À'} <span className="text-merlin-green">MERLIN</span>
            </h2>
            <p className="text-gray-500 max-w-3xl mx-auto">
              {isEn
                ? 'We organize and attend conferences to share expertise and strengthen proximity with our partners.'
                : 'Nous organisons et participons à des conférences pour partager nos expertises et renforcer notre proximité avec nos partenaires.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              encodeURI('/images/about/about-us-04.jpg'),
              encodeURI('/images/about/about-us-05.jpg'),
              encodeURI('/images/about/about-us-06.jpg'),
              encodeURI('/images/about/about-us-07.jpg'),
              encodeURI('/images/about/about-us-08.jpg'),
            ].map((image, i) => (
              <motion.div
                key={image}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100"
              >
                <img
                  src={image}
                  alt={isEn ? `Merlin conference ${i + 1}` : `Conférence Merlin Cameroun ${i + 1}`}
                  className="w-full h-[320px] md:h-[380px] object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Merlin? */}
      <section className="bg-merlin-black py-24 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
           <div className="space-y-8">
              <h2 className="text-4xl md:text-6xl font-black font-outfit uppercase">{isEn ? 'WHY TRUST' : 'POURQUOI NOUS'} <span className="text-merlin-red">{isEn ? 'US?' : 'FAIRE CONFIANCE ?'}</span></h2>
              <div className="space-y-6">
                 {[
                   { icon: Award, title: isEn ? 'Proven expertise' : 'Expertise Reconnue', text: isEn ? 'Years of experience in key development sectors in Cameroon.' : 'Des années d\'expérience dans les secteurs clés du développement au Cameroun.' },
                   { icon: Users, title: isEn ? 'Qualified team' : 'Équipe Qualifiée', text: isEn ? 'Passionate experts dedicated to your project success.' : 'Des experts passionnés et dévoués à la réussite de vos projets.' },
                   { icon: Globe, title: isEn ? 'National impact' : 'Impact National', text: isEn ? 'Strong presence in Kribi with intervention capacity across the country.' : 'Une présence forte à Kribi avec une capacité d\'intervention partout au pays.' }
                 ].map((feat, i) => (
                   <div key={i} className="flex gap-6 group">
                      <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-merlin-yellow shrink-0 group-hover:bg-merlin-yellow group-hover:text-merlin-black transition-all">
                        <feat.icon className="w-6 h-6" />
                      </div>
                      <div>
                         <h4 className="text-xl font-bold mb-2 uppercase tracking-wide">{feat.title}</h4>
                         <p className="text-gray-400 text-sm leading-relaxed">{feat.text}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-4 pt-12">
                     <div className="h-64 rounded-3xl overflow-hidden shadow-2xl">
                        <img src={encodeURI('/images/about/about-us-02.jpg')} className="w-full h-full object-cover" alt={isEn ? 'Merlin team' : 'Équipe Merlin'} />
                     </div>
                     <div className="h-48 rounded-3xl overflow-hidden shadow-2xl bg-merlin-red flex items-center justify-center p-8 text-center">
                        <p className="text-2xl font-black uppercase">{isEn ? 'Absolute speed' : 'Rapidité Absolue'}</p>
                     </div>
                 </div>
                 <div className="space-y-4">
                     <div className="h-48 rounded-3xl overflow-hidden shadow-2xl bg-merlin-green flex items-center justify-center p-8 text-center">
                        <p className="text-2xl font-black uppercase">{isEn ? '100% Efficient' : '100% Efficace'}</p>
                     </div>
                     <div className="h-80 rounded-3xl overflow-hidden shadow-2xl border-4 border-merlin-yellow">
                        <img src={encodeURI('/images/about/about-us-03.jpg')} className="w-full h-full object-cover" alt={isEn ? 'Merlin project' : 'Réalisation Merlin'} />
                     </div>
                 </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};
