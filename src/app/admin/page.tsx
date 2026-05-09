import Link from 'next/link';
import { requireAdminPage } from '../../lib/admin/guards';
import { AdminShell } from '../../components/admin/AdminShell';

export const runtime = 'nodejs';

const cards = [
  {
    href: '/admin/hero',
    title: 'Hero slider',
    text: 'Ajouter et supprimer les images du carrousel principal.',
  },
  {
    href: '/admin/services',
    title: 'Services',
    text: 'Créer, modifier et supprimer les services.',
  },
  {
    href: '/admin/products',
    title: 'Produits',
    text: 'Gérer le catalogue produits et les galeries d\'images.',
  },
  {
    href: '/admin/agencies',
    title: 'Agences',
    text: 'Mettre à jour les agences, contacts et localisations.',
  },
  {
    href: '/admin/quotes',
    title: 'Demandes de devis',
    text: 'Voir toutes les demandes reçues depuis le formulaire et exporter en CSV.',
  },
];

export default async function AdminDashboardPage() {
  await requireAdminPage();

  return (
    <AdminShell title="Tableau de bord" subtitle="Bienvenue dans votre panel de gestion interne.">
      <div className="grid gap-4 md:grid-cols-2">
        {cards.map((card) => (
          <Link key={card.href} href={card.href} className="rounded-2xl border border-slate-200 p-5 transition hover:border-emerald-500 hover:bg-emerald-50">
            <h3 className="text-lg font-black text-slate-900">{card.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{card.text}</p>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
