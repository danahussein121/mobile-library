import Link from "next/link";
import { ExternalLink, Info } from "lucide-react";

export function AdminPageHeader({
  eyebrow,
  title,
  description,
  context,
}: {
  eyebrow: string;
  title: string;
  description: string;
  context?: {
    text: string;
    href: string;
    linkLabel?: string;
  };
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
      {context ? (
        <div className="mt-6 flex flex-col gap-3 rounded-[1.5rem] border border-primary/15 bg-primary/10 px-5 py-4 text-sm text-slate-700 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex size-8 items-center justify-center rounded-full bg-white text-primary">
              <Info className="size-4" />
            </div>
            <p className="max-w-3xl leading-7">{context.text}</p>
          </div>
          <Link
            href={context.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-[#0097A7]"
          >
            {context.linkLabel ?? "View on site"}
            <ExternalLink className="size-4" />
          </Link>
        </div>
      ) : null}
    </div>
  );
}
