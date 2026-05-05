import { NextResponse } from 'next/server';
import { verifyAdminCredentials } from '../../../../lib/admin/auth';
import { ADMIN_SESSION_COOKIE, createSessionToken, sessionCookieOptions } from '../../../../lib/admin/session';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { username?: string; password?: string };
    const username = (body.username ?? '').trim();
    const password = body.password ?? '';

    if (!username || !password) {
      return NextResponse.json({ ok: false, error: 'Nom d\'utilisateur et mot de passe requis.' }, { status: 400 });
    }

    const valid = verifyAdminCredentials(username, password);
    if (!valid) {
      return NextResponse.json({ ok: false, error: 'Identifiants invalides.' }, { status: 401 });
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set(ADMIN_SESSION_COOKIE, createSessionToken(username), sessionCookieOptions);

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur de connexion.';
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
