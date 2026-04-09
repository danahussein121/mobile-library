import { notFound } from "next/navigation";

import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";
import { getSiteContent } from "@/data/site-content";
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

  const content = getSiteContent(locale);
  const direction = getDirection(locale);

  return (
    <div
      dir={direction}
      className={cn(
        "min-h-screen bg-[linear-gradient(180deg,#f7fbfb_0%,#eff7f7_52%,#ffffff_100%)] text-start",
        locale === "ar" && "font-[family-name:var(--font-arabic)]",
      )}
    >
      <Navbar
        locale={locale}
        navItems={content.nav}
        donateLabel={content.nav[5]?.label ?? "Donate"}
        siteName={content.siteName}
      />
      <main>{children}</main>
      <Footer
        locale={locale}
        siteName={content.siteName}
        navItems={content.nav}
        footer={content.footer}
      />
    </div>
  );
}
