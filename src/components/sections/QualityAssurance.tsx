import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { Bug, ClipboardList, FileSearch, ListChecks, Pause, Play, PlayCircle, RefreshCcw, ShieldCheck } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { qaSkills, qaWorkflow } from '../../data/portfolio';
import { Reveal } from '../ui/Reveal';
import { Section, SectionHeading } from '../ui/Section';

const stepIcons = [FileSearch, ClipboardList, ListChecks, PlayCircle, Bug, RefreshCcw];

function Workflow() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-100px' });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!playing || !inView || reduce) return;
    const t = window.setInterval(() => setActive((a) => (a + 1) % qaWorkflow.length), 3200);
    return () => window.clearInterval(t);
  }, [playing, inView, reduce]);

  const select = (i: number) => {
    setActive(i);
    setPlaying(false);
  };

  const progress = (active / (qaWorkflow.length - 1)) * 100;
  const step = qaWorkflow[active];
  const ActiveIcon = stepIcons[active];

  return (
    <div ref={ref} className="glass relative overflow-hidden p-5 sm:p-8">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">Interactive workflow</p>
          <h3 className="mt-1 font-display text-xl font-semibold text-white">Software Testing Life Cycle</h3>
        </div>
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-slate-300 transition hover:text-white"
          aria-label={playing ? 'Pause workflow animation' : 'Play workflow animation'}
        >
          {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          {playing ? 'Pause' : 'Play'}
        </button>
      </div>

      {/* Desktop: horizontal track. Mobile: vertical list. */}
      <div className="relative">
        <div className="absolute left-[8.33%] right-[8.33%] top-7 hidden h-[2px] bg-white/10 md:block" aria-hidden="true">
          <motion.div
            className="h-full bg-gradient-to-r from-accent-blue to-accent-purple"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />
        </div>
        <div className="absolute bottom-7 left-7 top-7 w-[2px] bg-white/10 md:hidden" aria-hidden="true">
          <motion.div
            className="w-full bg-gradient-to-b from-accent-blue to-accent-purple"
            animate={{ height: `${progress}%` }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />
        </div>

        <ol className="relative grid gap-4 md:grid-cols-6 md:gap-2" role="tablist" aria-label="Testing workflow steps">
          {qaWorkflow.map((s, i) => {
            const Icon = stepIcons[i];
            const isActive = i === active;
            const done = i < active;
            return (
              <li key={s.title} className="md:text-center">
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="qa-step-panel"
                  onClick={() => select(i)}
                  className="group flex w-full items-center gap-4 text-left md:flex-col md:gap-3 md:text-center"
                >
                  <span
                    className={`relative grid h-14 w-14 shrink-0 place-items-center rounded-2xl border transition-all duration-500 ${
                      isActive
                        ? 'border-transparent bg-gradient-to-br from-accent-blue to-accent-purple text-white shadow-lg shadow-accent-blue/40'
                        : done
                          ? 'border-accent-blue/40 bg-ink-800 text-accent-blue'
                          : 'border-white/10 bg-ink-800 text-slate-500 group-hover:border-white/25 group-hover:text-slate-300'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="qa-ring"
                        className="absolute -inset-1.5 rounded-[1.1rem] border border-accent-blue/50"
                        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                      />
                    )}
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-mono text-[10px] text-slate-600">STEP 0{i + 1}</span>
                    <span className={`block text-sm font-medium transition ${isActive ? 'text-white' : 'text-slate-400'}`}>{s.title}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <div id="qa-step-panel" role="tabpanel" className="mt-8 min-h-[9rem] rounded-xl border border-white/[0.06] bg-ink-950/50 p-5 sm:p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-4 sm:flex-row sm:items-start"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent-purple/15 text-accent-purple">
              <ActiveIcon className="h-6 w-6" aria-hidden="true" />
            </span>
            <div className="flex-1">
              <p className="font-display text-lg font-semibold text-white">{step.title}</p>
              <p className="mt-1 leading-relaxed text-slate-400">{step.detail}</p>
              <p className="mt-3 inline-flex items-center gap-2 rounded-md bg-emerald-400/10 px-2.5 py-1 font-mono text-xs text-emerald-300">
                output → {step.output}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function QualityAssurance() {
  return (
    <Section id="qa">
      <SectionHeading
        id="qa"
        eyebrow="Quality engineering"
        title={
          <>
            Quality Is Not an Option. <br className="hidden sm:block" />
            <span className="text-gradient">It&apos;s a Standard.</span>
          </>
        }
      />

      <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <Reveal className="glass p-6 sm:p-8">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-400/15 text-emerald-300">
            <ShieldCheck className="h-6 w-6" aria-hidden="true" />
          </span>
          <p className="mt-5 leading-relaxed text-slate-300">
            Building software is only half the job. Making sure it works for real users, under real conditions, is the other half.
            Developing applications for actual clients showed me how much a single missed edge case can cost, and that is what drew me
            to software quality engineering.
          </p>
          <p className="mt-4 leading-relaxed text-slate-400">
            I approach testing with a developer&apos;s understanding of how code breaks: reading requirements critically, designing test
            cases that cover boundaries and negative paths, exploring beyond the script, and writing bug reports that are easy to reproduce
            and fix.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="glass p-6 sm:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">Testing capabilities</p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {qaSkills.map((s, i) => (
              <motion.li
                key={s}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ x: 4 }}
                className={`flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-slate-200 transition-colors hover:border-emerald-400/30 ${
                  i === qaSkills.length - 1 ? 'sm:col-span-2' : ''
                }`}
              >
                <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_10px] shadow-emerald-400/70" aria-hidden="true" />
                {s}
              </motion.li>
            ))}
          </ul>
        </Reveal>
      </div>

      <Reveal>
        <Workflow />
      </Reveal>
    </Section>
  );
}
