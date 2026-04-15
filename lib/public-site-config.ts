import type { FooterLink } from "@/data/public-site";
import type { Locale } from "@/lib/i18n";

const SOCIAL_NETWORKS = [
  {
    key: "instagram",
    label: "Instagram",
    envKey: "NEXT_PUBLIC_SOCIAL_INSTAGRAM_URL",
    allowedHosts: ["instagram.com", "www.instagram.com"],
  },
  {
    key: "facebook",
    label: "Facebook",
    envKey: "NEXT_PUBLIC_SOCIAL_FACEBOOK_URL",
    allowedHosts: ["facebook.com", "www.facebook.com", "fb.com", "www.fb.com"],
  },
  {
    key: "x",
    label: "X",
    envKey: "NEXT_PUBLIC_SOCIAL_X_URL",
    allowedHosts: ["x.com", "www.x.com", "twitter.com", "www.twitter.com"],
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    envKey: "NEXT_PUBLIC_SOCIAL_LINKEDIN_URL",
    allowedHosts: ["linkedin.com", "www.linkedin.com"],
  },
] as const;

function cleanValue(value: string | null | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

export function getSafeExternalUrl(
  value: string | null | undefined,
  allowedHosts?: readonly string[],
) {
  const trimmed = cleanValue(value);

  if (!trimmed || trimmed === "#") {
    return null;
  }

  try {
    const url = new URL(trimmed);

    if (url.protocol !== "https:" && url.protocol !== "http:") {
      return null;
    }

    if (allowedHosts && !allowedHosts.includes(url.hostname.toLowerCase())) {
      return null;
    }

    return url.toString();
  } catch {
    return null;
  }
}

function getEnvValue(key: string) {
  return cleanValue(process.env[key]);
}

export function getValidatedSocialLinks(fallbackLinks: FooterLink[] = []) {
  return SOCIAL_NETWORKS.map((network, index) => {
    const fallback = fallbackLinks[index];
    const href =
      getSafeExternalUrl(getEnvValue(network.envKey), network.allowedHosts) ??
      getSafeExternalUrl(fallback?.href, network.allowedHosts);

    if (!href) {
      return null;
    }

    return {
      label: fallback?.label || network.label,
      href,
    };
  }).filter((item): item is FooterLink => Boolean(item));
}

function getDonationFieldValue(key: string) {
  const value = cleanValue(process.env[key]);
  return value && value !== "—" ? value : null;
}

export function getConfiguredDonationFields(locale: Locale) {
  const entries = [
    {
      label: locale === "ar" ? "اسم البنك" : "Bank Name",
      value: getDonationFieldValue("NEXT_PUBLIC_BANK_NAME"),
    },
    {
      label: locale === "ar" ? "اسم الحساب" : "Account Name",
      value: getDonationFieldValue("NEXT_PUBLIC_BANK_ACCOUNT_NAME"),
    },
    {
      label: locale === "ar" ? "رقم الحساب" : "Account Number",
      value: getDonationFieldValue("NEXT_PUBLIC_BANK_ACCOUNT_NUMBER"),
    },
    {
      label: locale === "ar" ? "الآيبان" : "IBAN",
      value: getDonationFieldValue("NEXT_PUBLIC_BANK_IBAN"),
    },
  ];

  return entries.every((item) => Boolean(item.value))
    ? entries.map((item) => ({ label: item.label, value: item.value! }))
    : [];
}

export function getDonationAvailabilityMessage(locale: Locale) {
  return (
    cleanValue(process.env.NEXT_PUBLIC_DONATION_DETAILS) ||
    (locale === "ar"
      ? "طرق التبرع الرسمية ستتوفر قريبًا."
      : "Official donation methods coming soon.")
  );
}
