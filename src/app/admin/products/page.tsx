import { requireAdminPage } from '../../../lib/admin/guards';
import { AdminShell } from '../../../components/admin/AdminShell';
import { ProductsEditor } from '../../../components/admin/ProductsEditor';

export const runtime = 'nodejs';

export default async function AdminProductsPage() {
  await requireAdminPage();

  return (
    <AdminShell title="CRUD Produits" subtitle="Gérez les catégories, descriptions et images produits.">
      <ProductsEditor />
    </AdminShell>
  );
}
