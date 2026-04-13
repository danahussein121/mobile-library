import { NextResponse } from "next/server";
import { z } from "zod";

import { sendSiteEmail } from "@/lib/mailer";

const contactSchema = z.object({
  locale: z.enum(["en", "ar"]),
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(2),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  let locale: "en" | "ar" = "en";

  try {
    const body = await request.json();
    locale = body?.locale === "ar" ? "ar" : "en";
    const payload = contactSchema.parse(body);

    const subject = `[Mobile Library] Contact inquiry - ${payload.subject}`;
    const text = [
      `Locale: ${payload.locale}`,
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Subject: ${payload.subject}`,
      "",
      payload.message,
    ].join("\n");

    const html = `
      <h2>Mobile Library contact inquiry</h2>
      <p><strong>Locale:</strong> ${payload.locale}</p>
      <p><strong>Name:</strong> ${payload.name}</p>
      <p><strong>Email:</strong> ${payload.email}</p>
      <p><strong>Subject:</strong> ${payload.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${payload.message.replace(/\n/g, "<br />")}</p>
    `;

    await sendSiteEmail({
      subject,
      replyTo: payload.email,
      text,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form submission failed:", error);

    return NextResponse.json(
      {
        message:
          error instanceof z.ZodError
            ? locale === "ar"
              ? "يرجى تعبئة جميع الحقول المطلوبة بشكل صحيح."
              : "Please complete all required fields correctly."
            : locale === "ar"
              ? "تعذر إرسال نموذج التواصل حاليًا."
              : "Unable to send the contact form right now.",
      },
      { status: 500 },
    );
  }
}
