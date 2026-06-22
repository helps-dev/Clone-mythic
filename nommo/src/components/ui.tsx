import type { ReactNode } from "react";

export const Divider = () => (
  <div className="flex items-center justify-center gap-3 text-muted-foreground/70">
    <span className="h-px w-12 bg-current" />
    <span className="text-[10px] tracking-[0.4em] font-display text-accent">✦</span>
    <span className="h-px w-12 bg-current" />
  </div>
);

/** Shared hero header for sub-pages. */
export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div className="absolute inset-0 star-grid opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 to-background" />
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 pt-20 pb-16 text-center">
        <Divider />
        <span className="mt-6 inline-block text-[10px] uppercase tracking-[0.4em] text-muted-foreground font-display">
          {eyebrow}
        </span>
        <h1 className="mt-3 font-display font-bold text-4xl sm:text-6xl leading-[1.05] tracking-wide">
          {title}
        </h1>
        {intro && (
          <p className="mt-6 mx-auto max-w-2xl text-base sm:text-lg text-muted-foreground font-body italic">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
