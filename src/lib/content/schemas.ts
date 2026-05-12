import type { ContentMap, HeroSlide, QuoteRequest } from './types';
import type { Agency, ProductFamily, Service, ServiceIcon } from '../../types';
import { isValidProductSlug, toSlug } from '../slug';

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

const isNonEmptyString = (value: unknown) => typeof value === 'string' && value.trim().length > 0;

const isStringArray = (value: unknown) => Array.isArray(value) && value.every((item) => isNonEmptyString(item));

const ensureUniqueIds = (items: { id: string }[], label: string) => {
  const ids = new Set<string>();
  for (const item of items) {
    assert(!ids.has(item.id), `${label}: duplicate id "${item.id}"`);
    ids.add(item.id);
  }
};

export const validateHero = (input: unknown): HeroSlide[] => {
  assert(Array.isArray(input), 'Hero must be an array');
  const hero = input.map((item, index) => {
    assert(item && typeof item === 'object', `Hero item ${index + 1} must be an object`);
    const typed = item as HeroSlide;
    assert(isNonEmptyString(typed.id), `Hero item ${index + 1}: id is required`);
    assert(isNonEmptyString(typed.image), `Hero item ${index + 1}: image is required`);
    assert(isNonEmptyString(typed.alt), `Hero item ${index + 1}: alt is required`);
    return {
      id: typed.id.trim(),
      image: typed.image.trim(),
      alt: typed.alt.trim(),
    };
  });

  ensureUniqueIds(hero, 'Hero');
  return hero;
};

const SERVICE_CATEGORIES = ['construction', 'transport', 'commerce', 'logistique', 'negoce'] as const;
const SERVICE_ICONS = ['settings', 'truck', 'shopping-bag', 'bar-chart-3', 'shield', 'check-circle', 'clock', 'map-pin'] as const;

const DEFAULT_SERVICE_ICON_BY_CATEGORY: Record<Service['category'], ServiceIcon> = {
  construction: 'settings',
  transport: 'truck',
  commerce: 'shopping-bag',
  logistique: 'truck',
  negoce: 'bar-chart-3',
};

const normalizeServiceIcon = (icon: unknown, category: Service['category']): ServiceIcon => {
  if (isNonEmptyString(icon) && SERVICE_ICONS.includes(icon as (typeof SERVICE_ICONS)[number])) {
    return icon as ServiceIcon;
  }

  return DEFAULT_SERVICE_ICON_BY_CATEGORY[category];
};

export const validateServices = (input: unknown): Service[] => {
  assert(Array.isArray(input), 'Services must be an array');
  const services = input.map((item, index) => {
    assert(item && typeof item === 'object', `Service ${index + 1} must be an object`);
    const typed = item as Service;
    assert(isNonEmptyString(typed.id), `Service ${index + 1}: id is required`);
    assert(isNonEmptyString(typed.title), `Service ${index + 1}: title is required`);
    assert(isNonEmptyString(typed.description), `Service ${index + 1}: description is required`);
    assert(SERVICE_CATEGORIES.includes(typed.category as (typeof SERVICE_CATEGORIES)[number]), `Service ${index + 1}: invalid category`);
    const serviceCategory = typed.category as Service['category'];

    const legacyImageField = (item as { image?: unknown }).image;
    const serviceIcon = normalizeServiceIcon((item as { icon?: unknown }).icon ?? legacyImageField, serviceCategory);

    return {
      id: typed.id.trim(),
      title: typed.title.trim(),
      description: typed.description.trim(),
      icon: serviceIcon,
      category: serviceCategory,
    };
  });

  ensureUniqueIds(services, 'Services');
  return services;
};

