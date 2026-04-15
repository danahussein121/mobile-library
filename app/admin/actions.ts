"use server";

import { compare, hash } from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  createAdminSession,
  clearAdminSessionCookie,
  requireAdminUser,
  setAdminSessionCookie,
} from "@/lib/admin-auth";
import type { AdminActionState } from "@/components/admin/action-state";
import { db } from "@/lib/db";
import { resolveAdminLanguage, withAdminLanguage } from "@/lib/admin-language";
import { saveUploadedFile } from "@/lib/uploads";

function getValue(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

function getValueOrDefault(formData: FormData, key: string, fallback: string) {
  const value = formData.get(key);
  return value === null ? fallback : String(value).trim();
}

function getNumber(formData: FormData, key: string, fallback = 0) {
  const value = Number(getValue(formData, key));
  return Number.isFinite(value) ? value : fallback;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function successState(
  message = "Changes saved successfully.",
  liveMessage = "The website has been updated.",
): AdminActionState {
  return {
    status: "success",
    message,
    liveMessage,
  };
}

function errorState(message = "Something went wrong. Please try again."): AdminActionState {
  return {
    status: "error",
    message,
  };
}

function isRedirectError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "digest" in error &&
    typeof (error as { digest?: string }).digest === "string" &&
    (error as { digest: string }).digest.startsWith("NEXT_REDIRECT")
  );
}

function revalidatePublicSite() {
  const paths = [
    "/en",
    "/ar",
    "/en/about",
    "/ar/about",
    "/en/services",
    "/ar/services",
    "/en/programs",
    "/ar/programs",
    "/en/projects",
    "/ar/projects",
    "/en/events",
    "/ar/events",
    "/en/donate",
    "/ar/donate",
    "/en/contact",
    "/ar/contact",
  ];

  for (const path of paths) {
    revalidatePath(path);
  }
}

export async function loginAdmin(formData: FormData) {
  const email = getValue(formData, "email");
  const password = getValue(formData, "password");
  const next = getValue(formData, "next") || "/admin";
  const language = resolveAdminLanguage(getValue(formData, "lang"));

  const user = await db.adminUser.findUnique({
    where: { email },
  });

  if (!user || !(await compare(password, user.passwordHash))) {
    redirect(withAdminLanguage("/admin/login?error=invalid", language));
  }

  const token = await createAdminSession({
    userId: user.id,
    email: user.email,
  });

  await setAdminSessionCookie(token);
  redirect(next);
}

export async function logoutAdmin() {
  await requireAdminUser();
  await clearAdminSessionCookie();
  redirect("/admin/login");
}

export async function saveProgram(formData: FormData) {
  await requireAdminUser();
  const id = getValue(formData, "id");
  const image = formData.get("image") as File | null;
  const existingImageUrl = getValue(formData, "existingImageUrl") || null;
  const imageUrl = await saveUploadedFile(image, existingImageUrl);
  const titleEn = getValue(formData, "titleEn");

  const payload = {
    slug: slugify(getValue(formData, "slug") || titleEn),
    order: getNumber(formData, "order"),
    titleEn,
    titleAr: getValue(formData, "titleAr"),
    descriptionEn: getValue(formData, "descriptionEn"),
    descriptionAr: getValue(formData, "descriptionAr"),
    imageUrl,
    imageAltEn: getValue(formData, "imageAltEn"),
    imageAltAr: getValue(formData, "imageAltAr"),
  };

  if (id) {
    await db.program.update({ where: { id }, data: payload });
  } else {
    await db.program.create({ data: payload });
  }

  revalidatePublicSite();
  revalidatePath("/admin/programs");
}

export async function deleteProgram(formData: FormData) {
  await requireAdminUser();
  const id = getValue(formData, "id");
  if (id) {
    await db.program.delete({ where: { id } });
  }
  revalidatePublicSite();
  revalidatePath("/admin/programs");
}

export async function saveProject(formData: FormData) {
  await requireAdminUser();
  const id = getValue(formData, "id");
  const image = formData.get("image") as File | null;
  const existingImageUrl = getValue(formData, "existingImageUrl") || null;
  const imageUrl = await saveUploadedFile(image, existingImageUrl);
  const titleEn = getValue(formData, "titleEn");

  const payload = {
    slug: slugify(getValue(formData, "slug") || titleEn),
    order: getNumber(formData, "order"),
    titleEn,
    titleAr: getValue(formData, "titleAr"),
    descriptionEn: getValue(formData, "descriptionEn"),
    descriptionAr: getValue(formData, "descriptionAr"),
    ctaLabelEn: getValue(formData, "ctaLabelEn"),
    ctaLabelAr: getValue(formData, "ctaLabelAr"),
    imageUrl,
    imageAltEn: getValue(formData, "imageAltEn"),
    imageAltAr: getValue(formData, "imageAltAr"),
  };

  if (id) {
    await db.project.update({ where: { id }, data: payload });
  } else {
    await db.project.create({ data: payload });
  }

  revalidatePublicSite();
  revalidatePath("/admin/projects");
}

export async function deleteProject(formData: FormData) {
  await requireAdminUser();
  const id = getValue(formData, "id");
  if (id) {
    await db.project.delete({ where: { id } });
  }
  revalidatePublicSite();
  revalidatePath("/admin/projects");
}

