import { AdminShell } from "@/components/admin/admin-shell";
import { logoutAdmin } from "@/app/admin/actions";
import { requireAdminUser } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAdminUser();

  return (
    <AdminShell userEmail={user.email} logoutAction={logoutAdmin}>
      {children}
    </AdminShell>
  );
}
