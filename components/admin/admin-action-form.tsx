"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

import {
  initialAdminActionState,
  type AdminActionState,
} from "@/components/admin/action-state";
import { cn } from "@/lib/utils";

type AdminFormAction = (
  state: AdminActionState,
  formData: FormData,
) => Promise<AdminActionState>;

function SubmitButton({
  label,
  pendingLabel,
}: {
  label: string;
  pendingLabel?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? <Loader2 className="size-4 animate-spin" /> : null}
      {pending ? pendingLabel ?? "Saving..." : label}
    </button>
  );
}

export function AdminActionForm({
  action,
  title,
  description,
  submitLabel = "Save",
  pendingLabel,
  children,
  className,
}: {
  action: AdminFormAction;
  title: string;
  description: string;
  submitLabel?: string;
  pendingLabel?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const [state, formAction] = useActionState(action, initialAdminActionState);

  return (
    <form
      action={formAction}
      className={cn(
        "rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_25px_70px_-55px_rgba(15,23,42,0.3)]",
        className,
      )}
    >
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950">
            {title}
          </h2>
          <p className="mt-1 text-sm leading-7 text-slate-600">{description}</p>
        </div>
        <SubmitButton label={submitLabel} pendingLabel={pendingLabel} />
      </div>

      {state.status !== "idle" ? (
        <div
          className={cn(
            "mb-6 rounded-[1.5rem] border px-4 py-3 text-sm",
            state.status === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-red-200 bg-red-50 text-red-700",
          )}
        >
          <div className="flex items-start gap-3">
            {state.status === "success" ? (
              <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
            ) : (
              <AlertCircle className="mt-0.5 size-4 shrink-0" />
            )}
            <div>
              <p className="font-semibold">{state.message}</p>
              {state.status === "success" && state.liveMessage ? (
                <p className="mt-1 text-emerald-700/90">
                  {state.liveMessage} {"\u2713"}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      {children}
    </form>
  );
}
