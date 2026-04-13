import { notFound, redirect } from "next/navigation";

import { isLocale } from "@/lib/i18n";

type ProgramsPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ProgramsPage({ params }: ProgramsPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  redirect(`/${locale}/services`);
}
