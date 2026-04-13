import { unstable_noStore as noStore } from "next/cache";
import { cache } from "react";

import { getImpactMetricValues } from "@/data/impact-metrics";
import { siteContent, type SiteContent } from "@/data/site-content";
import { db } from "@/lib/db";
import type { Locale } from "@/lib/i18n";

function localize(locale: Locale, en: string | null | undefined, ar: string | null | undefined, fallback: string) {
  if (locale === "ar") {
    return ar || en || fallback;
  }

  return en || ar || fallback;
}

function parseListItems(value: string | null | undefined, fallback: string[]) {
  if (!value?.trim()) {
    return fallback;
  }

  const items = value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

  return items.length ? items : fallback;
}

function parseGoalItems(
  value: string | null | undefined,
  fallback: Array<{ title: string; description: string }>,
) {
  if (!value?.trim()) {
    return fallback;
  }

  const items = value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [title, ...descriptionParts] = line.split("::");
      return {
        title: title?.trim() || "",
        description: descriptionParts.join("::").trim(),
      };
    })
    .filter((item) => item.title && item.description);

  return items.length ? items : fallback;
}

function resolveUrl(value: string | null | undefined, fallback: string) {
  if (!value || value.trim() === "#" || value.trim() === "") {
    return fallback;
  }

  return value;
}

