import { cn } from "@/lib/utils";

export function FieldGroup({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5", className)}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
        {description ? <p className="mt-1 text-sm text-slate-600">{description}</p> : null}
      </div>
      {children}
    </div>
  );
}

export function NativeFileInput({
  name,
}: {
  name: string;
}) {
  return (
    <input
      type="file"
      name={name}
      accept="image/*"
      className="block w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700"
    />
  );
}
