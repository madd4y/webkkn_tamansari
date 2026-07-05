import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { AdminTopbar } from "@/components/layout/admin-topbar";
import { Providers } from "@/components/shared/providers";
import { getCurrentSession } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCurrentSession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <Providers>
    <div className="min-h-screen bg-slate-50 lg:pl-72">
      <AdminSidebar />
      <div className="min-h-screen">
        <AdminTopbar
          title="Dashboard Admin"
          subtitle="Kelola data profil digital Padukuhan Tamansari"
          authEnabled
        />
        <main className="mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
    </Providers>
  );
}
