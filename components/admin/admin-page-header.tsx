export function AdminPageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-8 rounded-[2rem] border border-white/80 bg-white/85 p-8 shadow-[0_30px_80px_-55px_rgba(15,23,42,0.28)]">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/75">
        {eyebrow}
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-4xl">
        {title}
      </h1>
      <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600">
        {description}
      </p>
    </div>
  );
}
