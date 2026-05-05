export const SITE_NAME = 'MERLIN Cameroun';
export const SITE_DESCRIPTION =
  'MERLIN Cameroun SARL à Kribi: matériaux de construction, outillage, quincaillerie, soudure, pompes et équipements pour professionnels et particuliers.';

const normalizeSiteUrl = (value: string) => value.replace(/\/+$/, '');

const inferSiteUrl = () => {
  const fromPublic = process.env.NEXT_PUBLIC_SITE_URL;
  if (fromPublic) {
    return normalizeSiteUrl(fromPublic.startsWith('http') ? fromPublic : `https://${fromPublic}`);
  }

  const fromVercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (fromVercel) {
    return normalizeSiteUrl(fromVercel.startsWith('http') ? fromVercel : `https://${fromVercel}`);
  }

  return 'https://merlin-cameroun.vercel.app';
};

export const SITE_URL = inferSiteUrl();
export const SITE_URL_OBJECT = new URL(SITE_URL);

export const COMPANY_INFO = {
  name: SITE_NAME,
  legalName: 'MERLIN Cameroun SARL',
  city: 'Kribi',
  country: 'CM',
  countryName: 'Cameroun',
  address: 'Kribi, Cameroun',
  email: 'merlincameroun@gmail.com',
  phoneDisplay: '+237 695 42 59 70',
  phoneE164: '+237695425970',
  whatsappUrl: 'https://wa.me/237695425970',
  facebookUrl: 'https://www.facebook.com/share/1AeZQkz1tk/?mibextid=wwXIfr',
  logoPath: '/images/logo.jpg',
};

export const STATIC_ROUTES = ['/', '/produits', '/agences', '/realisations', '/a-propos', '/contact'] as const;

export const SEO_KEYWORDS = [
  'MERLIN Cameroun',
  'MERLIN Kribi',
  'matériaux de construction Kribi',
  'quincaillerie Cameroun',
  'matériel de soudure Kribi',
  'ciment Kribi',
  'peinture bâtiment Kribi',
  'soudure Cameroun',
  'pompes hydrauliques Kribi',
  'sanitaires Kribi',
];