export async function saveEvent(formData: FormData) {
  await requireAdminUser();
  const id = getValue(formData, "id");
  const image = formData.get("image") as File | null;
  const existingImageUrl = getValue(formData, "existingImageUrl") || null;
  const imageUrl = await saveUploadedFile(image, existingImageUrl);
  const titleEn = getValue(formData, "titleEn");

  const payload = {
    slug: slugify(getValue(formData, "slug") || titleEn),
    order: getNumber(formData, "order"),
    eventDate: new Date(getValue(formData, "eventDate")),
    titleEn,
    titleAr: getValue(formData, "titleAr"),
    descriptionEn: getValue(formData, "descriptionEn"),
    descriptionAr: getValue(formData, "descriptionAr"),
    imageUrl,
    imageAltEn: getValue(formData, "imageAltEn"),
    imageAltAr: getValue(formData, "imageAltAr"),
  };

  if (id) {
    await db.event.update({ where: { id }, data: payload });
  } else {
    await db.event.create({ data: payload });
  }

  revalidatePublicSite();
  revalidatePath("/admin/events");
}

export async function deleteEvent(formData: FormData) {
  await requireAdminUser();
  const id = getValue(formData, "id");
  if (id) {
    await db.event.delete({ where: { id } });
  }
  revalidatePublicSite();
  revalidatePath("/admin/events");
}

export async function saveSiteSettings(formData: FormData) {
  await requireAdminUser();
  await db.siteSettings.upsert({
    where: { id: "site-settings" },
    update: {
      projectNameEn: getValue(formData, "projectNameEn"),
      projectNameAr: getValue(formData, "projectNameAr"),
      navHomeEn: getValue(formData, "navHomeEn"),
      navHomeAr: getValue(formData, "navHomeAr"),
      navAboutEn: getValue(formData, "navAboutEn"),
      navAboutAr: getValue(formData, "navAboutAr"),
      navProgramsEn: getValue(formData, "navProgramsEn"),
      navProgramsAr: getValue(formData, "navProgramsAr"),
      navProjectsEn: getValueOrDefault(formData, "navProjectsEn", "Projects"),
      navProjectsAr: getValueOrDefault(formData, "navProjectsAr", "المشاريع"),
      navEventsEn: getValueOrDefault(formData, "navEventsEn", "Events"),
      navEventsAr: getValueOrDefault(formData, "navEventsAr", "الفعاليات"),
      navDonateEn: getValue(formData, "navDonateEn"),
      navDonateAr: getValue(formData, "navDonateAr"),
      navContactEn: getValue(formData, "navContactEn"),
      navContactAr: getValue(formData, "navContactAr"),
      footerDescriptionEn: getValue(formData, "footerDescriptionEn"),
      footerDescriptionAr: getValue(formData, "footerDescriptionAr"),
      footerContactLabelEn: getValue(formData, "footerContactLabelEn"),
      footerContactLabelAr: getValue(formData, "footerContactLabelAr"),
      footerSocialLabelEn: getValue(formData, "footerSocialLabelEn"),
      footerSocialLabelAr: getValue(formData, "footerSocialLabelAr"),
      footerDonateLabelEn: getValue(formData, "footerDonateLabelEn"),
      footerDonateLabelAr: getValue(formData, "footerDonateLabelAr"),
      footerRightsEn: getValue(formData, "footerRightsEn"),
      footerRightsAr: getValue(formData, "footerRightsAr"),
      socialOneLabelEn: getValue(formData, "socialOneLabelEn"),
      socialOneLabelAr: getValue(formData, "socialOneLabelAr"),
      socialOneUrl: getValue(formData, "socialOneUrl"),
      socialTwoLabelEn: getValue(formData, "socialTwoLabelEn"),
      socialTwoLabelAr: getValue(formData, "socialTwoLabelAr"),
      socialTwoUrl: getValue(formData, "socialTwoUrl"),
      socialThreeLabelEn: getValue(formData, "socialThreeLabelEn"),
      socialThreeLabelAr: getValue(formData, "socialThreeLabelAr"),
      socialThreeUrl: getValue(formData, "socialThreeUrl"),
    },
    create: {
      id: "site-settings",
      projectNameEn: getValue(formData, "projectNameEn"),
      projectNameAr: getValue(formData, "projectNameAr"),
      navHomeEn: getValue(formData, "navHomeEn"),
      navHomeAr: getValue(formData, "navHomeAr"),
      navAboutEn: getValue(formData, "navAboutEn"),
      navAboutAr: getValue(formData, "navAboutAr"),
      navProgramsEn: getValue(formData, "navProgramsEn"),
      navProgramsAr: getValue(formData, "navProgramsAr"),
      navProjectsEn: getValueOrDefault(formData, "navProjectsEn", "Projects"),
      navProjectsAr: getValueOrDefault(formData, "navProjectsAr", "المشاريع"),
      navEventsEn: getValueOrDefault(formData, "navEventsEn", "Events"),
      navEventsAr: getValueOrDefault(formData, "navEventsAr", "الفعاليات"),
      navDonateEn: getValue(formData, "navDonateEn"),
      navDonateAr: getValue(formData, "navDonateAr"),
      navContactEn: getValue(formData, "navContactEn"),
      navContactAr: getValue(formData, "navContactAr"),
      footerDescriptionEn: getValue(formData, "footerDescriptionEn"),
      footerDescriptionAr: getValue(formData, "footerDescriptionAr"),
      footerContactLabelEn: getValue(formData, "footerContactLabelEn"),
      footerContactLabelAr: getValue(formData, "footerContactLabelAr"),
      footerSocialLabelEn: getValue(formData, "footerSocialLabelEn"),
      footerSocialLabelAr: getValue(formData, "footerSocialLabelAr"),
      footerDonateLabelEn: getValue(formData, "footerDonateLabelEn"),
      footerDonateLabelAr: getValue(formData, "footerDonateLabelAr"),
      footerRightsEn: getValue(formData, "footerRightsEn"),
      footerRightsAr: getValue(formData, "footerRightsAr"),
      socialOneLabelEn: getValue(formData, "socialOneLabelEn"),
      socialOneLabelAr: getValue(formData, "socialOneLabelAr"),
      socialOneUrl: getValue(formData, "socialOneUrl"),
      socialTwoLabelEn: getValue(formData, "socialTwoLabelEn"),
      socialTwoLabelAr: getValue(formData, "socialTwoLabelAr"),
      socialTwoUrl: getValue(formData, "socialTwoUrl"),
      socialThreeLabelEn: getValue(formData, "socialThreeLabelEn"),
      socialThreeLabelAr: getValue(formData, "socialThreeLabelAr"),
      socialThreeUrl: getValue(formData, "socialThreeUrl"),
    },
  });

  revalidatePublicSite();
  revalidatePath("/admin/settings/site");
}

