import type { Locale } from "@/lib/i18n";

function resolveBankValue(value: string | undefined) {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : "—";
}

export function getPublicBankFields(locale: Locale) {
  return [
    {
      label: locale === "ar" ? "اسم البنك" : "Bank Name",
      value: resolveBankValue(process.env.NEXT_PUBLIC_BANK_NAME),
    },
    {
      label: locale === "ar" ? "اسم الحساب" : "Account Name",
      value: resolveBankValue(process.env.NEXT_PUBLIC_BANK_ACCOUNT_NAME),
    },
    {
      label: locale === "ar" ? "رقم الحساب" : "Account Number",
      value: resolveBankValue(process.env.NEXT_PUBLIC_BANK_ACCOUNT_NUMBER),
    },
    {
      label: locale === "ar" ? "الآيبان" : "IBAN",
      value: resolveBankValue(process.env.NEXT_PUBLIC_BANK_IBAN),
    },
  ];
}
