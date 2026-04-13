"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Locale } from "@/lib/i18n";

type DonateFormProps = {
  locale: Locale;
  labels: {
    title: string;
    description: string;
    name: string;
    amount: string;
    note: string;
    transferDate: string;
    submit: string;
  };
};

export function DonateForm({ locale, labels }: DonateFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const payload = {
        locale,
        name: String(formData.get("name") || ""),
        amount: String(formData.get("amount") || ""),
        transferDate: String(formData.get("transferDate") || ""),
        note: String(formData.get("note") || ""),
      };

      const response = await fetch("/api/donate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(
          result.message ||
            (locale === "ar"
              ? "تعذر إرسال بيانات التبرع حاليًا."
              : "We could not submit your donation details right now."),
        );
      }

      setSuccessMessage(
        locale === "ar"
          ? "تم استلام بيانات التبرع بنجاح. شكرًا لدعمكم."
          : "Your donation details were received successfully. Thank you for your support.",
      );
      const form = document.getElementById("donate-form") as HTMLFormElement | null;
      form?.reset();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : locale === "ar"
            ? "حدث خطأ غير متوقع أثناء الإرسال."
            : "An unexpected error occurred while submitting your details.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <h2 className="text-3xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-[2.15rem]">
        {labels.title}
      </h2>
      <p className="mt-4 text-base leading-8 text-slate-600">{labels.description}</p>

      <form
        id="donate-form"
        action={handleSubmit}
        className="mt-8 space-y-4"
      >
        <Input
          name="name"
          placeholder={labels.name}
          className="h-12 rounded-xl"
          dir={locale === "ar" ? "rtl" : "ltr"}
          required
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            name="amount"
            placeholder={labels.amount}
            className="h-12 rounded-xl"
            dir="ltr"
          />
          <Input
            name="transferDate"
            type="date"
            placeholder={labels.transferDate}
            className="h-12 rounded-xl"
            dir="ltr"
            required
          />
        </div>
        <Textarea
          name="note"
          placeholder={labels.note}
          className="min-h-36 rounded-xl"
          dir={locale === "ar" ? "rtl" : "ltr"}
        />

        {successMessage ? (
          <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {successMessage}
          </p>
        ) : null}

        {errorMessage ? (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </p>
        ) : null}

        <Button disabled={isSubmitting} className="h-12 rounded-full px-6">
          {isSubmitting
            ? locale === "ar"
              ? "جارٍ الإرسال..."
              : "Sending..."
            : labels.submit}
        </Button>
      </form>
    </>
  );
}
