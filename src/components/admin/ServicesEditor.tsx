'use client';

import React from 'react';
import type { Service } from '../../types';
import { UploadImageField } from './UploadImageField';

const categories: Service['category'][] = ['construction', 'logistique', 'commerce', 'negoce', 'transport'];

const newService = (): Service => ({
  id: crypto.randomUUID?.() ?? `${Date.now()}`,
  title: '',
  description: '',
  image: '',
  category: 'construction',
});

export const ServicesEditor = () => {
  const [items, setItems] = React.useState<Service[]>([]);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [form, setForm] = React.useState<Service>(newService());
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/admin/content/services', { cache: 'no-store' });
      const payload = (await response.json()) as { ok: boolean; items?: Service[]; error?: string };
      if (!response.ok || !payload.ok || !Array.isArray(payload.items)) {
        setError(payload.error ?? 'Impossible de charger les services.');
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
      const response = await fetch('/api/admin/content/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const payload = (await response.json()) as { ok: boolean; items?: Service[]; error?: string };
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
  };

  const createNew = () => {
    setSelectedId(null);
    setForm(newService());
  };

  const save = async () => {
    if (!form.title.trim() || !form.description.trim() || !form.image.trim()) {
      setError('Titre, description et image sont obligatoires.');
      return;
    }

    if (selectedId) {
      await persist({ action: 'update', id: selectedId, item: form }, 'Service mis à jour.');
      return;
    }

    await persist({ action: 'create', item: form }, 'Service créé.');
    createNew();
  };

  const remove = async () => {
    if (!selectedId) return;
    if (!confirm('Supprimer ce service ?')) return;

    await persist({ action: 'delete', id: selectedId }, 'Service supprimé.');
    createNew();
  };

  if (loading) return <p className="text-sm text-slate-500">Chargement des services...</p>;

  return (
    <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
      <div className="space-y-3">
        <button onClick={createNew} className="w-full rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-700">
          + Nouveau service
        </button>
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

      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-bold text-slate-700">Titre</label>
          <input
            value={form.title}
            onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
            className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none ring-emerald-500 focus:ring-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-bold text-slate-700">Catégorie</label>
          <select
            value={form.category}
            onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value as Service['category'] }))}
            className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none ring-emerald-500 focus:ring-2"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
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

        <UploadImageField label="Image" value={form.image} onChange={(value) => setForm((prev) => ({ ...prev, image: value }))} />

        <div className="flex flex-wrap gap-3">
          <button onClick={save} disabled={saving} className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-700 disabled:opacity-60">
            {saving ? 'Sauvegarde...' : selectedId ? 'Mettre à jour' : 'Créer'}
          </button>
          {selectedId ? (
            <button onClick={remove} disabled={saving} className="rounded-xl bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700 disabled:opacity-60">
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
