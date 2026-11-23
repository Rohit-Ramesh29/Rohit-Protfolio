import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Check, ExternalLink, Lock } from 'lucide-react';
import type { MouseEvent, ReactNode } from 'react';
import { profile, projects, type Project } from '../../data/portfolio';
import { GithubIcon } from '../icons/BrandIcons';
import { EdaMockup, GoldBusinessMockup, InterviewMentorMockup } from '../mockups/ProjectMockups';
import { MockupLabel } from '../ui/MockupLabel';
import { Reveal } from '../ui/Reveal';
import { Section, SectionHeading } from '../ui/Section';

const visuals: Record<Project['id'], ReactNode> = {
  gold: <GoldBusinessMockup />,
  mentor: <InterviewMentorMockup />,
  eda: <EdaMockup />,
};

/** Mockup with a subtle 3D tilt that follows the pointer. */
function TiltVisual({ children }: { children: ReactNode }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div className="[perspective:1200px]" onMouseMove={onMove} onMouseLeave={reset}>
      <motion.div style={{ rotateX: rx, rotateY: ry }} className="relative will-change-transform">
        <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-accent-blue/25 via-accent-purple/20 to-transparent opacity-60 blur-2xl" />
        {children}
      </motion.div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reversed = index % 2 === 1;
  return (
    <Reveal>
      <article className="glass group grid items-center gap-8 p-5 sm:p-8 lg:grid-cols-2 lg:gap-12">
        <div className={reversed ? 'lg:order-2' : ''}>
          <TiltVisual>{visuals[project.id]}</TiltVisual>
          <div className="mt-4 flex justify-center lg:justify-start">
            <MockupLabel />
          </div>
        </div>

        <div className={reversed ? 'lg:order-1' : ''}>
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm text-slate-600">0{index + 1}</span>
            <span className="chip border-accent-blue/25 bg-accent-blue/10 text-accent-blue">{project.category}</span>
          </div>
          <h3 className="mt-4 font-display text-2xl font-semibold leading-tight text-white sm:text-3xl">{project.title}</h3>
          <p className="mt-4 leading-relaxed text-slate-400">{project.description}</p>

          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {project.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-accent-purple/20 text-accent-purple">
                  <Check className="h-3 w-3" aria-hidden="true" />
                </span>
                {f}
              </li>
            ))}
          </ul>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies used">
            {project.tech.map((t) => (
              <li key={t} className="rounded-md border border-white/10 bg-ink-950/60 px-2.5 py-1 font-mono text-xs text-slate-300">
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-ink-950 transition hover:-translate-y-0.5 hover:bg-slate-200"
              >
                <GithubIcon className="h-4 w-4" /> View on GitHub <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : project.id === 'eda' ? (
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-accent-blue/60"
              >
                <GithubIcon className="h-4 w-4" /> GitHub Profile <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : null}

            {project.demo ? (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-accent-blue/60"
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" /> Live Demo
              </a>
            ) : (
              project.privateNote &&
              project.id !== 'eda' && (
                <span className="inline-flex items-center gap-2 rounded-xl border border-dashed border-white/15 px-4 py-2.5 text-sm text-slate-500">
                  <Lock className="h-4 w-4" aria-hidden="true" /> {project.privateNote}
                </span>
              )
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function Projects() {
  return (
    <Section id="projects">
      <SectionHeading
        id="projects"
        eyebrow="Selected work"
        title={<>Featured <span className="text-gradient">Projects</span></>}
        description="Real projects across freelance development, AI-powered applications and data analysis. Visuals are code-built concept mockups, clearly labelled, as the original screens are private."
      />
      <div className="space-y-8">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
      <Reveal className="mt-12 text-center">
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white"
        >
          <GithubIcon className="h-4 w-4" /> See more on GitHub <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </Reveal>
    </Section>
  );
}
