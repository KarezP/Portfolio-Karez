import { PLANETS } from '../../lib/space/constants';
import { useJourneyStore } from '../../stores/useJourneyStore';

export default function MiniMap() {
  const activePlanet = useJourneyStore((state) => state.activePlanet);
  const beginFlyIn = useJourneyStore((state) => state.beginFlyIn);
  const startReturnToOrbit = useJourneyStore((state) => state.startReturnToOrbit);
  const finishReturnToOrbit = useJourneyStore((state) => state.finishReturnToOrbit);
  const cameraMode = useJourneyStore((state) => state.cameraMode);
  const orbitNodes = [
    { id: 'home', label: 'HOME', angle: 228, accent: '#9be7ff' },
    ...PLANETS.map((planet, index) => ({
      id: planet.id,
      label: planet.hudLabel,
      angle: 315 + index * 54,
      accent: planet.accent,
    })),
  ];

  const getTranslate = (angleDegrees: number, radius: number) => {
    const angle = (angleDegrees * Math.PI) / 180;
    const x = Number((Math.cos(angle) * radius).toFixed(3));
    const y = Number((Math.sin(angle) * radius).toFixed(3));
    return `translate(-50%, -50%) translate(${x}px, ${y}px)`;
  };

  return (
    <nav
      aria-label="Planet navigation"
      className="absolute bottom-28 right-3 z-20 w-[9.5rem] rounded-[28px] border border-cyan-400/20 bg-[linear-gradient(180deg,rgba(10,10,20,0.84),rgba(10,10,20,0.62))] p-3 shadow-hud backdrop-blur sm:bottom-24 sm:right-5 sm:w-[10.5rem] sm:p-4"
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-slate-400">
        MINI MAP
      </p>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-100/70">
        {cameraMode === 'landed' ? 'SECTION FOCUS' : 'ORBITAL NAV'}
      </p>

      <div className="relative mx-auto mt-4 h-28 w-28 sm:h-32 sm:w-32">
        <div className="absolute inset-0 rounded-full border border-cyan-400/18 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.07)_0%,rgba(10,10,20,0.72)_64%,rgba(10,10,20,0.92)_100%)]" />
        <div className="absolute inset-3 rounded-full border border-cyan-400/10" />
        <div className="absolute inset-6 rounded-full border border-cyan-400/10" />
        <div className="absolute inset-9 rounded-full border border-cyan-400/16" />
        <div className="absolute inset-0 rounded-full radar-spin">
          <div className="absolute left-1/2 top-1/2 h-px w-1/2 origin-left bg-[linear-gradient(90deg,rgba(0,240,255,0.55),transparent)]" />
        </div>
        <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(0,240,255,0.7)]" />

        {orbitNodes.map((node) => {
          const radius = node.id === 'home' ? 26 : 42;
          const isHome = node.id === 'home';
          const isActive = !isHome && activePlanet === node.id;

          return (
            <button
              key={node.id}
              type="button"
              onClick={() => {
                if (isHome) {
                  if (activePlanet) {
                    startReturnToOrbit();
                    return;
                  }

                  finishReturnToOrbit();
                  return;
                }

                beginFlyIn(node.id as (typeof PLANETS)[number]['id']);
              }}
              aria-label={isHome ? 'Return home' : `Go to ${node.label}`}
              className="group absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ transform: getTranslate(node.angle, radius) }}
            >
              <span
                className={`flex items-center justify-center rounded-full border transition ${
                  isHome
                    ? 'h-7 min-w-7 px-2 border-cyan-300/20 bg-black/50 text-[9px] text-white/85'
                    : isActive
                    ? 'h-4 w-4 scale-125 border-white shadow-[0_0_16px_rgba(255,255,255,0.24)]'
                    : 'h-3 w-3 border-white/40 group-hover:scale-110'
                }`}
                style={isHome ? undefined : { backgroundColor: node.accent }}
              >
                {isHome ? 'H' : null}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-3 flex items-center justify-between gap-2">
        {PLANETS.map((planet) => (
          <button
            key={planet.id}
            type="button"
            onClick={() => beginFlyIn(planet.id)}
            className={`font-mono text-[8px] uppercase tracking-[0.22em] transition ${
              activePlanet === planet.id ? 'text-white' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {planet.hudLabel}
          </button>
        ))}
      </div>
    </nav>
  );
}
