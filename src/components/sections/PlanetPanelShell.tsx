'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { useJourneyStore } from '../../stores/useJourneyStore';

type PlanetPanelShellProps = {
  accent: string;
  align?: 'left' | 'right';
  children: ReactNode;
};

export default function PlanetPanelShell({ accent, align = 'right', children }: PlanetPanelShellProps) {
  const [visible, setVisible] = useState(false);
  const startReturnToOrbit = useJourneyStore((state) => state.startReturnToOrbit);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setVisible(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="relative w-full max-w-4xl">
      <div
        className={`pointer-events-none absolute inset-y-[18%] hidden w-14 lg:block ${align === 'left' ? '-right-14 scale-x-[-1]' : '-left-14'}`}
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${accent}22 50%, transparent 100%)`,
        }}
      />
      <div className={`pointer-events-none absolute top-1/2 hidden -translate-y-1/2 items-center gap-4 lg:flex ${align === 'left' ? 'right-0 translate-x-[calc(100%+1.25rem)] flex-row-reverse' : 'left-0 -translate-x-[calc(100%+1.25rem)]'}`}>
        <span
          className="block h-3 w-3 rounded-full shadow-[0_0_24px_currentColor]"
          style={{ backgroundColor: accent, color: accent }}
        />
        <span className="h-px w-16 bg-white/10" />
      </div>
      <div
        className={`relative transition duration-700 ease-out ${
          visible
            ? 'translate-y-0 translate-x-0 opacity-100'
            : align === 'left'
            ? 'translate-y-6 translate-x-6 opacity-0'
            : 'translate-y-6 -translate-x-6 opacity-0'
        }`}
      >
        <button
          type="button"
          onClick={startReturnToOrbit}
          className="absolute right-4 top-4 z-20 rounded-full border border-white/10 bg-black/40 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.28em] text-white/80 transition hover:border-white/20 hover:bg-white/5 hover:text-white"
          style={{ boxShadow: `0 0 0 1px ${accent}22 inset` }}
        >
          Return to space
        </button>
        <div className="pointer-events-none absolute inset-0 rounded-[30px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.025),rgba(255,255,255,0.005))]" />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent 0%, ${accent} 48%, transparent 100%)` }}
        />
        <div
          className={`pointer-events-none absolute top-12 hidden h-40 w-40 rounded-full blur-3xl lg:block ${align === 'left' ? '-right-16' : '-left-16'}`}
          style={{ backgroundColor: `${accent}1c` }}
        />
        <div
          className={`pointer-events-none absolute inset-y-[16%] hidden w-10 lg:block ${align === 'left' ? '-right-10' : '-left-10'}`}
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${accent}1f 50%, transparent 100%)`,
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-[30px] opacity-20"
          style={{
            background:
              'repeating-linear-gradient(180deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 2px, transparent 10px)',
          }}
        />
        {children}
      </div>
    </div>
  );
}
