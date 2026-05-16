export type ServiceIcon =
  | 'settings'
  | 'truck'
  | 'shopping-bag'
  | 'bar-chart-3'
  | 'shield'
  | 'check-circle'
  | 'clock'
  | 'map-pin';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: ServiceIcon;
  category: 'construction' | 'transport' | 'commerce' | 'logistique' | 'negoce';
}

export interface Agency {
  id: string;
  name: string;
  phone: string;
  location: string;
  address?: string;
  mapQuery?: string;
}

export interface Realization {
  id: string;
  title: string;
  image: string;
  category: string;
}

export interface ProductFamily {
  id: string;
  slug: string;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  images: string[];
}
