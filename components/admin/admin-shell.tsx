import Link from "next/link";

const navSections = [
  {
    title: "Content",
    items: [
      { href: "/admin", label: "Overview" },
      { href: "/admin/programs", label: "Programs" },
      { href: "/admin/projects", label: "Projects" },
      { href: "/admin/events", label: "Events" },
    ],
  },
  {
    title: "Settings",
    items: [
      { href: "/admin/settings/site", label: "Site Settings" },
      { href: "/admin/settings/home", label: "Homepage" },
      { href: "/admin/settings/pages/about", label: "About Page Intro" },
      { href: "/admin/settings/pages/donate", label: "Donate Page Intro" },
      { href: "/admin/settings/pages/contact", label: "Contact Page Intro" },
      { href: "/admin/settings/donation", label: "Donation Settings" },
      { href: "/admin/settings/contact", label: "Contact Information" },
      { href: "/admin/settings/security", label: "Security" },
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
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f7fbfb_0%,#eff7f7_52%,#ffffff_100%)]">
      <div className="mx-auto grid min-h-screen max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[280px_1fr] lg:px-6">
        <aside className="rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_30px_80px_-55px_rgba(15,23,42,0.35)]">
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
                  {section.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-950"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
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
