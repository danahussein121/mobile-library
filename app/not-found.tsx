import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,#f7fbfb_0%,#eff7f7_52%,#ffffff_100%)] px-6">
      <div className="max-w-xl rounded-[2rem] border border-white/80 bg-white/90 p-10 text-center shadow-[0_30px_80px_-55px_rgba(15,23,42,0.38)]">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary/70">
          404
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">
          Page not found
        </h1>
        <p className="mt-4 text-base leading-8 text-slate-600">
          The page you are looking for is unavailable or the language path is incorrect.
        </p>
        <Link
          href="/en"
          className={cn(buttonVariants({ size: "lg" }), "mt-8 inline-flex rounded-full px-6")}
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
