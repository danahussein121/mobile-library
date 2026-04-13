import { saveContactSettings } from "@/app/admin/actions";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { FieldGroup } from "@/components/admin/form-primitives";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { siteContent } from "@/data/site-content";
import { db } from "@/lib/db";

export default async function ContactSettingsAdminPage() {
  const settings = await db.contactSettings.findUnique({
    where: { id: "contact-settings" },
  });

  const en = siteContent.en.contact;
  const ar = siteContent.ar.contact;

  return (
    <div className="space-y-6 py-2">
      <AdminPageHeader
        eyebrow="Settings"
        title="Contact information"
        description="Manage the public email, phone, website, and contact form labels."
      />

      <form action={saveContactSettings} className="rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_25px_70px_-55px_rgba(15,23,42,0.3)]">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950">
              Contact editor
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Update contact details and form labels for both languages.
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
          <FieldGroup title="Page intro">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Title (EN)</label>
                <Input name="titleEn" defaultValue={settings?.titleEn ?? en.title} className="h-11 rounded-2xl bg-white px-4" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Title (AR)</label>
                <Input name="titleAr" defaultValue={settings?.titleAr ?? ar.title} className="h-11 rounded-2xl bg-white px-4" dir="rtl" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">Description (EN)</label>
                <Textarea name="descriptionEn" defaultValue={settings?.descriptionEn ?? en.description} className="min-h-24 rounded-2xl bg-white px-4 py-3" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">Description (AR)</label>
                <Textarea name="descriptionAr" defaultValue={settings?.descriptionAr ?? ar.description} className="min-h-24 rounded-2xl bg-white px-4 py-3" dir="rtl" />
              </div>
            </div>
          </FieldGroup>

          <FieldGroup title="Contact details">
            <div className="grid gap-4 md:grid-cols-2">
              {[
                ["emailLabelEn", "Email label (EN)", settings?.emailLabelEn ?? en.details[0].label],
                ["emailLabelAr", "Email label (AR)", settings?.emailLabelAr ?? ar.details[0].label],
                ["emailValue", "Email", settings?.emailValue ?? en.details[0].value],
                ["phoneLabelEn", "Phone label (EN)", settings?.phoneLabelEn ?? en.details[1].label],
                ["phoneLabelAr", "Phone label (AR)", settings?.phoneLabelAr ?? ar.details[1].label],
                ["phoneValue", "Phone", settings?.phoneValue ?? en.details[1].value],
                ["addressLabelEn", "Website label (EN)", settings?.addressLabelEn ?? en.details[2].label],
                ["addressLabelAr", "Website label (AR)", settings?.addressLabelAr ?? ar.details[2].label],
                ["addressValueEn", "Website value (EN)", settings?.addressValueEn ?? en.details[2].value],
                ["addressValueAr", "Website value (AR)", settings?.addressValueAr ?? ar.details[2].value],
              ].map(([name, label, value]) => (
                <div key={name}>
                  <label className="mb-2 block text-sm font-medium text-slate-700">{label}</label>
                  <Input name={name} defaultValue={String(value)} className="h-11 rounded-2xl bg-white px-4" dir={String(name).endsWith("Ar") ? "rtl" : "ltr"} />
                </div>
              ))}
            </div>
          </FieldGroup>

          <FieldGroup title="Form labels">
            <div className="grid gap-4 md:grid-cols-2">
              {[
                ["formNameLabelEn", "Name label (EN)", settings?.formNameLabelEn ?? en.form.name],
                ["formNameLabelAr", "Name label (AR)", settings?.formNameLabelAr ?? ar.form.name],
                ["formEmailLabelEn", "Email label (EN)", settings?.formEmailLabelEn ?? en.form.email],
                ["formEmailLabelAr", "Email label (AR)", settings?.formEmailLabelAr ?? ar.form.email],
                ["formSubjectLabelEn", "Subject label (EN)", settings?.formSubjectLabelEn ?? en.form.subject],
                ["formSubjectLabelAr", "Subject label (AR)", settings?.formSubjectLabelAr ?? ar.form.subject],
                ["formMessageLabelEn", "Message label (EN)", settings?.formMessageLabelEn ?? en.form.message],
                ["formMessageLabelAr", "Message label (AR)", settings?.formMessageLabelAr ?? ar.form.message],
                ["formSubmitLabelEn", "Submit label (EN)", settings?.formSubmitLabelEn ?? en.form.submit],
                ["formSubmitLabelAr", "Submit label (AR)", settings?.formSubmitLabelAr ?? ar.form.submit],
              ].map(([name, label, value]) => (
                <div key={name}>
                  <label className="mb-2 block text-sm font-medium text-slate-700">{label}</label>
                  <Input name={name} defaultValue={String(value)} className="h-11 rounded-2xl bg-white px-4" dir={String(name).endsWith("Ar") ? "rtl" : "ltr"} />
                </div>
              ))}
            </div>
          </FieldGroup>
        </div>
      </form>
    </div>
  );
}
