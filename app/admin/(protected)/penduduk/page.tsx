"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Save } from "lucide-react";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
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
  lakiLakiUsia0_19: 82,
  lakiLakiUsia20_59: 140,
  lakiLakiUsia60Plus: 58,
  perempuanUsia0_19: 57,
  perempuanUsia20_59: 124,
  perempuanUsia60Plus: 79,
};

export default function AdminPendudukPage() {
  const queryClient = useQueryClient();
  const { data } = usePenduduk();
  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<PendudukFormValues>({
    resolver: zodResolver(pendudukSchema),
    defaultValues: emptyValues,
  });

  useEffect(() => {
    if (data) {
      reset({ ...emptyValues, ...data });
    }
  }, [data, reset]);

  const ageValues = useWatch({ control });
  const lakiLakiUsiaTotal =
    (ageValues.lakiLakiUsia0_19 || 0) +
    (ageValues.lakiLakiUsia20_59 || 0) +
    (ageValues.lakiLakiUsia60Plus || 0);
  const perempuanUsiaTotal =
    (ageValues.perempuanUsia0_19 || 0) +
    (ageValues.perempuanUsia20_59 || 0) +
    (ageValues.perempuanUsia60Plus || 0);
  const jumlahPendudukTotal = lakiLakiUsiaTotal + perempuanUsiaTotal;

  useEffect(() => {
    setValue("lakiLaki", lakiLakiUsiaTotal);
    setValue("perempuan", perempuanUsiaTotal);
    setValue("jumlahPenduduk", jumlahPendudukTotal);
  }, [
    jumlahPendudukTotal,
    lakiLakiUsiaTotal,
    perempuanUsiaTotal,
    setValue,
  ]);

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
            label="Jumlah Penduduk (otomatis)"
            type="number"
            readOnly
            error={errors.jumlahPenduduk?.message}
            {...register("jumlahPenduduk", { valueAsNumber: true })}
          />
          <AdminField
            label="Laki-laki (otomatis)"
            type="number"
            readOnly
            error={errors.lakiLaki?.message}
            {...register("lakiLaki", { valueAsNumber: true })}
          />
          <AdminField
            label="Perempuan (otomatis)"
            type="number"
            readOnly
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

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-950">Kelompok Usia</h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Data ini ditampilkan pada halaman publik Data Penduduk.
            </p>
          </div>
          <p className="text-sm font-semibold text-slate-500">
            Total usia: {jumlahPendudukTotal} jiwa
          </p>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-bold text-slate-950">Laki-laki</h3>
              <span className="text-sm font-bold text-sky-700">
                Total: {lakiLakiUsiaTotal}
              </span>
            </div>
            <div className="mt-5 grid gap-5">
              <AdminField
                label="Usia 0-19"
                type="number"
                error={errors.lakiLakiUsia0_19?.message}
                {...register("lakiLakiUsia0_19", { valueAsNumber: true })}
              />
              <AdminField
                label="Usia 20-59"
                type="number"
                error={errors.lakiLakiUsia20_59?.message}
                {...register("lakiLakiUsia20_59", { valueAsNumber: true })}
              />
              <AdminField
                label="Usia 60+"
                type="number"
                error={errors.lakiLakiUsia60Plus?.message}
                {...register("lakiLakiUsia60Plus", { valueAsNumber: true })}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-bold text-slate-950">Perempuan</h3>
              <span className="text-sm font-bold text-amber-700">
                Total: {perempuanUsiaTotal}
              </span>
            </div>
            <div className="mt-5 grid gap-5">
              <AdminField
                label="Usia 0-19"
                type="number"
                error={errors.perempuanUsia0_19?.message}
                {...register("perempuanUsia0_19", { valueAsNumber: true })}
              />
              <AdminField
                label="Usia 20-59"
                type="number"
                error={errors.perempuanUsia20_59?.message}
                {...register("perempuanUsia20_59", { valueAsNumber: true })}
              />
              <AdminField
                label="Usia 60+"
                type="number"
                error={errors.perempuanUsia60Plus?.message}
                {...register("perempuanUsia60Plus", { valueAsNumber: true })}
              />
            </div>
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
