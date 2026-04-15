"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

import { LanguageSwitcher } from "@/components/site/language-switcher";
import { SiteLogo } from "@/components/site/site-logo";
import { buttonVariants } from "@/components/ui/button";
import type { PublicNavItem } from "@/data/public-site";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type MobileNavDrawerProps = {
  locale: Locale;
  navItems: PublicNavItem[];
  donateLabel: string;
  logoUrl?: string;
  logoDisplayWidth?: number;
};

export function MobileNavDrawer({
  locale,
  navItems,
  donateLabel,
  logoUrl,
  logoDisplayWidth,
}: MobileNavDrawerProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isRtl = locale === "ar";

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const drawer = (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            aria-label="Close menu overlay"
            className="fixed inset-0 z-[90] bg-[#1A1A2E]/28 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.aside
            initial={{ x: isRtl ? "-100%" : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: isRtl ? "-100%" : "100%" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "fixed inset-y-0 z-[100] flex h-dvh w-[82vw] max-w-sm flex-col overflow-hidden bg-white shadow-[0_16px_40px_rgba(0,0,0,0.14)] lg:hidden",
              isRtl
                ? "left-0 rounded-r-[20px] border-r border-black/5"
                : "right-0 rounded-l-[20px] border-l border-black/5",
            )}
          >
            <div className="relative flex h-full min-h-0 flex-col p-5 pt-[max(1.25rem,env(safe-area-inset-top))] sm:p-6 sm:pt-[max(1.5rem,env(safe-area-inset-top))]">
              <div className="flex items-center justify-between gap-4">
                <SiteLogo locale={locale} logoSrc={logoUrl} logoDisplayWidth={logoDisplayWidth} />
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white text-[#1A1A2E] transition-colors hover:bg-secondary"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="mt-6" onClick={() => setOpen(false)}>
                <LanguageSwitcher locale={locale} />
              </div>

              <nav className="mt-8 min-h-0 flex-1 space-y-2 overflow-y-auto pb-4">
                {navItems.map((item, index) => {
                  const active =
                    pathname === item.href ||
                    (item.href !== `/${locale}` && pathname?.startsWith(`${item.href}/`));

                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: isRtl ? -12 : 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * index, duration: 0.22 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center justify-between rounded-xl px-4 py-4 text-base font-medium transition-all",
                          active
                            ? "bg-secondary text-primary"
                            : "text-[#1A1A2E] hover:bg-secondary",
                        )}
                      >
                        <span>{item.label}</span>
                        <span
                          className={cn(
                            "text-xs uppercase tracking-[0.24em]",
                            active ? "text-primary/60" : "text-[#666666]",
                          )}
                        >
                          0{index + 1}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="mt-4 rounded-[20px] bg-primary p-5 text-white">
                <p className="text-sm font-semibold">
                  {locale === "ar" ? "ادعم مهمتنا" : "Support our mission"}
                </p>
                <p className="mt-2 text-sm leading-7 text-white/90">
                  {locale === "ar"
                    ? "كل مساهمة تساعدنا على الاستمرار في الوصول إلى الأطفال والقرى والمجتمعات."
                    : "Every donation helps us keep the bus moving toward more children and communities."}
                </p>
                <Link
                  href={`/${locale}/donate`}
                  onClick={() => setOpen(false)}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "mt-4 inline-flex border-white bg-white text-primary hover:bg-[#f4fdfe]",
                  )}
                >
                  {donateLabel}
                </Link>
              </div>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex size-11 items-center justify-center rounded-full border border-black/10 bg-white text-[#1A1A2E] shadow-[0_2px_12px_rgba(0,0,0,0.07)] transition-colors hover:bg-secondary lg:hidden"
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>
      {typeof document !== "undefined" ? createPortal(drawer, document.body) : null}
    </>
  );
}
