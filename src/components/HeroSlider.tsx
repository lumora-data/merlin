'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { PRODUCT_FAMILIES } from '../constants';
import type { Locale } from '../lib/i18n';
import { ROUTES } from '../lib/i18n';
import { localizeProductFamilies } from '../lib/localized-content';
import heroData from '../../content/hero.json';

type Slide = {
  id: string;
  image: string;
  alt: string;
};

const heroSlides: Slide[] = (heroData as Slide[]).map((slide) => ({
  ...slide,
  image: encodeURI(slide.image),
}));

export const HeroSlider = ({ locale = 'fr' }: { locale?: Locale }) => {
  const isEn = locale === 'en';
  const routes = ROUTES[locale];
  const localizedFamilies = localizeProductFamilies(PRODUCT_FAMILIES, locale);

  const productSlides: Slide[] = localizedFamilies.flatMap((family) =>
    family.images.map((image, index) => ({
      id: `product-${family.slug}-${index}`,
      image,
      alt: family.title,
    })),
  );

  const slides: Slide[] = [...heroSlides, ...productSlides];
  const [current, setCurrent] = React.useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  React.useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, []);

  const getVisibleIndices = () => {
    return [
      current % slides.length,
      (current + 1) % slides.length,
      (current + 2) % slides.length,
    ];
  };

  const visibleIndices = getVisibleIndices();

  return (
    <section className="relative w-full bg-white py-8 px-4 sm:px-6 md:px-12 group overflow-hidden">
      <div className="max-w-7xl mx-auto relative h-[260px] sm:h-[300px] md:h-[450px]">
        <button
          onClick={prev}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-merlin-black/90 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-30 hover:scale-110 shadow-xl"
          aria-label={isEn ? 'Previous image' : 'Image précédente'}
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <button
          onClick={next}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-merlin-black/90 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-30 hover:scale-110 shadow-xl"
          aria-label={isEn ? 'Next image' : 'Image suivante'}
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <div className="w-full h-full flex gap-4 md:gap-12 lg:gap-24">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              layout
              key={`mobile-${slides[current].id}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className="flex md:hidden w-full h-full rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white"
            >
              <Link href={routes.products} className="w-full h-full">
                <img src={slides[current].image} className="w-full h-full object-cover" alt={slides[current].alt} />
              </Link>
            </motion.div>

            {visibleIndices.map((index, i) => (
              <motion.div
                layout
                key={`desktop-${slides[index].id}-${i}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="hidden md:flex flex-1 h-full rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white group/slide"
              >
                <Link href={routes.products} className="w-full h-full relative">
                  <img
                    src={slides[index].image}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/slide:scale-110"
                    alt={slides[index].alt}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-merlin-black/80 to-transparent opacity-0 group-hover/slide:opacity-100 transition-opacity">
                    <span className="text-merlin-green font-black text-[10px] tracking-widest uppercase">{isEn ? 'View our products' : 'Voir nos produits'}</span>
                    <h4 className="text-white font-bold uppercase truncate">{isEn ? 'Merlin catalog' : 'Catalogue Merlin'}</h4>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex justify-center gap-3 mt-8">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all ${current === i ? 'bg-merlin-green w-10' : 'bg-gray-300 w-2'}`}
            aria-label={isEn ? `Go to image ${i + 1}` : `Aller à l'image ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
