import Link from "next/link";
import {
  CalendarPlus2,
  CircleDollarSign,
  Layers3,
  MessageSquareText,
  PencilLine,
  RefreshCw,
} from "lucide-react";

import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { db } from "@/lib/db";

function StatCard({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-[1.75rem] border border-white/80 bg-white/90 p-6 shadow-[0_25px_70px_-55px_rgba(15,23,42,0.3)] transition-transform hover:-translate-y-1"
    >
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-slate-950">
        {value}
      </p>
    </Link>
  );
}

export default async function AdminDashboardPage() {
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
      href: "/admin/events",
      label: "Add New Event",
      description: "Create the next public event card",
      icon: CalendarPlus2,
    },
    {
      href: "/admin/programs",
      label: "Add New Program",
      description: "Update cards shown on Services",
      icon: Layers3,
    },
    {
      href: "/admin/settings/home",
      label: "Edit Homepage Content",
      description: "Adjust hero text and homepage sections",
      icon: PencilLine,
    },
    {
      href: "/admin/settings/donation",
      label: "Edit Bank Details",
      description: "Update bank transfer and donation info",
      icon: CircleDollarSign,
    },
  ];

  return (
    <div className="space-y-6 py-2">
      <AdminPageHeader
        eyebrow="Dashboard"
        title="Manage website content"
        description="Use the admin panel to update public content without changing the website design. Collections, homepage blocks, donation details, and contact information are all managed here."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Programs" value={String(programs)} href="/admin/programs" />
        <StatCard label="Projects" value={String(projects)} href="/admin/projects" />
        <StatCard label="Events" value={String(events)} href="/admin/events" />
        <StatCard label="Static pages" value={String(pages)} href="/admin/settings/pages/about" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
        <section className="rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_25px_70px_-55px_rgba(15,23,42,0.3)]">
          <div className="mb-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/75">
              Quick Actions
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
              Jump into the most common tasks
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
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
                    {action.label}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {action.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_25px_70px_-55px_rgba(15,23,42,0.3)]">
          <div className="mb-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/75">
              Site Status
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
              At-a-glance summary
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3 rounded-[1.5rem] bg-slate-50 px-4 py-4">
              <RefreshCw className="mt-0.5 size-4 text-primary" />
              <div>
                <p className="text-sm font-semibold text-slate-950">Last updated</p>
                <p className="mt-1 text-sm text-slate-600">
                  {lastUpdatedAt ? lastUpdatedAt.toLocaleString() : "No recent updates yet"}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-[1.5rem] bg-slate-50 px-4 py-4">
              <Layers3 className="mt-0.5 size-4 text-primary" />
              <div>
                <p className="text-sm font-semibold text-slate-950">Total programs</p>
                <p className="mt-1 text-sm text-slate-600">{programs}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-[1.5rem] bg-slate-50 px-4 py-4">
              <CalendarPlus2 className="mt-0.5 size-4 text-primary" />
              <div>
                <p className="text-sm font-semibold text-slate-950">Upcoming events</p>
                <p className="mt-1 text-sm text-slate-600">{upcomingEvents}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-[1.5rem] bg-slate-50 px-4 py-4">
              <MessageSquareText className="mt-0.5 size-4 text-primary" />
              <div>
                <p className="text-sm font-semibold text-slate-950">Unread messages</p>
                <p className="mt-1 text-sm text-slate-600">0</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
