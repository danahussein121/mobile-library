import type { Locale } from "@/lib/i18n";

const impactMetrics = {
  en: ["500+", "30+", "10+", "200+"],
  ar: ["+500", "+30", "+10", "+200"],
} satisfies Record<Locale, [string, string, string, string]>;

export function getImpactMetricValues(locale: Locale) {
  return impactMetrics[locale];
}
