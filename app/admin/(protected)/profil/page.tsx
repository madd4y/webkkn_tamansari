import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminField } from "@/components/ui/admin-field";
import { getProfil } from "@/services/profil.service";

export default async function AdminProfilPage() {
  const profil = await getProfil();

  return (
    <form className="grid gap-6">
      <section className="rounded-md border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-zinc-950">Manajemen Profil Padukuhan</h2>
        <div className="mt-6 grid gap-5">
          <AdminField label="Sejarah" defaultValue={profil.sejarah} multiline />
          <AdminField label="Visi" defaultValue={profil.visi} multiline />
          <AdminField label="Misi" defaultValue={profil.misi.join("\n")} multiline />
          <AdminField label="Letak Geografis" defaultValue={profil.geografis} multiline />
          <div className="grid gap-5 md:grid-cols-2">
            <AdminField label="Luas Wilayah" defaultValue={profil.luas} />
            <AdminField label="Ketinggian" defaultValue={profil.ketinggian} />
            <AdminField label="Batas Utara" defaultValue={profil.utara} />
            <AdminField label="Batas Selatan" defaultValue={profil.selatan} />
            <AdminField label="Batas Timur" defaultValue={profil.timur} />
            <AdminField label="Batas Barat" defaultValue={profil.barat} />
          </div>
          <AdminField label="Embed Google Maps" defaultValue={profil.maps} />
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
