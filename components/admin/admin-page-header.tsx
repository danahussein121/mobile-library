import Link from "next/link";
import { ExternalLink, Info } from "lucide-react";

import { adminText, type AdminLanguage } from "@/lib/admin-language";

export function AdminPageHeader({
  lang = "en",
  eyebrow,
  eyebrowAr,
  title,
  titleAr,
  description,
  descriptionAr,
  context,
}: {
  lang?: AdminLanguage;
  eyebrow: string;
  eyebrowAr?: string;
  title: string;
  titleAr?: string;
  description: string;
  descriptionAr?: string;
  context?: {
    text: string;
    textAr?: string;
    href: string;
    linkLabel?: string;
    linkLabelAr?: string;
  };
}) {
  return (
    <div className="mb-8 overflow-hidden rounded-[2rem] border border-white/80 bg-white/88 p-8 shadow-[0_30px_80px_-55px_rgba(15,23,42,0.28)]">
      <div className="mb-5 h-1.5 w-24 rounded-full bg-[linear-gradient(90deg,#00B4C6,#7ddbe4)]" />
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/75">
        {adminText(lang, eyebrow, eyebrowAr ?? eyebrow)}
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-4xl">
        {adminText(lang, title, titleAr ?? title)}
      </h1>
      <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600">
        {adminText(lang, description, descriptionAr ?? description)}
      </p>
      {context ? (
        <div className="mt-6 flex flex-col gap-3 rounded-[1.5rem] border border-primary/15 bg-primary/10 px-5 py-4 text-sm text-slate-700 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex size-8 items-center justify-center rounded-full bg-white text-primary">
              <Info className="size-4" />
            </div>
            <p className="max-w-3xl leading-7">
              {adminText(lang, context.text, context.textAr ?? context.text)}
            </p>
          </div>
          <Link
            href={context.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-[#0097A7]"
          >
            {adminText(
              lang,
              context.linkLabel ?? "View on site",
              context.linkLabelAr ?? "عرض الصفحة",
            )}
            <ExternalLink className="size-4" />
          </Link>
        </div>
      ) : null}
    </div>
  );
}
