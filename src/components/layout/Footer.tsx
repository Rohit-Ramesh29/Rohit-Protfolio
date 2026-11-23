import { Mail, MapPin } from 'lucide-react';
import { navLinks, profile } from '../../data/portfolio';
import { GithubIcon, LinkedinIcon } from '../icons/BrandIcons';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-white/[0.06] bg-ink-950/60">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-blue/50 to-transparent" />
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <a href="#home" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-accent-blue to-accent-purple font-display text-sm font-bold text-white">
              RR
            </span>
            <span className="font-display text-lg font-semibold text-white">{profile.name}</span>
          </a>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">{profile.title}</p>
          <p className="mt-3 flex items-center gap-2 text-sm text-slate-500">
            <MapPin className="h-4 w-4" aria-hidden="true" /> {profile.location}
          </p>
        </div>

        <nav aria-label="Footer">
          <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-slate-500">Navigate</h3>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="text-slate-400 transition hover:text-white">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-slate-500">Connect</h3>
          <div className="flex gap-3">
            {[
              { href: `mailto:${profile.email}`, label: 'Email', icon: <Mail className="h-5 w-5" /> },
              { href: profile.github, label: 'GitHub', icon: <GithubIcon className="h-5 w-5" /> },
              { href: profile.linkedin, label: 'LinkedIn', icon: <LinkedinIcon className="h-5 w-5" /> },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-300 transition hover:-translate-y-0.5 hover:border-accent-blue/50 hover:text-white"
              >
                {s.icon}
              </a>
            ))}
          </div>
          <a href={`mailto:${profile.email}`} className="mt-4 block break-all text-sm text-slate-400 transition hover:text-white">
            {profile.email}
          </a>
        </div>
      </div>
      <div className="border-t border-white/[0.06]">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-xs text-slate-500 sm:flex-row">
          <p>© {year} {profile.name}. All rights reserved.</p>
          <p>Designed &amp; built with React, TypeScript, Tailwind CSS &amp; Framer Motion.</p>
        </div>
      </div>
    </footer>
  );
}
