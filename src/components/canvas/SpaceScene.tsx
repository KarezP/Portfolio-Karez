'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

import CockpitFrame from './CockpitFrame';
import CockpitInterior from './CockpitInterior';
import GalaxyBackdrop from './GalaxyBackdrop';
import Planet from './Planet';
import Starfield from './Starfield';
import CameraRig from './CameraRig';
import { PLANETS } from '../../lib/space/constants';
import { useJourneyStore } from '../../stores/useJourneyStore';

export default function SpaceScene() {
  const cameraMode = useJourneyStore((state) => state.cameraMode);
  const activePlanet = useJourneyStore((state) => state.activePlanet);
  const lowPerformanceMode = useJourneyStore((state) => state.lowPerformanceMode);
  const flyInPhase = useJourneyStore((state) => state.flyInPhase);
  const scrollProgress = useJourneyStore((state) => state.scrollProgress);
  const reducedMotion = useJourneyStore((state) => state.reducedMotion);
  const activePlanetConfig = PLANETS.find((planet) => planet.id === activePlanet) ?? null;
  const inTravel = cameraMode === 'fly-in' || cameraMode === 'returning';
  const inArrivalLock = cameraMode === 'fly-in' && flyInPhase === 'decelerate';
  const warpOpacity =
    reducedMotion || !inTravel
      ? 0
      : flyInPhase === 'cruise'
      ? 0.68
      : flyInPhase === 'accelerate'
      ? 0.44
      : 0.26;
  const overviewFlowOpacity =
    !inTravel && !activePlanet ? Math.min(0.24, scrollProgress * 0.2 + (cameraMode === 'orbit' ? 0.08 : 0)) : 0;

  return (
    <div className="absolute inset-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0.15, 8.5], fov: 42, near: 0.1, far: 200 }}
        dpr={lowPerformanceMode ? [1, 1.2] : [1, 1.8]}
        gl={{ antialias: !lowPerformanceMode, alpha: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#05060a']} />
        <fog attach="fog" args={['#05060a', 14, 42]} />
        <ambientLight intensity={lowPerformanceMode ? 0.45 : 0.5} />
        <hemisphereLight intensity={0.5} color="#dff8ff" groundColor="#05060a" />
        <directionalLight position={[4, 6, 8]} intensity={1.05} color="#d8fbff" />
        <pointLight position={[0, 0, 8]} intensity={0.65} color="#00f0ff" />
        <pointLight position={[-9, 5, -20]} intensity={lowPerformanceMode ? 0.28 : 0.42} color="#4b88ff" distance={70} />
        <pointLight position={[12, -6, -24]} intensity={lowPerformanceMode ? 0.12 : 0.2} color="#ff9340" distance={62} />
        {activePlanetConfig ? (
          <pointLight
            position={[
              activePlanetConfig.position[0] * 0.8,
              activePlanetConfig.position[1] + activePlanetConfig.radius * 1.5,
              activePlanetConfig.position[2] + activePlanetConfig.radius * 1.8,
            ]}
            intensity={cameraMode === 'landed' ? 1.1 : 0.55}
            distance={cameraMode === 'landed' ? 28 : 18}
            color={activePlanetConfig.accent}
          />
        ) : null}
        <Suspense fallback={null}>
          <CameraRig />
          <GalaxyBackdrop />
          <Starfield />
          <CockpitInterior />
          {PLANETS.map((planet) => (
            <Planet
              key={planet.id}
              id={planet.id}
              accent={planet.accent}
              secondary={planet.secondary}
              radius={planet.radius}
              position={planet.position}
              ring={planet.ring}
              lowPerformanceMode={lowPerformanceMode}
            />
          ))}
        </Suspense>
      </Canvas>

      <div
        className={`pointer-events-none absolute inset-0 transition duration-700 ${
          activePlanet ? 'bg-black/22 backdrop-blur-[2px]' : ''
        }`}
      />
      <div
        className="pointer-events-none absolute inset-0 transition duration-500"
        style={{
          opacity: overviewFlowOpacity * 0.8,
          background:
            'radial-gradient(circle at 52% 46%, rgba(196,230,255,0.08) 0%, transparent 16%), radial-gradient(circle at 68% 36%, rgba(116,180,255,0.08) 0%, transparent 24%), linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.02) 50%, transparent 100%)',
          transform: `translate3d(${scrollProgress * 42}px, ${-scrollProgress * 18}px, 0)`,
          filter: 'blur(10px)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 transition duration-300"
        style={{
          opacity: warpOpacity,
          background:
            'radial-gradient(circle at center, transparent 0%, rgba(255,255,255,0.03) 12%, rgba(255,255,255,0) 38%), linear-gradient(90deg, transparent 0%, rgba(190,238,255,0.12) 50%, transparent 100%)',
          transform: inTravel ? 'scale(1.18, 1.02)' : 'scale(1, 1)',
          filter: 'blur(12px)',
          mixBlendMode: 'screen',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 transition duration-500"
        style={{
          opacity: inTravel && flyInPhase === 'cruise' ? 0.18 : 0,
          background:
            'radial-gradient(circle at center, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 18%, transparent 42%)',
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_40%_28%,rgba(63,100,255,0.16)_0%,transparent_22%),radial-gradient(circle_at_65%_62%,rgba(0,240,255,0.06)_0%,transparent_20%),radial-gradient(circle_at_50%_46%,transparent_0%,rgba(7,9,18,0.18)_36%,rgba(0,0,0,0.62)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_52%_54%,rgba(255,255,255,0.05)_0%,transparent_10%),radial-gradient(circle_at_50%_56%,rgba(164,210,255,0.14)_0%,transparent_24%),radial-gradient(circle_at_46%_58%,rgba(255,226,186,0.06)_0%,transparent_16%)] opacity-80" />
      <div className="pointer-events-none absolute inset-x-[17%] top-0 h-[42%] bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.04),transparent_70%)]" />
      <div className="pointer-events-none absolute left-[10%] top-[14%] h-[42%] w-[20%] bg-[linear-gradient(90deg,rgba(255,255,255,0.03),transparent)] opacity-30 blur-3xl" />
      <div className="pointer-events-none absolute right-[10%] top-[14%] h-[42%] w-[20%] bg-[linear-gradient(270deg,rgba(255,255,255,0.03),transparent)] opacity-30 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_38%_22%,rgba(73,110,255,0.14)_0%,transparent_18%),radial-gradient(circle_at_42%_24%,rgba(255,255,255,0.04)_0%,transparent_10%),radial-gradient(circle_at_78%_48%,rgba(0,219,255,0.06)_0%,transparent_12%),radial-gradient(circle_at_78%_20%,rgba(255,220,175,0.07)_0%,transparent_10%),radial-gradient(circle_at_16%_68%,rgba(255,244,214,0.04)_0%,transparent_8%)] opacity-70" />
      {activePlanetConfig ? (
        <div
          className="pointer-events-none absolute inset-0 transition duration-700"
          style={{
            background: `radial-gradient(circle at ${activePlanetConfig.markerPosition.left} ${activePlanetConfig.markerPosition.top}, ${activePlanetConfig.accent}1f 0%, transparent 22%), radial-gradient(circle at 72% 78%, rgba(255,255,255,0.05) 0%, transparent 34%)`,
            opacity: cameraMode === 'landed' ? 0.95 : cameraMode === 'fly-in' && flyInPhase === 'decelerate' ? 0.82 : 0.6,
          }}
        />
      ) : null}
      {activePlanetConfig && (inArrivalLock || cameraMode === 'landed') ? (
        <>
          <div
            className="pointer-events-none absolute inset-0 transition duration-500"
            style={{
              opacity: cameraMode === 'landed' ? 0.86 : 0.64,
              background: `radial-gradient(circle at ${activePlanetConfig.markerPosition.left} ${activePlanetConfig.markerPosition.top}, rgba(255,255,255,0.18) 0%, ${activePlanetConfig.accent}55 8%, ${activePlanetConfig.accent}14 20%, transparent 34%)`,
              filter: 'blur(1px)',
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 transition duration-500"
            style={{
              opacity: cameraMode === 'landed' ? 0.46 : 0.34,
              background: `radial-gradient(circle at ${activePlanetConfig.markerPosition.left} ${activePlanetConfig.markerPosition.top}, transparent 0%, transparent 7%, rgba(255,255,255,0.14) 7.5%, transparent 9%, transparent 100%)`,
              mixBlendMode: 'screen',
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 transition duration-500"
            style={{
              opacity: inArrivalLock ? 0.44 : 0.2,
              background: `linear-gradient(90deg, transparent 0%, transparent 52%, ${activePlanetConfig.accent}18 60%, transparent 74%)`,
              maskImage: `radial-gradient(circle at ${activePlanetConfig.markerPosition.left} ${activePlanetConfig.markerPosition.top}, rgba(0,0,0,1) 0%, rgba(0,0,0,0.82) 18%, transparent 52%)`,
            }}
          />
        </>
      ) : null}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.34)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.05)_0%,transparent_30%),radial-gradient(circle_at_50%_72%,transparent_0%,rgba(0,0,0,0.22)_72%)]" />

      {cameraMode !== 'landed' ? <CockpitFrame /> : null}
    </div>
  );
}
