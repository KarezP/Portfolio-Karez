import { getPortfolioContent } from '../../lib/content/portfolioContent';
import { SCROLL_BREAKPOINTS } from '../../lib/space/constants';
import { useJourneyStore } from '../../stores/useJourneyStore';

export default function CockpitIntro() {
  const language = useJourneyStore((state) => state.language);
  const setScrollProgress = useJourneyStore((state) => state.setScrollProgress);
  const content = getPortfolioContent(language);

  return (
    <section className="pointer-events-none relative z-10 min-h-screen">
      <div className="absolute left-7 top-8 font-mono text-[11px] uppercase tracking-[0.34em] text-cyan-300/45">
        COCKPIT ACTIVE
      </div>
      <div className="absolute right-7 top-8 font-mono text-[11px] uppercase tracking-[0.34em] text-cyan-300/28">
        DEEP SPACE
      </div>

      <div className="absolute left-6 top-1/2 hidden h-40 -translate-y-1/2 flex-col justify-between lg:flex">
        <span className="h-12 w-px bg-[linear-gradient(180deg,transparent_0%,rgba(0,240,255,0.3)_50%,transparent_100%)]" />
        <span className="h-12 w-px bg-[linear-gradient(180deg,transparent_0%,rgba(0,240,255,0.22)_50%,transparent_100%)]" />
        <span className="h-12 w-px bg-[linear-gradient(180deg,transparent_0%,rgba(0,240,255,0.16)_50%,transparent_100%)]" />
      </div>
      <div className="absolute right-6 top-1/2 hidden h-40 -translate-y-1/2 flex-col justify-between lg:flex">
        <span className="h-12 w-px bg-[linear-gradient(180deg,transparent_0%,rgba(0,240,255,0.16)_50%,transparent_100%)]" />
        <span className="h-12 w-px bg-[linear-gradient(180deg,transparent_0%,rgba(0,240,255,0.22)_50%,transparent_100%)]" />
        <span className="h-12 w-px bg-[linear-gradient(180deg,transparent_0%,rgba(0,240,255,0.3)_50%,transparent_100%)]" />
      </div>

      <div className="flex min-h-screen items-end justify-center px-4 pb-28 sm:pb-32">
        <div className="pointer-events-auto w-full max-w-xl">
          <div className="mx-auto max-w-[18rem] rounded-[22px] border border-cyan-400/18 bg-[linear-gradient(180deg,rgba(10,18,28,0.56),rgba(10,18,28,0.28))] px-5 py-4 text-center shadow-hud backdrop-blur-[10px]">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-200/72">
              {content.cockpit.eyebrow}
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              {language === 'sv'
                ? 'Du befinner dig i rymden. Navigera genom galaxen och välj en planet för att öppna respektive del som hologram.'
                : 'You are already in space. Travel through the galaxy and select a planet to open each section as a hologram.'}
            </p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setScrollProgress(SCROLL_BREAKPOINTS.panoramaEnd)}
                className="rounded-full border border-cyan-300/28 bg-cyan-400/8 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.28em] text-white transition hover:bg-cyan-400/14"
              >
                {language === 'sv' ? 'Öppna galaxkarta' : 'Open galaxy map'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-8 left-7 font-mono text-[11px] uppercase tracking-[0.28em] text-cyan-300/28">
        PROPULSION: NOMINAL
      </div>
      <div className="pointer-events-none absolute bottom-8 right-7 font-mono text-[11px] uppercase tracking-[0.28em] text-cyan-300/28">
        STARS ONLINE
      </div>
    </section>
  );
}
