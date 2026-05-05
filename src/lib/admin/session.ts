import 'server-only';

import { createHmac, timingSafeEqual } from 'crypto';
import { getAdminEnv } from '../env/server';

export const ADMIN_SESSION_COOKIE = 'merlin_admin_session';
const SESSION_TTL_MS = 1000 * 60 * 60 * 12;

type SessionPayload = {
  username: string;
  expiresAt: number;
};

const getSessionSecret = () => {
  const { sessionSecret } = getAdminEnv();
  if (!sessionSecret) {
    throw new Error('ADMIN_SESSION_SECRET is missing');
  }

  return sessionSecret;
};

const signValue = (value: string) => createHmac('sha256', getSessionSecret()).update(value).digest('base64url');

const secureEqual = (left: string, right: string) => {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
};

export const createSessionToken = (username: string) => {
  const payload: SessionPayload = {
    username,
    expiresAt: Date.now() + SESSION_TTL_MS,
  };

  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = signValue(encodedPayload);

  return `${encodedPayload}.${signature}`;
};

export const verifySessionToken = (token: string | undefined | null): SessionPayload | null => {
  if (!token) return null;

  const parts = token.split('.');
  if (parts.length !== 2) return null;

  const [encodedPayload, signature] = parts;
  const expected = signValue(encodedPayload);
  if (!secureEqual(signature, expected)) return null;

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8')) as SessionPayload;
    if (!payload?.username || typeof payload.expiresAt !== 'number') return null;
    if (Date.now() > payload.expiresAt) return null;
    return payload;
  } catch {
    return null;
  }
};

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: SESSION_TTL_MS / 1000,
};
