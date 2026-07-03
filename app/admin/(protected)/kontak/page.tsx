import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminField } from "@/components/ui/admin-field";
import { getKontak } from "@/services/kontak.service";

export default async function AdminKontakPage() {
  const kontak = await getKontak();

  return (
    <form className="grid gap-6">
      <section className="rounded-md border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-zinc-950">Manajemen Kontak</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <AdminField label="Nama Padukuhan" defaultValue={kontak.namaPadukuhan} />
          <AdminField label="Telepon" defaultValue={kontak.telepon} />
          <AdminField label="WhatsApp" defaultValue={kontak.whatsapp} />
          <AdminField label="Email" defaultValue={kontak.email} type="email" />
          <AdminField label="Jam Pelayanan" defaultValue={kontak.jamPelayanan} />
          <AdminField label="Embed Google Maps" defaultValue={kontak.maps} />
          <div className="md:col-span-2">
            <AdminField label="Alamat" defaultValue={kontak.alamat} multiline />
          </div>
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
