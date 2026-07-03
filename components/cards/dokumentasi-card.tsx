import Image from "next/image";
import { CalendarDays } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import type { Dokumentasi } from "@/types";

export function DokumentasiCard({ item }: { item: Dokumentasi }) {
  return (
    <article className="overflow-hidden rounded-md border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative aspect-[4/3] bg-zinc-100">
        <Image
          src={item.foto}
          alt={`Dokumentasi ${item.judul}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 text-sm font-medium text-green-700">
          <CalendarDays size={16} aria-hidden="true" />
          {format(new Date(item.tanggal), "dd MMMM yyyy", { locale: id })}
        </div>
        <h3 className="mt-3 text-lg font-bold text-zinc-950">{item.judul}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-zinc-600">
          {item.deskripsi}
        </p>
      </div>
    </article>
  );
}