export async function saveHomePage(formData: FormData) {
  await requireAdminUser();
  const heroImageUrl = await saveUploadedFile(
    formData.get("heroImage") as File | null,
    getValue(formData, "existingHeroImageUrl") || null,
  );

  await db.homePage.upsert({
    where: { id: "home-page" },
    update: {
      heroEyebrowEn: getValue(formData, "heroEyebrowEn"),
      heroEyebrowAr: getValue(formData, "heroEyebrowAr"),
      heroTitleEn: getValue(formData, "heroTitleEn"),
      heroTitleAr: getValue(formData, "heroTitleAr"),
      heroDescriptionEn: getValue(formData, "heroDescriptionEn"),
      heroDescriptionAr: getValue(formData, "heroDescriptionAr"),
      heroPrimaryActionEn: getValue(formData, "heroPrimaryActionEn"),
      heroPrimaryActionAr: getValue(formData, "heroPrimaryActionAr"),
      heroSecondaryActionEn: getValue(formData, "heroSecondaryActionEn"),
      heroSecondaryActionAr: getValue(formData, "heroSecondaryActionAr"),
      heroImageUrl,
      heroImageAltEn: getValue(formData, "heroImageAltEn"),
      heroImageAltAr: getValue(formData, "heroImageAltAr"),
      floatingCardTitleEn: getValue(formData, "floatingCardTitleEn"),
      floatingCardTitleAr: getValue(formData, "floatingCardTitleAr"),
      floatingCardDescriptionEn: getValue(formData, "floatingCardDescriptionEn"),
      floatingCardDescriptionAr: getValue(formData, "floatingCardDescriptionAr"),
      aboutTitleEn: getValue(formData, "aboutTitleEn"),
      aboutTitleAr: getValue(formData, "aboutTitleAr"),
      aboutDescriptionEn: getValue(formData, "aboutDescriptionEn"),
      aboutDescriptionAr: getValue(formData, "aboutDescriptionAr"),
      missionTitleEn: getValue(formData, "missionTitleEn"),
      missionTitleAr: getValue(formData, "missionTitleAr"),
      missionDescriptionEn: getValue(formData, "missionDescriptionEn"),
      missionDescriptionAr: getValue(formData, "missionDescriptionAr"),
      visionTitleEn: getValue(formData, "visionTitleEn"),
      visionTitleAr: getValue(formData, "visionTitleAr"),
      visionDescriptionEn: getValue(formData, "visionDescriptionEn"),
      visionDescriptionAr: getValue(formData, "visionDescriptionAr"),
      valuesTitleEn: getValue(formData, "valuesTitleEn"),
      valuesTitleAr: getValue(formData, "valuesTitleAr"),
      valuesDescriptionEn: getValue(formData, "valuesDescriptionEn"),
      valuesDescriptionAr: getValue(formData, "valuesDescriptionAr"),
      coreValuesTitleEn: getValue(formData, "coreValuesTitleEn"),
      coreValuesTitleAr: getValue(formData, "coreValuesTitleAr"),
      coreValuesDescriptionEn: getValue(formData, "coreValuesDescriptionEn"),
      coreValuesDescriptionAr: getValue(formData, "coreValuesDescriptionAr"),
      coreValuesItemsEn: getValue(formData, "coreValuesItemsEn"),
      coreValuesItemsAr: getValue(formData, "coreValuesItemsAr"),
      howItWorksTitleEn: getValue(formData, "howItWorksTitleEn"),
      howItWorksTitleAr: getValue(formData, "howItWorksTitleAr"),
      howItWorksDescriptionEn: getValue(formData, "howItWorksDescriptionEn"),
      howItWorksDescriptionAr: getValue(formData, "howItWorksDescriptionAr"),
      stepOneTitleEn: getValue(formData, "stepOneTitleEn"),
      stepOneTitleAr: getValue(formData, "stepOneTitleAr"),
      stepOneDescriptionEn: getValue(formData, "stepOneDescriptionEn"),
      stepOneDescriptionAr: getValue(formData, "stepOneDescriptionAr"),
      stepTwoTitleEn: getValue(formData, "stepTwoTitleEn"),
      stepTwoTitleAr: getValue(formData, "stepTwoTitleAr"),
      stepTwoDescriptionEn: getValue(formData, "stepTwoDescriptionEn"),
      stepTwoDescriptionAr: getValue(formData, "stepTwoDescriptionAr"),
      stepThreeTitleEn: getValue(formData, "stepThreeTitleEn"),
      stepThreeTitleAr: getValue(formData, "stepThreeTitleAr"),
      stepThreeDescriptionEn: getValue(formData, "stepThreeDescriptionEn"),
      stepThreeDescriptionAr: getValue(formData, "stepThreeDescriptionAr"),
      programsTitleEn: getValue(formData, "programsTitleEn"),
      programsTitleAr: getValue(formData, "programsTitleAr"),
      programsDescriptionEn: getValue(formData, "programsDescriptionEn"),
      programsDescriptionAr: getValue(formData, "programsDescriptionAr"),
      libraryServicesTitleEn: getValue(formData, "libraryServicesTitleEn"),
      libraryServicesTitleAr: getValue(formData, "libraryServicesTitleAr"),
      libraryServicesDescriptionEn: getValue(formData, "libraryServicesDescriptionEn"),
      libraryServicesDescriptionAr: getValue(formData, "libraryServicesDescriptionAr"),
      libraryServicesItemsEn: getValue(formData, "libraryServicesItemsEn"),
      libraryServicesItemsAr: getValue(formData, "libraryServicesItemsAr"),
      projectsTitleEn: getValue(formData, "projectsTitleEn"),
      projectsTitleAr: getValue(formData, "projectsTitleAr"),
      projectsDescriptionEn: getValue(formData, "projectsDescriptionEn"),
      projectsDescriptionAr: getValue(formData, "projectsDescriptionAr"),
      eventsTitleEn: getValue(formData, "eventsTitleEn"),
      eventsTitleAr: getValue(formData, "eventsTitleAr"),
      eventsDescriptionEn: getValue(formData, "eventsDescriptionEn"),
      eventsDescriptionAr: getValue(formData, "eventsDescriptionAr"),
      strategicGoalsTitleEn: getValue(formData, "strategicGoalsTitleEn"),
      strategicGoalsTitleAr: getValue(formData, "strategicGoalsTitleAr"),
      strategicGoalsDescriptionEn: getValue(formData, "strategicGoalsDescriptionEn"),
      strategicGoalsDescriptionAr: getValue(formData, "strategicGoalsDescriptionAr"),
      strategicGoalsItemsEn: getValue(formData, "strategicGoalsItemsEn"),
      strategicGoalsItemsAr: getValue(formData, "strategicGoalsItemsAr"),
      busFeaturesTitleEn: getValue(formData, "busFeaturesTitleEn"),
      busFeaturesTitleAr: getValue(formData, "busFeaturesTitleAr"),
      busFeaturesDescriptionEn: getValue(formData, "busFeaturesDescriptionEn"),
      busFeaturesDescriptionAr: getValue(formData, "busFeaturesDescriptionAr"),
      busFeaturesItemsEn: getValue(formData, "busFeaturesItemsEn"),
      busFeaturesItemsAr: getValue(formData, "busFeaturesItemsAr"),
      targetAudienceTitleEn: getValue(formData, "targetAudienceTitleEn"),
      targetAudienceTitleAr: getValue(formData, "targetAudienceTitleAr"),
      targetAudienceDescriptionEn: getValue(formData, "targetAudienceDescriptionEn"),
      targetAudienceDescriptionAr: getValue(formData, "targetAudienceDescriptionAr"),
      targetAudienceItemsEn: getValue(formData, "targetAudienceItemsEn"),
      targetAudienceItemsAr: getValue(formData, "targetAudienceItemsAr"),
      operationsTitleEn: getValue(formData, "operationsTitleEn"),
      operationsTitleAr: getValue(formData, "operationsTitleAr"),
      operationsDescriptionEn: getValue(formData, "operationsDescriptionEn"),
      operationsDescriptionAr: getValue(formData, "operationsDescriptionAr"),
      operationsItemsEn: getValue(formData, "operationsItemsEn"),
      operationsItemsAr: getValue(formData, "operationsItemsAr"),
      partnershipsTitleEn: getValue(formData, "partnershipsTitleEn"),
      partnershipsTitleAr: getValue(formData, "partnershipsTitleAr"),
      partnershipsDescriptionEn: getValue(formData, "partnershipsDescriptionEn"),
      partnershipsDescriptionAr: getValue(formData, "partnershipsDescriptionAr"),
      partnershipsItemsEn: getValue(formData, "partnershipsItemsEn"),
      partnershipsItemsAr: getValue(formData, "partnershipsItemsAr"),
      finalMessageTitleEn: getValue(formData, "finalMessageTitleEn"),
      finalMessageTitleAr: getValue(formData, "finalMessageTitleAr"),
      finalMessageDescriptionEn: getValue(formData, "finalMessageDescriptionEn"),
      finalMessageDescriptionAr: getValue(formData, "finalMessageDescriptionAr"),
      impactTitleEn: getValue(formData, "impactTitleEn"),
      impactTitleAr: getValue(formData, "impactTitleAr"),
      impactDescriptionEn: getValue(formData, "impactDescriptionEn"),
      impactDescriptionAr: getValue(formData, "impactDescriptionAr"),
      statOneLabelEn: getValue(formData, "statOneLabelEn"),
      statOneLabelAr: getValue(formData, "statOneLabelAr"),
      statOneValue: getValue(formData, "statOneValue"),
      statTwoLabelEn: getValue(formData, "statTwoLabelEn"),
      statTwoLabelAr: getValue(formData, "statTwoLabelAr"),
      statTwoValue: getValue(formData, "statTwoValue"),
      statThreeLabelEn: getValue(formData, "statThreeLabelEn"),
      statThreeLabelAr: getValue(formData, "statThreeLabelAr"),
      statThreeValue: getValue(formData, "statThreeValue"),
      statFourLabelEn: getValue(formData, "statFourLabelEn"),
      statFourLabelAr: getValue(formData, "statFourLabelAr"),
      statFourValue: getValue(formData, "statFourValue"),
      donationCtaTitleEn: getValue(formData, "donationCtaTitleEn"),
      donationCtaTitleAr: getValue(formData, "donationCtaTitleAr"),
      donationCtaDescriptionEn: getValue(formData, "donationCtaDescriptionEn"),
      donationCtaDescriptionAr: getValue(formData, "donationCtaDescriptionAr"),
      donationCtaButtonLabelEn: getValue(formData, "donationCtaButtonLabelEn"),
      donationCtaButtonLabelAr: getValue(formData, "donationCtaButtonLabelAr"),
    },
    create: {
      id: "home-page",
      heroEyebrowEn: getValue(formData, "heroEyebrowEn"),
      heroEyebrowAr: getValue(formData, "heroEyebrowAr"),
      heroTitleEn: getValue(formData, "heroTitleEn"),
      heroTitleAr: getValue(formData, "heroTitleAr"),
      heroDescriptionEn: getValue(formData, "heroDescriptionEn"),
      heroDescriptionAr: getValue(formData, "heroDescriptionAr"),
      heroPrimaryActionEn: getValue(formData, "heroPrimaryActionEn"),
      heroPrimaryActionAr: getValue(formData, "heroPrimaryActionAr"),
      heroSecondaryActionEn: getValue(formData, "heroSecondaryActionEn"),
      heroSecondaryActionAr: getValue(formData, "heroSecondaryActionAr"),
      heroImageUrl,
      heroImageAltEn: getValue(formData, "heroImageAltEn"),
      heroImageAltAr: getValue(formData, "heroImageAltAr"),
      floatingCardTitleEn: getValue(formData, "floatingCardTitleEn"),
      floatingCardTitleAr: getValue(formData, "floatingCardTitleAr"),
      floatingCardDescriptionEn: getValue(formData, "floatingCardDescriptionEn"),
      floatingCardDescriptionAr: getValue(formData, "floatingCardDescriptionAr"),
      aboutTitleEn: getValue(formData, "aboutTitleEn"),
      aboutTitleAr: getValue(formData, "aboutTitleAr"),
      aboutDescriptionEn: getValue(formData, "aboutDescriptionEn"),
      aboutDescriptionAr: getValue(formData, "aboutDescriptionAr"),
      missionTitleEn: getValue(formData, "missionTitleEn"),
      missionTitleAr: getValue(formData, "missionTitleAr"),
      missionDescriptionEn: getValue(formData, "missionDescriptionEn"),
      missionDescriptionAr: getValue(formData, "missionDescriptionAr"),
      visionTitleEn: getValue(formData, "visionTitleEn"),
      visionTitleAr: getValue(formData, "visionTitleAr"),
      visionDescriptionEn: getValue(formData, "visionDescriptionEn"),
      visionDescriptionAr: getValue(formData, "visionDescriptionAr"),
      valuesTitleEn: getValue(formData, "valuesTitleEn"),
      valuesTitleAr: getValue(formData, "valuesTitleAr"),
      valuesDescriptionEn: getValue(formData, "valuesDescriptionEn"),
      valuesDescriptionAr: getValue(formData, "valuesDescriptionAr"),
      coreValuesTitleEn: getValue(formData, "coreValuesTitleEn"),
      coreValuesTitleAr: getValue(formData, "coreValuesTitleAr"),
      coreValuesDescriptionEn: getValue(formData, "coreValuesDescriptionEn"),
      coreValuesDescriptionAr: getValue(formData, "coreValuesDescriptionAr"),
      coreValuesItemsEn: getValue(formData, "coreValuesItemsEn"),
      coreValuesItemsAr: getValue(formData, "coreValuesItemsAr"),
      howItWorksTitleEn: getValue(formData, "howItWorksTitleEn"),
      howItWorksTitleAr: getValue(formData, "howItWorksTitleAr"),
      howItWorksDescriptionEn: getValue(formData, "howItWorksDescriptionEn"),
      howItWorksDescriptionAr: getValue(formData, "howItWorksDescriptionAr"),
      stepOneTitleEn: getValue(formData, "stepOneTitleEn"),
      stepOneTitleAr: getValue(formData, "stepOneTitleAr"),
      stepOneDescriptionEn: getValue(formData, "stepOneDescriptionEn"),
      stepOneDescriptionAr: getValue(formData, "stepOneDescriptionAr"),
      stepTwoTitleEn: getValue(formData, "stepTwoTitleEn"),
      stepTwoTitleAr: getValue(formData, "stepTwoTitleAr"),
      stepTwoDescriptionEn: getValue(formData, "stepTwoDescriptionEn"),
      stepTwoDescriptionAr: getValue(formData, "stepTwoDescriptionAr"),
      stepThreeTitleEn: getValue(formData, "stepThreeTitleEn"),
      stepThreeTitleAr: getValue(formData, "stepThreeTitleAr"),
      stepThreeDescriptionEn: getValue(formData, "stepThreeDescriptionEn"),
      stepThreeDescriptionAr: getValue(formData, "stepThreeDescriptionAr"),
      programsTitleEn: getValue(formData, "programsTitleEn"),
      programsTitleAr: getValue(formData, "programsTitleAr"),
      programsDescriptionEn: getValue(formData, "programsDescriptionEn"),
      programsDescriptionAr: getValue(formData, "programsDescriptionAr"),
      libraryServicesTitleEn: getValue(formData, "libraryServicesTitleEn"),
      libraryServicesTitleAr: getValue(formData, "libraryServicesTitleAr"),
      libraryServicesDescriptionEn: getValue(formData, "libraryServicesDescriptionEn"),
      libraryServicesDescriptionAr: getValue(formData, "libraryServicesDescriptionAr"),
      libraryServicesItemsEn: getValue(formData, "libraryServicesItemsEn"),
      libraryServicesItemsAr: getValue(formData, "libraryServicesItemsAr"),
      projectsTitleEn: getValue(formData, "projectsTitleEn"),
      projectsTitleAr: getValue(formData, "projectsTitleAr"),
      projectsDescriptionEn: getValue(formData, "projectsDescriptionEn"),
      projectsDescriptionAr: getValue(formData, "projectsDescriptionAr"),
      eventsTitleEn: getValue(formData, "eventsTitleEn"),
      eventsTitleAr: getValue(formData, "eventsTitleAr"),
      eventsDescriptionEn: getValue(formData, "eventsDescriptionEn"),
      eventsDescriptionAr: getValue(formData, "eventsDescriptionAr"),
      strategicGoalsTitleEn: getValue(formData, "strategicGoalsTitleEn"),
      strategicGoalsTitleAr: getValue(formData, "strategicGoalsTitleAr"),
      strategicGoalsDescriptionEn: getValue(formData, "strategicGoalsDescriptionEn"),
      strategicGoalsDescriptionAr: getValue(formData, "strategicGoalsDescriptionAr"),
      strategicGoalsItemsEn: getValue(formData, "strategicGoalsItemsEn"),
      strategicGoalsItemsAr: getValue(formData, "strategicGoalsItemsAr"),
      busFeaturesTitleEn: getValue(formData, "busFeaturesTitleEn"),
      busFeaturesTitleAr: getValue(formData, "busFeaturesTitleAr"),
      busFeaturesDescriptionEn: getValue(formData, "busFeaturesDescriptionEn"),
      busFeaturesDescriptionAr: getValue(formData, "busFeaturesDescriptionAr"),
      busFeaturesItemsEn: getValue(formData, "busFeaturesItemsEn"),
      busFeaturesItemsAr: getValue(formData, "busFeaturesItemsAr"),
      targetAudienceTitleEn: getValue(formData, "targetAudienceTitleEn"),
      targetAudienceTitleAr: getValue(formData, "targetAudienceTitleAr"),
      targetAudienceDescriptionEn: getValue(formData, "targetAudienceDescriptionEn"),
      targetAudienceDescriptionAr: getValue(formData, "targetAudienceDescriptionAr"),
      targetAudienceItemsEn: getValue(formData, "targetAudienceItemsEn"),
      targetAudienceItemsAr: getValue(formData, "targetAudienceItemsAr"),
      operationsTitleEn: getValue(formData, "operationsTitleEn"),
      operationsTitleAr: getValue(formData, "operationsTitleAr"),
      operationsDescriptionEn: getValue(formData, "operationsDescriptionEn"),
      operationsDescriptionAr: getValue(formData, "operationsDescriptionAr"),
      operationsItemsEn: getValue(formData, "operationsItemsEn"),
      operationsItemsAr: getValue(formData, "operationsItemsAr"),
      partnershipsTitleEn: getValue(formData, "partnershipsTitleEn"),
      partnershipsTitleAr: getValue(formData, "partnershipsTitleAr"),
      partnershipsDescriptionEn: getValue(formData, "partnershipsDescriptionEn"),
      partnershipsDescriptionAr: getValue(formData, "partnershipsDescriptionAr"),
      partnershipsItemsEn: getValue(formData, "partnershipsItemsEn"),
      partnershipsItemsAr: getValue(formData, "partnershipsItemsAr"),
      finalMessageTitleEn: getValue(formData, "finalMessageTitleEn"),
      finalMessageTitleAr: getValue(formData, "finalMessageTitleAr"),
      finalMessageDescriptionEn: getValue(formData, "finalMessageDescriptionEn"),
      finalMessageDescriptionAr: getValue(formData, "finalMessageDescriptionAr"),
      impactTitleEn: getValue(formData, "impactTitleEn"),
      impactTitleAr: getValue(formData, "impactTitleAr"),
      impactDescriptionEn: getValue(formData, "impactDescriptionEn"),
      impactDescriptionAr: getValue(formData, "impactDescriptionAr"),
      statOneLabelEn: getValue(formData, "statOneLabelEn"),
      statOneLabelAr: getValue(formData, "statOneLabelAr"),
      statOneValue: getValue(formData, "statOneValue"),
      statTwoLabelEn: getValue(formData, "statTwoLabelEn"),
      statTwoLabelAr: getValue(formData, "statTwoLabelAr"),
      statTwoValue: getValue(formData, "statTwoValue"),
      statThreeLabelEn: getValue(formData, "statThreeLabelEn"),
      statThreeLabelAr: getValue(formData, "statThreeLabelAr"),
      statThreeValue: getValue(formData, "statThreeValue"),
      statFourLabelEn: getValue(formData, "statFourLabelEn"),
      statFourLabelAr: getValue(formData, "statFourLabelAr"),
      statFourValue: getValue(formData, "statFourValue"),
      donationCtaTitleEn: getValue(formData, "donationCtaTitleEn"),
      donationCtaTitleAr: getValue(formData, "donationCtaTitleAr"),
      donationCtaDescriptionEn: getValue(formData, "donationCtaDescriptionEn"),
      donationCtaDescriptionAr: getValue(formData, "donationCtaDescriptionAr"),
      donationCtaButtonLabelEn: getValue(formData, "donationCtaButtonLabelEn"),
      donationCtaButtonLabelAr: getValue(formData, "donationCtaButtonLabelAr"),
    },
  });

  revalidatePublicSite();
  revalidatePath("/admin/settings/home");
}

