"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  CalendarDays,
  CreditCard,
  Globe,
  Grid2x2,
  Home,
  Layers3,
  type LucideIcon,
  Lock,
  Mail,
  Palette,
  PanelTop,
} from "lucide-react";

import { AdminBrand } from "@/components/admin/admin-brand";
import { AdminLanguageToggle } from "@/components/admin/admin-language-toggle";
import { adminDirection, type AdminLanguage } from "@/lib/admin-language";
import { cn } from "@/lib/utils";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  note?: string;
};

type NavSection = {
  title: string;
  items: NavItem[];
};

function buildHref(
  href: string,
  language: AdminLanguage,
  searchParams: ReturnType<typeof useSearchParams>,
) {
  const params = new URLSearchParams(searchParams.toString());
  params.set("lang", language);
  const search = params.toString();

  return search ? `${href}?${search}` : href;
}

function getNavSections(language: AdminLanguage): NavSection[] {
  if (language === "ar") {
    return [
      {
        title: "لوحة التحكم",
        items: [
          {
            href: "/admin",
            label: "الرئيسية",
            note: "ملخص سريع وأهم المهام",
            icon: Grid2x2,
          },
          {
            href: "/admin/settings/home",
            label: "الصفحة الرئيسية",
            note: "تعديل أقسام الصفحة الأولى",
            icon: Home,
          },
          {
            href: "/admin/programs",
            label: "البرامج",
            note: "إدارة بطاقات البرامج",
            icon: Layers3,
          },
          {
            href: "/admin/projects",
            label: "المشاريع",
            note: "إدارة المشاريع المعروضة",
            icon: PanelTop,
          },
          {
            href: "/admin/events",
            label: "الفعاليات",
            note: "تحديث الفعاليات والتواريخ",
            icon: CalendarDays,
          },
          {
            href: "/admin/settings/donation",
            label: "التبرع",
            note: "بيانات التحويل البنكي والتبرع",
            icon: CreditCard,
          },
          {
            href: "/admin/settings/contact",
            label: "التواصل",
            note: "بيانات التواصل العامة",
            icon: Mail,
          },
        ],
      },
      {
        title: "إعدادات إضافية",
        items: [
          {
            href: "/admin/settings/site",
            label: "الإعدادات",
            note: "اسم المشروع وروابط الموقع",
            icon: Palette,
          },
          {
            href: "/admin/settings/pages/about",
            label: "الصفحات",
            note: "عناوين ووصف الصفحات العامة",
            icon: Globe,
          },
          {
            href: "/admin/settings/security",
            label: "الأمان",
            note: "تغيير كلمة المرور",
            icon: Lock,
          },
        ],
      },
    ];
  }

  return [
    {
      title: "Control Panel",
      items: [
        {
          href: "/admin",
          label: "Dashboard",
          note: "Overview and important actions",
          icon: Grid2x2,
        },
        {
          href: "/admin/settings/home",
          label: "Homepage",
          note: "Edit the main homepage sections",
          icon: Home,
        },
        {
          href: "/admin/programs",
          label: "Programs",
          note: "Add and update program cards",
          icon: Layers3,
        },
        {
          href: "/admin/projects",
          label: "Projects",
          note: "Manage featured project stories",
          icon: PanelTop,
        },
        {
          href: "/admin/events",
          label: "Events",
          note: "Update events and dates",
          icon: CalendarDays,
        },
        {
          href: "/admin/settings/donation",
          label: "Donate",
          note: "Bank details and donation copy",
          icon: CreditCard,
        },
        {
          href: "/admin/settings/contact",
          label: "Contact",
          note: "Public contact information",
          icon: Mail,
        },
      ],
    },
    {
      title: "More",
      items: [
        {
          href: "/admin/settings/site",
          label: "Settings",
          note: "Site-wide labels and footer links",
          icon: Palette,
        },
        {
          href: "/admin/settings/pages/about",
          label: "Pages",
          note: "About and other public page intros",
          icon: Globe,
        },
        {
          href: "/admin/settings/security",
          label: "Security",
          note: "Update your password",
          icon: Lock,
        },
      ],
    },
  ];
}

export function AdminShell({
  children,
  userEmail,
  logoutAction,
}: {
  children: React.ReactNode;
  userEmail: string;
  logoutAction: (formData: FormData) => Promise<void>;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const language = searchParams.get("lang") === "ar" ? "ar" : "en";
  const navSections = getNavSections(language);

  return (
    <div
      dir={adminDirection(language)}
      className="min-h-screen bg-[linear-gradient(180deg,#f4fbfc_0%,#eef8f8_42%,#ffffff_100%)]"
    >
      <div className="mx-auto grid min-h-screen max-w-7xl gap-6 px-4 py-6 xl:grid-cols-[300px_1fr] xl:px-6">
        <aside className="rounded-[2rem] border border-white/80 bg-white/92 p-6 shadow-[0_30px_80px_-55px_rgba(15,23,42,0.35)] xl:sticky xl:top-6 xl:h-[calc(100vh-3rem)] xl:overflow-y-auto">
          <div className="mb-8">
            <AdminBrand language={language} compact />
            <div className="mt-5 rounded-[1.4rem] bg-[linear-gradient(180deg,rgba(0,180,198,0.08),rgba(0,180,198,0.03))] px-4 py-4">
              <p className="text-sm font-semibold text-slate-950">
                {language === "ar" ? "أنت مسجّل كمدير للمحتوى" : "You are signed in as a content manager"}
              </p>
              <p className="mt-1 text-sm leading-7 text-slate-600" dir="ltr">
              {userEmail}
              </p>
            </div>
            <AdminLanguageToggle language={language} className="mt-5" />
          </div>

          <div className="space-y-8">
            {navSections.map((section) => (
              <div key={section.title}>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                  {section.title}
                </p>
                <div className="space-y-2">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const active =
                      item.href === "/admin"
                        ? pathname === item.href
                        : pathname.startsWith(item.href);

                    return (
                      <Link
                        key={item.href}
                        href={buildHref(item.href, language, searchParams)}
                        className={cn(
                          "block rounded-[1.4rem] border px-4 py-3 transition-all",
                          active
                            ? "border-primary/20 bg-[linear-gradient(180deg,rgba(0,180,198,0.12),rgba(0,180,198,0.07))] text-slate-950 shadow-sm"
                            : "border-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-950",
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={cn(
                              "mt-0.5 flex size-9 items-center justify-center rounded-full",
                              active ? "bg-white text-primary" : "bg-slate-100 text-slate-600",
                            )}
                          >
                            <Icon className="size-4" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold">{item.label}</p>
                            {"note" in item && item.note ? (
                              <p className="mt-1 text-xs leading-5 text-slate-500">
                                {item.note}
                              </p>
                            ) : null}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-[1.5rem] border border-primary/10 bg-[linear-gradient(180deg,rgba(0,180,198,0.08),rgba(255,255,255,0.8))] p-4">
            <p className="text-sm font-semibold text-slate-950">
              {language === "ar" ? "قبل النشر" : "Before you publish"}
            </p>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              {language === "ar"
                ? "راجِع الإنجليزية والعربية معًا ثم استخدم رابط المعاينة داخل كل صفحة للتأكد من ظهور التحديثات كما تتوقع."
                : "Review English and Arabic together, then use the preview link on each page to confirm the update looks right on the live website."}
            </p>
          </div>

          <form action={logoutAction} className="mt-6">
            <button
              type="submit"
              className="w-full rounded-full bg-primary px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0097A7]"
            >
              {language === "ar" ? "تسجيل الخروج" : "Log Out"}
            </button>
          </form>
        </aside>

        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}
