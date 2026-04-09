import { HeartHandshake, Lightbulb, Rocket } from "lucide-react";
import { notFound } from "next/navigation";

import { Container } from "@/components/site/container";
import { FadeIn } from "@/components/site/fade-in";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { getSiteContent } from "@/data/site-content";
import { isLocale } from "@/lib/i18n";

const icons = [HeartHandshake, Lightbulb, Rocket];

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const content = getSiteContent(locale);

  return (
    <>
      <PageHero
        eyebrow={content.siteName}
        title={content.pages.about.title}
        description={content.pages.about.description}
      />

      <section className="pb-20 sm:pb-28">
        <Container className="space-y-20 sm:space-y-24">
          <FadeIn>
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <SectionHeading
                eyebrow={locale === "ar" ? "قصتنا" : "Our Story"}
                title={content.home.about.title}
                description={content.home.about.description}
              />
              <Card className="rounded-[2.25rem] border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(240,249,248,0.95))] shadow-[0_32px_90px_-55px_rgba(15,23,42,0.35)]">
                <CardContent className="p-8 sm:p-9">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/75 sm:text-sm">
                    {locale === "ar" ? "لماذا هذا المشروع مهم" : "Why this matters"}
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-3xl">
                    {locale === "ar"
                      ? "نقرب الكتاب من حياة الطفل اليومية"
                      : "We bring books into the rhythms of everyday life"}
                  </h2>
                  <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg sm:leading-9">
                    {locale === "ar"
                      ? "نؤمن أن الوصول إلى الكتاب يجب أن يكون حقًا قريبًا ومتاحًا، لا امتيازًا مرتبطًا بالمكان أو الظروف."
                      : "We believe access to books should feel close, visible, and possible for every child, regardless of geography or circumstance."}
                  </p>
                </CardContent>
              </Card>
            </div>
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-3">
            {content.home.missionCards.map((item, index) => {
              const Icon = icons[index];

              return (
                <FadeIn key={item.title} delay={index * 0.08}>
                  <Card className="group h-full rounded-[2rem] border-white/85 bg-white/92 shadow-[0_25px_70px_-52px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_35px_90px_-50px_rgba(15,23,42,0.42)]">
                    <CardContent className="p-7 sm:p-8">
                      <div className="flex size-12 items-center justify-center rounded-[1.35rem] bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-105 sm:size-[3.25rem]">
                        <Icon className="size-5" />
                      </div>
                      <h2 className="mt-6 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                        {item.title}
                      </h2>
                      <p className="mt-3 text-base leading-8 text-slate-600">{item.description}</p>
                    </CardContent>
                  </Card>
                </FadeIn>
              );
            })}
          </div>

          <FadeIn>
            <SectionHeading
              eyebrow={locale === "ar" ? "منهجية العمل" : "Approach"}
              title={content.home.howItWorks.title}
              description={content.home.howItWorks.description}
            />
          </FadeIn>
          <div className="grid gap-6 lg:grid-cols-3">
            {content.home.howItWorks.steps.map((step, index) => (
              <FadeIn key={step.title} delay={index * 0.08}>
                <Card className="group relative overflow-hidden rounded-[2.2rem] border-slate-200/70 bg-slate-950 text-white shadow-[0_34px_90px_-56px_rgba(15,23,42,0.7)] transition-transform duration-300 hover:-translate-y-1">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(45,212,191,0.2),transparent_48%)]" />
                  <CardContent className="relative p-7 sm:p-8">
                    <span className="text-sm font-semibold uppercase tracking-[0.2em] text-white/55">
                      0{index + 1}
                    </span>
                    <h3 className="mt-6 text-2xl font-semibold tracking-[-0.03em]">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-base leading-8 text-slate-300">{step.description}</p>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
