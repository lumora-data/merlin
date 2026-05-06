'use client';

import React from 'react';
import { REALIZATIONS } from '../constants';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2 } from 'lucide-react';
import Link from 'next/link';
import type { Locale } from '../lib/i18n';
import { ROUTES } from '../lib/i18n';
import { localizeRealizations } from '../lib/localized-content';

export const RealizationsPage = ({ locale = 'fr' }: { locale?: Locale }) => {
  const isEn = locale === 'en';
  const routes = ROUTES[locale];
  const realizations = localizeRealizations(REALIZATIONS, locale);

  return (
    <div className="bg-merlin-gray min-h-screen pb-24">
      {/* Banner */}
      <div className="bg-white py-16 md:py-24 px-6 text-center border-b border-gray-100">
        <div className="max-w-7xl mx-auto space-y-6">
          <span className="text-merlin-yellow font-black text-xs uppercase tracking-widest px-4 py-1 bg-yellow-50 rounded-full border border-yellow-100">{isEn ? 'Our expertise in pictures' : 'Notre Expertise en Images'}</span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black font-outfit uppercase">{isEn ? 'OUR' : 'NOS'} <span className="text-merlin-red">{isEn ? 'PROJECTS' : 'RÉALISATIONS'}</span></h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
            {isEn
              ? 'Browse our gallery of successful projects. Every image reflects our commitment to quality and customer satisfaction.'
              : 'Parcourez notre galerie de projets réussis. Chaque image témoigne de notre engagement envers la qualité et la satisfaction client.'}
          </p>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-6 mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {realizations.map((item, i) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl group cursor-pointer relative"
            >
              <div className="aspect-[4/5] overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-x-4 bottom-4 top-4 bg-merlin-black/90 backdrop-blur rounded-[2rem] opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center text-center p-8 scale-95 group-hover:scale-100">
                  <div className="w-14 h-14 rounded-full bg-merlin-green flex items-center justify-center text-white mb-6">
                    <Maximize2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 uppercase">{item.title}</h3>
                  <span className="text-merlin-green font-black text-xs uppercase tracking-[0.2em]">{item.category}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Success Banner */}
      <div className="max-w-7xl mx-auto px-6 mt-24">
         <div className="bg-merlin-red rounded-[3rem] p-12 md:p-20 text-white flex flex-col md:flex-row items-center justify-between gap-12 font-outfit">
            <div className="space-y-4 text-center md:text-left">
               <h2 className="text-4xl md:text-6xl font-black uppercase leading-tight">{isEn ? 'Your project deserves' : 'Votre projet mérite'} <br /> {isEn ? 'MERLIN excellence' : 'l\'excellence MERLIN'}</h2>
               <p className="text-white/70 text-lg">{isEn ? 'Trust us with your ideas, we turn them into reality.' : 'Confiez-nous vos idées, nous les transformons en réalité.'}</p>
            </div>
            <Link
              href={routes.contact}
              className="w-full sm:w-auto text-center bg-white text-merlin-red px-8 py-4 sm:px-12 sm:py-6 rounded-full font-black text-base sm:text-xl hover:scale-105 transition-transform shadow-2xl uppercase tracking-widest"
            >
               {isEn ? 'Start a project' : 'Lancer un projet'}
            </Link>
         </div>
      </div>
    </div>
  );
};
