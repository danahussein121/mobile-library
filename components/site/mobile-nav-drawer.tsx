"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

import { LanguageSwitcher } from "@/components/site/language-switcher";
import { buttonVariants } from "@/components/ui/button";
import type { NavItem } from "@/data/site-content";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type MobileNavDrawerProps = {
  locale: Locale;
  navItems: NavItem[];
  donateLabel: string;
  siteName: string;
};

export function MobileNavDrawer({
  locale,
  navItems,
  donateLabel,
  siteName,
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
            className="fixed inset-0 z-[90] bg-slate-950/42 backdrop-blur-sm lg:hidden"
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
              "fixed inset-y-0 z-[100] flex h-dvh w-[82vw] max-w-sm flex-col overflow-hidden border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.985),rgba(241,249,248,0.985))] shadow-[0_40px_120px_-42px_rgba(15,23,42,0.55)] lg:hidden",
              isRtl
                ? "left-0 rounded-r-[2rem] border-r"
                : "right-0 rounded-l-[2rem] border-l",
            )}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(45,212,191,0.22),transparent_38%)]" />
            <div className="relative flex h-full min-h-0 flex-col p-5 pt-[max(1.25rem,env(safe-area-inset-top))] sm:p-6 sm:pt-[max(1.5rem,env(safe-area-inset-top))]">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="flex size-11 items-center justify-center rounded-2xl bg-primary text-base font-bold text-primary-foreground shadow-lg shadow-primary/20">
                      ML
                    </div>
                    <div>
                      <p className="text-base font-semibold text-slate-950">{siteName}</p>
                      <p className="text-sm text-slate-500">
                        {locale === "ar"
                          ? "كتب وقصص تصل إلى الأطفال"
                          : "Books and stories reaching children"}
                      </p>
                    </div>
                  </div>
                  <p className="max-w-xs text-sm leading-7 text-slate-600">
                    {locale === "ar"
                      ? "صممنا هذه الواجهة لتشعر بالدفء والوضوح، تمامًا مثل التجربة التي نريد أن يعيشها كل طفل مع الكتاب."
                      : "Designed to feel warm, clear, and welcoming, just like the reading experiences we bring into communities."}
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-colors hover:text-slate-950"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="mt-6" onClick={() => setOpen(false)}>
                <LanguageSwitcher locale={locale} />
              </div>

              <nav className="mt-6 min-h-0 flex-1 space-y-2 overflow-y-auto pb-4">
                {navItems.map((item, index) => {
                  const active = pathname === item.href;

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
                          "flex items-center justify-between rounded-[1.4rem] px-4 py-4 text-base font-medium transition-all",
                          active
                            ? "bg-slate-950 text-white shadow-[0_20px_45px_-28px_rgba(15,23,42,0.55)]"
                            : "bg-white/80 text-slate-700 hover:-translate-y-0.5 hover:bg-white hover:text-slate-950",
                        )}
                      >
                        <span>{item.label}</span>
                        <span
                          className={cn(
                            "text-xs uppercase tracking-[0.24em]",
                            active ? "text-white/55" : "text-slate-400",
                          )}
                        >
                          0{index + 1}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="mt-4 rounded-[1.6rem] bg-slate-950 p-4 text-white shadow-[0_22px_48px_-28px_rgba(15,23,42,0.6)]">
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-white/55">
                  {locale === "ar" ? "ادعم المهمة" : "Support the mission"}
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  {locale === "ar"
                    ? "كل مساهمة تساعدنا على تمويل زيارات جديدة وكتب أكثر ولحظات تعلم أدفأ."
                    : "Every gift helps fund more visits, more books, and more moments of belonging around reading."}
                </p>
                <Link
                  href={`/${locale}/donate`}
                  onClick={() => setOpen(false)}
                  className={cn(
                    buttonVariants(),
                    "mt-4 inline-flex rounded-full px-5 shadow-lg shadow-primary/25",
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
        className="inline-flex size-12 items-center justify-center rounded-full border border-white/70 bg-white/90 text-slate-700 shadow-[0_18px_40px_-24px_rgba(15,23,42,0.45)] backdrop-blur transition-all hover:-translate-y-0.5 hover:text-slate-950 lg:hidden"
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>
      {typeof document !== "undefined" ? createPortal(drawer, document.body) : null}
    </>
  );
}
