import type { Agency, ProductFamily, Realization, Service } from '../types';
import type { Locale } from './i18n';

const PRODUCT_EN: Record<string, { title: string; description: string }> = {
  'carrelage-revetements': {
    title: 'Tiles & Finishes',
    description:
      'High-quality tile supply in Kribi. Discover our selection for floors and walls, indoors and outdoors.',
  },
  sanitaires: {
    title: 'Sanitary Ware',
    description:
      'Design your bathroom with reliable, durable sanitary equipment for residential and professional projects.',
  },
  'peinture-accessoires': {
    title: 'Paint & Accessories',
    description:
      'Acrylic paint, coatings and accessories for clean, durable finishes indoors and outdoors.',
  },
  ciment: {
    title: 'Cement',
    description:
      'High-performance cement for structural works, foundations, columns and slabs with excellent strength.',
  },
  'materiel-de-soudure': {
    title: 'Welding Materials',
    description: 'Welding rods and materials in different sections for metalworkers and fabricators.',
  },
  outillages: {
    title: 'Tools',
    description:
      'Professional hand and power tools: hammers, drills, grinders and accessories for job sites.',
  },
  'fixation-quincaillerie': {
    title: 'Fasteners & General Hardware',
    description:
      'Nails, screws, locks and hardware accessories for finishing, safety and assembly works.',
  },
  'portes-accessoires': {
    title: 'Doors & Accessories',
    description:
      'Door ranges with installation accessories, locks and hardware for robust and secure setups.',
  },
  'cuisine-electromenager': {
    title: 'Kitchen & Appliances',
    description:
      'Modern kitchen equipment and appliances for households, retail and professional spaces.',
  },
  soudure: {
    title: 'Welding',
    description:
      'Welding machines, discs and consumables for precise and durable metal fabrication work.',
  },
  'pompes-hydraulique': {
    title: 'Pumps & Hydraulic Equipment',
    description:
      'Submersible pumps, booster pumps and hydraulic systems for supply, lifting and irrigation.',
  },
  'stockage-reservoirs': {
    title: 'Storage & Tanks',
    description:
      'Tanks and storage solutions for water and liquids, suitable for home and professional needs.',
  },
  etancheite: {
    title: 'Waterproofing Products',
    description:
      'Waterproofing products and hydrophobic treatments to protect roofs, slabs and facades from leaks.',
  },
  'couverture-toiture': {
    title: 'Roofing & Sheet Metal',
    description:
      'Roof sheets, ridge caps and roofing accessories for strong, durable coverage in local climate conditions.',
  },
  menuiserie: {
    title: 'Carpentry',
    description:
      'Plywood, panels and accessories for carpentry, interior fitting and wood finishing works.',
  },
};

const SERVICE_EN: Record<string, { title: string; description: string }> = {
  '1': {
    title: 'Construction',
    description: 'Expertise in residential, commercial and industrial building construction.',
  },
  '2': {
    title: 'Logistics & Transport',
    description: 'Road transport services and complete logistics solutions across Cameroon.',
  },
  '3': {
    title: 'General Trading',
    description: 'Sale and distribution of high-quality construction materials in Kribi.',
  },
  '4': {
    title: 'Trading',
    description: 'Commercial intermediation and trading of high-quality products.',
  },
};

const REALIZATION_EN: Record<string, string> = {
  '1': 'Project site 1',
  '2': 'Project site 2',
  '3': 'Project site 3',
  '4': 'Project site 4',
  '5': 'Project site 5',
  '6': 'Project site 6',
  '7': 'Project site 7',
};

const AGENCY_ADDRESS_EN: Record<string, string> = {
  'Près de la station Bocom': 'Near Bocom station',
  'Près de la sous-préfecture': 'Near the sub-prefecture',
  'Après Hysacam': 'After Hysacam',
};

export const localizeProductFamily = (family: ProductFamily, locale: Locale): ProductFamily => {
  if (locale !== 'en') return family;
  const translated = PRODUCT_EN[family.slug];
  if (!translated) return family;
  return {
    ...family,
    title: translated.title,
    description: translated.description,
  };
};

export const localizeProductFamilies = (items: ProductFamily[], locale: Locale): ProductFamily[] =>
  items.map((item) => localizeProductFamily(item, locale));

export const localizeService = (service: Service, locale: Locale): Service => {
  if (locale !== 'en') return service;
  const translated = SERVICE_EN[service.id];
  if (!translated) return service;
  return {
    ...service,
    title: translated.title,
    description: translated.description,
  };
};

export const localizeServices = (items: Service[], locale: Locale): Service[] =>
  items.map((item) => localizeService(item, locale));

export const localizeRealization = (item: Realization, locale: Locale): Realization => {
  if (locale !== 'en') return item;
  return {
    ...item,
    title: REALIZATION_EN[item.id] ?? item.title,
    category: item.category === 'Construction' ? 'Construction' : item.category,
  };
};

export const localizeRealizations = (items: Realization[], locale: Locale): Realization[] =>
  items.map((item) => localizeRealization(item, locale));

export const localizeAgency = (agency: Agency, locale: Locale): Agency => {
  if (locale !== 'en') return agency;
  return {
    ...agency,
    address: agency.address ? AGENCY_ADDRESS_EN[agency.address] ?? agency.address : agency.address,
  };
};

export const localizeAgencies = (items: Agency[], locale: Locale): Agency[] =>
  items.map((item) => localizeAgency(item, locale));
