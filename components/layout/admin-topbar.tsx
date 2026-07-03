import { ShieldCheck } from "lucide-react";

export function AdminTopbar({
  title,
  subtitle,
  authEnabled,
}: {
  title: string;
  subtitle: string;
  authEnabled: boolean;
}) {
  return (
    <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/95 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-zinc-950">{title}</h1>
          <p className="mt-1 text-sm text-zinc-500">{subtitle}</p>
        </div>
        <div className="inline-flex w-fit items-center gap-2 rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm font-semibold text-green-800">
          <ShieldCheck size={17} aria-hidden="true" />
          {authEnabled ? "Session aktif" : "Session tidak aktif"}
        </div>
      </div>
    </header>
  );
}
