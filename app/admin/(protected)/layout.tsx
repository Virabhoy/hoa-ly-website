import AdminSidebar from "@/components/admin/AdminSidebar";
import { requireAdmin } from "@/lib/auth";
import { getStore } from "@/lib/store";

// Toutes les pages de l'admin, sauf la connexion, passent par ce layout.
export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();

  return (
    <div className="lg:flex min-h-screen bg-[#F5F5F5]">
      <AdminSidebar storage={getStore().mode} />
      <main id="contenu" className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
