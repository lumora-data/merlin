'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export const LoginForm = () => {
  const router = useRouter();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const payload = (await response.json()) as { ok: boolean; error?: string };
      if (!response.ok || !payload.ok) {
        setError(payload.error ?? 'Impossible de se connecter.');
        return;
      }

      router.replace('/admin');
    } catch {
      setError('Une erreur réseau est survenue.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-bold text-slate-700">Nom d'utilisateur</label>
        <input
          type="text"
          required
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none ring-emerald-500 transition focus:ring-2"
          placeholder="admin"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-bold text-slate-700">Mot de passe</label>
        <input
          type="password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none ring-emerald-500 transition focus:ring-2"
          placeholder="••••••••"
        />
      </div>

      {error ? <p className="rounded-xl bg-red-50 px-3 py-2 text-sm font-medium text-red-700">{error}</p> : null}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-emerald-600 px-4 py-3 font-black text-white transition hover:bg-emerald-700 disabled:opacity-60"
      >
        {loading ? 'Connexion...' : 'Se connecter'}
      </button>
    </form>
  );
};
