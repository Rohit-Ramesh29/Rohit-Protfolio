import { motion } from 'framer-motion';
import { skillGroups, skillLevelMeta, type SkillGroup, type SkillLevel } from '../../data/portfolio';
import { fadeUpChild, staggerParent } from '../ui/Reveal';
import { Section, SectionHeading } from '../ui/Section';

const accentMap: Record<SkillGroup['accent'], { text: string; bg: string; bar: string; glow: string }> = {
  blue: { text: 'text-accent-blue', bg: 'bg-accent-blue/15', bar: 'bg-accent-blue', glow: 'group-hover:shadow-accent-blue/20' },
  purple: { text: 'text-accent-purple', bg: 'bg-accent-purple/15', bar: 'bg-accent-purple', glow: 'group-hover:shadow-accent-purple/20' },
  cyan: { text: 'text-accent-cyan', bg: 'bg-accent-cyan/15', bar: 'bg-accent-cyan', glow: 'group-hover:shadow-accent-cyan/20' },
};

/** Three-step indicator describing depth of experience qualitatively — no fake percentages. */
function LevelIndicator({ level, bar }: { level: SkillLevel; bar: string }) {
  const { steps, label } = skillLevelMeta[level];
  return (
    <span className="flex items-center gap-2" title={label}>
      <span className="sr-only">{label}</span>
      <span className="flex gap-1" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className={`h-1.5 w-4 rounded-full ${i < steps ? bar : 'bg-white/10'}`}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.12, duration: 0.4 }}
            style={{ originX: 0 }}
          />
        ))}
      </span>
    </span>
  );
}

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeading
        id="skills"
        eyebrow="Toolbox"
        title={<>Technical <span className="text-gradient">Skills</span></>}
        description="Technologies I work with across development, testing and analytics, with an honest note on how deeply I've used each."
      />

      <div className="mb-10 flex flex-wrap justify-center gap-4 text-xs text-slate-400">
        {(Object.keys(skillLevelMeta) as SkillLevel[]).map((lvl) => (
          <span key={lvl} className="chip">
            <span className="flex gap-0.5" aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <span key={i} className={`h-1 w-2.5 rounded-full ${i < skillLevelMeta[lvl].steps ? 'bg-accent-blue' : 'bg-white/15'}`} />
              ))}
            </span>
            {skillLevelMeta[lvl].label}
          </span>
        ))}
      </div>

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
              className={`glass group relative overflow-hidden p-6 shadow-2xl shadow-transparent transition-shadow duration-500 ${a.glow} ${
                group.skills.length > 5 ? 'lg:row-span-1' : ''
              }`}
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition group-hover:opacity-100" />
              <div className="mb-5 flex items-center gap-3">
                <span className={`grid h-11 w-11 place-items-center rounded-xl ${a.bg} ${a.text} transition group-hover:scale-110`}>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="font-display text-lg font-semibold text-white">{group.title}</h3>
              </div>
              <ul className="space-y-3">
                {group.skills.map((s) => (
                  <li key={s.name} className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-slate-300">{s.name}</span>
                    <LevelIndicator level={s.level} bar={a.bar} />
                  </li>
                ))}
              </ul>
            </motion.article>
          );
        })}
      </motion.div>
    </Section>
  );
}
