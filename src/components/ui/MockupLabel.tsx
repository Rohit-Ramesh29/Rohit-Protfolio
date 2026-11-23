import { Info } from 'lucide-react';

/** Makes it explicit that a visual is an illustrative mockup, not a real screenshot. */
export function MockupLabel({ text = 'Concept mockup · not a product screenshot' }: { text?: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md border border-amber-300/20 bg-amber-300/10 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-amber-200">
      <Info className="h-3 w-3" aria-hidden="true" />
      {text}
    </span>
  );
}
