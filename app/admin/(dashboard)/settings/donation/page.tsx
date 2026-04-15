import { saveDonationSettingsFormAction } from "@/app/admin/actions";
import { AdminActionForm } from "@/components/admin/admin-action-form";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { FieldGroup } from "@/components/admin/form-primitives";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { siteContent } from "@/data/site-content";
import { resolveAdminLanguage } from "@/lib/admin-language";
import { db } from "@/lib/db";

export default async function DonationSettingsAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const params = await searchParams;
  const lang = resolveAdminLanguage(params.lang);
  const settings = await db.donationSettings.findUnique({
    where: { id: "donation-settings" },
  });

  const en = siteContent.en.donation;
  const ar = siteContent.ar.donation;

  return (
    <div className="space-y-6 py-2">
      <AdminPageHeader
        lang={lang}
        eyebrow="Settings"
        eyebrowAr="الإعدادات"
        title="Bank & Donation Info"
        titleAr="معلومات التبرع والتحويل البنكي"
        description="Manage bank transfer details, form labels, and donation page helper text."
        descriptionAr="إدارة بيانات التحويل البنكي وعناوين النموذج والنصوص المساعدة في صفحة التبرع."
        context={{
          text: "These bank details appear on the Donate page.",
          textAr: "تظهر هذه البيانات البنكية في صفحة التبرع.",
          href: "/en/donate",
          linkLabelAr: "عرض الصفحة",
        }}
      />

      <AdminActionForm
        action={saveDonationSettingsFormAction}
        lang={lang}
        title="Donation editor"
        titleAr="محرر التبرع"
        description="Bank transfer details and donor-facing text come from this form."
        descriptionAr="يتم تحديث بيانات التحويل البنكي والنصوص الظاهرة للمتبرع من هذا النموذج."
        pendingLabel="Saving..."
      >
        <div className="grid gap-5">
          <FieldGroup title="Page intro">
            <div className="grid gap-4 md:grid-cols-2">
              {[
                ["headingEn", "Heading (EN)", settings?.headingEn ?? en.heading],
                ["headingAr", "Heading (AR)", settings?.headingAr ?? ar.heading],
                ["bankTransferTabEn", "Bank transfer tab (EN)", settings?.bankTransferTabEn ?? en.tabs.bankTransfer],
                ["bankTransferTabAr", "Bank transfer tab (AR)", settings?.bankTransferTabAr ?? ar.tabs.bankTransfer],
                ["onlineSoonTabEn", "Online coming soon tab (EN)", settings?.onlineSoonTabEn ?? en.tabs.onlineSoon],
                ["onlineSoonTabAr", "Online coming soon tab (AR)", settings?.onlineSoonTabAr ?? ar.tabs.onlineSoon],
              ].map(([name, label, value]) => (
                <div key={name}>
                  <label className="mb-2 block text-sm font-medium text-slate-700">{label}</label>
                  <Input name={name} defaultValue={String(value)} className="h-11 rounded-2xl bg-white px-4" dir={String(name).endsWith("Ar") ? "rtl" : "ltr"} />
                </div>
              ))}
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

          <FieldGroup title="Bank transfer">
            <div className="grid gap-4 md:grid-cols-2">
              {[
                ["bankTransferTitleEn", "Section title (EN)", settings?.bankTransferTitleEn ?? en.bankTransfer.title],
                ["bankTransferTitleAr", "Section title (AR)", settings?.bankTransferTitleAr ?? ar.bankTransfer.title],
                ["bankNameLabelEn", "Bank label (EN)", settings?.bankNameLabelEn ?? en.bankTransfer.fields[0].label],
                ["bankNameLabelAr", "Bank label (AR)", settings?.bankNameLabelAr ?? ar.bankTransfer.fields[0].label],
                ["bankNameValue", "Bank value", settings?.bankNameValue ?? en.bankTransfer.fields[0].value],
                ["accountNameLabelEn", "Account name label (EN)", settings?.accountNameLabelEn ?? en.bankTransfer.fields[1].label],
                ["accountNameLabelAr", "Account name label (AR)", settings?.accountNameLabelAr ?? ar.bankTransfer.fields[1].label],
                ["accountNameValue", "Account name value", settings?.accountNameValue ?? en.bankTransfer.fields[1].value],
                ["accountNumberLabelEn", "Account number label (EN)", settings?.accountNumberLabelEn ?? en.bankTransfer.fields[2].label],
                ["accountNumberLabelAr", "Account number label (AR)", settings?.accountNumberLabelAr ?? ar.bankTransfer.fields[2].label],
                ["accountNumberValue", "Account number value", settings?.accountNumberValue ?? en.bankTransfer.fields[2].value],
                ["ibanLabelEn", "IBAN label (EN)", settings?.ibanLabelEn ?? en.bankTransfer.fields[3].label],
                ["ibanLabelAr", "IBAN label (AR)", settings?.ibanLabelAr ?? ar.bankTransfer.fields[3].label],
                ["ibanValue", "IBAN value", settings?.ibanValue ?? en.bankTransfer.fields[3].value],
              ].map(([name, label, value]) => (
                <div key={name}>
                  <label className="mb-2 block text-sm font-medium text-slate-700">{label}</label>
                  <Input name={name} defaultValue={String(value)} className="h-11 rounded-2xl bg-white px-4" dir={String(name).endsWith("Ar") ? "rtl" : "ltr"} />
                </div>
              ))}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">Helper text (EN)</label>
                <Textarea name="bankTransferHelperEn" defaultValue={settings?.bankTransferHelperEn ?? en.bankTransfer.helper} className="min-h-24 rounded-2xl bg-white px-4 py-3" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">Helper text (AR)</label>
                <Textarea name="bankTransferHelperAr" defaultValue={settings?.bankTransferHelperAr ?? ar.bankTransfer.helper} className="min-h-24 rounded-2xl bg-white px-4 py-3" dir="rtl" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">Reference note (EN)</label>
                <Input name="referenceNoteEn" defaultValue={settings?.referenceNoteEn ?? en.bankTransfer.referenceNote} className="h-11 rounded-2xl bg-white px-4" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">Reference note (AR)</label>
                <Input name="referenceNoteAr" defaultValue={settings?.referenceNoteAr ?? ar.bankTransfer.referenceNote} className="h-11 rounded-2xl bg-white px-4" dir="rtl" />
              </div>
            </div>
          </FieldGroup>

          <FieldGroup title="Form and CTA">
            <div className="grid gap-4 md:grid-cols-2">
              {[
                ["formTitleEn", "Form title (EN)", settings?.formTitleEn ?? en.form.title],
                ["formTitleAr", "Form title (AR)", settings?.formTitleAr ?? ar.form.title],
                ["formNameLabelEn", "Name label (EN)", settings?.formNameLabelEn ?? en.form.name],
                ["formNameLabelAr", "Name label (AR)", settings?.formNameLabelAr ?? ar.form.name],
                ["formEmailLabelEn", "Email label (EN)", settings?.formEmailLabelEn ?? en.form.email],
                ["formEmailLabelAr", "Email label (AR)", settings?.formEmailLabelAr ?? ar.form.email],
                ["formAmountLabelEn", "Amount label (EN)", settings?.formAmountLabelEn ?? en.form.amount],
                ["formAmountLabelAr", "Amount label (AR)", settings?.formAmountLabelAr ?? ar.form.amount],
                ["formNoteLabelEn", "Note label (EN)", settings?.formNoteLabelEn ?? en.form.note],
                ["formNoteLabelAr", "Note label (AR)", settings?.formNoteLabelAr ?? ar.form.note],
                ["formTransferDateLabelEn", "Transfer date label (EN)", settings?.formTransferDateLabelEn ?? en.form.transferDate],
                ["formTransferDateLabelAr", "Transfer date label (AR)", settings?.formTransferDateLabelAr ?? ar.form.transferDate],
                ["formSubmitLabelEn", "Submit button (EN)", settings?.formSubmitLabelEn ?? en.form.submit],
                ["formSubmitLabelAr", "Submit button (AR)", settings?.formSubmitLabelAr ?? ar.form.submit],
                ["ctaTitleEn", "Bottom CTA title (EN)", settings?.ctaTitleEn ?? en.cta.title],
                ["ctaTitleAr", "Bottom CTA title (AR)", settings?.ctaTitleAr ?? ar.cta.title],
                ["ctaButtonLabelEn", "Bottom CTA button (EN)", settings?.ctaButtonLabelEn ?? en.cta.button],
                ["ctaButtonLabelAr", "Bottom CTA button (AR)", settings?.ctaButtonLabelAr ?? ar.cta.button],
              ].map(([name, label, value]) => (
                <div key={name}>
                  <label className="mb-2 block text-sm font-medium text-slate-700">{label}</label>
                  <Input name={name} defaultValue={String(value)} className="h-11 rounded-2xl bg-white px-4" dir={String(name).endsWith("Ar") ? "rtl" : "ltr"} />
                </div>
              ))}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">Form description (EN)</label>
                <Textarea name="formDescriptionEn" defaultValue={settings?.formDescriptionEn ?? en.form.description} className="min-h-24 rounded-2xl bg-white px-4 py-3" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">Form description (AR)</label>
                <Textarea name="formDescriptionAr" defaultValue={settings?.formDescriptionAr ?? ar.form.description} className="min-h-24 rounded-2xl bg-white px-4 py-3" dir="rtl" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">Coming soon card title (EN)</label>
                <Input name="placeholderTitleEn" defaultValue={settings?.placeholderTitleEn ?? en.placeholderCard.title} className="h-11 rounded-2xl bg-white px-4" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">Coming soon card title (AR)</label>
                <Input name="placeholderTitleAr" defaultValue={settings?.placeholderTitleAr ?? ar.placeholderCard.title} className="h-11 rounded-2xl bg-white px-4" dir="rtl" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">Coming soon description (EN)</label>
                <Textarea name="placeholderDescriptionEn" defaultValue={settings?.placeholderDescriptionEn ?? en.placeholderCard.description} className="min-h-24 rounded-2xl bg-white px-4 py-3" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">Coming soon description (AR)</label>
                <Textarea name="placeholderDescriptionAr" defaultValue={settings?.placeholderDescriptionAr ?? ar.placeholderCard.description} className="min-h-24 rounded-2xl bg-white px-4 py-3" dir="rtl" />
              </div>
            </div>
          </FieldGroup>
        </div>
      </AdminActionForm>
    </div>
  );
}
