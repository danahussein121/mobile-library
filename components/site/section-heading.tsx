import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description: string;
  align?: "start" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "start",
  className,
}: SectionHeadingProps) {
  const isCentered = align === "center";

  return (
    <div
      className={cn(
        "max-w-3xl space-y-4 sm:space-y-5",
        isCentered && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/80 sm:text-sm">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-4xl lg:text-[3.3rem] lg:leading-[1.05]">
        {title}
      </h2>
      <p className="text-base leading-8 text-slate-600 sm:text-lg sm:leading-9">
        {description}
      </p>
    </div>
  );
}
