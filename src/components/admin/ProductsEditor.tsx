'use client';

import React from 'react';
import type { ProductFamily } from '../../types';
import { UploadImageField } from './UploadImageField';
import { toSlug } from '../../lib/slug';

const newProduct = (): ProductFamily => ({
  id: crypto.randomUUID?.() ?? `${Date.now()}`,
  slug: '',
  title: '',
  description: '',
  images: [],
});

export const ProductsEditor = () => {
  const [items, setItems] = React.useState<ProductFamily[]>([]);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [form, setForm] = React.useState<ProductFamily>(newProduct());
  const [imageInput, setImageInput] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/admin/content/products', { cache: 'no-store' });
      const payload = (await response.json()) as { ok: boolean; items?: ProductFamily[]; error?: string };
      if (!response.ok || !payload.ok || !Array.isArray(payload.items)) {
        setError(payload.error ?? 'Impossible de charger les produits.');
        return;
      }
      setItems(payload.items);
    } catch {
      setError('Erreur réseau au chargement.');
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  const persist = async (body: object, okMessage: string) => {
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('/api/admin/content/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const payload = (await response.json()) as { ok: boolean; items?: ProductFamily[]; error?: string };
      if (!response.ok || !payload.ok || !Array.isArray(payload.items)) {
        setError(payload.error ?? 'Erreur de sauvegarde.');
        return;
      }
      setItems(payload.items);
      setSuccess(okMessage);
    } catch {
      setError('Erreur réseau pendant la sauvegarde.');
    } finally {
      setSaving(false);
    }
  };

  const selectItem = (id: string) => {
    const item = items.find((entry) => entry.id === id);
    if (!item) return;
    setSelectedId(id);
    setForm(item);
    setImageInput('');
  };

  const createNew = () => {
    setSelectedId(null);
    setForm(newProduct());
    setImageInput('');
  };

  const save = async () => {
    const normalizedSlug = toSlug(form.slug.trim() || form.title.trim());
    if (!normalizedSlug || !form.title.trim() || !form.description.trim() || form.images.length === 0) {
      setError('Slug, titre, description et au moins une image sont obligatoires.');
      return;
    }
    const payload = { ...form, slug: normalizedSlug };
    setForm(payload);

    if (selectedId) {
      await persist({ action: 'update', id: selectedId, item: payload }, 'Produit mis à jour.');
      return;
    }

    await persist({ action: 'create', item: payload }, 'Produit créé.');
    createNew();
  };

  const remove = async () => {
    if (!selectedId) return;
    if (!confirm('Supprimer ce produit ?')) return;

    await persist({ action: 'delete', id: selectedId }, 'Produit supprimé.');
    createNew();
  };

  const addImage = () => {
    const value = imageInput.trim();
    if (!value) return;
    setForm((prev) => ({ ...prev, images: [...prev.images, value] }));
    setImageInput('');
  };

  const removeImage = (index: number) => {
    setForm((prev) => ({ ...prev, images: prev.images.filter((_, currentIndex) => currentIndex !== index) }));
  };

  if (loading) return <p className="text-sm text-slate-500">Chargement des produits...</p>;

  return (
    <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
      <div className="space-y-3">
        <button onClick={createNew} className="w-full rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-700">
          + Nouveau produit
        </button>
        <p className="rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-500">Créez un produit ou sélectionnez un produit existant pour le modifier.</p>

        <div className="lg:hidden">
          <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">Choisir un produit</label>
          <select
            value={selectedId ?? ''}
            onChange={(event) => {
              if (!event.target.value) {
                createNew();
                return;
              }
              selectItem(event.target.value);
            }}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 outline-none ring-emerald-500 focus:ring-2"
          >
            <option value="">Nouveau produit</option>
            {items.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            ))}
          </select>
        </div>

        <div className="hidden space-y-2 lg:block">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => selectItem(item.id)}
              className={`w-full rounded-xl border px-3 py-3 text-left text-sm font-semibold ${selectedId === item.id ? 'border-emerald-600 bg-emerald-50 text-emerald-700' : 'border-slate-200 text-slate-700 hover:bg-slate-50'}`}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-bold text-slate-700">Titre</label>
            <input
              value={form.title}
              onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
              className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none ring-emerald-500 focus:ring-2"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-bold text-slate-700">Slug</label>
            <input
              value={form.slug}
              onChange={(event) => setForm((prev) => ({ ...prev, slug: event.target.value }))}
              placeholder="materiel-de-soudure"
              className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none ring-emerald-500 focus:ring-2"
            />
            <button
              type="button"
              onClick={() => setForm((prev) => ({ ...prev, slug: toSlug(prev.title) }))}
              className="mt-2 text-xs font-bold text-emerald-700 underline underline-offset-2"
            >
              Générer le slug depuis le titre
            </button>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-bold text-slate-700">Description</label>
          <textarea
            value={form.description}
            onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
            rows={4}
            className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none ring-emerald-500 focus:ring-2"
          />
        </div>

        <UploadImageField label="Ajouter une image" value={imageInput} onChange={setImageInput} />
        <button onClick={addImage} type="button" className="w-full rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white hover:bg-slate-700 sm:w-auto">
          Ajouter cette image à la galerie
        </button>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {form.images.map((image, index) => (
            <div key={`${image}-${index}`} className="rounded-xl border border-slate-200 p-2">
              <img src={image} alt={`Produit ${index + 1}`} className="h-20 w-full rounded-lg object-cover" />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="mt-2 w-full rounded-lg bg-red-600 px-2 py-1 text-xs font-bold text-white hover:bg-red-700"
              >
                Retirer
              </button>
            </div>
          ))}
        </div>

        <div className="grid gap-3 sm:flex sm:flex-wrap">
          <button onClick={save} disabled={saving} className="w-full rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-700 disabled:opacity-60 sm:w-auto">
            {saving ? 'Sauvegarde...' : selectedId ? 'Mettre à jour' : 'Créer'}
          </button>
          {selectedId ? (
            <button onClick={remove} disabled={saving} className="w-full rounded-xl bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700 disabled:opacity-60 sm:w-auto">
              Supprimer
            </button>
          ) : null}
        </div>

        {error ? <p className="rounded-xl bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{error}</p> : null}
        {success ? <p className="rounded-xl bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">{success}</p> : null}
      </div>
    </div>
  );
};
