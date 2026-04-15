import { notFound } from "next/navigation";

import { LegalPageContent } from "@/components/site/legal-page-content";
import { legalContent } from "@/data/legal-content";
import { publicSiteCopy } from "@/data/public-site";
import { isLocale } from "@/lib/i18n";

type PrivacyPolicyPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function PrivacyPolicyPage({ params }: PrivacyPolicyPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const copy = publicSiteCopy[locale];
  const legal = legalContent[locale].privacy;

  return (
    <LegalPageContent
      locale={locale}
      eyebrow={legal.eyebrow}
      title={legal.title}
      intro={legal.intro}
      noteTitle={legal.noteTitle}
      note={legal.note}
      sections={legal.sections}
      actionLabel={copy.legal.action}
    />
  );
}
