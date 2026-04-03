import { useCursor } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

import type { PlanetId } from '../../lib/space/constants';
import { useJourneyStore } from '../../stores/useJourneyStore';

type PlanetProps = {
  id: PlanetId;
  accent: string;
  secondary: string;
  radius: number;
  position: [number, number, number];
  ring?: {
    inner: number;
    outer: number;
    tilt: [number, number, number];
  };
  lowPerformanceMode: boolean;
};

function brighten(hex: string, amount: number) {
  const color = new THREE.Color(hex);
  return color.lerp(new THREE.Color('#ffffff'), amount);
}

export default function Planet({ id, accent, secondary, radius, position, ring, lowPerformanceMode }: PlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const shellRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Sprite>(null);
  const signalRef = useRef<THREE.Mesh>(null);
  const scanRef = useRef<THREE.Mesh>(null);
  const moonRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const activePlanet = useJourneyStore((state) => state.activePlanet);
  const beginFlyIn = useJourneyStore((state) => state.beginFlyIn);
  const reducedMotion = useJourneyStore((state) => state.reducedMotion);
  const cameraMode = useJourneyStore((state) => state.cameraMode);
  const flyInPhase = useJourneyStore((state) => state.flyInPhase);

  useCursor(hovered);

  const baseColor = useMemo(() => new THREE.Color(accent), [accent]);
  const highlight = useMemo(() => brighten(accent, 0.25), [accent]);
  const deepColor = useMemo(() => new THREE.Color(secondary), [secondary]);
  const isActive = activePlanet === id;
  const haloMap = useMemo(() => {
    const size = 64;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext('2d');

    if (!context) {
      return null;
    }

    const gradient = context.createRadialGradient(size / 2, size / 2, 4, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, 'rgba(255,255,255,0.95)');
    gradient.addColorStop(0.35, `${highlight.getStyle().replace('rgb', 'rgba').replace(')', ', 0.45)')}`);
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, size, size);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, [highlight]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * (reducedMotion ? 0.04 : 0.1);
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2 + radius) * 0.08;
      const scale =
        isActive && cameraMode === 'fly-in'
          ? flyInPhase === 'cruise'
            ? 1.22
            : 1.12
          : isActive || hovered
          ? 1.08
          : cameraMode === 'orbit' && id === 'projects'
          ? 1.06
          : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), Math.min(1, delta * 4));
    }

    if (shellRef.current) {
      shellRef.current.rotation.y -= delta * 0.03;
    }

    if (glowRef.current) {
      const glowScale =
        isActive && cameraMode === 'fly-in'
          ? flyInPhase === 'cruise'
            ? 1.8
            : 1.58
          : isActive
          ? 1.42
          : hovered
          ? 1.34
          : 1.22;
      glowRef.current.scale.lerp(
        new THREE.Vector3(glowScale, glowScale, glowScale),
        Math.min(1, delta * 4)
      );
    }

    if (ringRef.current && !reducedMotion) {
      ringRef.current.rotation.z += delta * 0.025;
    }

    if (haloRef.current) {
      const haloScale =
        isActive && cameraMode === 'fly-in'
          ? flyInPhase === 'cruise'
            ? radius * 7.4
            : radius * 6.4
          : isActive
          ? radius * 5.8
          : cameraMode === 'orbit' && id === 'projects'
          ? radius * 5.1
          : radius * 4.3;
      haloRef.current.scale.lerp(new THREE.Vector3(haloScale, haloScale, haloScale), Math.min(1, delta * 4));
      const material = haloRef.current.material as THREE.SpriteMaterial;
      material.opacity = THREE.MathUtils.lerp(
        material.opacity,
        isActive && cameraMode === 'fly-in'
          ? flyInPhase === 'cruise'
            ? 0.52
            : 0.44
          : isActive
          ? 0.38
          : hovered
          ? 0.27
          : cameraMode === 'orbit' && id === 'projects'
          ? 0.21
          : 0.14,
        Math.min(1, delta * 4)
      );
    }

    if (signalRef.current) {
      const signalScale =
        isActive || hovered
          ? id === 'contact'
            ? 1.24
            : 1.12
          : cameraMode === 'orbit'
          ? 1
          : 0.92;
      signalRef.current.scale.lerp(new THREE.Vector3(signalScale, signalScale, signalScale), Math.min(1, delta * 4));
      signalRef.current.rotation.z += delta * (id === 'about' ? -0.12 : 0.08);
      const material = signalRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = THREE.MathUtils.lerp(
        material.opacity,
        isActive ? 0.36 : hovered ? 0.24 : cameraMode === 'orbit' ? 0.16 : 0.08,
        Math.min(1, delta * 4)
      );
    }

    if (scanRef.current) {
      scanRef.current.rotation.x += delta * (id === 'projects' ? 0.18 : 0.12);
      const material = scanRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = THREE.MathUtils.lerp(
        material.opacity,
        isActive || hovered ? (id === 'contact' ? 0.22 : 0.18) : 0.08,
        Math.min(1, delta * 4)
      );
    }

    if (moonRef.current) {
      moonRef.current.position.x = Math.cos(state.clock.elapsedTime * 0.42) * (radius * 1.9);
      moonRef.current.position.z = Math.sin(state.clock.elapsedTime * 0.42) * (radius * 1.9);
    }
  });

  return (
    <group position={position}>
      {haloMap && !lowPerformanceMode ? (
        <sprite ref={haloRef} scale={[radius * 4.2, radius * 4.2, 1]}>
          <spriteMaterial map={haloMap} transparent opacity={0.14} depthWrite={false} />
        </sprite>
      ) : null}

      <mesh
        ref={glowRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => beginFlyIn(id)}
      >
        <sphereGeometry args={[radius * 1.12, lowPerformanceMode ? 20 : 32, lowPerformanceMode ? 20 : 32]} />
        <meshBasicMaterial color={highlight} transparent opacity={0.18} />
      </mesh>

      <mesh ref={shellRef}>
        <sphereGeometry args={[radius * 1.025, lowPerformanceMode ? 20 : 36, lowPerformanceMode ? 20 : 36]} />
        <meshBasicMaterial color={highlight} transparent opacity={0.12} />
      </mesh>

      <mesh ref={signalRef} rotation={id === 'about' ? [0.7, 0.2, 0.4] : [1.45, 0, 0]}>
        <torusGeometry args={[radius * (id === 'contact' ? 1.72 : 1.58), radius * 0.02, 12, lowPerformanceMode ? 36 : 72]} />
        <meshBasicMaterial color={highlight} transparent opacity={0.12} />
      </mesh>

      {(hovered || isActive || cameraMode === 'orbit') ? (
        <mesh ref={scanRef} rotation={[Math.PI / 2, 0, id === 'projects' ? 0.3 : id === 'about' ? -0.24 : 0.12]}>
          <ringGeometry args={[radius * 2.02, radius * 2.1, lowPerformanceMode ? 40 : 64]} />
          <meshBasicMaterial color={highlight} transparent opacity={0.08} side={THREE.DoubleSide} />
        </mesh>
      ) : null}

      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => beginFlyIn(id)}
      >
        <sphereGeometry args={[radius, lowPerformanceMode ? 28 : 48, lowPerformanceMode ? 28 : 48]} />
        <meshStandardMaterial
          color={baseColor}
          emissive={deepColor}
          emissiveIntensity={isActive ? 0.75 : hovered ? 0.52 : 0.24}
          roughness={0.72}
          metalness={0.04}
        />
      </mesh>

      <mesh scale={[1, 1, 1.002]}>
        <sphereGeometry args={[radius * 0.98, lowPerformanceMode ? 20 : 36, lowPerformanceMode ? 20 : 36]} />
        <meshStandardMaterial
          color={deepColor}
          emissive={deepColor}
          emissiveIntensity={0.18}
          roughness={0.95}
          metalness={0}
          transparent
          opacity={0.16}
        />
      </mesh>

      {ring ? (
        <mesh ref={ringRef} rotation={ring.tilt}>
          <ringGeometry args={[ring.inner, ring.outer, lowPerformanceMode ? 48 : 72]} />
          <meshBasicMaterial color={highlight} transparent opacity={0.18} side={THREE.DoubleSide} />
        </mesh>
      ) : null}

      {id === 'contact' && !lowPerformanceMode ? (
        <mesh ref={moonRef} position={[radius * 1.9, radius * 0.18, 0]}>
          <sphereGeometry args={[radius * 0.16, 14, 14]} />
          <meshBasicMaterial color="#e7ffff" transparent opacity={0.7} />
        </mesh>
      ) : null}
    </group>
  );
}
