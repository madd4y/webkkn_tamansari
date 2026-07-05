"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { Edit, Plus, Save, Trash2 } from "lucide-react";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";
import { AdminTable } from "@/components/shared/admin-table";
import { AdminField } from "@/components/ui/admin-field";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { ImageUpload } from "@/components/ui/image-upload";
import { useUMKM } from "@/hooks/useUMKM";
import { ensureApiSuccess } from "@/lib/api";
import { umkmSchema, type UMKMFormValues } from "@/lib/admin-schemas";
import { createUMKM, deleteUMKM, updateUMKM } from "@/services/umkm.service";
import type { UMKM } from "@/types";

const emptyValues: UMKMFormValues = {
  nama: "",
  kategori: "",
  pemilik: "",
  whatsapp: "",
  maps: "",
  foto: "",
  deskripsi: "",
  jamBuka: "",
};

export default function AdminUMKMPage() {
  const queryClient = useQueryClient();
  const { data = [] } = useUMKM();
  const [editingItem, setEditingItem] = useState<UMKM | null>(null);
  const [deletingId, setDeletingId] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<UMKMFormValues>({
    resolver: zodResolver(umkmSchema),
    defaultValues: emptyValues,
  });

  const createMutation = useMutation({
    mutationFn: async (values: UMKMFormValues) =>
      ensureApiSuccess(await createUMKM(values)),
    onMutate: async (values) => {
      await queryClient.cancelQueries({ queryKey: ["umkm"] });
      const previous = queryClient.getQueryData<UMKM[]>(["umkm"]) ?? [];
      const tempItem: UMKM = {
        ...values,
        id: `temp-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };

      queryClient.setQueryData<UMKM[]>(["umkm"], [tempItem, ...previous]);
      return { previous, tempId: tempItem.id };
    },
    onError: (error, _values, context) => {
      queryClient.setQueryData(["umkm"], context?.previous ?? []);
      toast.error(error instanceof Error ? error.message : "UMKM gagal disimpan.");
    },
    onSuccess: (savedItem, _values, context) => {
      queryClient.setQueryData<UMKM[]>(["umkm"], (current = []) =>
        current.map((item) => (item.id === context?.tempId ? savedItem : item)),
      );
      toast.success("UMKM berhasil disimpan.");
      reset(emptyValues);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["umkm"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (payload: UMKM) =>
      ensureApiSuccess(await updateUMKM(payload.id, payload)),
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: ["umkm"] });
      const previous = queryClient.getQueryData<UMKM[]>(["umkm"]) ?? [];

      queryClient.setQueryData<UMKM[]>(["umkm"], (current = []) =>
        current.map((item) => (item.id === payload.id ? payload : item)),
      );
      return { previous };
    },
    onError: (error, _payload, context) => {
      queryClient.setQueryData(["umkm"], context?.previous ?? []);
      toast.error(error instanceof Error ? error.message : "UMKM gagal diperbarui.");
    },
    onSuccess: (savedItem) => {
      queryClient.setQueryData<UMKM[]>(["umkm"], (current = []) =>
        current.map((item) => (item.id === savedItem.id ? savedItem : item)),
      );
      toast.success("UMKM berhasil diperbarui.");
      setEditingItem(null);
      reset(emptyValues);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["umkm"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => ensureApiSuccess(await deleteUMKM(id)),
    onMutate: async (id) => {
      setDeletingId(id);
      await queryClient.cancelQueries({ queryKey: ["umkm"] });
      const previous = queryClient.getQueryData<UMKM[]>(["umkm"]) ?? [];

      queryClient.setQueryData<UMKM[]>(["umkm"], (current = []) =>
        current.filter((item) => item.id !== id),
      );
      return { previous };
    },
    onError: (error, _id, context) => {
      queryClient.setQueryData(["umkm"], context?.previous ?? []);
      toast.error(error instanceof Error ? error.message : "UMKM gagal dihapus.");
    },
    onSuccess: (_response, id) => {
      toast.success("UMKM berhasil dihapus.");
      if (editingItem?.id === id) {
        setEditingItem(null);
        reset(emptyValues);
      }
    },
    onSettled: () => {
      setDeletingId("");
      queryClient.invalidateQueries({ queryKey: ["umkm"] });
    },
  });

  function handleEdit(item: UMKM) {
    setEditingItem(item);
    reset({
      nama: item.nama,
      kategori: item.kategori,
      pemilik: item.pemilik,
      whatsapp: item.whatsapp,
      maps: item.maps,
      foto: item.foto,
      deskripsi: item.deskripsi,
      jamBuka: item.jamBuka || "",
    });
  }

  function handleCreateMode() {
    setEditingItem(null);
    reset(emptyValues);
  }

  function onSubmit(values: UMKMFormValues) {
    if (editingItem) {
      updateMutation.mutate({
        ...editingItem,
        ...values,
      });
      return;
    }

    createMutation.mutate(values);
  }

  const isSaving = createMutation.isPending || updateMutation.isPending;
  const fotoValue = useWatch({ control, name: "foto" });

  return (
    <div className="grid gap-6">
      <section>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-950">Manajemen UMKM</h2>
            <p className="mt-1 text-sm text-slate-500">
              Tambah, edit, dan hapus data UMKM yang tampil di halaman publik.
            </p>
          </div>
          <Button onClick={handleCreateMode}>
            <Plus size={18} aria-hidden="true" />
            Tambah UMKM
          </Button>
        </div>
        {data.length > 0 ? (
          <AdminTable headers={["Foto", "Nama", "Kategori", "Pemilik", "WhatsApp", "Jam Buka", "Aksi"]}>
            {data.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-3">
                  <div className="relative size-14 overflow-hidden rounded-xl bg-slate-100">
                    <Image src={item.foto} alt={item.nama} fill className="object-cover" />
                  </div>
                </td>
                <td className="px-4 py-3 font-semibold text-slate-950">{item.nama}</td>
                <td className="px-4 py-3 text-slate-600">{item.kategori}</td>
                <td className="px-4 py-3 text-slate-600">{item.pemilik}</td>
                <td className="px-4 py-3 text-slate-600">{item.whatsapp}</td>
                <td className="px-4 py-3 text-slate-600">{item.jamBuka || "-"}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleEdit(item)}
                      variant="secondary"
                      size="sm"
                    >
                      <Edit size={15} aria-hidden="true" />
                      Edit
                    </Button>
                    <Button
                      onClick={() => deleteMutation.mutate(item.id)}
                      variant="danger"
                      size="sm"
                      disabled={deleteMutation.isPending || isSaving}
                    >
                      <Trash2 size={15} aria-hidden="true" />
                      {deletingId === item.id ? "Menghapus..." : "Hapus"}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </AdminTable>
        ) : (
          <EmptyState
            title="Belum ada UMKM"
            description="Tambahkan data UMKM agar tampil di halaman publik."
          />
        )}
      </section>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5"
      >
        <h3 className="text-lg font-bold text-slate-950">Form Tambah UMKM</h3>
        <div className="grid gap-5 md:grid-cols-2">
          <AdminField
            label="Nama UMKM"
            error={errors.nama?.message}
            {...register("nama")}
          />
          <AdminField
            label="Kategori"
            error={errors.kategori?.message}
            {...register("kategori")}
          />
          <AdminField
            label="Nama Pemilik"
            error={errors.pemilik?.message}
            {...register("pemilik")}
          />
          <AdminField
            label="Nomor WhatsApp"
            error={errors.whatsapp?.message}
            {...register("whatsapp")}
          />
          <AdminField
            label="Jam Buka"
            error={errors.jamBuka?.message}
            {...register("jamBuka")}
          />
          <AdminField
            label="Link Google Maps"
            type="url"
            error={errors.maps?.message}
            {...register("maps")}
          />
          <ImageUpload
            label="Upload Foto"
            value={fotoValue}
            onChange={(url) => setValue("foto", url, { shouldValidate: true })}
            error={errors.foto?.message}
            disabled={isSaving}
          />
          <div className="md:col-span-2">
            <AdminField
              label="Deskripsi"
              multiline
              error={errors.deskripsi?.message}
              {...register("deskripsi")}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit" disabled={isSaving}>
            <Save size={18} aria-hidden="true" />
            {isSaving ? "Menyimpan..." : "Simpan UMKM"}
          </Button>
        </div>
      </form>
    </div>
  );
}
