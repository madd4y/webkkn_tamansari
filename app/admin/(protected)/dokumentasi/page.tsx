"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { id } from "date-fns/locale";
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
import { useDokumentasi } from "@/hooks/useDokumentasi";
import { ensureApiSuccess } from "@/lib/api";
import {
  dokumentasiSchema,
  type DokumentasiFormValues,
} from "@/lib/admin-schemas";
import {
  createDokumentasi,
  deleteDokumentasi,
  updateDokumentasi,
} from "@/services/dokumentasi.service";
import type { Dokumentasi } from "@/types";

const emptyValues: DokumentasiFormValues = {
  judul: "",
  tanggal: "",
  foto: "",
  deskripsi: "",
};

export default function AdminDokumentasiPage() {
  const queryClient = useQueryClient();
  const { data = [] } = useDokumentasi();
  const [editingItem, setEditingItem] = useState<Dokumentasi | null>(null);
  const [deletingId, setDeletingId] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<DokumentasiFormValues>({
    resolver: zodResolver(dokumentasiSchema),
    defaultValues: emptyValues,
  });

  const createMutation = useMutation({
    mutationFn: async (values: DokumentasiFormValues) =>
      ensureApiSuccess(await createDokumentasi(values)),
    onMutate: async (values) => {
      await queryClient.cancelQueries({ queryKey: ["dokumentasi"] });
      const previous = queryClient.getQueryData<Dokumentasi[]>(["dokumentasi"]) ?? [];
      const tempItem: Dokumentasi = {
        ...values,
        id: `temp-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };

      queryClient.setQueryData<Dokumentasi[]>(["dokumentasi"], [
        tempItem,
        ...previous,
      ]);
      return { previous, tempId: tempItem.id };
    },
    onError: (error, _values, context) => {
      queryClient.setQueryData(["dokumentasi"], context?.previous ?? []);
      toast.error(
        error instanceof Error ? error.message : "Dokumentasi gagal disimpan.",
      );
    },
    onSuccess: (savedItem, _values, context) => {
      queryClient.setQueryData<Dokumentasi[]>(["dokumentasi"], (current = []) =>
        current.map((item) => (item.id === context?.tempId ? savedItem : item)),
      );
      toast.success("Dokumentasi berhasil disimpan.");
      reset(emptyValues);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["dokumentasi"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (payload: Dokumentasi) =>
      ensureApiSuccess(await updateDokumentasi(payload.id, payload)),
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: ["dokumentasi"] });
      const previous = queryClient.getQueryData<Dokumentasi[]>(["dokumentasi"]) ?? [];

      queryClient.setQueryData<Dokumentasi[]>(["dokumentasi"], (current = []) =>
        current.map((item) => (item.id === payload.id ? payload : item)),
      );
      return { previous };
    },
    onError: (error, _payload, context) => {
      queryClient.setQueryData(["dokumentasi"], context?.previous ?? []);
      toast.error(
        error instanceof Error ? error.message : "Dokumentasi gagal diperbarui.",
      );
    },
    onSuccess: (savedItem) => {
      queryClient.setQueryData<Dokumentasi[]>(["dokumentasi"], (current = []) =>
        current.map((item) => (item.id === savedItem.id ? savedItem : item)),
      );
      toast.success("Dokumentasi berhasil diperbarui.");
      setEditingItem(null);
      reset(emptyValues);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["dokumentasi"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => ensureApiSuccess(await deleteDokumentasi(id)),
    onMutate: async (id) => {
      setDeletingId(id);
      await queryClient.cancelQueries({ queryKey: ["dokumentasi"] });
      const previous = queryClient.getQueryData<Dokumentasi[]>(["dokumentasi"]) ?? [];

      queryClient.setQueryData<Dokumentasi[]>(["dokumentasi"], (current = []) =>
        current.filter((item) => item.id !== id),
      );
      return { previous };
    },
    onError: (error, _id, context) => {
      queryClient.setQueryData(["dokumentasi"], context?.previous ?? []);
      toast.error(
        error instanceof Error ? error.message : "Dokumentasi gagal dihapus.",
      );
    },
    onSuccess: (_response, id) => {
      toast.success("Dokumentasi berhasil dihapus.");
      if (editingItem?.id === id) {
        setEditingItem(null);
        reset(emptyValues);
      }
    },
    onSettled: () => {
      setDeletingId("");
      queryClient.invalidateQueries({ queryKey: ["dokumentasi"] });
    },
  });

  function handleEdit(item: Dokumentasi) {
    setEditingItem(item);
    reset({
      judul: item.judul,
      tanggal: item.tanggal,
      foto: item.foto,
      deskripsi: item.deskripsi,
    });
  }

  function handleCreateMode() {
    setEditingItem(null);
    reset(emptyValues);
  }

  function onSubmit(values: DokumentasiFormValues) {
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
            <h2 className="text-lg font-bold text-slate-950">Manajemen Dokumentasi</h2>
            <p className="mt-1 text-sm text-slate-500">
              Kelola foto, judul, tanggal, dan deskripsi dokumentasi kegiatan.
            </p>
          </div>
          <Button onClick={handleCreateMode}>
            <Plus size={18} aria-hidden="true" />
            Tambah Dokumentasi
          </Button>
        </div>
        {data.length > 0 ? (
          <AdminTable headers={["Foto", "Judul", "Tanggal", "Deskripsi", "Aksi"]}>
            {data.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-3">
                  <div className="relative size-14 overflow-hidden rounded-xl bg-slate-100">
                    <Image src={item.foto} alt={item.judul} fill className="object-cover" />
                  </div>
                </td>
                <td className="px-4 py-3 font-semibold text-slate-950">{item.judul}</td>
                <td className="px-4 py-3 text-slate-600">
                  {format(new Date(item.tanggal), "dd MMM yyyy", { locale: id })}
                </td>
                <td className="max-w-md px-4 py-3 text-slate-600">{item.deskripsi}</td>
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
            title="Belum ada dokumentasi"
            description="Tambahkan dokumentasi kegiatan agar tampil di halaman publik."
          />
        )}
      </section>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5"
      >
        <h3 className="text-lg font-bold text-slate-950">Form Dokumentasi</h3>
        <div className="grid gap-5 md:grid-cols-2">
          <AdminField
            label="Judul"
            error={errors.judul?.message}
            {...register("judul")}
          />
          <AdminField
            label="Tanggal"
            type="date"
            error={errors.tanggal?.message}
            {...register("tanggal")}
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
            {isSaving ? "Menyimpan..." : "Simpan Dokumentasi"}
          </Button>
        </div>
      </form>
    </div>
  );
}
