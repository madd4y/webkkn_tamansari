import { ShieldX } from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function UnauthorizedPage() {
  return (
    <PublicLayout>
      <section className="min-h-[70vh] bg-[#f7faf9] pt-32 pb-16">
        <Container>
          <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm shadow-slate-950/5">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-red-50 text-red-700">
              <ShieldX size={28} aria-hidden="true" />
            </div>
            <h1 className="mt-5 text-2xl font-bold text-slate-950">Akses Ditolak</h1>
            <p className="mt-3 leading-7 text-slate-600">
              Anda tidak memiliki izin untuk mengakses Dashboard Admin.
            </p>
            <ButtonLink href="/" className="mt-6">
              Kembali ke Beranda
            </ButtonLink>
          </div>
        </Container>
      </section>
    </PublicLayout>
  );
}
