"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";
import { publicSiteCopy } from "@/data/public-site";
import { cn } from "@/lib/utils";

export default function LocaleNotFound() {
  const params = useParams<{ locale: string }>();
  const locale = params?.locale === "ar" ? "ar" : "en";
  const copy = publicSiteCopy[locale].notFound;

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6 py-16">
      <div className="max-w-xl rounded-[20px] bg-white p-10 text-center shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">404</p>
        <h1 className="mt-4 text-[42px] font-bold leading-[1.08] text-[#1A1A2E]">
          {copy.title}
        </h1>
        <p className="mt-4 text-base leading-8 text-[#666666]">{copy.description}</p>
        <Link
          href={`/${locale}`}
          className={cn(buttonVariants({ size: "lg" }), "mt-8 inline-flex")}
        >
          {copy.action}
        </Link>
      </div>
    </div>
  );
}
