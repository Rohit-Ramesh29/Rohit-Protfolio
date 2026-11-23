import type { ReactNode } from 'react';

/** Faux browser chrome that wraps a mockup. */
export function BrowserFrame({ url, children }: { url: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-ink-900 shadow-2xl shadow-black/50">
      <div className="flex items-center gap-3 border-b border-white/[0.06] bg-ink-800/80 px-3 py-2">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
        </div>
        <div className="flex-1 truncate rounded-md bg-ink-950/70 px-3 py-1 text-center font-mono text-[10px] text-slate-500">{url}</div>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">{children}</div>
    </div>
  );
}
