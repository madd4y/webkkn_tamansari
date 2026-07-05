"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Save } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { AdminField } from "@/components/ui/admin-field";
import { usePenduduk } from "@/hooks/usePenduduk";
import { ensureApiSuccess } from "@/lib/api";
import { pendudukSchema, type PendudukFormValues } from "@/lib/admin-schemas";
import { updatePenduduk } from "@/services/penduduk.service";

const emptyValues: PendudukFormValues = {
  tahun: 0,
  jumlahPenduduk: 0,
  lakiLaki: 0,
  perempuan: 0,
  kk: 0,
  rt: 0,
  rw: 0,
};

export default function AdminPendudukPage() {
  const queryClient = useQueryClient();
  const { data } = usePenduduk();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PendudukFormValues>({
    resolver: zodResolver(pendudukSchema),
    defaultValues: emptyValues,
  });

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);

  const mutation = useMutation({
    mutationFn: async (values: PendudukFormValues) =>
      ensureApiSuccess(await updatePenduduk(values)),
    onSuccess: (savedData) => {
      queryClient.setQueryData(["penduduk"], savedData);
      toast.success("Data penduduk berhasil diperbarui.");
      queryClient.invalidateQueries({ queryKey: ["penduduk"] });
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Data penduduk gagal diperbarui.",
      );
    },
  });

  return (
    <form onSubmit={handleSubmit((values) => mutation.mutate(values))} className="grid gap-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5">
        <h2 className="text-lg font-bold text-slate-950">Manajemen Data Penduduk</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <AdminField
            label="Tahun"
            type="number"
            error={errors.tahun?.message}
            {...register("tahun", { valueAsNumber: true })}
          />
          <AdminField
            label="Jumlah Penduduk"
            type="number"
            error={errors.jumlahPenduduk?.message}
            {...register("jumlahPenduduk", { valueAsNumber: true })}
          />
          <AdminField
            label="Laki-laki"
            type="number"
            error={errors.lakiLaki?.message}
            {...register("lakiLaki", { valueAsNumber: true })}
          />
          <AdminField
            label="Perempuan"
            type="number"
            error={errors.perempuan?.message}
            {...register("perempuan", { valueAsNumber: true })}
          />
          <AdminField
            label="Jumlah KK"
            type="number"
            error={errors.kk?.message}
            {...register("kk", { valueAsNumber: true })}
          />
          <AdminField
            label="Jumlah RT"
            type="number"
            error={errors.rt?.message}
            {...register("rt", { valueAsNumber: true })}
          />
          <AdminField
            label="Jumlah RW"
            type="number"
            error={errors.rw?.message}
            {...register("rw", { valueAsNumber: true })}
          />
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
