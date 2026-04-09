import { Container } from "@/components/site/container";
import { FadeIn } from "@/components/site/fade-in";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pt-28 pb-18 sm:pt-32 sm:pb-22 lg:pb-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(20,184,166,0.14),transparent_42%),linear-gradient(180deg,rgba(247,251,251,0.95),rgba(238,247,247,0.7)_58%,transparent_100%)]" />
      <Container>
        <FadeIn distance={18}>
          <div className="max-w-4xl rounded-[2.35rem] border border-white/75 bg-white/82 p-8 shadow-[0_34px_90px_-48px_rgba(15,23,42,0.38)] backdrop-blur sm:p-12 lg:p-14">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/75 sm:text-sm">
              {eyebrow ?? "Mobile Library"}
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-[4rem] lg:leading-[1.02]">
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg sm:leading-9">
              {description}
            </p>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
