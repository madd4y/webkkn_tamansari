import type { LucideIcon } from "lucide-react";
import { formatNumber } from "@/lib/utils";

export function StatCard({
  label,
  value,
  icon: Icon,
  tone = "green",
}: {
  label: string;
  value: number | string;
  icon: LucideIcon;
  tone?: "green" | "blue" | "amber" | "zinc";
}) {
  const tones = {
    green: "bg-green-50 text-green-700",
    blue: "bg-sky-50 text-sky-700",
    amber: "bg-amber-50 text-amber-700",
    zinc: "bg-zinc-100 text-zinc-700",
  };

  return (
    <div className="rounded-md border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-zinc-500">{label}</p>
          <p className="mt-2 text-2xl font-bold text-zinc-950">
            {typeof value === "number" ? formatNumber(value) : value}
          </p>
        </div>
        <div className={`flex size-11 items-center justify-center rounded-md ${tones[tone]}`}>
          <Icon size={22} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
