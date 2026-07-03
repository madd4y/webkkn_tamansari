import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminField } from "@/components/ui/admin-field";
import { getVideoProfil } from "@/services/video.service";

export default async function AdminVideoPage() {
  const video = await getVideoProfil();

  return (
    <form className="grid gap-6">
      <section className="rounded-md border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-zinc-950">Manajemen Video Profil</h2>
        <div className="mt-6 grid gap-5">
          <AdminField label="Judul Video" defaultValue={video.judul} />
          <AdminField label="URL YouTube" defaultValue={video.youtubeUrl} type="url" />
          <AdminField label="Deskripsi" defaultValue={video.deskripsi} multiline />
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
