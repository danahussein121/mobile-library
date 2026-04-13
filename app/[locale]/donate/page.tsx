import { HeartHandshake } from "lucide-react";
import { notFound } from "next/navigation";

import { Container } from "@/components/site/container";
import { DonateForm } from "@/components/site/donate-form";
import { FadeIn } from "@/components/site/fade-in";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getPublicBankFields } from "@/lib/bank-details";
import { isLocale } from "@/lib/i18n";
import { getPublicDonationContent } from "@/lib/queries/donations";

type DonatePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function DonatePage({ params }: DonatePageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const isArabic = locale === "ar";
  const donationContent = await getPublicDonationContent(locale);
  const bankFields = donationContent.bankTransfer.fields.length
    ? donationContent.bankTransfer.fields
    : getPublicBankFields(locale);
  const impactMetrics = donationContent.impactMetrics;

  return (
    <>
      <section className="bg-primary py-20 text-white">
        <Container>
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/80">
              {isArabic ? "تبرع" : "Donate"}
            </p>
            <h1 className="mt-4 text-[42px] font-bold leading-[1.08] text-white sm:text-[48px]">
              {donationContent.heading}
            </h1>
          </FadeIn>
        </Container>
      </section>

      <section className="py-20">
        <Container className="space-y-20">
          <div>
            <FadeIn>
              <Tabs defaultValue="bank" className="gap-8">
                <TabsList className="h-auto rounded-full border border-black/10 bg-white p-1 shadow-[0_2px_12px_rgba(0,0,0,0.07)]">
                  <TabsTrigger value="bank" className="rounded-full px-5 py-2.5">
                    {donationContent.tabs.bankTransfer}
                  </TabsTrigger>
                  <TabsTrigger value="online" className="rounded-full px-5 py-2.5">
                    {donationContent.tabs.onlineSoon}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="bank">
                  <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
                    <Card>
                      <CardContent>
                        <h2 className="text-[32px] font-bold text-[#1A1A2E]">
                          {donationContent.bankTransfer.title}
                        </h2>
                        <div className="mt-8 grid gap-4">
                          {bankFields.map((field) => (
                            <div key={field.label} className="rounded-xl bg-secondary px-5 py-4">
                              <p className="text-sm font-semibold text-[#666666]">{field.label}</p>
                              <p className="mt-2 text-base font-semibold text-[#1A1A2E]">
                                {field.value}
                              </p>
                            </div>
                          ))}
                        </div>
                        <div className="mt-6 rounded-xl bg-[#1A1A2E] px-5 py-4 text-white">
                          <p className="text-sm font-semibold text-white/70">
                            {isArabic ? "المرجع" : "Reference"}
                          </p>
                          <p className="mt-2 text-base">
                            {donationContent.bankTransfer.referenceNote}
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent>
                        <DonateForm
                          locale={locale}
                          labels={{
                            title: donationContent.form.title,
                            description: donationContent.form.description,
                            name: donationContent.form.name,
                            amount: donationContent.form.amount,
                            note: donationContent.form.note,
                            transferDate: donationContent.form.transferDate,
                            submit: donationContent.form.submit,
                          }}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="online">
                  <Card>
                    <CardContent className="text-center">
                      <h2 className="text-[32px] font-bold text-[#1A1A2E]">
                          {donationContent.onlineSoon.title}
                      </h2>
                      <p className="mt-4 text-base leading-8 text-[#666666]">
                          {donationContent.onlineSoon.description}
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </FadeIn>
          </div>

          <div>
            <FadeIn>
              <div className="flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <HeartHandshake className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                    {isArabic ? "الأثر" : "Impact"}
                  </p>
                  <h2 className="mt-1 text-[32px] font-bold text-[#1A1A2E]">
                    {isArabic ? "أرقام تعكس رسالتنا" : "Numbers that reflect our mission"}
                  </h2>
                </div>
              </div>
            </FadeIn>
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {impactMetrics.map((item, index) => (
                <FadeIn key={item.key} delay={index * 0.08}>
                  <Card className="h-full">
                    <CardContent>
                      <p className="text-[34px] font-bold text-primary">{item.value}</p>
                      <p className="mt-3 text-base font-semibold text-[#1A1A2E]">{item.label}</p>
                    </CardContent>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
