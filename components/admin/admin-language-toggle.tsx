"use client";

import Link from "next/link";
import { Languages } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";

import type { AdminLanguage } from "@/lib/admin-language";
import { cn } from "@/lib/utils";

function buildHref(
  pathname: string,
  searchParams: ReturnType<typeof useSearchParams>,
  language: AdminLanguage,
) {
  const params = new URLSearchParams(searchParams.toString());
  params.set("lang", language);
  const search = params.toString();

  return search ? `${pathname}?${search}` : pathname;
}

export function AdminLanguageToggle({
  language,
  className,
}: {
  language: AdminLanguage;
  className?: string;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white/90 p-1 shadow-sm",
        className,
      )}
      aria-label="Admin language switcher"
    >
      <span className="flex size-9 items-center justify-center rounded-full text-slate-500">
        <Languages className="size-4" />
      </span>
      <Link
        href={buildHref(pathname, searchParams, "en")}
        className={cn(
          "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
          language === "en"
            ? "bg-slate-950 text-white"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
        )}
      >
        English
      </Link>
      <Link
        href={buildHref(pathname, searchParams, "ar")}
        className={cn(
          "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
          language === "ar"
            ? "bg-slate-950 text-white"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
        )}
      >
        العربية
      </Link>
    </div>
  );
}
