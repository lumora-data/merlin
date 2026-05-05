import 'server-only';

import path from 'path';
import type { ContentMap, ContentType } from './types';
import { contentValidators } from './schemas';

export const CONTENT_REGISTRY: {
  [K in ContentType]: {
    type: K;
    filePath: string;
    validate: (value: unknown) => ContentMap[K];
  };
} = {
  hero: {
    type: 'hero',
    filePath: path.join(process.cwd(), 'content', 'hero.json'),
    validate: contentValidators.hero,
  },
  services: {
    type: 'services',
    filePath: path.join(process.cwd(), 'content', 'services.json'),
    validate: contentValidators.services,
  },
  products: {
    type: 'products',
    filePath: path.join(process.cwd(), 'content', 'products.json'),
    validate: contentValidators.products,
  },
  agencies: {
    type: 'agencies',
    filePath: path.join(process.cwd(), 'content', 'agencies.json'),
    validate: contentValidators.agencies,
  },
};

export const getContentRegistry = (type: string) => {
  if (!Object.prototype.hasOwnProperty.call(CONTENT_REGISTRY, type)) {
    throw new Error(`Unknown content type: ${type}`);
  }

  return CONTENT_REGISTRY[type as ContentType];
};
