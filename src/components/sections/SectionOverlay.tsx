import { useEffect } from 'react';

import { PLANETS } from '../../lib/space/constants';
import { useJourneyStore } from '../../stores/useJourneyStore';
import CockpitIntro from './CockpitIntro';
import OverviewNavigator from './OverviewNavigator';
import ProjectsSection from './ProjectsSection';
import AboutSection from './AboutSection';
import ContactSection from './ContactSection';

export default function SectionOverlay() {
  const activePlanet = useJourneyStore((state) => state.activePlanet);
  const cameraMode = useJourneyStore((state) => state.cameraMode);
  const flyInPhase = useJourneyStore((state) => state.flyInPhase);
  const reducedMotion = useJourneyStore((state) => state.reducedMotion);
  const setFlyInPhase = useJourneyStore((state) => state.setFlyInPhase);
  const landOnPlanet = useJourneyStore((state) => state.landOnPlanet);
  const startReturnToOrbit = useJourneyStore((state) => state.startReturnToOrbit);
  const finishReturnToOrbit = useJourneyStore((state) => state.finishReturnToOrbit);
  const activePlanetConfig = PLANETS.find((planet) => planet.id === activePlanet) ?? null;
  const fromLeft = activePlanetConfig ? Number.parseFloat(activePlanetConfig.markerPosition.left) < 50 : false;
  const overlayVisible = cameraMode === 'landed' || cameraMode === 'fly-in' || cameraMode === 'returning';
  const arrivalLock = cameraMode === 'fly-in' && flyInPhase === 'decelerate';
  const overlayTone =
    cameraMode === 'landed'
      ? 'opacity-100 translate-y-0'
      : cameraMode === 'fly-in'
      ? flyInPhase === 'decelerate'
        ? 'opacity-100 translate-y-0 translate-x-0'
        : fromLeft
        ? 'opacity-0 translate-y-6 translate-x-8'
        : 'opacity-0 translate-y-6 -translate-x-8'
      : fromLeft
      ? 'opacity-0 -translate-y-4 translate-x-6'
      : 'opacity-0 -translate-y-4 -translate-x-6';

  useEffect(() => {
    if (!activePlanet || (cameraMode !== 'fly-in' && cameraMode !== 'returning')) {
      return;
    }

    if (reducedMotion) {
      if (cameraMode === 'returning') {
        finishReturnToOrbit();
      } else {
        landOnPlanet(activePlanet);
      }
      return;
    }

    const sequence: Array<[number, typeof flyInPhase]> =
      cameraMode === 'returning'
        ? [
            [280, 'decelerate'],
            [860, 'cruise'],
            [1420, 'accelerate'],
            [1780, 'landed'],
          ]
        : [
            [260, 'accelerate'],
            [860, 'cruise'],
            [1880, 'decelerate'],
            [2540, 'landed'],
          ];

    const timers = sequence.map(([delay, phase]) =>
      window.setTimeout(() => {
        if (phase === 'landed') {
          if (cameraMode === 'returning') {
            finishReturnToOrbit();
            return;
          }

          landOnPlanet(activePlanet);
          return;
        }

        setFlyInPhase(phase);
      }, delay)
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [activePlanet, cameraMode, finishReturnToOrbit, landOnPlanet, reducedMotion, setFlyInPhase]);

  return (
    <>
      {!activePlanet && cameraMode === 'cockpit' ? <CockpitIntro /> : null}
      {!activePlanet && (cameraMode === 'overview' || cameraMode === 'orbit') ? <OverviewNavigator /> : null}
      {cameraMode === 'landed' && activePlanet === 'projects' ? <ProjectsSection /> : null}
      {cameraMode === 'landed' && activePlanet === 'about' ? <AboutSection /> : null}
      {cameraMode === 'landed' && activePlanet === 'contact' ? <ContactSection /> : null}

      {activePlanet && activePlanetConfig && cameraMode !== 'landed' ? (
        <section className={`relative z-10 flex min-h-screen items-center px-4 py-24 transition duration-500 sm:px-8 lg:px-14 ${fromLeft ? 'justify-start' : 'justify-end'} ${overlayVisible ? 'pointer-events-auto' : 'pointer-events-none'}`}>
          <div className="relative w-full max-w-2xl">
            <div
              className={`pointer-events-none absolute top-1/2 hidden -translate-y-1/2 items-center gap-4 lg:flex ${fromLeft ? 'right-0 translate-x-[calc(100%+1.5rem)] flex-row-reverse' : 'left-0 -translate-x-[calc(100%+1.5rem)]'}`}
            >
              <span
                className={`block h-3 w-3 rounded-full shadow-[0_0_24px_currentColor] ${arrivalLock ? 'hud-pulse' : ''}`}
                style={{ backgroundColor: activePlanetConfig.accent, color: activePlanetConfig.accent }}
              />
              <span
                className="h-px w-20"
                style={{
                  background: `linear-gradient(90deg, ${activePlanetConfig.accent} 0%, rgba(255,255,255,0.12) 72%, transparent 100%)`,
                }}
              />
            </div>
            <div
              className={`pointer-events-none absolute inset-y-[20%] hidden w-10 lg:block ${fromLeft ? '-right-10 scale-x-[-1]' : '-left-10'}`}
              style={{
                background: `linear-gradient(90deg, transparent 0%, ${activePlanetConfig.accent}22 55%, transparent 100%)`,
              }}
            />
            <div
              className={`relative overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(10,10,20,0.88),rgba(10,10,20,0.72))] p-6 shadow-hud backdrop-blur transition duration-500 sm:p-8 ${overlayTone}`}
              style={{
                boxShadow: arrivalLock
                  ? `0 0 0 1px ${activePlanetConfig.accent}22, 0 18px 80px rgba(0,0,0,0.42), 0 0 42px ${activePlanetConfig.accent}14`
                  : undefined,
              }}
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px"
                style={{ background: `linear-gradient(90deg,transparent 0%, ${activePlanetConfig.accent} 48%, transparent 100%)` }}
              />
              <div
                className="pointer-events-none absolute -left-10 top-10 hidden h-32 w-32 rounded-full blur-3xl lg:block"
                style={{ backgroundColor: `${activePlanetConfig.accent}20`, left: fromLeft ? 'auto' : undefined, right: fromLeft ? '-2.5rem' : 'auto' }}
              />
              <div
                className={`pointer-events-none absolute inset-y-0 w-px ${fromLeft ? 'right-0' : 'left-0'}`}
                style={{ background: `linear-gradient(180deg, transparent 0%, ${activePlanetConfig.accent}66 38%, transparent 100%)` }}
              />
              <p className="font-mono text-[11px] uppercase tracking-[0.34em]" style={{ color: `${activePlanetConfig.accent}cc` }}>
                {cameraMode === 'returning' ? 'RETURN SEQUENCE' : arrivalLock ? 'ARRIVAL LOCK' : 'FLY-IN SEQUENCE'}
              </p>
              <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2 className="text-3xl text-white sm:text-[2rem]">
                    {activePlanetConfig.hudLabel}
                  </h2>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.28em] text-slate-500">
                    {activePlanetConfig.distanceLabel} • SECTION LINK ESTABLISHED
                  </p>
                </div>
                <div
                  className="rounded-full border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.28em] text-white/85"
                  style={{ borderColor: `${activePlanetConfig.accent}40`, backgroundColor: `${activePlanetConfig.accent}12` }}
                >
                  {cameraMode === 'returning' ? flyInPhase.toUpperCase() : arrivalLock ? 'LOCKED' : flyInPhase.toUpperCase()}
                </div>
              </div>
              <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
                {cameraMode === 'returning'
                  ? `Breaking orbit from ${activePlanetConfig.hudLabel} and restoring the wider world view. Section context remains visible until the return vector clears.`
                  : arrivalLock
                  ? `Arrival vector locked on ${activePlanetConfig.hudLabel}. Silhouette and panel sync only after the ship settles into final approach, so the destination reads as a place you reach rather than a state you trigger.`
                  : `Crossing the final approach toward ${activePlanetConfig.hudLabel}. The panel enters only after the camera starts to settle so the editorial layer feels anchored to the planet rather than detached from it.`}
              </p>
              {arrivalLock ? (
                <div className="mt-6 grid gap-3 sm:grid-cols-[1.1fr_0.9fr]">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-slate-500">
                      Visual sync
                    </p>
                    <p className="mt-3 text-sm leading-7 text-slate-300">
                      Planet glow, scene wash, and editorial panel are now entering as one arrival event.
                    </p>
                  </div>
                  <div
                    className="rounded-2xl border px-4 py-4"
                    style={{ borderColor: `${activePlanetConfig.accent}26`, backgroundColor: `${activePlanetConfig.accent}0e` }}
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-slate-500">
                      Beacon
                    </p>
                    <p className="mt-3 font-mono text-sm uppercase tracking-[0.24em] text-white">
                      arrival confirmed
                    </p>
                  </div>
                </div>
              ) : null}
              <button
                type="button"
                onClick={startReturnToOrbit}
                className="mt-8 rounded-full border px-5 py-3 font-mono text-[11px] uppercase tracking-[0.32em] text-white transition hover:bg-white/5"
                style={{ borderColor: `${activePlanetConfig.accent}4d` }}
              >
                RETURN TO SPACE
              </button>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
