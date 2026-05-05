import 'server-only';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ADMIN_SESSION_COOKIE, verifySessionToken } from './session';

export const getAdminSession = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  return verifySessionToken(token);
};

export const requireAdminPage = async () => {
  const session = await getAdminSession();
  if (!session) {
    redirect('/admin/login');
  }

  return session;
};

export const requireAdminApi = async () => {
  const session = await getAdminSession();
  if (!session) {
    throw new Error('UNAUTHORIZED');
  }

  return session;
};
