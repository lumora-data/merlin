import { NextResponse } from 'next/server';
import { requireAdminApi } from '../../../../lib/admin/guards';
import { getMediaEnv } from '../../../../lib/env/server';
import { uploadImage } from '../../../../lib/storage';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    await requireAdminApi();

    const media = getMediaEnv();
    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ ok: false, error: 'Aucun fichier reçu.' }, { status: 400 });
    }

    if (!media.allowedTypes.includes(file.type)) {
      return NextResponse.json({ ok: false, error: `Type non autorisé: ${file.type}` }, { status: 400 });
    }

    const maxBytes = media.maxUploadMb * 1024 * 1024;
    if (file.size > maxBytes) {
      return NextResponse.json({ ok: false, error: `Fichier trop volumineux (max ${media.maxUploadMb} MB).` }, { status: 400 });
    }

    const result = await uploadImage({ file });
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur upload.';
    const status = message === 'UNAUTHORIZED' ? 401 : 400;
    return NextResponse.json({ ok: false, error: message }, { status });
  }
}
