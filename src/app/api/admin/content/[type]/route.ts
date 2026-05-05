import { randomUUID } from 'crypto';
import { NextResponse } from 'next/server';
import { requireAdminApi } from '../../../../../lib/admin/guards';
import { getContent, saveContent } from '../../../../../lib/content/store';
import { getContentRegistry } from '../../../../../lib/content/registry';

export const runtime = 'nodejs';

type ContentAction =
  | { action?: 'replace'; items: unknown[] }
  | { action: 'create'; item: unknown }
  | { action: 'update'; id: string; item: unknown }
  | { action: 'delete'; id: string };

const getParamsType = async (params: Promise<{ type: string }>) => {
  const { type } = await params;
  getContentRegistry(type);
  return type;
};

export async function GET(_request: Request, context: { params: Promise<{ type: string }> }) {
  try {
    await requireAdminApi();
    const type = await getParamsType(context.params);
    const items = await getContent(type as never);
    return NextResponse.json({ ok: true, items });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur lors de la lecture du contenu.';
    const status = message === 'UNAUTHORIZED' ? 401 : 400;
    return NextResponse.json({ ok: false, error: message }, { status });
  }
}

export async function POST(request: Request, context: { params: Promise<{ type: string }> }) {
  try {
    await requireAdminApi();
    const type = await getParamsType(context.params);
    const current = await getContent(type as never);
    const body = (await request.json()) as ContentAction;

    let nextItems: unknown[];

    if (!body.action || body.action === 'replace') {
      nextItems = Array.isArray((body as { items?: unknown[] }).items) ? (body as { items: unknown[] }).items : [];
    } else if (body.action === 'create') {
      if (!('item' in body) || !body.item || typeof body.item !== 'object') {
        throw new Error('Item invalide pour création.');
      }

      const item = body.item as { id?: string };
      nextItems = [...(current as unknown[]), { ...item, id: item.id?.trim() || randomUUID() }];
    } else if (body.action === 'update') {
      if (!body.id) throw new Error('ID requis pour mise à jour.');
      nextItems = (current as { id: string }[]).map((item) => (item.id === body.id ? ({ ...item, ...(body.item as object) } as { id: string }) : item));
    } else {
      if (!body.id) throw new Error('ID requis pour suppression.');
      nextItems = (current as { id: string }[]).filter((item) => item.id !== body.id);
    }

    await saveContent({
      type: type as never,
      value: nextItems as never,
      commitMessage: `cms(${type}): ${body.action ?? 'replace'}`,
    });

    const updated = await getContent(type as never);
    return NextResponse.json({ ok: true, items: updated });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur lors de la sauvegarde du contenu.';
    const status = message === 'UNAUTHORIZED' ? 401 : 400;
    return NextResponse.json({ ok: false, error: message }, { status });
  }
}
