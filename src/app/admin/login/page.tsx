import { Suspense } from 'react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { LoginForm } from '../../../components/admin/LoginForm';
import { getAdminSession } from '../../../lib/admin/guards';

export const metadata: Metadata = {
  title: 'Admin login',
  robots: { index: false, follow: false },
};

const LoginContent = () => (
  <div className="mx-auto flex min-h-screen max-w-md items-center px-4 py-10">
    <div className="w-full rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-slate-100 sm:p-8">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-600">Espace admin</p>
      <h1 className="mt-2 text-2xl font-black text-slate-900">Connexion</h1>
      <p className="mb-6 mt-1 text-sm text-slate-500">Connectez-vous pour gérer le hero slider, les services, les produits, les agences et les demandes de devis.</p>
      <LoginForm />
    </div>
  </div>
);

export default async function AdminLoginPage() {
  const session = await getAdminSession();
  if (session) redirect('/admin');

  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <LoginContent />
    </Suspense>
  );
}
