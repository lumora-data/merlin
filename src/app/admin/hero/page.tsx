import { requireAdminPage } from '../../../lib/admin/guards';
import { AdminShell } from '../../../components/admin/AdminShell';
import { HeroEditor } from '../../../components/admin/HeroEditor';

export const runtime = 'nodejs';

export default async function AdminHeroPage() {
  await requireAdminPage();

  return (
    <AdminShell title="Gestion Hero slider" subtitle="Ajoutez ou supprimez les images du slider d'accueil.">
      <HeroEditor />
    </AdminShell>
  );
}
