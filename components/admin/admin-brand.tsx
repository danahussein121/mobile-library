import Image from "next/image";
import Link from "next/link";

import { adminText, type AdminLanguage } from "@/lib/admin-language";
import { cn } from "@/lib/utils";

export function AdminBrand({
  language,
  compact = false,
  className,
}: {
  language: AdminLanguage;
  compact?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={language === "ar" ? "/ar" : "/en"}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group flex items-center gap-4 rounded-[1.5rem] border border-primary/10 bg-white/70 px-4 py-4 shadow-[0_18px_50px_-38px_rgba(0,180,198,0.55)] backdrop-blur",
        compact && "gap-3 px-3 py-3",
        className,
      )}
    >
      <div className="flex size-14 shrink-0 items-center justify-center rounded-[1.1rem] bg-[linear-gradient(180deg,rgba(0,180,198,0.14),rgba(0,180,198,0.06))] ring-1 ring-primary/10">
        <Image
          src="/images/logo.png"
          alt={adminText(language, "Mobile Library logo", "شعار المكتبة المتنقلة")}
          width={40}
          height={40}
          className="h-10 w-auto object-contain"
          priority
        />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/75">
          {adminText(language, "Content Admin", "إدارة المحتوى")}
        </p>
        <h1
          className={cn(
            "mt-1 text-lg font-semibold tracking-[-0.03em] text-slate-950",
            compact && "text-base",
          )}
        >
          {adminText(
            language,
            "Mobile Library for Culture and Arts",
            "المكتبة المتنقلة للثقافة والفنون",
          )}
        </h1>
        {!compact ? (
          <p className="mt-1 text-sm leading-6 text-slate-600">
            {adminText(
              language,
              "A branded internal space for updating the public website safely.",
              "مساحة داخلية مرتبطة بهوية المشروع لتحديث الموقع العام بشكل آمن.",
            )}
          </p>
        ) : null}
      </div>
    </Link>
  );
}