export async function savePageContent(formData: FormData) {
  await requireAdminUser();
  const key = getValue(formData, "key");
  await db.pageContent.upsert({
    where: { key },
    update: {
      titleEn: getValue(formData, "titleEn"),
      titleAr: getValue(formData, "titleAr"),
      descriptionEn: getValue(formData, "descriptionEn"),
      descriptionAr: getValue(formData, "descriptionAr"),
    },
    create: {
      key,
      titleEn: getValue(formData, "titleEn"),
      titleAr: getValue(formData, "titleAr"),
      descriptionEn: getValue(formData, "descriptionEn"),
      descriptionAr: getValue(formData, "descriptionAr"),
    },
  });
  revalidatePublicSite();
  revalidatePath(`/admin/settings/pages/${key}`);
}

export async function saveDonationSettings(formData: FormData) {
  await requireAdminUser();
  const payload = {
    headingEn: getValue(formData, "headingEn"),
    headingAr: getValue(formData, "headingAr"),
    descriptionEn: getValue(formData, "descriptionEn"),
    descriptionAr: getValue(formData, "descriptionAr"),
    bankTransferTabEn: getValue(formData, "bankTransferTabEn"),
    bankTransferTabAr: getValue(formData, "bankTransferTabAr"),
    onlineSoonTabEn: getValue(formData, "onlineSoonTabEn"),
    onlineSoonTabAr: getValue(formData, "onlineSoonTabAr"),
    bankTransferTitleEn: getValue(formData, "bankTransferTitleEn"),
    bankTransferTitleAr: getValue(formData, "bankTransferTitleAr"),
    bankTransferHelperEn: getValue(formData, "bankTransferHelperEn"),
    bankTransferHelperAr: getValue(formData, "bankTransferHelperAr"),
    bankNameLabelEn: getValue(formData, "bankNameLabelEn"),
    bankNameLabelAr: getValue(formData, "bankNameLabelAr"),
    bankNameValue: getValue(formData, "bankNameValue"),
    accountNameLabelEn: getValue(formData, "accountNameLabelEn"),
    accountNameLabelAr: getValue(formData, "accountNameLabelAr"),
    accountNameValue: getValue(formData, "accountNameValue"),
    accountNumberLabelEn: getValue(formData, "accountNumberLabelEn"),
    accountNumberLabelAr: getValue(formData, "accountNumberLabelAr"),
    accountNumberValue: getValue(formData, "accountNumberValue"),
    ibanLabelEn: getValue(formData, "ibanLabelEn"),
    ibanLabelAr: getValue(formData, "ibanLabelAr"),
    ibanValue: getValue(formData, "ibanValue"),
    referenceNoteEn: getValue(formData, "referenceNoteEn"),
    referenceNoteAr: getValue(formData, "referenceNoteAr"),
    formTitleEn: getValue(formData, "formTitleEn"),
    formTitleAr: getValue(formData, "formTitleAr"),
    formDescriptionEn: getValue(formData, "formDescriptionEn"),
    formDescriptionAr: getValue(formData, "formDescriptionAr"),
    formNameLabelEn: getValue(formData, "formNameLabelEn"),
    formNameLabelAr: getValue(formData, "formNameLabelAr"),
    formEmailLabelEn: getValue(formData, "formEmailLabelEn"),
    formEmailLabelAr: getValue(formData, "formEmailLabelAr"),
    formAmountLabelEn: getValue(formData, "formAmountLabelEn"),
    formAmountLabelAr: getValue(formData, "formAmountLabelAr"),
    formNoteLabelEn: getValue(formData, "formNoteLabelEn"),
    formNoteLabelAr: getValue(formData, "formNoteLabelAr"),
    formTransferDateLabelEn: getValue(formData, "formTransferDateLabelEn"),
    formTransferDateLabelAr: getValue(formData, "formTransferDateLabelAr"),
    formSubmitLabelEn: getValue(formData, "formSubmitLabelEn"),
    formSubmitLabelAr: getValue(formData, "formSubmitLabelAr"),
    placeholderTitleEn: getValue(formData, "placeholderTitleEn"),
    placeholderTitleAr: getValue(formData, "placeholderTitleAr"),
    placeholderDescriptionEn: getValue(formData, "placeholderDescriptionEn"),
    placeholderDescriptionAr: getValue(formData, "placeholderDescriptionAr"),
    ctaTitleEn: getValue(formData, "ctaTitleEn"),
    ctaTitleAr: getValue(formData, "ctaTitleAr"),
    ctaButtonLabelEn: getValue(formData, "ctaButtonLabelEn"),
    ctaButtonLabelAr: getValue(formData, "ctaButtonLabelAr"),
  };

  await db.donationSettings.upsert({
    where: { id: "donation-settings" },
    update: payload,
    create: {
      id: "donation-settings",
      ...payload,
    },
  });

  revalidatePublicSite();
  revalidatePath("/admin/settings/donation");
}

