'use client';

import React from 'react';
import type { Agency } from '../../types';

const newAgency = (): Agency => ({
  id: crypto.randomUUID?.() ?? `${Date.now()}`,
  name: '',
  phone: '',
  location: '',
  address: '',
  mapQuery: '',
});

export const AgenciesEditor = () => {
  const [items, setItems] = React.useState<Agency[]>([]);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [form, setForm] = React.useState<Agency>(newAgency());
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/admin/content/agencies', { cache: 'no-store' });
      const payload = (await response.json()) as { ok: boolean; items?: Agency[]; error?: string };
      if (!response.ok || !payload.ok || !Array.isArray(payload.items)) {
        setError(payload.error ?? 'Impossible de charger les agences.');
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
      const response = await fetch('/api/admin/content/agencies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const payload = (await response.json()) as { ok: boolean; items?: Agency[]; error?: string };
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
    setForm(newAgency());
  };

  const save = async () => {
    if (!form.name?.trim() || !form.phone?.trim() || !form.location?.trim()) {
      setError('Nom, téléphone et localisation sont obligatoires.');
      return;
    }

    if (selectedId) {
      await persist({ action: 'update', id: selectedId, item: form }, 'Agence mise à jour.');
      return;
    }

    await persist({ action: 'create', item: form }, 'Agence créée.');
    createNew();
  };

  const remove = async () => {
    if (!selectedId) return;
    if (!confirm('Supprimer cette agence ?')) return;

    await persist({ action: 'delete', id: selectedId }, 'Agence supprimée.');
    createNew();
  };

  if (loading) return <p className="text-sm text-slate-500">Chargement des agences...</p>;

  return (
    <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
      <div className="space-y-3">
        <button onClick={createNew} className="w-full rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-700">
          + Nouvelle agence
        </button>
        <p className="rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-500">Créez une agence ou sélectionnez une agence existante pour la modifier.</p>

        <div className="lg:hidden">
          <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">Choisir une agence</label>
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
            <option value="">Nouvelle agence</option>
            {items.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
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
              {item.name}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-bold text-slate-700">Nom</label>
            <input
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none ring-emerald-500 focus:ring-2"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-bold text-slate-700">Téléphone</label>
            <input
              value={form.phone}
              onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
              className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none ring-emerald-500 focus:ring-2"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-bold text-slate-700">Localisation</label>
            <input
              value={form.location}
              onChange={(event) => setForm((prev) => ({ ...prev, location: event.target.value }))}
              className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none ring-emerald-500 focus:ring-2"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-bold text-slate-700">Adresse (optionnel)</label>
            <input
              value={form.address ?? ''}
              onChange={(event) => setForm((prev) => ({ ...prev, address: event.target.value }))}
              className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none ring-emerald-500 focus:ring-2"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-bold text-slate-700">Map query (optionnel)</label>
          <input
            value={form.mapQuery ?? ''}
            onChange={(event) => setForm((prev) => ({ ...prev, mapQuery: event.target.value }))}
            className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none ring-emerald-500 focus:ring-2"
          />
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
