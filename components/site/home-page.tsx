import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { BookOpen, CalendarDays, Heart, MapPin, Users } from "lucide-react";

import { Container } from "@/components/site/container";
import { FadeIn } from "@/components/site/fade-in";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Locale } from "@/lib/i18n";
import { getPublicHomeContent } from "@/lib/queries/content";
import { getPublicEvents } from "@/lib/queries/events";
import { cn } from "@/lib/utils";

const heroImage = "/images/bus-exterior-branded.jpg";

function DecorativeBook({
  className,
  rotate,
}: {
  className: string;
  rotate: string;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      style={{ transform: rotate }}
    >
      <path
        d="M18 14c-4.4 0-8 3.6-8 8v28c0-3.3 2.7-6 6-6h18V14H18Z"
        fill="#C9A84C"
        opacity="0.88"
      />
      <path
        d="M46 14c4.4 0 8 3.6 8 8v28c0-3.3-2.7-6-6-6H30V14h16Z"
        fill="#C9A84C"
      />
      <path d="M32 14v30" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function EventsPreviewSkeleton() {
  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-2">
      {Array.from({ length: 2 }).map((_, index) => (
        <Card key={index} className="h-full animate-pulse">
          <div className="aspect-[1.5/1] rounded-t-xl bg-secondary" />
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

async function HomeEventsPreview({
  locale,
  scheduleLabel,
}: {
  locale: Locale;
  scheduleLabel: string;
}) {
  const events = (await getPublicEvents(locale)).slice(0, 2);

  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-2">
      {events.map((event, index) => (
        <FadeIn key={event.slug} delay={index * 0.08}>
          <Card className="h-full">
            <div className="relative aspect-[1.5/1] overflow-hidden rounded-t-xl">
              <Image
                src={event.image}
                alt={event.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <span className="absolute left-4 top-4 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white">
                {event.date}
              </span>
              {event.isTentative ? (
                <span className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-primary">
                  {locale === "ar" ? "قريبًا" : "Coming Soon"}
                </span>
              ) : null}
            </div>
            <CardContent>
              <h3 className="text-lg font-bold text-[#1A1A2E]">{event.title}</h3>
              <div className="mt-3 flex items-center gap-2 text-sm text-[#666666]">
                <MapPin className="size-4 text-primary" />
                <span>{event.location}</span>
              </div>
              <p className="mt-4 text-base leading-8 text-[#666666]">{event.description}</p>
              <Link
                href={`/${locale}/events`}
                className="mt-5 inline-flex text-sm font-semibold text-primary transition-colors hover:text-[#0097A7]"
              >
                {scheduleLabel}
              </Link>
            </CardContent>
          </Card>
        </FadeIn>
      ))}
    </div>
  );
}

export async function HomePage({ locale }: { locale: Locale }) {
  const isArabic = locale === "ar";
  const fallbackCopy = isArabic
    ? {
        eyebrow: "مبادرة ثقافية متنقلة",
        title: "نوصل فرحة القراءة لكل طفل",
        description: "مكتبة متنقلة تنقل المعرفة والإبداع إلى قلب مجتمعك",
        cta: "ادعم مهمتنا",
        secondaryCta: "استكشف الخدمات",
        missionEyebrow: "مهمتنا",
        missionTitle: "نؤمن أن كل طفل يستحق الوصول إلى الكتب",
        missionDescription:
          "تجسر مكتبتنا المتنقلة الفجوة أمام المجتمعات الأقل حظًا، من خلال توفير مصادر تعليمية وجلسات حكاية ومساحة آمنة تزدهر فيها المخيلة.",
        eventsTitle: "الفعاليات القادمة",
        eventsDescription: "اطلع على المحطات المعلنة حاليًا وتواصل معنا لتأكيد المشاركة أو الاستضافة.",
        viewAll: "عرض جميع الفعاليات",
        scheduleLabel: "عرض الجدول",
        donateTitle: "ساعدنا على إبقاء العجلات تدور",
        donateDescription:
          "يدعم تبرعك تشغيل الحافلة وشراء كتب جديدة وتمويل برامج تعليمية للأطفال الأكثر احتياجًا.",
        donateButton: "تبرع الآن",
        missionCards: [
          {
            title: "الوصول إلى الكتب",
            description: "مجموعات مختارة لكل الأعمار تصل مباشرة إلى الأحياء والمجتمعات.",
          },
          {
            title: "فعاليات مجتمعية",
            description: "جلسات قراءة وورش تفاعلية تجمع الأطفال والعائلات حول المعرفة.",
          },
          {
            title: "زيارات منتظمة",
            description: "جداول ثابتة تمنح الأطفال موعدًا متكررًا مع القراءة والإبداع.",
          },
        ],
      }
    : {
        eyebrow: "Mobile Cultural Initiative",
        title: "Bringing the Joy of Reading to Every Child",
        description: "A mobile library on wheels, spreading the joy of reading across communities",
        cta: "Support Our Mission",
        secondaryCta: "Explore Programs",
        missionEyebrow: "Our Mission",
        missionTitle: "We believe every child deserves access to books",
        missionDescription:
          "Our mobile library bridges the gap for underserved communities, providing educational resources, storytelling sessions, and a safe space for imagination to flourish.",
        eventsTitle: "Upcoming Events",
        eventsDescription: "See the currently announced stops and contact us to confirm attendance or hosting details.",
        viewAll: "View all events",
        scheduleLabel: "View schedule",
        donateTitle: "Help Us Keep the Wheels Turning",
        donateDescription:
          "Your donation fuels our bus, buys new books, and supports educational programs for children who need them most.",
        donateButton: "Donate Now",
        missionCards: [
          {
            title: "Access to Books",
            description:
              "Curated collections for all ages, brought directly to neighborhoods.",
          },
          {
            title: "Community Events",
            description:
              "Interactive readings and workshops that bring people together.",
          },
          {
            title: "Regular Visits",
            description:
              "Consistent schedules so children always have something to look forward to.",
          },
        ],
      };
  const homeContent = await getPublicHomeContent(locale, {
    hero: {
      eyebrow: fallbackCopy.eyebrow,
      title: fallbackCopy.title,
      description: fallbackCopy.description,
      cta: fallbackCopy.cta,
      secondaryCta: fallbackCopy.secondaryCta,
      image: heroImage,
      imageAlt: isArabic
        ? "حافلة المكتبة المتنقلة المخصصة والمفتوحة من الجانب"
        : "Branded Mobile Library van with open shelves",
    },
    mission: {
      eyebrow: fallbackCopy.missionEyebrow,
      title: fallbackCopy.missionTitle,
      description: fallbackCopy.missionDescription,
      cards: fallbackCopy.missionCards,
    },
    donateCta: {
      title: fallbackCopy.donateTitle,
      description: fallbackCopy.donateDescription,
      button: fallbackCopy.donateButton,
    },
  });
  const copy = {
    ...fallbackCopy,
    eyebrow: homeContent.hero.eyebrow,
    title: homeContent.hero.title,
    description: homeContent.hero.description,
    cta: homeContent.hero.cta,
    secondaryCta: homeContent.hero.secondaryCta,
    missionEyebrow: homeContent.mission.eyebrow,
    missionTitle: homeContent.mission.title,
    missionDescription: homeContent.mission.description,
    donateTitle: homeContent.donateCta.title,
    donateDescription: homeContent.donateCta.description,
    donateButton: homeContent.donateCta.button,
  };
  const missionCards = homeContent.mission.cards.map((item, index) => ({
    ...item,
    icon: [BookOpen, Users, CalendarDays][index] ?? BookOpen,
  }));

  return (
    <div className="pb-20">
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#ffffff_72%,#f0fafb_100%)] py-14 sm:py-20">
        <DecorativeBook className="absolute right-[6%] top-8 hidden size-16 md:block" rotate="rotate(10deg)" />
        <DecorativeBook className="absolute bottom-10 left-[5%] hidden size-14 md:block" rotate="rotate(-12deg)" />
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.02fr]">
            <FadeIn className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                {copy.eyebrow}
              </p>
              <h1 className="max-w-xl text-[38px] font-bold leading-[1.05] text-[#1A1A2E] sm:text-[48px]">
                {copy.title}
              </h1>
              <p className="max-w-xl text-base leading-8 text-[#666666]">
                {copy.description}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href={`/${locale}/services`} className={buttonVariants({ size: "lg" })}>
                  {copy.secondaryCta}
                </Link>
                <Link
                  href={`/${locale}/donate`}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "border-primary/20 bg-white text-primary hover:bg-secondary",
                  )}
                >
                  {copy.cta}
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={0.08}>
              <div className="overflow-hidden rounded-[20px] bg-white p-3 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                <div className="relative aspect-[1.08/1] overflow-hidden rounded-[18px]">
                  <Image
                    src={homeContent.hero.image}
                    alt={homeContent.hero.imageAlt}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      <section className="bg-secondary py-20">
        <Container>
          <FadeIn className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
              {copy.missionEyebrow}
            </p>
            <h2 className="mt-3 text-[32px] font-bold text-[#1A1A2E]">
              {copy.missionTitle}
            </h2>
            <p className="mt-4 text-base leading-8 text-[#666666]">
              {copy.missionDescription}
            </p>
          </FadeIn>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {missionCards.map((item, index) => {
              const Icon = item.icon;

              return (
                <FadeIn key={item.title} delay={index * 0.08}>
                  <Card className="h-full">
                    <CardContent>
                      <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Icon className="size-5" />
                      </div>
                      <h3 className="mt-5 text-lg font-bold text-[#1A1A2E]">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-base leading-8 text-[#666666]">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </FadeIn>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <FadeIn>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-[32px] font-bold text-[#1A1A2E]">{copy.eventsTitle}</h2>
                <p className="mt-3 text-base text-[#666666]">{copy.eventsDescription}</p>
              </div>
              <Link
                href={`/${locale}/events`}
                className="text-sm font-semibold text-primary transition-colors hover:text-[#0097A7]"
              >
                {copy.viewAll} {isArabic ? "←" : "→"}
              </Link>
            </div>
          </FadeIn>

          <Suspense fallback={<EventsPreviewSkeleton />}>
            <HomeEventsPreview locale={locale} scheduleLabel={copy.scheduleLabel} />
          </Suspense>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <FadeIn>
            <div className="rounded-[20px] bg-primary px-6 py-12 text-center text-white shadow-[0_10px_30px_rgba(0,180,198,0.24)] sm:px-10">
              <div className="mx-auto flex size-14 items-center justify-center rounded-full border border-white/30">
                <Heart className="size-6" />
              </div>
              <h2 className="mt-6 text-[32px] font-bold">{copy.donateTitle}</h2>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/92">
                {copy.donateDescription}
              </p>
              <Link
                href={`/${locale}/donate`}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "mt-8 border-white bg-white text-primary hover:bg-[#f4fdfe]",
                )}
              >
                {copy.donateButton}
              </Link>
            </div>
          </FadeIn>
        </Container>
      </section>
    </div>
  );
}
