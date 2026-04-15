import { redirect } from "next/navigation";

import { loginAdmin } from "@/app/admin/actions";
import { AdminBrand } from "@/components/admin/admin-brand";
import { AdminLanguageToggle } from "@/components/admin/admin-language-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAdminSession } from "@/lib/admin-auth";
import {
  adminDirection,
  adminText,
  resolveAdminLanguage,
  withAdminLanguage,
} from "@/lib/admin-language";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string; lang?: string }>;
}) {
  const session = await getAdminSession();

  if (session) {
    redirect("/admin");
  }

  const params = await searchParams;
  const language = resolveAdminLanguage(params.lang);
  const loginTitle = adminText(language, "Website content manager", "لوحة إدارة محتوى الموقع");
  const loginDescription = adminText(
    language,
    "Sign in to update the homepage, programs, events, donation details, and contact information.",
    "سجّل الدخول لتحديث الصفحة الرئيسية والبرامج والفعاليات ومعلومات التبرع وبيانات التواصل.",
  );
  const invalidMessage = adminText(
    language,
    "We could not sign you in with that email and password. Please try again.",
    "تعذر تسجيل الدخول بهذا البريد الإلكتروني وكلمة المرور. يرجى المحاولة مرة أخرى.",
  );
  const defaultNext = params.next || withAdminLanguage("/admin", language);

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f4fbfc_0%,#eef8f8_45%,#ffffff_100%)] px-6 py-10">
      <div className="mx-auto flex max-w-6xl justify-end">
        <AdminLanguageToggle language={language} />
      </div>

      <div className="mx-auto mt-8 grid max-w-6xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-[2.25rem] border border-white/80 bg-white/88 p-8 shadow-[0_35px_90px_-55px_rgba(15,23,42,0.35)] sm:p-10">
          <AdminBrand language={language} />
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl">
            {loginTitle}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-8 text-slate-600">
            {loginDescription}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              {
                title: adminText(language, "Homepage", "الصفحة الرئيسية"),
                description: adminText(
                  language,
                  "Edit homepage sections and featured content.",
                  "تعديل أقسام الصفحة الرئيسية والمحتوى المميز.",
                ),
              },
              {
                title: adminText(language, "Collections", "المحتوى"),
                description: adminText(
                  language,
                  "Add, edit, and remove programs, projects, and events.",
                  "إضافة وتعديل وحذف البرامج والمشاريع والفعاليات.",
                ),
              },
              {
                title: adminText(language, "Key details", "البيانات المهمة"),
                description: adminText(
                  language,
                  "Keep donation and contact information up to date.",
                  "تحديث معلومات التبرع وبيانات التواصل بسهولة.",
                ),
              },
            ].map((item) => (
              <div key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-[linear-gradient(180deg,rgba(0,180,198,0.06),rgba(248,250,252,0.9))] p-5">
                <h2 className="text-base font-semibold text-slate-950">{item.title}</h2>
                <p className="mt-2 text-sm leading-7 text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          dir={adminDirection(language)}
          className="rounded-[2.25rem] border border-white/80 bg-white/95 p-8 shadow-[0_35px_90px_-55px_rgba(15,23,42,0.35)] sm:p-10"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary/75">
                {adminText(language, "Sign in", "تسجيل الدخول")}
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
                {adminText(language, "Access your control panel", "الدخول إلى لوحة التحكم")}
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {adminText(
                  language,
                  "Use your admin email and password to manage the website content.",
                  "استخدم بريد الإدارة وكلمة المرور لإدارة محتوى الموقع.",
                )}
              </p>
            </div>
          </div>

          {params.error === "invalid" ? (
          <div className="mt-6 rounded-[1.5rem] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {invalidMessage}
            </div>
          ) : null}

          <form action={loginAdmin} className="mt-8 space-y-5">
            <input type="hidden" name="next" value={defaultNext} />
            <input type="hidden" name="lang" value={language} />
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                {adminText(language, "Email address", "البريد الإلكتروني")}
              </label>
              <Input
                type="email"
                name="email"
                required
                dir="ltr"
                placeholder={adminText(language, "name@example.com", "name@example.com")}
                className="h-12 rounded-2xl bg-white px-4"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                {adminText(language, "Password", "كلمة المرور")}
              </label>
              <Input
                type="password"
                name="password"
                required
                dir="ltr"
                className="h-12 rounded-2xl bg-white px-4"
              />
            </div>
            <Button type="submit" className="mt-2 h-12 w-full rounded-full bg-primary px-6 hover:bg-[#0097A7]">
              {adminText(language, "Open admin panel", "فتح لوحة الإدارة")}
            </Button>
          </form>

          <p className="mt-5 text-xs leading-6 text-slate-500">
            {adminText(
              language,
              "This area is only for updating website content. The public website design stays unchanged.",
              "هذه المنطقة مخصصة فقط لتحديث محتوى الموقع. تصميم الموقع العام يبقى كما هو.",
            )}
          </p>
        </section>
      </div>
    </main>
  );
}
