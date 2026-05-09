'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

const links = [
  { href: '/admin', label: 'Tableau de bord' },
  { href: '/admin/hero', label: 'Hero slider' },
  { href: '/admin/services', label: 'Services' },
  { href: '/admin/products', label: 'Produits' },
  { href: '/admin/agencies', label: 'Agences' },
  { href: '/admin/quotes', label: 'Demandes de devis' },
];

export const AdminShell = ({ children, title, subtitle }: { children: React.ReactNode; title: string; subtitle?: string }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = React.useState(false);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await fetch('/api/admin/logout', { method: 'POST' });
      router.replace('/admin/login');
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl p-3 sm:p-6 lg:p-8">
        <div className="mb-4 flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm sm:mb-6 sm:flex-row sm:items-center sm:justify-between sm:rounded-3xl sm:p-5">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">Espace admin</p>
            <h1 className="text-xl font-black text-slate-900 sm:text-2xl">{title}</h1>
            {subtitle ? <p className="mt-1 text-sm text-slate-500">{subtitle}</p> : null}
          </div>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full rounded-full bg-slate-900 px-5 py-2 text-sm font-bold text-white transition hover:bg-slate-700 disabled:opacity-60 sm:w-auto"
          >
            {loggingOut ? 'Déconnexion...' : 'Se déconnecter'}
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="h-fit rounded-2xl bg-white p-3 shadow-sm sm:rounded-3xl sm:p-4">
            <nav className="flex gap-2 overflow-x-auto pb-1 lg:block lg:space-y-2 lg:overflow-visible lg:pb-0">
              {links.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`shrink-0 whitespace-nowrap rounded-xl px-3 py-2 text-sm font-bold transition sm:rounded-2xl sm:px-4 sm:py-3 lg:block ${
                      active ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </aside>

          <section className="rounded-2xl bg-white p-3 shadow-sm sm:rounded-3xl sm:p-6">{children}</section>
        </div>
      </div>
    </div>
  );
};
