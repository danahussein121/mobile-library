import Image from "next/image";
import { notFound } from "next/navigation";

import { Container } from "@/components/site/container";
import { FadeIn } from "@/components/site/fade-in";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { getSiteContent } from "@/data/site-content";
import { isLocale } from "@/lib/i18n";

type ProgramsPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ProgramsPage({ params }: ProgramsPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const content = getSiteContent(locale);

  return (
    <>
      <PageHero
        eyebrow={content.siteName}
        title={content.pages.programs.title}
        description={content.pages.programs.description}
      />

      <section className="pb-20 sm:pb-28">
        <Container className="space-y-20 sm:space-y-24">
          <FadeIn>
            <SectionHeading
              eyebrow={locale === "ar" ? "الأنشطة الأساسية" : "Core activities"}
              title={content.home.programs.title}
              description={content.home.programs.description}
            />
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-2">
            {content.home.programs.items.map((program, index) => (
              <FadeIn key={program.title} delay={index * 0.08}>
                <Card className="group overflow-hidden rounded-[2.1rem] border-white/85 bg-white shadow-[0_28px_75px_-52px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_40px_100px_-50px_rgba(15,23,42,0.42)]">
                  <div className="grid gap-0 lg:grid-cols-[0.42fr_1fr]">
                    <div className="relative min-h-72 overflow-hidden">
                      <Image
                        src={program.image}
                        alt={program.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/28 via-transparent to-white/10" />
                    </div>
                    <CardContent className="flex items-center p-7 sm:p-8 lg:p-9">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/75 sm:text-sm">
                          {locale === "ar" ? "برنامج ميداني" : "Field program"}
                        </p>
                        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-slate-950">
                          {program.title}
                        </h2>
                        <p className="mt-4 text-base leading-8 text-slate-600">
                          {program.description}
                        </p>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <Card className="rounded-[2.25rem] border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(240,249,248,0.95))] shadow-[0_32px_90px_-55px_rgba(15,23,42,0.35)]">
              <CardContent className="grid gap-6 p-8 sm:p-9 lg:grid-cols-3">
                {content.home.howItWorks.steps.map((step, index) => (
                  <div key={step.title}>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/75 sm:text-sm">
                      0{index + 1}
                    </p>
                    <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-base leading-8 text-slate-600">{step.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
