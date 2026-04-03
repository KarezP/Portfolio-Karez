import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

import { useJourneyStore } from '../../stores/useJourneyStore';

export default function CockpitInterior() {
  const groupRef = useRef<THREE.Group>(null);
  const leftRef = useRef<THREE.Mesh>(null);
  const rightRef = useRef<THREE.Mesh>(null);
  const topRef = useRef<THREE.Mesh>(null);
  const lowerRef = useRef<THREE.Mesh>(null);
  const cameraMode = useJourneyStore((state) => state.cameraMode);
  const reducedMotion = useJourneyStore((state) => state.reducedMotion);
  const lowPerformanceMode = useJourneyStore((state) => state.lowPerformanceMode);

  useFrame((state, delta) => {
    if (!groupRef.current) {
      return;
    }

    const visibleAmount =
      cameraMode === 'cockpit'
        ? 1
        : cameraMode === 'overview'
        ? 0.62
        : cameraMode === 'orbit'
        ? 0.38
        : cameraMode === 'fly-in' || cameraMode === 'returning'
        ? 0.5
        : 0.12;
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, visibleAmount > 0.2 ? 0 : 1.15, Math.min(1, delta * 3));
    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      cameraMode === 'fly-in' ? Math.sin(state.clock.elapsedTime * 0.55) * 0.08 : 0,
      Math.min(1, delta * 2.6)
    );
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      cameraMode === 'fly-in' || cameraMode === 'returning' ? Math.cos(state.clock.elapsedTime * 0.42) * 0.05 : 0,
      Math.min(1, delta * 2.6)
    );

    const meshes = [leftRef.current, rightRef.current, topRef.current, lowerRef.current].filter(Boolean) as THREE.Mesh[];
    meshes.forEach((mesh) => {
      const material = mesh.material as THREE.MeshBasicMaterial;
      material.opacity = THREE.MathUtils.lerp(material.opacity, visibleAmount * 0.72, Math.min(1, delta * 4));
    });

    if (!reducedMotion) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.35) * (cameraMode === 'fly-in' ? 0.02 : 0.01);
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.24) * (cameraMode === 'fly-in' || cameraMode === 'returning' ? 0.012 : 0.004);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <mesh ref={leftRef} position={[-3.75, 0, 4.1]} rotation={[0.1, 0.22, 0.1]}>
        <boxGeometry args={[0.42, 7.8, 0.18]} />
        <meshBasicMaterial color="#6fefff" transparent opacity={0.65} />
      </mesh>
      <mesh ref={rightRef} position={[3.75, 0, 4.1]} rotation={[0.1, -0.22, -0.1]}>
        <boxGeometry args={[0.42, 7.8, 0.18]} />
        <meshBasicMaterial color="#6fefff" transparent opacity={0.65} />
      </mesh>
      <mesh ref={topRef} position={[0, 3.2, 3.9]} rotation={[0.06, 0, 0]}>
        <boxGeometry args={[5.8, 0.24, 0.12]} />
        <meshBasicMaterial color="#89f7ff" transparent opacity={0.58} />
      </mesh>
      <mesh ref={lowerRef} position={[0, -2.85, 3.75]} rotation={[0.08, 0, 0]}>
        <boxGeometry args={[4.7, 0.18, 0.12]} />
        <meshBasicMaterial color="#6fefff" transparent opacity={0.42} />
      </mesh>
      <mesh position={[0, -3.35, 4.05]} rotation={[0.28, 0, 0]}>
        <boxGeometry args={[6.8, 0.34, 0.24]} />
        <meshBasicMaterial color="#102232" transparent opacity={cameraMode === 'landed' ? 0.08 : 0.4} />
      </mesh>
      {!lowPerformanceMode ? (
        <>
          <mesh position={[0, 3.55, 3.75]} rotation={[0.18, 0, 0]}>
            <boxGeometry args={[5.2, 0.18, 0.16]} />
            <meshBasicMaterial color="#9cf4ff" transparent opacity={cameraMode === 'cockpit' ? 0.28 : 0.12} />
          </mesh>
          <mesh position={[-2.15, -2.95, 3.62]} rotation={[0.12, 0.16, 0.08]}>
            <boxGeometry args={[1.95, 0.16, 0.14]} />
            <meshBasicMaterial color="#2dd8f3" transparent opacity={cameraMode === 'cockpit' ? 0.22 : 0.06} />
          </mesh>
          <mesh position={[2.15, -2.95, 3.62]} rotation={[0.12, -0.16, -0.08]}>
            <boxGeometry args={[1.95, 0.16, 0.14]} />
            <meshBasicMaterial color="#2dd8f3" transparent opacity={cameraMode === 'cockpit' ? 0.22 : 0.06} />
          </mesh>
        </>
      ) : null}
    </group>
  );
}
