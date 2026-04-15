"use client";

import { useActionState, useEffect, useState } from "react";
import { AlertTriangle, Loader2, Trash2, X } from "lucide-react";

import {
  initialAdminActionState,
  type AdminActionState,
} from "@/components/admin/action-state";
import { adminText, type AdminLanguage } from "@/lib/admin-language";

type AdminFormAction = (
  state: AdminActionState,
  formData: FormData,
) => Promise<AdminActionState>;

export function DeleteConfirmationForm({
  action,
  id,
  itemName,
  lang = "en",
}: {
  action: AdminFormAction;
  id: string;
  itemName: string;
  lang?: AdminLanguage;
}) {
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(action, initialAdminActionState);

  useEffect(() => {
    if (state.status === "success") {
      const timer = window.setTimeout(() => setOpen(false), 1000);
      return () => window.clearTimeout(timer);
    }
  }, [state.status]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition-colors hover:bg-red-100"
      >
        {adminText(lang, "Delete", "حذف")}
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4">
          <div
            dir={lang === "ar" ? "rtl" : "ltr"}
            className="w-full max-w-md rounded-[1.75rem] border border-white/60 bg-white p-6 shadow-[0_30px_80px_-35px_rgba(15,23,42,0.45)]"
          >
            <div className="mb-5 h-1.5 w-20 rounded-full bg-[linear-gradient(90deg,#ef4444,#fca5a5)]" />
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="flex size-11 items-center justify-center rounded-full bg-red-100 text-red-700">
                  <AlertTriangle className="size-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-950">
                    {adminText(lang, "Confirm deletion", "تأكيد الحذف")}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {adminText(
                      lang,
                      `Are you sure you want to delete "${itemName}"? This action removes it from the website.`,
                      `هل أنت متأكد من حذف "${itemName}"؟ سيتم إزالة هذا العنصر من الموقع.`,
                    )}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
                aria-label={adminText(lang, "Close", "إغلاق")}
              >
                <X className="size-4" />
              </button>
            </div>

            {state.status === "success" ? (
              <p className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {adminText(
                  lang,
                  "Item deleted successfully. The page will refresh now.",
                  "تم حذف العنصر بنجاح. سيتم تحديث الصفحة الآن.",
                )}
              </p>
            ) : null}

            {state.status === "error" ? (
              <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {state.message}
              </p>
            ) : null}

            <form action={formAction} className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <input type="hidden" name="id" value={id} />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                {adminText(lang, "Cancel", "إلغاء")}
              </button>
              <button
                type="submit"
                disabled={pending}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {pending ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
                {pending
                  ? adminText(lang, "Deleting...", "جارٍ الحذف...")
                  : adminText(lang, "Delete now", "تأكيد الحذف")}
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
