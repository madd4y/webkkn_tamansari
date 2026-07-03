import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import type { KontakPadukuhan } from "@/types";

export function Footer({ kontak }: { kontak: KontakPadukuhan }) {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <h2 className="text-xl font-bold">{kontak.namaPadukuhan}</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-300">
            Media informasi digital untuk profil, data penduduk, UMKM,
            dokumentasi kegiatan, dan kontak Padukuhan Gedangsari.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-green-300">
            Navigasi
          </h3>
          <div className="mt-4 grid gap-2 text-sm text-zinc-300">
            {["Profil", "Penduduk", "UMKM", "Dokumentasi", "Video", "Kontak"].map(
              (item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="hover:text-white"
                >
                  {item}
                </Link>
              ),
            )}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-green-300">
            Kontak
          </h3>
          <div className="mt-4 grid gap-3 text-sm text-zinc-300">
            <p className="flex gap-3">
              <MapPin className="mt-0.5 shrink-0" size={16} aria-hidden="true" />
              {kontak.alamat}
            </p>
            <p className="flex items-center gap-3">
              <Phone size={16} aria-hidden="true" />
              {kontak.telepon}
            </p>
            <p className="flex items-center gap-3">
              <Mail size={16} aria-hidden="true" />
              {kontak.email}
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-zinc-400">
        © {new Date().getFullYear()} Padukuhan Gedangsari. KKN Universitas Atma Jaya Yogyakarta.
      </div>
    </footer>
  );
}
