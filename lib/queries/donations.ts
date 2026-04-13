import { unstable_noStore as noStore } from "next/cache";
import { cache } from "react";

import { getImpactMetrics, type ImpactMetric } from "@/data/impact";
import { db } from "@/lib/db";
import type { Locale } from "@/lib/i18n";

type DonationPageContent = {
  heading: string;
  tabs: {
    bankTransfer: string;
    onlineSoon: string;
  };
  bankTransfer: {
    title: string;
    fields: Array<{ label: string; value: string }>;
    referenceNote: string;
  };
  form: {
    title: string;
    description: string;
    name: string;
    amount: string;
    note: string;
    transferDate: string;
    submit: string;
  };
  onlineSoon: {
    title: string;
    description: string;
  };
  impactMetrics: ImpactMetric[];
};

function localize(
  locale: Locale,
  en: string | null | undefined,
  ar: string | null | undefined,
  fallback: string,
) {
  if (locale === "ar") {
    return ar?.trim() || en?.trim() || fallback;
  }

  return en?.trim() || ar?.trim() || fallback;
}

function resolveValue(value: string | null | undefined, fallback: string) {
  const trimmed = value?.trim();
  return trimmed || fallback;
}

function getEnvBankFallback(locale: Locale) {
  return [
    {
      label: locale === "ar" ? "اسم البنك" : "Bank Name",
      value: process.env.NEXT_PUBLIC_BANK_NAME?.trim() || "—",
    },
    {
      label: locale === "ar" ? "اسم الحساب" : "Account Name",
      value: process.env.NEXT_PUBLIC_BANK_ACCOUNT_NAME?.trim() || "—",
    },
    {
      label: locale === "ar" ? "رقم الحساب" : "Account Number",
      value: process.env.NEXT_PUBLIC_BANK_ACCOUNT_NUMBER?.trim() || "—",
    },
    {
      label: locale === "ar" ? "الآيبان" : "IBAN",
      value: process.env.NEXT_PUBLIC_BANK_IBAN?.trim() || "—",
    },
  ];
}

