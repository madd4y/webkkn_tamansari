import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminField } from "@/components/ui/admin-field";
import { getPenduduk } from "@/services/penduduk.service";

export default async function AdminPendudukPage() {
  const data = await getPenduduk();

  return (
    <form className="grid gap-6">
      <section className="rounded-md border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-zinc-950">Manajemen Data Penduduk</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <AdminField label="Tahun" defaultValue={data.tahun} type="number" />
          <AdminField label="Jumlah Penduduk" defaultValue={data.jumlahPenduduk} type="number" />
          <AdminField label="Laki-laki" defaultValue={data.lakiLaki} type="number" />
          <AdminField label="Perempuan" defaultValue={data.perempuan} type="number" />
          <AdminField label="Jumlah KK" defaultValue={data.kk} type="number" />
          <AdminField label="Jumlah RT" defaultValue={data.rt} type="number" />
          <AdminField label="Jumlah RW" defaultValue={data.rw} type="number" />
        </div>
      </section>
      <div className="flex justify-end">
        <Button type="submit">
          <Save size={18} aria-hidden="true" />
          Simpan Perubahan
        </Button>
      </div>
    </form>
  );
}
