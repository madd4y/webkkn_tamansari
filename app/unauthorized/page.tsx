import { ShieldX } from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function UnauthorizedPage() {
  return (
    <PublicLayout>
      <section className="min-h-[70vh] bg-zinc-50 pt-32 pb-16">
        <Container>
          <div className="mx-auto max-w-xl rounded-md border border-zinc-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex size-14 items-center justify-center rounded-md bg-red-50 text-red-700">
              <ShieldX size={28} aria-hidden="true" />
            </div>
            <h1 className="mt-5 text-2xl font-bold text-zinc-950">Akses Ditolak</h1>
            <p className="mt-3 leading-7 text-zinc-600">
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
