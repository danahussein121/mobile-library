import Image from "next/image";
import {
  Accessibility,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  Leaf,
  Lightbulb,
  Sparkles,
  Target,
  Wifi,
} from "lucide-react";
import { notFound } from "next/navigation";

import { Container } from "@/components/site/container";
import { FadeIn } from "@/components/site/fade-in";
import { Card, CardContent } from "@/components/ui/card";
import { getManagedSiteContent } from "@/data/site-content.server";
import { isLocale } from "@/lib/i18n";
import { getPublicPageIntro } from "@/lib/queries/content";

const storyImage = "/images/bus-exterior-open.png";
const busBannerImage = "/images/bus-interior-shelves.jpg";

const busIcons = [Leaf, Accessibility, Wifi, BookOpen];
const partnershipIcons = [Building2, BriefcaseBusiness, Sparkles, Target];

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const content = await getManagedSiteContent(locale);
  const isArabic = locale === "ar";
  const aboutIntro = await getPublicPageIntro(
    locale,
    ["about"],
    {
      title: isArabic ? "من رام الله إلى المجتمعات الأقل خدمة" : "From Ramallah to underserved communities",
      description: isArabic
        ? "نحن مبادرة ثقافية انطلقت من رام الله، فلسطين، لردم الفجوة الثقافية في المناطق الأقل وصولًا إلى المكتبات والبرامج الفنية في الضفة الغربية."
        : "We are a cultural initiative based in Ramallah, Palestine, founded to bridge the cultural gap in underserved areas across the West Bank.",
      imageUrl: storyImage,
      imageAlt: isArabic
        ? "الحافلة المتنقلة مفتوحة وتظهر الرفوف الملونة المخصصة للأطفال"
        : "Mobile library bus open with colorful children's shelves inside",
    },
  );
  const roleCard = content.home.missionCards[2];
  const busItems = content.home.busFeatures.items.slice(0, 4);
  const partnerships = isArabic
    ? [
        {
          title: "القطاع الحكومي",
          description: "تنسيق المواقع العامة والمدارس والمبادرات المحلية لضمان وصول الخدمة إلى مناطق أكثر.",
        },
        {
          title: "القطاع الخاص",
          description: "دعم البرامج والرعاية وتوفير الموارد التي تعزز استدامة الرحلات الثقافية.",
        },
        {
          title: "المؤسسات غير الربحية",
          description: "بناء برامج مشتركة تدمج المعرفة والفنون والدعم المجتمعي ضمن محطات متنقلة فعالة.",
        },
        {
          title: "المتطوعون",
          description: "مساندة الأنشطة الميدانية وتنشيط القراءة والمشاركة المجتمعية في كل محطة.",
        },
      ]
    : [
        {
          title: "Government",
          description: "Coordinating public spaces, schools, and local initiatives so the service can reach more communities.",
        },
        {
          title: "Private Sector",
          description: "Supporting sponsorships, resources, and partnerships that strengthen the long-term sustainability of the bus.",
        },
        {
          title: "NGOs",
          description: "Designing joint programs that connect literacy, arts, and community development through mobile visits.",
        },
        {
          title: "Volunteers",
          description: "Helping activate field visits, lead activities, and create welcoming spaces for children and families.",
        },
      ];

  return (
    <>
      <section className="bg-primary py-20 text-white">
        <Container>
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/80">
              {isArabic ? "عن المشروع" : "About"}
            </p>
            <h1 className="mt-4 text-[42px] font-bold leading-[1.08] text-white sm:text-[48px]">
              {isArabic ? "عن المكتبة المتنقلة" : "About the Mobile Library"}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-white/90">
              {aboutIntro.description}
            </p>
          </FadeIn>
        </Container>
      </section>

      <section className="py-20">
        <Container className="space-y-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center">
            <FadeIn className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                {isArabic ? "قصتنا" : "Our Story"}
              </p>
              <h2 className="text-[32px] font-bold text-[#1A1A2E]">
                {aboutIntro.title}
              </h2>
              <p className="text-base leading-8 text-[#666666]">
                {aboutIntro.description}
              </p>
              <p className="text-base leading-8 text-[#666666]">
                {isArabic
                  ? "نعمل لأن الوصول إلى المعرفة والقراءة والأنشطة الفنية يجب أن يكون قريبًا من الأطفال والعائلات، لا مرتبطًا فقط بالمراكز الكبرى."
                  : "Our work brings books, storytelling, and creative activities directly to neighborhoods where cultural access should feel close, regular, and welcoming."}
              </p>
            </FadeIn>

            <FadeIn delay={0.08}>
              <div className="overflow-hidden rounded-[20px] bg-white p-3 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                <div className="relative aspect-[1.08/1] overflow-hidden rounded-[18px]">
                  <Image
                    src={aboutIntro.imageUrl || storyImage}
                    alt={aboutIntro.imageAlt || (isArabic
                      ? "الحافلة المتنقلة مفتوحة وتظهر الرفوف الملونة المخصصة للأطفال"
                      : "Mobile library bus open with colorful children's shelves inside")}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                </div>
              </div>
            </FadeIn>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { ...content.home.missionCards[0], icon: Target },
              { ...content.home.missionCards[1], icon: Lightbulb },
              {
                title: isArabic ? "دورنا" : "Our Role",
                description: roleCard.description,
                icon: Sparkles,
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <FadeIn key={item.title} delay={index * 0.08}>
                  <Card className="h-full">
                    <CardContent>
                      <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Icon className="size-5" />
                      </div>
                      <h2 className="mt-5 text-lg font-bold text-[#1A1A2E]">{item.title}</h2>
                      <p className="mt-3 text-base leading-8 text-[#666666]">{item.description}</p>
                    </CardContent>
                  </Card>
                </FadeIn>
              );
            })}
          </div>

          <div>
            <FadeIn>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                {isArabic ? "الأهداف الاستراتيجية" : "Strategic Goals"}
              </p>
              <h2 className="mt-3 text-[32px] font-bold text-[#1A1A2E]">
                {isArabic ? "الأثر الذي نسعى إليه" : "The long-term impact we pursue"}
              </h2>
            </FadeIn>
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {content.home.strategicGoals.items.map((goal, index) => (
                <FadeIn key={goal.title} delay={index * 0.08}>
                  <Card className="h-full">
                    <CardContent>
                      <span className="text-sm font-bold text-primary">0{index + 1}</span>
                      <h3 className="mt-5 text-lg font-bold text-[#1A1A2E]">{goal.title}</h3>
                      <p className="mt-3 text-base leading-8 text-[#666666]">{goal.description}</p>
                    </CardContent>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </div>

          <section className="rounded-[20px] bg-secondary px-6 py-16 sm:px-10">
            <FadeIn>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                {isArabic ? "الحافلة" : "The Bus"}
              </p>
              <h2 className="mt-3 text-[32px] font-bold text-[#1A1A2E]">
                {isArabic ? "حافلة ذكية بتصميم متكامل" : "A Smart Bus with Integrated Design"}
              </h2>
            </FadeIn>
            <FadeIn delay={0.05}>
              <div className="mt-8 overflow-hidden rounded-[20px] bg-white p-3 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                <div className="relative aspect-[2.2/1] overflow-hidden rounded-[18px]">
                  <Image
                    src={busBannerImage}
                    alt={
                      isArabic
                        ? "الجزء الداخلي الدافئ من حافلة المكتبة مع رفوف الكتب"
                        : "Warm interior of the mobile library bus with full bookshelves"
                    }
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 1100px"
                  />
                </div>
              </div>
            </FadeIn>
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {busItems.map((item, index) => {
                const Icon = busIcons[index];

                return (
                  <FadeIn key={item} delay={index * 0.08}>
                    <Card className="h-full">
                      <CardContent>
                        <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Icon className="size-5" />
                        </div>
                        <p className="mt-5 text-lg font-bold text-[#1A1A2E]">{item}</p>
                      </CardContent>
                    </Card>
                  </FadeIn>
                );
              })}
            </div>
          </section>

          <div>
            <FadeIn>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                {isArabic ? "القيم الأساسية" : "Core Values"}
              </p>
              <h2 className="mt-3 text-[32px] font-bold text-[#1A1A2E]">{content.home.coreValues.title}</h2>
            </FadeIn>
            <div className="mt-8 flex flex-wrap gap-3">
              {content.home.coreValues.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-secondary px-5 py-3 text-sm font-semibold text-[#1A1A2E]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div>
            <FadeIn>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                {isArabic ? "الشراكات" : "Partnerships"}
              </p>
              <h2 className="mt-3 text-[32px] font-bold text-[#1A1A2E]">
                {content.home.partnerships.title}
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-8 text-[#666666]">
                {content.home.partnerships.description}
              </p>
            </FadeIn>
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {partnerships.map((item, index) => {
                const Icon = partnershipIcons[index];

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
