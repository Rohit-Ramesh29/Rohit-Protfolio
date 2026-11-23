import { Barcode, Bot, Coins, FileText, Gem, LayoutDashboard, Mic, Package, Receipt, Users } from 'lucide-react';
import { BarChart, Donut, LineChart, Scatter, makeScatter } from './Charts';
import { BrowserFrame } from './BrowserFrame';

/* All visuals in this file are illustrative concept mockups built in code, with sample values. */

function SideNav({ items, active = 0, accent }: { items: typeof Gem[]; active?: number; accent: string }) {
  return (
    <div className="flex w-[11%] flex-col items-center gap-[6%] border-r border-white/[0.06] bg-ink-950/60 py-[4%]">
      {items.map((Icon, i) => (
        <span
          key={i}
          className={`grid aspect-square w-[60%] place-items-center rounded-md ${i === active ? `${accent} text-white` : 'text-slate-500'}`}
        >
          <Icon className="h-[55%] w-[55%]" />
        </span>
      ))}
    </div>
  );
}

export function GoldBusinessMockup() {
  return (
    <BrowserFrame url="goldshop.app/dashboard">
      <div className="flex h-full text-[clamp(6px,1.1vw,10px)]">
        <SideNav items={[LayoutDashboard, Receipt, Barcode, Package, Coins, Users]} accent="bg-amber-500/80" />
        <div className="flex flex-1 flex-col gap-[3%] p-[3.5%]">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-white">Store Overview</p>
              <p className="text-slate-500">Billing · Inventory · Chit fund</p>
            </div>
            <span className="flex items-center gap-1 rounded bg-amber-400/15 px-2 py-0.5 text-amber-300">
              <Gem className="h-[1.2em] w-[1.2em]" /> 22K · 24K
            </span>
          </div>
          <div className="grid grid-cols-4 gap-[2.5%]">
            {[
              ['Today’s Bills', '48'],
              ['Stock Items', '1,240'],
              ['Active Chits', '86'],
              ['Valuation', '₹ —'],
            ].map(([k, v]) => (
              <div key={k} className="rounded-md border border-white/[0.06] bg-white/[0.03] p-[6%]">
                <p className="text-slate-500">{k}</p>
                <p className="mt-0.5 text-[1.4em] font-semibold text-white">{v}</p>
              </div>
            ))}
          </div>
          <div className="grid flex-1 grid-cols-[1.6fr_1fr] gap-[2.5%]">
            <div className="flex flex-col rounded-md border border-white/[0.06] bg-white/[0.03] p-[3%]">
              <p className="text-slate-400">Weekly sales</p>
              <div className="min-h-0 flex-1">
                <BarChart data={[32, 45, 38, 60, 52, 74, 66]} labels={['M', 'T', 'W', 'T', 'F', 'S', 'S']} colors={['#F59E0B', '#B45309']} />
              </div>
            </div>
            <div className="flex flex-col gap-[6%] rounded-md border border-white/[0.06] bg-white/[0.03] p-[4%]">
              <p className="text-slate-400">Recent bills</p>
              {['Necklace · 22K', 'Ring · 18K', 'Bangle · 22K', 'Chain · 24K'].map((r, i) => (
                <div key={r} className="flex items-center justify-between border-b border-white/[0.04] pb-[3%]">
                  <span className="flex items-center gap-1 text-slate-300">
                    <Barcode className="h-[1.2em] w-[1.2em] text-slate-500" /> {r}
                  </span>
                  <span className={i % 2 ? 'text-emerald-300' : 'text-amber-300'}>{i % 2 ? 'Paid' : 'EMI'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

export function InterviewMentorMockup() {
  return (
    <BrowserFrame url="interview-mentor.ai/session">
      <div className="flex h-full text-[clamp(6px,1.1vw,10px)]">
        <SideNav items={[LayoutDashboard, FileText, Mic, Bot]} active={2} accent="bg-accent-purple/80" />
        <div className="grid flex-1 grid-cols-[1.4fr_1fr] gap-[3%] p-[3.5%]">
          <div className="flex flex-col gap-[3%]">
            <p className="font-semibold text-white">Mock Interview · Backend Developer</p>
            <div className="flex-1 space-y-[3%] rounded-md border border-white/[0.06] bg-white/[0.03] p-[4%]">
              <div className="flex gap-2">
                <span className="grid h-[2.2em] w-[2.2em] shrink-0 place-items-center rounded-full bg-accent-purple/30 text-accent-purple">
                  <Bot className="h-[60%] w-[60%]" />
                </span>
                <p className="rounded-md bg-white/[0.05] p-[3%] text-slate-300">
                  Your resume mentions a REST API with Express. How did you handle validation and error responses?
                </p>
              </div>
              <div className="flex justify-end">
                <p className="max-w-[80%] rounded-md bg-accent-blue/20 p-[3%] text-slate-200">
                  I used middleware to validate request bodies and a central error handler that returns consistent JSON…
                </p>
              </div>
              <div className="flex gap-2">
                <span className="grid h-[2.2em] w-[2.2em] shrink-0 place-items-center rounded-full bg-accent-purple/30 text-accent-purple">
                  <Bot className="h-[60%] w-[60%]" />
                </span>
                <p className="flex items-center gap-1 rounded-md bg-white/[0.05] p-[3%] text-slate-400">
                  <span className="h-1 w-1 animate-pulse rounded-full bg-slate-400" />
                  <span className="h-1 w-1 animate-pulse rounded-full bg-slate-400 [animation-delay:150ms]" />
                  <span className="h-1 w-1 animate-pulse rounded-full bg-slate-400 [animation-delay:300ms]" />
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[4%]">
            <div className="rounded-md border border-white/[0.06] bg-white/[0.03] p-[5%]">
              <p className="text-slate-400">Performance</p>
              <div className="mx-auto mt-1 aspect-square w-[62%]">
                <Donut values={[78, 22]} colors={['#8B5CF6', 'rgba(255,255,255,0.05)']} label="78" sub="sample score" />
              </div>
            </div>
            <div className="flex-1 space-y-[5%] rounded-md border border-white/[0.06] bg-white/[0.03] p-[5%]">
              {[
                ['Technical depth', 80],
                ['Communication', 70],
                ['Problem solving', 85],
              ].map(([k, v]) => (
                <div key={k}>
                  <p className="flex justify-between text-slate-400">
                    {k}
                  </p>
                  <div className="mt-1 h-[0.5em] rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-gradient-to-r from-accent-blue to-accent-purple" style={{ width: `${v}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

const scatterPts = makeScatter(46);

export function EdaMockup() {
  return (
    <BrowserFrame url="notebook · exploratory_analysis.ipynb">
      <div className="grid h-full grid-cols-2 grid-rows-2 gap-[2.5%] p-[3%] text-[clamp(6px,1.1vw,10px)]">
        <div className="flex flex-col rounded-md border border-white/[0.06] bg-white/[0.03] p-[4%]">
          <p className="font-mono text-cyan-300">df.describe()</p>
          <div className="mt-[3%] grid flex-1 grid-cols-4 gap-x-2 font-mono text-slate-400">
            {['', 'mean', 'std', 'max', 'col_a', '42.1', '8.3', '71', 'col_b', '3.6', '1.2', '9', 'col_c', '0.48', '0.11', '0.9'].map((c, i) => (
              <span key={i} className={i < 4 || i % 4 === 0 ? 'text-slate-500' : 'text-slate-300'}>
                {c}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col rounded-md border border-white/[0.06] bg-white/[0.03] p-[4%]">
          <p className="text-slate-400">Distribution</p>
          <div className="min-h-0 flex-1">
            <BarChart data={[4, 9, 16, 24, 30, 26, 18, 10, 5]} showLabels={false} colors={['#22D3EE', '#3B82F6']} />
          </div>
        </div>
        <div className="flex flex-col rounded-md border border-white/[0.06] bg-white/[0.03] p-[4%]">
          <p className="text-slate-400">Correlation</p>
          <div className="min-h-0 flex-1">
            <Scatter points={scatterPts} />
          </div>
        </div>
        <div className="flex flex-col rounded-md border border-white/[0.06] bg-white/[0.03] p-[4%]">
          <p className="text-slate-400">Trend over time</p>
          <div className="min-h-0 flex-1">
            <LineChart series={[[12, 18, 15, 24, 28, 26, 34, 39, 37, 46]]} colors={['#8B5CF6']} />
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}
