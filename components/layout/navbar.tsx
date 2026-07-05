"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Landmark, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Beranda" },
  { href: "/profil", label: "Profil" },
  { href: "/penduduk", label: "Penduduk" },
  { href: "/umkm", label: "UMKM" },
  { href: "/dokumentasi", label: "Dokumentasi" },
  { href: "/video", label: "Video" },
  { href: "/kontak", label: "Kontak" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const transparent = !scrolled && !open;
  const onHomeHero = pathname === "/" && transparent;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition duration-300",
        "h-[104px]",
        transparent
          ? "border-b border-transparent bg-transparent text-[#1f2937]"
          : "border-b border-[#e5e0d8] bg-white/95 text-[#1f2937] shadow-sm backdrop-blur-xl",
      )}
    >
      <nav className="mx-auto flex h-[104px] max-w-[1550px] items-center justify-between px-8 xl:px-12">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="flex size-14 items-center justify-center rounded-full bg-[#8a7358] text-white shadow-[0_4px_10px_rgba(31,41,55,0.18)]">
            <Landmark size={25} aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span
              className={cn(
                "block text-2xl font-extrabold leading-7",
                onHomeHero ? "text-white" : "text-[#1f2937]",
              )}
            >
              Padukuhan
            </span>
            <span
              className={cn(
                "block text-lg font-extrabold leading-5",
                onHomeHero ? "text-[#ead8b8]" : "text-[#8a7358]",
              )}
            >
              Tamansari
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-3 lg:flex">
          {navItems.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-xl px-3 py-2 text-sm font-semibold transition",
                  active
                    ? onHomeHero
                      ? "bg-white/15 px-6 py-3 text-2xl font-extrabold text-white"
                      : "bg-[#eeeae6] px-6 py-3 text-2xl font-extrabold text-[#8a7358]"
                    : onHomeHero
                      ? "px-4 py-3 text-2xl font-extrabold text-white/85 hover:bg-white/10 hover:text-white"
                      : "px-4 py-3 text-2xl font-extrabold text-[#6b7280] hover:bg-[#f3eee8] hover:text-[#1f2937]",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <button
          type="button"
          className={cn(
            "inline-flex size-12 items-center justify-center rounded-xl lg:hidden",
            onHomeHero ? "bg-white/15 text-white" : "bg-[#f3eee8] text-[#1f2937]",
          )}
          aria-label={open ? "Tutup menu" : "Buka menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-[#e5e0d8] bg-white/95 px-5 pb-5 pt-2 text-[#1f2937] shadow-lg backdrop-blur-xl lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-1">
            {navItems.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-xl px-3 py-2 text-sm font-semibold transition",
                    active
                      ? "bg-[#e7d8c9] text-[#7c6a55]"
                      : "text-slate-700 hover:bg-[#f3eee8]",
                  )}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}
    </header>
  );
}
