import { motion } from 'framer-motion';
import { skillGroups, type SkillGroup } from '../../data/portfolio';
import { fadeUpChild, staggerParent } from '../ui/Reveal';
import { Section, SectionHeading } from '../ui/Section';

const accentMap: Record<SkillGroup['accent'], { text: string; bg: string; chip: string; glow: string }> = {
  blue: {
    text: 'text-accent-blue',
    bg: 'bg-accent-blue/15',
    chip: 'hover:border-accent-blue/50 hover:bg-accent-blue/10',
    glow: 'group-hover:shadow-accent-blue/20',
  },
  purple: {
    text: 'text-accent-purple',
    bg: 'bg-accent-purple/15',
    chip: 'hover:border-accent-purple/50 hover:bg-accent-purple/10',
    glow: 'group-hover:shadow-accent-purple/20',
  },
  cyan: {
    text: 'text-accent-cyan',
    bg: 'bg-accent-cyan/15',
    chip: 'hover:border-accent-cyan/50 hover:bg-accent-cyan/10',
    glow: 'group-hover:shadow-accent-cyan/20',
  },
};

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeading
        id="skills"
        eyebrow="Toolbox"
        title={<>Technical <span className="text-gradient">Skills</span></>}
        description="Technologies I work with across software development, testing and data analytics."
      />

      <motion.div
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {skillGroups.map((group) => {
          const a = accentMap[group.accent];
          const Icon = group.icon;
          return (
            <motion.article
              key={group.title}
              variants={fadeUpChild}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className={`glass group relative overflow-hidden p-6 shadow-2xl shadow-transparent transition-shadow duration-500 ${a.glow}`}
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition group-hover:opacity-100" />
              <div className="mb-5 flex items-center gap-3">
                <span className={`grid h-11 w-11 place-items-center rounded-xl ${a.bg} ${a.text} transition group-hover:scale-110`}>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="font-display text-lg font-semibold text-white">{group.title}</h3>
              </div>
              <ul className="flex flex-wrap gap-2">
                {group.skills.map((s, i) => (
                  <motion.li
                    key={s}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.05, duration: 0.3 }}
                    className={`cursor-default rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-slate-200 transition-colors ${a.chip}`}
                  >
                    {s}
                  </motion.li>
                ))}
              </ul>
            </motion.article>
          );
        })}
      </motion.div>
    </Section>
  );
}
