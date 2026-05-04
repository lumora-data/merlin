import { Service, Agency, Realization, ProductFamily } from './types';

const asset = (path: string) => encodeURI(path);

export const SERVICES: Service[] = [
  {
    id: '1',
    title: 'Construction',
    description: 'Expertise dans la construction de bâtiments résidentiels, commerciaux et industriels.',
    image: asset('/images/accueil/hero-caroussel/PHOTO-2026-05-04-13-48-06.jpg'),
    category: 'construction',
  },
  {
    id: '2',
    title: 'Logistique & Transport',
    description: 'Services de transport routier et solutions logistiques complètes partout au Cameroun.',
    image: asset('/images/accueil/hero-caroussel/PHOTO-2026-05-04-16-47-38.jpg'),
    category: 'logistique',
  },
  {
    id: '3',
    title: 'Commerce général',
    description: 'Vente et distribution de matériaux de construction de haute qualité à Kribi.',
    image: asset('/images/accueil/hero-caroussel/PHOTO-2026-05-04-16-50-18.jpg'),
    category: 'commerce',
  },
  {
    id: '4',
    title: 'Négoce',
    description: 'Intermédiation commerciale et trading de produits de haute qualité.',
    image: asset('/images/accueil/hero-caroussel/PHOTO-2026-05-04-16-51-06.jpg'),
    category: 'negoce',
  },
];

export const AGENCIES: Agency[] = [
  {
    id: '1',
    name: 'MERLIN DOMBE',
    phone: '222 462 523',
    location: 'Kribi, Dombe',
  },
  {
    id: '2',
    name: 'MERLIN BOSSIGUI',
    phone: '222 472 563',
    location: 'Kribi, Bossigui',
  },
  {
    id: '3',
    name: 'MERLIN MPANGOU',
    phone: '695 425 970',
    location: 'Kribi, Mpangou',
  },
  {
    id: '4',
    name: 'MERLIN BILOLO',
    phone: '651 229 410',
    location: 'Kribi, Bilolo',
  },
];

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

