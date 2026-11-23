import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

type SectionProps = { id: string; children: ReactNode; className?: string };

export function Section({ id, children, className = '' }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`relative py-24 sm:py-28 ${className}`}>
      <div className="container-page">{children}</div>
    </section>
  );
}

type HeadingProps = {
  id: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'center' | 'left';
};

export function SectionHeading({ id, eyebrow, title, description, align = 'center' }: HeadingProps) {
  const center = align === 'center';
  return (
    <Reveal className={`mb-14 max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
      <p
        className={`mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-accent-blue ${center ? 'justify-center' : ''}`}
      >
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-accent-blue" aria-hidden="true" />
        {eyebrow}
        {center && <span className="h-px w-8 bg-gradient-to-l from-transparent to-accent-blue" aria-hidden="true" />}
      </p>
      <h2 id={`${id}-title`} className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && <p className="mt-5 text-base leading-relaxed text-slate-400 sm:text-lg">{description}</p>}
    </Reveal>
  );
}
