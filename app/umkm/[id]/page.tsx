import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { cache } from "react";
import {
  ArrowLeft,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
  Store,
  Users,
} from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";
import { getUMKM } from "@/services/umkm.service";
import { getWhatsAppUrl } from "@/lib/utils";
import type { UMKM } from "@/types";

type UMKMDetailPageProps = {
  params: Promise<{ id: string }>;
};

const fallbackImage =
  "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=1200&q=80";

const addressFallback = "Tamansari, Watugajah, Gedangsari, Gunungkidul";
const mapsFallbackUrl =
  "https://www.google.com/maps/search/?api=1&query=-7.8045719,110.5831436";

const getUMKMDetail = cache(async (id: string) => {
  const items = (await getUMKM()).data;
  const decodedId = decodeURIComponent(id);
  const item = items.find((entry) => entry.id === decodedId);

  return { item, relatedItems: items.filter((entry) => entry.id !== decodedId).slice(0, 2) };
});

function getImageSource(item: UMKM) {
  return item.foto?.trim() || fallbackImage;
}

export async function generateMetadata({
  params,
}: UMKMDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const { item } = await getUMKMDetail(id);

  if (!item) {
    return {
      title: "UMKM tidak ditemukan",
    };
  }

  return {
    title: item.nama,
    description: item.deskripsi,
  };
}

export default async function UMKMDetailPage({ params }: UMKMDetailPageProps) {
  const { id } = await params;
  const { item, relatedItems } = await getUMKMDetail(id);

  if (!item) {
    notFound();
  }

  return (
    <PublicLayout>
      <section className="bg-[#f7f3ec] pb-16 pt-24">
        <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-8">
          <Link
            href="/umkm"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#6b7280] transition hover:text-[#8b7355]"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            Kembali ke UMKM
          </Link>

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,800px)_384px]">
            <div className="min-w-0 space-y-6">
              <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-[#ede6da] shadow-sm lg:h-[450px] lg:aspect-auto">
                <Image
                  src={getImageSource(item)}
                  alt={`Foto ${item.nama}`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 800px, 100vw"
                  className="object-cover object-center"
                />
              </div>

              <article className="rounded-2xl border border-[#e5ded3] bg-white p-6 shadow-sm sm:p-8">
                <span className="inline-flex rounded-full border border-[#fee685] bg-[#fffbeb] px-3 py-1 text-xs font-bold text-[#bb4d00]">
                  {item.kategori}
                </span>

                <h1 className="mt-4 text-2xl font-extrabold leading-tight text-[#1f2937]">
                  {item.nama}
                </h1>

                <div className="mt-3 flex items-center gap-2 text-sm text-[#6b7280]">
                  <Users size={14} aria-hidden="true" />
                  <span>Pemilik:</span>
                  <span className="font-bold text-[#1f2937]">{item.pemilik}</span>
                </div>

                <h2 className="mt-7 text-lg font-bold text-[#1f2937]">Tentang Usaha</h2>
                <p className="mt-3 text-sm leading-7 text-[#6b7280]">
                  {item.deskripsi}
                </p>
              </article>
            </div>

            <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
              <section className="rounded-2xl border border-[#e5ded3] bg-white p-6 shadow-sm">
                <h2 className="text-lg font-extrabold text-[#1f2937]">Kontak Usaha</h2>

                <div className="mt-5 space-y-4 text-sm text-[#6b7280]">
                  <p className="flex items-center gap-3">
                    <Phone size={14} className="text-[#8b7355]" aria-hidden="true" />
                    {item.whatsapp || "Nomor belum tersedia"}
                  </p>
                  <p className="flex items-start gap-3">
                    <MapPin
                      size={14}
                      className="mt-0.5 shrink-0 text-[#8b7355]"
                      aria-hidden="true"
                    />
                    {addressFallback}
                  </p>
                  <p className="flex items-center gap-3">
                    <Clock size={14} className="text-[#8b7355]" aria-hidden="true" />
                    Buka: {item.jamBuka || "Hubungi pemilik"}
                  </p>
                </div>

                <div className="mt-6 grid gap-3">
                  <Link
                    href={getWhatsAppUrl(
                      item.whatsapp,
                      `Halo, saya ingin bertanya tentang ${item.nama}.`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-2xl bg-[#8b7355] px-5 text-sm font-bold text-white shadow-sm transition hover:bg-[#7c674c]"
                  >
                    <MessageCircle size={15} aria-hidden="true" />
                    Hubungi via WhatsApp
                  </Link>
                  <Link
                    href={item.maps || mapsFallbackUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-2xl border border-[#e5ded3] bg-white px-5 text-sm font-bold text-[#6b7280] transition hover:border-[#d6c3a5] hover:text-[#8b7355]"
                  >
                    <MapPin size={15} aria-hidden="true" />
                    Lihat Lokasi
                  </Link>
                </div>
              </section>

              {relatedItems.length > 0 && (
                <section className="rounded-2xl border border-[#e5ded3] bg-[#f7f3ec] p-6">
                  <h2 className="text-lg font-extrabold text-[#1f2937]">Produk Lainnya</h2>

                  <div className="mt-4 divide-y divide-[#e5ded3]">
                    {relatedItems.map((relatedItem) => (
                      <Link
                        key={relatedItem.id}
                        href={`/umkm/${encodeURIComponent(relatedItem.id)}`}
                        className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
                      >
                        <span className="relative size-10 shrink-0 overflow-hidden rounded-xl bg-[#ede6da]">
                          <Image
                            src={getImageSource(relatedItem)}
                            alt={`Foto ${relatedItem.nama}`}
                            fill
                            sizes="40px"
                            className="object-cover object-center"
                          />
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-xs font-extrabold text-[#1f2937]">
                            {relatedItem.nama}
                          </span>
                          <span className="mt-0.5 flex items-center gap-1 text-xs text-[#6b7280]">
                            <Store size={11} aria-hidden="true" />
                            {relatedItem.kategori}
                          </span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </aside>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
