import { notFound } from "next/navigation";

import { savePageContentFormAction } from "@/app/admin/actions";
import { AdminActionForm } from "@/components/admin/admin-action-form";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { siteContent } from "@/data/site-content";
import { resolveAdminLanguage } from "@/lib/admin-language";
import { db } from "@/lib/db";

const allowedKeys = ["about", "donate", "contact", "services", "programs", "projects", "events"] as const;

export default async function StaticPageAdminPage({
  params,
  searchParams,
}: {
  params: Promise<{ key: string }>;
  searchParams: Promise<{ lang?: string }>;
}) {
  const { key } = await params;
  const search = await searchParams;
  const lang = resolveAdminLanguage(search.lang);

  if (!allowedKeys.includes(key as (typeof allowedKeys)[number])) {
    notFound();
  }

  const page =
    (key === "services"
      ? await db.pageContent.findFirst({
          where: { key: { in: ["services", "programs"] } },
        })
      : await db.pageContent.findUnique({
          where: { key },
        }));

  const fallbackKey = key === "services" ? "programs" : key;
  const fallbackEn = siteContent.en.pages[fallbackKey as keyof typeof siteContent.en.pages];
  const fallbackAr = siteContent.ar.pages[fallbackKey as keyof typeof siteContent.ar.pages];
  const publicPath = key === "services" ? "/en/services" : `/en/${key}`;
  const pageTitleAr =
    key === "about"
      ? "صفحة من نحن"
      : key === "donate"
        ? "صفحة التبرع"
        : key === "contact"
          ? "صفحة التواصل"
          : key === "services"
            ? "صفحة الخدمات"
            : key === "programs"
              ? "صفحة البرامج"
              : key === "projects"
                ? "صفحة المشاريع"
                : "صفحة الفعاليات";

  return (
    <div className="space-y-6 py-2">
      <AdminPageHeader
        lang={lang}
        eyebrow="Settings"
        eyebrowAr="الإعدادات"
        title={`${key[0].toUpperCase()}${key.slice(1)} page`}
        titleAr={pageTitleAr}
        description="Edit the bilingual page heading and introductory description for this public page."
        descriptionAr="عدّل عنوان الصفحة ووصفها الافتتاحي باللغتين لهذه الصفحة العامة."
        context={{
          text: `This content appears at ${key === "services" ? "/services" : `/${key}`} on the public site.`,
          textAr: `يظهر هذا المحتوى في ${key === "services" ? "/services" : `/${key}`} على الموقع العام.`,
          href: publicPath,
          linkLabelAr: "عرض الصفحة",
        }}
      />

      <AdminActionForm
        action={savePageContentFormAction}
        lang={lang}
        title="Page hero content"
        titleAr="محتوى مقدمة الصفحة"
        description="These values feed the existing public page hero component."
        descriptionAr="تغذي هذه القيم مكوّن مقدمة الصفحة الحالي في الموقع العام."
        pendingLabel="Saving..."
        className="rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_25px_70px_-55px_rgba(15,23,42,0.3)]"
      >
        <input type="hidden" name="key" value={key} />

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Title (EN)</label>
            <Input name="titleEn" defaultValue={page?.titleEn ?? fallbackEn.title} className="h-11 rounded-2xl bg-white px-4" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Title (AR)</label>
            <Input name="titleAr" defaultValue={page?.titleAr ?? fallbackAr.title} className="h-11 rounded-2xl bg-white px-4" dir="rtl" />
          </div>
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">Description (EN)</label>
            <Textarea name="descriptionEn" defaultValue={page?.descriptionEn ?? fallbackEn.description} className="min-h-32 rounded-2xl bg-white px-4 py-3" />
          </div>
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">Description (AR)</label>
            <Textarea name="descriptionAr" defaultValue={page?.descriptionAr ?? fallbackAr.description} className="min-h-32 rounded-2xl bg-white px-4 py-3" dir="rtl" />
          </div>
        </div>
      </AdminActionForm>
    </div>
  );
}
