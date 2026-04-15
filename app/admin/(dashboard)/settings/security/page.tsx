import { changeAdminPasswordFormAction } from "@/app/admin/actions";
import { AdminActionForm } from "@/components/admin/admin-action-form";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { Input } from "@/components/ui/input";
import { adminText, resolveAdminLanguage } from "@/lib/admin-language";

export default async function SecuritySettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const params = await searchParams;
  const lang = resolveAdminLanguage(params.lang);

  return (
    <div className="space-y-6 py-2">
      <AdminPageHeader
        lang={lang}
        eyebrow="Settings"
        eyebrowAr="الإعدادات"
        title="Security"
        titleAr="الأمان"
        description="Change the password for the currently signed-in admin account."
        descriptionAr="تغيير كلمة المرور الخاصة بحساب الإدارة الحالي."
      />

      <AdminActionForm
        action={changeAdminPasswordFormAction}
        lang={lang}
        title="Change password"
        titleAr="تغيير كلمة المرور"
        description="Confirm your current password before setting a new one."
        descriptionAr="أكّد كلمة المرور الحالية قبل تعيين كلمة مرور جديدة."
        submitLabel={adminText(lang, "Update password", "تحديث كلمة المرور")}
        pendingLabel="Updating..."
        className="max-w-2xl"
      >
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              {adminText(lang, "Current password", "كلمة المرور الحالية")}
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
              {adminText(lang, "New password", "كلمة المرور الجديدة")}
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
              {adminText(lang, "Confirm new password", "تأكيد كلمة المرور الجديدة")}
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
