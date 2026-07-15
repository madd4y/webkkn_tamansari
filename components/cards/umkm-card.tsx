import Image from "next/image";
import { Eye, MessageCircle } from "lucide-react";
import type { UMKM } from "@/types";
import { getWhatsAppUrl } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";

export function UmkmCard({ item }: { item: UMKM }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-[#e5e0d8] bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(124,106,85,0.12)]">
      <div className="relative aspect-[341/213] bg-[#f3eee8]">
        <Image
          src={item.foto}
          alt={`Foto ${item.nama}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-center transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="rounded-full bg-[#e7d8c9] px-3 py-1 text-xs font-bold text-[#7c6a55]">
            {item.kategori}
          </span>
          <span className="min-w-0 text-xs font-medium text-slate-500">Pemilik: {item.pemilik}</span>
        </div>
        <h3 className="mt-4 text-xl font-bold text-slate-950">{item.nama}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
          {item.deskripsi}
        </p>
        <div className="mt-5 grid gap-2 min-[420px]:grid-cols-2">
          <ButtonLink
            href={getWhatsAppUrl(item.whatsapp, `Halo, saya ingin bertanya tentang ${item.nama}.`)}
            target="_blank"
            rel="noopener noreferrer"
            size="sm"
            className="w-full"
          >
            <MessageCircle size={16} aria-hidden="true" />
            WhatsApp
          </ButtonLink>
          <ButtonLink
            href={`/umkm/${encodeURIComponent(item.id)}`}
            variant="secondary"
            size="sm"
            className="w-full"
          >
            <Eye size={16} aria-hidden="true" />
            Detail
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
