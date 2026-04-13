import { saveHomePage } from "@/app/admin/actions";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { FieldGroup, NativeFileInput } from "@/components/admin/form-primitives";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { siteContent } from "@/data/site-content";
import { db } from "@/lib/db";

function joinList(items: string[]) {
  return items.join("\n");
}

function joinGoals(items: Array<{ title: string; description: string }>) {
  return items.map((item) => `${item.title}::${item.description}`).join("\n");
}

export default async function HomeSettingsAdminPage() {
  const home = await db.homePage.findUnique({
    where: { id: "home-page" },
  });

  const en = siteContent.en.home;
  const ar = siteContent.ar.home;
  const coreValuesEn = home?.coreValuesItemsEn ?? joinList(en.coreValues.items);
  const coreValuesAr = home?.coreValuesItemsAr ?? joinList(ar.coreValues.items);
  const strategicGoalsEn =
    home?.strategicGoalsItemsEn ?? joinGoals(en.strategicGoals.items);
  const strategicGoalsAr =
    home?.strategicGoalsItemsAr ?? joinGoals(ar.strategicGoals.items);
  const busFeaturesEn = home?.busFeaturesItemsEn ?? joinList(en.busFeatures.items);
  const busFeaturesAr = home?.busFeaturesItemsAr ?? joinList(ar.busFeatures.items);
  const libraryServicesEn =
    home?.libraryServicesItemsEn ?? joinList(en.libraryServices.items);
  const libraryServicesAr =
    home?.libraryServicesItemsAr ?? joinList(ar.libraryServices.items);
  const targetAudienceEn =
    home?.targetAudienceItemsEn ?? joinList(en.targetAudience.items);
  const targetAudienceAr =
    home?.targetAudienceItemsAr ?? joinList(ar.targetAudience.items);
  const operationsEn = home?.operationsItemsEn ?? joinList(en.operations.items);
  const operationsAr = home?.operationsItemsAr ?? joinList(ar.operations.items);
  const partnershipsEn =
    home?.partnershipsItemsEn ?? joinList(en.partnerships.items);
  const partnershipsAr =
    home?.partnershipsItemsAr ?? joinList(ar.partnerships.items);

  return (
    <div className="space-y-6 py-2">
      <AdminPageHeader
        eyebrow="Settings"
        title="Homepage content"
        description="Edit the hero, mission cards, impact stats, and section copy that powers the public homepage."
      />

      <form action={saveHomePage} className="rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_25px_70px_-55px_rgba(15,23,42,0.3)]">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950">
              Homepage editor
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Keep the layout unchanged while updating all homepage copy from the database.
            </p>
          </div>
          <button
            type="submit"
            className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
          >
            Save
          </button>
        </div>

        <div className="grid gap-5">
          <FieldGroup title="Hero">
            <input type="hidden" name="existingHeroImageUrl" defaultValue={home?.heroImageUrl ?? en.hero.image} />
            <div className="grid gap-4 md:grid-cols-2">
              {[
                ["heroEyebrowEn", "Eyebrow (EN)", home?.heroEyebrowEn ?? en.hero.eyebrow],
                ["heroEyebrowAr", "Eyebrow (AR)", home?.heroEyebrowAr ?? ar.hero.eyebrow],
                ["heroTitleEn", "Title (EN)", home?.heroTitleEn ?? en.hero.title],
                ["heroTitleAr", "Title (AR)", home?.heroTitleAr ?? ar.hero.title],
                ["heroPrimaryActionEn", "Primary button (EN)", home?.heroPrimaryActionEn ?? en.hero.primaryAction],
                ["heroPrimaryActionAr", "Primary button (AR)", home?.heroPrimaryActionAr ?? ar.hero.primaryAction],
                ["heroSecondaryActionEn", "Secondary button (EN)", home?.heroSecondaryActionEn ?? en.hero.secondaryAction],
                ["heroSecondaryActionAr", "Secondary button (AR)", home?.heroSecondaryActionAr ?? ar.hero.secondaryAction],
                ["heroImageAltEn", "Image alt (EN)", home?.heroImageAltEn ?? en.hero.imageAlt],
                ["heroImageAltAr", "Image alt (AR)", home?.heroImageAltAr ?? ar.hero.imageAlt],
                ["floatingCardTitleEn", "Floating card title (EN)", home?.floatingCardTitleEn ?? en.hero.floatingCard.title],
                ["floatingCardTitleAr", "Floating card title (AR)", home?.floatingCardTitleAr ?? ar.hero.floatingCard.title],
              ].map(([name, label, value]) => (
                <div key={name}>
                  <label className="mb-2 block text-sm font-medium text-slate-700">{label}</label>
                  <Input
                    name={name}
                    defaultValue={String(value)}
                    className="h-11 rounded-2xl bg-white px-4"
                    dir={String(name).endsWith("Ar") ? "rtl" : "ltr"}
                  />
                </div>
              ))}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">Description (EN)</label>
                <Textarea name="heroDescriptionEn" defaultValue={home?.heroDescriptionEn ?? en.hero.description} className="min-h-28 rounded-2xl bg-white px-4 py-3" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">Description (AR)</label>
                <Textarea name="heroDescriptionAr" defaultValue={home?.heroDescriptionAr ?? ar.hero.description} className="min-h-28 rounded-2xl bg-white px-4 py-3" dir="rtl" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">Floating card description (EN)</label>
                <Textarea name="floatingCardDescriptionEn" defaultValue={home?.floatingCardDescriptionEn ?? en.hero.floatingCard.description} className="min-h-24 rounded-2xl bg-white px-4 py-3" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">Floating card description (AR)</label>
                <Textarea name="floatingCardDescriptionAr" defaultValue={home?.floatingCardDescriptionAr ?? ar.hero.floatingCard.description} className="min-h-24 rounded-2xl bg-white px-4 py-3" dir="rtl" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">Hero image</label>
                <NativeFileInput name="heroImage" />
              </div>
            </div>
          </FieldGroup>

          <FieldGroup title="About section">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Title (EN)</label>
                <Input name="aboutTitleEn" defaultValue={home?.aboutTitleEn ?? en.about.title} className="h-11 rounded-2xl bg-white px-4" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Title (AR)</label>
                <Input name="aboutTitleAr" defaultValue={home?.aboutTitleAr ?? ar.about.title} className="h-11 rounded-2xl bg-white px-4" dir="rtl" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">Description (EN)</label>
                <Textarea name="aboutDescriptionEn" defaultValue={home?.aboutDescriptionEn ?? en.about.description} className="min-h-28 rounded-2xl bg-white px-4 py-3" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">Description (AR)</label>
                <Textarea name="aboutDescriptionAr" defaultValue={home?.aboutDescriptionAr ?? ar.about.description} className="min-h-28 rounded-2xl bg-white px-4 py-3" dir="rtl" />
              </div>
            </div>
          </FieldGroup>

          <FieldGroup title="Mission cards">
            <div className="grid gap-5 md:grid-cols-3">
              {[
                {
                  prefix: "mission",
                  enCard: en.missionCards[0]!,
                  arCard: ar.missionCards[0]!,
                  titleEn: home?.missionTitleEn,
                  titleAr: home?.missionTitleAr,
                  descEn: home?.missionDescriptionEn,
                  descAr: home?.missionDescriptionAr,
                },
                {
                  prefix: "vision",
                  enCard: en.missionCards[1]!,
                  arCard: ar.missionCards[1]!,
                  titleEn: home?.visionTitleEn,
                  titleAr: home?.visionTitleAr,
                  descEn: home?.visionDescriptionEn,
                  descAr: home?.visionDescriptionAr,
                },
                {
                  prefix: "values",
                  enCard: en.missionCards[2]!,
                  arCard: ar.missionCards[2]!,
                  titleEn: home?.valuesTitleEn,
                  titleAr: home?.valuesTitleAr,
                  descEn: home?.valuesDescriptionEn,
                  descAr: home?.valuesDescriptionAr,
                },
              ].map((card) => (
                <div key={card.prefix} className="rounded-[1.5rem] border border-slate-200 bg-white p-4">
                  <p className="mb-4 text-sm font-semibold capitalize text-slate-900">{card.prefix}</p>
                  <div className="space-y-3">
                    <Input name={`${card.prefix}TitleEn`} defaultValue={String(card.titleEn ?? card.enCard.title)} className="h-11 rounded-2xl bg-slate-50 px-4" />
                    <Input name={`${card.prefix}TitleAr`} defaultValue={String(card.titleAr ?? card.arCard.title)} className="h-11 rounded-2xl bg-slate-50 px-4" dir="rtl" />
                    <Textarea name={`${card.prefix}DescriptionEn`} defaultValue={String(card.descEn ?? card.enCard.description)} className="min-h-24 rounded-2xl bg-slate-50 px-4 py-3" />
                    <Textarea name={`${card.prefix}DescriptionAr`} defaultValue={String(card.descAr ?? card.arCard.description)} className="min-h-24 rounded-2xl bg-slate-50 px-4 py-3" dir="rtl" />
                  </div>
                </div>
              ))}
            </div>
          </FieldGroup>

          <FieldGroup title="Core values">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Section title (EN)</label>
                <Input name="coreValuesTitleEn" defaultValue={home?.coreValuesTitleEn ?? en.coreValues.title} className="h-11 rounded-2xl bg-white px-4" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Section title (AR)</label>
                <Input name="coreValuesTitleAr" defaultValue={home?.coreValuesTitleAr ?? ar.coreValues.title} className="h-11 rounded-2xl bg-white px-4" dir="rtl" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">Description (EN)</label>
                <Textarea name="coreValuesDescriptionEn" defaultValue={home?.coreValuesDescriptionEn ?? en.coreValues.description} className="min-h-24 rounded-2xl bg-white px-4 py-3" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">Description (AR)</label>
                <Textarea name="coreValuesDescriptionAr" defaultValue={home?.coreValuesDescriptionAr ?? ar.coreValues.description} className="min-h-24 rounded-2xl bg-white px-4 py-3" dir="rtl" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Items (EN, one per line)</label>
                <Textarea name="coreValuesItemsEn" defaultValue={coreValuesEn} className="min-h-32 rounded-2xl bg-white px-4 py-3" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Items (AR, one per line)</label>
                <Textarea name="coreValuesItemsAr" defaultValue={coreValuesAr} className="min-h-32 rounded-2xl bg-white px-4 py-3" dir="rtl" />
              </div>
            </div>
          </FieldGroup>

          <FieldGroup title="How it works">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Section title (EN)</label>
                <Input name="howItWorksTitleEn" defaultValue={home?.howItWorksTitleEn ?? en.howItWorks.title} className="h-11 rounded-2xl bg-white px-4" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Section title (AR)</label>
                <Input name="howItWorksTitleAr" defaultValue={home?.howItWorksTitleAr ?? ar.howItWorks.title} className="h-11 rounded-2xl bg-white px-4" dir="rtl" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">Section description (EN)</label>
                <Textarea name="howItWorksDescriptionEn" defaultValue={home?.howItWorksDescriptionEn ?? en.howItWorks.description} className="min-h-24 rounded-2xl bg-white px-4 py-3" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">Section description (AR)</label>
                <Textarea name="howItWorksDescriptionAr" defaultValue={home?.howItWorksDescriptionAr ?? ar.howItWorks.description} className="min-h-24 rounded-2xl bg-white px-4 py-3" dir="rtl" />
              </div>
            </div>
            <div className="mt-4 grid gap-5 md:grid-cols-3">
              {[
                {
                  prefix: "stepOne",
                  enStep: en.howItWorks.steps[0]!,
                  arStep: ar.howItWorks.steps[0]!,
                  titleEn: home?.stepOneTitleEn,
                  titleAr: home?.stepOneTitleAr,
                  descEn: home?.stepOneDescriptionEn,
                  descAr: home?.stepOneDescriptionAr,
                },
                {
                  prefix: "stepTwo",
                  enStep: en.howItWorks.steps[1]!,
                  arStep: ar.howItWorks.steps[1]!,
                  titleEn: home?.stepTwoTitleEn,
                  titleAr: home?.stepTwoTitleAr,
                  descEn: home?.stepTwoDescriptionEn,
                  descAr: home?.stepTwoDescriptionAr,
                },
                {
                  prefix: "stepThree",
                  enStep: en.howItWorks.steps[2]!,
                  arStep: ar.howItWorks.steps[2]!,
                  titleEn: home?.stepThreeTitleEn,
                  titleAr: home?.stepThreeTitleAr,
                  descEn: home?.stepThreeDescriptionEn,
                  descAr: home?.stepThreeDescriptionAr,
                },
              ].map((step) => (
                <div key={step.prefix} className="rounded-[1.5rem] border border-slate-200 bg-white p-4">
                  <div className="space-y-3">
                    <Input name={`${step.prefix}TitleEn`} defaultValue={String(step.titleEn ?? step.enStep.title)} className="h-11 rounded-2xl bg-slate-50 px-4" />
                    <Input name={`${step.prefix}TitleAr`} defaultValue={String(step.titleAr ?? step.arStep.title)} className="h-11 rounded-2xl bg-slate-50 px-4" dir="rtl" />
                    <Textarea name={`${step.prefix}DescriptionEn`} defaultValue={String(step.descEn ?? step.enStep.description)} className="min-h-24 rounded-2xl bg-slate-50 px-4 py-3" />
                    <Textarea name={`${step.prefix}DescriptionAr`} defaultValue={String(step.descAr ?? step.arStep.description)} className="min-h-24 rounded-2xl bg-slate-50 px-4 py-3" dir="rtl" />
                  </div>
                </div>
              ))}
            </div>
          </FieldGroup>

          <FieldGroup title="Section intros">
            <div className="grid gap-5 md:grid-cols-4">
              {[
                ["programs", "Programs", home?.programsTitleEn ?? en.programs.title, home?.programsTitleAr ?? ar.programs.title, home?.programsDescriptionEn ?? en.programs.description, home?.programsDescriptionAr ?? ar.programs.description],
                ["libraryServices", "Library services", home?.libraryServicesTitleEn ?? en.libraryServices.title, home?.libraryServicesTitleAr ?? ar.libraryServices.title, home?.libraryServicesDescriptionEn ?? en.libraryServices.description, home?.libraryServicesDescriptionAr ?? ar.libraryServices.description],
                ["projects", "Projects", home?.projectsTitleEn ?? en.projects.title, home?.projectsTitleAr ?? ar.projects.title, home?.projectsDescriptionEn ?? en.projects.description, home?.projectsDescriptionAr ?? ar.projects.description],
                ["events", "Events", home?.eventsTitleEn ?? en.events.title, home?.eventsTitleAr ?? ar.events.title, home?.eventsDescriptionEn ?? en.events.description, home?.eventsDescriptionAr ?? ar.events.description],
              ].map(([prefix, title, titleEn, titleAr, descEn, descAr]) => (
                <div key={String(prefix)} className="rounded-[1.5rem] border border-slate-200 bg-white p-4">
                  <p className="mb-3 text-sm font-semibold text-slate-900">{String(title)}</p>
                  <div className="space-y-3">
                    <Input name={`${prefix}TitleEn`} defaultValue={String(titleEn)} className="h-11 rounded-2xl bg-slate-50 px-4" />
                    <Input name={`${prefix}TitleAr`} defaultValue={String(titleAr)} className="h-11 rounded-2xl bg-slate-50 px-4" dir="rtl" />
                    <Textarea name={`${prefix}DescriptionEn`} defaultValue={String(descEn)} className="min-h-24 rounded-2xl bg-slate-50 px-4 py-3" />
                    <Textarea name={`${prefix}DescriptionAr`} defaultValue={String(descAr)} className="min-h-24 rounded-2xl bg-slate-50 px-4 py-3" dir="rtl" />
                  </div>
                </div>
              ))}
            </div>
          </FieldGroup>

          <FieldGroup title="Library services list">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Items (EN, one per line)</label>
                <Textarea name="libraryServicesItemsEn" defaultValue={libraryServicesEn} className="min-h-32 rounded-2xl bg-white px-4 py-3" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Items (AR, one per line)</label>
                <Textarea name="libraryServicesItemsAr" defaultValue={libraryServicesAr} className="min-h-32 rounded-2xl bg-white px-4 py-3" dir="rtl" />
              </div>
            </div>
          </FieldGroup>

          <FieldGroup title="Strategic goals">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Section title (EN)</label>
                <Input name="strategicGoalsTitleEn" defaultValue={home?.strategicGoalsTitleEn ?? en.strategicGoals.title} className="h-11 rounded-2xl bg-white px-4" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Section title (AR)</label>
                <Input name="strategicGoalsTitleAr" defaultValue={home?.strategicGoalsTitleAr ?? ar.strategicGoals.title} className="h-11 rounded-2xl bg-white px-4" dir="rtl" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">Description (EN)</label>
                <Textarea name="strategicGoalsDescriptionEn" defaultValue={home?.strategicGoalsDescriptionEn ?? en.strategicGoals.description} className="min-h-24 rounded-2xl bg-white px-4 py-3" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">Description (AR)</label>
                <Textarea name="strategicGoalsDescriptionAr" defaultValue={home?.strategicGoalsDescriptionAr ?? ar.strategicGoals.description} className="min-h-24 rounded-2xl bg-white px-4 py-3" dir="rtl" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Goals (EN, one per line as `Title::Description`)</label>
                <Textarea name="strategicGoalsItemsEn" defaultValue={strategicGoalsEn} className="min-h-40 rounded-2xl bg-white px-4 py-3" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Goals (AR, one per line as `العنوان::الوصف`)</label>
                <Textarea name="strategicGoalsItemsAr" defaultValue={strategicGoalsAr} className="min-h-40 rounded-2xl bg-white px-4 py-3" dir="rtl" />
              </div>
            </div>
          </FieldGroup>

          <FieldGroup title="Audience, bus, operations, and partnerships">
            <div className="grid gap-5 lg:grid-cols-2">
              {[
                {
                  key: "busFeatures",
                  title: "Bus features",
                  titleEn: home?.busFeaturesTitleEn ?? en.busFeatures.title,
                  titleAr: home?.busFeaturesTitleAr ?? ar.busFeatures.title,
                  descriptionEn: home?.busFeaturesDescriptionEn ?? en.busFeatures.description,
                  descriptionAr: home?.busFeaturesDescriptionAr ?? ar.busFeatures.description,
                  itemsEn: busFeaturesEn,
                  itemsAr: busFeaturesAr,
                },
                {
                  key: "targetAudience",
                  title: "Target audience",
                  titleEn: home?.targetAudienceTitleEn ?? en.targetAudience.title,
                  titleAr: home?.targetAudienceTitleAr ?? ar.targetAudience.title,
                  descriptionEn: home?.targetAudienceDescriptionEn ?? en.targetAudience.description,
                  descriptionAr: home?.targetAudienceDescriptionAr ?? ar.targetAudience.description,
                  itemsEn: targetAudienceEn,
                  itemsAr: targetAudienceAr,
                },
                {
                  key: "operations",
                  title: "Operations",
                  titleEn: home?.operationsTitleEn ?? en.operations.title,
                  titleAr: home?.operationsTitleAr ?? ar.operations.title,
                  descriptionEn: home?.operationsDescriptionEn ?? en.operations.description,
                  descriptionAr: home?.operationsDescriptionAr ?? ar.operations.description,
                  itemsEn: operationsEn,
                  itemsAr: operationsAr,
                },
                {
                  key: "partnerships",
                  title: "Partnerships",
                  titleEn: home?.partnershipsTitleEn ?? en.partnerships.title,
                  titleAr: home?.partnershipsTitleAr ?? ar.partnerships.title,
                  descriptionEn: home?.partnershipsDescriptionEn ?? en.partnerships.description,
                  descriptionAr: home?.partnershipsDescriptionAr ?? ar.partnerships.description,
                  itemsEn: partnershipsEn,
                  itemsAr: partnershipsAr,
                },
              ].map((section) => (
                <div key={section.key} className="rounded-[1.5rem] border border-slate-200 bg-white p-4">
                  <p className="mb-4 text-sm font-semibold text-slate-900">{section.title}</p>
                  <div className="space-y-3">
                    <Input name={`${section.key}TitleEn`} defaultValue={section.titleEn} className="h-11 rounded-2xl bg-slate-50 px-4" />
                    <Input name={`${section.key}TitleAr`} defaultValue={section.titleAr} className="h-11 rounded-2xl bg-slate-50 px-4" dir="rtl" />
                    <Textarea name={`${section.key}DescriptionEn`} defaultValue={section.descriptionEn} className="min-h-24 rounded-2xl bg-slate-50 px-4 py-3" />
                    <Textarea name={`${section.key}DescriptionAr`} defaultValue={section.descriptionAr} className="min-h-24 rounded-2xl bg-slate-50 px-4 py-3" dir="rtl" />
                    <Textarea name={`${section.key}ItemsEn`} defaultValue={section.itemsEn} className="min-h-28 rounded-2xl bg-slate-50 px-4 py-3" />
                    <Textarea name={`${section.key}ItemsAr`} defaultValue={section.itemsAr} className="min-h-28 rounded-2xl bg-slate-50 px-4 py-3" dir="rtl" />
                  </div>
                </div>
              ))}
            </div>
          </FieldGroup>

          <FieldGroup title="Impact and donation CTA">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Impact title (EN)</label>
                <Input name="impactTitleEn" defaultValue={home?.impactTitleEn ?? en.impact.title} className="h-11 rounded-2xl bg-white px-4" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Impact title (AR)</label>
                <Input name="impactTitleAr" defaultValue={home?.impactTitleAr ?? ar.impact.title} className="h-11 rounded-2xl bg-white px-4" dir="rtl" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">Impact description (EN)</label>
                <Textarea name="impactDescriptionEn" defaultValue={home?.impactDescriptionEn ?? en.impact.description} className="min-h-24 rounded-2xl bg-white px-4 py-3" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">Impact description (AR)</label>
                <Textarea name="impactDescriptionAr" defaultValue={home?.impactDescriptionAr ?? ar.impact.description} className="min-h-24 rounded-2xl bg-white px-4 py-3" dir="rtl" />
              </div>
              {[
                {
                  prefix: "statOne",
                  enStat: en.impact.stats[0]!,
                  arStat: ar.impact.stats[0]!,
                  labelEn: home?.statOneLabelEn,
                  labelAr: home?.statOneLabelAr,
                  value: home?.statOneValue,
                },
                {
                  prefix: "statTwo",
                  enStat: en.impact.stats[1]!,
                  arStat: ar.impact.stats[1]!,
                  labelEn: home?.statTwoLabelEn,
                  labelAr: home?.statTwoLabelAr,
                  value: home?.statTwoValue,
                },
                {
                  prefix: "statThree",
                  enStat: en.impact.stats[2]!,
                  arStat: ar.impact.stats[2]!,
                  labelEn: home?.statThreeLabelEn,
                  labelAr: home?.statThreeLabelAr,
                  value: home?.statThreeValue,
                },
                {
                  prefix: "statFour",
                  enStat: en.impact.stats[3]!,
                  arStat: ar.impact.stats[3]!,
                  labelEn: home?.statFourLabelEn,
                  labelAr: home?.statFourLabelAr,
                  value: home?.statFourValue,
                },
              ].map((stat) => (
                <div key={stat.prefix} className="rounded-[1.5rem] border border-slate-200 bg-white p-4">
                  <div className="space-y-3">
                    <Input name={`${stat.prefix}LabelEn`} defaultValue={String(stat.labelEn ?? stat.enStat.label)} className="h-11 rounded-2xl bg-slate-50 px-4" />
                    <Input name={`${stat.prefix}LabelAr`} defaultValue={String(stat.labelAr ?? stat.arStat.label)} className="h-11 rounded-2xl bg-slate-50 px-4" dir="rtl" />
                    <Input name={`${stat.prefix}Value`} defaultValue={String(stat.value ?? stat.enStat.value)} className="h-11 rounded-2xl bg-slate-50 px-4" />
                  </div>
                </div>
              ))}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Donation CTA title (EN)</label>
                <Input name="donationCtaTitleEn" defaultValue={home?.donationCtaTitleEn ?? en.donateCta.title} className="h-11 rounded-2xl bg-white px-4" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Donation CTA title (AR)</label>
                <Input name="donationCtaTitleAr" defaultValue={home?.donationCtaTitleAr ?? ar.donateCta.title} className="h-11 rounded-2xl bg-white px-4" dir="rtl" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">Donation CTA description (EN)</label>
                <Textarea name="donationCtaDescriptionEn" defaultValue={home?.donationCtaDescriptionEn ?? en.donateCta.description} className="min-h-24 rounded-2xl bg-white px-4 py-3" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">Donation CTA description (AR)</label>
                <Textarea name="donationCtaDescriptionAr" defaultValue={home?.donationCtaDescriptionAr ?? ar.donateCta.description} className="min-h-24 rounded-2xl bg-white px-4 py-3" dir="rtl" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Donation CTA button (EN)</label>
                <Input name="donationCtaButtonLabelEn" defaultValue={home?.donationCtaButtonLabelEn ?? en.donateCta.button} className="h-11 rounded-2xl bg-white px-4" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Donation CTA button (AR)</label>
                <Input name="donationCtaButtonLabelAr" defaultValue={home?.donationCtaButtonLabelAr ?? ar.donateCta.button} className="h-11 rounded-2xl bg-white px-4" dir="rtl" />
              </div>
            </div>
          </FieldGroup>

          <FieldGroup title="Final message">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Title (EN)</label>
                <Input name="finalMessageTitleEn" defaultValue={home?.finalMessageTitleEn ?? en.finalMessage.title} className="h-11 rounded-2xl bg-white px-4" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Title (AR)</label>
                <Input name="finalMessageTitleAr" defaultValue={home?.finalMessageTitleAr ?? ar.finalMessage.title} className="h-11 rounded-2xl bg-white px-4" dir="rtl" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">Message (EN)</label>
                <Textarea name="finalMessageDescriptionEn" defaultValue={home?.finalMessageDescriptionEn ?? en.finalMessage.description} className="min-h-24 rounded-2xl bg-white px-4 py-3" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">Message (AR)</label>
                <Textarea name="finalMessageDescriptionAr" defaultValue={home?.finalMessageDescriptionAr ?? ar.finalMessage.description} className="min-h-24 rounded-2xl bg-white px-4 py-3" dir="rtl" />
              </div>
            </div>
          </FieldGroup>
        </div>
      </form>
    </div>
  );
}
