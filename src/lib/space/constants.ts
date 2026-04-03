export type PlanetId = 'projects' | 'about' | 'contact';
export type CameraMode = 'cockpit' | 'overview' | 'orbit' | 'fly-in' | 'returning' | 'landed';
export type FlyInPhase = 'idle' | 'accelerate' | 'cruise' | 'decelerate' | 'landed';

export const SCROLL_BREAKPOINTS = {
  cockpitEnd: 0.1,
  panoramaEnd: 0.7,
  orbitEnd: 1,
} as const;

export const PLANETS: Array<{
  id: PlanetId;
  hudLabel: 'PROJECTS' | 'ABOUT' | 'CONTACT';
  distanceLabel: string;
  accent: string;
  markerPosition: { top: string; left: string };
  position: [number, number, number];
  radius: number;
  glowScale: number;
  secondary: string;
  accentStrength: number;
  ring?: {
    inner: number;
    outer: number;
    tilt: [number, number, number];
  };
}> = [
  {
    id: 'projects',
    hudLabel: 'PROJECTS',
    distanceLabel: '2.4 LY',
    accent: '#00ccee',
    markerPosition: { top: '36%', left: '58%' },
    position: [4.9, 0.95, -8.3],
    radius: 2.2,
    glowScale: 1.18,
    secondary: '#0f5672',
    accentStrength: 0.32,
    ring: {
      inner: 2.95,
      outer: 4.2,
      tilt: [1.1, 0.25, 0.2],
    },
  },
  {
    id: 'about',
    hudLabel: 'ABOUT',
    distanceLabel: '4.1 LY',
    accent: '#ff9933',
    markerPosition: { top: '49%', left: '34%' },
    position: [-4.5, -0.55, -11.8],
    radius: 1.6,
    glowScale: 1.22,
    secondary: '#7a2e10',
    accentStrength: 0.28,
  },
  {
    id: 'contact',
    hudLabel: 'CONTACT',
    distanceLabel: '6.8 LY',
    accent: '#ccffff',
    markerPosition: { top: '24%', left: '74%' },
    position: [8.7, 3.5, -15.8],
    radius: 1.05,
    glowScale: 1.3,
    secondary: '#7ddcff',
    accentStrength: 0.18,
  },
];

export const SPACE_THEME = {
  background: '#0a0a0f',
  cyan: '#00f0ff',
  green: '#00ff66',
  text: '#ffffff',
  muted: '#888899',
  panel: 'rgba(10, 10, 20, 0.84)',
} as const;

export const SECTION_ACCENTS: Record<PlanetId, string> = {
  projects: '#00ccee',
  about: '#ff9933',
  contact: '#ccffff',
};

export const CAMERA_ANCHORS: Record<Exclude<CameraMode, 'fly-in' | 'landed'>, {
  position: [number, number, number];
  target: [number, number, number];
  roll: number;
}> = {
  cockpit: {
    position: [0, 0.1, 9.2],
    target: [-1.2, 0.45, -15.2],
    roll: -0.03,
  },
  overview: {
    position: [0.9, 1.55, 13.8],
    target: [0.1, 0.7, -15.8],
    roll: -0.01,
  },
  orbit: {
    position: [3.1, 3.4, 17.4],
    target: [1.1, 0.85, -16.2],
    roll: 0.015,
  },
  returning: {
    position: [2.3, 2.8, 16.3],
    target: [1.1, 0.7, -15.2],
    roll: 0.01,
  },
};
