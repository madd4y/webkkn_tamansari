import { UmkmExplorer } from "@/components/shared/umkm-explorer";
import { PublicLayout } from "@/components/layout/public-layout";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { getUMKM } from "@/services/umkm.service";

export const metadata = {
  title: "UMKM",
};

export default async function UMKMPage() {
  const items = await getUMKM();

  return (
    <PublicLayout>
      <PageHeader
        eyebrow="UMKM"
        title="Potensi usaha masyarakat"
        description="Temukan produk dan layanan lokal Padukuhan Gedangsari berdasarkan nama, kategori, atau pemilik."
      />
      <section className="bg-zinc-50 py-16">
        <Container>
          <UmkmExplorer items={items} />
        </Container>
      </section>
    </PublicLayout>
  );
}
