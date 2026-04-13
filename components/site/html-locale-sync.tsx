"use client";

import { useEffect } from "react";

import type { Locale } from "@/lib/i18n";

export function HtmlLocaleSync({
  locale,
  direction,
}: {
  locale: Locale;
  direction: "ltr" | "rtl";
}) {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = direction;
    document.documentElement.style.fontFamily =
      locale === "ar" ? "var(--font-arabic)" : "var(--font-sans)";

    return () => {
      document.documentElement.style.removeProperty("font-family");
    };
  }, [direction, locale]);

  return null;
}
