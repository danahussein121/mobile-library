import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/site/container";
import { FadeIn } from "@/components/site/fade-in";
import { buttonVariants } from "@/components/ui/button";
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

  return (
    <section className="py-20">
      <Container>
        <FadeIn>
          <div className="max-w-3xl rounded-[20px] bg-white p-10 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
              {copy.footer.privacyLabel}
            </p>
            <h1 className="mt-4 text-[42px] font-bold leading-[1.08] text-[#1A1A2E]">
              {copy.legal.privacyTitle}
            </h1>
            <p className="mt-4 text-base leading-8 text-[#666666]">{copy.legal.description}</p>
            <Link href={`/${locale}`} className={`${buttonVariants({ size: "lg" })} mt-8 inline-flex`}>
              {copy.legal.action}
            </Link>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
