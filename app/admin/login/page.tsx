import { redirect } from "next/navigation";

import { loginAdmin } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAdminSession } from "@/lib/admin-auth";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const session = await getAdminSession();

  if (session) {
    redirect("/admin");
  }

  const params = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,#f7fbfb_0%,#eff7f7_52%,#ffffff_100%)] px-6 py-12">
      <div className="w-full max-w-lg rounded-[2.25rem] border border-white/80 bg-white/90 p-8 shadow-[0_35px_90px_-55px_rgba(15,23,42,0.35)] sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary/75">
          Admin Access
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-slate-950">
          Sign in to the dashboard
        </h1>
        <p className="mt-4 text-base leading-8 text-slate-600">
          Manage bilingual website content, collections, and settings from one
          place.
        </p>

        {params.error === "invalid" ? (
          <div className="mt-6 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
            Invalid email or password.
          </div>
        ) : null}

        <form action={loginAdmin} className="mt-8 space-y-4">
          <input type="hidden" name="next" value={params.next || "/admin"} />
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
            <Input
              type="email"
              name="email"
              required
              className="h-12 rounded-2xl bg-white px-4"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
            <Input
              type="password"
              name="password"
              required
              className="h-12 rounded-2xl bg-white px-4"
            />
          </div>
          <Button type="submit" className="mt-2 h-12 w-full rounded-full px-6">
            Sign In
          </Button>
        </form>
      </div>
    </main>
  );
}
