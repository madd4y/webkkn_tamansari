import { DokumentasiExplorer } from "@/components/shared/dokumentasi-explorer";
import { PublicLayout } from "@/components/layout/public-layout";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { getDokumentasi } from "@/services/dokumentasi.service";

export const metadata = {
  title: "Dokumentasi",
};

export default async function DokumentasiPage() {
  const items = (await getDokumentasi()).data;

  return (
    <PublicLayout>
      <PageHeader
        eyebrow="Dokumentasi"
        title="Arsip Kegiatan Padukuhan"
        description="Dokumentasi kegiatan masyarakat, program KKN, dan agenda padukuhan yang tersimpan secara digital."
      />
      <section className="bg-white py-16">
        <Container>
          <DokumentasiExplorer items={items} />
        </Container>
      </section>
    </PublicLayout>
  );
}
