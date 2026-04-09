"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type LanguageSwitcherProps = {
  locale: Locale;
};

export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const pathname = usePathname();

  const buildHref = (nextLocale: Locale) => {
    if (!pathname) {
      return `/${nextLocale}`;
    }

    const segments = pathname.split("/");
    segments[1] = nextLocale;
    return segments.join("/") || `/${nextLocale}`;
  };

  return (
    <div className="inline-flex items-center rounded-full border border-slate-200 bg-white/90 p-1 shadow-sm">
      {(["en", "ar"] as const).map((value) => (
        <Link
          key={value}
          href={buildHref(value)}
          className={cn(
            "rounded-full px-3 py-1.5 text-sm font-semibold transition-colors",
            locale === value
              ? "bg-primary text-primary-foreground"
              : "text-slate-600 hover:text-slate-950",
          )}
        >
          {value.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
