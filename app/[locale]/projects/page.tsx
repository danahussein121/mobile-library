import Image from "next/image";
import { notFound } from "next/navigation";

import { Container } from "@/components/site/container";
import { FadeIn } from "@/components/site/fade-in";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { getManagedSiteContent } from "@/data/site-content.server";
import { isLocale } from "@/lib/i18n";

type ProjectsPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const content = await getManagedSiteContent(locale);

  return (
    <>
      <PageHero
        eyebrow={content.siteName}
        title={content.pages.projects.title}
        description={content.pages.projects.description}
      />

      <section className="pb-20 sm:pb-28">
        <Container className="space-y-12">
          <FadeIn>
            <SectionHeading
              eyebrow={locale === "ar" ? "مشاريع مميزة" : "Featured projects"}
              title={content.home.projects.title}
              description={content.home.projects.description}
            />
          </FadeIn>

          <div className="grid gap-6">
          {content.home.projects.items.map((project, index) => (
            <FadeIn key={project.title} delay={index * 0.08}>
              <Card className="group overflow-hidden rounded-[2.1rem] border-white/85 bg-white shadow-[0_28px_75px_-52px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_40px_100px_-50px_rgba(15,23,42,0.42)]">
                <div className="grid gap-0 lg:grid-cols-[0.38fr_1fr]">
                  <div className="relative min-h-80 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 38vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/28 via-transparent to-white/10" />
                  </div>
                  <CardContent className="flex items-center p-8 sm:p-10">
                    <div className="max-w-2xl">
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/75 sm:text-sm">
                        {locale === "ar" ? "مشروع ميداني" : "Field project"}
                      </p>
                      <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-[2.15rem]">
                        {project.title}
                      </h2>
                      <p className="mt-4 text-base leading-8 text-slate-600">
                        {project.description}
                      </p>
                      <p className="mt-6 text-sm font-semibold text-primary/80">
                        {locale === "ar"
                          ? "تفاصيل إضافية متاحة عند التواصل مع فريق المشروع."
                          : "More implementation details are available on request from the project team."}
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
    </>
  );
}