export async function saveContactSettings(formData: FormData) {
  await requireAdminUser();
  const payload = {
    titleEn: getValue(formData, "titleEn"),
    titleAr: getValue(formData, "titleAr"),
    descriptionEn: getValue(formData, "descriptionEn"),
    descriptionAr: getValue(formData, "descriptionAr"),
    emailLabelEn: getValue(formData, "emailLabelEn"),
    emailLabelAr: getValue(formData, "emailLabelAr"),
    emailValue: getValue(formData, "emailValue"),
    phoneLabelEn: getValue(formData, "phoneLabelEn"),
    phoneLabelAr: getValue(formData, "phoneLabelAr"),
    phoneValue: getValue(formData, "phoneValue"),
    addressLabelEn: getValue(formData, "addressLabelEn"),
    addressLabelAr: getValue(formData, "addressLabelAr"),
    addressValueEn: getValue(formData, "addressValueEn"),
    addressValueAr: getValue(formData, "addressValueAr"),
    formNameLabelEn: getValue(formData, "formNameLabelEn"),
    formNameLabelAr: getValue(formData, "formNameLabelAr"),
    formEmailLabelEn: getValue(formData, "formEmailLabelEn"),
    formEmailLabelAr: getValue(formData, "formEmailLabelAr"),
    formSubjectLabelEn: getValue(formData, "formSubjectLabelEn"),
    formSubjectLabelAr: getValue(formData, "formSubjectLabelAr"),
    formMessageLabelEn: getValue(formData, "formMessageLabelEn"),
    formMessageLabelAr: getValue(formData, "formMessageLabelAr"),
    formSubmitLabelEn: getValue(formData, "formSubmitLabelEn"),
    formSubmitLabelAr: getValue(formData, "formSubmitLabelAr"),
  };

  await db.contactSettings.upsert({
    where: { id: "contact-settings" },
    update: payload,
    create: {
      id: "contact-settings",
      ...payload,
    },
  });

  revalidatePublicSite();
  revalidatePath("/admin/settings/contact");
}

