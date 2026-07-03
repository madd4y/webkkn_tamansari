import Image from "next/image";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Edit, Plus, Save, Trash2 } from "lucide-react";
import { AdminTable } from "@/components/shared/admin-table";
import { AdminField } from "@/components/ui/admin-field";
import { Button, ButtonLink } from "@/components/ui/button";
import { getDokumentasi } from "@/services/dokumentasi.service";

export default async function AdminDokumentasiPage() {
  const items = await getDokumentasi();

  return (
    <div className="grid gap-6">
      <section>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-zinc-950">Manajemen Dokumentasi</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Kelola foto, judul, tanggal, dan deskripsi dokumentasi kegiatan.
            </p>
          </div>
          <Button>
            <Plus size={18} aria-hidden="true" />
            Tambah Dokumentasi
          </Button>
        </div>
        <AdminTable headers={["Foto", "Judul", "Tanggal", "Deskripsi", "Aksi"]}>
          {items.map((item) => (
            <tr key={item.id}>
              <td className="px-4 py-3">
                <div className="relative size-14 overflow-hidden rounded-md bg-zinc-100">
                  <Image src={item.foto} alt={item.judul} fill className="object-cover" />
                </div>
              </td>
              <td className="px-4 py-3 font-semibold text-zinc-950">{item.judul}</td>
              <td className="px-4 py-3 text-zinc-600">
                {format(new Date(item.tanggal), "dd MMM yyyy", { locale: id })}
              </td>
              <td className="max-w-md px-4 py-3 text-zinc-600">{item.deskripsi}</td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <ButtonLink
                    href={`/admin/dokumentasi?edit=${item.id}`}
                    variant="secondary"
                    size="sm"
                  >
                    <Edit size={15} aria-hidden="true" />
                    Edit
                  </ButtonLink>
                  <Button variant="danger" size="sm">
                    <Trash2 size={15} aria-hidden="true" />
                    Hapus
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </AdminTable>
      </section>

      <form className="grid gap-6 rounded-md border border-zinc-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-bold text-zinc-950">Form Dokumentasi</h3>
        <div className="grid gap-5 md:grid-cols-2">
          <AdminField label="Judul" />
          <AdminField label="Tanggal" type="date" />
          <AdminField label="Upload Foto" type="file" />
          <div className="md:col-span-2">
            <AdminField label="Deskripsi" multiline />
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit">
            <Save size={18} aria-hidden="true" />
            Simpan Dokumentasi
          </Button>
        </div>
      </form>
    </div>
  );
}
