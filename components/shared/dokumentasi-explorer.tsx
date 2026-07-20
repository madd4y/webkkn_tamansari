"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { DokumentasiCard } from "@/components/cards/dokumentasi-card";
import { EmptyState } from "@/components/ui/empty-state";
import type { Dokumentasi } from "@/types";

export function DokumentasiExplorer({ items }: { items: Dokumentasi[] }) {
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("Semua");
  const years = useMemo(
    () => [
      "Semua",
      ...Array.from(new Set(items.map((item) => new Date(item.tanggal).getFullYear().toString()))),
    ],
    [items],
  );

  const filtered = items.filter((item) => {
    const target = `${item.judul} ${item.tanggal}`.toLowerCase();
    const matchesSearch = target.includes(query.toLowerCase());
    const matchesYear =
      year === "Semua" || new Date(item.tanggal).getFullYear().toString() === year;

    return matchesSearch && matchesYear;
  });

  return (
    <div className="space-y-8">
      <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-950/5 md:grid-cols-[1fr_180px]">
        <label className="relative block">
          <span className="sr-only">Cari dokumentasi</span>
          <Search
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
            aria-hidden="true"
          />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari judul atau tanggal"
            className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
          />
        </label>
        <label>
          <span className="sr-only">Filter tahun</span>
          <select
            value={year}
            onChange={(event) => setYear(event.target.value)}
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
          >
            {years.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
      </div>

      {filtered.length > 0 ? (
        <div
          className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-5 pb-4 scroll-smooth sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3"
          aria-label="Daftar dokumentasi"
        >
          {filtered.map((item) => (
            <div
              key={item.id}
              className="w-[82vw] max-w-[320px] shrink-0 snap-start sm:w-auto sm:max-w-none"
            >
              <DokumentasiCard item={item} />
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="Belum ada dokumentasi yang cocok"
          description="Coba ubah kata kunci pencarian atau pilih tahun lain."
        />
      )}
    </div>
  );
}
