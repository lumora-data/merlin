'use client';

import React from 'react';
import { AGENCIES } from '../constants';
import { motion } from 'motion/react';
import { Phone, MapPin, Clock } from 'lucide-react';
import type { Locale } from '../lib/i18n';
import { localizeAgencies } from '../lib/localized-content';

export const AgenciesPage = ({ locale = 'fr' }: { locale?: Locale }) => {
  const isEn = locale === 'en';
  const agencies = localizeAgencies(AGENCIES, locale);

  return (
    <div className="bg-merlin-gray min-h-screen pb-24">
      {/* Banner */}
      <div className="bg-white py-16 md:py-24 px-6 text-center border-b border-gray-100">
        <div className="max-w-7xl mx-auto space-y-6">
          <span className="text-merlin-red font-black text-xs uppercase tracking-widest px-4 py-1 bg-red-50 rounded-full border border-red-100">{isEn ? 'Local presence' : 'Proximité Locale'}</span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black font-outfit uppercase">{isEn ? 'OUR' : 'NOS'} <span className="text-merlin-green">{isEn ? 'AGENCIES' : 'AGENCES'}</span></h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
            {isEn
              ? 'Find us in our service points across Kribi. Our teams are ready to support your trading, logistics and construction needs.'
              : 'Retrouvez-nous dans nos différents points de service à Kribi. Nos équipes sont prêtes à vous accueillir pour tous vos besoins en commerce, logistique et services.'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {agencies.map((agency, i) => (
            <motion.div
              key={agency.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-[2.5rem] p-10 shadow-xl hover:shadow-2xl transition-all border border-gray-100 flex flex-col md:flex-row gap-8 group"
            >
              <div className="w-full md:w-48 h-48 rounded-[2rem] bg-merlin-gray flex items-center justify-center text-merlin-green shrink-0 group-hover:bg-merlin-green group-hover:text-white transition-colors">
                 <MapPin className="w-16 h-16" />
              </div>
              <div className="flex-1 space-y-6">
                <div>
                  <h3 className="text-2xl font-black text-merlin-black uppercase">{agency.name}</h3>
                  <p className="text-merlin-green font-bold text-sm tracking-widest uppercase mt-1">{agency.location}</p>
                </div>

                <div className="space-y-4 pt-4 border-t border-gray-100 text-gray-500">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gray-300" />
                    <span className="text-sm font-medium">{isEn ? 'Open: Monday to Saturday, 07:30 — 18:00 (holidays included)' : 'Ouvert : Lundi à samedi, 07:30 — 18:00 (jours fériés inclus)'}</span>
                  </div>
                  {agency.address && (
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-gray-300" />
                      <span className="text-sm font-medium">{agency.address}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-300" />
                    <span className="text-sm font-bold text-merlin-black">{agency.phone}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  <a
                    href={`tel:${agency.phone.replace(/\s/g, '')}`}
                    className="flex-1 min-w-[140px] bg-merlin-black text-white text-center py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-merlin-red transition-all flex items-center justify-center gap-2"
                  >
                    {isEn ? 'Call' : 'Appeler'} <Phone className="w-4 h-4" />
                  </a>
                  <a
                    href="https://wa.me/237695425970"
                    className="flex-1 min-w-[140px] bg-[#25D366] text-white text-center py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all flex items-center justify-center gap-2"
                  >
                    WhatsApp 
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.2-8.5-44.2-27.3-16.4-14.6-27.4-32.7-30.6-38.2-3.2-5.6-.3-8.6 2.4-11.4 2.5-2.5 5.5-6.5 8.3-9.7 2.8-3.3 3.7-5.6 5.5-9.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.2 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.8 23.5 9.2 31.5 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                    </svg>
                  </a>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* Global Support Info */}
        <div className="mt-20 bg-merlin-black rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden text-center md:text-left">
           <div className="absolute top-0 right-0 w-64 h-64 bg-merlin-green/20 blur-[100px]" />
           <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-5xl font-black font-outfit uppercase">{isEn ? 'CENTRALIZED' : 'SERVICE CLIENT'} <span className="text-merlin-red">{isEn ? 'SUPPORT' : 'CENTRALISÉ'}</span></h2>
                <p className="text-gray-400 text-lg leading-relaxed">
                  {isEn
                    ? 'For any urgent request or quote about logistics and construction services, contact our head office directly.'
                    : 'Pour toute demande urgente ou pour un devis concernant nos services de logistique et de construction, contactez notre siège directement.'}
                </p>
                <div className="pt-4 flex flex-col md:flex-row gap-8">
                   <div className="space-y-2">
                      <span className="text-xs font-black uppercase tracking-widest text-merlin-green">{isEn ? 'Email' : 'Email'}</span>
                      <p className="text-xl font-bold">merlincameroun@gmail.com</p>
                   </div>
                   <div className="space-y-2">
                       <span className="text-xs font-black uppercase tracking-widest text-merlin-red">WhatsApp</span>
                       <p className="text-xl font-bold">+237 695 42 59 70</p>
                   </div>
                </div>
              </div>
              <div className="flex justify-center md:justify-end">
                 <div className="w-48 h-48 rounded-full border-8 border-merlin-green flex items-center justify-center bg-white/5 backdrop-blur">
                    <span className="text-4xl font-black text-merlin-green">{isEn ? '24/7' : '24h/24'}</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
