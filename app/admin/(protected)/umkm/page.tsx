import Image from "next/image";
import { Edit, Plus, Save, Trash2 } from "lucide-react";
import { AdminTable } from "@/components/shared/admin-table";
import { AdminField } from "@/components/ui/admin-field";
import { Button, ButtonLink } from "@/components/ui/button";
import { getUMKM } from "@/services/umkm.service";

export default async function AdminUMKMPage() {
  const items = await getUMKM();

  return (
    <div className="grid gap-6">
      <section>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-zinc-950">Manajemen UMKM</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Tambah, edit, dan hapus data UMKM yang tampil di halaman publik.
            </p>
          </div>
          <Button>
            <Plus size={18} aria-hidden="true" />
            Tambah UMKM
          </Button>
        </div>
        <AdminTable headers={["Foto", "Nama", "Kategori", "Pemilik", "WhatsApp", "Aksi"]}>
          {items.map((item) => (
            <tr key={item.id}>
              <td className="px-4 py-3">
                <div className="relative size-14 overflow-hidden rounded-md bg-zinc-100">
                  <Image src={item.foto} alt={item.nama} fill className="object-cover" />
                </div>
              </td>
              <td className="px-4 py-3 font-semibold text-zinc-950">{item.nama}</td>
              <td className="px-4 py-3 text-zinc-600">{item.kategori}</td>
              <td className="px-4 py-3 text-zinc-600">{item.pemilik}</td>
              <td className="px-4 py-3 text-zinc-600">{item.whatsapp}</td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <ButtonLink href={`/admin/umkm?edit=${item.id}`} variant="secondary" size="sm">
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
        <h3 className="text-lg font-bold text-zinc-950">Form Tambah UMKM</h3>
        <div className="grid gap-5 md:grid-cols-2">
          <AdminField label="Nama UMKM" />
          <AdminField label="Kategori" />
          <AdminField label="Nama Pemilik" />
          <AdminField label="Nomor WhatsApp" />
          <AdminField label="Link Google Maps" type="url" />
          <AdminField label="Upload Foto" type="file" />
          <div className="md:col-span-2">
            <AdminField label="Deskripsi" multiline />
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit">
            <Save size={18} aria-hidden="true" />
            Simpan UMKM
          </Button>
        </div>
      </form>
    </div>
  );
}