async function loadPublicDonationContent(locale: Locale): Promise<DonationPageContent> {
  const isArabic = locale === "ar";
  const bankFallback = getEnvBankFallback(locale);
  const impactFallback = getImpactMetrics(locale);

  const fallback: DonationPageContent = {
    heading: isArabic ? "ادعم المشروع" : "Support the Project",
    tabs: {
      bankTransfer: isArabic ? "التحويل البنكي" : "Bank Transfer",
      onlineSoon: isArabic ? "أونلاين (قريبًا)" : "Online (Coming Soon)",
    },
    bankTransfer: {
      title: isArabic ? "بيانات التحويل البنكي" : "Bank Transfer Details",
      fields: bankFallback,
      referenceNote: isArabic
        ? "يرجى إضافة MobileLibraryDonation كمرجع للتحويل."
        : "Please include MobileLibraryDonation as reference.",
    },
    form: {
      title: isArabic ? "أبلغنا بالتحويل" : "Notify Us",
      description: isArabic
        ? "بعد إتمام التحويل يمكنك إرسال التفاصيل التالية ليتابع فريقنا عملية التبرع."
        : "Once you complete the transfer, send the details below so our team can follow up on your donation.",
      name: isArabic ? "الاسم" : "Name",
      amount: isArabic ? "المبلغ (اختياري)" : "Amount (optional)",
      note: isArabic ? "ملاحظات" : "Notes",
      transferDate: isArabic ? "تاريخ التحويل" : "Transfer Date",
      submit: isArabic ? "إرسال" : "Submit",
    },
    onlineSoon: {
      title: isArabic ? "التبرع الإلكتروني قريبًا" : "Online giving is coming soon",
      description: isArabic
        ? "نعمل على إضافة وسائل تبرع إلكترونية آمنة لتسهيل المشاركة والدعم."
        : "We are working on secure online giving options to make support even easier.",
    },
    impactMetrics: impactFallback,
  };

  if (!process.env.DATABASE_URL) {
    return fallback;
  }

  try {
    const [donationSettings, homePage] = await Promise.all([
      db.donationSettings.findUnique({ where: { id: "donation-settings" } }),
      db.homePage.findUnique({ where: { id: "home-page" } }),
    ]);

    return {
      heading: donationSettings
        ? localize(locale, donationSettings.headingEn, donationSettings.headingAr, fallback.heading)
        : fallback.heading,
      tabs: {
        bankTransfer: donationSettings
          ? localize(
              locale,
              donationSettings.bankTransferTabEn,
              donationSettings.bankTransferTabAr,
              fallback.tabs.bankTransfer,
            )
          : fallback.tabs.bankTransfer,
        onlineSoon: donationSettings
          ? localize(
              locale,
              donationSettings.onlineSoonTabEn,
              donationSettings.onlineSoonTabAr,
              fallback.tabs.onlineSoon,
            )
          : fallback.tabs.onlineSoon,
      },
      bankTransfer: {
        title: donationSettings
          ? localize(
              locale,
              donationSettings.bankTransferTitleEn,
              donationSettings.bankTransferTitleAr,
              fallback.bankTransfer.title,
            )
          : fallback.bankTransfer.title,
        fields: donationSettings
          ? [
              {
                label: localize(
                  locale,
                  donationSettings.bankNameLabelEn,
                  donationSettings.bankNameLabelAr,
                  bankFallback[0].label,
                ),
                value: resolveValue(donationSettings.bankNameValue, bankFallback[0].value),
              },
              {
                label: localize(
                  locale,
                  donationSettings.accountNameLabelEn,
                  donationSettings.accountNameLabelAr,
                  bankFallback[1].label,
                ),
                value: resolveValue(donationSettings.accountNameValue, bankFallback[1].value),
              },
              {
                label: localize(
                  locale,
                  donationSettings.accountNumberLabelEn,
                  donationSettings.accountNumberLabelAr,
                  bankFallback[2].label,
                ),
                value: resolveValue(donationSettings.accountNumberValue, bankFallback[2].value),
              },
              {
                label: localize(
                  locale,
                  donationSettings.ibanLabelEn,
                  donationSettings.ibanLabelAr,
                  bankFallback[3].label,
                ),
                value: resolveValue(donationSettings.ibanValue, bankFallback[3].value),
              },
            ]
          : fallback.bankTransfer.fields,
        referenceNote: donationSettings
          ? localize(
              locale,
              donationSettings.referenceNoteEn,
              donationSettings.referenceNoteAr,
              fallback.bankTransfer.referenceNote,
            )
          : fallback.bankTransfer.referenceNote,
      },
      form: {
        title: donationSettings
          ? localize(locale, donationSettings.formTitleEn, donationSettings.formTitleAr, fallback.form.title)
          : fallback.form.title,
        description: donationSettings
          ? localize(
              locale,
              donationSettings.formDescriptionEn,
              donationSettings.formDescriptionAr,
              fallback.form.description,
            )
          : fallback.form.description,
        name: donationSettings
          ? localize(locale, donationSettings.formNameLabelEn, donationSettings.formNameLabelAr, fallback.form.name)
          : fallback.form.name,
        amount: donationSettings
          ? localize(locale, donationSettings.formAmountLabelEn, donationSettings.formAmountLabelAr, fallback.form.amount)
          : fallback.form.amount,
        note: donationSettings
          ? localize(locale, donationSettings.formNoteLabelEn, donationSettings.formNoteLabelAr, fallback.form.note)
          : fallback.form.note,
        transferDate: donationSettings
          ? localize(
              locale,
              donationSettings.formTransferDateLabelEn,
              donationSettings.formTransferDateLabelAr,
              fallback.form.transferDate,
            )
          : fallback.form.transferDate,
        submit: donationSettings
          ? localize(
              locale,
              donationSettings.formSubmitLabelEn,
              donationSettings.formSubmitLabelAr,
              fallback.form.submit,
            )
          : fallback.form.submit,
      },
      onlineSoon: {
        title: donationSettings
          ? localize(
              locale,
              donationSettings.placeholderTitleEn,
              donationSettings.placeholderTitleAr,
              fallback.onlineSoon.title,
            )
          : fallback.onlineSoon.title,
        description: donationSettings
          ? localize(
              locale,
              donationSettings.placeholderDescriptionEn,
              donationSettings.placeholderDescriptionAr,
              fallback.onlineSoon.description,
            )
          : fallback.onlineSoon.description,
      },
      impactMetrics: homePage
        ? [
            {
              key: "beneficiaries",
              label: localize(locale, homePage.statOneLabelEn, homePage.statOneLabelAr, impactFallback[0].label),
              value: resolveValue(homePage.statOneValue, impactFallback[0].value),
            },
            {
              key: "events",
              label: localize(locale, homePage.statTwoLabelEn, homePage.statTwoLabelAr, impactFallback[1].label),
              value: resolveValue(homePage.statTwoValue, impactFallback[1].value),
            },
            {
              key: "locations",
              label: localize(locale, homePage.statThreeLabelEn, homePage.statThreeLabelAr, impactFallback[2].label),
              value: resolveValue(homePage.statThreeValue, impactFallback[2].value),
            },
            {
              key: "talents",
              label: localize(locale, homePage.statFourLabelEn, homePage.statFourLabelAr, impactFallback[3].label),
              value: resolveValue(homePage.statFourValue, impactFallback[3].value),
            },
          ]
        : fallback.impactMetrics,
    };
  } catch (error) {
    console.error("Failed to load donation content", error);
    return fallback;
  }
}

const getCachedPublicDonationContent = cache(loadPublicDonationContent);

export async function getPublicDonationContent(locale: Locale) {
  noStore();
  return getCachedPublicDonationContent(locale);
}
