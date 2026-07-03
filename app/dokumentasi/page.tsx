import { DokumentasiExplorer } from "@/components/shared/dokumentasi-explorer";
import { PublicLayout } from "@/components/layout/public-layout";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { getDokumentasi } from "@/services/dokumentasi.service";

export const metadata = {
  title: "Dokumentasi",
};

export default async function DokumentasiPage() {
  const items = await getDokumentasi();

  return (
    <PublicLayout>
      <PageHeader
        eyebrow="Dokumentasi"
        title="Arsip kegiatan padukuhan"
        description="Dokumentasi kegiatan masyarakat, program KKN, dan agenda padukuhan yang tersimpan secara digital."
      />
      <section className="bg-zinc-50 py-16">
        <Container>
          <DokumentasiExplorer items={items} />
        </Container>
      </section>
    </PublicLayout>
  );
}
