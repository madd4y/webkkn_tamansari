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
    green: "bg-[#ede6da] text-[#8b7355] ring-[#e5ded3]",
    blue: "bg-[#eef0ed] text-[#6b7280] ring-[#e5ded3]",
    amber: "bg-[#f2e5c8] text-[#8b7355] ring-[#dcc8a7]",
    zinc: "bg-[#f2ede4] text-slate-700 ring-[#e5ded3]",
  };

  return (
    <div className="group rounded-2xl border border-[#e5ded3] bg-white p-5 shadow-sm shadow-slate-950/5 transition duration-200 hover:-translate-y-0.5 hover:border-[#d6c3a5] hover:shadow-lg hover:shadow-slate-950/10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">
            {typeof value === "number" ? formatNumber(value) : value}
          </p>
        </div>
        <div className={`flex size-11 items-center justify-center rounded-xl ring-1 ${tones[tone]}`}>
          <Icon size={22} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
