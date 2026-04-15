import Image from "next/image";
import { LibraryBig, MonitorSmartphone, ScanSearch, Shapes, TabletSmartphone } from "lucide-react";
import { notFound } from "next/navigation";

import { Container } from "@/components/site/container";
import { FadeIn } from "@/components/site/fade-in";
import { PageHero } from "@/components/site/page-hero";
import { Card, CardContent } from "@/components/ui/card";
import { getManagedSiteContent } from "@/data/site-content.server";
import { isLocale } from "@/lib/i18n";
import { getPublicPageIntro } from "@/lib/queries/content";

const serviceIcons = [LibraryBig, TabletSmartphone, ScanSearch, MonitorSmartphone];
const culturalActivitiesImage = "/images/bus-interior-art-digital.png";

type ServicesPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const content = await getManagedSiteContent(locale);
  const isArabic = locale === "ar";
  const servicesIntro = await getPublicPageIntro(
    locale,
    ["services", "programs"],
    {
      title: isArabic ? "البرامج والخدمات" : "Programs & Services",
      description: isArabic
        ? "نقدم برامج قراءة وفنون وخدمات مكتبية متنقلة مصممة للوصول إلى المجتمعات بشكل منتظم ومرحب."
        : "We offer mobile library services, reading programs, and creative activities designed to reach communities regularly and warmly.",
    },
  );

  return (
    <>
      <PageHero
        eyebrow={isArabic ? "الخدمات" : "Services"}
        title={servicesIntro.title}
        description={servicesIntro.description}
      />

      <section className="py-20">
        <Container className="space-y-20">
          <div>
            <FadeIn>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                {isArabic ? "خدمات المكتبة" : "Library Services"}
              </p>
              <h2 className="mt-3 text-[32px] font-bold text-[#1A1A2E]">{content.home.libraryServices.title}</h2>
            </FadeIn>
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {content.home.libraryServices.items.map((item, index) => {
                const Icon = serviceIcons[index];

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
          </div>

          <div>
            <FadeIn>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                {isArabic ? "الأنشطة الثقافية" : "Cultural Activities"}
              </p>
              <h2 className="mt-3 text-[32px] font-bold text-[#1A1A2E]">
                {content.home.programs.title}
              </h2>
            </FadeIn>
            <FadeIn delay={0.05}>
              <div className="mt-8 overflow-hidden rounded-[20px] bg-white p-3 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                <div className="relative aspect-[2.2/1] overflow-hidden rounded-[18px]">
                  <Image
                    src={culturalActivitiesImage}
                    alt={
                      isArabic
                        ? "داخل الحافلة ويظهر ركن الفنون والحرف والمنطقة الرقمية"
                        : "Inside the mobile library showing the arts and crafts area and digital zone"
                    }
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 1100px"
                  />
                </div>
              </div>
            </FadeIn>
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {content.home.programs.items.map((program, index) => (
                <FadeIn key={program.title} delay={index * 0.08}>
                  <Card className="h-full">
                    <div className="relative aspect-[1.05/1] overflow-hidden rounded-t-xl">
                      <Image
                        src={program.image}
                        alt={program.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 25vw"
                      />
                    </div>
                    <CardContent>
                      <h3 className="text-lg font-bold text-[#1A1A2E]">{program.title}</h3>
                      <p className="mt-3 text-base leading-8 text-[#666666]">{program.description}</p>
                    </CardContent>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </div>

          <div>
            <FadeIn>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                {isArabic ? "الفئات المستهدفة" : "Target Audience"}
              </p>
              <h2 className="mt-3 text-[32px] font-bold text-[#1A1A2E]">{content.home.targetAudience.title}</h2>
            </FadeIn>
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {content.home.targetAudience.items.map((item, index) => (
                <FadeIn key={item} delay={index * 0.08}>
                  <Card className="h-full">
                    <CardContent>
                      <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Shapes className="size-5" />
                      </div>
                      <p className="mt-5 text-lg font-bold text-[#1A1A2E]">{item}</p>
                    </CardContent>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </div>

          <FadeIn>
            <div className="rounded-[20px] border border-primary/15 bg-secondary px-6 py-8 sm:px-8">
              <p className="text-lg font-semibold text-[#1A1A2E]">
                {isArabic
                  ? "📱 قريبًا: تطبيق للهاتف لتتبع موقع الحافلة والحجز المسبق للورش."
                  : "📱 Coming soon: A mobile app for tracking our bus location and pre-booking workshops."}
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