async function updateAdminPassword(formData: FormData) {
  const user = await requireAdminUser();
  const currentPassword = getValue(formData, "currentPassword");
  const newPassword = getValue(formData, "newPassword");
  const confirmPassword = getValue(formData, "confirmPassword");

  if (!(await compare(currentPassword, user.passwordHash))) {
    throw new Error("Current password is incorrect.");
  }

  if (newPassword.length < 8) {
    throw new Error("New password must be at least 8 characters.");
  }

  if (newPassword !== confirmPassword) {
    throw new Error("New password and confirmation do not match.");
  }

  if (await compare(newPassword, user.passwordHash)) {
    throw new Error("New password must be different from the current password.");
  }

  await db.adminUser.update({
    where: { id: user.id },
    data: {
      passwordHash: await hash(newPassword, 12),
    },
  });

  revalidatePath("/admin/settings/security");
}

export async function changeAdminPassword(formData: FormData) {
  await updateAdminPassword(formData);
  redirect("/admin/settings/security?success=1");
}

export async function saveProgramFormAction(
  _previousState: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  try {
    await saveProgram(formData);
    return successState();
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return errorState(error instanceof Error ? error.message : undefined);
  }
}

export async function deleteProgramFormAction(
  _previousState: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  try {
    await deleteProgram(formData);
    return successState("Item deleted successfully.", "The website has been updated.");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return errorState(error instanceof Error ? error.message : undefined);
  }
}

