import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookHeart,
  BookOpen,
  CalendarDays,
  HeartHandshake,
  MapPinned,
  Sparkles,
} from "lucide-react";

import { Container } from "@/components/site/container";
import { FadeIn } from "@/components/site/fade-in";
import { ParallaxImage } from "@/components/site/parallax-image";
import { SectionHeading } from "@/components/site/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getSiteContent } from "@/data/site-content";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const missionIcons = [HeartHandshake, Sparkles, BookOpen];
const stepIcons = [Sparkles, BookOpen, CalendarDays];

type HomePageProps = {
  locale: Locale;
};

export function HomePage({ locale }: HomePageProps) {
  const content = getSiteContent(locale);
  const heroStats = content.home.impact.stats.slice(0, 3);

  return (
    <div className="overflow-hidden pb-20 sm:pb-28">
      <section className="relative overflow-hidden pt-8 sm:pt-12 lg:pt-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.26),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.12),transparent_24%),linear-gradient(180deg,rgba(246,251,251,0.98),rgba(237,247,247,0.82)_48%,transparent_100%)]" />
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14 xl:gap-20">
            <FadeIn className="space-y-8 lg:space-y-9">
              <div className="inline-flex items-center rounded-full border border-primary/15 bg-white/85 px-4 py-2 text-sm font-semibold text-primary shadow-sm backdrop-blur">
                {content.home.hero.eyebrow}
              </div>

              <div className="space-y-5 text-start">
                <h1 className="max-w-2xl text-[2.85rem] font-semibold tracking-[-0.05em] text-slate-950 sm:text-6xl lg:text-[4.65rem] lg:leading-[0.96]">
                  {content.home.hero.title}
                </h1>
                <p className="max-w-xl text-lg leading-8 text-slate-600 sm:text-xl sm:leading-9">
                  {content.home.hero.description}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href={`/${locale}/programs`}
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "rounded-full px-7 shadow-xl shadow-primary/20 transition-transform duration-300 hover:-translate-y-0.5",
                  )}
                >
                  {content.home.hero.primaryAction}
                </Link>
                <Link
                  href={`/${locale}/donate`}
                  className={cn(
                    buttonVariants({ size: "lg", variant: "outline" }),
                    "rounded-full border-slate-300 bg-white/75 px-7 shadow-sm backdrop-blur transition-transform duration-300 hover:-translate-y-0.5 hover:bg-white",
                  )}
                >
                  {content.home.hero.secondaryAction}
                </Link>
              </div>

              <div className="rounded-[1.8rem] border border-white/80 bg-white/70 p-5 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.35)] backdrop-blur">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <BookHeart className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.26em] text-primary/75">
                      {locale === "ar" ? "لماذا الدعم مهم" : "Why donor support matters"}
                    </p>
                    <p className="mt-2 max-w-xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                      {locale === "ar"
                        ? "كل مساهمة تمول كتبًا جديدة، وموادًا تعليمية، وزيارات تصل إلى أطفال قد لا تتوفر لهم مكتبات قريبة."
                        : "Every contribution helps fund new books, educational materials, and neighborhood visits for children who may not have easy access to libraries."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {heroStats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className={cn(
                      "rounded-[1.6rem] border border-white/85 bg-white/80 p-4 shadow-[0_18px_55px_-40px_rgba(15,23,42,0.35)] backdrop-blur",
                      index === 1 && "sm:-translate-y-2",
                    )}
                  >
                    <p className="text-2xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-3xl">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 sm:text-[0.8rem]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.08}>
              <div className="relative mx-auto w-full max-w-[44rem] lg:max-w-none">
                <div className="absolute inset-x-[10%] top-4 -bottom-4 rounded-[3rem] bg-gradient-to-br from-primary/30 via-cyan-200/20 to-transparent blur-3xl" />
                <div className="relative overflow-hidden rounded-[2.7rem] border border-white/70 bg-white/70 p-3 shadow-[0_45px_120px_-52px_rgba(15,23,42,0.5)] backdrop-blur">
                  <ParallaxImage
                    src={content.home.hero.image}
                    alt={content.home.hero.imageAlt}
                    priority
                    sizes="(max-width: 1024px) 100vw, 52vw"
                    containerClassName="aspect-[4/4.8] rounded-[2.15rem] sm:aspect-[4/4.55]"
                    overlayClassName="bg-gradient-to-t from-slate-950/32 via-transparent to-white/10"
                  />
                </div>

                <Card className="absolute bottom-5 left-4 max-w-[15rem] rounded-[1.9rem] border-white/80 bg-white/95 shadow-[0_30px_80px_-45px_rgba(15,23,42,0.35)] sm:bottom-8 sm:left-7 sm:max-w-xs">
                  <CardContent className="p-5 sm:p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/75 sm:text-sm">
                      {locale === "ar" ? "من الميدان" : "From the field"}
                    </p>
                    <h2 className="mt-2 text-lg font-semibold tracking-[-0.03em] text-slate-950 sm:text-2xl">
                      {content.home.hero.floatingCard.title}
                    </h2>
                    <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base">
                      {content.home.hero.floatingCard.description}
                    </p>
                  </CardContent>
                </Card>

                <Card className="absolute right-4 top-5 max-w-[11rem] rounded-[1.7rem] border border-primary/10 bg-slate-950 text-white shadow-[0_28px_80px_-40px_rgba(15,23,42,0.6)] sm:right-7 sm:top-8 sm:max-w-[13rem]">
                  <CardContent className="p-4 sm:p-5">
                    <div className="flex size-10 items-center justify-center rounded-2xl bg-white/10 text-teal-200">
                      <MapPinned className="size-4 sm:size-5" />
                    </div>
                    <p className="mt-4 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
                      38
                    </p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/60 sm:text-sm">
                      {locale === "ar" ? "مجتمع تمت زيارته" : "Communities visited"}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      <section className="pt-28 sm:pt-36">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
            <FadeIn>
              <SectionHeading
                eyebrow={locale === "ar" ? "من نحن" : "Who we are"}
                title={content.home.about.title}
                description={content.home.about.description}
              />
            </FadeIn>

            <FadeIn delay={0.08}>
              <Card className="rounded-[2.25rem] border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(240,249,248,0.95))] shadow-[0_32px_90px_-55px_rgba(15,23,42,0.35)]">
                <CardContent className="p-7 sm:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/75 sm:text-sm">
                    {locale === "ar" ? "أثر قريب وملموس" : "Warm, measurable impact"}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-3xl">
                    {locale === "ar"
                      ? "ليست مجرد كتب متنقلة، بل تجربة تزرع الثقة وحب التعلم"
                      : "More than a moving collection of books, it is a reading experience that builds confidence"}
                  </h3>
                  <p className="mt-4 text-base leading-8 text-slate-600">
                    {locale === "ar"
                      ? "نعمل مع المدارس والأسر والمجتمعات المحلية لصناعة لحظات يشعر فيها الطفل أن الكتاب جزء من حياته اليومية، لا شيئًا بعيدًا عنه."
                      : "We work with schools, families, and local communities to make books feel present in children’s daily lives, not distant from them."}
                  </p>
                </CardContent>
              </Card>
            </FadeIn>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {content.home.missionCards.map((item, index) => {
              const Icon = missionIcons[index];

              return (
                <FadeIn key={item.title} delay={index * 0.08}>
                  <Card className="group h-full rounded-[2rem] border-white/85 bg-white/90 shadow-[0_25px_70px_-52px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_35px_90px_-50px_rgba(15,23,42,0.42)]">
                    <CardContent className="p-7 sm:p-8">
                      <div className="flex size-12 items-center justify-center rounded-[1.35rem] bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-105 sm:size-[3.25rem]">
                        <Icon className="size-5" />
                      </div>
                      <h3 className="mt-6 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-base leading-8 text-slate-600">{item.description}</p>
                    </CardContent>
                  </Card>
                </FadeIn>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="pt-28 sm:pt-36">
        <Container>
          <FadeIn>
            <SectionHeading
              eyebrow={locale === "ar" ? "كيف نصل إلى الأطفال" : "How we reach children"}
              title={content.home.howItWorks.title}
              description={content.home.howItWorks.description}
            />
          </FadeIn>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {content.home.howItWorks.steps.map((step, index) => {
              const Icon = stepIcons[index];

              return (
                <FadeIn key={step.title} delay={index * 0.08}>
                  <Card className="group relative h-full overflow-hidden rounded-[2.2rem] border-slate-200/70 bg-slate-950 text-white shadow-[0_34px_90px_-56px_rgba(15,23,42,0.7)] transition-transform duration-300 hover:-translate-y-1">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(45,212,191,0.2),transparent_48%)]" />
                    <CardContent className="relative p-7 sm:p-8">
                      <div className="flex items-center justify-between">
                        <div className="flex size-12 items-center justify-center rounded-2xl bg-white/10 text-teal-200 transition-transform duration-300 group-hover:scale-105">
                          <Icon className="size-5" />
                        </div>
                        <span className="text-sm font-semibold tracking-[0.2em] text-white/55">
                          0{index + 1}
                        </span>
                      </div>
                      <h3 className="mt-8 text-2xl font-semibold tracking-[-0.03em]">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-base leading-8 text-slate-300">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                </FadeIn>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="pt-28 sm:pt-36">
        <Container>
          <FadeIn>
            <SectionHeading
              eyebrow={locale === "ar" ? "برامج تصنع فرقًا" : "Programs that create belonging"}
              title={content.home.programs.title}
              description={content.home.programs.description}
            />
          </FadeIn>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {content.home.programs.items.map((program, index) => (
              <FadeIn key={program.title} delay={index * 0.06}>
                <Card className="group h-full overflow-hidden rounded-[2rem] border-white/85 bg-white/95 shadow-[0_26px_70px_-52px_rgba(15,23,42,0.34)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_36px_95px_-50px_rgba(15,23,42,0.42)]">
                  <div className="relative aspect-[4/3.3] overflow-hidden">
                    <Image
                      src={program.image}
                      alt={program.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/28 via-transparent to-white/10" />
                  </div>
                  <CardContent className="p-6 sm:p-7">
                    <h3 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                      {program.title}
                    </h3>
                    <p className="mt-3 text-base leading-8 text-slate-600">
                      {program.description}
                    </p>
                    <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                      {locale === "ar" ? "اكتشف البرنامج" : "Discover the program"}
                      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <section className="pt-28 sm:pt-36">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <FadeIn>
              <SectionHeading
                eyebrow={locale === "ar" ? "مشاريع ميدانية" : "Featured field projects"}
                title={content.home.projects.title}
                description={content.home.projects.description}
              />
            </FadeIn>
            <FadeIn className="flex lg:justify-end" delay={0.08}>
              <Link
                href={`/${locale}/projects`}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "rounded-full border-slate-300 bg-white/80 px-6 shadow-sm transition-transform duration-300 hover:-translate-y-0.5 hover:bg-white",
                )}
              >
                {locale === "ar" ? "عرض جميع المشاريع" : "View all projects"}
              </Link>
            </FadeIn>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {content.home.projects.items.map((project, index) => (
              <FadeIn key={project.title} delay={index * 0.08}>
                <Card className="group h-full overflow-hidden rounded-[2.1rem] border-white/85 bg-white shadow-[0_28px_75px_-52px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_40px_100px_-50px_rgba(15,23,42,0.42)]">
                  <div className="relative aspect-[4/3.1] overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/28 via-transparent to-white/10" />
                  </div>
                  <CardContent className="flex h-full flex-col p-6 sm:p-7">
                    <h3 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                      {project.title}
                    </h3>
                    <p className="mt-3 flex-1 text-base leading-8 text-slate-600">
                      {project.description}
                    </p>
                    <Link
                      href={`/${locale}/projects`}
                      className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary"
                    >
                      {project.cta}
                      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </Link>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <section className="pt-28 sm:pt-36">
        <Container>
          <FadeIn>
            <div className="relative overflow-hidden rounded-[2.6rem] bg-slate-950 px-6 py-10 text-white shadow-[0_40px_110px_-62px_rgba(15,23,42,0.8)] sm:px-10 sm:py-12 lg:px-12 lg:py-14">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(45,212,191,0.28),transparent_34%)]" />
              <div className="relative">
                <SectionHeading
                  eyebrow={locale === "ar" ? "أثرنا اليوم" : "Our impact today"}
                  title={content.home.impact.title}
                  description={content.home.impact.description}
                  className="[&_h2]:text-white [&_p:last-child]:text-slate-300"
                />
                <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {content.home.impact.stats.map((stat, index) => (
                    <FadeIn key={stat.label} delay={index * 0.06}>
                      <Card className="rounded-[1.8rem] border-white/10 bg-white/5 backdrop-blur">
                        <CardContent className="p-6">
                          <p className="text-4xl font-semibold tracking-[-0.05em] text-white sm:text-[2.8rem]">
                            {stat.value}
                          </p>
                          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/60 sm:text-sm">
                            {stat.label}
                          </p>
                        </CardContent>
                      </Card>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      <section className="pt-28 sm:pt-36">
        <Container>
          <FadeIn>
            <SectionHeading
              eyebrow={locale === "ar" ? "لقاءات وفعاليات" : "Events and gatherings"}
              title={content.home.events.title}
              description={content.home.events.description}
            />
          </FadeIn>
          <div className="mt-12 space-y-6">
            {content.home.events.items.map((event, index) => (
              <FadeIn key={event.title} delay={index * 0.08}>
                <Card className="group overflow-hidden rounded-[2.15rem] border-white/85 bg-white shadow-[0_28px_75px_-52px_rgba(15,23,42,0.34)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_38px_100px_-50px_rgba(15,23,42,0.4)]">
                  <div className="grid gap-0 md:grid-cols-[0.34fr_1fr]">
                    <div className="relative min-h-72 overflow-hidden">
                      <Image
                        src={event.image}
                        alt={event.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 32vw"
                      />
                    </div>
                    <CardContent className="flex items-center p-7 sm:p-8 lg:p-10">
                      <div className="max-w-2xl">
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/75 sm:text-sm">
                          {event.date}
                        </p>
                        <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-3xl">
                          {event.title}
                        </h3>
                        <p className="mt-4 text-base leading-8 text-slate-600">
                          {event.description}
                        </p>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <section className="pt-28 sm:pt-36">
        <Container>
          <FadeIn>
            <div className="relative overflow-hidden rounded-[2.7rem] bg-[linear-gradient(135deg,oklch(0.63_0.14_194),oklch(0.56_0.11_188))] px-8 py-12 text-primary-foreground shadow-[0_45px_120px_-50px_rgba(13,148,136,0.58)] sm:px-12 sm:py-16 lg:px-14">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.12),transparent_26%)]" />
              <div className="relative grid gap-8 lg:grid-cols-[1.06fr_0.94fr] lg:items-center">
                <div className="space-y-5 text-start">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70 sm:text-sm">
                    {locale === "ar" ? "تبرع" : "Give today"}
                  </p>
                  <h2 className="max-w-2xl text-3xl font-semibold tracking-[-0.04em] sm:text-5xl sm:leading-[1.02]">
                    {content.home.donateCta.title}
                  </h2>
                  <p className="max-w-2xl text-base leading-8 text-primary-foreground/90 sm:text-lg sm:leading-9">
                    {content.home.donateCta.description}
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-[1fr_auto] lg:items-center">
                  <Card className="rounded-[2rem] border-white/20 bg-white/10 text-white backdrop-blur">
                    <CardContent className="p-5 sm:p-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60">
                        {locale === "ar" ? "أثر التبرع" : "What your gift can do"}
                      </p>
                      <p className="mt-3 text-base leading-8 text-white/90">
                        {locale === "ar"
                          ? "يمكن أن يدعم تبرع واحد جلسات قراءة ومواد تعليمية وكتبًا جديدة تصل مباشرة إلى الأطفال."
                          : "A single donation can help support reading circles, educational activities, and new books delivered directly to children."}
                      </p>
                    </CardContent>
                  </Card>
                  <div className="flex sm:justify-end">
                    <Link
                      href={`/${locale}/donate`}
                      className={cn(
                        buttonVariants({ size: "lg" }),
                        "rounded-full bg-white px-8 text-primary shadow-xl shadow-slate-950/10 transition-transform duration-300 hover:-translate-y-0.5 hover:bg-white/95",
                      )}
                    >
                      {content.home.donateCta.button}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </div>
  );
}
