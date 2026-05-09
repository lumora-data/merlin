import { NextResponse } from 'next/server';
import { getContent } from '../../../../lib/content/store';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const items = await getContent('hero');
    return NextResponse.json(
      { ok: true, items },
      {
        headers: {
          'Cache-Control': 'no-store, max-age=0',
        },
      },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur de lecture du hero.';
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
