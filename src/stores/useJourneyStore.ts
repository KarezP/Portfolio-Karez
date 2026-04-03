import { create } from 'zustand';

import { PLANETS, SCROLL_BREAKPOINTS, type CameraMode, type FlyInPhase, type PlanetId } from '../lib/space/constants';
import type { PortfolioLanguage } from '../lib/content/portfolioContent';

type JourneyStore = {
  scrollProgress: number;
  activePlanet: PlanetId | null;
  flyInPhase: FlyInPhase;
  cameraMode: CameraMode;
  language: PortfolioLanguage;
  reducedMotion: boolean;
  lowPerformanceMode: boolean;
  setScrollProgress: (value: number) => void;
  setLanguage: (value: PortfolioLanguage) => void;
  beginFlyIn: (planet: PlanetId) => void;
  setFlyInPhase: (phase: FlyInPhase) => void;
  landOnPlanet: (planet: PlanetId) => void;
  startReturnToOrbit: () => void;
  finishReturnToOrbit: () => void;
  setReducedMotion: (value: boolean) => void;
  setLowPerformanceMode: (value: boolean) => void;
};

const clamp = (value: number) => Math.min(Math.max(value, 0), 1);

const deriveCameraMode = (progress: number): CameraMode => {
  if (progress <= SCROLL_BREAKPOINTS.cockpitEnd) {
    return 'cockpit';
  }

  if (progress < SCROLL_BREAKPOINTS.panoramaEnd) {
    return 'overview';
  }

  return 'orbit';
};

export const useJourneyStore = create<JourneyStore>((set) => ({
  scrollProgress: 0,
  activePlanet: null,
  flyInPhase: 'idle',
  cameraMode: 'cockpit',
  language: 'en',
  reducedMotion: false,
  lowPerformanceMode: false,
  setScrollProgress: (value) => {
    const nextProgress = clamp(value);

    set((state) => {
      if (state.cameraMode === 'fly-in' || state.cameraMode === 'landed') {
        return state;
      }

      if (state.cameraMode === 'returning') {
        return state;
      }

      return {
        scrollProgress: nextProgress,
        cameraMode: deriveCameraMode(nextProgress),
      };
    });
  },
  setLanguage: (value) => set({ language: value }),
  beginFlyIn: (planet) =>
    set({
      activePlanet: planet,
      flyInPhase: 'accelerate',
      cameraMode: 'fly-in',
    }),
  setFlyInPhase: (phase) =>
    set((state) => ({
      flyInPhase: phase,
      cameraMode: phase === 'landed' ? 'landed' : state.cameraMode,
    })),
  landOnPlanet: (planet) =>
    set({
      activePlanet: planet,
      flyInPhase: 'landed',
      cameraMode: 'landed',
    }),
  startReturnToOrbit: () =>
    set({
      flyInPhase: 'decelerate',
      cameraMode: 'returning',
    }),
  finishReturnToOrbit: () =>
    set({
      activePlanet: null,
      flyInPhase: 'idle',
      cameraMode: 'orbit',
      scrollProgress: SCROLL_BREAKPOINTS.panoramaEnd,
    }),
  setReducedMotion: (value) => set({ reducedMotion: value }),
  setLowPerformanceMode: (value) => set({ lowPerformanceMode: value }),
}));

export const DEFAULT_DESTINATION = PLANETS[0].hudLabel;
