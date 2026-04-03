import { useJourneyStore } from '../../stores/useJourneyStore';

export default function Telemetry() {
  const cameraMode = useJourneyStore((state) => state.cameraMode);
  const flyInPhase = useJourneyStore((state) => state.flyInPhase);
  const activePlanet = useJourneyStore((state) => state.activePlanet);

  const velocity =
    cameraMode === 'fly-in'
      ? flyInPhase === 'accelerate'
        ? '2.7c'
        : flyInPhase === 'cruise'
        ? '2.3c'
        : '0.8c'
      : cameraMode === 'returning'
      ? '1.4c'
      : cameraMode === 'overview' || cameraMode === 'orbit'
      ? '0.5c'
      : '0.0c';
  const course =
    (cameraMode === 'fly-in' || cameraMode === 'landed') && activePlanet
      ? activePlanet.toUpperCase()
      : cameraMode === 'returning'
      ? 'HOME'
      : cameraMode === 'cockpit'
      ? 'STABLE'
      : 'FORWARD';
  const integrity = cameraMode === 'fly-in' ? '99.7%' : '100%';

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-3 pb-4 sm:p-5 sm:pb-5">
      <div className="relative mx-auto max-w-5xl">
        <div className="absolute bottom-0 left-0 hidden h-28 w-[28%] rounded-tr-[36px] border-r border-t border-cyan-400/12 bg-[linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,0.46))] lg:block" />
        <div className="absolute bottom-0 right-0 hidden h-28 w-[28%] rounded-tl-[36px] border-l border-t border-cyan-400/12 bg-[linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,0.46))] lg:block" />
        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-2 rounded-t-[26px] border border-cyan-400/16 bg-[linear-gradient(180deg,rgba(10,10,20,0.74),rgba(10,10,20,0.42))] p-2 shadow-hud backdrop-blur-[12px] sm:grid-cols-[1.1fr_1fr_1fr_1.2fr] sm:gap-3 sm:p-3">
          <TelemetryItem label="VELOCITY" value={velocity} tone="primary" />
          <TelemetryItem label="COURSE" value={course} />
          <TelemetryItem label="INTEGRITY" value={integrity} />
          <TelemetryItem label="STATE" value={cameraMode.toUpperCase()} />
        </div>
      </div>
    </div>
  );
}

function TelemetryItem({ label, value, tone = 'default' }: { label: string; value: string; tone?: 'default' | 'primary' }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.02] px-3 py-3 sm:px-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-slate-500">
        {label}
      </p>
      <p className={`font-mono mt-2 text-[13px] uppercase tracking-[0.24em] sm:text-sm sm:tracking-[0.28em] ${tone === 'primary' ? 'text-cyan-100' : 'text-white'}`}>
        {value}
      </p>
    </div>
  );
}
