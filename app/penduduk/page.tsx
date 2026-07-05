import { Home, Users, VenusAndMars } from "lucide-react";
import { StatCard } from "@/components/cards/stat-card";
import { PublicLayout } from "@/components/layout/public-layout";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { formatNumber } from "@/lib/utils";
import { getPenduduk } from "@/services/penduduk.service";

export const metadata = {
  title: "Data Penduduk",
};

export default async function PendudukPage() {
  const data = (await getPenduduk()).data;
  const malePercent = Math.round((data.lakiLaki / data.jumlahPenduduk) * 100);
  const femalePercent = 100 - malePercent;

  return (
    <PublicLayout>
      <PageHeader
        eyebrow="Data Penduduk"
        title={`Statistik penduduk tahun ${data.tahun}`}
        description="Informasi ditampilkan secara agregat tanpa memuat data pribadi warga."
      />
      <section className="bg-white py-16">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard label="Jumlah Penduduk" value={data.jumlahPenduduk} icon={Users} />
            <StatCard label="Laki-laki" value={data.lakiLaki} icon={VenusAndMars} tone="blue" />
            <StatCard label="Perempuan" value={data.perempuan} icon={VenusAndMars} tone="amber" />
            <StatCard label="Jumlah KK" value={data.kk} icon={Home} />
            <StatCard label="Jumlah RT" value={data.rt} icon={Users} tone="zinc" />
            <StatCard label="Jumlah RW" value={data.rw} icon={Users} tone="zinc" />
          </div>
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 sm:p-8">
            <h2 className="text-xl font-bold text-slate-950">Ringkasan Penduduk</h2>
            <p className="mt-3 leading-7 text-slate-700">
              Padukuhan memiliki {formatNumber(data.jumlahPenduduk)} penduduk
              dalam {formatNumber(data.kk)} kartu keluarga.
            </p>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div>
                <div className="mb-2 flex justify-between text-sm font-semibold text-slate-700">
                  <span>Laki-laki</span>
                  <span>{malePercent}%</span>
                </div>
                <div className="h-3 rounded-full bg-slate-100">
                  <div className="h-3 rounded-full bg-sky-500" style={{ width: `${malePercent}%` }} />
                </div>
              </div>
              <div>
                <div className="mb-2 flex justify-between text-sm font-semibold text-slate-700">
                  <span>Perempuan</span>
                  <span>{femalePercent}%</span>
                </div>
                <div className="h-3 rounded-full bg-slate-100">
                  <div className="h-3 rounded-full bg-amber-500" style={{ width: `${femalePercent}%` }} />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </PublicLayout>
  );
}
