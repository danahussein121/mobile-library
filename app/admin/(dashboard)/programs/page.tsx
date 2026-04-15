import Image from "next/image";
import Link from "next/link";

import {
  deleteProgramFormAction,
  saveProgramFormAction,
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

function ProgramForm({
  program,
  lang,
}: {
  program?: Awaited<ReturnType<typeof db.program.findMany>>[number];
  lang: AdminLanguage;
}) {
  return (
    <AdminActionForm
      action={saveProgramFormAction}
      lang={lang}
      title={program ? "Edit program" : "Add new program"}
      titleAr={program ? "تعديل البرنامج" : "إضافة برنامج جديد"}
      description="Update the titles, descriptions, order, and image for this program."
      descriptionAr="حدّث العنوان والوصف والترتيب والصورة لهذا البرنامج."
      pendingLabel="Saving..."
    >
      <input type="hidden" name="id" defaultValue={program?.id} />
      <input type="hidden" name="existingImageUrl" defaultValue={program?.imageUrl || ""} />

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.1fr)_320px]">
        <FieldGroup
          title={adminText(lang, "Basic details", "المعلومات الأساسية")}
          description={adminText(
            lang,
            "These details help organize the item on the website.",
            "هذه البيانات تساعد في ترتيب العنصر داخل الموقع.",
          )}
        >
          <div className="grid gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                {adminText(lang, "Internal link name", "اسم الرابط الداخلي")}
              </label>
              <Input name="slug" defaultValue={program?.slug} className="h-11 rounded-2xl bg-white px-4" />
              <p className="mt-2 text-xs leading-6 text-slate-500">
                {adminText(
                  lang,
                  'A simple internal ID, for example "art-workshops". Use lowercase letters and hyphens only.',
                  'معرّف داخلي بسيط مثل "art-workshops". استخدم أحرفًا إنجليزية صغيرة وشرطات فقط.',
                )}
              </p>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                {adminText(lang, "Display order", "ترتيب الظهور")}
              </label>
              <Input
                name="order"
                type="number"
                defaultValue={program?.order ?? 0}
                className="h-11 rounded-2xl bg-white px-4"
              />
              <p className="mt-2 text-xs leading-6 text-slate-500">
                {adminText(
                  lang,
                  "Lower numbers appear first on the website.",
                  "الأرقام الأصغر تظهر أولًا في الموقع.",
                )}
              </p>
            </div>
            <ImageUploadField
              name="image"
              lang={lang}
              label={adminText(lang, "Program image", "صورة البرنامج")}
              existingUrl={program?.imageUrl}
            />
          </div>
        </FieldGroup>

        <FieldGroup
          title={adminText(lang, "Program content", "محتوى البرنامج")}
          description={adminText(
            lang,
            "Use the tabs to edit English and Arabic content clearly.",
            "استخدم التبويبات لتعديل المحتوى الإنجليزي والعربي بوضوح.",
          )}
        >
          <AdminBilingualTabs
            language={lang}
            english={
              <div className="grid gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Title</label>
                  <Input name="titleEn" required defaultValue={program?.titleEn} className="h-11 rounded-2xl bg-white px-4" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Description</label>
                  <Textarea name="descriptionEn" required defaultValue={program?.descriptionEn} className="min-h-32 rounded-2xl bg-white px-4 py-3" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Image alt text</label>
                  <Input name="imageAltEn" required defaultValue={program?.imageAltEn} className="h-11 rounded-2xl bg-white px-4" />
                </div>
              </div>
            }
            arabic={
              <div className="grid gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">العنوان</label>
                  <Input name="titleAr" required defaultValue={program?.titleAr} className="h-11 rounded-2xl bg-white px-4" dir="rtl" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">الوصف</label>
                  <Textarea name="descriptionAr" required defaultValue={program?.descriptionAr} className="min-h-32 rounded-2xl bg-white px-4 py-3" dir="rtl" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">النص البديل للصورة</label>
                  <Input name="imageAltAr" required defaultValue={program?.imageAltAr} className="h-11 rounded-2xl bg-white px-4" dir="rtl" />
                </div>
              </div>
            }
          />
        </FieldGroup>

        <FieldGroup
          title={adminText(lang, "Preview", "معاينة")}
          description={adminText(
            lang,
            "A simple preview of how the card appears on the public website.",
            "معاينة بسيطة لكيفية ظهور البطاقة على الموقع العام.",
          )}
          className="h-fit xl:row-span-3"
        >
          <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm">
            <div className="relative aspect-[1.35/1] bg-slate-100">
              {program?.imageUrl ? (
                <Image
                  src={program.imageUrl}
                  alt={program.imageAltEn || program.titleEn}
                  fill
                  className="object-cover"
                />
              ) : null}
            </div>
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
                {adminText(lang, "Services card", "بطاقة الخدمة")}
              </p>
              <h3 className="mt-3 text-lg font-semibold text-slate-950">
                {program?.titleEn || "Program title preview"}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {program?.descriptionEn ||
                  "Your English description will appear here in the public-facing card layout."}
              </p>
              <Link
                href="/en/services"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex text-sm font-semibold text-primary transition-colors hover:text-[#0097A7]"
              >
                {adminText(lang, "View live page", "عرض الصفحة")}
              </Link>
            </div>
          </div>
        </FieldGroup>
      </div>
    </AdminActionForm>
  );
}

export default async function ProgramsAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const params = await searchParams;
  const lang = resolveAdminLanguage(params.lang);
  const programs = await db.program.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });

  return (
    <div className="space-y-6 py-2">
      <AdminPageHeader
        lang={lang}
        eyebrow="Collections"
        eyebrowAr="المحتوى"
        title="Programs & Services"
        titleAr="البرامج والخدمات"
        description="Add, update, or remove program cards without changing the website design."
        descriptionAr="أضف أو عدّل أو احذف بطاقات البرامج دون تغيير تصميم الموقع."
        context={{
          text: "This content appears on the Services page.",
          textAr: "يظهر هذا المحتوى في صفحة الخدمات.",
          href: "/en/services",
          linkLabelAr: "عرض الصفحة",
        }}
      />

      <ProgramForm lang={lang} />

      <div className="space-y-4">
        <div className="rounded-[1.5rem] border border-white/80 bg-white/85 px-5 py-4 shadow-[0_20px_60px_-50px_rgba(15,23,42,0.3)]">
          <h2 className="text-lg font-semibold text-slate-950">
            {adminText(lang, "Current programs", "البرامج الحالية")}
          </h2>
          <p className="mt-1 text-sm leading-7 text-slate-600">
            {adminText(
              lang,
              "Each item below can still be edited or deleted as before.",
              "يمكن تعديل أو حذف كل عنصر أدناه كما كان سابقًا.",
            )}
          </p>
        </div>
        {programs.map((program) => (
          <div key={program.id} className="space-y-3 rounded-[2rem] border border-white/80 bg-white/50 p-3">
            <div className="flex flex-col gap-1 rounded-[1.5rem] bg-slate-50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-950">
                  {adminText(lang, "Editing", "تعديل")}: {program.titleEn}
                </p>
                <p className="text-sm text-slate-500" dir="rtl">
                  {program.titleAr}
                </p>
              </div>
              <p className="text-xs font-medium text-slate-500">
                {adminText(lang, `Order: ${program.order}`, `الترتيب: ${program.order}`)}
              </p>
            </div>
            <ProgramForm program={program} lang={lang} />
            <div className="flex justify-end">
              <DeleteConfirmationForm
                action={deleteProgramFormAction}
                id={program.id}
                itemName={program.titleEn || program.slug}
                lang={lang}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
