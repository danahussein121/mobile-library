import Link from "next/link";
import {
  ArrowRight,
  CalendarPlus2,
  CircleDollarSign,
  Home,
  Layers3,
  LayoutTemplate,
  PencilLine,
  Phone,
  SquarePen,
} from "lucide-react";

import { AdminPageHeader } from "@/components/admin/admin-page-header";
import {
  adminText,
  resolveAdminLanguage,
  withAdminLanguage,
} from "@/lib/admin-language";
import { db } from "@/lib/db";

function StatCard({
  lang,
  label,
  labelAr,
  value,
  href,
}: {
  lang: "en" | "ar";
  label: string;
  labelAr: string;
  value: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-[1.75rem] border border-white/80 bg-white/90 p-6 shadow-[0_25px_70px_-55px_rgba(15,23,42,0.3)] transition-transform hover:-translate-y-1"
    >
      <p className="text-sm font-medium text-slate-500">{adminText(lang, label, labelAr)}</p>
      <p className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-slate-950">
        {value}
      </p>
      <p className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary">
        {adminText(lang, "Open", "فتح")}
        <ArrowRight className="size-4" />
      </p>
    </Link>
  );
}

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const params = await searchParams;
  const lang = resolveAdminLanguage(params.lang);
  const today = new Date(new Date().setHours(0, 0, 0, 0));
  const [programs, projects, events, pages, upcomingEvents, latestProgram, latestEvent, latestPage] =
    await Promise.all([
    db.program.count(),
    db.project.count(),
    db.event.count(),
    db.pageContent.count(),
    db.event.count({ where: { eventDate: { gte: today } } }),
    db.program.findFirst({ orderBy: { updatedAt: "desc" } }),
    db.event.findFirst({ orderBy: { updatedAt: "desc" } }),
    db.pageContent.findFirst({ orderBy: { updatedAt: "desc" } }),
  ]);

  const lastUpdatedAt = [latestProgram?.updatedAt, latestEvent?.updatedAt, latestPage?.updatedAt]
    .filter((value): value is Date => Boolean(value))
    .sort((a, b) => b.getTime() - a.getTime())[0];

  const quickActions = [
    {
      href: withAdminLanguage("/admin/programs", lang),
      label: "Add new program",
      labelAr: "إضافة برنامج جديد",
      description: "Create or update the service cards shown on the website.",
      descriptionAr: "إضافة أو تعديل بطاقات البرامج الظاهرة في الموقع.",
      icon: Layers3,
    },
    {
      href: withAdminLanguage("/admin/projects", lang),
      label: "Add new project",
      labelAr: "إضافة مشروع جديد",
      description: "Manage featured projects in a clear, simple editor.",
      descriptionAr: "إدارة المشاريع المعروضة من خلال محرر واضح وبسيط.",
      icon: LayoutTemplate,
    },
    {
      href: withAdminLanguage("/admin/events", lang),
      label: "Add new event",
      labelAr: "إضافة فعالية جديدة",
      description: "Publish the next event card and event date.",
      descriptionAr: "إضافة بطاقة الفعالية القادمة وتاريخها.",
      icon: CalendarPlus2,
    },
    {
      href: withAdminLanguage("/admin/settings/home", lang),
      label: "Edit homepage",
      labelAr: "تعديل الصفحة الرئيسية",
      description: "Update hero text and homepage sections without changing the design.",
      descriptionAr: "تحديث نصوص الصفحة الرئيسية دون تغيير التصميم.",
      icon: Home,
    },
    {
      href: withAdminLanguage("/admin/settings/donation", lang),
      label: "Edit donation info",
      labelAr: "تعديل معلومات التبرع",
      description: "Update bank transfer and donation details.",
      descriptionAr: "تحديث بيانات التحويل البنكي ومعلومات التبرع.",
      icon: CircleDollarSign,
    },
    {
      href: withAdminLanguage("/admin/settings/contact", lang),
      label: "Edit contact info",
      labelAr: "تعديل معلومات التواصل",
      description: "Keep public contact details current and easy to find.",
      descriptionAr: "تحديث بيانات التواصل العامة بسهولة.",
      icon: Phone,
    },
  ];

  return (
    <div className="space-y-6 py-2">
      <AdminPageHeader
        lang={lang}
        eyebrow="Dashboard"
        eyebrowAr="لوحة التحكم"
        title="Manage website content"
        titleAr="إدارة محتوى الموقع"
        description="Use this simple control panel to update the website content without changing the public design."
        descriptionAr="استخدم لوحة التحكم البسيطة هذه لتحديث محتوى الموقع دون تغيير تصميم الموقع العام."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          lang={lang}
          label="Programs"
          labelAr="البرامج"
          value={String(programs)}
          href={withAdminLanguage("/admin/programs", lang)}
        />
        <StatCard
          lang={lang}
          label="Projects"
          labelAr="المشاريع"
          value={String(projects)}
          href={withAdminLanguage("/admin/projects", lang)}
        />
        <StatCard
          lang={lang}
          label="Events"
          labelAr="الفعاليات"
          value={String(events)}
          href={withAdminLanguage("/admin/events", lang)}
        />
        <StatCard
          lang={lang}
          label="Page sections"
          labelAr="أقسام الصفحات"
          value={String(pages)}
          href={withAdminLanguage("/admin/settings/pages/about", lang)}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
        <section className="rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_25px_70px_-55px_rgba(15,23,42,0.3)]">
          <div className="mb-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/75">
              {adminText(lang, "Quick Actions", "الإجراءات السريعة")}
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
              {adminText(lang, "Start with the most common tasks", "ابدأ بأهم المهام")}
            </h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              {adminText(
                lang,
                "These are the actions a content manager usually needs first.",
                "هذه هي المهام التي يحتاجها مدير المحتوى غالبًا في البداية.",
              )}
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {quickActions.map((action) => {
              const Icon = action.icon;

              return (
                <Link
                  key={action.href}
                  href={action.href}
                  className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 transition-transform hover:-translate-y-0.5 hover:border-primary/20 hover:bg-primary/5"
                >
                  <div className="flex size-11 items-center justify-center rounded-full bg-white text-primary shadow-sm">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-950">
                    {adminText(lang, action.label, action.labelAr)}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {adminText(lang, action.description, action.descriptionAr)}
                  </p>
                  <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    {adminText(lang, "Open editor", "فتح المحرر")}
                    <SquarePen className="size-4" />
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_25px_70px_-55px_rgba(15,23,42,0.3)]">
          <div className="mb-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/75">
              {adminText(lang, "Overview", "نظرة عامة")}
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
              {adminText(lang, "What needs attention", "ما الذي يحتاج إلى متابعة")}
            </h2>
          </div>

          <div className="space-y-4">
            <div className="rounded-[1.5rem] bg-slate-50 px-4 py-4">
              <div>
                <p className="text-sm font-semibold text-slate-950">
                  {adminText(lang, "Last content update", "آخر تحديث للمحتوى")}
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  {lastUpdatedAt
                    ? lastUpdatedAt.toLocaleString(lang === "ar" ? "ar" : "en")
                    : adminText(lang, "No recent updates yet.", "لا توجد تحديثات حديثة بعد.")}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-[1.5rem] bg-slate-50 px-4 py-4">
              <Layers3 className="mt-0.5 size-4 text-primary" />
              <div>
                <p className="text-sm font-semibold text-slate-950">
                  {adminText(lang, "Programs on the site", "عدد البرامج في الموقع")}
                </p>
                <p className="mt-1 text-sm text-slate-600">{programs}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-[1.5rem] bg-slate-50 px-4 py-4">
              <CalendarPlus2 className="mt-0.5 size-4 text-primary" />
              <div>
                <p className="text-sm font-semibold text-slate-950">
                  {adminText(lang, "Upcoming events", "الفعاليات القادمة")}
                </p>
                <p className="mt-1 text-sm text-slate-600">{upcomingEvents}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-[1.5rem] bg-slate-50 px-4 py-4">
              <PencilLine className="mt-0.5 size-4 text-primary" />
              <div>
                <p className="text-sm font-semibold text-slate-950">
                  {adminText(lang, "Saved page sections", "أقسام الصفحات المحفوظة")}
                </p>
                <p className="mt-1 text-sm text-slate-600">{pages}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
