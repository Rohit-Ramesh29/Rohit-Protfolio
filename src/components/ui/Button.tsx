import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary';

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60';

const variants: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-accent-blue to-accent-purple text-white shadow-[0_10px_30px_-10px_rgba(59,130,246,0.7)] hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-8px_rgba(139,92,246,0.8)]',
  secondary:
    'border border-white/15 bg-white/[0.04] text-white backdrop-blur hover:-translate-y-0.5 hover:border-accent-blue/60 hover:bg-white/[0.08]',
};

type Common = { variant?: Variant; children: ReactNode; className?: string };

export function ButtonLink({ variant = 'primary', className = '', children, ...rest }: Common & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </a>
  );
}

export function Button({ variant = 'primary', className = '', children, ...rest }: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
