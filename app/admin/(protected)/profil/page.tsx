"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Save } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { AdminField } from "@/components/ui/admin-field";
import { useProfil } from "@/hooks/useProfil";
import { ensureApiSuccess } from "@/lib/api";
import { profilSchema, type ProfilFormValues } from "@/lib/admin-schemas";
import { updateProfil } from "@/services/profil.service";
import type { OrganizationMember, ProfilPadukuhan } from "@/types";

const strukturDefaults: OrganizationMember[] = [
  { jabatan: "Dukuh", nama: "Bapak Supriyanto" },
  { jabatan: "Ketua RW 01", nama: "Bapak Wahyudi" },
  { jabatan: "Ketua RT 01", nama: "Pak Agus" },
  { jabatan: "Ketua RT 02", nama: "Pak Bambang" },
  { jabatan: "Ketua RT 03", nama: "Pak Cipto" },
  { jabatan: "Ketua RT 04", nama: "Pak Darwanto" },
  { jabatan: "Ketua RT 05", nama: "Pak Eko" },
  { jabatan: "Ketua RT 06", nama: "Pak Fauzi" },
  { jabatan: "Ketua RT 07", nama: "Ibu Ginarsih" },
  { jabatan: "Ketua RT 08", nama: "Pak Hartono" },
];

const emptyValues: ProfilFormValues = {
  sejarah: "",
  visi: "",
  misi: "",
  geografis: "",
  luas: "",
  ketinggian: "",
  maps: "",
  struktur: strukturDefaults,
};

function normalizeStruktur(struktur?: OrganizationMember[]) {
  return strukturDefaults.map((fallback, index) => {
    const item = struktur?.[index];

    return {
      jabatan: fallback.jabatan,
      nama: item?.nama?.trim() || fallback.nama,
    };
  });
}

export default function AdminProfilPage() {
  const queryClient = useQueryClient();
  const { data: profil } = useProfil();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfilFormValues>({
    resolver: zodResolver(profilSchema),
    defaultValues: emptyValues,
  });

  useEffect(() => {
    if (!profil) {
      return;
    }

    reset({
      sejarah: profil.sejarah,
      visi: profil.visi,
      misi: profil.misi.join("\n"),
      geografis: profil.geografis,
      luas: profil.luas,
      ketinggian: profil.ketinggian,
      maps: profil.maps,
      struktur: normalizeStruktur(profil.struktur),
    });
  }, [profil, reset]);

  const mutation = useMutation({
    mutationFn: async (payload: ProfilPadukuhan) =>
      ensureApiSuccess(await updateProfil(payload)),
    onSuccess: (savedProfil) => {
      queryClient.setQueryData(["profil"], savedProfil);
      toast.success("Profil berhasil diperbarui.");
      queryClient.invalidateQueries({ queryKey: ["profil"] });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Profil gagal diperbarui.");
    },
  });

  function onSubmit(values: ProfilFormValues) {
    const payload: ProfilPadukuhan = {
      id: profil?.id ?? "profil-padukuhan",
      ...values,
      utara: profil?.utara ?? "",
      selatan: profil?.selatan ?? "",
      timur: profil?.timur ?? "",
      barat: profil?.barat ?? "",
      misi: values.misi
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
      struktur: values.struktur,
    };

    mutation.mutate(payload);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5">
        <h2 className="text-lg font-bold text-slate-950">Manajemen Profil Padukuhan</h2>
        <div className="mt-6 grid gap-5">
          <AdminField
            label="Sejarah"
            multiline
            error={errors.sejarah?.message}
            {...register("sejarah")}
          />
          <AdminField
            label="Visi"
            multiline
            error={errors.visi?.message}
            {...register("visi")}
          />
          <AdminField
            label="Misi"
            multiline
            error={errors.misi?.message}
            {...register("misi")}
          />
          <AdminField
            label="Letak Geografis"
            multiline
            error={errors.geografis?.message}
            {...register("geografis")}
          />
          <div className="grid gap-5 md:grid-cols-2">
            <AdminField
              label="Luas Wilayah"
              error={errors.luas?.message}
              {...register("luas")}
            />
            <AdminField
              label="Ketinggian"
              error={errors.ketinggian?.message}
              {...register("ketinggian")}
            />
          </div>
          <AdminField
            label="Embed Google Maps"
            error={errors.maps?.message}
            {...register("maps")}
          />
        </div>
      </section>
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5">
        <h2 className="text-lg font-bold text-slate-950">Struktur Organisasi</h2>
        <p className="mt-1 text-sm text-slate-500">
          Kelola nama pengurus untuk 1 Dukuh, 1 Ketua RW, dan 8 Ketua RT.
        </p>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {strukturDefaults.map((item, index) => (
            <div key={item.jabatan}>
              <input type="hidden" {...register(`struktur.${index}.jabatan`)} />
              <AdminField
                label={item.jabatan}
                error={errors.struktur?.[index]?.nama?.message}
                {...register(`struktur.${index}.nama`)}
              />
            </div>
          ))}
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
