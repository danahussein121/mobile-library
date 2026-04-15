import Link from "next/link";
import { Globe, Mail, MapPin, Phone } from "lucide-react";

import { Container } from "@/components/site/container";
import { SiteLogo } from "@/components/site/site-logo";
import type { ContactItem, PublicSiteCopy, PublicNavItem } from "@/data/public-site";
import type { Locale } from "@/lib/i18n";
import { isExternalHref } from "@/lib/contact-links";

const contactIcons = [Mail, Phone, Globe, MapPin];

function getSocialBadge(label: string) {
  const normalized = label.toLowerCase();

  if (normalized.includes("instagram")) return "IG";
  if (normalized.includes("facebook")) return "FB";
  if (normalized === "x" || normalized.includes("twitter")) return "X";
  if (normalized.includes("linkedin")) return "IN";

  return label.slice(0, 2).toUpperCase();
}

export function Footer({
  locale,
  logoUrl,
  navItems,
  donateLabel,
  footerCopy,
  contactItems,
}: {
  locale: Locale;
  logoUrl?: string;
  navItems: PublicNavItem[];
  donateLabel: string;
  footerCopy: PublicSiteCopy["footer"];
  contactItems: ContactItem[];
}) {
  const quickLinks = [...navItems, { label: donateLabel, href: `/${locale}/donate` }];

  return (
    <footer className="bg-primary text-white">
      <Container className="py-16">
        <div className="grid gap-10 md:grid-cols-[1.35fr_1fr_1fr_1fr]">
          <div className="space-y-5">
            <SiteLogo locale={locale} logoSrc={logoUrl} />
            <p className="max-w-md text-sm leading-7 text-white/92">
              {footerCopy.tagline}
            </p>
            {footerCopy.socialLinks.length > 0 ? (
              <div>
                <p className="text-sm font-semibold text-white/88">
                  {footerCopy.socialLabel}
                </p>
                <div className="mt-3 flex flex-wrap gap-3">
                  {footerCopy.socialLinks.map((item) => {
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={item.label}
                        className="inline-flex size-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
                      >
                        <span className="text-xs font-bold tracking-[0.12em]">
                          {getSocialBadge(item.label)}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-semibold text-white">
              {footerCopy.quickLinksLabel}
            </h3>
            <div className="space-y-3">
              {quickLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-sm text-white/88 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-semibold text-white">
              {footerCopy.communityLabel}
            </h3>
            <div className="space-y-3">
              {footerCopy.communityLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block text-sm text-white/88 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-semibold text-white">
              {footerCopy.contactLabel}
            </h3>
            <div className="space-y-3 text-sm text-white/88">
              {contactItems.map((item, index) => {
                const Icon = contactIcons[index] ?? MapPin;

                if (item.href && isExternalHref(item.href)) {
                  return (
                    <a
                      key={`${item.label}-${item.value}`}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 transition-colors hover:text-white"
                    >
                      <Icon className="mt-0.5 size-4 shrink-0" />
                      <span>{item.value}</span>
                    </a>
                  );
                }

                return (
                  <div key={`${item.label}-${item.value}`} className="flex items-start gap-3">
                    <Icon className="mt-0.5 size-4 shrink-0" />
                    <span>{item.value}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/20 pt-5 text-sm text-white/88 sm:flex-row sm:items-center sm:justify-between">
          <p>{footerCopy.bottomText}</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href={`/${locale}/privacy-policy`} className="transition-colors hover:text-white">
              {footerCopy.privacyLabel}
            </Link>
            <Link href={`/${locale}/terms-of-service`} className="transition-colors hover:text-white">
              {footerCopy.termsLabel}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
