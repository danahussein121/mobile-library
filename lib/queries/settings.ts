import { unstable_noStore as noStore } from "next/cache";
import { cache } from "react";

import {
  publicSiteCopy,
  type ContactItem,
  type FooterLink,
  type PublicNavItem,
  type PublicSiteCopy,
} from "@/data/public-site";
import { getContactHref } from "@/lib/contact-links";
import { db } from "@/lib/db";
import type { Locale } from "@/lib/i18n";

type ResolvedPublicSiteSettings = {
  logoUrl: string;
  nav: PublicNavItem[];
  donateLabel: string;
  footer: PublicSiteCopy["footer"];
  contactItems: ContactItem[];
};

function sanitizeText(value: string | null | undefined) {
  const trimmed = value?.trim();

  if (!trimmed) {
    return null;
  }

  if (/^\?+$/.test(trimmed) || trimmed.includes("???")) {
    return null;
  }

  return trimmed;
}

function localize(
  locale: Locale,
  en: string | null | undefined,
  ar: string | null | undefined,
  fallback: string,
) {
  const safeEn = sanitizeText(en);
  const safeAr = sanitizeText(ar);

  if (locale === "ar") {
    return safeAr || safeEn || fallback;
  }

  return safeEn || safeAr || fallback;
}

function resolveUrl(value: string | null | undefined, fallback: string) {
  const trimmed = sanitizeText(value);
  return trimmed ? trimmed : fallback;
}

function resolveLogoUrl(value: string | null | undefined) {
  const trimmed = sanitizeText(value);
  return trimmed || "/images/logo.png";
}

function buildSocialLinks(
  locale: Locale,
  fallbackLinks: FooterLink[],
  siteSettings:
    | {
        socialOneLabelEn: string;
        socialOneLabelAr: string;
        socialOneUrl: string;
        socialTwoLabelEn: string;
        socialTwoLabelAr: string;
        socialTwoUrl: string;
        socialThreeLabelEn: string;
        socialThreeLabelAr: string;
        socialThreeUrl: string;
      }
    | null,
) {
  if (!siteSettings) {
    return fallbackLinks;
  }

  return [
    {
      label: localize(
        locale,
        siteSettings.socialOneLabelEn,
        siteSettings.socialOneLabelAr,
        fallbackLinks[0]?.label ?? "Instagram",
      ),
      href: resolveUrl(siteSettings.socialOneUrl, fallbackLinks[0]?.href ?? "#"),
    },
    {
      label: localize(
        locale,
        siteSettings.socialTwoLabelEn,
        siteSettings.socialTwoLabelAr,
        fallbackLinks[1]?.label ?? "Facebook",
      ),
      href: resolveUrl(siteSettings.socialTwoUrl, fallbackLinks[1]?.href ?? "#"),
    },
    {
      label: localize(
        locale,
        siteSettings.socialThreeLabelEn,
        siteSettings.socialThreeLabelAr,
        fallbackLinks[2]?.label ?? "Twitter",
      ),
      href: resolveUrl(siteSettings.socialThreeUrl, fallbackLinks[2]?.href ?? "#"),
    },
    ...(fallbackLinks[3] ? [fallbackLinks[3]] : []),
  ];
}

