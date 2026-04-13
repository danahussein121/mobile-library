import Image from "next/image";
import { notFound } from "next/navigation";

import { Container } from "@/components/site/container";
import { FadeIn } from "@/components/site/fade-in";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { getManagedSiteContent } from "@/data/site-content.server";
import { isLocale } from "@/lib/i18n";

type EventsPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function EventsPage({ params }: EventsPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const content = await getManagedSiteContent(locale);

  return (
    <>
      <PageHero
        eyebrow={content.siteName}
        title={content.pages.events.title}
        description={content.pages.events.description}
      />

      <section className="pb-20 sm:pb-28">
        <Container className="space-y-12">
          <FadeIn>
            <SectionHeading
              eyebrow={locale === "ar" ? "فعاليات قريبة" : "Upcoming moments"}
              title={content.home.events.title}
              description={content.home.events.description}
            />
          </FadeIn>

          {content.home.events.items.map((event, index) => (
            <FadeIn key={event.title} delay={index * 0.08}>
              <Card className="group overflow-hidden rounded-[2.15rem] border-white/85 bg-white shadow-[0_28px_75px_-52px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_38px_100px_-50px_rgba(15,23,42,0.4)]">
                <div className="grid gap-0 lg:grid-cols-[0.34fr_1fr]">
                  <div className="relative min-h-72 overflow-hidden">
                    <Image
                      src={event.image}
                      alt={event.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 34vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/28 via-transparent to-white/10" />
                  </div>
                  <CardContent className="flex items-center p-8 sm:p-10">
                    <div className="max-w-2xl">
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/75 sm:text-sm">
                        {event.date}
                      </p>
                      <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-[2.15rem]">
                        {event.title}
                      </h2>
                      <p className="mt-4 text-base leading-8 text-slate-600">
                        {event.description}
                      </p>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </FadeIn>
          ))}
        </Container>
      </section>
    </>
  );
}
