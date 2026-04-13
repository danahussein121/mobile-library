import { NextResponse } from "next/server";
import { z } from "zod";

import { sendSiteEmail } from "@/lib/mailer";

const donateSchema = z.object({
  locale: z.enum(["en", "ar"]),
  name: z.string().min(2),
  amount: z.string().optional().default(""),
  transferDate: z.string().min(1),
  note: z.string().optional().default(""),
});

export async function POST(request: Request) {
  let locale: "en" | "ar" = "en";

  try {
    const body = await request.json();
    locale = body?.locale === "ar" ? "ar" : "en";
    const payload = donateSchema.parse(body);

    const subject = `[Mobile Library] Donation notification - ${payload.name}`;
    const text = [
      `Locale: ${payload.locale}`,
      `Name: ${payload.name}`,
      `Amount: ${payload.amount || "-"}`,
      `Transfer date: ${payload.transferDate}`,
      `Note: ${payload.note || "-"}`,
    ].join("\n");

    const html = `
      <h2>Mobile Library donation notification</h2>
      <p><strong>Locale:</strong> ${payload.locale}</p>
      <p><strong>Name:</strong> ${payload.name}</p>
      <p><strong>Amount:</strong> ${payload.amount || "-"}</p>
      <p><strong>Transfer date:</strong> ${payload.transferDate}</p>
      <p><strong>Note:</strong> ${payload.note || "-"}</p>
    `;

    await sendSiteEmail({
      subject,
      text,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Donate form submission failed:", error);

    return NextResponse.json(
      {
        message:
          error instanceof z.ZodError
            ? locale === "ar"
              ? "يرجى تعبئة جميع الحقول المطلوبة بشكل صحيح."
              : "Please complete all required fields correctly."
            : locale === "ar"
              ? "تعذر إرسال نموذج التبرع حاليًا."
              : "Unable to send the donation form right now.",
      },
      { status: 500 },
    );
  }
}
