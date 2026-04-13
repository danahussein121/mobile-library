import type { Locale } from "@/lib/i18n";

export type PublicNavItem = {
  label: string;
  href: string;
};

export type FooterLink = {
  label: string;
  href: string;
};

export type ContactItem = {
  label: string;
  value: string;
  href?: string;
};

export type PublicSiteCopy = {
  brandName: string;
  nav: PublicNavItem[];
  donateLabel: string;
  footer: {
    tagline: string;
    quickLinksLabel: string;
    communityLabel: string;
    contactLabel: string;
    socialLabel: string;
    communityLinks: FooterLink[];
    socialLinks: FooterLink[];
    bottomText: string;
    privacyLabel: string;
    termsLabel: string;
  };
  contactItems: ContactItem[];
  notFound: {
    title: string;
    description: string;
    action: string;
  };
  legal: {
    privacyTitle: string;
    termsTitle: string;
    description: string;
    action: string;
  };
};

const sharedSocialLinks: FooterLink[] = [
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "Twitter", href: "#" },
  { label: "LinkedIn", href: "#" },
];

export const publicSiteCopy: Record<Locale, PublicSiteCopy> = {
  en: {
    brandName: "Mobile Library",
    nav: [
      { label: "Home", href: "/en" },
      { label: "About", href: "/en/about" },
      { label: "Services", href: "/en/services" },
      { label: "Events", href: "/en/events" },
      { label: "Contact", href: "/en/contact" },
    ],
    donateLabel: "Donate",
    footer: {
      tagline:
        "Bringing books, education, and joy to children and communities everywhere.",
      quickLinksLabel: "Quick Links",
      communityLabel: "Community",
      contactLabel: "Contact",
      socialLabel: "Follow Us",
      communityLinks: [
        { label: "Upcoming Events", href: "/en/events" },
        { label: "Volunteer", href: "/en/contact" },
        { label: "Our Story", href: "/en/about" },
        { label: "Partner with Us", href: "/en/contact" },
      ],
      socialLinks: sharedSocialLinks,
      bottomText: "© 2026 Mobile Library. All rights reserved.",
      privacyLabel: "Privacy Policy",
      termsLabel: "Terms of Service",
    },
    contactItems: [
      { label: "Email", value: "Mobile.library1@outlook.com", href: "mailto:Mobile.library1@outlook.com" },
      { label: "Phone", value: "+970597010189", href: "tel:+970597010189" },
      { label: "Website", value: "www.mobilelibrary.ps", href: "https://www.mobilelibrary.ps" },
      { label: "Location", value: "Ramallah, Palestine" },
    ],
    notFound: {
      title: "Page not found",
      description: "The page you are looking for may have moved or is no longer available.",
      action: "Go Home",
    },
    legal: {
      privacyTitle: "Privacy Policy",
      termsTitle: "Terms of Service",
      description: "This is a placeholder page and will be replaced with the final policy content before launch.",
      action: "Back to Home",
    },
  },
  ar: {
    brandName: "المكتبة المتنقلة",
    nav: [
      { label: "الرئيسية", href: "/ar" },
      { label: "عن المشروع", href: "/ar/about" },
      { label: "الخدمات", href: "/ar/services" },
      { label: "الفعاليات", href: "/ar/events" },
      { label: "تواصل", href: "/ar/contact" },
    ],
    donateLabel: "تبرع",
    footer: {
      tagline:
        "ننقل الكتب والتعليم والفرح إلى الأطفال والمجتمعات أينما كانوا.",
      quickLinksLabel: "روابط سريعة",
      communityLabel: "المجتمع",
      contactLabel: "تواصل",
      socialLabel: "تابعنا",
      communityLinks: [
        { label: "الفعاليات القادمة", href: "/ar/events" },
        { label: "تطوع معنا", href: "/ar/contact" },
        { label: "قصتنا", href: "/ar/about" },
        { label: "كن شريكًا", href: "/ar/contact" },
      ],
      socialLinks: sharedSocialLinks,
      bottomText: "© 2026 المكتبة المتنقلة. جميع الحقوق محفوظة.",
      privacyLabel: "سياسة الخصوصية",
      termsLabel: "شروط الخدمة",
    },
    contactItems: [
      { label: "البريد الإلكتروني", value: "Mobile.library1@outlook.com", href: "mailto:Mobile.library1@outlook.com" },
      { label: "الهاتف", value: "+970597010189", href: "tel:+970597010189" },
      { label: "الموقع الإلكتروني", value: "www.mobilelibrary.ps", href: "https://www.mobilelibrary.ps" },
      { label: "الموقع", value: "رام الله، فلسطين" },
    ],
    notFound: {
      title: "الصفحة غير موجودة",
      description: "ربما تم نقل الصفحة التي تبحث عنها أو لم تعد متاحة حاليًا.",
      action: "العودة إلى الرئيسية",
    },
    legal: {
      privacyTitle: "سياسة الخصوصية",
      termsTitle: "شروط الخدمة",
      description: "هذه صفحة مؤقتة وسيتم استبدالها بالمحتوى القانوني النهائي قبل الإطلاق.",
      action: "العودة إلى الرئيسية",
    },
  },
};

export function getPublicNav(locale: Locale) {
  return publicSiteCopy[locale].nav;
}
