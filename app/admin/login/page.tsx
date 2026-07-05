import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/forms/admin-login-form";
import { getCurrentSession } from "@/lib/auth";

export const metadata = {
  title: "Login Admin",
};

export default async function AdminLoginPage() {
  const session = await getCurrentSession();

  if (session) {
    redirect("/admin/dashboard");
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-emerald-600 text-lg font-bold text-white shadow-sm shadow-emerald-900/15">
              G
            </span>
            <div>
              <h1 className="text-xl font-bold text-slate-950">Login Admin</h1>
              <p className="text-sm text-slate-500">Padukuhan Tamansari</p>
            </div>
          </div>
          <p className="mt-6 text-sm leading-7 text-slate-600">
            Masuk menggunakan email dan password admin yang tersimpan di
            environment variables.
          </p>
          <AdminLoginForm />
        </div>
      </section>
    </main>
  );
}
