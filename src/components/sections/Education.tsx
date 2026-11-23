import { motion } from 'framer-motion';
import { Award, BadgeCheck, Calendar, ExternalLink, GraduationCap, School } from 'lucide-react';
import { certifications, education } from '../../data/portfolio';
import { Reveal } from '../ui/Reveal';
import { Section, SectionHeading } from '../ui/Section';

export function Education() {
  return (
    <Section id="education">
      <SectionHeading
        id="education"
        eyebrow="Learning"
        title={
          <>
            Education &amp; <span className="text-gradient">Certifications</span>
          </>
        }
      />

      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        {/* Timeline */}
        <div>
          <h3 className="mb-6 flex items-center gap-2 font-display text-lg font-semibold text-white">
            <GraduationCap className="h-5 w-5 text-accent-blue" aria-hidden="true" /> Education
          </h3>
          <ol className="relative space-y-6 border-l border-white/10 pl-8">
            {education.map((e, i) => (
              <Reveal key={e.degree} delay={i * 0.1}>
                <li className="relative">
                  <span
                    className={`absolute -left-[41px] top-6 grid h-5 w-5 place-items-center rounded-full border-4 border-ink-950 ${
                      e.current ? 'bg-accent-blue shadow-[0_0_0_4px_rgba(59,130,246,0.25)]' : 'bg-slate-600'
                    }`}
                    aria-hidden="true"
                  />
                  <motion.div whileHover={{ x: 4 }} className="glass p-6">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="chip">
                        <Calendar className="h-3.5 w-3.5" aria-hidden="true" /> {e.period}
                      </span>
                      {e.current && <span className="chip border-emerald-400/25 bg-emerald-400/10 text-emerald-300">Final year</span>}
                    </div>
                    <h4 className="mt-4 font-display text-xl font-semibold text-white">{e.degree}</h4>
                    <p className="mt-1 flex items-start gap-2 text-sm text-slate-400">
                      <School className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" /> {e.institution}
                    </p>
                    <p className="mt-4 inline-block rounded-lg bg-gradient-to-r from-accent-blue/15 to-accent-purple/15 px-3 py-1.5 font-mono text-sm font-medium text-white">
                      {e.score}
                    </p>
                  </motion.div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* Certifications */}
        <div>
          <h3 className="mb-6 flex items-center gap-2 font-display text-lg font-semibold text-white">
            <Award className="h-5 w-5 text-accent-purple" aria-hidden="true" /> Certifications
          </h3>
          <div className="space-y-6">
            {certifications.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.1}>
                <motion.article
                  whileHover={{ y: -4, rotate: -0.3 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-ink-800 to-ink-900 p-[1px]"
                >
                  <div className="relative overflow-hidden rounded-[15px] bg-ink-900/95 p-6">
                    {/* certificate guilloche-style border */}
                    <div className="pointer-events-none absolute inset-2 rounded-xl border border-dashed border-white/[0.08]" aria-hidden="true" />
                    <div
                      className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-accent-purple/15 blur-2xl transition group-hover:bg-accent-blue/25"
                      aria-hidden="true"
                    />
                    <div className="relative flex items-start gap-4">
                      <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-amber-300/30 bg-gradient-to-br from-amber-300/20 to-amber-600/10 text-amber-200">
                        <BadgeCheck className="h-7 w-7" aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500">Certificate · {c.area}</p>
                        <h4 className="mt-1 font-display text-xl font-semibold text-white">{c.title} Certification</h4>
                        {c.issuer && (
                          <p className="mt-2 text-sm text-slate-400">
                            Issued by <span className="font-semibold text-white">{c.issuer}</span>
                          </p>
                        )}
                        {c.credentialUrl && (
                          <a
                            href={c.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 inline-flex items-center gap-1.5 text-sm text-accent-blue hover:underline"
                          >
                            View credential <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
