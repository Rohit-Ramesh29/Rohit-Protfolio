import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Download, MapPin, MessageSquare, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { heroBadges, profile } from '../../data/portfolio';
import { downloadResume } from '../../lib/resume';
import { ButtonLink } from '../ui/Button';
import { useToast } from '../ui/Toast';
import { GithubIcon, LinkedinIcon } from '../icons/BrandIcons';

/** Types and deletes each role in turn. */
function RotatingRole() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(reduce ? profile.roles[0] : '');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce) {
      const t = window.setInterval(() => setIndex((i) => (i + 1) % profile.roles.length), 2600);
      return () => window.clearInterval(t);
    }
    const full = profile.roles[index];
    let delay = deleting ? 35 : 70;
    if (!deleting && text === full) delay = 1800;
    const t = window.setTimeout(() => {
      if (!deleting && text === full) return setDeleting(true);
      if (deleting && text === '') {
        setDeleting(false);
        setIndex((i) => (i + 1) % profile.roles.length);
        return;
      }
      setText(deleting ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1));
    }, delay);
    return () => window.clearTimeout(t);
  }, [text, deleting, index, reduce]);

  return (
    <span className="font-mono text-base text-slate-300 sm:text-lg" aria-live="off">
      <span className="text-accent-blue">&gt;</span> {reduce ? profile.roles[index] : text}
      <span className="ml-0.5 inline-block h-5 w-[2px] translate-y-1 animate-blink bg-accent-blue" aria-hidden="true" />
    </span>
  );
}

/** Portrait with a graceful initials fallback until public/images/profile.jpg is added. */
function Portrait() {
  const [failed, setFailed] = useState(false);
  return (
    <div className="relative mx-auto aspect-square w-64 sm:w-80 lg:w-[22rem]">
      {/* rotating gradient ring */}
      <div className="absolute -inset-6 animate-spin-slow rounded-full bg-[conic-gradient(from_0deg,#3B82F6,#8B5CF6,#22D3EE,#3B82F6)] opacity-70 blur-2xl" />
      <div className="absolute -inset-[3px] animate-spin-slow rounded-full bg-[conic-gradient(from_180deg,#3B82F6,#8B5CF6,transparent_60%,#3B82F6)]" />
      <div className="absolute inset-0 overflow-hidden rounded-full border-4 border-ink-950 bg-ink-800">
        {!failed ? (
          <img
            src={profile.photo}
            alt={`Portrait of ${profile.name}`}
            width={800}
            height={800}
            fetchPriority="high"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover object-[center_25%]"
          />
        ) : (
          <div
            role="img"
            aria-label={`${profile.name} monogram`}
            className="relative grid h-full w-full place-items-center bg-[radial-gradient(circle_at_30%_20%,#1E293B,#0B0F19_70%)]"
          >
            <div className="grid-bg absolute inset-0 opacity-60" />
            <span className="relative font-display text-7xl font-bold tracking-tight text-gradient sm:text-8xl">RR</span>
          </div>
        )}
      </div>
    </div>
  );
}

const badgePositions = [
  'left-[-6%] top-[8%]',
  'right-[-4%] top-[4%]',
  'right-[-12%] top-[44%]',
  'left-[-14%] top-[48%]',
  'left-[2%] bottom-[2%]',
  'right-[0%] bottom-[6%]',
];

export function Hero() {
  const notify = useToast();

  const onResume = async () => {
    const ok = await downloadResume();
    if (!ok)
      notify({
        tone: 'info',
        title: 'Resume is being updated',
        body: `Please request the latest copy at ${profile.email}.`,
      });
  };

  return (
    <section id="home" aria-label="Introduction" className="relative flex min-h-[100svh] items-center overflow-x-clip pb-16 pt-28 sm:pt-32">
      <div className="container-page grid items-center gap-16 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3.5 py-1.5 text-xs font-medium text-emerald-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for Opportunities
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Building Quality Software.{' '}
            <span className="text-gradient-animated">Creating Real-World Impact.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="mt-6 space-y-3"
          >
            <p className="text-lg text-slate-300 sm:text-xl">
              Hi, I&apos;m <span className="font-semibold text-white">{profile.name}</span>
              <Sparkles className="mb-1 ml-1.5 inline h-4 w-4 text-accent-purple" aria-hidden="true" />
            </p>
            <RotatingRole />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg"
          >
            {profile.intro[0]}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <ButtonLink href="#projects">
              View Projects <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="#contact" variant="secondary">
              <MessageSquare className="h-4 w-4" aria-hidden="true" /> Contact Me
            </ButtonLink>
            <button
              type="button"
              onClick={onResume}
              className="inline-flex items-center gap-2 px-2 py-3 text-sm font-medium text-slate-400 underline-offset-4 transition hover:text-white hover:underline"
            >
              <Download className="h-4 w-4" aria-hidden="true" /> Resume
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-10 flex flex-wrap items-center gap-5 text-sm text-slate-500"
          >
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" aria-hidden="true" /> {profile.location}
            </span>
            <span className="hidden h-4 w-px bg-white/10 sm:block" aria-hidden="true" />
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 transition hover:text-white">
              <GithubIcon className="h-4 w-4" /> GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 transition hover:text-white">
              <LinkedinIcon className="h-4 w-4" /> LinkedIn
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto px-8 py-6 sm:px-12"
        >
          <Portrait />
          {heroBadges.map((b, i) => (
            <motion.span
              key={b}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
              transition={{
                opacity: { delay: 0.6 + i * 0.1 },
                scale: { delay: 0.6 + i * 0.1, type: 'spring' },
                y: { duration: 4 + (i % 3), repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 },
              }}
              className={`glass absolute ${badgePositions[i]} flex items-center gap-1.5 bg-ink-800/70 px-3 py-1.5 font-mono text-[11px] font-medium text-white shadow-lg sm:text-xs`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${i % 2 ? 'bg-accent-purple' : 'bg-accent-blue'}`} aria-hidden="true" />
              {b}
            </motion.span>
          ))}
        </motion.div>
      </div>

      <a
        href="#about"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-slate-500 transition hover:text-white md:flex"
        aria-label="Scroll to About section"
      >
        Scroll
        <span className="flex h-9 w-5 justify-center rounded-full border border-white/20 pt-1.5">
          <motion.span
            className="h-2 w-1 rounded-full bg-white/70"
            animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        </span>
      </a>
    </section>
  );
}
