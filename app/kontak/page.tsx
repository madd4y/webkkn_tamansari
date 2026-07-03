import { Mail, MapPinned, MessageCircle, Phone } from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { getWhatsAppUrl } from "@/lib/utils";
import { getKontak } from "@/services/kontak.service";

export const metadata = {
  title: "Kontak",
};

export default async function KontakPage() {
  const kontak = await getKontak();

  return (
    <PublicLayout>
      <PageHeader
        eyebrow="Kontak"
        title="Hubungi Padukuhan Gedangsari"
        description="Informasi alamat, layanan, WhatsApp, email, dan lokasi padukuhan."
      />
      <section className="py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="rounded-md border border-zinc-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-zinc-950">{kontak.namaPadukuhan}</h2>
              <div className="mt-6 grid gap-4 text-zinc-700">
                <p className="flex gap-3">
                  <MapPinned className="mt-0.5 shrink-0 text-green-700" size={19} />
                  {kontak.alamat}
                </p>
                <p className="flex items-center gap-3">
                  <Phone className="text-green-700" size={19} />
                  {kontak.telepon}
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="text-green-700" size={19} />
                  {kontak.email}
                </p>
              </div>
              <div className="mt-6 rounded-md bg-green-50 p-4">
                <p className="text-sm font-semibold text-green-900">Jam Pelayanan</p>
                <p className="mt-1 text-sm text-green-800">{kontak.jamPelayanan}</p>
              </div>
              <ButtonLink
                href={getWhatsAppUrl(kontak.whatsapp, "Halo, saya ingin menghubungi Padukuhan Gedangsari.")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full"
              >
                <MessageCircle size={18} aria-hidden="true" />
                Hubungi via WhatsApp
              </ButtonLink>
            </div>
            <div className="overflow-hidden rounded-md border border-zinc-200 bg-white shadow-sm">
              <iframe
                src={kontak.maps}
                title="Peta lokasi Padukuhan Gedangsari"
                className="h-[520px] w-full"
                loading="lazy"
              />
            </div>
          </div>
        </Container>
      </section>
    </PublicLayout>
  );
}
