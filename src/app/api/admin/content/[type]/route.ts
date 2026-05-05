import { randomUUID } from 'crypto';
import { NextResponse } from 'next/server';
import { requireAdminApi } from '../../../../../lib/admin/guards';
import { getContent, saveContent } from '../../../../../lib/content/store';
import { getContentRegistry, isContentType } from '../../../../../lib/content/registry';
import type { ContentType } from '../../../../../lib/content/types';

export const runtime = 'nodejs';

type ContentAction =
  | { action?: 'replace'; items: unknown[] }
  | { action: 'create'; item: unknown }
  | { action: 'update'; id: string; item: unknown }
  | { action: 'delete'; id: string };

const getParamsType = async (params: Promise<{ type: string }>): Promise<ContentType> => {
  const { type } = await params;
  if (!isContentType(type)) {
    throw new Error(`Unknown content type: ${type}`);
  }
  return type;
};

export async function GET(_request: Request, context: { params: Promise<{ type: string }> }) {
  try {
    await requireAdminApi();
    const type = await getParamsType(context.params);
    const items = await getContent(type);
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
    const registry = getContentRegistry(type);
    const current = (await getContent(type)) as Array<Record<string, unknown> & { id: string }>;
    const body = (await request.json()) as ContentAction;

    let nextItems: unknown[];

    if (!body.action || body.action === 'replace') {
      nextItems = Array.isArray((body as { items?: unknown[] }).items) ? (body as { items: unknown[] }).items : [];
    } else if (body.action === 'create') {
      if (!('item' in body) || !body.item || typeof body.item !== 'object') {
        throw new Error('Item invalide pour création.');
      }

      const item = body.item as Record<string, unknown> & { id?: string };
      nextItems = [...(current as unknown[]), { ...item, id: item.id?.trim() || randomUUID() }];
    } else if (body.action === 'update') {
      if (!body.id) throw new Error('ID requis pour mise à jour.');
      nextItems = current.map((item) => (item.id === body.id ? { ...item, ...(body.item as Record<string, unknown>) } : item));
    } else {
      if (!body.id) throw new Error('ID requis pour suppression.');
      nextItems = current.filter((item) => item.id !== body.id);
    }

    const validatedItems = registry.validate(nextItems);

    await saveContent({
      type,
      value: validatedItems,
      commitMessage: `cms(${type}): ${body.action ?? 'replace'}`,
    });

    const updated = await getContent(type);
    return NextResponse.json({ ok: true, items: updated });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur lors de la sauvegarde du contenu.';
    const status = message === 'UNAUTHORIZED' ? 401 : 400;
    return NextResponse.json({ ok: false, error: message }, { status });
  }
}
