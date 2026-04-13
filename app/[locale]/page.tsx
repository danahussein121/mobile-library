import { notFound } from "next/navigation";

import { HomePage } from "@/components/site/home-page";
import { isLocale } from "@/lib/i18n";

type LocaleHomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LocaleHomePage({ params }: LocaleHomePageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <HomePage locale={locale} />;
}
