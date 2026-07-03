"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  Camera,
  Contact,
  Home,
  LogOut,
  MonitorPlay,
  Store,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/admin/dashboard", label: "Dashboard", icon: Home },
  { href: "/admin/profil", label: "Profil Padukuhan", icon: Contact },
  { href: "/admin/penduduk", label: "Data Penduduk", icon: Users },
  { href: "/admin/video", label: "Video Profil", icon: MonitorPlay },
  { href: "/admin/umkm", label: "UMKM", icon: Store },
  { href: "/admin/dokumentasi", label: "Dokumentasi", icon: Camera },
  { href: "/admin/kontak", label: "Kontak", icon: BarChart3 },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/logout", {
      method: "POST",
    });

    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <aside className="border-r border-zinc-200 bg-white lg:fixed lg:inset-y-0 lg:left-0 lg:w-72">
      <div className="flex h-18 items-center gap-3 border-b border-zinc-200 px-5">
        <span className="flex size-10 items-center justify-center rounded-md bg-green-600 font-bold text-white">
          G
        </span>
        <div>
          <p className="font-bold text-zinc-950">Dashboard Admin</p>
          <p className="text-xs text-zinc-500">Padukuhan Gedangsari</p>
        </div>
      </div>
      <nav className="grid gap-1 p-3">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold transition",
                active
                  ? "bg-green-50 text-green-700"
                  : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950",
              )}
            >
              <Icon size={18} aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
        <button
          type="button"
          onClick={handleLogout}
          className="mt-3 flex items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-950"
        >
          <LogOut size={18} aria-hidden="true" />
          Logout
        </button>
      </nav>
    </aside>
  );
}
