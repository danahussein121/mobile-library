import { Globe, Mail, MapPin, MessageCircle } from "lucide-react";
import { notFound } from "next/navigation";
import Link from "next/link";

import { ContactForm } from "@/components/site/contact-form";
import { Container } from "@/components/site/container";
import { FadeIn } from "@/components/site/fade-in";
import { PageHero } from "@/components/site/page-hero";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getManagedSiteContent } from "@/data/site-content.server";
import { isLocale } from "@/lib/i18n";
import { getPublicSiteSettings } from "@/lib/queries/settings";
import { cn } from "@/lib/utils";

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
  const inquiryPaths = isArabic
    ? [
        {
          title: "التطوع",
          description: "إذا كنتم ترغبون في دعم الأنشطة الميدانية أو القراءة أو تنظيم المحطات، أرسلوا لنا نبذة مختصرة عن خبرتكم واهتماماتكم.",
          subject: "طلب تطوع",
        },
        {
          title: "الشراكات والرعاية",
          description: "للشراكات المؤسسية، رعاية الفعاليات، أو دعم البرامج، شاركونا نوع التعاون المقترح والجهة التي تمثلونها.",
          subject: "شراكة أو رعاية",
        },
        {
          title: "طلب زيارة",
          description: "يمكن للمدارس والمراكز المجتمعية والفعاليات المحلية مراسلتنا لطلب زيارة أو تنسيق محطة قادمة.",
          subject: "طلب زيارة للمكتبة المتنقلة",
        },
      ]
    : [
        {
          title: "Volunteering",
          description: "If you would like to support field activities, reading sessions, or event delivery, send us a short note about your experience and interests.",
          subject: "Volunteer inquiry",
        },
        {
          title: "Partnerships & sponsorships",
          description: "For institutional partnerships, event sponsorship, or program support, tell us what kind of collaboration you have in mind and who you represent.",
          subject: "Partnership or sponsorship inquiry",
        },
        {
          title: "Visit request",
          description: "Schools, community centers, and local events can contact us to request a visit or discuss a future mobile library stop.",
          subject: "Mobile library visit request",
        },
      ];
  const expectationItems = isArabic
    ? [
        "يراجع فريق المشروع الرسائل الواردة ويعود بالرد عندما تتوفر الخطوات المناسبة.",
        "كلما كانت الرسالة أوضح من حيث المكان أو التاريخ أو نوع الطلب، كان الرد أسرع وأكثر فائدة.",
        "لطلبات الشراكة أو الزيارات، أضيفوا اسم الجهة والموقع وأفضل وسيلة للتواصل.",
      ]
    : [
        "The project team reviews incoming messages and replies when the right next step is clear.",
        "The clearer your note is about place, date, or request type, the faster and more useful our reply can be.",
        "For partnership or visit requests, include your organization, location, and best contact method.",
      ];

  return (
    <>
      <PageHero
        eyebrow={isArabic ? "تواصل" : "Contact"}
        title={managedContent.contact.title}
        description={managedContent.contact.description}
      />

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

          <div>
            <FadeIn>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                    {isArabic ? "مسارات التواصل" : "Contact pathways"}
                  </p>
                  <h2 className="mt-3 text-[32px] font-bold text-[#1A1A2E]">
                    {isArabic ? "اختر المسار الأقرب لطلبك" : "Choose the clearest path for your request"}
                  </h2>
                </div>
              </div>
            </FadeIn>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {inquiryPaths.map((item, index) => (
                <FadeIn key={item.title} delay={index * 0.08}>
                  <Card className="h-full">
                    <CardContent>
                      <h3 className="text-lg font-bold text-[#1A1A2E]">{item.title}</h3>
                      <p className="mt-3 text-base leading-8 text-[#666666]">{item.description}</p>
                      <p className="mt-4 text-sm font-semibold text-primary">
                        {isArabic ? "موضوع مقترح:" : "Suggested subject:"} {item.subject}
                      </p>
                    </CardContent>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <FadeIn>
              <Card className="h-full">
                <CardContent>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                    {isArabic ? "ماذا يحدث بعد الإرسال؟" : "What happens next?"}
                  </p>
                  <h2 className="mt-3 text-[32px] font-bold text-[#1A1A2E]">
                    {isArabic ? "توقعات واضحة قبل التواصل" : "Clear expectations before you reach out"}
                  </h2>
                  <div className="mt-6 space-y-4">
                    {expectationItems.map((item) => (
                      <div key={item} className="rounded-xl bg-secondary px-5 py-4 text-base leading-8 text-[#666666]">
                        {item}
                      </div>
                    ))}
                  </div>
                  <Link
                    href={`/${locale}/donate`}
                    className={cn(
                      buttonVariants({ variant: "outline", size: "lg" }),
                      "mt-8 inline-flex border-primary/20 bg-white text-primary hover:bg-secondary",
                    )}
                  >
                    {isArabic ? "استكشف طرق الدعم" : "Explore support options"}
                  </Link>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn delay={0.05}>
              <Card>
                <CardContent>
                  <ContactForm
                    locale={locale}
                    labels={{
                      title: isArabic ? "أرسل رسالة مباشرة" : "Send a direct message",
                      description: isArabic
                        ? "استخدموا النموذج لطلبات الزيارة أو الشراكات أو الاستفسارات العامة، وسيتابع الفريق معكم عبر وسيلة التواصل المناسبة."
                        : "Use the form for visit requests, partnerships, or general questions, and the team will follow up through the most suitable contact channel.",
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
          </div>
        </Container>
      </section>
    </>
  );
}
