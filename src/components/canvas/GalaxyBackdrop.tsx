import { Billboard } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

import { useJourneyStore } from '../../stores/useJourneyStore';

function createGlowTexture(innerColor: string, outerColor: string) {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext('2d');

  if (!context) {
    return null;
  }

  const gradient = context.createRadialGradient(size / 2, size / 2, size * 0.04, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, innerColor);
  gradient.addColorStop(0.38, outerColor);
  gradient.addColorStop(1, 'rgba(0,0,0,0)');
  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export default function GalaxyBackdrop() {
  const groupRef = useRef<THREE.Group>(null);
  const cameraMode = useJourneyStore((state) => state.cameraMode);
  const reducedMotion = useJourneyStore((state) => state.reducedMotion);
  const lowPerformanceMode = useJourneyStore((state) => state.lowPerformanceMode);
  const flyInPhase = useJourneyStore((state) => state.flyInPhase);
  const scrollProgress = useJourneyStore((state) => state.scrollProgress);

  const coreMap = useMemo(
    () => createGlowTexture('rgba(255,255,255,0.9)', 'rgba(72,157,255,0.22)'),
    []
  );
  const tealMap = useMemo(
    () => createGlowTexture('rgba(122,244,255,0.5)', 'rgba(0,208,255,0.08)'),
    []
  );
  const amberMap = useMemo(
    () => createGlowTexture('rgba(255,195,122,0.34)', 'rgba(255,132,52,0.06)'),
    []
  );
  const coreWarmMap = useMemo(
    () => createGlowTexture('rgba(255,248,226,0.95)', 'rgba(255,220,160,0.18)'),
    []
  );
  const mistMap = useMemo(
    () => createGlowTexture('rgba(190,244,255,0.26)', 'rgba(104,196,255,0.045)'),
    []
  );

  useFrame((state, delta) => {
    if (!groupRef.current || reducedMotion) {
      return;
    }

    const overviewBias = cameraMode === 'overview' || cameraMode === 'orbit' ? 0.4 + scrollProgress * 0.75 : 0.2;
    const drift = cameraMode === 'fly-in' ? 0.03 : 0.006 + overviewBias * 0.006;
    groupRef.current.rotation.z += delta * drift;
    groupRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.07) * (0.45 + overviewBias * 0.35) + (cameraMode === 'fly-in' ? -1.4 : 0);
    groupRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.05) * (0.25 + overviewBias * 0.2) + (cameraMode === 'fly-in' ? 0.3 : 0);
    groupRef.current.position.z = THREE.MathUtils.lerp(
      groupRef.current.position.z,
      cameraMode === 'fly-in' ? (flyInPhase === 'cruise' ? -39 : -43) : -46 - scrollProgress * 2.4,
      Math.min(1, delta * 1.8)
    );
  });

  return (
    <group ref={groupRef} position={[0, 0, -46]}>
      {mistMap && !lowPerformanceMode ? (
        <Billboard position={[2.8, -3.8, 3]}>
          <mesh rotation={[0, 0, 0.18]}>
            <planeGeometry args={[34, 18]} />
            <meshBasicMaterial
              map={mistMap}
              transparent
              opacity={cameraMode === 'fly-in' ? 0.14 : 0.18}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </Billboard>
      ) : null}

      {coreMap ? (
        <Billboard position={[-3.4, 2.8, 0]}>
          <mesh>
            <planeGeometry args={[lowPerformanceMode ? 22 : 28, lowPerformanceMode ? 13 : 16]} />
            <meshBasicMaterial
              map={coreMap}
              transparent
              opacity={cameraMode === 'cockpit' ? 0.4 : 0.52}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </Billboard>
      ) : null}

      {coreWarmMap ? (
        <Billboard position={[9.6, 4.5, -4]}>
          <mesh rotation={[0, 0, -0.12]}>
            <planeGeometry args={[lowPerformanceMode ? 10 : 14, lowPerformanceMode ? 10 : 14]} />
            <meshBasicMaterial
              map={coreWarmMap}
              transparent
              opacity={cameraMode === 'cockpit' ? 0.18 : 0.24}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </Billboard>
      ) : null}

      {tealMap ? (
        <Billboard position={[6.8, -0.8, -2]}>
          <mesh rotation={[0, 0, -0.28]}>
            <planeGeometry args={[lowPerformanceMode ? 14 : 18, lowPerformanceMode ? 9 : 12]} />
            <meshBasicMaterial
              map={tealMap}
              transparent
              opacity={cameraMode === 'fly-in' ? 0.24 : 0.18}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </Billboard>
      ) : null}

      {!lowPerformanceMode && amberMap ? (
        <Billboard position={[-9.5, -3.2, -1]}>
          <mesh rotation={[0, 0, 0.3]}>
            <planeGeometry args={[12, 9]} />
            <meshBasicMaterial
              map={amberMap}
              transparent
              opacity={0.14}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </Billboard>
      ) : null}

      {!lowPerformanceMode && tealMap ? (
        <Billboard position={[-12.5, 1.8, -6]}>
          <mesh rotation={[0, 0, -0.44]}>
            <planeGeometry args={[11, 17]} />
            <meshBasicMaterial
              map={tealMap}
              transparent
              opacity={0.12}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </Billboard>
      ) : null}
    </group>
  );
}
