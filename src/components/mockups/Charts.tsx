import { motion } from 'framer-motion';
import { useId } from 'react';

/** Lightweight, dependency-free SVG charts used by mockups and the analytics section. */


export function BarChart({
  data,
  labels,
  height = 120,
  colors = ['#3B82F6', '#8B5CF6'],
  showLabels = true,
}: {
  data: number[];
  labels?: string[];
  height?: number;
  colors?: [string, string] | string[];
  showLabels?: boolean;
}) {
  const uid = useId().replace(/:/g, '');
  const max = Math.max(...data);
  const w = 100 / data.length;
  return (
    <svg viewBox={`0 0 100 ${height}`} preserveAspectRatio="none" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id={`bar-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={colors[0]} />
          <stop offset="1" stopColor={colors[1]} stopOpacity="0.35" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((g) => (
        <line key={g} x1="0" x2="100" y1={height * g} y2={height * g} stroke="rgba(255,255,255,0.06)" strokeWidth="0.4" />
      ))}
      {data.map((d, i) => {
        const h = (d / max) * (height - (showLabels ? 14 : 4));
        return (
          <motion.rect
            key={i}
            x={i * w + w * 0.2}
            width={w * 0.6}
            rx="1.2"
            fill={`url(#bar-${uid})`}
            initial={{ height: 0, y: height - (showLabels ? 10 : 0) }}
            whileInView={{ height: h, y: height - (showLabels ? 10 : 0) - h }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
        );
      })}
      {showLabels &&
        labels?.map((l, i) => (
          <text key={l} x={i * w + w / 2} y={height - 2} textAnchor="middle" fontSize="4.5" fill="#64748B">
            {l}
          </text>
        ))}
    </svg>
  );
}

export function LineChart({
  series,
  height = 100,
  colors = ['#3B82F6', '#8B5CF6'],
  area = true,
}: {
  series: number[][];
  height?: number;
  colors?: string[];
  area?: boolean;
}) {
  const uid = useId().replace(/:/g, '');
  const all = series.flat();
  const max = Math.max(...all);
  const min = Math.min(...all);
  const toPath = (s: number[]) =>
    s
      .map((v, i) => {
        const x = (i / (s.length - 1)) * 100;
        const y = height - 6 - ((v - min) / (max - min || 1)) * (height - 14);
        return `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`;
      })
      .join(' ');
  return (
    <svg viewBox={`0 0 100 ${height}`} preserveAspectRatio="none" className="h-full w-full" aria-hidden="true">
      <defs>
        {colors.map((c, i) => (
          <linearGradient key={c} id={`area-${uid}-${i}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={c} stopOpacity="0.35" />
            <stop offset="1" stopColor={c} stopOpacity="0" />
          </linearGradient>
        ))}
      </defs>
      {[0.25, 0.5, 0.75].map((g) => (
        <line key={g} x1="0" x2="100" y1={height * g} y2={height * g} stroke="rgba(255,255,255,0.06)" strokeWidth="0.4" />
      ))}
      <clipPath id={`reveal-${uid}`}>
        <motion.rect
          x="0"
          y="0"
          height={height}
          initial={{ width: 0 }}
          whileInView={{ width: 100 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: 'easeInOut' }}
        />
      </clipPath>
      <g clipPath={`url(#reveal-${uid})`}>
        {series.map((s, i) => {
          const d = toPath(s);
          return (
            <g key={i}>
              {area && i === 0 && <path d={`${d} L100,${height} L0,${height} Z`} fill={`url(#area-${uid}-${i})`} />}
              <path
                d={d}
                fill="none"
                stroke={colors[i % colors.length]}
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                strokeDasharray={i === 1 ? '5 4' : undefined}
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

export function Donut({
  values,
  colors = ['#3B82F6', '#8B5CF6', '#22D3EE', '#334155'],
  label,
  sub,
}: {
  values: number[];
  colors?: string[];
  label?: string;
  sub?: string;
}) {
  const total = values.reduce((a, b) => a + b, 0);
  const r = 15.915; // circumference ≈ 100
  let offset = 25;
  return (
    <svg viewBox="0 0 42 42" className="h-full w-full" aria-hidden="true">
      <circle cx="21" cy="21" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
      {values.map((v, i) => {
        const pct = (v / total) * 100;
        const seg = (
          <motion.circle
            key={i}
            cx="21"
            cy="21"
            r={r}
            fill="none"
            stroke={colors[i % colors.length]}
            strokeWidth="5"
            strokeDashoffset={offset}
            initial={{ strokeDasharray: `0 100` }}
            whileInView={{ strokeDasharray: `${Math.max(pct - 1, 0)} ${100 - pct + 1}` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 + i * 0.15 }}
          />
        );
        offset -= pct;
        return seg;
      })}
      {label && (
        <text x="21" y={sub ? 21 : 22.5} textAnchor="middle" fontSize="6" fontWeight="700" fill="#fff">
          {label}
        </text>
      )}
      {sub && (
        <text x="21" y="27" textAnchor="middle" fontSize="3" fill="#94A3B8">
          {sub}
        </text>
      )}
    </svg>
  );
}

export function Scatter({ points, height = 100 }: { points: [number, number, 0 | 1][]; height?: number }) {
  return (
    <svg viewBox={`0 0 100 ${height}`} preserveAspectRatio="none" className="h-full w-full" aria-hidden="true">
      {[0.25, 0.5, 0.75].map((g) => (
        <line key={g} x1="0" x2="100" y1={height * g} y2={height * g} stroke="rgba(255,255,255,0.06)" strokeWidth="0.4" />
      ))}
      <motion.line
        x1="4"
        y1={height - 10}
        x2="96"
        y2="12"
        stroke="#F59E0B"
        strokeWidth="0.8"
        strokeDasharray="2 2"
        vectorEffect="non-scaling-stroke"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.8 }}
      />
      {points.map(([x, y, g], i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={height - y}
          r="1.6"
          fill={g ? '#8B5CF6' : '#3B82F6'}
          fillOpacity="0.85"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.015, duration: 0.3 }}
        />
      ))}
    </svg>
  );
}

/** Deterministic pseudo-random points so the scatter is stable between renders. */
export function makeScatter(n: number, height = 100): [number, number, 0 | 1][] {
  let seed = 7;
  const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
  return Array.from({ length: n }, () => {
    const x = 6 + rand() * 88;
    const y = Math.min(height - 6, Math.max(6, x * 0.8 * (height / 100) + (rand() - 0.5) * 30));
    return [x, y, rand() > 0.55 ? 1 : 0];
  });
}
