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
    <div className="inline-flex items-center rounded-full border border-black/10 bg-white p-1 shadow-[0_2px_12px_rgba(0,0,0,0.07)]">
      {(["en", "ar"] as const).map((value) => (
        <Link
          key={value}
          href={buildHref(value)}
          className={cn(
            "rounded-full px-3 py-1.5 text-sm font-semibold transition-colors",
            locale === value
              ? "bg-primary text-white"
              : "text-[#666666] hover:text-[#1A1A2E]",
          )}
        >
          {value.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