export async function saveProjectFormAction(
  _previousState: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  try {
    await saveProject(formData);
    return successState();
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return errorState(error instanceof Error ? error.message : undefined);
  }
}

export async function deleteProjectFormAction(
  _previousState: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  try {
    await deleteProject(formData);
    return successState("Item deleted successfully.", "The website has been updated.");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return errorState(error instanceof Error ? error.message : undefined);
  }
}

export async function saveEventFormAction(
  _previousState: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  try {
    await saveEvent(formData);
    return successState();
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return errorState(error instanceof Error ? error.message : undefined);
  }
}

export async function deleteEventFormAction(
  _previousState: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  try {
    await deleteEvent(formData);
    return successState("Item deleted successfully.", "The website has been updated.");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return errorState(error instanceof Error ? error.message : undefined);
  }
}

export async function saveSiteSettingsFormAction(
  _previousState: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  try {
    await saveSiteSettings(formData);
    return successState();
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return errorState(error instanceof Error ? error.message : undefined);
  }
}

export async function saveHomePageFormAction(
  _previousState: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  try {
    await saveHomePage(formData);
    return successState();
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return errorState(error instanceof Error ? error.message : undefined);
  }
}

export async function savePageContentFormAction(
  _previousState: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  try {
    await savePageContent(formData);
    return successState();
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return errorState(error instanceof Error ? error.message : undefined);
  }
}

export async function saveDonationSettingsFormAction(
  _previousState: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  try {
    await saveDonationSettings(formData);
    return successState();
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return errorState(error instanceof Error ? error.message : undefined);
  }
}

export async function saveContactSettingsFormAction(
  _previousState: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  try {
    await saveContactSettings(formData);
    return successState();
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return errorState(error instanceof Error ? error.message : undefined);
  }
}

export async function changeAdminPasswordFormAction(
  _previousState: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  try {
    await updateAdminPassword(formData);
    return successState("Password updated successfully.", "Your new password is now active.");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return errorState(error instanceof Error ? error.message : undefined);
  }
}
