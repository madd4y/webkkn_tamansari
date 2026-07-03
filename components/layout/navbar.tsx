"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";

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
  const isHome = pathname === "/";
  const transparent = isHome && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition",
        transparent
          ? "bg-transparent text-white"
          : "border-b border-zinc-200 bg-white/95 text-zinc-950 shadow-sm backdrop-blur",
      )}
    >
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span
            className={cn(
              "flex size-10 items-center justify-center rounded-md font-bold",
              transparent ? "bg-white text-green-700" : "bg-green-600 text-white",
            )}
          >
            G
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-bold leading-5">
              Padukuhan Gedangsari
            </span>
            <span
              className={cn(
                "block text-xs leading-4",
                transparent ? "text-green-50" : "text-zinc-500",
              )}
            >
              Profil Digital
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-semibold transition",
                  active
                    ? transparent
                      ? "bg-white/15 text-white"
                      : "bg-green-50 text-green-700"
                    : transparent
                      ? "text-white/85 hover:bg-white/10 hover:text-white"
                      : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden lg:block">
          <ButtonLink
            href="/admin/dashboard"
            variant={transparent ? "secondary" : "primary"}
            size="sm"
          >
            Admin
          </ButtonLink>
        </div>

        <button
          type="button"
          className={cn(
            "inline-flex size-10 items-center justify-center rounded-md lg:hidden",
            transparent ? "bg-white/15 text-white" : "bg-zinc-100 text-zinc-950",
          )}
          aria-label={open ? "Tutup menu" : "Buka menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-zinc-200 bg-white px-4 pb-5 pt-2 text-zinc-950 shadow-lg lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-100"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <ButtonLink href="/admin/dashboard" className="mt-2" onClick={() => setOpen(false)}>
              Admin
            </ButtonLink>
          </div>
        </div>
      ) : null}
    </header>
  );
}
