"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Save } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { AdminField } from "@/components/ui/admin-field";
import { useKontak } from "@/hooks/useKontak";
import { ensureApiSuccess } from "@/lib/api";
import { kontakSchema, type KontakFormValues } from "@/lib/admin-schemas";
import { updateKontak } from "@/services/kontak.service";
import type { KontakPadukuhan } from "@/types";

const emptyValues: KontakFormValues = {
  namaPadukuhan: "",
  alamat: "",
  telepon: "",
  whatsapp: "",
  email: "",
  maps: "",
  jamPelayanan: "",
};

export default function AdminKontakPage() {
  const queryClient = useQueryClient();
  const { data: kontak } = useKontak();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<KontakFormValues>({
    resolver: zodResolver(kontakSchema),
    defaultValues: emptyValues,
  });

  useEffect(() => {
    if (!kontak) {
      return;
    }

    reset({
      namaPadukuhan: kontak.namaPadukuhan,
      alamat: kontak.alamat,
      telepon: kontak.telepon,
      whatsapp: kontak.whatsapp,
      email: kontak.email,
      maps: kontak.maps,
      jamPelayanan: kontak.jamPelayanan,
    });
  }, [kontak, reset]);

  const mutation = useMutation({
    mutationFn: async (payload: KontakPadukuhan) =>
      ensureApiSuccess(await updateKontak(payload)),
    onSuccess: (savedKontak) => {
      queryClient.setQueryData(["kontak"], savedKontak);
      toast.success("Kontak berhasil diperbarui.");
      queryClient.invalidateQueries({ queryKey: ["kontak"] });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Kontak gagal diperbarui.");
    },
  });

  function onSubmit(values: KontakFormValues) {
    mutation.mutate({
      ...values,
      mediaSosial: kontak?.mediaSosial ?? {},
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5">
        <h2 className="text-lg font-bold text-slate-950">Manajemen Kontak</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <AdminField
            label="Nama Padukuhan"
            error={errors.namaPadukuhan?.message}
            {...register("namaPadukuhan")}
          />
          <AdminField
            label="Telepon"
            error={errors.telepon?.message}
            {...register("telepon")}
          />
          <AdminField
            label="WhatsApp"
            error={errors.whatsapp?.message}
            {...register("whatsapp")}
          />
          <AdminField
            label="Email"
            type="email"
            error={errors.email?.message}
            {...register("email")}
          />
          <AdminField
            label="Jam Pelayanan"
            error={errors.jamPelayanan?.message}
            {...register("jamPelayanan")}
          />
          <AdminField
            label="Embed Google Maps"
            error={errors.maps?.message}
            {...register("maps")}
          />
          <div className="md:col-span-2">
            <AdminField
              label="Alamat"
              multiline
              error={errors.alamat?.message}
              {...register("alamat")}
            />
          </div>
        </div>
      </section>
      <div className="flex justify-end">
        <Button type="submit" disabled={mutation.isPending}>
          <Save size={18} aria-hidden="true" />
          {mutation.isPending ? "Menyimpan..." : "Simpan Perubahan"}
        </Button>
      </div>
    </form>
  );
}
