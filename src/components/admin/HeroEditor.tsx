'use client';

import React from 'react';
import type { HeroSlide } from '../../lib/content/types';
import { UploadImageField } from './UploadImageField';

const initialForm = (): HeroSlide => ({
  id: crypto.randomUUID?.() ?? `${Date.now()}`,
  image: '',
  alt: '',
});

export const HeroEditor = () => {
  const [slides, setSlides] = React.useState<HeroSlide[]>([]);
  const [form, setForm] = React.useState<HeroSlide>(initialForm());
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/admin/content/hero', { cache: 'no-store' });
      const payload = (await response.json()) as { ok: boolean; items?: HeroSlide[]; error?: string };
      if (!response.ok || !payload.ok || !Array.isArray(payload.items)) {
        setError(payload.error ?? 'Impossible de charger le hero slider.');
        return;
      }
      setSlides(payload.items);
    } catch {
      setError('Erreur réseau au chargement.');
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  const saveSlides = async (next: HeroSlide[], message: string) => {
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('/api/admin/content/hero', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'replace', items: next }),
      });

      const payload = (await response.json()) as { ok: boolean; items?: HeroSlide[]; error?: string };
      if (!response.ok || !payload.ok || !Array.isArray(payload.items)) {
        setError(payload.error ?? 'Échec de sauvegarde.');
        return;
      }

      setSlides(payload.items);
      setSuccess(message);
    } catch {
      setError('Erreur réseau pendant la sauvegarde.');
    } finally {
      setSaving(false);
    }
  };

  const addSlide = async () => {
    if (!form.image.trim() || !form.alt.trim()) {
      setError('Image et texte alternatif sont obligatoires.');
      return;
    }

    const next = [{ ...form, image: form.image.trim(), alt: form.alt.trim() }, ...slides];
    await saveSlides(next, 'Image ajoutée au hero slider.');
    setForm(initialForm());
  };

  const removeSlide = async (id: string) => {
    if (!confirm('Supprimer cette image du hero slider ?')) return;
    const next = slides.filter((slide) => slide.id !== id);
    await saveSlides(next, 'Image supprimée du hero slider.');
  };

  if (loading) return <p className="text-sm text-slate-500">Chargement du hero slider...</p>;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 p-4">
        <h3 className="text-lg font-black text-slate-900">Ajouter une image hero</h3>
        <p className="mb-4 text-sm text-slate-500">Ajoutez une image + son texte alternatif.</p>

        <div className="space-y-4">
          <UploadImageField label="Image" value={form.image} onChange={(value) => setForm((prev) => ({ ...prev, image: value }))} />
          <div>
            <label className="mb-1 block text-sm font-bold text-slate-700">Texte alternatif</label>
            <input
              type="text"
              value={form.alt}
              onChange={(event) => setForm((prev) => ({ ...prev, alt: event.target.value }))}
              className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none ring-emerald-500 focus:ring-2"
              placeholder="Ex: Vue du showroom Merlin"
            />
          </div>
          <button
            onClick={addSlide}
            disabled={saving}
            className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-700 disabled:opacity-60"
          >
            {saving ? 'Sauvegarde...' : 'Ajouter au slider'}
          </button>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-lg font-black text-slate-900">Images actuelles ({slides.length})</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {slides.map((slide) => (
            <article key={slide.id} className="rounded-2xl border border-slate-200 p-3">
              <img src={slide.image} alt={slide.alt} className="h-40 w-full rounded-xl object-cover" />
              <p className="mt-2 truncate text-sm font-bold text-slate-800">{slide.alt}</p>
              <button
                onClick={() => removeSlide(slide.id)}
                disabled={saving}
                className="mt-3 rounded-xl bg-red-600 px-3 py-2 text-xs font-bold text-white hover:bg-red-700 disabled:opacity-60"
              >
                Supprimer
              </button>
            </article>
          ))}
        </div>
      </div>

      {error ? <p className="rounded-xl bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{error}</p> : null}
      {success ? <p className="rounded-xl bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">{success}</p> : null}
    </div>
  );
};
