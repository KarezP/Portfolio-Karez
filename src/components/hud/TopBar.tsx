import { PLANETS } from '../../lib/space/constants';
import { useJourneyStore } from '../../stores/useJourneyStore';
import LangToggle from './LangToggle';

export default function TopBar() {
  const activePlanet = useJourneyStore((state) => state.activePlanet);
  const cameraMode = useJourneyStore((state) => state.cameraMode);
  const flyInPhase = useJourneyStore((state) => state.flyInPhase);
  const language = useJourneyStore((state) => state.language);

  const destination =
    PLANETS.find((planet) => planet.id === activePlanet) ?? PLANETS[0];
  const statusLabel =
    cameraMode === 'fly-in'
      ? `APPROACH VECTOR: ${flyInPhase.toUpperCase()}`
      : cameraMode === 'landed'
      ? 'SECTION LOCK: CONFIRMED'
      : cameraMode === 'returning'
      ? 'RETURN VECTOR: ACTIVE'
      : 'SYSTEM STATUS: NOMINAL';

  return (
    <header className="absolute inset-x-0 top-0 z-20 p-3 sm:p-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-3">
          <div className="rounded-[24px] border border-cyan-400/20 bg-[linear-gradient(180deg,rgba(10,10,20,0.82),rgba(10,10,20,0.62))] px-4 py-3 shadow-hud backdrop-blur">
            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#00ff66]" />
              <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-cyan-50">
                NAVIGATION ONLINE
              </p>
            </div>
            <p className="font-mono mt-2 text-[11px] uppercase tracking-[0.32em] text-slate-400">
              {statusLabel}
            </p>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-[rgba(255,255,255,0.04)] px-4 py-3 backdrop-blur">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-slate-500">
              CONTENT MODE
            </p>
            <p className="mt-2 font-mono text-[12px] uppercase tracking-[0.32em] text-white">
              {language === 'sv' ? 'SWEDISH' : 'ENGLISH'}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch sm:justify-end sm:gap-3">
          <div className="rounded-[24px] border border-cyan-400/20 bg-[linear-gradient(180deg,rgba(10,10,20,0.84),rgba(10,10,20,0.64))] px-4 py-3 text-left shadow-hud backdrop-blur sm:text-right">
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-6">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-slate-500">
                  DESTINATION
                </p>
                <p className="font-mono mt-2 text-[13px] uppercase tracking-[0.34em] text-white">
                  {destination.hudLabel}
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-slate-500">
                  DISTANCE
                </p>
                <p className="font-mono mt-2 text-[13px] uppercase tracking-[0.34em] text-cyan-100">
                  {destination.distanceLabel}
                </p>
              </div>
            </div>
          </div>
          <div className="self-start sm:self-auto">
            <LangToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
