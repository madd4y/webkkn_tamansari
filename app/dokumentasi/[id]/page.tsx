import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { cache } from "react";
import { ArrowLeft, CalendarDays, Images } from "lucide-react";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { PublicLayout } from "@/components/layout/public-layout";
import { getDokumentasi } from "@/services/dokumentasi.service";
import type { Dokumentasi } from "@/types";

type DokumentasiDetailPageProps = {
  params: Promise<{ id: string }>;
};

const fallbackImage =
  "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1400&q=85";

const getDokumentasiDetail = cache(async (id: string) => {
  const items = (await getDokumentasi()).data;
  const decodedId = decodeURIComponent(id);
  const item = items.find((entry) => entry.id === decodedId);
  const relatedItems = items
    .filter((entry) => entry.id !== decodedId)
    .slice(0, 3);

  return { item, relatedItems };
});

function getImageSource(item: Dokumentasi) {
  return item.foto?.trim() || fallbackImage;
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return format(date, "dd MMMM yyyy", { locale: idLocale });
}

export async function generateMetadata({
  params,
}: DokumentasiDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const { item } = await getDokumentasiDetail(id);

  if (!item) {
    return {
      title: "Dokumentasi tidak ditemukan",
    };
  }

  return {
    title: item.judul,
    description: item.deskripsi,
  };
}

export default async function DokumentasiDetailPage({
  params,
}: DokumentasiDetailPageProps) {
  const { id } = await params;
  const { item, relatedItems } = await getDokumentasiDetail(id);

  if (!item) {
    notFound();
  }

  return (
    <PublicLayout>
      <section className="bg-[#f7f3ec] pb-16 pt-24 sm:pb-20">
        <div className="mx-auto w-full max-w-[1143px] px-5 sm:px-8">
          <Link
            href="/dokumentasi"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#6b7280] transition hover:text-[#8b7355]"
          >
            <ArrowLeft size={15} aria-hidden="true" />
            Kembali ke dokumentasi
          </Link>

          <article className="mt-7 overflow-hidden rounded-2xl border border-[#e5ded3] bg-white shadow-[0_12px_34px_rgba(31,41,55,0.08)]">
            <div className="relative aspect-[16/9] bg-[#ede6da] sm:aspect-[2/1]">
              <Image
                src={getImageSource(item)}
                alt={`Dokumentasi ${item.judul}`}
                fill
                priority
                sizes="(min-width: 1200px) 1143px, 100vw"
                className="object-cover object-center"
              />
            </div>

            <div className="p-5 sm:p-8 lg:p-10">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#8b7355]">
                <CalendarDays size={17} aria-hidden="true" />
                <time dateTime={item.tanggal}>{formatDate(item.tanggal)}</time>
              </div>
              <h1 className="mt-4 max-w-4xl text-2xl font-extrabold leading-tight text-[#1f2937] sm:text-4xl">
                {item.judul}
              </h1>
              <p className="mt-5 max-w-4xl whitespace-pre-line text-justify text-base leading-8 text-[#6b7280] sm:text-lg sm:leading-9">
                {item.deskripsi}
              </p>
            </div>
          </article>

          {relatedItems.length > 0 && (
            <section className="mt-12 sm:mt-16">
              <div className="flex items-center gap-3">
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-[#e7d8c9] text-[#7c6a55]">
                  <Images size={19} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#9a7b55]">
                    Galeri Kegiatan
                  </p>
                  <h2 className="mt-1 text-xl font-extrabold text-[#1f2937] sm:text-2xl">
                    Dokumentasi lainnya
                  </h2>
                </div>
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {relatedItems.map((relatedItem) => (
                  <Link
                    key={relatedItem.id}
                    href={`/dokumentasi/${encodeURIComponent(relatedItem.id)}`}
                    className="group overflow-hidden rounded-2xl border border-[#e5ded3] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(124,106,85,0.12)]"
                  >
                    <span className="relative block aspect-[341/213] bg-[#ede6da]">
                      <Image
                        src={getImageSource(relatedItem)}
                        alt={`Dokumentasi ${relatedItem.judul}`}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover object-center transition duration-500 group-hover:scale-105"
                      />
                    </span>
                    <span className="block p-5">
                      <span className="flex items-center gap-2 text-xs font-semibold text-[#8b7355]">
                        <CalendarDays size={14} aria-hidden="true" />
                        {formatDate(relatedItem.tanggal)}
                      </span>
                      <span className="mt-2 block text-base font-extrabold leading-snug text-[#1f2937]">
                        {relatedItem.judul}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
