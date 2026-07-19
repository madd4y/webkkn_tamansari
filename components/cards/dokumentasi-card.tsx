import Image from "next/image";
import { CalendarDays, Eye } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { ButtonLink } from "@/components/ui/button";
import type { Dokumentasi } from "@/types";

export function DokumentasiCard({ item }: { item: Dokumentasi }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#e5e0d8] bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(124,106,85,0.12)]">
      <div className="relative aspect-[341/213] bg-[#f3eee8]">
        <Image
          src={item.foto}
          alt={`Dokumentasi ${item.judul}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-center transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#7c6a55]">
          <CalendarDays size={16} aria-hidden="true" />
          {format(new Date(item.tanggal), "dd MMMM yyyy", { locale: id })}
        </div>
        <h3 className="mt-3 text-xl font-bold text-slate-950">{item.judul}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
          {item.deskripsi}
        </p>
        <ButtonLink
          href={`/dokumentasi/${encodeURIComponent(item.id)}`}
          variant="secondary"
          size="sm"
          className="mt-5 w-fit"
        >
          <Eye size={16} aria-hidden="true" />
          Detail
        </ButtonLink>
      </div>
    </article>
  );
}
