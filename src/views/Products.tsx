'use client';

import React from 'react';
import { PRODUCT_FAMILIES } from '../constants';
import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import type { Locale } from '../lib/i18n';
import { ROUTES } from '../lib/i18n';
import { localizeProductFamilies } from '../lib/localized-content';
import type { ProductFamily } from '../types';

type ProductsPageProps = {
  locale?: Locale;
  products?: ProductFamily[];
};

export const ProductsPage = ({ locale = 'fr', products = PRODUCT_FAMILIES }: ProductsPageProps) => {
  const isEn = locale === 'en';
  const routes = ROUTES[locale];
  const productFamilies = localizeProductFamilies(products, locale);

  return (
    <div className="bg-merlin-gray min-h-screen pb-24">
      {/* Dynamic Banner */}
      <div className="bg-white pt-24 pb-32 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-merlin-green/5 skew-x-12 translate-x-20" />
        <div className="max-w-7xl mx-auto relative z-10 text-center md:text-left">
          <div className="inline-block mb-6">
            <span className="text-merlin-green font-black text-xs uppercase tracking-[0.3em] px-6 py-2 bg-green-50 rounded-full border border-green-100 shadow-sm">
              {isEn ? '2024 Collections' : 'Collections 2024'}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-8xl font-black font-outfit uppercase leading-[0.9]">
            {isEn ? 'OUR' : 'NOS'} <span className="text-merlin-red">{isEn ? 'PRODUCTS' : 'PRODUITS'}</span><br />
            <span className="text-merlin-black/10">{isEn ? 'SELECTED' : 'SÉLECTIONNÉS'}</span>
          </h1>
          <p className="mt-6 text-gray-500 max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed font-medium italic">
            {isEn
              ? '"Uncompromising quality for builders in Kribi. Every material is rigorously tested to last."'
              : '"La qualité sans compromis pour les bâtisseurs de Kribi. Chaque matériau est rigoureusement testé pour durer."'}
          </p>
        </div>
      </div>

      {/* Modern Grid Layout */}
      <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {productFamilies.map((family, i) => (
            <motion.div
              key={family.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className="group bg-white rounded-[3rem] overflow-hidden shadow-xl hover:shadow-3xl transition-all duration-500 flex flex-col h-[550px] border border-white"
            >
              <div className="h-[320px] relative overflow-hidden">
                <img
                  src={family.images[0]}
                  alt={family.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-merlin-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Floating Info */}
                <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                   <span className="text-merlin-green font-black text-[9px] uppercase tracking-widest bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-white">
                      {isEn ? 'Merlin certified' : 'Certifié Merlin'}
                   </span>
                </div>
              </div>
              
              <div className="p-10 flex flex-col flex-1 bg-white relative">
                <div className="absolute -top-12 right-10 w-24 h-24 bg-merlin-red rounded-full flex items-center justify-center text-white shadow-2xl scale-0 group-hover:scale-100 transition-transform duration-500 rotate-12">
                   <ShoppingCart className="w-8 h-8" />
                </div>
                
                <h3 className="text-2xl font-black mb-4 uppercase tracking-tight text-merlin-black leading-tight group-hover:text-merlin-red transition-colors">
                  {family.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-1 line-clamp-3 italic font-medium">
                  {family.description}
                </p>
                
                <Link
                  href={`${routes.products}/${family.slug}`}
                  className="w-full py-5 rounded-2xl bg-merlin-gray text-merlin-black font-black text-xs tracking-[0.2em] text-center group-hover:bg-merlin-black group-hover:text-white transition-all flex items-center justify-center gap-3 uppercase"
                >
                  {isEn ? 'Range details' : 'Détails de la gamme'} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-6 mt-24">
        <div className="bg-merlin-green rounded-[3rem] p-12 md:p-20 text-white flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
           <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-black font-outfit uppercase">{isEn ? 'Need a bulk quote?' : 'Besoin d\'un devis groupé ?'}</h2>
              <p className="text-white/70 text-lg">{isEn ? 'Send us your materials list and get a personalized offer.' : 'Envoyez-nous votre liste de matériaux et recevez une offre personnalisée.'}</p>
           </div>
           <Link
             href={routes.contact}
             className="w-full sm:w-auto bg-white text-merlin-green px-8 py-4 sm:px-12 sm:py-6 rounded-full font-black text-base sm:text-xl hover:scale-105 transition-transform shadow-2xl uppercase tracking-widest"
           >
              {isEn ? 'Contact Merlin' : 'Contacter Merlin'}
           </Link>
        </div>
      </div>
    </div>
  );
};
