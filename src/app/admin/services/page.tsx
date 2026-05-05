import { requireAdminPage } from '../../../lib/admin/guards';
import { AdminShell } from '../../../components/admin/AdminShell';
import { ServicesEditor } from '../../../components/admin/ServicesEditor';

export const runtime = 'nodejs';

export default async function AdminServicesPage() {
  await requireAdminPage();

  return (
    <AdminShell title="Gestion des services" subtitle="Ajoutez vos services, choisissez une icône et mettez à jour le contenu facilement.">
      <ServicesEditor />
    </AdminShell>
  );
}
