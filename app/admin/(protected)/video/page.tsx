"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Save } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { AdminField } from "@/components/ui/admin-field";
import { useVideo } from "@/hooks/useVideo";
import { ensureApiSuccess } from "@/lib/api";
import { videoSchema, type VideoFormValues } from "@/lib/admin-schemas";
import { updateVideoProfil } from "@/services/video.service";
import type { VideoProfil } from "@/types";

const emptyValues: VideoFormValues = {
  judul: "",
  youtubeUrl: "",
  deskripsi: "",
};

export default function AdminVideoPage() {
  const queryClient = useQueryClient();
  const { data: video } = useVideo();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VideoFormValues>({
    resolver: zodResolver(videoSchema),
    defaultValues: emptyValues,
  });

  useEffect(() => {
    if (!video) {
      return;
    }

    reset({
      judul: video.judul,
      youtubeUrl: video.youtubeUrl,
      deskripsi: video.deskripsi,
    });
  }, [video, reset]);

  const mutation = useMutation({
    mutationFn: async (payload: VideoProfil) =>
      ensureApiSuccess(await updateVideoProfil(payload)),
    onSuccess: (savedVideo) => {
      queryClient.setQueryData(["video"], savedVideo);
      toast.success("Video profil berhasil diperbarui.");
      queryClient.invalidateQueries({ queryKey: ["video"] });
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Video profil gagal diperbarui.",
      );
    },
  });

  function onSubmit(values: VideoFormValues) {
    mutation.mutate({
      id: video?.id ?? "video-profil",
      tanggalPublikasi: video?.tanggalPublikasi ?? new Date().toISOString(),
      ...values,
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5">
        <h2 className="text-lg font-bold text-slate-950">Manajemen Video Profil</h2>
        <div className="mt-6 grid gap-5">
          <AdminField
            label="Judul Video"
            error={errors.judul?.message}
            {...register("judul")}
          />
          <AdminField
            label="URL YouTube"
            type="url"
            error={errors.youtubeUrl?.message}
            {...register("youtubeUrl")}
          />
          <AdminField
            label="Deskripsi"
            multiline
            error={errors.deskripsi?.message}
            {...register("deskripsi")}
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
