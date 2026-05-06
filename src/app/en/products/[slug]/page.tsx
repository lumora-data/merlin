import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductDetailPage } from '../../../../views/ProductDetail';
import { PRODUCT_FAMILIES } from '../../../../constants';
import { SITE_NAME, SITE_URL } from '../../../../lib/site';
import { localizeProductFamily } from '../../../../lib/localized-content';

type Params = { slug: string };
type PageProps = { params: Promise<Params> };

const getProductBySlug = (slug: string) => PRODUCT_FAMILIES.find((family) => family.slug === slug);

export function generateStaticParams() {
  return PRODUCT_FAMILIES.map((family) => ({ slug: family.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const baseProduct = getProductBySlug(slug);
  const product = baseProduct ? localizeProductFamily(baseProduct, 'en') : undefined;

  if (!product) {
    return {
      title: `Product not found | ${SITE_NAME}`,
      robots: { index: false, follow: false },
    };
  }

  const description = `${product.title} at ${SITE_NAME} in Kribi: ${product.description}`;

  return {
    title: `${product.title} | ${SITE_NAME}`,
    description,
    keywords: [product.title.toLowerCase(), `${product.title.toLowerCase()} price kribi`, `buy ${product.title.toLowerCase()} cameroon`],
    alternates: {
      canonical: `/en/products/${product.slug}`,
    },
    openGraph: {
      title: `${product.title} | ${SITE_NAME}`,
      description,
      url: `${SITE_URL}/en/products/${product.slug}`,
      images: product.images.slice(0, 1).map((image) => ({
        url: image,
        alt: product.title,
      })),
    },
  };
}

export default async function EnProductDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const baseProduct = getProductBySlug(slug);
  const product = baseProduct ? localizeProductFamily(baseProduct, 'en') : undefined;

  if (!product) {
    notFound();
  }

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.images,
    category: 'Construction materials and equipment',
    brand: {
      '@type': 'Brand',
      name: SITE_NAME,
    },
    url: `${SITE_URL}/en/products/${product.slug}`,
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
        name: 'Home',
        item: `${SITE_URL}/en`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Products',
        item: `${SITE_URL}/en/products`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.title,
        item: `${SITE_URL}/en/products/${product.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([productJsonLd, breadcrumbJsonLd]) }}
      />
      <ProductDetailPage locale="en" />
    </>
  );
}
