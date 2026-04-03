import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { useJourneyStore } from '../../stores/useJourneyStore';

export default function Starfield() {
  const pointsRef = useRef<THREE.Points>(null);
  const driftRef = useRef<THREE.Points>(null);
  const hazeRef = useRef<THREE.Points>(null);
  const clusterRef = useRef<THREE.Points>(null);
  const giantRef = useRef<THREE.Points>(null);
  const lowPerformanceMode = useJourneyStore((state) => state.lowPerformanceMode);
  const reducedMotion = useJourneyStore((state) => state.reducedMotion);
  const cameraMode = useJourneyStore((state) => state.cameraMode);
  const flyInPhase = useJourneyStore((state) => state.flyInPhase);
  const scrollProgress = useJourneyStore((state) => state.scrollProgress);

  const starCount = lowPerformanceMode ? 780 : 2200;
  const driftCount = lowPerformanceMode ? 140 : 280;
  const hazeCount = lowPerformanceMode ? 0 : 90;
  const clusterCount = lowPerformanceMode ? 0 : 360;
  const giantCount = lowPerformanceMode ? 24 : 60;

  const positions = useMemo(() => {
    const values = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i += 1) {
      const stride = i * 3;
      values[stride] = (Math.random() - 0.5) * 70;
      values[stride + 1] = (Math.random() - 0.5) * 50;
      values[stride + 2] = -Math.random() * 120;
    }

    return values;
  }, [starCount]);

  const colors = useMemo(() => {
    const values = new Float32Array(starCount * 3);
    const palette = [
      new THREE.Color('#ffffff'),
      new THREE.Color('#f7edd9'),
      new THREE.Color('#dfefff'),
      new THREE.Color('#ffd7a8'),
      new THREE.Color('#f4f0ff'),
    ];

    for (let i = 0; i < starCount; i += 1) {
      const stride = i * 3;
      const tone = palette[Math.floor(Math.random() * palette.length)];
      values[stride] = tone.r;
      values[stride + 1] = tone.g;
      values[stride + 2] = tone.b;
    }

    return values;
  }, [starCount]);

  const driftPositions = useMemo(() => {
    const values = new Float32Array(driftCount * 3);

    for (let i = 0; i < driftCount; i += 1) {
      const stride = i * 3;
      values[stride] = (Math.random() - 0.5) * 42;
      values[stride + 1] = (Math.random() - 0.5) * 28;
      values[stride + 2] = -Math.random() * 80;
    }

    return values;
  }, [driftCount]);

  const driftColors = useMemo(() => {
    const values = new Float32Array(driftCount * 3);
    const palette = [new THREE.Color('#9ce7ff'), new THREE.Color('#ffffff'), new THREE.Color('#ffe3b5')];

    for (let i = 0; i < driftCount; i += 1) {
      const stride = i * 3;
      const tone = palette[Math.floor(Math.random() * palette.length)];
      values[stride] = tone.r;
      values[stride + 1] = tone.g;
      values[stride + 2] = tone.b;
    }

    return values;
  }, [driftCount]);

  const hazePositions = useMemo(() => {
    if (!hazeCount) {
      return new Float32Array(0);
    }

    const values = new Float32Array(hazeCount * 3);

    for (let i = 0; i < hazeCount; i += 1) {
      const stride = i * 3;
      values[stride] = (Math.random() - 0.5) * 36;
      values[stride + 1] = (Math.random() - 0.5) * 22;
      values[stride + 2] = -Math.random() * 55;
    }

    return values;
  }, [hazeCount]);

  const clusterPositions = useMemo(() => {
    if (!clusterCount) {
      return new Float32Array(0);
    }

    const values = new Float32Array(clusterCount * 3);

    for (let i = 0; i < clusterCount; i += 1) {
      const stride = i * 3;
      const angle = Math.random() * Math.PI * 2;
      const radius = 8 + Math.random() * 12;
      values[stride] = -4.5 + Math.cos(angle) * radius;
      values[stride + 1] = 2.2 + Math.sin(angle) * radius * 0.42;
      values[stride + 2] = -36 - Math.random() * 30;
    }

    return values;
  }, [clusterCount]);

  const giantPositions = useMemo(() => {
    const values = new Float32Array(giantCount * 3);

    for (let i = 0; i < giantCount; i += 1) {
      const stride = i * 3;
      values[stride] = (Math.random() - 0.5) * 84;
      values[stride + 1] = (Math.random() - 0.5) * 58;
      values[stride + 2] = -8 - Math.random() * 95;
    }

    return values;
  }, [giantCount]);

  const giantColors = useMemo(() => {
    const values = new Float32Array(giantCount * 3);
    const palette = [
      new THREE.Color('#ffffff'),
      new THREE.Color('#fff4df'),
      new THREE.Color('#d6e8ff'),
      new THREE.Color('#ffd9b5'),
    ];

    for (let i = 0; i < giantCount; i += 1) {
      const stride = i * 3;
      const tone = palette[Math.floor(Math.random() * palette.length)];
      values[stride] = tone.r;
      values[stride + 1] = tone.g;
      values[stride + 2] = tone.b;
    }

    return values;
  }, [giantCount]);

  useFrame((_, delta) => {
    if (!pointsRef.current || !driftRef.current || reducedMotion) {
      return;
    }

    const overviewSpeed =
      cameraMode === 'overview' || cameraMode === 'orbit' ? 0.45 + scrollProgress * 1.2 : 0.16;
    const speed =
      cameraMode === 'fly-in'
        ? flyInPhase === 'accelerate'
          ? 6.6
          : flyInPhase === 'cruise'
          ? 8.2
          : 3.4
        : overviewSpeed;
    pointsRef.current.rotation.y += delta * (cameraMode === 'fly-in' ? 0.014 : 0.007);
    pointsRef.current.position.x = THREE.MathUtils.lerp(
      pointsRef.current.position.x,
      cameraMode === 'fly-in'
        ? flyInPhase === 'cruise'
          ? -1.4
          : -0.8
        : cameraMode === 'overview' || cameraMode === 'orbit'
        ? -0.45 - scrollProgress * 0.6
        : 0,
      Math.min(1, delta * 1.8)
    );
    pointsRef.current.position.y = THREE.MathUtils.lerp(
      pointsRef.current.position.y,
      cameraMode === 'fly-in' ? 0.22 : 0,
      Math.min(1, delta * 1.8)
    );
    pointsRef.current.position.z += delta * speed;
    driftRef.current.position.z += delta * speed * (cameraMode === 'fly-in' ? 2.35 : 1.7);
    driftRef.current.rotation.y -= delta * 0.0035;
    driftRef.current.position.x = THREE.MathUtils.lerp(
      driftRef.current.position.x,
      cameraMode === 'fly-in'
        ? flyInPhase === 'cruise'
          ? -2.6
          : -1.2
        : cameraMode === 'overview' || cameraMode === 'orbit'
        ? -0.75
        : 0,
      Math.min(1, delta * 2.4)
    );
    driftRef.current.position.y = THREE.MathUtils.lerp(
      driftRef.current.position.y,
      cameraMode === 'fly-in' ? 0.38 : 0,
      Math.min(1, delta * 2.4)
    );

    if (hazeRef.current) {
      hazeRef.current.rotation.y += delta * (cameraMode === 'fly-in' ? 0.006 : 0.0025);
      hazeRef.current.position.z += delta * (cameraMode === 'fly-in' ? 0.95 : 0.1 + scrollProgress * 0.08);
    }

    if (clusterRef.current) {
      clusterRef.current.rotation.z += delta * (cameraMode === 'fly-in' ? 0.0038 : 0.0016);
      clusterRef.current.position.z += delta * (cameraMode === 'fly-in' ? 0.85 : 0.08 + scrollProgress * 0.06);
      clusterRef.current.position.x = THREE.MathUtils.lerp(
        clusterRef.current.position.x,
        cameraMode === 'fly-in' ? -0.95 : -0.25,
        Math.min(1, delta * 1.6)
      );
    }

    if (giantRef.current) {
      giantRef.current.rotation.y += delta * 0.0016;
      giantRef.current.position.z += delta * (cameraMode === 'fly-in' ? 0.24 : 0.035 + scrollProgress * 0.02);
    }

    if (pointsRef.current.position.z > 12) {
      pointsRef.current.position.z = 0;
    }

    if (driftRef.current.position.z > 12) {
      driftRef.current.position.z = -10;
    }

    if (hazeRef.current && hazeRef.current.position.z > 8) {
      hazeRef.current.position.z = -4;
    }

    if (clusterRef.current && clusterRef.current.position.z > -18) {
      clusterRef.current.position.z = -28;
    }

    if (giantRef.current && giantRef.current.position.z > 10) {
      giantRef.current.position.z = -18;
    }
  });

  const flyOpacity =
    cameraMode === 'fly-in'
      ? flyInPhase === 'accelerate' || flyInPhase === 'cruise'
        ? 1
        : 0.9
      : 0.72 + scrollProgress * 0.16;

  return (
    <>
      <points ref={pointsRef} position={[0, 0, 0]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={positions.length / 3}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
            count={colors.length / 3}
          />
        </bufferGeometry>
        <pointsMaterial
          vertexColors
          size={
            lowPerformanceMode
              ? 0.026
              : cameraMode === 'fly-in'
              ? flyInPhase === 'cruise'
                ? 0.082
                : 0.064
              : 0.036 + scrollProgress * 0.012
          }
          sizeAttenuation
          transparent
          opacity={flyOpacity}
        />
      </points>

      {!lowPerformanceMode ? (
        <points ref={driftRef} position={[0, 0, -10]}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[driftPositions, 3]}
              count={driftPositions.length / 3}
            />
            <bufferAttribute
              attach="attributes-color"
              args={[driftColors, 3]}
              count={driftColors.length / 3}
            />
          </bufferGeometry>
          <pointsMaterial
            vertexColors
            size={cameraMode === 'fly-in' ? (flyInPhase === 'cruise' ? 0.18 : 0.12) : 0.05 + scrollProgress * 0.012}
            sizeAttenuation
            transparent
            opacity={cameraMode === 'fly-in' ? (flyInPhase === 'cruise' ? 0.58 : 0.42) : 0.14}
          />
        </points>
      ) : null}

      {hazeCount ? (
        <points ref={hazeRef} position={[0, 0, -4]}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[hazePositions, 3]}
              count={hazePositions.length / 3}
            />
          </bufferGeometry>
          <pointsMaterial
            color="#6fdcff"
            size={0.18}
            sizeAttenuation
            transparent
            opacity={cameraMode === 'cockpit' ? 0.045 : cameraMode === 'fly-in' ? 0.14 : 0.08}
            depthWrite={false}
          />
        </points>
      ) : null}

      {clusterCount ? (
        <points ref={clusterRef} position={[0, 0, -28]}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[clusterPositions, 3]}
              count={clusterPositions.length / 3}
            />
          </bufferGeometry>
          <pointsMaterial
            color="#86c9ff"
            size={cameraMode === 'fly-in' ? 0.22 : 0.1}
            sizeAttenuation
            transparent
            opacity={cameraMode === 'cockpit' ? 0.14 : cameraMode === 'fly-in' ? 0.3 : 0.22}
            depthWrite={false}
          />
        </points>
      ) : null}

      <points ref={giantRef} position={[0, 0, -18]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[giantPositions, 3]}
            count={giantPositions.length / 3}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[giantColors, 3]}
            count={giantColors.length / 3}
          />
        </bufferGeometry>
        <pointsMaterial
          vertexColors
          size={cameraMode === 'fly-in' ? 0.22 : 0.14}
          sizeAttenuation
          transparent
          opacity={cameraMode === 'fly-in' ? 0.78 : 0.5}
          depthWrite={false}
        />
      </points>
    </>
  );
}
