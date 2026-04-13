import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary px-6">
      <div className="max-w-xl rounded-[20px] bg-white p-10 text-center shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">404</p>
        <h1 className="mt-4 text-[42px] font-bold leading-[1.08] text-[#1A1A2E]">
          Page not found
        </h1>
        <p className="mt-4 text-base leading-8 text-[#666666]">
          The page you are looking for may have moved or is no longer available.
        </p>
        <Link href="/en" className={cn(buttonVariants({ size: "lg" }), "mt-8 inline-flex")}>
          Go Home
        </Link>
      </div>
    </div>
  );
}