function normalizeLegacyContactValue(
  locale: Locale,
  valueEn: string | null | undefined,
  valueAr: string | null | undefined,
  fallback: string,
) {
  const resolved = localize(locale, valueEn, valueAr, fallback);

  if (
    resolved === "Saudi Arabia" ||
    resolved === "المملكة العربية السعودية" ||
    resolved === "Amman, Jordan" ||
    resolved === "عمّان، الأردن"
  ) {
    return fallback;
  }

  return resolved;
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

async function loadDatabaseContent(locale: Locale) {
  if (!process.env.DATABASE_URL) {
    return null;
  }

  try {
    const [
      siteSettings,
      homePage,
      pageContents,
      donationSettings,
      contactSettings,
      programs,
      projects,
      events,
    ] = await Promise.all([
      db.siteSettings.findUnique({ where: { id: "site-settings" } }),
      db.homePage.findUnique({ where: { id: "home-page" } }),
      db.pageContent.findMany(),
      db.donationSettings.findUnique({ where: { id: "donation-settings" } }),
      db.contactSettings.findUnique({ where: { id: "contact-settings" } }),
      db.program.findMany({ orderBy: [{ order: "asc" }, { createdAt: "asc" }] }),
      db.project.findMany({ orderBy: [{ order: "asc" }, { createdAt: "asc" }] }),
      db.event.findMany({ orderBy: [{ order: "asc" }, { eventDate: "asc" }] }),
    ]);

    const base = structuredClone(siteContent[locale]);
    const impactValues = getImpactMetricValues(locale);

    if (siteSettings) {
      base.siteName = localize(
        locale,
        siteSettings.projectNameEn,
        siteSettings.projectNameAr,
        base.siteName,
      );

      base.nav = [
        { ...base.nav[0], label: localize(locale, siteSettings.navHomeEn, siteSettings.navHomeAr, base.nav[0].label) },
        { ...base.nav[1], label: localize(locale, siteSettings.navAboutEn, siteSettings.navAboutAr, base.nav[1].label) },
        { ...base.nav[2], label: localize(locale, siteSettings.navProgramsEn, siteSettings.navProgramsAr, base.nav[2].label) },
        { ...base.nav[3], label: localize(locale, siteSettings.navDonateEn, siteSettings.navDonateAr, base.nav[3].label) },
        { ...base.nav[4], label: localize(locale, siteSettings.navContactEn, siteSettings.navContactAr, base.nav[4].label) },
      ];

      base.footer.description = localize(locale, siteSettings.footerDescriptionEn, siteSettings.footerDescriptionAr, base.footer.description);
      base.footer.contactLabel = localize(locale, siteSettings.footerContactLabelEn, siteSettings.footerContactLabelAr, base.footer.contactLabel);
      base.footer.socialLabel = localize(locale, siteSettings.footerSocialLabelEn, siteSettings.footerSocialLabelAr, base.footer.socialLabel);
      base.footer.donateLabel = localize(locale, siteSettings.footerDonateLabelEn, siteSettings.footerDonateLabelAr, base.footer.donateLabel);
      base.footer.rights = localize(locale, siteSettings.footerRightsEn, siteSettings.footerRightsAr, base.footer.rights);
      base.footer.socialLinks = [
        {
          label: localize(locale, siteSettings.socialOneLabelEn, siteSettings.socialOneLabelAr, base.footer.socialLinks[0].label),
          href: resolveUrl(siteSettings.socialOneUrl, base.footer.socialLinks[0].href),
        },
        {
          label: localize(locale, siteSettings.socialTwoLabelEn, siteSettings.socialTwoLabelAr, base.footer.socialLinks[1].label),
          href: resolveUrl(siteSettings.socialTwoUrl, base.footer.socialLinks[1].href),
        },
        {
          label: localize(locale, siteSettings.socialThreeLabelEn, siteSettings.socialThreeLabelAr, base.footer.socialLinks[2].label),
          href: resolveUrl(siteSettings.socialThreeUrl, base.footer.socialLinks[2].href),
        },
      ];
    }

    if (homePage) {
      base.home.hero.eyebrow = localize(locale, homePage.heroEyebrowEn, homePage.heroEyebrowAr, base.home.hero.eyebrow);
      base.home.hero.title = localize(locale, homePage.heroTitleEn, homePage.heroTitleAr, base.home.hero.title);
      base.home.hero.description = localize(locale, homePage.heroDescriptionEn, homePage.heroDescriptionAr, base.home.hero.description);
      base.home.hero.primaryAction = localize(locale, homePage.heroPrimaryActionEn, homePage.heroPrimaryActionAr, base.home.hero.primaryAction);
      base.home.hero.secondaryAction = localize(locale, homePage.heroSecondaryActionEn, homePage.heroSecondaryActionAr, base.home.hero.secondaryAction);
      base.home.hero.image = homePage.heroImageUrl || base.home.hero.image;
      base.home.hero.imageAlt = localize(locale, homePage.heroImageAltEn, homePage.heroImageAltAr, base.home.hero.imageAlt);
      base.home.hero.floatingCard.title = localize(locale, homePage.floatingCardTitleEn, homePage.floatingCardTitleAr, base.home.hero.floatingCard.title);
      base.home.hero.floatingCard.description = localize(locale, homePage.floatingCardDescriptionEn, homePage.floatingCardDescriptionAr, base.home.hero.floatingCard.description);
      base.home.about.title = localize(locale, homePage.aboutTitleEn, homePage.aboutTitleAr, base.home.about.title);
      base.home.about.description = localize(locale, homePage.aboutDescriptionEn, homePage.aboutDescriptionAr, base.home.about.description);
      base.home.missionCards = [
        {
          title: localize(locale, homePage.missionTitleEn, homePage.missionTitleAr, base.home.missionCards[0].title),
          description: localize(locale, homePage.missionDescriptionEn, homePage.missionDescriptionAr, base.home.missionCards[0].description),
        },
        {
          title: localize(locale, homePage.visionTitleEn, homePage.visionTitleAr, base.home.missionCards[1].title),
          description: localize(locale, homePage.visionDescriptionEn, homePage.visionDescriptionAr, base.home.missionCards[1].description),
        },
        {
          title: localize(locale, homePage.valuesTitleEn, homePage.valuesTitleAr, base.home.missionCards[2].title),
          description: localize(locale, homePage.valuesDescriptionEn, homePage.valuesDescriptionAr, base.home.missionCards[2].description),
        },
      ];
      base.home.coreValues.title = localize(locale, homePage.coreValuesTitleEn, homePage.coreValuesTitleAr, base.home.coreValues.title);
      base.home.coreValues.description = localize(locale, homePage.coreValuesDescriptionEn, homePage.coreValuesDescriptionAr, base.home.coreValues.description);
      base.home.coreValues.items =
        locale === "ar"
          ? parseListItems(homePage.coreValuesItemsAr, base.home.coreValues.items)
          : parseListItems(homePage.coreValuesItemsEn, base.home.coreValues.items);
      base.home.howItWorks.title = localize(locale, homePage.howItWorksTitleEn, homePage.howItWorksTitleAr, base.home.howItWorks.title);
      base.home.howItWorks.description = localize(locale, homePage.howItWorksDescriptionEn, homePage.howItWorksDescriptionAr, base.home.howItWorks.description);
      base.home.howItWorks.steps = [
        {
          title: localize(locale, homePage.stepOneTitleEn, homePage.stepOneTitleAr, base.home.howItWorks.steps[0].title),
          description: localize(locale, homePage.stepOneDescriptionEn, homePage.stepOneDescriptionAr, base.home.howItWorks.steps[0].description),
        },
        {
          title: localize(locale, homePage.stepTwoTitleEn, homePage.stepTwoTitleAr, base.home.howItWorks.steps[1].title),
          description: localize(locale, homePage.stepTwoDescriptionEn, homePage.stepTwoDescriptionAr, base.home.howItWorks.steps[1].description),
        },
        {
          title: localize(locale, homePage.stepThreeTitleEn, homePage.stepThreeTitleAr, base.home.howItWorks.steps[2].title),
          description: localize(locale, homePage.stepThreeDescriptionEn, homePage.stepThreeDescriptionAr, base.home.howItWorks.steps[2].description),
        },
      ];
      base.home.programs.title = localize(locale, homePage.programsTitleEn, homePage.programsTitleAr, base.home.programs.title);
      base.home.programs.description = localize(locale, homePage.programsDescriptionEn, homePage.programsDescriptionAr, base.home.programs.description);
      base.home.libraryServices.title = localize(locale, homePage.libraryServicesTitleEn, homePage.libraryServicesTitleAr, base.home.libraryServices.title);
      base.home.libraryServices.description = localize(locale, homePage.libraryServicesDescriptionEn, homePage.libraryServicesDescriptionAr, base.home.libraryServices.description);
      base.home.libraryServices.items =
        locale === "ar"
          ? parseListItems(homePage.libraryServicesItemsAr, base.home.libraryServices.items)
          : parseListItems(homePage.libraryServicesItemsEn, base.home.libraryServices.items);
      base.home.projects.title = localize(locale, homePage.projectsTitleEn, homePage.projectsTitleAr, base.home.projects.title);
      base.home.projects.description = localize(locale, homePage.projectsDescriptionEn, homePage.projectsDescriptionAr, base.home.projects.description);
      base.home.events.title = localize(locale, homePage.eventsTitleEn, homePage.eventsTitleAr, base.home.events.title);
      base.home.events.description = localize(locale, homePage.eventsDescriptionEn, homePage.eventsDescriptionAr, base.home.events.description);
      base.home.strategicGoals.title = localize(locale, homePage.strategicGoalsTitleEn, homePage.strategicGoalsTitleAr, base.home.strategicGoals.title);
      base.home.strategicGoals.description = localize(locale, homePage.strategicGoalsDescriptionEn, homePage.strategicGoalsDescriptionAr, base.home.strategicGoals.description);
      base.home.strategicGoals.items =
        locale === "ar"
          ? parseGoalItems(homePage.strategicGoalsItemsAr, base.home.strategicGoals.items)
          : parseGoalItems(homePage.strategicGoalsItemsEn, base.home.strategicGoals.items);
      base.home.busFeatures.title = localize(locale, homePage.busFeaturesTitleEn, homePage.busFeaturesTitleAr, base.home.busFeatures.title);
      base.home.busFeatures.description = localize(locale, homePage.busFeaturesDescriptionEn, homePage.busFeaturesDescriptionAr, base.home.busFeatures.description);
      base.home.busFeatures.items =
        locale === "ar"
          ? parseListItems(homePage.busFeaturesItemsAr, base.home.busFeatures.items)
          : parseListItems(homePage.busFeaturesItemsEn, base.home.busFeatures.items);
      base.home.targetAudience.title = localize(locale, homePage.targetAudienceTitleEn, homePage.targetAudienceTitleAr, base.home.targetAudience.title);
      base.home.targetAudience.description = localize(locale, homePage.targetAudienceDescriptionEn, homePage.targetAudienceDescriptionAr, base.home.targetAudience.description);
      base.home.targetAudience.items =
        locale === "ar"
          ? parseListItems(homePage.targetAudienceItemsAr, base.home.targetAudience.items)
          : parseListItems(homePage.targetAudienceItemsEn, base.home.targetAudience.items);
      base.home.operations.title = localize(locale, homePage.operationsTitleEn, homePage.operationsTitleAr, base.home.operations.title);
      base.home.operations.description = localize(locale, homePage.operationsDescriptionEn, homePage.operationsDescriptionAr, base.home.operations.description);
      base.home.operations.items =
        locale === "ar"
          ? parseListItems(homePage.operationsItemsAr, base.home.operations.items)
          : parseListItems(homePage.operationsItemsEn, base.home.operations.items);
      base.home.partnerships.title = localize(locale, homePage.partnershipsTitleEn, homePage.partnershipsTitleAr, base.home.partnerships.title);
      base.home.partnerships.description = localize(locale, homePage.partnershipsDescriptionEn, homePage.partnershipsDescriptionAr, base.home.partnerships.description);
      base.home.partnerships.items =
        locale === "ar"
          ? parseListItems(homePage.partnershipsItemsAr, base.home.partnerships.items)
          : parseListItems(homePage.partnershipsItemsEn, base.home.partnerships.items);
      base.home.finalMessage.title = localize(locale, homePage.finalMessageTitleEn, homePage.finalMessageTitleAr, base.home.finalMessage.title);
      base.home.finalMessage.description = localize(locale, homePage.finalMessageDescriptionEn, homePage.finalMessageDescriptionAr, base.home.finalMessage.description);
      base.home.impact.title = localize(locale, homePage.impactTitleEn, homePage.impactTitleAr, base.home.impact.title);
      base.home.impact.description = localize(locale, homePage.impactDescriptionEn, homePage.impactDescriptionAr, base.home.impact.description);
      base.home.impact.stats = [
        { label: localize(locale, homePage.statOneLabelEn, homePage.statOneLabelAr, base.home.impact.stats[0].label), value: impactValues[0] },
        { label: localize(locale, homePage.statTwoLabelEn, homePage.statTwoLabelAr, base.home.impact.stats[1].label), value: impactValues[1] },
        { label: localize(locale, homePage.statThreeLabelEn, homePage.statThreeLabelAr, base.home.impact.stats[2].label), value: impactValues[2] },
        { label: localize(locale, homePage.statFourLabelEn, homePage.statFourLabelAr, base.home.impact.stats[3].label), value: impactValues[3] },
      ];
      base.home.donateCta.title = localize(locale, homePage.donationCtaTitleEn, homePage.donationCtaTitleAr, base.home.donateCta.title);
      base.home.donateCta.description = localize(locale, homePage.donationCtaDescriptionEn, homePage.donationCtaDescriptionAr, base.home.donateCta.description);
      base.home.donateCta.button = localize(locale, homePage.donationCtaButtonLabelEn, homePage.donationCtaButtonLabelAr, base.home.donateCta.button);
    }

    for (const page of pageContents) {
      if (page.key in base.pages) {
        const pageKey = page.key as keyof SiteContent["pages"];
        base.pages[pageKey] = {
          title: localize(locale, page.titleEn, page.titleAr, base.pages[pageKey].title),
          description: localize(locale, page.descriptionEn, page.descriptionAr, base.pages[pageKey].description),
        };
      }
    }

    if (donationSettings) {
      base.donation.heading = localize(locale, donationSettings.headingEn, donationSettings.headingAr, base.donation.heading);
      base.donation.description = localize(locale, donationSettings.descriptionEn, donationSettings.descriptionAr, base.donation.description);
      base.donation.tabs.bankTransfer = localize(locale, donationSettings.bankTransferTabEn, donationSettings.bankTransferTabAr, base.donation.tabs.bankTransfer);
      base.donation.tabs.onlineSoon = localize(locale, donationSettings.onlineSoonTabEn, donationSettings.onlineSoonTabAr, base.donation.tabs.onlineSoon);
      base.donation.bankTransfer.title = localize(locale, donationSettings.bankTransferTitleEn, donationSettings.bankTransferTitleAr, base.donation.bankTransfer.title);
      base.donation.bankTransfer.helper = localize(locale, donationSettings.bankTransferHelperEn, donationSettings.bankTransferHelperAr, base.donation.bankTransfer.helper);
      base.donation.bankTransfer.fields = [
        { label: localize(locale, donationSettings.bankNameLabelEn, donationSettings.bankNameLabelAr, base.donation.bankTransfer.fields[0].label), value: donationSettings.bankNameValue || base.donation.bankTransfer.fields[0].value },
        { label: localize(locale, donationSettings.accountNameLabelEn, donationSettings.accountNameLabelAr, base.donation.bankTransfer.fields[1].label), value: donationSettings.accountNameValue || base.donation.bankTransfer.fields[1].value },
        { label: localize(locale, donationSettings.accountNumberLabelEn, donationSettings.accountNumberLabelAr, base.donation.bankTransfer.fields[2].label), value: donationSettings.accountNumberValue || base.donation.bankTransfer.fields[2].value },
        { label: localize(locale, donationSettings.ibanLabelEn, donationSettings.ibanLabelAr, base.donation.bankTransfer.fields[3].label), value: donationSettings.ibanValue || base.donation.bankTransfer.fields[3].value },
      ];
      base.donation.bankTransfer.referenceNote = localize(locale, donationSettings.referenceNoteEn, donationSettings.referenceNoteAr, base.donation.bankTransfer.referenceNote);
      base.donation.form.title = localize(locale, donationSettings.formTitleEn, donationSettings.formTitleAr, base.donation.form.title);
      base.donation.form.description = localize(locale, donationSettings.formDescriptionEn, donationSettings.formDescriptionAr, base.donation.form.description);
      base.donation.form.name = localize(locale, donationSettings.formNameLabelEn, donationSettings.formNameLabelAr, base.donation.form.name);
      base.donation.form.email = localize(locale, donationSettings.formEmailLabelEn, donationSettings.formEmailLabelAr, base.donation.form.email);
      base.donation.form.amount = localize(locale, donationSettings.formAmountLabelEn, donationSettings.formAmountLabelAr, base.donation.form.amount);
      base.donation.form.note = localize(locale, donationSettings.formNoteLabelEn, donationSettings.formNoteLabelAr, base.donation.form.note);
      base.donation.form.transferDate = localize(locale, donationSettings.formTransferDateLabelEn, donationSettings.formTransferDateLabelAr, base.donation.form.transferDate);
      base.donation.form.submit = localize(locale, donationSettings.formSubmitLabelEn, donationSettings.formSubmitLabelAr, base.donation.form.submit);
      base.donation.placeholderCard.title = localize(locale, donationSettings.placeholderTitleEn, donationSettings.placeholderTitleAr, base.donation.placeholderCard.title);
      base.donation.placeholderCard.description = localize(locale, donationSettings.placeholderDescriptionEn, donationSettings.placeholderDescriptionAr, base.donation.placeholderCard.description);
      base.donation.cta.title = localize(locale, donationSettings.ctaTitleEn, donationSettings.ctaTitleAr, base.donation.cta.title);
      base.donation.cta.button = localize(locale, donationSettings.ctaButtonLabelEn, donationSettings.ctaButtonLabelAr, base.donation.cta.button);
    }

    if (contactSettings) {
      base.contact.title = localize(locale, contactSettings.titleEn, contactSettings.titleAr, base.contact.title);
      base.contact.description = localize(locale, contactSettings.descriptionEn, contactSettings.descriptionAr, base.contact.description);
      base.contact.details = [
        { label: localize(locale, contactSettings.emailLabelEn, contactSettings.emailLabelAr, base.contact.details[0].label), value: contactSettings.emailValue || base.contact.details[0].value },
        { label: localize(locale, contactSettings.phoneLabelEn, contactSettings.phoneLabelAr, base.contact.details[1].label), value: contactSettings.phoneValue || base.contact.details[1].value },
        {
          label: localize(locale, contactSettings.addressLabelEn, contactSettings.addressLabelAr, base.contact.details[2].label),
          value: normalizeLegacyContactValue(
            locale,
            contactSettings.addressValueEn,
            contactSettings.addressValueAr,
            base.contact.details[2].value,
          ),
        },
      ];
      base.contact.form.name = localize(locale, contactSettings.formNameLabelEn, contactSettings.formNameLabelAr, base.contact.form.name);
      base.contact.form.email = localize(locale, contactSettings.formEmailLabelEn, contactSettings.formEmailLabelAr, base.contact.form.email);
      base.contact.form.subject = localize(locale, contactSettings.formSubjectLabelEn, contactSettings.formSubjectLabelAr, base.contact.form.subject);
      base.contact.form.message = localize(locale, contactSettings.formMessageLabelEn, contactSettings.formMessageLabelAr, base.contact.form.message);
      base.contact.form.submit = localize(locale, contactSettings.formSubmitLabelEn, contactSettings.formSubmitLabelAr, base.contact.form.submit);
    }

    if (programs.length) {
      base.home.programs.items = programs.map((program, index) => ({
        title: localize(locale, program.titleEn, program.titleAr, base.home.programs.items[index]?.title ?? ""),
        description: localize(locale, program.descriptionEn, program.descriptionAr, base.home.programs.items[index]?.description ?? ""),
        image: program.imageUrl || base.home.programs.items[index]?.image || "",
        alt: localize(locale, program.imageAltEn, program.imageAltAr, base.home.programs.items[index]?.alt ?? ""),
      }));
    }

    if (projects.length) {
      base.home.projects.items = projects.map((project, index) => ({
        title: localize(locale, project.titleEn, project.titleAr, base.home.projects.items[index]?.title ?? ""),
        description: localize(locale, project.descriptionEn, project.descriptionAr, base.home.projects.items[index]?.description ?? ""),
        image: project.imageUrl || base.home.projects.items[index]?.image || "",
        alt: localize(locale, project.imageAltEn, project.imageAltAr, base.home.projects.items[index]?.alt ?? ""),
        cta: localize(locale, project.ctaLabelEn, project.ctaLabelAr, base.home.projects.items[index]?.cta ?? ""),
      }));
    }

    if (events.length) {
      base.home.events.items = events.map((event, index) => ({
        title: localize(locale, event.titleEn, event.titleAr, base.home.events.items[index]?.title ?? ""),
        date: formatEventDate(event.eventDate, locale, base.home.events.items[index]?.date ?? ""),
        description: localize(locale, event.descriptionEn, event.descriptionAr, base.home.events.items[index]?.description ?? ""),
        image: event.imageUrl || base.home.events.items[index]?.image || "",
        alt: localize(locale, event.imageAltEn, event.imageAltAr, base.home.events.items[index]?.alt ?? ""),
      }));
    }

    return base;
  } catch (error) {
    console.error("Database content load failed", error);
    return null;
  }
}

const getDatabaseBackedSiteContent = cache(async (locale: Locale) => {
  const managed = await loadDatabaseContent(locale);
  return managed ?? siteContent[locale];
});

export async function getManagedSiteContent(locale: Locale) {
  noStore();
  return getDatabaseBackedSiteContent(locale);
}
