import "server-only";

import nodemailer from "nodemailer";

function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is not configured.`);
  }

  return value;
}

function getTransporter() {
  const port = Number(getRequiredEnv("SMTP_PORT"));

  return nodemailer.createTransport({
    host: getRequiredEnv("SMTP_HOST"),
    port,
    secure: port === 465,
    auth: {
      user: getRequiredEnv("SMTP_USER"),
      pass: getRequiredEnv("SMTP_PASS"),
    },
  });
}

export async function sendSiteEmail({
  subject,
  replyTo,
  text,
  html,
}: {
  subject: string;
  replyTo?: string;
  text: string;
  html: string;
}) {
  const transporter = getTransporter();

  await transporter.sendMail({
    from: getRequiredEnv("SMTP_USER"),
    to: getRequiredEnv("CONTACT_EMAIL_TO"),
    replyTo,
    subject,
    text,
    html,
  });
}
