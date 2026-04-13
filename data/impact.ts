import type { Locale } from "@/lib/i18n";

export type ImpactMetric = {
  key: "beneficiaries" | "events" | "locations" | "talents";
  label: string;
  value: string;
};

const impactMetrics: Record<Locale, ImpactMetric[]> = {
  en: [
    { key: "beneficiaries", label: "Beneficiaries", value: "500+" },
    { key: "events", label: "Events", value: "30+" },
    { key: "locations", label: "Locations", value: "10+" },
    { key: "talents", label: "Talents discovered", value: "200+" },
  ],
  ar: [
    { key: "beneficiaries", label: "عدد المستفيدين", value: "+500" },
    { key: "events", label: "عدد الفعاليات", value: "+30" },
    { key: "locations", label: "عدد المواقع", value: "+10" },
    { key: "talents", label: "عدد المواهب المكتشفة", value: "+200" },
  ],
};

export function getImpactMetrics(locale: Locale) {
  return impactMetrics[locale];
}
