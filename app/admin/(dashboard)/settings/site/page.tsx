import { saveSiteSettingsFormAction } from "@/app/admin/actions";
import { AdminActionForm } from "@/components/admin/admin-action-form";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { FieldGroup } from "@/components/admin/form-primitives";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { siteContent } from "@/data/site-content";
import { resolveAdminLanguage } from "@/lib/admin-language";
import { db } from "@/lib/db";

export default async function SiteSettingsAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const params = await searchParams;
  const lang = resolveAdminLanguage(params.lang);
  const settings = await db.siteSettings.findUnique({
    where: { id: "site-settings" },
  });

  const fallbackEn = siteContent.en;
  const fallbackAr = siteContent.ar;

  return (
    <div className="space-y-6 py-2">
      <AdminPageHeader
        lang={lang}
        eyebrow="Settings"
        eyebrowAr="الإعدادات"
        title="Branding & Logo"
        titleAr="الهوية العامة والشعار"
        description="Manage global labels used by the navigation, footer, and social links."
        descriptionAr="إدارة النصوص العامة المستخدمة في التنقل والتذييل وروابط التواصل."
        context={{
          text: "These settings appear in the navbar, footer, and shared site branding.",
          textAr: "تظهر هذه الإعدادات في شريط التنقل والتذييل وهوية الموقع العامة.",
          href: "/en",
          linkLabelAr: "عرض الصفحة",
        }}
      />

      <AdminActionForm
        action={saveSiteSettingsFormAction}
        lang={lang}
        title="Global content"
        titleAr="المحتوى العام"
        description="Update site-wide labels without touching the public design."
        descriptionAr="حدّث النصوص العامة في الموقع دون المساس بالتصميم العام."
        pendingLabel="Saving..."
      >
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
                ["navDonateEn", "Nav: Donate (EN)", settings?.navDonateEn ?? fallbackEn.nav[3].label],
                ["navDonateAr", "Nav: Donate (AR)", settings?.navDonateAr ?? fallbackAr.nav[3].label],
                ["navContactEn", "Nav: Contact (EN)", settings?.navContactEn ?? fallbackEn.nav[4].label],
                ["navContactAr", "Nav: Contact (AR)", settings?.navContactAr ?? fallbackAr.nav[4].label],
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
      </AdminActionForm>
    </div>
  );
}
