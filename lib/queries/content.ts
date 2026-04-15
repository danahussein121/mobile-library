import { unstable_noStore as noStore } from "next/cache";
import { cache } from "react";

import { db } from "@/lib/db";
import type { Locale } from "@/lib/i18n";

export type PublicPageIntro = {
  title: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
};

export type PublicHomeContent = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    cta: string;
    secondaryCta: string;
    image: string;
    imageAlt: string;
  };
  mission: {
    eyebrow: string;
    title: string;
    description: string;
    cards: Array<{ title: string; description: string }>;
  };
  donateCta: {
    title: string;
    description: string;
    button: string;
  };
};

function localize(
  locale: Locale,
  en: string | null | undefined,
  ar: string | null | undefined,
  fallback: string,
) {
  if (locale === "ar") {
    return ar?.trim() || en?.trim() || fallback;
  }

  return en?.trim() || ar?.trim() || fallback;
}

async function loadPublicPageIntro(
  locale: Locale,
  keys: string[],
  fallback: PublicPageIntro,
): Promise<PublicPageIntro> {
  if (!process.env.DATABASE_URL) {
    return fallback;
  }

  try {
    const entries = await db.pageContent.findMany({
      where: { key: { in: keys } },
    });
    const page = keys
      .map((key) => entries.find((entry) => entry.key === key))
      .find(Boolean);

    if (!page) {
      return fallback;
    }

    return {
      title: localize(locale, page.titleEn, page.titleAr, fallback.title),
      description: localize(locale, page.descriptionEn, page.descriptionAr, fallback.description),
    };
  } catch (error) {
    console.error("Failed to load page intro", error);
    return fallback;
  }
}

const getCachedPageIntro = cache(loadPublicPageIntro);

export async function getPublicPageIntro(
  locale: Locale,
  keys: string[],
  fallback: PublicPageIntro,
) {
  noStore();
  return getCachedPageIntro(locale, keys, fallback);
}

async function loadPublicHomeContent(
  locale: Locale,
  fallback: PublicHomeContent,
): Promise<PublicHomeContent> {
  if (!process.env.DATABASE_URL) {
    return fallback;
  }

  try {
    const homePage = await db.homePage.findUnique({
      where: { id: "home-page" },
    });

    if (!homePage) {
      return fallback;
    }

    return {
      hero: {
        eyebrow: localize(locale, homePage.heroEyebrowEn, homePage.heroEyebrowAr, fallback.hero.eyebrow),
        title: localize(locale, homePage.heroTitleEn, homePage.heroTitleAr, fallback.hero.title),
        description: localize(
          locale,
          homePage.heroDescriptionEn,
          homePage.heroDescriptionAr,
          fallback.hero.description,
        ),
        cta: localize(
          locale,
          homePage.heroPrimaryActionEn,
          homePage.heroPrimaryActionAr,
          fallback.hero.cta,
        ),
        secondaryCta: localize(
          locale,
          homePage.heroSecondaryActionEn,
          homePage.heroSecondaryActionAr,
          fallback.hero.secondaryCta,
        ),
        image: homePage.heroImageUrl || fallback.hero.image,
        imageAlt: localize(locale, homePage.heroImageAltEn, homePage.heroImageAltAr, fallback.hero.imageAlt),
      },
      mission: {
        eyebrow: fallback.mission.eyebrow,
        title: localize(locale, homePage.missionTitleEn, homePage.missionTitleAr, fallback.mission.title),
        description: localize(
          locale,
          homePage.missionDescriptionEn,
          homePage.missionDescriptionAr,
          fallback.mission.description,
        ),
        cards: [
          {
            title: localize(locale, homePage.missionTitleEn, homePage.missionTitleAr, fallback.mission.cards[0].title),
            description: localize(
              locale,
              homePage.missionDescriptionEn,
              homePage.missionDescriptionAr,
              fallback.mission.cards[0].description,
            ),
          },
          {
            title: localize(locale, homePage.visionTitleEn, homePage.visionTitleAr, fallback.mission.cards[1].title),
            description: localize(
              locale,
              homePage.visionDescriptionEn,
              homePage.visionDescriptionAr,
              fallback.mission.cards[1].description,
            ),
          },
          {
            title: localize(locale, homePage.valuesTitleEn, homePage.valuesTitleAr, fallback.mission.cards[2].title),
            description: localize(
              locale,
              homePage.valuesDescriptionEn,
              homePage.valuesDescriptionAr,
              fallback.mission.cards[2].description,
            ),
          },
        ],
      },
      donateCta: {
        title: localize(
          locale,
          homePage.donationCtaTitleEn,
          homePage.donationCtaTitleAr,
          fallback.donateCta.title,
        ),
        description: localize(
          locale,
          homePage.donationCtaDescriptionEn,
          homePage.donationCtaDescriptionAr,
          fallback.donateCta.description,
        ),
        button: localize(
          locale,
          homePage.donationCtaButtonLabelEn,
          homePage.donationCtaButtonLabelAr,
          fallback.donateCta.button,
        ),
      },
    };
  } catch (error) {
    console.error("Failed to load home content", error);
    return fallback;
  }
}

const getCachedHomeContent = cache(loadPublicHomeContent);

export async function getPublicHomeContent(locale: Locale, fallback: PublicHomeContent) {
  noStore();
  return getCachedHomeContent(locale, fallback);
}
