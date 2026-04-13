import Link from "next/link";

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
  const [programs, projects, events, pages] = await Promise.all([
    db.program.count(),
    db.project.count(),
    db.event.count(),
    db.pageContent.count(),
  ]);

  return (
    <div className="py-2">
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
    </div>
  );
}
