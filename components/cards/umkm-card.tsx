import Image from "next/image";
import { MapPin, MessageCircle } from "lucide-react";
import type { UMKM } from "@/types";
import { getWhatsAppUrl } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";

export function UmkmCard({ item }: { item: UMKM }) {
  return (
    <article className="overflow-hidden rounded-md border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative aspect-[4/3] bg-zinc-100">
        <Image
          src={item.foto}
          alt={`Foto ${item.nama}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-md bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
            {item.kategori}
          </span>
          <span className="text-xs text-zinc-500">Pemilik: {item.pemilik}</span>
        </div>
        <h3 className="mt-4 text-lg font-bold text-zinc-950">{item.nama}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-zinc-600">
          {item.deskripsi}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <ButtonLink
            href={getWhatsAppUrl(item.whatsapp, `Halo, saya ingin bertanya tentang ${item.nama}.`)}
            target="_blank"
            rel="noopener noreferrer"
            size="sm"
          >
            <MessageCircle size={16} aria-hidden="true" />
            WhatsApp
          </ButtonLink>
          <ButtonLink
            href={item.maps}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            size="sm"
          >
            <MapPin size={16} aria-hidden="true" />
            Lokasi
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
