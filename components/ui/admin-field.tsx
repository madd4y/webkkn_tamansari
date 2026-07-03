export function AdminField({
  label,
  defaultValue,
  multiline = false,
  type = "text",
}: {
  label: string;
  defaultValue?: string | number;
  multiline?: boolean;
  type?: string;
}) {
  const className =
    "mt-2 w-full rounded-md border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-950 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100";

  return (
    <label className="block">
      <span className="text-sm font-semibold text-zinc-700">{label}</span>
      {multiline ? (
        <textarea defaultValue={defaultValue} rows={5} className={className} />
      ) : (
        <input defaultValue={defaultValue} type={type} className={className} />
      )}
    </label>
  );
}
