import type { Metadata } from 'next';
import { cache } from 'react';
import { notFound } from 'next/navigation';
import { ProductDetailPage } from '../../../views/ProductDetail';
import { SITE_NAME, SITE_URL } from '../../../lib/site';
import { getContent } from '../../../lib/content/store';
import type { ProductFamily } from '../../../types';

type Params = { slug: string };
type PageProps = { params: Promise<Params> };

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const normalizeProducts = (products: ProductFamily[]): ProductFamily[] =>
  products.map((product) => ({
    ...product,
    images: product.images.map((image) => encodeURI(image)),
  }));

const getProducts = cache(async (): Promise<ProductFamily[]> => normalizeProducts(await getContent('products')));

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const products = await getProducts();
  const product = products.find((family) => family.slug === slug);

  if (!product) {
    return {
      title: `Produit introuvable | ${SITE_NAME}`,
      robots: { index: false, follow: false },
    };
  }

  const description = `${product.title} chez ${SITE_NAME} à Kribi: ${product.description}`;

  return {
    title: `${product.title} | ${SITE_NAME}`,
    description,
    keywords: [product.title.toLowerCase(), `prix ${product.title.toLowerCase()} kribi`, `achat ${product.title.toLowerCase()} cameroun`],
    alternates: {
      canonical: `/produits/${product.slug}`,
    },
    openGraph: {
      title: `${product.title} | ${SITE_NAME}`,
      description,
      url: `${SITE_URL}/produits/${product.slug}`,
      images: product.images.slice(0, 1).map((image) => ({
        url: image,
        alt: product.title,
      })),
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const products = await getProducts();
  const product = products.find((family) => family.slug === slug);

  if (!product) {
    notFound();
  }

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.images,
    category: 'Matériaux et équipements',
    brand: {
      '@type': 'Brand',
      name: SITE_NAME,
    },
    url: `${SITE_URL}/produits/${product.slug}`,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'XAF',
      seller: {
        '@type': 'Organization',
        name: SITE_NAME,
      },
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Produits',
        item: `${SITE_URL}/produits`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.title,
        item: `${SITE_URL}/produits/${product.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([productJsonLd, breadcrumbJsonLd]) }}
      />
      <ProductDetailPage product={product} products={products} />
    </>
  );
}
