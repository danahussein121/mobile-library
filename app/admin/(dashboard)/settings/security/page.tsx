import { changeAdminPassword } from "@/app/admin/actions";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { Input } from "@/components/ui/input";

function getMessage(error?: string, success?: string) {
  if (success === "1") {
    return {
      tone: "success" as const,
      text: "Password updated successfully.",
    };
  }

  switch (error) {
    case "current":
      return {
        tone: "error" as const,
        text: "Current password is incorrect.",
      };
    case "length":
      return {
        tone: "error" as const,
        text: "New password must be at least 8 characters.",
      };
    case "match":
      return {
        tone: "error" as const,
        text: "New password and confirmation do not match.",
      };
    case "same":
      return {
        tone: "error" as const,
        text: "New password must be different from the current password.",
      };
    default:
      return null;
  }
}

export default async function SecuritySettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; success?: string }>;
}) {
  const params = await searchParams;
  const message = getMessage(params.error, params.success);

  return (
    <div className="space-y-6 py-2">
      <AdminPageHeader
        eyebrow="Settings"
        title="Security"
        description="Change the password for the currently signed-in admin account."
      />

      <form
        action={changeAdminPassword}
        className="max-w-2xl rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_25px_70px_-55px_rgba(15,23,42,0.3)]"
      >
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950">
              Change password
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Confirm your current password before setting a new one.
            </p>
          </div>
          <button
            type="submit"
            className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
          >
            Update
          </button>
        </div>

        {message ? (
          <div
            className={`mb-5 rounded-2xl px-4 py-3 text-sm ${
              message.tone === "success"
                ? "bg-emerald-50 text-emerald-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {message.text}
          </div>
        ) : null}

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Current password
            </label>
            <Input
              type="password"
              name="currentPassword"
              required
              className="h-11 rounded-2xl bg-white px-4"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              New password
            </label>
            <Input
              type="password"
              name="newPassword"
              required
              minLength={8}
              className="h-11 rounded-2xl bg-white px-4"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Confirm new password
            </label>
            <Input
              type="password"
              name="confirmPassword"
              required
              minLength={8}
              className="h-11 rounded-2xl bg-white px-4"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
