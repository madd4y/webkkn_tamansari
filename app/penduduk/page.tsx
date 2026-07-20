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
  const malePercent = data.jumlahPenduduk
    ? Math.round((data.lakiLaki / data.jumlahPenduduk) * 100)
    : 0;
  const femalePercent = data.jumlahPenduduk ? 100 - malePercent : 0;
  const ageBreakdown = [
    {
      label: "Laki-laki",
      totalClassName: "text-sky-700",
      barClassName: "bg-sky-500",
      groups: [
        { label: "0-19 tahun", value: data.lakiLakiUsia0_19 },
        { label: "20-59 tahun", value: data.lakiLakiUsia20_59 },
        { label: "60+ tahun", value: data.lakiLakiUsia60Plus },
      ],
    },
    {
      label: "Perempuan",
      totalClassName: "text-amber-700",
      barClassName: "bg-amber-500",
      groups: [
        { label: "0-19 tahun", value: data.perempuanUsia0_19 },
        { label: "20-59 tahun", value: data.perempuanUsia20_59 },
        { label: "60+ tahun", value: data.perempuanUsia60Plus },
      ],
    },
  ];

  return (
    <PublicLayout>
      <PageHeader
        eyebrow="Data Penduduk"
        title={`Statistik Penduduk Tahun ${data.tahun}`}
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

          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 sm:p-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-950">
                  Kelompok Usia Penduduk
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Rincian penduduk berdasarkan jenis kelamin dan rentang usia.
                </p>
              </div>
              <p className="text-sm font-semibold text-slate-500">
                Total: {formatNumber(
                  ageBreakdown.reduce(
                    (sum, item) =>
                      sum + item.groups.reduce((groupSum, group) => groupSum + group.value, 0),
                    0,
                  ),
                )}{" "}
                jiwa
              </p>
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              {ageBreakdown.map((item) => {
                const total = item.groups.reduce((sum, group) => sum + group.value, 0);

                return (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-slate-200 bg-[#f8f5f0] p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-base font-extrabold text-slate-950">
                          {item.label}
                        </h3>
                        <p className="mt-1 text-xs font-semibold text-slate-500">
                          Total kelompok usia
                        </p>
                      </div>
                      <p className={`text-2xl font-extrabold ${item.totalClassName}`}>
                        {formatNumber(total)}
                      </p>
                    </div>

                    <div className="mt-6 grid gap-4">
                      {item.groups.map((group) => {
                        const percent = total ? Math.round((group.value / total) * 100) : 0;

                        return (
                          <div key={group.label}>
                            <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                              <span className="font-semibold text-slate-700">
                                {group.label}
                              </span>
                              <span className="font-bold text-slate-950">
                                {formatNumber(group.value)} jiwa
                              </span>
                            </div>
                            <div className="h-2.5 overflow-hidden rounded-full bg-white">
                              <div
                                className={`h-full rounded-full ${item.barClassName}`}
                                style={{ width: `${percent}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>
    </PublicLayout>
  );
}
