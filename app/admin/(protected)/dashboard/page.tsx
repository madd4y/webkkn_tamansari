import { Camera, Clock3, MonitorPlay, Store, Users } from "lucide-react";
import { StatCard } from "@/components/cards/stat-card";
import { getDokumentasi } from "@/services/dokumentasi.service";
import { getPenduduk } from "@/services/penduduk.service";
import { getUMKM } from "@/services/umkm.service";
import { getVideoProfil } from "@/services/video.service";

export default async function AdminDashboardPage() {
  const [pendudukResponse, umkmResponse, dokumentasiResponse, videoResponse] =
    await Promise.all([
      getPenduduk(),
      getUMKM(),
      getDokumentasi(),
      getVideoProfil(),
    ]);
  const penduduk = pendudukResponse.data;
  const umkm = umkmResponse.data;
  const dokumentasi = dokumentasiResponse.data;
  const video = videoResponse.data;

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Total UMKM" value={umkm.length} icon={Store} />
        <StatCard label="Dokumentasi" value={dokumentasi.length} icon={Camera} tone="blue" />
        <StatCard label="Penduduk" value={penduduk.jumlahPenduduk} icon={Users} tone="amber" />
        <StatCard label="Jumlah Kartu Keluarga" value={penduduk.kk} icon={Users} tone="zinc" />
        <StatCard label="Video Aktif" value={video.judul ? "Ada" : "Belum"} icon={MonitorPlay} />
      </div>
      <section>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5">
          <h2 className="text-lg font-bold text-slate-950">Activity Log</h2>
          <div className="mt-5 grid gap-3">
            {[
              `Tambah UMKM: ${umkm[0]?.nama ?? "Belum ada data"}`,
              `Tambah Dokumentasi: ${dokumentasi[0]?.judul ?? "Belum ada data"}`,
              `Data penduduk tahun ${penduduk.tahun} tersedia`,
            ].map((item) => (
              <div key={item} className="flex gap-3 rounded-xl bg-slate-50 p-3">
                <Clock3 className="mt-0.5 shrink-0 text-emerald-700" size={18} aria-hidden="true" />
                <p className="text-sm font-medium text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
