import { requireAdminPage } from '../../../lib/admin/guards';
import { AdminShell } from '../../../components/admin/AdminShell';
import { QuotesEditor } from '../../../components/admin/QuotesEditor';

export const runtime = 'nodejs';

export default async function AdminQuotesPage() {
  await requireAdminPage();

  return (
    <AdminShell title="Demandes de devis" subtitle="Consultez les demandes reçues via le formulaire et exportez en CSV.">
      <QuotesEditor />
    </AdminShell>
  );
}
