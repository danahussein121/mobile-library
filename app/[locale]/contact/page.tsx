import { Globe, Mail, MapPin, MessageCircle } from "lucide-react";
import { notFound } from "next/navigation";

import { ContactForm } from "@/components/site/contact-form";
import { Container } from "@/components/site/container";
import { FadeIn } from "@/components/site/fade-in";
import { Card, CardContent } from "@/components/ui/card";
import { getManagedSiteContent } from "@/data/site-content.server";
import { isLocale } from "@/lib/i18n";
import { getPublicSiteSettings } from "@/lib/queries/settings";

const cardIcons = [Mail, MessageCircle, Globe, MapPin];

type ContactPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const isArabic = locale === "ar";
  const [publicSettings, managedContent] = await Promise.all([
    getPublicSiteSettings(locale),
    getManagedSiteContent(locale),
  ]);
  const contactItems = publicSettings.contactItems;
  const formContent = managedContent.contact.form;

  return (
    <>
      <section className="bg-primary py-20 text-white">
        <Container>
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/80">
              {isArabic ? "تواصل" : "Contact"}
            </p>
            <h1 className="mt-4 text-[42px] font-bold leading-[1.08] text-white sm:text-[48px]">
              {managedContent.contact.title}
            </h1>
          </FadeIn>
        </Container>
      </section>

      <section className="py-20">
        <Container className="space-y-12">
          <div>
            <FadeIn>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                {isArabic ? "بيانات التواصل" : "Contact Info"}
              </p>
            </FadeIn>
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {contactItems.map((item, index) => {
                const Icon = cardIcons[index];

                return (
                  <FadeIn key={item.label} delay={index * 0.08}>
                    <Card className="h-full">
                      <CardContent>
                        <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Icon className="size-5" />
                        </div>
                        <p className="mt-5 text-sm font-semibold text-[#666666]">{item.label}</p>
                        {item.href ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 block text-base font-semibold text-[#1A1A2E] transition-colors hover:text-primary"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="mt-3 text-base font-semibold text-[#1A1A2E]">{item.value}</p>
                        )}
                        {index === 1 ? (
                          <a
                            href="https://wa.me/970597010189"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-[#0097A7]"
                          >
                            <MessageCircle className="size-4" />
                            <span>{isArabic ? "واتساب" : "WhatsApp"}</span>
                          </a>
                        ) : null}
                      </CardContent>
                    </Card>
                  </FadeIn>
                );
              })}
            </div>
          </div>

          <FadeIn>
            <Card>
              <CardContent>
                <ContactForm
                  locale={locale}
                  labels={{
                    title: isArabic ? "أرسل رسالة" : "Send a Message",
                    description: managedContent.contact.description,
                    name: formContent.name,
                    email: formContent.email,
                    subject: formContent.subject,
                    message: formContent.message,
                    submit: formContent.submit,
                  }}
                />
              </CardContent>
            </Card>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
