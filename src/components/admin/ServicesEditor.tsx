'use client';

import React from 'react';
import type { Service, ServiceIcon } from '../../types';
import { BarChart3, CheckCircle, Clock, MapPin, Settings, Shield, ShoppingBag, Truck, type LucideIcon } from 'lucide-react';

const CATEGORY_OPTIONS: Array<{
  value: Service['category'];
  label: string;
  hint: string;
  defaultIcon: ServiceIcon;
}> = [
  { value: 'construction', label: 'Construction', hint: 'Chantiers, BTP, matériaux.', defaultIcon: 'settings' },
  { value: 'transport', label: 'Transport', hint: 'Livraisons et transport routier.', defaultIcon: 'truck' },
  { value: 'commerce', label: 'Commerce', hint: 'Vente directe en magasin.', defaultIcon: 'shopping-bag' },
  { value: 'logistique', label: 'Logistique', hint: 'Coordination, approvisionnement.', defaultIcon: 'truck' },
  { value: 'negoce', label: 'Négoce', hint: 'Intermédiation et trading.', defaultIcon: 'bar-chart-3' },
];

const ICON_OPTIONS: Array<{ value: ServiceIcon; label: string; Icon: LucideIcon }> = [
  { value: 'settings', label: 'Technique', Icon: Settings },
  { value: 'truck', label: 'Transport', Icon: Truck },
  { value: 'shopping-bag', label: 'Commerce', Icon: ShoppingBag },
  { value: 'bar-chart-3', label: 'Business', Icon: BarChart3 },
  { value: 'shield', label: 'Sécurité', Icon: Shield },
  { value: 'check-circle', label: 'Qualité', Icon: CheckCircle },
  { value: 'clock', label: 'Rapidité', Icon: Clock },
  { value: 'map-pin', label: 'Local', Icon: MapPin },
];

const ICON_MAP: Record<ServiceIcon, LucideIcon> = Object.fromEntries(ICON_OPTIONS.map((entry) => [entry.value, entry.Icon])) as Record<ServiceIcon, LucideIcon>;
const CATEGORY_MAP = Object.fromEntries(CATEGORY_OPTIONS.map((entry) => [entry.value, entry])) as Record<Service['category'], (typeof CATEGORY_OPTIONS)[number]>;

const newService = (): Service => ({
  id: crypto.randomUUID?.() ?? `${Date.now()}`,
  title: '',
  description: '',
  icon: 'settings',
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
    setError(null);
    setSuccess(null);
  };

  const createNew = () => {
    setSelectedId(null);
    setForm(newService());
    setError(null);
    setSuccess(null);
  };

  const updateCategory = (nextCategory: Service['category']) => {
    setForm((prev) => {
      const previousDefault = CATEGORY_MAP[prev.category].defaultIcon;
      const nextDefault = CATEGORY_MAP[nextCategory].defaultIcon;
      const nextIcon = prev.icon === previousDefault ? nextDefault : prev.icon;
      return { ...prev, category: nextCategory, icon: nextIcon };
    });
  };

  const save = async () => {
    if (!form.title.trim() || !form.description.trim() || !form.icon.trim()) {
      setError('Titre, description et icône sont obligatoires.');
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

  const selectedCategory = CATEGORY_MAP[form.category];

  return (
    <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
      <div className="space-y-3">
        <button onClick={createNew} className="w-full rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-700">
          + Nouveau service
        </button>
        <p className="rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-500">Sélectionnez un service à gauche ou créez-en un nouveau en 3 étapes.</p>
        {items.map((item) => {
          const Icon = ICON_MAP[item.icon] ?? Settings;
          return (
            <button
              key={item.id}
              onClick={() => selectItem(item.id)}
              className={`w-full rounded-xl border px-3 py-3 text-left text-sm ${selectedId === item.id ? 'border-emerald-600 bg-emerald-50 text-emerald-800' : 'border-slate-200 text-slate-700 hover:bg-slate-50'}`}
            >
              <div className="flex items-start gap-3">
                <span className="mt-0.5 rounded-lg bg-white p-2 shadow-sm">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-bold">{item.title}</span>
                  <span className="block text-xs text-slate-500">{CATEGORY_MAP[item.category].label}</span>
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="space-y-5">
        <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
          <p className="font-bold text-slate-800">Configuration simple</p>
          <p>1) Choisissez la catégorie, 2) choisissez l’icône, 3) renseignez titre et description.</p>
        </div>

        <div>
          <label className="mb-1 block text-sm font-bold text-slate-700">Titre du service</label>
          <input
            value={form.title}
            onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
            placeholder="Ex: Logistique & transport"
            className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none ring-emerald-500 focus:ring-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-bold text-slate-700">Catégorie</label>
          <select
            value={form.category}
            onChange={(event) => updateCategory(event.target.value as Service['category'])}
            className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none ring-emerald-500 focus:ring-2"
          >
            {CATEGORY_OPTIONS.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-slate-500">{selectedCategory.hint}</p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold text-slate-700">Icône</label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {ICON_OPTIONS.map(({ value, label, Icon }) => {
              const active = form.icon === value;
              const recommended = selectedCategory.defaultIcon === value;
              return (
                <button
                  type="button"
                  key={value}
                  onClick={() => setForm((prev) => ({ ...prev, icon: value }))}
                  className={`rounded-xl border px-3 py-3 text-center transition ${
                    active ? 'border-emerald-600 bg-emerald-50 text-emerald-700' : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="mx-auto mb-2 h-5 w-5" />
                  <span className="block text-xs font-semibold">{label}</span>
                  {recommended ? <span className="mt-1 block text-[10px] font-bold uppercase tracking-wide text-emerald-600">Recommandé</span> : null}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-bold text-slate-700">Description</label>
          <textarea
            value={form.description}
            onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
            rows={4}
            placeholder="Décrivez le service en une ou deux phrases."
            className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none ring-emerald-500 focus:ring-2"
          />
        </div>

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
