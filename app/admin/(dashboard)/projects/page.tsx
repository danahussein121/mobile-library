import {
  deleteProjectFormAction,
  saveProjectFormAction,
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

function ProjectForm({
  project,
  lang,
}: {
  project?: Awaited<ReturnType<typeof db.project.findMany>>[number];
  lang: AdminLanguage;
}) {
  return (
    <AdminActionForm
      action={saveProjectFormAction}
      lang={lang}
      title={project ? "Edit project" : "Add new project"}
      titleAr={project ? "تعديل المشروع" : "إضافة مشروع جديد"}
      description="Manage featured projects without changing the public layout."
      descriptionAr="إدارة المشاريع المعروضة دون تغيير الشكل العام للموقع."
      pendingLabel="Saving..."
    >
      <input type="hidden" name="id" defaultValue={project?.id} />
      <input type="hidden" name="existingImageUrl" defaultValue={project?.imageUrl || ""} />

      <div className="grid gap-5 lg:grid-cols-2">
        <FieldGroup
          title={adminText(lang, "Basic details", "المعلومات الأساسية")}
          description={adminText(
            lang,
            "Set the internal link name, order, and project image.",
            "حدّد الرابط الداخلي والترتيب وصورة المشروع.",
          )}
        >
          <div className="grid gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                {adminText(lang, "Internal link name", "اسم الرابط الداخلي")}
              </label>
              <Input name="slug" defaultValue={project?.slug} className="h-11 rounded-2xl bg-white px-4" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                {adminText(lang, "Display order", "ترتيب الظهور")}
              </label>
              <Input
                name="order"
                type="number"
                defaultValue={project?.order ?? 0}
                className="h-11 rounded-2xl bg-white px-4"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                {adminText(lang, "Button text (English)", "نص الزر بالإنجليزية")}
              </label>
              <Input name="ctaLabelEn" required defaultValue={project?.ctaLabelEn} className="h-11 rounded-2xl bg-white px-4" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                {adminText(lang, "Button text (Arabic)", "نص الزر بالعربية")}
              </label>
              <Input name="ctaLabelAr" required defaultValue={project?.ctaLabelAr} className="h-11 rounded-2xl bg-white px-4" dir="rtl" />
            </div>
            <ImageUploadField
              name="image"
              lang={lang}
              label={adminText(lang, "Project image", "صورة المشروع")}
              existingUrl={project?.imageUrl}
            />
          </div>
        </FieldGroup>

        <FieldGroup
          title={adminText(lang, "Project content", "محتوى المشروع")}
          description={adminText(
            lang,
            "Switch between English and Arabic while editing.",
            "انتقل بين الإنجليزية والعربية أثناء التحرير.",
          )}
        >
          <AdminBilingualTabs
            language={lang}
            english={
              <div className="grid gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Title</label>
                  <Input name="titleEn" required defaultValue={project?.titleEn} className="h-11 rounded-2xl bg-white px-4" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Description</label>
                  <Textarea name="descriptionEn" required defaultValue={project?.descriptionEn} className="min-h-32 rounded-2xl bg-white px-4 py-3" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Image alt text</label>
                  <Input name="imageAltEn" required defaultValue={project?.imageAltEn} className="h-11 rounded-2xl bg-white px-4" />
                </div>
              </div>
            }
            arabic={
              <div className="grid gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">العنوان</label>
                  <Input name="titleAr" required defaultValue={project?.titleAr} className="h-11 rounded-2xl bg-white px-4" dir="rtl" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">الوصف</label>
                  <Textarea name="descriptionAr" required defaultValue={project?.descriptionAr} className="min-h-32 rounded-2xl bg-white px-4 py-3" dir="rtl" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">النص البديل للصورة</label>
                  <Input name="imageAltAr" required defaultValue={project?.imageAltAr} className="h-11 rounded-2xl bg-white px-4" dir="rtl" />
                </div>
              </div>
            }
          />
        </FieldGroup>
      </div>
    </AdminActionForm>
  );
}

export default async function ProjectsAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const params = await searchParams;
  const lang = resolveAdminLanguage(params.lang);
  const projects = await db.project.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });

  return (
    <div className="space-y-6 py-2">
      <AdminPageHeader
        lang={lang}
        eyebrow="Collections"
        eyebrowAr="المحتوى"
        title="Projects"
        titleAr="المشاريع"
        description="Manage featured project stories and bilingual button labels."
        descriptionAr="إدارة قصص المشاريع ونصوص الأزرار باللغتين."
      />

      <ProjectForm lang={lang} />

      <div className="space-y-4">
        <div className="rounded-[1.5rem] border border-white/80 bg-white/85 px-5 py-4 shadow-[0_20px_60px_-50px_rgba(15,23,42,0.3)]">
          <h2 className="text-lg font-semibold text-slate-950">
            {adminText(lang, "Current projects", "المشاريع الحالية")}
          </h2>
          <p className="mt-1 text-sm leading-7 text-slate-600">
            {adminText(
              lang,
              "Edit or delete any existing project from the cards below.",
              "يمكنك تعديل أو حذف أي مشروع موجود من البطاقات التالية.",
            )}
          </p>
        </div>
        {projects.map((project) => (
          <div key={project.id} className="space-y-3 rounded-[2rem] border border-white/80 bg-white/50 p-3">
            <div className="flex flex-col gap-1 rounded-[1.5rem] bg-slate-50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-950">
                  {adminText(lang, "Editing", "تعديل")}: {project.titleEn}
                </p>
                <p className="text-sm text-slate-500" dir="rtl">
                  {project.titleAr}
                </p>
              </div>
              <p className="text-xs font-medium text-slate-500">
                {adminText(lang, `Order: ${project.order}`, `الترتيب: ${project.order}`)}
              </p>
            </div>
            <ProjectForm project={project} lang={lang} />
            <div className="flex justify-end">
              <DeleteConfirmationForm
                action={deleteProjectFormAction}
                id={project.id}
                itemName={project.titleEn || project.slug}
                lang={lang}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
