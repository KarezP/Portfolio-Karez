import { useFrame, useThree } from '@react-three/fiber';
import { useMemo } from 'react';
import * as THREE from 'three';

import { CAMERA_ANCHORS, PLANETS } from '../../lib/space/constants';
import { useJourneyStore } from '../../stores/useJourneyStore';

const tempTarget = new THREE.Vector3();
const tempLookAt = new THREE.Vector3();
const upVector = new THREE.Vector3(0, 1, 0);
const tempUp = new THREE.Vector3(0, 1, 0);
const zAxis = new THREE.Vector3(0, 0, 1);
const anchorPositionA = new THREE.Vector3();
const anchorPositionB = new THREE.Vector3();
const anchorTargetA = new THREE.Vector3();
const anchorTargetB = new THREE.Vector3();

function smoothstep(edge0: number, edge1: number, value: number) {
  const x = THREE.MathUtils.clamp((value - edge0) / (edge1 - edge0), 0, 1);
  return x * x * (3 - 2 * x);
}

export default function CameraRig() {
  const { camera } = useThree();
  const cameraMode = useJourneyStore((state) => state.cameraMode);
  const activePlanet = useJourneyStore((state) => state.activePlanet);
  const flyInPhase = useJourneyStore((state) => state.flyInPhase);
  const reducedMotion = useJourneyStore((state) => state.reducedMotion);
  const scrollProgress = useJourneyStore((state) => state.scrollProgress);

  const activePlanetConfig = useMemo(
    () => PLANETS.find((planet) => planet.id === activePlanet) ?? null,
    [activePlanet]
  );

  useFrame((state, delta) => {
    let desiredPosition: [number, number, number];
    let desiredLookAt: [number, number, number];
    let desiredRoll = 0;

    if ((cameraMode === 'fly-in' || cameraMode === 'landed' || cameraMode === 'returning') && activePlanetConfig) {
      const [px, py, pz] = activePlanetConfig.position;
      const travelTime = state.clock.elapsedTime;
      const distance =
        cameraMode === 'returning'
          ? flyInPhase === 'decelerate'
            ? activePlanetConfig.radius * 3.1
            : flyInPhase === 'cruise'
            ? activePlanetConfig.radius * 5.2
            : activePlanetConfig.radius * 7.8
          : flyInPhase === 'accelerate'
          ? activePlanetConfig.radius * 8.8
          : flyInPhase === 'cruise'
          ? activePlanetConfig.radius * 5.7
          : flyInPhase === 'decelerate'
          ? activePlanetConfig.radius * 2.9
          : activePlanetConfig.radius * 1.7;

      const lateralOffset =
        cameraMode === 'fly-in' && flyInPhase === 'accelerate'
          ? activePlanetConfig.id === 'about'
            ? -3.2
            : activePlanetConfig.id === 'contact'
            ? 2.9
            : 3.5
          : cameraMode === 'fly-in' && flyInPhase === 'cruise'
          ? activePlanetConfig.id === 'about'
            ? -1.9
            : activePlanetConfig.id === 'contact'
            ? 1.55
            : 2.2
          : cameraMode === 'fly-in' && flyInPhase === 'decelerate'
          ? activePlanetConfig.id === 'about'
            ? -1.15
            : activePlanetConfig.id === 'contact'
            ? 0.9
            : 1.36
          : activePlanetConfig.id === 'about'
          ? -0.72
          : activePlanetConfig.id === 'contact'
          ? 0.55
          : 0.92;
      const verticalOffset =
        cameraMode === 'returning'
          ? flyInPhase === 'accelerate'
            ? 0.82
            : flyInPhase === 'cruise'
            ? 0.46
            : 0.22
          : flyInPhase === 'accelerate'
          ? 1.15
          : flyInPhase === 'cruise'
          ? 0.5
          : 0.04;

      const cinematicBias =
        cameraMode === 'returning'
          ? flyInPhase === 'accelerate'
            ? 0.34
            : flyInPhase === 'cruise'
            ? 0.18
            : 0.04
          : flyInPhase === 'accelerate'
          ? 0.62
          : flyInPhase === 'cruise'
          ? 0.34
          : 0.08;
      const shipSwayX =
        cameraMode === 'fly-in'
          ? Math.sin(travelTime * 0.95 + activePlanetConfig.radius) * (flyInPhase === 'cruise' ? 0.28 : 0.14)
          : Math.sin(travelTime * 0.52 + activePlanetConfig.radius) * 0.08;
      const shipSwayY =
        cameraMode === 'fly-in'
          ? Math.cos(travelTime * 0.78 + activePlanetConfig.radius) * (flyInPhase === 'cruise' ? 0.18 : 0.1)
          : Math.cos(travelTime * 0.4 + activePlanetConfig.radius) * 0.05;
      desiredPosition = [
        px + lateralOffset + Math.sin(travelTime * 0.42 + activePlanetConfig.radius) * cinematicBias + shipSwayX,
        py + activePlanetConfig.radius * verticalOffset + Math.cos(travelTime * 0.32 + activePlanetConfig.radius) * cinematicBias * 0.32 + shipSwayY,
        pz + distance,
      ];
      desiredLookAt = [
        px + Math.sin(travelTime * 0.24 + activePlanetConfig.radius) * cinematicBias * 0.16,
        py + (flyInPhase === 'accelerate' ? activePlanetConfig.radius * 0.15 : 0),
        pz - activePlanetConfig.radius * (flyInPhase === 'accelerate' ? 0.85 : 0.18),
      ];
      desiredRoll =
        cameraMode === 'returning'
          ? flyInPhase === 'accelerate'
            ? 0.08
            : flyInPhase === 'cruise'
            ? 0.05
            : 0.01
          : flyInPhase === 'accelerate'
          ? -0.22
          : flyInPhase === 'cruise'
          ? -0.12
          : activePlanetConfig.id === 'about'
          ? 0.04
          : -0.03;
    } else {
      const cockpitToOverview = smoothstep(0, 0.58, scrollProgress);
      const overviewToOrbit = smoothstep(0.58, 1, scrollProgress);
      const cockpit = CAMERA_ANCHORS.cockpit;
      const overview = CAMERA_ANCHORS.overview;
      const orbit = CAMERA_ANCHORS.orbit;

      const firstPosition = anchorPositionA.set(...cockpit.position).lerp(anchorPositionB.set(...overview.position), cockpitToOverview);
      const finalPosition = firstPosition.lerp(anchorPositionB.set(...orbit.position), overviewToOrbit);
      const firstTarget = anchorTargetA.set(...cockpit.target).lerp(anchorTargetB.set(...overview.target), cockpitToOverview);
      const finalTarget = firstTarget.lerp(anchorTargetB.set(...orbit.target), overviewToOrbit);

      const overviewDrift = 1 - smoothstep(0.62, 1, scrollProgress);
      desiredPosition = [
        finalPosition.x + Math.sin(state.clock.elapsedTime * 0.09) * 0.38 * overviewDrift,
        finalPosition.y + Math.cos(state.clock.elapsedTime * 0.07) * 0.22 * overviewDrift,
        finalPosition.z - scrollProgress * 2.2,
      ];
      desiredLookAt = [
        finalTarget.x - 1.25 + Math.sin(state.clock.elapsedTime * 0.06) * 0.3,
        finalTarget.y + Math.cos(state.clock.elapsedTime * 0.05) * 0.16,
        finalTarget.z - 3.8 - scrollProgress * 2.2,
      ];
      desiredRoll = THREE.MathUtils.lerp(
        THREE.MathUtils.lerp(cockpit.roll, overview.roll, cockpitToOverview),
        orbit.roll,
        overviewToOrbit
      );
    }

    const motionFactor =
      reducedMotion
        ? 1
        : Math.min(
            1,
            delta *
              (cameraMode === 'fly-in'
                ? flyInPhase === 'cruise'
                  ? 5.4
                  : 4.1
                : cameraMode === 'overview' || cameraMode === 'orbit'
                ? 2.6
                : 2.2)
          );
    tempTarget.set(...desiredPosition);
    camera.position.lerp(tempTarget, motionFactor);

    tempLookAt.set(...desiredLookAt);
    if (!reducedMotion && cameraMode !== 'landed') {
      tempLookAt.y += Math.sin(state.clock.elapsedTime * 0.26) * 0.08;
    }

    tempUp.copy(upVector).applyAxisAngle(zAxis, desiredRoll);
    camera.up.lerp(tempUp, motionFactor);
    camera.lookAt(tempLookAt);
  });

  return null;
}
