export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  category: 'construction' | 'transport' | 'commerce' | 'logistique' | 'negoce';
}

export interface Agency {
  id: string;
  name: string;
  phone: string;
  location: string;
  address?: string;
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
  description: string;
  images: string[];
}
