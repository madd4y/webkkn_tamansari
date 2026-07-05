import { CalendarDays } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { PublicLayout } from "@/components/layout/public-layout";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { getYouTubeEmbedUrl } from "@/lib/utils";
import { getVideoProfil } from "@/services/video.service";

export const metadata = {
  title: "Video Profil",
};

export default async function VideoPage() {
  const video = (await getVideoProfil()).data;
  const embedUrl = getYouTubeEmbedUrl(video.youtubeUrl);

  return (
    <PublicLayout>
      <PageHeader
        eyebrow="Video Profil"
        title={video.judul}
        description="Video profil padukuhan yang dapat diperbarui melalui dashboard admin."
      />
      <section className="bg-white py-16">
        <Container>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-950/5">
            <div className="aspect-video bg-slate-950">
              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  title={video.judul}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                  loading="lazy"
                />
              ) : null}
            </div>
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
                <CalendarDays size={17} aria-hidden="true" />
                {format(new Date(video.tanggalPublikasi), "dd MMMM yyyy", { locale: id })}
              </div>
              <h2 className="mt-3 text-2xl font-bold text-slate-950">{video.judul}</h2>
              <p className="mt-3 max-w-3xl leading-8 text-slate-700">{video.deskripsi}</p>
            </div>
          </div>
        </Container>
      </section>
    </PublicLayout>
  );
}
