import 'server-only';

import { createHash, timingSafeEqual } from 'crypto';
import { getAdminEnv } from '../env/server';

const safeEqual = (left: string, right: string) => {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
};

const sha256 = (value: string) => createHash('sha256').update(value).digest('hex');

export const verifyAdminCredentials = (username: string, password: string) => {
  const env = getAdminEnv();

  if (!env.username) {
    throw new Error('ADMIN_USERNAME is missing');
  }

  if (!safeEqual(username, env.username)) {
    return false;
  }

  if (env.passwordHash) {
    return safeEqual(sha256(password), env.passwordHash);
  }

  if (!env.password) {
    throw new Error('ADMIN_PASSWORD or ADMIN_PASSWORD_HASH is required');
  }

  return safeEqual(password, env.password);
};
