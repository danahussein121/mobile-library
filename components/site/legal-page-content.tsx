import Link from "next/link";

import { Container } from "@/components/site/container";
import { FadeIn } from "@/components/site/fade-in";
import { PageHero } from "@/components/site/page-hero";
import { buttonVariants } from "@/components/ui/button";

type LegalSection = {
  title: string;
  body: string;
};

export function LegalPageContent({
  locale,
  eyebrow,
  title,
  intro,
  noteTitle,
  note,
  sections,
  actionLabel,
}: {
  locale: "en" | "ar";
  eyebrow: string;
  title: string;
  intro: string;
  noteTitle: string;
  note: string;
  sections: LegalSection[];
  actionLabel: string;
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={intro} />

      <section className="py-20">
        <Container className="space-y-8">
          <FadeIn>
            <div className="rounded-[20px] border border-primary/15 bg-primary/8 px-6 py-5">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                {noteTitle}
              </p>
              <p className="mt-3 text-base leading-8 text-[#1A1A2E]">{note}</p>
            </div>
          </FadeIn>

          <div className="grid gap-6">
            {sections.map((section, index) => (
              <FadeIn key={section.title} delay={index * 0.06}>
                <div className="rounded-[20px] bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                  <h2 className="text-[28px] font-bold text-[#1A1A2E]">{section.title}</h2>
                  <p className="mt-4 text-base leading-8 text-[#666666]">{section.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <Link
              href={`/${locale}`}
              className={`${buttonVariants({ size: "lg" })} inline-flex`}
            >
              {actionLabel}
            </Link>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
