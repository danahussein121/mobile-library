import { notFound } from "next/navigation";

import { Footer } from "@/components/site/footer";
import { HtmlLocaleSync } from "@/components/site/html-locale-sync";
import { Navbar } from "@/components/site/navbar";
import { getPublicSiteSettings } from "@/lib/queries/settings";
import { getDirection, isLocale, locales } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const direction = getDirection(locale);
  const publicSettings = await getPublicSiteSettings(locale);

  return (
    <div
      dir={direction}
      style={{ fontFamily: locale === "ar" ? "var(--font-arabic)" : "var(--font-sans)" }}
      className={cn(
        "min-h-screen bg-background text-start",
        locale === "ar" && "arabic-content",
      )}
    >
      <HtmlLocaleSync locale={locale} direction={direction} />
      <Navbar
        locale={locale}
        navItems={publicSettings.nav}
        donateLabel={publicSettings.donateLabel}
        logoUrl={publicSettings.logoUrl}
      />
      <main>{children}</main>
      <Footer
        locale={locale}
        logoUrl={publicSettings.logoUrl}
        navItems={publicSettings.nav}
        donateLabel={publicSettings.donateLabel}
        footerCopy={publicSettings.footer}
        contactItems={publicSettings.contactItems}
      />
    </div>
  );
}
