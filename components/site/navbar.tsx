"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Container } from "@/components/site/container";
import { LanguageSwitcher } from "@/components/site/language-switcher";
import { MobileNavDrawer } from "@/components/site/mobile-nav-drawer";
import { buttonVariants } from "@/components/ui/button";
import type { NavItem } from "@/data/site-content";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type NavbarProps = {
  locale: Locale;
  navItems: NavItem[];
  donateLabel: string;
  siteName: string;
};

export function Navbar({
  locale,
  navItems,
  donateLabel,
  siteName,
}: NavbarProps) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <Container className="flex min-h-20 items-center justify-between gap-4 rounded-[1.8rem] border border-white/70 bg-white/80 px-4 shadow-[0_28px_80px_-48px_rgba(15,23,42,0.45)] backdrop-blur-xl sm:px-5">
        <Link href={`/${locale}`} className="flex min-w-0 items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-lg font-bold text-primary-foreground shadow-lg shadow-primary/20">
            ML
          </div>
          <div className="min-w-0">
            <p className="truncate text-base font-semibold text-slate-950">{siteName}</p>
            <p className="truncate text-sm text-slate-500">
              {locale === "ar" ? "مبادرة أثر اجتماعي" : "Social impact initiative"}
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-slate-200/80 bg-slate-50/90 p-1.5 xl:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2.5 text-sm font-medium transition-all",
                  isActive
                    ? "bg-slate-950 text-white shadow-[0_16px_35px_-22px_rgba(15,23,42,0.55)]"
                    : "text-slate-600 hover:bg-white hover:text-slate-950",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <LanguageSwitcher locale={locale} />
          </div>
          <Link
            href={`/${locale}/donate`}
            className={cn(
              buttonVariants(),
              "hidden rounded-full px-6 shadow-lg shadow-primary/20 md:inline-flex",
            )}
          >
            {donateLabel}
          </Link>
          <MobileNavDrawer
            locale={locale}
            navItems={navItems}
            donateLabel={donateLabel}
            siteName={siteName}
          />
        </div>
      </Container>
    </header>
  );
}
