'use client';

import { getPortfolioContent } from '../../lib/content/portfolioContent';
import { PLANETS } from '../../lib/space/constants';
import { useJourneyStore } from '../../stores/useJourneyStore';

export default function OverviewNavigator() {
  const language = useJourneyStore((state) => state.language);
  const cameraMode = useJourneyStore((state) => state.cameraMode);
  const beginFlyIn = useJourneyStore((state) => state.beginFlyIn);
  const content = getPortfolioContent(language);

  return (
    <section className="pointer-events-none relative z-10 min-h-screen">
      <div className="absolute inset-0">
        {PLANETS.map((planet) => (
          <button
            key={planet.id}
            type="button"
            onClick={() => beginFlyIn(planet.id)}
            className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 text-left group"
            style={{
              top: planet.markerPosition.top,
              left: planet.markerPosition.left,
            }}
          >
            <div className="flex items-center gap-3">
              <span
                className="block h-3 w-3 rounded-full shadow-[0_0_18px_currentColor] transition group-hover:scale-125"
                style={{ backgroundColor: planet.accent, color: planet.accent }}
              />
              <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-cyan-200/72 transition group-hover:text-white">
                {planet.hudLabel === 'PROJECTS'
                  ? language === 'sv'
                    ? 'PROJEKTKLUSTER'
                    : 'PROJECT CLUSTER'
                  : planet.hudLabel === 'ABOUT'
                  ? language === 'sv'
                    ? 'ERFARENHETSNEBULA'
                    : 'EXPERIENCE NEBULA'
                  : language === 'sv'
                  ? 'KONTAKTBEACON'
                  : 'CONTACT BEACON'}
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="flex min-h-screen items-center justify-center px-4 py-24">
        <div className="pointer-events-none relative flex h-36 w-36 items-center justify-center rounded-full border border-cyan-400/16 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.08)_0%,rgba(8,14,24,0.08)_48%,transparent_72%)]">
          <div className="absolute inset-3 rounded-full border border-cyan-400/10" />
          <div className="absolute inset-7 rounded-full border border-cyan-400/8" />
          <div className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(0,240,255,0.8)]" />
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-[linear-gradient(90deg,transparent_0%,rgba(0,240,255,0.28)_50%,transparent_100%)]" />
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[linear-gradient(180deg,transparent_0%,rgba(0,240,255,0.2)_50%,transparent_100%)]" />
        </div>
      </div>

      <div className="pointer-events-none absolute left-1/2 top-1/2 w-full max-w-sm -translate-x-1/2 translate-y-20 px-4 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-cyan-200/70">
          HOME STATION
        </p>
        <p className="mt-3 text-sm leading-7 text-slate-300">
          {language === 'sv'
            ? 'Planeterna runt dig håller sektionerna i portfolion. Välj en destination för att resa dit och öppna innehållet som hologram.'
            : 'The planets around you hold the portfolio sections. Select a destination to travel there and open the content as a hologram.'}
        </p>
      </div>

      <div className="pointer-events-none absolute left-7 top-8 font-mono text-[11px] uppercase tracking-[0.34em] text-cyan-300/45">
        {cameraMode === 'orbit' ? 'ORBITAL MAP ONLINE' : 'NAVIGATION ACTIVE'}
      </div>
      <div className="pointer-events-none absolute right-7 top-8 font-mono text-[11px] uppercase tracking-[0.34em] text-cyan-300/32">
        SECTOR 7G
      </div>
      <div className="pointer-events-none absolute bottom-8 left-7 font-mono text-[11px] uppercase tracking-[0.28em] text-cyan-300/28">
        PROPULSION: NOMINAL
      </div>
      <div className="pointer-events-none absolute bottom-8 right-7 font-mono text-[11px] uppercase tracking-[0.28em] text-cyan-300/28">
        SHIELDS ONLINE
      </div>
    </section>
  );
}