export const validateProducts = (input: unknown): ProductFamily[] => {
  assert(Array.isArray(input), 'Products must be an array');
  const products = input.map((item, index) => {
    assert(item && typeof item === 'object', `Product ${index + 1} must be an object`);
    const typed = item as ProductFamily;
    assert(isNonEmptyString(typed.id), `Product ${index + 1}: id is required`);
    assert(isNonEmptyString(typed.slug), `Product ${index + 1}: slug is required`);
    assert(isNonEmptyString(typed.title), `Product ${index + 1}: title is required`);
    assert(isNonEmptyString(typed.description), `Product ${index + 1}: description is required`);
    assert(isStringArray(typed.images), `Product ${index + 1}: images must be a list of URLs`);
    const slug = toSlug(typed.slug.trim());
    assert(isValidProductSlug(slug), `Product ${index + 1}: invalid slug format`);

    return {
      id: typed.id.trim(),
      slug,
      title: typed.title.trim(),
      description: typed.description.trim(),
      images: typed.images.map((image) => image.trim()),
    };
  });

  ensureUniqueIds(products, 'Products');

  const slugs = new Set<string>();
  for (const product of products) {
    assert(!slugs.has(product.slug), `Products: duplicate slug "${product.slug}"`);
    slugs.add(product.slug);
  }

  return products;
};

export const validateAgencies = (input: unknown): Agency[] => {
  assert(Array.isArray(input), 'Agencies must be an array');
  const agencies = input.map((item, index) => {
    assert(item && typeof item === 'object', `Agency ${index + 1} must be an object`);
    const typed = item as Agency;
    assert(isNonEmptyString(typed.id), `Agency ${index + 1}: id is required`);
    assert(isNonEmptyString(typed.name), `Agency ${index + 1}: name is required`);
    assert(isNonEmptyString(typed.phone), `Agency ${index + 1}: phone is required`);
    assert(isNonEmptyString(typed.location), `Agency ${index + 1}: location is required`);

    return {
      id: typed.id.trim(),
      name: typed.name.trim(),
      phone: typed.phone.trim(),
      location: typed.location.trim(),
      address: isNonEmptyString(typed.address) ? typed.address.trim() : undefined,
      mapQuery: isNonEmptyString(typed.mapQuery) ? typed.mapQuery.trim() : undefined,
    };
  });

  ensureUniqueIds(agencies, 'Agencies');
  return agencies;
};

export const validateQuotes = (input: unknown): QuoteRequest[] => {
  assert(Array.isArray(input), 'Quotes must be an array');
  const quotes = input.map((item, index) => {
    assert(item && typeof item === 'object', `Quote ${index + 1} must be an object`);
    const typed = item as QuoteRequest;
    assert(isNonEmptyString(typed.id), `Quote ${index + 1}: id is required`);
    assert(isNonEmptyString(typed.submittedAt), `Quote ${index + 1}: submittedAt is required`);
    assert(isNonEmptyString(typed.fullName), `Quote ${index + 1}: fullName is required`);
    assert(isNonEmptyString(typed.email), `Quote ${index + 1}: email is required`);
    assert(isNonEmptyString(typed.phone), `Quote ${index + 1}: phone is required`);
    assert(isNonEmptyString(typed.service), `Quote ${index + 1}: service is required`);
    assert(isNonEmptyString(typed.serviceLabel), `Quote ${index + 1}: serviceLabel is required`);
    assert(isNonEmptyString(typed.message), `Quote ${index + 1}: message is required`);
    assert(typed.locale === 'fr' || typed.locale === 'en', `Quote ${index + 1}: locale must be fr or en`);

    return {
      id: typed.id.trim(),
      submittedAt: typed.submittedAt.trim(),
      fullName: typed.fullName.trim(),
      email: typed.email.trim().toLowerCase(),
      phone: typed.phone.trim(),
      service: typed.service.trim(),
      serviceLabel: typed.serviceLabel.trim(),
      message: typed.message.trim(),
      locale: typed.locale,
    };
  });

  ensureUniqueIds(quotes, 'Quotes');
  return quotes.sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));
};

export const contentValidators: {
  [K in keyof ContentMap]: (value: unknown) => ContentMap[K];
} = {
  hero: validateHero,
  services: validateServices,
  products: validateProducts,
  agencies: validateAgencies,
  quotes: validateQuotes,
};
