"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  CreditCard,
  Globe,
  Grid2x2,
  Home,
  ImageIcon,
  Layers3,
  type LucideIcon,
  Lock,
  Mail,
  Palette,
  PanelTop,
} from "lucide-react";

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
  disabledItem?: {
    label: string;
    tooltip: string;
  };
};

const navSections: NavSection[] = [
  {
    title: "Content",
    items: [
      {
        href: "/admin",
        label: "Dashboard",
        note: "Overview, quick actions, and site status",
        icon: Grid2x2,
      },
      {
        href: "/admin/programs",
        label: "Programs & Services",
        note: "Shown on /services page",
        icon: Layers3,
      },
      {
        href: "/admin/events",
        label: "Events",
        note: "Shown on /events page and homepage",
        icon: CalendarDays,
      },
    ],
    disabledItem: {
      label: "Projects",
      tooltip: "Projects (hidden from public site)",
    },
  },
  {
    title: "Settings",
    items: [
      { href: "/admin/settings/site", label: "Branding & Logo", icon: Palette },
      { href: "/admin/settings/home", label: "Homepage Content", icon: Home },
      { href: "/admin/settings/pages/about", label: "About Page", icon: PanelTop },
      { href: "/admin/settings/pages/services", label: "Services Page", icon: Layers3 },
      { href: "/admin/settings/pages/donate", label: "Donate Page", icon: CreditCard },
      { href: "/admin/settings/pages/contact", label: "Contact Page", icon: Mail },
      { href: "/admin/settings/donation", label: "Bank & Donation Info", icon: CreditCard },
      { href: "/admin/settings/contact", label: "Contact Details", icon: Globe },
      { href: "/admin/settings/security", label: "Security", icon: Lock },
    ],
  },
];

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

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f7fbfb_0%,#eff7f7_52%,#ffffff_100%)]">
      <div className="mx-auto grid min-h-screen max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[280px_1fr] lg:px-6">
        <aside className="rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_30px_80px_-55px_rgba(15,23,42,0.35)] lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)] lg:overflow-y-auto">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary/75">
              Admin
            </p>
            <h1 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
              Mobile Library
            </h1>
            <p className="mt-2 text-sm leading-7 text-slate-600">{userEmail}</p>
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
                        href={item.href}
                        className={cn(
                          "block rounded-[1.4rem] border px-4 py-3 transition-colors",
                          active
                            ? "border-primary/20 bg-primary/10 text-slate-950"
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
                {section.disabledItem ? (
                  <div
                    title={section.disabledItem.tooltip}
                    className="mt-2 rounded-[1.4rem] border border-dashed border-slate-200 bg-slate-50 px-4 py-3 text-slate-400"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex size-9 items-center justify-center rounded-full bg-white text-slate-400">
                        <ImageIcon className="size-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">
                          {section.disabledItem.label}
                        </p>
                        <p className="mt-1 text-xs leading-5">
                          {section.disabledItem.tooltip}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>

          <form action={logoutAction} className="mt-10">
            <button
              type="submit"
              className="w-full rounded-full bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
            >
              Log Out
            </button>
          </form>
        </aside>

        <main>{children}</main>
      </div>
    </div>
  );
}
