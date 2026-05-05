import { requireAdminPage } from '../../../lib/admin/guards';
import { AdminShell } from '../../../components/admin/AdminShell';
import { ServicesEditor } from '../../../components/admin/ServicesEditor';

export const runtime = 'nodejs';

export default async function AdminServicesPage() {
  await requireAdminPage();

  return (
    <AdminShell title="CRUD Services" subtitle="Créez, modifiez et supprimez les services.">
      <ServicesEditor />
    </AdminShell>
  );
}
