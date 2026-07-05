import { forwardRef, type ChangeEventHandler, type FocusEventHandler, type Ref } from "react";

type AdminFieldProps = {
  label: string;
  defaultValue?: string | number;
  multiline?: boolean;
  type?: string;
  name?: string;
  error?: string;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
};

export const AdminField = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  AdminFieldProps
>(function AdminField(
  {
  label,
  defaultValue,
  multiline = false,
  type = "text",
  name,
  error,
  onChange,
  onBlur,
},
  ref,
) {
  const className =
    "mt-2 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-950 shadow-sm shadow-slate-950/5 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100";

  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      {multiline ? (
        <textarea
          ref={ref as Ref<HTMLTextAreaElement>}
          name={name}
          defaultValue={defaultValue}
          rows={5}
          className={className}
          aria-invalid={error ? "true" : "false"}
          onBlur={onBlur}
          onChange={onChange}
        />
      ) : (
        <input
          ref={ref as Ref<HTMLInputElement>}
          name={name}
          defaultValue={defaultValue}
          type={type}
          className={className}
          aria-invalid={error ? "true" : "false"}
          onBlur={onBlur}
          onChange={onChange}
        />
      )}
      {error ? <p className="mt-1.5 text-xs font-semibold text-red-600">{error}</p> : null}
    </label>
  );
});
