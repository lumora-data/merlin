'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { PRODUCT_FAMILIES } from '../constants';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, CheckCircle2, ShieldCheck, Truck, ShoppingCart } from 'lucide-react';
import type { Locale } from '../lib/i18n';
import { ROUTES } from '../lib/i18n';
import { localizeProductFamilies, localizeProductFamily } from '../lib/localized-content';

export const ProductDetailPage = ({ locale = 'fr' }: { locale?: Locale }) => {
  const params = useParams<{ slug: string | string[] }>();
  const router = useRouter();
  const isEn = locale === 'en';
  const routes = ROUTES[locale];
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;
  const rawProduct = PRODUCT_FAMILIES.find((p) => p.slug === slug);
  const product = rawProduct ? localizeProductFamily(rawProduct, locale) : undefined;
  const localizedProducts = localizeProductFamilies(PRODUCT_FAMILIES, locale);

  const [activeImage, setActiveImage] = React.useState(0);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-black mb-4">{isEn ? 'PRODUCT NOT FOUND' : 'PRODUIT NON TROUVÉ'}</h1>
        <p className="text-gray-500 mb-8">{isEn ? 'Sorry, the product family you are looking for does not exist or has been moved.' : 'Désolé, la famille de produits que vous recherchez n\'existe pas ou a été déplacée.'}</p>
        <Link href={routes.products} className="bg-merlin-black text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-merlin-red transition-colors">
          {isEn ? 'Back to catalog' : 'Retour au catalogue'}
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumbs & Navigation */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-500 hover:text-merlin-green transition-colors font-bold uppercase text-xs tracking-widest"
        >
          <ArrowLeft className="w-4 h-4" /> {isEn ? 'Back' : 'Retour'}
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 pb-24">
        {/* Product Image Gallery */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="relative group">
            <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-8 border-merlin-gray bg-gray-100">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={activeImage}
                  src={product.images[activeImage]} 
                  alt={product.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 bg-merlin-green text-white p-8 rounded-3xl shadow-2xl max-w-[200px] z-10 hidden md:block">
              <p className="font-black text-2xl uppercase leading-tight">{isEn ? 'GUARANTEED QUALITY' : 'QUALITÉ GARANTIE'}</p>
              <p className="text-white/70 text-xs mt-2 uppercase tracking-widest font-bold">{isEn ? 'Merlin standard' : 'Standard Merlin'}</p>
            </div>
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-24 h-24 rounded-2xl overflow-hidden border-4 transition-all ${
                    activeImage === idx ? 'border-merlin-red shadow-lg scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} className="w-full h-full object-cover" alt={`${product.title} ${idx + 1}`} />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Product Info */}
        <div className="space-y-10">
          <div className="space-y-4">
            <span className="text-merlin-red font-black text-xs uppercase tracking-widest px-4 py-1 bg-red-50 rounded-full border border-red-100">{isEn ? 'Merlin Kribi catalog' : 'Catalogue Merlin Kribi'}</span>
            <h1 className="text-5xl md:text-6xl font-black font-outfit uppercase leading-none">
              {product.title.split(' ').map((word, i) => (
                <span key={i} className={i % 2 !== 0 ? 'text-merlin-green' : ''}>{word} </span>
              ))}
            </h1>
          </div>

          <div className="prose prose-lg text-gray-600 max-w-none">
            <p className="text-xl leading-relaxed italic">
              {product.description}
            </p>
            <p className="mt-6">
              {isEn ? (
                <>
                  At <strong>STE MERLIN</strong>, we carefully select our {product.title.toLowerCase()} to meet Cameroon&apos;s climate and technical requirements, especially in Kribi. Whether you are a building professional or an individual, we guarantee certified and durable products.
                </>
              ) : (
                <>
                  Chez <strong>STE MERLIN</strong>, nous sélectionnons rigoureusement nos {product.title.toLowerCase()} pour répondre aux exigences climatiques et techniques du Cameroun, particulièrement à Kribi. Que vous soyez un professionnel du bâtiment ou un particulier, nous vous garantissons des produits certifiés et durables.
                </>
              )}
            </p>
          </div>

          {/* Key Selling Points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-merlin-gray/50 border border-gray-100">
              <CheckCircle2 className="w-6 h-6 text-merlin-green shrink-0" />
              <div>
                <h4 className="font-bold uppercase text-sm">{isEn ? 'Immediate availability' : 'Disponibilité immédiate'}</h4>
                <p className="text-xs text-gray-500 mt-1">{isEn ? 'Permanent stock in our Kribi agencies.' : 'Stock permanent dans nos agences de Kribi.'}</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-merlin-gray/50 border border-gray-100">
              <Truck className="w-6 h-6 text-merlin-red shrink-0" />
              <div>
                <h4 className="font-bold uppercase text-sm">{isEn ? 'Express delivery' : 'Livraison express'}</h4>
                <p className="text-xs text-gray-500 mt-1">{isEn ? 'Delivery to your site in less than 24h.' : 'Livraison sur votre chantier en moins de 24h.'}</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-merlin-gray/50 border border-gray-100">
              <ShieldCheck className="w-6 h-6 text-merlin-green shrink-0" />
              <div>
                <h4 className="font-bold uppercase text-sm">{isEn ? 'Pro certification' : 'Certification Pro'}</h4>
                <p className="text-xs text-gray-500 mt-1">{isEn ? 'Materials compliant with international standards.' : 'Matériaux conformes aux normes internationales.'}</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-merlin-gray/50 border border-gray-100">
              <ShoppingCart className="w-6 h-6 text-merlin-red shrink-0" />
              <div>
                <h4 className="font-bold uppercase text-sm">{isEn ? 'Competitive prices' : 'Prix compétitifs'}</h4>
                <p className="text-xs text-gray-500 mt-1">{isEn ? 'The best value for money in the market.' : 'Le meilleur rapport qualité/prix du marché.'}</p>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <a
              href={`https://wa.me/237695425970?text=${encodeURIComponent(
                isEn
                  ? `Hello MERLIN Cameroun, I would like to check availability for this product family: ${product.title}.`
                  : `Bonjour MERLIN Cameroun, je souhaiterais vérifier la disponibilité de la famille de produits : ${product.title}. Pouvez-vous me renseigner ?`,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-4 bg-[#25D366] text-white px-8 py-4 sm:px-10 sm:py-6 rounded-full font-black text-sm sm:text-lg hover:scale-105 transition-all shadow-xl shadow-green-500/20 uppercase tracking-widest"
            >
              {isEn ? 'Check availability' : 'Vérifier la disponibilité'} 
              <svg className="w-6 h-6 fill-current" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.2-8.5-44.2-27.3-16.4-14.6-27.4-32.7-30.6-38.2-3.2-5.6-.3-8.6 2.4-11.4 2.5-2.5 5.5-6.5 8.3-9.7 2.8-3.3 3.7-5.6 5.5-9.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.2 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.8 23.5 9.2 31.5 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Related Products / More Categories */}
      <section className="bg-merlin-gray py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl font-black uppercase">{isEn ? 'Other' : 'Autres'} <span className="text-merlin-red">{isEn ? 'Categories' : 'Catégories'}</span></h2>
            <Link href={routes.products} className="text-merlin-green font-bold uppercase text-sm hover:underline">{isEn ? 'View full catalog' : 'Voir tout le catalogue'}</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {localizedProducts.filter((p) => p.id !== product.id).slice(0, 4).map((other) => (
              <Link 
                key={other.id} 
                href={`${routes.products}/${other.slug}`}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
              >
                <div className="h-40 overflow-hidden">
                  <img src={other.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={other.title} />
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-sm uppercase truncate text-center group-hover:text-merlin-green">{other.title}</h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
