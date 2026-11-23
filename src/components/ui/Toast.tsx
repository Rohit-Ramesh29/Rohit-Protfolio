import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Info, X, XCircle } from 'lucide-react';
import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react';

type Tone = 'success' | 'info' | 'error';
type Toast = { id: number; tone: Tone; title: string; body?: string };
type Notify = (t: Omit<Toast, 'id'>) => void;

const ToastContext = createContext<Notify>(() => {});

export function useToast() {
  return useContext(ToastContext);
}

const toneStyles: Record<Tone, { icon: typeof Info; ring: string; color: string }> = {
  success: { icon: CheckCircle2, ring: 'border-emerald-400/30', color: 'text-emerald-300' },
  info: { icon: Info, ring: 'border-accent-blue/40', color: 'text-accent-blue' },
  error: { icon: XCircle, ring: 'border-rose-400/30', color: 'text-rose-300' },
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextId = useRef(1);

  const dismiss = useCallback((id: number) => setToasts((t) => t.filter((x) => x.id !== id)), []);

  const notify = useCallback<Notify>(
    (t) => {
      const id = nextId.current++;
      setToasts((list) => [...list.slice(-2), { ...t, id }]);
      window.setTimeout(() => dismiss(id), 6000);
    },
    [dismiss],
  );

  return (
    <ToastContext.Provider value={notify}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-4 bottom-4 z-[70] flex flex-col items-center gap-2 sm:inset-x-auto sm:right-6 sm:items-end"
      >
        <AnimatePresence>
          {toasts.map((t) => {
            const { icon: Icon, ring, color } = toneStyles[t.tone];
            return (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                role="status"
                className={`glass pointer-events-auto flex w-full max-w-sm items-start gap-3 border ${ring} bg-ink-800/90 p-4`}
              >
                <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${color}`} aria-hidden="true" />
                <div className="flex-1 text-sm">
                  <p className="font-semibold text-white">{t.title}</p>
                  {t.body && <p className="mt-1 text-slate-400">{t.body}</p>}
                </div>
                <button
                  onClick={() => dismiss(t.id)}
                  className="rounded p-1 text-slate-500 transition hover:text-white"
                  aria-label="Dismiss notification"
                >
                  <X className="h-4 w-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
