import { notFound } from "next/navigation";

import { Container } from "@/components/site/container";
import { FadeIn } from "@/components/site/fade-in";
import { PageHero } from "@/components/site/page-hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getSiteContent } from "@/data/site-content";
import { isLocale } from "@/lib/i18n";

type ContactPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const content = getSiteContent(locale);

  return (
    <>
      <PageHero
        eyebrow={content.siteName}
        title={content.pages.contact.title}
        description={content.pages.contact.description}
      />

      <section className="pb-20 sm:pb-28">
        <Container className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <FadeIn>
            <Card className="relative h-full overflow-hidden rounded-[2.2rem] border-white/10 bg-slate-950 text-white shadow-[0_35px_90px_-55px_rgba(15,23,42,0.6)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(45,212,191,0.2),transparent_46%)]" />
              <CardContent className="p-8 sm:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-200/80 sm:text-sm">
                  {locale === "ar" ? "بيانات التواصل" : "Contact details"}
                </p>
                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] sm:text-[2.15rem]">
                  {content.contact.title}
                </h2>
                <p className="mt-4 text-base leading-8 text-slate-300">
                  {content.contact.description}
                </p>

                <div className="mt-8 space-y-4">
                  {content.contact.details.map((detail) => (
                    <div key={detail.label} className="rounded-[1.5rem] bg-white/5 px-5 py-4 backdrop-blur">
                      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/50">
                        {detail.label}
                      </p>
                      <p className="mt-2 text-lg font-semibold text-white">{detail.value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={0.08}>
            <Card className="rounded-[2.15rem] border-white/85 bg-white shadow-[0_30px_80px_-55px_rgba(15,23,42,0.38)]">
              <CardContent className="p-8 sm:p-10">
                <h2 className="text-3xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-[2.15rem]">
                  {locale === "ar" ? "أرسل رسالة" : "Send a message"}
                </h2>
                <p className="mt-4 text-base leading-8 text-slate-600">
                  {locale === "ar"
                    ? "هذا النموذج واجهة جاهزة ويمكن ربطه لاحقًا بخدمة بريد أو نظام إدارة محتوى."
                    : "This interface is ready to connect later to a mailing workflow, form handler, or CMS."}
                </p>

                <form className="mt-8 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input placeholder={content.contact.form.name} className="h-12 rounded-2xl" />
                    <Input placeholder={content.contact.form.email} className="h-12 rounded-2xl" />
                  </div>
                  <Input placeholder={content.contact.form.subject} className="h-12 rounded-2xl" />
                  <Textarea
                    placeholder={content.contact.form.message}
                    className="min-h-40 rounded-2xl"
                  />
                  <Button className="h-12 rounded-full px-6">
                    {content.contact.form.submit}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
