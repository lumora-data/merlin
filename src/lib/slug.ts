const NON_ALPHANUMERIC = /[^a-z0-9]+/g;
const LEADING_OR_TRAILING_DASH = /^-+|-+$/g;
const MULTIPLE_DASHES = /-{2,}/g;
const COMBINING_MARKS = /[\u0300-\u036f]/g;

export const PRODUCT_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const toSlug = (value: string): string =>
  value
    .normalize('NFD')
    .replace(COMBINING_MARKS, '')
    .toLowerCase()
    .replace(NON_ALPHANUMERIC, '-')
    .replace(MULTIPLE_DASHES, '-')
    .replace(LEADING_OR_TRAILING_DASH, '');

export const isValidProductSlug = (value: string): boolean => PRODUCT_SLUG_PATTERN.test(value);
