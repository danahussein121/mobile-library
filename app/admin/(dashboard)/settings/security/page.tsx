import { changeAdminPasswordFormAction } from "@/app/admin/actions";
import { AdminActionForm } from "@/components/admin/admin-action-form";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { Input } from "@/components/ui/input";

export default async function SecuritySettingsPage() {
  return (
    <div className="space-y-6 py-2">
      <AdminPageHeader
        eyebrow="Settings"
        title="Security"
        description="Change the password for the currently signed-in admin account."
      />

      <AdminActionForm
        action={changeAdminPasswordFormAction}
        title="Change password"
        description="Confirm your current password before setting a new one."
        submitLabel="Update"
        pendingLabel="Updating..."
        className="max-w-2xl"
      >
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
      </AdminActionForm>
    </div>
  );
}
