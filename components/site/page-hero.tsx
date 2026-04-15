import { Container } from "@/components/site/container";
import { FadeIn } from "@/components/site/fade-in";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="bg-primary py-20 text-white">
      <Container>
        <FadeIn>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/80">
            {eyebrow}
          </p>
          <h1 className="mt-4 text-[42px] font-bold leading-[1.08] text-white sm:text-[48px]">
            {title}
          </h1>
          {description ? (
            <p className="mt-4 max-w-3xl text-base leading-8 text-white/90">
              {description}
            </p>
          ) : null}
        </FadeIn>
      </Container>
    </section>
  );
}
