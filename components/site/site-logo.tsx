import Image from "next/image";

import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type SiteLogoProps = {
  locale: Locale;
  className?: string;
  logoSrc?: string;
  logoDisplayWidth?: number;
};

export function SiteLogo({
  locale,
  className,
  logoSrc = "/images/logo.png",
  logoDisplayWidth = 230,
}: SiteLogoProps) {
  return (
    <div
      className={cn("flex items-center", className)}
      style={{ width: `min(${logoDisplayWidth}px, 52vw)` }}
    >
      <Image
        src={logoSrc}
        alt={locale === "ar" ? "شعار المكتبة المتنقلة" : "Mobile Library logo"}
        width={400}
        height={120}
        className="h-auto w-full max-w-full object-contain"
        sizes={`(max-width: 640px) 52vw, ${logoDisplayWidth}px`}
      />
    </div>
  );
}
