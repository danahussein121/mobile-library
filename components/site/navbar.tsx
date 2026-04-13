"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Container } from "@/components/site/container";
import { LanguageSwitcher } from "@/components/site/language-switcher";
import { MobileNavDrawer } from "@/components/site/mobile-nav-drawer";
import { SiteLogo } from "@/components/site/site-logo";
import { buttonVariants } from "@/components/ui/button";
import type { PublicNavItem } from "@/data/public-site";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type NavbarProps = {
  locale: Locale;
  navItems: PublicNavItem[];
  donateLabel: string;
  logoUrl?: string;
};

export function Navbar({ locale, navItems, donateLabel, logoUrl }: NavbarProps) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/95 backdrop-blur">
      <Container className="flex min-h-[78px] items-center justify-between gap-6">
        <Link href={`/${locale}`} className="shrink-0">
          <SiteLogo locale={locale} logoSrc={logoUrl} />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== `/${locale}` && pathname?.startsWith(`${item.href}/`));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium text-[#666666] transition-colors hover:text-primary",
                  isActive
                    ? "font-semibold text-primary"
                    : "",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <LanguageSwitcher locale={locale} />
          </div>
          <Link
            href={`/${locale}/donate`}
            className={cn(
              buttonVariants(),
              "hidden md:inline-flex",
            )}
          >
            {donateLabel}
          </Link>
          <MobileNavDrawer locale={locale} navItems={navItems} donateLabel={donateLabel} />
        </div>
      </Container >
    </header>
  );
}
