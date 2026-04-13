import { saveSiteSettings } from "@/app/admin/actions";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { FieldGroup } from "@/components/admin/form-primitives";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { siteContent } from "@/data/site-content";
import { db } from "@/lib/db";

export default async function SiteSettingsAdminPage() {
  const settings = await db.siteSettings.findUnique({
    where: { id: "site-settings" },
  });

  const fallbackEn = siteContent.en;
  const fallbackAr = siteContent.ar;

  return (
    <div className="space-y-6 py-2">
      <AdminPageHeader
        eyebrow="Settings"
        title="Site settings"
        description="Manage global labels used by the navbar, footer, and social links."
      />

      <form action={saveSiteSettings} className="rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_25px_70px_-55px_rgba(15,23,42,0.3)]">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950">
              Global content
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Update site-wide labels without touching the public design.
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
          <FieldGroup title="Project name">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">English</label>
                <Input name="projectNameEn" defaultValue={settings?.projectNameEn ?? fallbackEn.siteName} className="h-11 rounded-2xl bg-white px-4" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Arabic</label>
                <Input name="projectNameAr" defaultValue={settings?.projectNameAr ?? fallbackAr.siteName} className="h-11 rounded-2xl bg-white px-4" dir="rtl" />
              </div>
            </div>
          </FieldGroup>

          <FieldGroup title="Navigation labels">
            <div className="grid gap-4 md:grid-cols-2">
              {[
                ["navHomeEn", "Nav: Home (EN)", settings?.navHomeEn ?? fallbackEn.nav[0].label],
                ["navHomeAr", "Nav: Home (AR)", settings?.navHomeAr ?? fallbackAr.nav[0].label],
                ["navAboutEn", "Nav: About (EN)", settings?.navAboutEn ?? fallbackEn.nav[1].label],
                ["navAboutAr", "Nav: About (AR)", settings?.navAboutAr ?? fallbackAr.nav[1].label],
                ["navProgramsEn", "Nav: Programs (EN)", settings?.navProgramsEn ?? fallbackEn.nav[2].label],
                ["navProgramsAr", "Nav: Programs (AR)", settings?.navProgramsAr ?? fallbackAr.nav[2].label],
                ["navProjectsEn", "Nav: Projects (EN)", settings?.navProjectsEn ?? fallbackEn.nav[3].label],
                ["navProjectsAr", "Nav: Projects (AR)", settings?.navProjectsAr ?? fallbackAr.nav[3].label],
                ["navEventsEn", "Nav: Events (EN)", settings?.navEventsEn ?? fallbackEn.nav[4].label],
                ["navEventsAr", "Nav: Events (AR)", settings?.navEventsAr ?? fallbackAr.nav[4].label],
                ["navDonateEn", "Nav: Donate (EN)", settings?.navDonateEn ?? fallbackEn.nav[5].label],
                ["navDonateAr", "Nav: Donate (AR)", settings?.navDonateAr ?? fallbackAr.nav[5].label],
                ["navContactEn", "Nav: Contact (EN)", settings?.navContactEn ?? fallbackEn.nav[6].label],
                ["navContactAr", "Nav: Contact (AR)", settings?.navContactAr ?? fallbackAr.nav[6].label],
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
            </div>
          </FieldGroup>

          <FieldGroup title="Footer content">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">Description (EN)</label>
                <Textarea name="footerDescriptionEn" defaultValue={settings?.footerDescriptionEn ?? fallbackEn.footer.description} className="min-h-28 rounded-2xl bg-white px-4 py-3" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">Description (AR)</label>
                <Textarea name="footerDescriptionAr" defaultValue={settings?.footerDescriptionAr ?? fallbackAr.footer.description} className="min-h-28 rounded-2xl bg-white px-4 py-3" dir="rtl" />
              </div>
              {[
                ["footerContactLabelEn", "Contact label (EN)", settings?.footerContactLabelEn ?? fallbackEn.footer.contactLabel],
                ["footerContactLabelAr", "Contact label (AR)", settings?.footerContactLabelAr ?? fallbackAr.footer.contactLabel],
                ["footerSocialLabelEn", "Social label (EN)", settings?.footerSocialLabelEn ?? fallbackEn.footer.socialLabel],
                ["footerSocialLabelAr", "Social label (AR)", settings?.footerSocialLabelAr ?? fallbackAr.footer.socialLabel],
                ["footerDonateLabelEn", "Donate label (EN)", settings?.footerDonateLabelEn ?? fallbackEn.footer.donateLabel],
                ["footerDonateLabelAr", "Donate label (AR)", settings?.footerDonateLabelAr ?? fallbackAr.footer.donateLabel],
                ["footerRightsEn", "Rights text (EN)", settings?.footerRightsEn ?? fallbackEn.footer.rights],
                ["footerRightsAr", "Rights text (AR)", settings?.footerRightsAr ?? fallbackAr.footer.rights],
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
            </div>
          </FieldGroup>

          <FieldGroup title="Direct links">
            <div className="grid gap-4 md:grid-cols-3">
              {[
                ["socialOneLabelEn", "Link 1 label (EN)", settings?.socialOneLabelEn ?? fallbackEn.footer.socialLinks[0].label],
                ["socialOneLabelAr", "Link 1 label (AR)", settings?.socialOneLabelAr ?? fallbackAr.footer.socialLinks[0].label],
                ["socialOneUrl", "Link 1 URL", settings?.socialOneUrl ?? fallbackEn.footer.socialLinks[0].href],
                ["socialTwoLabelEn", "Link 2 label (EN)", settings?.socialTwoLabelEn ?? fallbackEn.footer.socialLinks[1].label],
                ["socialTwoLabelAr", "Link 2 label (AR)", settings?.socialTwoLabelAr ?? fallbackAr.footer.socialLinks[1].label],
                ["socialTwoUrl", "Link 2 URL", settings?.socialTwoUrl ?? fallbackEn.footer.socialLinks[1].href],
                ["socialThreeLabelEn", "Link 3 label (EN)", settings?.socialThreeLabelEn ?? fallbackEn.footer.socialLinks[2].label],
                ["socialThreeLabelAr", "Link 3 label (AR)", settings?.socialThreeLabelAr ?? fallbackAr.footer.socialLinks[2].label],
                ["socialThreeUrl", "Link 3 URL", settings?.socialThreeUrl ?? fallbackEn.footer.socialLinks[2].href],
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
            </div>
          </FieldGroup>
        </div>
      </form>
    </div>
  );
}
