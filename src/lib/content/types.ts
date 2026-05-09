import type { Agency, ProductFamily, Service } from '../../types';

export type ContentType = 'hero' | 'services' | 'products' | 'agencies' | 'quotes';

export type HeroSlide = {
  id: string;
  image: string;
  alt: string;
};

export type QuoteRequest = {
  id: string;
  submittedAt: string;
  fullName: string;
  email: string;
  phone: string;
  service: string;
  serviceLabel: string;
  message: string;
  locale: 'fr' | 'en';
};

export type ContentMap = {
  hero: HeroSlide[];
  services: Service[];
  products: ProductFamily[];
  agencies: Agency[];
  quotes: QuoteRequest[];
};
