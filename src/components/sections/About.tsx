import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Download, GraduationCap } from 'lucide-react';
import { useRef } from 'react';
import { aboutPoints, profile, stats, type Stat } from '../../data/portfolio';
import { useCountUp } from '../../hooks/useCountUp';
import { downloadResume } from '../../lib/resume';
import { Button, ButtonLink } from '../ui/Button';
import { Reveal, fadeUpChild, staggerParent } from '../ui/Reveal';
import { Section, SectionHeading } from '../ui/Section';
import { useToast } from '../ui/Toast';

function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const count = useCountUp(ref, stat.value ?? 0);
  const Icon = stat.icon;
  return (
    <motion.div
      ref={ref}
      variants={fadeUpChild}
      whileHover={{ y: -4 }}
      className="glass group relative overflow-hidden p-5 sm:p-6"
    >
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent-blue/10 blur-2xl transition group-hover:bg-accent-purple/20" />
      <Icon className={`h-5 w-5 ${index % 2 ? 'text-accent-purple' : 'text-accent-blue'}`} aria-hidden="true" />
      <p className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
        {stat.text ?? (
          <>
            {count}
            <span className="text-gradient">{stat.suffix}</span>
          </>
        )}
      </p>
      <p className="mt-1 text-sm text-slate-400">{stat.label}</p>
    </motion.div>
  );
}

export function About() {
  const notify = useToast();
  const onResume = async () => {
    const ok = await downloadResume();
    if (!ok) notify({ tone: 'info', title: 'Resume is being updated', body: `Please request the latest copy at ${profile.email}.` });
  };

  return (
    <Section id="about">
      <SectionHeading id="about" eyebrow="Who I am" title={<>About <span className="text-gradient">Me</span></>} />

      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
        <Reveal>
          <div className="glass relative h-full p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-blue/15 text-accent-blue">
                <GraduationCap className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-semibold text-white">Final-year B.Tech IT student</p>
                <p className="text-sm text-slate-500">Software · Quality · Data</p>
              </div>
            </div>
            {profile.intro.map((p) => (
              <p key={p.slice(0, 20)} className="mb-4 leading-relaxed text-slate-300">
                {p}
              </p>
            ))}
            <ul className="mt-6 grid gap-3">
              {aboutPoints.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-relaxed text-slate-400">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-blue" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="#projects">
                Explore My Work <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
              </ButtonLink>
              <Button variant="secondary" onClick={onResume}>
                <Download className="h-4 w-4" aria-hidden="true" /> Download Resume
              </Button>
            </div>
          </div>
        </Reveal>

        <div className="flex flex-col gap-6">
          <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((s, i) => (
              <StatCard key={s.label} stat={s} index={i} />
            ))}
          </motion.div>

          <Reveal delay={0.15} className="glass flex-1 p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">Three identities, one mindset</p>
            <div className="mt-5 space-y-4">
              {[
                { t: 'Software Developer', d: 'Builds full-stack applications with React, Node.js, Express and MongoDB.', c: 'from-accent-blue' },
                { t: 'QA Engineer', d: 'Designs test cases, explores edge cases and reports bugs that get fixed.', c: 'from-accent-purple' },
                { t: 'Data Analytics Enthusiast', d: 'Cleans, explores and visualises data with Python, Pandas and NumPy.', c: 'from-accent-cyan' },
              ].map((r) => (
                <div key={r.t} className="flex gap-4">
                  <span className={`mt-1 h-10 w-1 shrink-0 rounded-full bg-gradient-to-b ${r.c} to-transparent`} aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-white">{r.t}</p>
                    <p className="text-sm text-slate-400">{r.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
