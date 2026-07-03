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
    <main className="min-h-screen bg-zinc-50">
      <section className="flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-md border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-md bg-green-600 text-lg font-bold text-white">
              G
            </span>
            <div>
              <h1 className="text-xl font-bold text-zinc-950">Login Admin</h1>
              <p className="text-sm text-zinc-500">Padukuhan Gedangsari</p>
            </div>
          </div>
          <p className="mt-6 text-sm leading-6 text-zinc-600">
            Masuk menggunakan email dan password admin yang tersimpan di
            environment variables.
          </p>
          <AdminLoginForm />
        </div>
      </section>
    </main>
  );
}
