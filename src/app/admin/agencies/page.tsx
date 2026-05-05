import { requireAdminPage } from '../../../lib/admin/guards';
import { AdminShell } from '../../../components/admin/AdminShell';
import { AgenciesEditor } from '../../../components/admin/AgenciesEditor';

export const runtime = 'nodejs';

export default async function AdminAgenciesPage() {
  await requireAdminPage();

  return (
    <AdminShell title="CRUD Agences" subtitle="Gérez les points de vente et informations de contact.">
      <AgenciesEditor />
    </AdminShell>
  );
}
