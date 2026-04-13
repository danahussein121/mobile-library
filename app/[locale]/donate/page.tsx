import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/site/container";
import { FadeIn } from "@/components/site/fade-in";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { getManagedSiteContent } from "@/data/site-content.server";
import { isLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type DonatePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function DonatePage({ params }: DonatePageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const content = await getManagedSiteContent(locale);

  return (
    <>
      <PageHero
        eyebrow={content.siteName}
        title={content.pages.donate.title}
        description={content.pages.donate.description}
      />

      <section className="pb-20 sm:pb-28">
        <Container className="space-y-12">
          <FadeIn>
            <SectionHeading
              eyebrow={locale === "ar" ? "طرق الدعم" : "Ways to give"}
              title={content.donation.heading}
              description={content.donation.description}
            />
          </FadeIn>

          <FadeIn>
            <Tabs defaultValue="bank" className="gap-8">
              <TabsList className="h-auto rounded-full border border-white/80 bg-white/90 p-1 shadow-[0_24px_60px_-42px_rgba(15,23,42,0.25)] backdrop-blur">
                <TabsTrigger value="bank" className="rounded-full px-5 py-3">
                  {content.donation.tabs.bankTransfer}
                </TabsTrigger>
                <TabsTrigger value="online" className="rounded-full px-5 py-3">
                  {content.donation.tabs.onlineSoon}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="bank">
                <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
                  <Card className="rounded-[2.15rem] border-white/85 bg-white shadow-[0_30px_80px_-55px_rgba(15,23,42,0.38)]">
                    <CardContent className="p-8 sm:p-10">
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/75 sm:text-sm">
                        {content.donation.heading}
                      </p>
                      <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-[2.15rem]">
                        {content.donation.bankTransfer.title}
                      </h2>
                      <p className="mt-4 text-base leading-8 text-slate-600">
                        {content.donation.description}
                      </p>
                      <p className="mt-4 rounded-2xl bg-primary/10 px-4 py-3 text-sm leading-7 text-slate-600">
                        {content.donation.bankTransfer.helper}
                      </p>

                      <div className="mt-8 grid gap-4">
                        {content.donation.bankTransfer.fields.map((field) => (
                          <div
                            key={field.label}
                            className="rounded-[1.5rem] border border-slate-200 bg-slate-50 px-5 py-4 shadow-[0_12px_30px_-28px_rgba(15,23,42,0.18)]"
                          >
                            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                              {field.label}
                            </p>
                            <p className="mt-2 text-lg font-semibold text-slate-950">
                              {field.value}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 rounded-[1.5rem] bg-slate-950 px-5 py-4 text-white">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/60">
                          {locale === "ar" ? "المرجع" : "Reference"}
                        </p>
                        <p className="mt-2 text-base">{content.donation.bankTransfer.referenceNote}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="rounded-[2.15rem] border-white/85 bg-white shadow-[0_30px_80px_-55px_rgba(15,23,42,0.38)]">
                    <CardContent className="p-8 sm:p-10">
                      <h2 className="text-3xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-[2.15rem]">
                        {content.donation.form.title}
                      </h2>
                      <p className="mt-4 text-base leading-8 text-slate-600">
                        {content.donation.form.description}
                      </p>

                      <form className="mt-8 space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <Input placeholder={content.donation.form.name} className="h-12 rounded-2xl" />
                          <Input placeholder={content.donation.form.email} className="h-12 rounded-2xl" />
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <Input
                            placeholder={content.donation.form.amount}
                            className="h-12 rounded-2xl"
                          />
                          <Input
                            type="date"
                            placeholder={content.donation.form.transferDate}
                            className="h-12 rounded-2xl"
                          />
                        </div>
                        <Textarea
                          placeholder={content.donation.form.note}
                          className="min-h-36 rounded-2xl"
                        />
                        <Button type="button" className="h-12 rounded-full px-6">
                          {content.donation.form.submit}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="online">
                <Card className="rounded-[2.15rem] border-dashed border-slate-300 bg-white/90 shadow-[0_30px_80px_-55px_rgba(15,23,42,0.28)]">
                  <CardContent className="p-10 text-center">
                    <h2 className="text-3xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-[2.15rem]">
                      {content.donation.placeholderCard.title}
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-600">
                      {content.donation.placeholderCard.description}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </FadeIn>

          <FadeIn>
            <Card className="rounded-[2.15rem] border-white/85 bg-white shadow-[0_30px_80px_-55px_rgba(15,23,42,0.3)]">
              <CardContent className="p-8 sm:p-10">
                <SectionHeading
                  eyebrow={locale === "ar" ? "بيانات للتنسيق" : "Support contact"}
                  title={locale === "ar" ? "للمساعدة في تأكيد التحويل" : "If you need help confirming a transfer"}
                  description={
                    locale === "ar"
                      ? "يمكنك استخدام بيانات التواصل التالية إذا احتجت إلى متابعة عملية التبرع أو مشاركة إشعار التحويل."
                      : "Use the details below if you need help following up on a donation or sharing your transfer confirmation."
                  }
                />
                <div className="mt-8 grid gap-4 md:grid-cols-3">
                  {content.contact.details.map((detail) => (
                    <div
                      key={detail.label}
                      className="rounded-[1.5rem] border border-slate-200 bg-slate-50 px-5 py-4 shadow-[0_12px_30px_-28px_rgba(15,23,42,0.18)]"
                    >
                      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                        {detail.label}
                      </p>
                      <p className="mt-2 text-base font-semibold text-slate-950">{detail.value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn>
            <Card className="rounded-[2.6rem] border-transparent bg-[linear-gradient(135deg,oklch(0.63_0.14_194),oklch(0.56_0.11_188))] text-primary-foreground shadow-[0_45px_120px_-50px_rgba(13,148,136,0.58)]">
              <CardContent className="flex flex-col gap-6 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/72 sm:text-sm">
                    {locale === "ar" ? "رعاية الأثر" : "Sponsor impact"}
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-[2.15rem]">
                    {content.donation.cta.title}
                  </h2>
                </div>
                <Link
                  href={`/${locale}/contact`}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "rounded-full border-white/40 bg-white text-primary hover:bg-white/90",
                  )}
                >
                  {content.donation.cta.button}
                </Link>
              </CardContent>
            </Card>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
