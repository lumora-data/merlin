import { Service, Agency, Realization, ProductFamily } from './types';
import servicesData from '../content/services.json';
import agenciesData from '../content/agencies.json';
import productsData from '../content/products.json';

const asset = (path: string) => encodeURI(path);

export const SERVICES: Service[] = (servicesData as Service[]).map((service) => ({
  ...service,
  icon: service.icon,
}));

export const AGENCIES: Agency[] = agenciesData as Agency[];

export const REALIZATIONS: Realization[] = [
  {
    id: '1',
    title: 'Réalisation chantier 1',
    image: asset('/images/realisations/PHOTO-2026-05-04-17-23-49.jpg'),
    category: 'Construction',
  },
  {
    id: '2',
    title: 'Réalisation chantier 2',
    image: asset('/images/realisations/PHOTO-2026-05-04-17-23-49 2.jpg'),
    category: 'Construction',
  },
  {
    id: '3',
    title: 'Réalisation chantier 3',
    image: asset('/images/realisations/PHOTO-2026-05-04-17-23-49 3.jpg'),
    category: 'Construction',
  },
  {
    id: '4',
    title: 'Réalisation chantier 4',
    image: asset('/images/realisations/PHOTO-2026-05-04-17-23-50.jpg'),
    category: 'Construction',
  },
  {
    id: '5',
    title: 'Réalisation chantier 5',
    image: asset('/images/realisations/PHOTO-2026-05-04-17-23-52.jpg'),
    category: 'Construction',
  },
  {
    id: '6',
    title: 'Réalisation chantier 6',
    image: asset('/images/realisations/PHOTO-2026-05-04-17-23-53.jpg'),
    category: 'Construction',
  },
  {
    id: '7',
    title: 'Réalisation chantier 7',
    image: asset('/images/realisations/PHOTO-2026-05-04-17-23-53 2.jpg'),
    category: 'Construction',
  },
];

export const PRODUCT_FAMILIES: ProductFamily[] = (productsData as ProductFamily[]).map((family) => ({
  ...family,
  images: family.images.map((image) => asset(image)),
}));
