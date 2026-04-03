'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';

import HudShell from '../hud/HudShell';
import SectionOverlay from '../sections/SectionOverlay';
import { useJourneyStore } from '../../stores/useJourneyStore';

const SpaceScene = dynamic(() => import('../canvas/SpaceScene'), {
  ssr: false,
  loading: () => null,
});

export default function PortfolioExperienceShell() {
  const setReducedMotion = useJourneyStore((state) => state.setReducedMotion);
  const setLowPerformanceMode = useJourneyStore((state) => state.setLowPerformanceMode);
  const setScrollProgress = useJourneyStore((state) => state.setScrollProgress);
  const activePlanet = useJourneyStore((state) => state.activePlanet);
  const cameraMode = useJourneyStore((state) => state.cameraMode);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(reducedMotionQuery.matches);
    setLowPerformanceMode(window.innerWidth < 768);

    const handleReducedMotionChange = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
    };
    const handleResize = () => {
      setLowPerformanceMode(window.innerWidth < 768);
    };

    reducedMotionQuery.addEventListener('change', handleReducedMotionChange);
    window.addEventListener('resize', handleResize);

    return () => {
      reducedMotionQuery.removeEventListener('change', handleReducedMotionChange);
      window.removeEventListener('resize', handleResize);
    };
  }, [setLowPerformanceMode, setReducedMotion]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    let touchStartY = 0;

    const handleWheel = (event: WheelEvent) => {
      if (activePlanet || cameraMode === 'fly-in' || cameraMode === 'landed' || cameraMode === 'returning') {
        return;
      }

      event.preventDefault();
      setScrollProgress(
        Math.min(1, Math.max(0, useJourneyStore.getState().scrollProgress + event.deltaY * 0.00065))
      );
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? 0;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (activePlanet || cameraMode === 'fly-in' || cameraMode === 'landed' || cameraMode === 'returning') {
        return;
      }

      const currentY = event.touches[0]?.clientY ?? touchStartY;
      const delta = touchStartY - currentY;
      touchStartY = currentY;

      setScrollProgress(
        Math.min(1, Math.max(0, useJourneyStore.getState().scrollProgress + delta * 0.0016))
      );
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [activePlanet, cameraMode, setScrollProgress]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0a0a0f] text-white">
      <SpaceScene />
      <HudShell />
      <SectionOverlay />
    </main>
  );
}
