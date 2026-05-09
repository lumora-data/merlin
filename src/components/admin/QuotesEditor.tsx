'use client';

import React from 'react';
import type { QuoteRequest } from '../../lib/content/types';

const formatDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString('fr-FR', { timeZone: 'Africa/Douala' });
};

const csvEscape = (value: string) => `"${value.replace(/"/g, '""')}"`;

const buildCsv = (items: QuoteRequest[]) => {
  const headers = ['Date', 'Nom', 'Email', 'Téléphone', 'Service', 'Langue', 'Message'];
  const rows = items.map((item) => [
    formatDate(item.submittedAt),
    item.fullName,
    item.email,
    item.phone,
    item.serviceLabel,
    item.locale.toUpperCase(),
    item.message,
  ]);

  const lines = [headers, ...rows].map((row) => row.map((cell) => csvEscape(cell ?? '')).join(','));
  return `\uFEFF${lines.join('\n')}`;
};

export const QuotesEditor = () => {
  const [items, setItems] = React.useState<QuoteRequest[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/admin/content/quotes', { cache: 'no-store' });
      const payload = (await response.json()) as { ok: boolean; items?: QuoteRequest[]; error?: string };
      if (!response.ok || !payload.ok || !Array.isArray(payload.items)) {
        setError(payload.error ?? 'Impossible de charger les demandes.');
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
      const response = await fetch('/api/admin/content/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const payload = (await response.json()) as { ok: boolean; items?: QuoteRequest[]; error?: string };
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

  const removeOne = async (id: string) => {
    if (!confirm('Supprimer cette demande de devis ?')) return;
    await persist({ action: 'delete', id }, 'Demande supprimée.');
  };

  const clearAll = async () => {
    if (!confirm('Supprimer toutes les demandes de devis ?')) return;
    await persist({ action: 'replace', items: [] }, 'Toutes les demandes ont été supprimées.');
  };

  const exportCsv = () => {
    if (items.length === 0) return;
    const csv = buildCsv(items);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `devis-merlin-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (loading) return <p className="text-sm text-slate-500">Chargement des demandes de devis...</p>;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-slate-50 p-4">
        <div>
          <p className="text-sm font-bold text-slate-900">{items.length} demande(s) enregistrée(s)</p>
          <p className="text-xs text-slate-500">Les nouvelles demandes arrivent automatiquement depuis le formulaire Contact.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={load}
            className="rounded-xl bg-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-300"
          >
            Actualiser
          </button>
          <button
            type="button"
            onClick={exportCsv}
            disabled={items.length === 0}
            className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-700 disabled:opacity-50"
          >
            Export CSV
          </button>
          <button
            type="button"
            onClick={clearAll}
            disabled={saving || items.length === 0}
            className="rounded-xl bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700 disabled:opacity-50"
          >
            Tout supprimer
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-100 text-left text-xs uppercase tracking-wide text-slate-600">
            <tr>
              <th className="px-3 py-3">Date</th>
              <th className="px-3 py-3">Nom</th>
              <th className="px-3 py-3">Email</th>
              <th className="px-3 py-3">Téléphone</th>
              <th className="px-3 py-3">Service</th>
              <th className="px-3 py-3">Langue</th>
              <th className="px-3 py-3">Message</th>
              <th className="px-3 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {items.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-3 py-8 text-center text-sm text-slate-500">
                  Aucune demande pour le moment.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className="align-top">
                  <td className="whitespace-nowrap px-3 py-3 text-slate-700">{formatDate(item.submittedAt)}</td>
                  <td className="whitespace-nowrap px-3 py-3 font-semibold text-slate-900">{item.fullName}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-slate-700">{item.email}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-slate-700">{item.phone}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-slate-700">{item.serviceLabel}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-slate-700">{item.locale.toUpperCase()}</td>
                  <td className="max-w-[360px] px-3 py-3 text-slate-700">
                    <p className="line-clamp-3 whitespace-pre-wrap">{item.message}</p>
                  </td>
                  <td className="px-3 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => removeOne(item.id)}
                      disabled={saving}
                      className="rounded-lg bg-red-50 px-3 py-1 text-xs font-bold text-red-700 hover:bg-red-100 disabled:opacity-50"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {error ? <p className="rounded-xl bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{error}</p> : null}
      {success ? <p className="rounded-xl bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">{success}</p> : null}
    </div>
  );
};
