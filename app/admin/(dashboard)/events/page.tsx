import {
  deleteEventFormAction,
  saveEventFormAction,
} from "@/app/admin/actions";
import { AdminActionForm } from "@/components/admin/admin-action-form";
import { AdminBilingualTabs } from "@/components/admin/admin-bilingual-tabs";
import { DeleteConfirmationForm } from "@/components/admin/delete-confirmation-form";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { FieldGroup } from "@/components/admin/form-primitives";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { adminText, resolveAdminLanguage, type AdminLanguage } from "@/lib/admin-language";
import { db } from "@/lib/db";

function EventForm({
  event,
  lang,
}: {
  event?: Awaited<ReturnType<typeof db.event.findMany>>[number];
  lang: AdminLanguage;
}) {
  const defaultDate = event?.eventDate.toISOString().slice(0, 10);

  return (
    <AdminActionForm
      action={saveEventFormAction}
      lang={lang}
      title={event ? "Edit event" : "Add new event"}
      titleAr={event ? "تعديل الفعالية" : "إضافة فعالية جديدة"}
      description="Keep event cards, dates, and bilingual text up to date."
      descriptionAr="حدّث بطاقات الفعاليات والتواريخ والنصوص باللغتين."
      pendingLabel="Saving..."
    >
      <input type="hidden" name="id" defaultValue={event?.id} />
      <input type="hidden" name="existingImageUrl" defaultValue={event?.imageUrl || ""} />

      <div className="grid gap-5 lg:grid-cols-2">
        <FieldGroup
          title={adminText(lang, "Basic details", "المعلومات الأساسية")}
          description={adminText(
            lang,
            "Set the date, order, internal link name, and image.",
            "حدّد التاريخ والترتيب والرابط الداخلي والصورة.",
          )}
        >
          <div className="grid gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                {adminText(lang, "Internal link name", "اسم الرابط الداخلي")}
              </label>
              <Input name="slug" defaultValue={event?.slug} className="h-11 rounded-2xl bg-white px-4" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                {adminText(lang, "Display order", "ترتيب الظهور")}
              </label>
              <Input
                name="order"
                type="number"
                defaultValue={event?.order ?? 0}
                className="h-11 rounded-2xl bg-white px-4"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                {adminText(lang, "Event date", "تاريخ الفعالية")}
              </label>
              <Input name="eventDate" type="date" required defaultValue={defaultDate} className="h-11 rounded-2xl bg-white px-4" />
            </div>
            <ImageUploadField
              name="image"
              lang={lang}
              label={adminText(lang, "Event image", "صورة الفعالية")}
              existingUrl={event?.imageUrl}
            />
          </div>
        </FieldGroup>

        <FieldGroup
          title={adminText(lang, "Event content", "محتوى الفعالية")}
          description={adminText(
            lang,
            "Switch between English and Arabic content using the tabs below.",
            "انتقل بين المحتوى الإنجليزي والعربي باستخدام التبويبات التالية.",
          )}
        >
          <AdminBilingualTabs
            language={lang}
            english={
              <div className="grid gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Title</label>
                  <Input name="titleEn" required defaultValue={event?.titleEn} className="h-11 rounded-2xl bg-white px-4" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Description</label>
                  <Textarea name="descriptionEn" required defaultValue={event?.descriptionEn} className="min-h-32 rounded-2xl bg-white px-4 py-3" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Image alt text</label>
                  <Input name="imageAltEn" required defaultValue={event?.imageAltEn} className="h-11 rounded-2xl bg-white px-4" />
                </div>
              </div>
            }
            arabic={
              <div className="grid gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">العنوان</label>
                  <Input name="titleAr" required defaultValue={event?.titleAr} className="h-11 rounded-2xl bg-white px-4" dir="rtl" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">الوصف</label>
                  <Textarea name="descriptionAr" required defaultValue={event?.descriptionAr} className="min-h-32 rounded-2xl bg-white px-4 py-3" dir="rtl" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">النص البديل للصورة</label>
                  <Input name="imageAltAr" required defaultValue={event?.imageAltAr} className="h-11 rounded-2xl bg-white px-4" dir="rtl" />
                </div>
              </div>
            }
          />
        </FieldGroup>
      </div>
    </AdminActionForm>
  );
}

export default async function EventsAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const params = await searchParams;
  const lang = resolveAdminLanguage(params.lang);
  const events = await db.event.findMany({
    orderBy: [{ order: "asc" }, { eventDate: "asc" }],
  });

  return (
    <div className="space-y-6 py-2">
      <AdminPageHeader
        lang={lang}
        eyebrow="Collections"
        eyebrowAr="المحتوى"
        title="Events"
        titleAr="الفعاليات"
        description="Manage event cards and dates shown across the site."
        descriptionAr="إدارة بطاقات الفعاليات والتواريخ الظاهرة في الموقع."
        context={{
          text: "Events appear on the Events page and homepage preview.",
          textAr: "تظهر الفعاليات في صفحة الفعاليات وفي معاينة الصفحة الرئيسية.",
          href: "/en/events",
          linkLabelAr: "عرض الصفحة",
        }}
      />

      <EventForm lang={lang} />

      <div className="space-y-4">
        <div className="rounded-[1.5rem] border border-white/80 bg-white/85 px-5 py-4 shadow-[0_20px_60px_-50px_rgba(15,23,42,0.3)]">
          <h2 className="text-lg font-semibold text-slate-950">
            {adminText(lang, "Current events", "الفعاليات الحالية")}
          </h2>
          <p className="mt-1 text-sm leading-7 text-slate-600">
            {adminText(
              lang,
              "Use the cards below to edit dates, text, or remove old events.",
              "استخدم البطاقات التالية لتعديل التواريخ أو النصوص أو حذف الفعاليات القديمة.",
            )}
          </p>
        </div>
        {events.map((event) => (
          <div key={event.id} className="space-y-3 rounded-[2rem] border border-white/80 bg-white/50 p-3">
            <div className="flex flex-col gap-1 rounded-[1.5rem] bg-slate-50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-950">
                  {adminText(lang, "Editing", "تعديل")}: {event.titleEn}
                </p>
                <p className="text-sm text-slate-500" dir="rtl">
                  {event.titleAr}
                </p>
              </div>
              <p className="text-xs font-medium text-slate-500">
                {event.eventDate.toLocaleDateString(lang === "ar" ? "ar" : "en")}
              </p>
            </div>
            <EventForm event={event} lang={lang} />
            <div className="flex justify-end">
              <DeleteConfirmationForm
                action={deleteEventFormAction}
                id={event.id}
                itemName={event.titleEn || event.slug}
                lang={lang}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
