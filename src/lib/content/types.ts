import type { Agency, ProductFamily, Service } from '../../types';

export type ContentType = 'hero' | 'services' | 'products' | 'agencies';

export type HeroSlide = {
  id: string;
  image: string;
  alt: string;
};

export type ContentMap = {
  hero: HeroSlide[];
  services: Service[];
  products: ProductFamily[];
  agencies: Agency[];
};
