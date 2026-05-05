import { NextResponse } from 'next/server';
import { getAdminSession } from '../../../../lib/admin/guards';

export const runtime = 'nodejs';

export async function GET() {
  const session = await getAdminSession();
  return NextResponse.json({
    ok: Boolean(session),
    user: session?.username ?? null,
  });
}
