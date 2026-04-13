import Link from "next/link";

import { Container } from "@/components/site/container";
import { buttonVariants } from "@/components/ui/button";
import type { ContactDetails, FooterContent, NavItem } from "@/data/site-content";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type FooterProps = {
  locale: Locale;
  siteName: string;
  navItems: NavItem[];
  footer: FooterContent;
  contact: ContactDetails;
};

export function Footer({ locale, siteName, navItems, footer, contact }: FooterProps) {
  return (
    <footer className="relative overflow-hidden border-t border-slate-200 bg-slate-950 text-slate-200">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(45,212,191,0.14),transparent_32%)]" />
      <Container className="relative py-14 sm:py-18">
        <div className="mb-10 grid gap-6 rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_24px_80px_-56px_rgba(0,0,0,0.85)] backdrop-blur sm:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-teal-200/75">
              {locale === "ar" ? "رسالة مستمرة" : "An ongoing mission"}
            </p>
            <h2 className="max-w-2xl text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              {locale === "ar"
                ? "نقرب الكتاب من الطفل، ونقرب الطفل من فرصته في التعلم"
                : "We bring books closer to children, and children closer to a future shaped by learning"}
            </h2>
            <p className="max-w-2xl text-base leading-8 text-slate-300">
              {locale === "ar"
                ? "كل زيارة تصنع مساحة آمنة للخيال والفضول والانتماء. بدعمكم نستطيع الوصول إلى مدارس وأحياء أكثر."
                : "Each visit creates a safe place for curiosity, imagination, and belonging. With donor support, we can reach more schools and neighborhoods."}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <Link
              href={navItems.find((item) => item.href.endsWith("/donate"))?.href ?? "#"}
              className={cn(
                buttonVariants({ size: "lg" }),
                "rounded-full px-6 shadow-lg shadow-primary/25",
              )}
            >
              {footer.donateLabel}
            </Link>
            <Link
              href={navItems.find((item) => item.href.endsWith("/contact"))?.href ?? "#"}
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "rounded-full border-white/15 bg-white/10 px-6 text-white hover:bg-white/15 hover:text-white",
              )}
            >
              {footer.contactLabel}
            </Link>
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-primary text-lg font-bold text-primary-foreground shadow-lg shadow-primary/20">
              ML
            </div>
            <p className="text-lg font-semibold text-white">{siteName}</p>
          </div>
            <p className="max-w-md text-sm leading-7 text-slate-400">
              {footer.description}
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                locale === "ar" ? "زيارات مدرسية" : "School visits",
                locale === "ar" ? "جلسات قراءة" : "Reading circles",
                locale === "ar" ? "ورش تعليمية" : "Creative workshops",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-slate-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">
              {locale === "ar" ? "القائمة" : "Menu"}
            </h3>
            <div className="space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-sm text-slate-300 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">
              {footer.contactLabel}
            </h3>
            <div className="space-y-3 text-sm leading-7 text-slate-300">
              {contact.details.map((detail) => (
                <p key={detail.label}>{detail.value}</p>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">
              {footer.socialLabel}
            </h3>
            <div className="space-y-3">
              {footer.socialLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block text-sm text-slate-300 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-slate-800 pt-5 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {siteName} © 2026. {footer.rights}
          </p>
          <p>
            {locale === "ar"
              ? "صمم ليكون جاهزًا للنشر والتوسع مستقبلًا"
              : "Designed to be deployment-ready and future CMS-friendly"}
          </p>
        </div>
      </Container>
    </footer>
  );
}
