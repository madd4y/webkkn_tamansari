import { FileSearch } from "lucide-react";

export function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center rounded-md border border-dashed border-zinc-300 bg-zinc-50 p-8 text-center">
      <div className="flex size-12 items-center justify-center rounded-md bg-white text-green-700 shadow-sm">
        <FileSearch size={22} aria-hidden="true" />
      </div>
      <h3 className="mt-4 text-base font-semibold text-zinc-950">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-zinc-600">
        {description}
      </p>
    </div>
  );
}
