import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { Clapperboard, MapPin, Paintbrush, Theater } from "lucide-react";
import { notFound } from "next/navigation";

import { Container } from "@/components/site/container";
import { FadeIn } from "@/components/site/fade-in";
import { Card, CardContent } from "@/components/ui/card";
import { isLocale } from "@/lib/i18n";
import { getPublicEvents } from "@/lib/queries/events";

const eventTypes = {
  en: [
    {
      title: "Mobile Cinema Evening",
      description: "Outdoor screenings that gather children and families around educational and documentary storytelling.",
      icon: Clapperboard,
    },
    {
      title: "Interactive Puppet Theatre",
      description: "Live puppet performances and playful storytelling moments that invite children to participate.",
      icon: Theater,
    },
    {
      title: "Creative Crafts Day",
      description: "Hands-on workshops for drawing, crafts, and collaborative making designed for different age groups.",
      icon: Paintbrush,
    },
  ],
  ar: [
    {
      title: "أمسية السينما المتنقلة",
      description: "عروض خارجية تجمع الأطفال والعائلات حول أفلام تعليمية ووثائقية ملهمة.",
      icon: Clapperboard,
    },
    {
      title: "مسرح العرائس التفاعلي",
      description: "عروض حية ولحظات حكائية تفاعلية تدعو الأطفال للمشاركة والخيال.",
      icon: Theater,
    },
    {
      title: "يوم الأشغال الإبداعية",
      description: "ورش عملية للرسم والأشغال اليدوية وصناعة الأعمال الجماعية لفئات عمرية متنوعة.",
      icon: Paintbrush,
    },
  ],
};

type EventsPageProps = {
  params: Promise<{ locale: string }>;
};

function EventsGridSkeleton() {
  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-2">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card key={index} className="h-full animate-pulse">
          <div className="aspect-[1.45/1] rounded-t-xl bg-secondary" />
          <CardContent>
            <div className="h-8 w-32 rounded-full bg-secondary" />
            <div className="mt-5 h-6 w-2/3 rounded bg-secondary" />
            <div className="mt-3 h-4 w-1/2 rounded bg-secondary" />
            <div className="mt-4 space-y-3">
              <div className="h-4 rounded bg-secondary" />
              <div className="h-4 rounded bg-secondary" />
              <div className="h-4 w-3/4 rounded bg-secondary" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

async function EventsGrid({ locale }: { locale: "en" | "ar" }) {
  const isArabic = locale === "ar";
  const events = await getPublicEvents(locale);

  if (events.length === 0) {
    return (
      <FadeIn>
        <div className="mt-8 rounded-[20px] bg-secondary px-6 py-8 text-base text-[#666666]">
          {isArabic
            ? "لا توجد فعاليات قادمة حاليًا. عودوا لاحقًا لمعرفة الجديد."
            : "No upcoming events at the moment. Check back soon!"}
        </div>
      </FadeIn>
    );
  }

  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-2">
      {events.map((event, index) => (
        <FadeIn key={event.slug} delay={index * 0.08}>
          <Card className="h-full">
            <div className="relative aspect-[1.45/1] overflow-hidden rounded-t-xl">
              <Image
                src={event.image}
                alt={event.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {event.isTentative ? (
                <span className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-primary">
                  {isArabic ? "قريبًا" : "Coming Soon"}
                </span>
              ) : null}
            </div>
            <CardContent>
              <div className="inline-flex rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white">
                {event.date}
              </div>
              <h2 className="mt-5 text-lg font-bold text-[#1A1A2E]">{event.title}</h2>
              <div className="mt-3 flex items-center gap-2 text-sm text-[#666666]">
                <MapPin className="size-4 text-primary" />
                <span>{event.location}</span>
              </div>
              <p className="mt-4 text-base leading-8 text-[#666666]">{event.description}</p>
              <Link
                href={`/${locale}/contact`}
                className="mt-5 inline-flex text-sm font-semibold text-primary transition-colors hover:text-[#0097A7]"
              >
                {isArabic ? "اعرف المزيد" : "Learn more"}
              </Link>
            </CardContent>
          </Card>
        </FadeIn>
      ))}
    </div>
  );
}

export default async function EventsPage({ params }: EventsPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const isArabic = locale === "ar";

  return (
    <>
      <section className="bg-primary py-20 text-white">
        <Container>
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/80">
              {isArabic ? "الفعاليات" : "Events"}
            </p>
            <h1 className="mt-4 text-[42px] font-bold leading-[1.08] text-white sm:text-[48px]">
              {isArabic ? "الفعاليات القادمة" : "Upcoming Events"}
            </h1>
          </FadeIn>
        </Container>
      </section>

      <section className="py-20">
        <Container className="space-y-20">
          <div>
            <FadeIn>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                {isArabic ? "الفعاليات القادمة" : "Upcoming Events"}
              </p>
            </FadeIn>
            <Suspense fallback={<EventsGridSkeleton />}>
              <EventsGrid locale={locale} />
            </Suspense>
          </div>

          <div>
            <FadeIn>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                {isArabic ? "أنواع الفعاليات" : "Event Types"}
              </p>
              <h2 className="mt-3 text-[32px] font-bold text-[#1A1A2E]">
                {isArabic ? "ما الذي يمكن توقعه" : "What to Expect"}
              </h2>
            </FadeIn>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {eventTypes[locale].map((item, index) => {
                const Icon = item.icon;

                return (
                  <FadeIn key={item.title} delay={index * 0.08}>
                    <Card className="h-full">
                      <CardContent>
                        <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Icon className="size-5" />
                        </div>
                        <h3 className="mt-5 text-lg font-bold text-[#1A1A2E]">{item.title}</h3>
                        <p className="mt-3 text-base leading-8 text-[#666666]">{item.description}</p>
                      </CardContent>
                    </Card>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