async function loadPublicSiteSettings(locale: Locale): Promise<ResolvedPublicSiteSettings> {
  const fallback = publicSiteCopy[locale];

  if (!process.env.DATABASE_URL) {
    return {
      logoUrl: "/images/logo.png",
      nav: fallback.nav,
      donateLabel: fallback.donateLabel,
      footer: fallback.footer,
      contactItems: fallback.contactItems,
    };
  }

  try {
    const [siteSettings, contactSettings] = await Promise.all([
      db.siteSettings.findUnique({ where: { id: "site-settings" } }),
      db.contactSettings.findUnique({ where: { id: "contact-settings" } }),
    ]);

    const nav = siteSettings
      ? [
          {
            href: fallback.nav[0].href,
            label: localize(locale, siteSettings.navHomeEn, siteSettings.navHomeAr, fallback.nav[0].label),
          },
          {
            href: fallback.nav[1].href,
            label: localize(locale, siteSettings.navAboutEn, siteSettings.navAboutAr, fallback.nav[1].label),
          },
          {
            href: fallback.nav[2].href,
            label: localize(locale, siteSettings.navProgramsEn, siteSettings.navProgramsAr, fallback.nav[2].label),
          },
          {
            href: fallback.nav[3].href,
            label: localize(locale, siteSettings.navEventsEn, siteSettings.navEventsAr, fallback.nav[3].label),
          },
          {
            href: fallback.nav[4].href,
            label: localize(locale, siteSettings.navContactEn, siteSettings.navContactAr, fallback.nav[4].label),
          },
        ]
      : fallback.nav;

    const contactItems = contactSettings
      ? [
          {
            label: localize(locale, contactSettings.emailLabelEn, contactSettings.emailLabelAr, fallback.contactItems[0].label),
            value: contactSettings.emailValue || fallback.contactItems[0].value,
            href: getContactHref(contactSettings.emailValue || fallback.contactItems[0].value) ?? fallback.contactItems[0].href,
          },
          {
            label: localize(locale, contactSettings.phoneLabelEn, contactSettings.phoneLabelAr, fallback.contactItems[1].label),
            value: contactSettings.phoneValue || fallback.contactItems[1].value,
            href: getContactHref(contactSettings.phoneValue || fallback.contactItems[1].value) ?? fallback.contactItems[1].href,
          },
          {
            label: localize(locale, contactSettings.addressLabelEn, contactSettings.addressLabelAr, fallback.contactItems[2].label),
            value:
              localize(
                locale,
                contactSettings.addressValueEn,
                contactSettings.addressValueAr,
                fallback.contactItems[2].value,
              ) || fallback.contactItems[2].value,
            href:
              getContactHref(
                localize(
                  locale,
                  contactSettings.addressValueEn,
                  contactSettings.addressValueAr,
                  fallback.contactItems[2].value,
                ),
              ) ?? fallback.contactItems[2].href,
          },
          fallback.contactItems[3],
        ]
      : fallback.contactItems;

    return {
      logoUrl: resolveLogoUrl(siteSettings?.logoUrl),
      nav,
      donateLabel: siteSettings
        ? localize(locale, siteSettings.navDonateEn, siteSettings.navDonateAr, fallback.donateLabel)
        : fallback.donateLabel,
      footer: {
        ...fallback.footer,
        tagline: siteSettings
          ? localize(
              locale,
              siteSettings.footerDescriptionEn,
              siteSettings.footerDescriptionAr,
              fallback.footer.tagline,
            )
          : fallback.footer.tagline,
        contactLabel: siteSettings
          ? localize(
              locale,
              siteSettings.footerContactLabelEn,
              siteSettings.footerContactLabelAr,
              fallback.footer.contactLabel,
            )
          : fallback.footer.contactLabel,
        socialLabel: siteSettings
          ? localize(
              locale,
              siteSettings.footerSocialLabelEn,
              siteSettings.footerSocialLabelAr,
              fallback.footer.socialLabel,
            )
          : fallback.footer.socialLabel,
        socialLinks: buildSocialLinks(locale, fallback.footer.socialLinks, siteSettings),
      },
      contactItems,
    };
  } catch (error) {
    console.error("Failed to load public site settings", error);

    return {
      logoUrl: "/images/logo.png",
      nav: fallback.nav,
      donateLabel: fallback.donateLabel,
      footer: fallback.footer,
      contactItems: fallback.contactItems,
    };
  }
}

const getCachedPublicSiteSettings = cache(loadPublicSiteSettings);

export async function getPublicSiteSettings(locale: Locale) {
  noStore();
  return getCachedPublicSiteSettings(locale);
}