// Catégories sans image retirées: robinetterie, plomberie, électricité, sécurité et équipements.
export const PRODUCT_FAMILIES: ProductFamily[] = [
  {
    id: '1',
    slug: 'carrelage-revetements',
    title: 'Carrelage et revêtements',
    description:
      'Vente de carrelage de haute qualité à Kribi. Découvrez notre sélection pour sols et murs, intérieur comme extérieur.',
    images: [asset('/images/produits/Carrelage et revêtements/image-03.webp')],
  },
  {
    id: '2',
    slug: 'sanitaires',
    title: 'Sanitaires',
    description:
      'Aménagez votre salle de bain avec des équipements sanitaires fiables et durables pour vos projets résidentiels et professionnels.',
    images: [asset('/images/produits/sanitaires/PHOTO-2026-05-04-16-55-18.jpg')],
  },
  {
    id: '3',
    slug: 'peinture-accessoires',
    title: 'Peinture et accessoires',
    description:
      'Peinture acrylique, enduits et accessoires pour des finitions propres et résistantes, en intérieur comme en extérieur.',
    images: [asset('/images/produits/peinture et accessoires/PHOTO-2026-05-04-16-35-46.jpg')],
  },
  {
    id: '4',
    slug: 'ciment',
    title: 'Ciment',
    description:
      'Ciment de haute performance pour gros œuvre, fondations, poteaux et dalles avec une excellente tenue mécanique.',
    images: [asset('/images/produits/ciment/PHOTO-2026-05-04-16-32-32.jpg')],
  },
  {
    id: '5',
    slug: 'fer-a-beton',
    title: 'Fer à béton',
    description:
      'Fer à béton de différentes sections pour le ferraillage et le renforcement de vos structures béton armé.',
    images: [
      asset('/images/produits/fer à béton/PHOTO-2026-05-04-16-39-00.jpg'),
      asset('/images/produits/fer à béton/PHOTO-2026-05-04-16-43-48 2.jpg'),
    ],
  },
  {
    id: '6',
    slug: 'outillages',
    title: 'Outillages',
    description:
      'Outillages professionnels et électroportatifs: marteaux, perceuses, meuleuses et accessoires pour chantiers.',
    images: [asset('/images/produits/outillages (marteaux, tournevis, meuleuses, perceuses...)/PHOTO-2026-05-04-13-48-07.jpg')],
  },
  {
    id: '7',
    slug: 'fixation-quincaillerie',
    title: 'Fixation et quincaillerie générale',
    description:
      'Pointes, vis, serrures et accessoires de quincaillerie pour vos travaux de finition, sécurité et assemblage.',
    images: [
      asset('/images/produits/fixation et quincaillerie générale ( pointes, vis, serrures...)/PHOTO-2026-05-04-16-54-34.jpg'),
      asset('/images/produits/fixation et quincaillerie générale ( pointes, vis, serrures...)/PHOTO-2026-05-04-16-54-35 2.jpg'),
      asset('/images/produits/fixation et quincaillerie générale ( pointes, vis, serrures...)/PHOTO-2026-05-04-16-54-35.jpg'),
      asset('/images/produits/fixation et quincaillerie générale ( pointes, vis, serrures...)/PHOTO-2026-05-04-16-54-36.jpg'),
    ],
  },
  {
    id: '8',
    slug: 'portes-accessoires',
    title: 'Portes et accessoires',
    description:
      'Gamme de portes et accessoires de pose, serrurerie et quincaillerie pour des installations robustes et sécurisées.',
    images: [
      asset('/images/produits/portes et accessoires/PHOTO-2026-05-04-16-52-31.jpg'),
      asset('/images/produits/portes et accessoires/PHOTO-2026-05-04-16-56-56.jpg'),
    ],
  },
  {
    id: '9',
    slug: 'cuisine-electromenager',
    title: 'Cuisine et électroménager',
    description:
      'Équipements de cuisine et électroménagers modernes pour particuliers, commerces et espaces professionnels.',
    images: [asset('/images/produits/cuisine et électroménager/PHOTO-2026-05-04-16-59-52.jpg')],
  },
  {
    id: '10',
    slug: 'soudure',
    title: 'Soudure',
    description:
      'Postes à souder, disques et consommables de soudage pour des travaux métalliques précis et durables.',
    images: [
      asset('/images/produits/soudure/PHOTO-2026-05-04-16-51-48.jpg'),
      asset('/images/produits/soudure/PHOTO-2026-05-04-16-53-04.jpg'),
      asset('/images/produits/soudure/PHOTO-2026-05-04-16-53-20.jpg'),
      asset('/images/produits/soudure/PHOTO-2026-05-04-16-53-53.jpg'),
    ],
  },
  {
    id: '11',
    slug: 'pompes-hydraulique',
    title: 'Pompes et équipements hydrauliques',
    description:
      'Pompes immergées, surpresseurs et équipements hydrauliques pour l’alimentation, le relevage et l’irrigation.',
    images: [asset('/images/produits/pompes et équipements hydrauliques/PHOTO-2026-05-04-17-17-31.jpg')],
  },
  {
    id: '12',
    slug: 'stockage-reservoirs',
    title: 'Stockage et réservoirs',
    description:
      'Réservoirs et solutions de stockage pour l’eau et les liquides, adaptés aux besoins domestiques et professionnels.',
    images: [asset('/images/produits/Stockage et réservoirs(cubitenaires, futs)/PHOTO-2026-05-04-16-42-14.jpg')],
  },
  {
    id: '13',
    slug: 'etancheite',
    title: 'Produits étanchéité',
    description:
      'Produits d’étanchéité et traitements hydrofuges pour protéger toitures, dalles et façades des infiltrations.',
    images: [
      asset('/images/produits/produits étanchéité/PHOTO-2026-05-04-16-49-41.jpg'),
      asset('/images/produits/produits étanchéité/PHOTO-2026-05-04-17-00-23.jpg'),
    ],
  },
  {
    id: '14',
    slug: 'couverture-toiture',
    title: 'Couverture et toiture',
    description:
      'Tôles, faîtières et accessoires de toiture pour une couverture solide, durable et adaptée au climat local.',
    images: [asset('/images/produits/couverture et toiture( tôles, faîtières, bandes ourlées...)/PHOTO-2026-05-04-16-37-04.jpg')],
  },
  {
    id: '15',
    slug: 'menuiserie',
    title: 'Menuiserie',
    description:
      'Contreplaqués, panneaux et accessoires pour la menuiserie, l’agencement et les travaux de finition bois.',
    images: [asset('/images/produits/menuiserie ( contreplaqués, panneaux, équerres, fond d\'huile, imprebois...)/PHOTO-2026-05-04-16-58-46.jpg')],
  },
];
