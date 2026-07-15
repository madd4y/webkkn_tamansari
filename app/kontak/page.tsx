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
  const kontak = (await getKontak()).data;

  return (
    <PublicLayout>
      <PageHeader
        eyebrow="Kontak"
        title="Hubungi Padukuhan Tamansari"
        description="Informasi alamat, layanan, WhatsApp, email, dan lokasi padukuhan."
      />
      <section className="bg-white py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 sm:p-8">
              <h2 className="text-xl font-bold text-slate-950">{kontak.namaPadukuhan}</h2>
              <div className="mt-6 grid gap-4 text-slate-700">
                <p className="flex gap-3">
                  <MapPinned className="mt-0.5 shrink-0 text-emerald-700" size={19} />
                  {kontak.alamat}
                </p>
                <p className="flex items-center gap-3">
                  <Phone className="text-emerald-700" size={19} />
                  {kontak.telepon}
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="text-emerald-700" size={19} />
                  {kontak.email}
                </p>
              </div>
              <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
                <p className="text-sm font-semibold text-emerald-900">Jam Pelayanan</p>
                <p className="mt-1 text-sm text-emerald-800">{kontak.jamPelayanan}</p>
              </div>
              <ButtonLink
                href={getWhatsAppUrl(kontak.whatsapp, "Halo, saya ingin menghubungi Padukuhan Tamansari.")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full"
              >
                <MessageCircle size={18} aria-hidden="true" />
                Hubungi via WhatsApp
              </ButtonLink>
            </div>
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-950/5">
              <iframe
                src={kontak.maps}
                title="Peta lokasi Padukuhan Tamansari"
                className="h-[360px] w-full sm:h-[520px]"
                loading="lazy"
              />
            </div>
          </div>
        </Container>
      </section>
    </PublicLayout>
  );
}
