import { unstable_noStore as noStore } from "next/cache";
import { cache } from "react";
import { Prisma } from "@prisma/client";

import { getEvents, type PublicEvent } from "@/data/events";
import { db } from "@/lib/db";
import type { Locale } from "@/lib/i18n";

type PublicEventRow = {
  slug: string;
  eventDate: Date;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  imageUrl: string | null;
  imageAltEn: string;
  imageAltAr: string;
  location: string | null;
  locationAr: string | null;
  type: string | null;
  isTentative: boolean;
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

function formatEventDate(value: Date, locale: Locale, fallback: string) {
  try {
    return new Intl.DateTimeFormat(locale === "ar" ? "ar" : "en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(value);
  } catch {
    return fallback;
  }
}

async function loadPublicEvents(locale: Locale): Promise<PublicEvent[]> {
  const fallbackEvents = getEvents(locale);

  if (!process.env.DATABASE_URL) {
    return fallbackEvents;
  }

  try {
    const today = new Date(new Date().setHours(0, 0, 0, 0));
    const events = await db.$queryRaw<PublicEventRow[]>(Prisma.sql`
      SELECT
        "slug",
        "eventDate",
        "titleEn",
        "titleAr",
        "descriptionEn",
        "descriptionAr",
        "imageUrl",
        "imageAltEn",
        "imageAltAr",
        "location",
        "locationAr",
        "type",
        "isTentative"
      FROM "public"."Event"
      WHERE "eventDate" >= ${today}
      ORDER BY "eventDate" ASC, "order" ASC
    `);

    if (events.length === 0) {
      return fallbackEvents;
    }

    return events.map((event, index) => {
      const fallback = fallbackEvents[index];

      return {
        slug: event.slug,
        title: localize(locale, event.titleEn, event.titleAr, fallback?.title ?? ""),
        date: formatEventDate(event.eventDate, locale, fallback?.date ?? ""),
        location: localize(locale, event.location, event.locationAr, fallback?.location ?? ""),
        description: localize(
          locale,
          event.descriptionEn,
          event.descriptionAr,
          fallback?.description ?? "",
        ),
        image: event.imageUrl || fallback?.image || "/images/bus-exterior-branded.jpg",
        imageAlt: localize(locale, event.imageAltEn, event.imageAltAr, fallback?.imageAlt ?? ""),
        type: event.type || fallback?.type,
        isTentative: event.isTentative ?? fallback?.isTentative ?? false,
      };
    });
  } catch (error) {
    console.error("Failed to load public events", error);
    return fallbackEvents;
  }
}

const getCachedPublicEvents = cache(loadPublicEvents);

export async function getPublicEvents(locale: Locale) {
  noStore();
  return getCachedPublicEvents(locale);
}
