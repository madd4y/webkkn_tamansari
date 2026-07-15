import Link from "next/link";
import { Landmark, Mail, MapPin, Phone } from "lucide-react";
import type { KontakPadukuhan } from "@/types";

export function Footer({ kontak }: { kontak: KontakPadukuhan }) {
  const menuItems = ["Beranda", "Profil", "Penduduk", "UMKM", "Dokumentasi", "Video", "Kontak"];

  return (
    <footer className="bg-[#2b221d] text-white shadow-[0_-8px_30px_rgba(31,41,55,0.08)]">
      <div className="mx-auto grid max-w-[1216px] gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1.05fr_0.85fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-full bg-[#8b7355] text-white shadow-sm">
              <Landmark size={18} aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-base font-bold leading-5 text-white">{kontak.namaPadukuhan}</h2>
              <p className="text-sm font-medium leading-5 text-[#d6c3a5]">
                Kalurahan Watugajah, Gedangsari
              </p>
            </div>
          </div>
          <p className="mt-6 max-w-[360px] text-sm font-medium leading-7 text-[#9ca3af]">
            Website profil resmi {kontak.namaPadukuhan}. Menyajikan informasi
            publik, data penduduk, dan potensi lokal untuk masyarakat.
          </p>
        </div>
        <div>
          <h3 className="text-base font-bold text-[#d6c3a5]">
            Menu Cepat
          </h3>
          <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-4 text-sm font-semibold text-[#9ca3af] sm:gap-x-12">
            {menuItems.map((item) => (
              <Link
                key={item}
                href={item === "Beranda" ? "/" : `/${item.toLowerCase()}`}
                className="transition hover:text-white"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-base font-bold text-[#d6c3a5]">
            Kontak
          </h3>
          <div className="mt-6 grid gap-4 text-sm font-semibold leading-7 text-[#9ca3af]">
            <p className="flex gap-4">
              <MapPin className="mt-1 shrink-0 text-[#8b7355]" size={16} aria-hidden="true" />
              <span className="max-w-[360px]">{kontak.alamat}</span>
            </p>
            <p className="flex items-center gap-4">
              <Phone className="text-[#8b7355]" size={16} aria-hidden="true" />
              {kontak.telepon}
            </p>
            <p className="flex items-center gap-4">
              <Mail className="text-[#8b7355]" size={16} aria-hidden="true" />
              {kontak.email}
            </p>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-[1216px] px-5 pb-10 sm:px-8 sm:pb-12">
        <div className="flex flex-col gap-4 border-t border-white/10 pt-8 text-sm font-semibold text-[#6b7280] sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} {kontak.namaPadukuhan}. Dibuat oleh Kelompok 54 KKN 89 UAJY .</span>
          <Link href="/admin/dashboard" className="transition hover:text-white">
            Portal Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
