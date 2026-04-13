import Image from "next/image";

import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type SiteLogoProps = {
  locale: Locale;
  className?: string;
  logoSrc?: string;
};

export function SiteLogo({ locale, className, logoSrc = "/images/logo.png" }: SiteLogoProps) {
  return (
    <div className={cn("flex items-center", className)}>
      <Image
        src={logoSrc}
        alt={locale === "ar" ? "شعار المكتبة المتنقلة" : "Mobile Library logo"}
        width={230}
        height={48}
        className="h-12 w-auto object-contain"
        sizes="230px"
      />
    </div>
  );
}
