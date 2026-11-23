import { motion } from 'framer-motion';
import { Brush, Database, FileSpreadsheet, LineChart as LineIcon, Search, Sigma } from 'lucide-react';
import { analyticsSkills } from '../../data/portfolio';
import { BarChart, Donut, LineChart, Scatter, makeScatter } from '../mockups/Charts';
import { MockupLabel } from '../ui/MockupLabel';
import { Reveal } from '../ui/Reveal';
import { Section, SectionHeading } from '../ui/Section';

const skillIcons = [Sigma, FileSpreadsheet, Database, Brush, Search, LineIcon];
const scatter = makeScatter(60);

function Panel({ title, subtitle, children, className = '' }: { title: string; subtitle: string; children: React.ReactNode; className?: string }) {
  return (
    <motion.div whileHover={{ y: -4 }} className={`glass flex flex-col p-5 ${className}`}>
      <div className="mb-3 flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-white">{title}</p>
          <p className="text-xs text-slate-500">{subtitle}</p>
        </div>
      </div>
      <div className="min-h-0 flex-1">{children}</div>
    </motion.div>
  );
}

export function DataAnalytics() {
  return (
    <Section id="analytics">
      <SectionHeading
        id="analytics"
        eyebrow="Data analytics"
        title={
          <>
            Turning Data <span className="text-gradient">Into Insights</span>
          </>
        }
        description="I explore datasets using Python and analytical libraries to identify meaningful patterns, trends, and insights."
      />

      <Reveal>
        <ul className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {analyticsSkills.map((s, i) => {
            const Icon = skillIcons[i];
            return (
              <motion.li
                key={s}
                whileHover={{ y: -4, scale: 1.02 }}
                className="glass flex flex-col items-center gap-2 px-3 py-5 text-center"
              >
                <Icon className="h-5 w-5 text-accent-cyan" aria-hidden="true" />
                <span className="text-sm text-slate-200">{s}</span>
              </motion.li>
            );
          })}
        </ul>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="relative rounded-3xl border border-white/[0.06] bg-ink-900/40 p-3 sm:p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 px-2 pt-1">
            <div className="flex items-center gap-2 font-mono text-xs text-slate-500">
              <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" /> analysis_dashboard.py
            </div>
            <MockupLabel text="Illustrative sample data" />
          </div>

          <div className="grid gap-4 md:grid-cols-6">
            <div className="grid grid-cols-2 gap-4 md:col-span-6 lg:grid-cols-4">
              {[
                ['01 · Load', 'pd.read_csv()', 'Import & inspect structure'],
                ['02 · Clean', 'df.dropna() · fillna()', 'Handle missing & duplicate data'],
                ['03 · Explore', 'df.describe() · corr()', 'Summaries, distributions, relationships'],
                ['04 · Visualise', 'sns.histplot() · plt.plot()', 'Communicate the insight'],
              ].map(([k, code, s]) => (
                <div key={k} className="glass p-4">
                  <p className="text-xs font-semibold text-white">{k}</p>
                  <p className="mt-2 truncate font-mono text-xs text-accent-cyan">{code}</p>
                  <p className="mt-1 text-xs text-slate-500">{s}</p>
                </div>
              ))}
            </div>

            <Panel title="Monthly trend" subtitle="Actual vs. rolling mean" className="h-64 md:col-span-4">
              <LineChart
                series={[
                  [22, 28, 25, 34, 31, 42, 39, 48, 45, 56, 52, 61],
                  [24, 25, 27, 29, 32, 35, 38, 41, 44, 47, 50, 53],
                ]}
                colors={['#3B82F6', '#8B5CF6']}
              />
            </Panel>

            <Panel title="Category share" subtitle="Composition" className="h-64 md:col-span-2">
              <div className="mx-auto aspect-square h-full max-h-44">
                <Donut values={[42, 28, 18, 12]} label="4" sub="categories" />
              </div>
            </Panel>

            <Panel title="Distribution" subtitle="Histogram of values" className="h-60 md:col-span-3">
              <BarChart
                data={[3, 7, 13, 21, 29, 33, 27, 19, 11, 6]}
                labels={['10', '20', '30', '40', '50', '60', '70', '80', '90', '100']}
                colors={['#22D3EE', '#3B82F6']}
              />
            </Panel>

            <Panel title="Feature correlation" subtitle="Scatter with trend line" className="h-60 md:col-span-3">
              <Scatter points={scatter} />
            </Panel>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
