export type Locale = 'fr' | 'en';

export type RouteKey = 'home' | 'products' | 'agencies' | 'realizations' | 'about' | 'contact';

export const ROUTES: Record<Locale, Record<RouteKey, string>> = {
  fr: {
    home: '/',
    products: '/produits',
    agencies: '/agences',
    realizations: '/realisations',
    about: '/a-propos',
    contact: '/contact',
  },
  en: {
    home: '/en',
    products: '/en/products',
    agencies: '/en/agencies',
    realizations: '/en/realizations',
    about: '/en/about',
    contact: '/en/contact',
  },
};

export const detectLocaleFromPath = (pathname: string): Locale => (pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'fr');

export const getPathForLocale = (pathname: string, targetLocale: Locale): string => {
  if (!pathname || pathname === '/') {
    return targetLocale === 'en' ? '/en' : '/';
  }

  if (pathname.startsWith('/admin')) {
    return pathname;
  }

  const normalized = pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

  const frToEnExact: Record<string, string> = {
    '/': '/en',
    '/produits': '/en/products',
    '/agences': '/en/agencies',
    '/realisations': '/en/realizations',
    '/a-propos': '/en/about',
    '/contact': '/en/contact',
  };

  const enToFrExact: Record<string, string> = {
    '/en': '/',
    '/en/products': '/produits',
    '/en/agencies': '/agences',
    '/en/realizations': '/realisations',
    '/en/about': '/a-propos',
    '/en/contact': '/contact',
  };

  if (targetLocale === 'en') {
    if (frToEnExact[normalized]) return frToEnExact[normalized];
    if (normalized.startsWith('/produits/')) return `/en/products/${normalized.slice('/produits/'.length)}`;
    if (normalized.startsWith('/en/')) return normalized;
    return `/en${normalized === '/' ? '' : normalized}`;
  }

  if (enToFrExact[normalized]) return enToFrExact[normalized];
  if (normalized.startsWith('/en/products/')) return `/produits/${normalized.slice('/en/products/'.length)}`;
  if (normalized.startsWith('/en/')) {
    const stripped = normalized.slice(3);
    return stripped.length === 0 ? '/' : stripped;
  }
  return normalized;
};
