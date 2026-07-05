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

    router.replace("/");
    router.refresh();
  }

  return (
    <aside className="flex min-h-screen flex-col border-r border-slate-200 bg-white lg:fixed lg:inset-y-0 lg:left-0 lg:w-72">
      <div className="flex h-16 items-center gap-3 border-b border-slate-200 px-5">
        <span className="flex size-10 items-center justify-center rounded-2xl bg-emerald-600 font-bold text-white shadow-sm shadow-emerald-900/15">
          G
        </span>
        <div>
          <p className="font-bold text-slate-950">Dashboard Admin</p>
          <p className="text-xs text-slate-500">Padukuhan Tamansari</p>
        </div>
      </div>
      <nav className="flex flex-1 flex-col p-3">
        <div className="grid gap-1">
          {items.map((item) => {
            const Icon = item.icon;
            const active = pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition",
                  active
                    ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
                )}
              >
                <Icon size={18} aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="mt-auto flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50 hover:text-red-700"
        >
          <LogOut size={18} aria-hidden="true" />
          Logout
        </button>
      </nav>
    </aside>
  );
}
