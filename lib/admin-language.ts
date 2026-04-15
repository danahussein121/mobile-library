export type AdminLanguage = "en" | "ar";

export function resolveAdminLanguage(value?: string | null): AdminLanguage {
  return value === "ar" ? "ar" : "en";
}

export function isAdminArabic(language: AdminLanguage) {
  return language === "ar";
}

export function adminDirection(language: AdminLanguage) {
  return isAdminArabic(language) ? "rtl" : "ltr";
}

export function adminText(language: AdminLanguage, english: string, arabic: string) {
  return isAdminArabic(language) ? arabic : english;
}

export function withAdminLanguage(href: string, language: AdminLanguage) {
  if (!href.startsWith("/")) {
    return href;
  }

  const [pathname, query = ""] = href.split("?");
  const params = new URLSearchParams(query);
  params.set("lang", language);
  const search = params.toString();

  return search ? `${pathname}?${search}` : pathname;
}
