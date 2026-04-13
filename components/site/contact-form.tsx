"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Locale } from "@/lib/i18n";

type ContactFormProps = {
  locale: Locale;
  labels: {
    title: string;
    description: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    submit: string;
  };
};

export function ContactForm({ locale, labels }: ContactFormProps) {
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
        email: String(formData.get("email") || ""),
        subject: String(formData.get("subject") || ""),
        message: String(formData.get("message") || ""),
      };

      const response = await fetch("/api/contact", {
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
              ? "تعذر إرسال الرسالة حاليًا."
              : "We could not send your message right now."),
        );
      }

      setSuccessMessage(
        locale === "ar"
          ? "تم إرسال رسالتك بنجاح. سنعود إليك قريبًا."
          : "Your message has been sent successfully. We will get back to you soon.",
      );
      const form = document.getElementById("contact-form") as HTMLFormElement | null;
      form?.reset();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : locale === "ar"
            ? "حدث خطأ غير متوقع أثناء الإرسال."
            : "An unexpected error occurred while sending your message.",
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
        id="contact-form"
        action={handleSubmit}
        className="mt-8 space-y-4"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            name="name"
            placeholder={labels.name}
            className="h-12 rounded-2xl"
            dir={locale === "ar" ? "rtl" : "ltr"}
            required
          />
          <Input
            name="email"
            type="email"
            placeholder={labels.email}
            className="h-12 rounded-2xl"
            dir="ltr"
            required
          />
        </div>
        <Input
          name="subject"
          placeholder={labels.subject}
          className="h-12 rounded-2xl"
          dir={locale === "ar" ? "rtl" : "ltr"}
          required
        />
        <Textarea
          name="message"
          placeholder={labels.message}
          className="min-h-40 rounded-2xl"
          dir={locale === "ar" ? "rtl" : "ltr"}
          required
        />

        {successMessage ? (
          <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {successMessage}
          </p>
        ) : null}

        {errorMessage ? (
          <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
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
