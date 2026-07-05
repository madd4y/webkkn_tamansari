import { FileSearch } from "lucide-react";

export function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-[#d6c3a5] bg-[#faf7f0] p-8 text-center">
      <div className="flex size-12 items-center justify-center rounded-2xl bg-white text-[#8b7355] shadow-sm ring-1 ring-[#e5ded3]">
        <FileSearch size={22} aria-hidden="true" />
      </div>
      <h3 className="mt-4 text-base font-bold text-slate-950">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">
        {description}
      </p>
    </div>
  );
}
