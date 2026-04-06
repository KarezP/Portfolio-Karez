'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { getUI, getPortfolio, type ShellLang, type UILabels } from './shellContent';
import { useJourneyStore } from '../../stores/useJourneyStore';
import karezPhoto from '../../images/karez-space-crew.jpg';

const TAU = Math.PI * 2;
const STAR_COUNT = 1200;
const WORLD_DEPTH = 240;
const COMET_MAX = 3;
const STARFIELD_WIDTH = 4.4;
const STARFIELD_HEIGHT = 2.4;

const PANEL_POSITION = {
  projects: { justify: 'justify-end', panelShift: 'mr-2', width: 'max-w-[52rem]', panelWidth: 832 },
  about: { justify: 'justify-center', panelShift: '', width: 'max-w-[46rem]', panelWidth: 736 },
  contact: { justify: 'justify-start', panelShift: 'ml-2', width: 'max-w-[52rem]', panelWidth: 832 },
  skills: { justify: 'justify-end', panelShift: 'mr-2', width: 'max-w-[46rem]', panelWidth: 736 },
  home: { justify: 'justify-start', panelShift: 'ml-2', width: 'max-w-[46rem]', panelWidth: 736 },
} as const;

type PlanetId = 'home' | 'projects' | 'about' | 'contact' | 'skills';
type SceneMode = 'idle' | 'focus' | 'return';

type ProjectDetail = {
  description: string;
  role: string;
  duration: string;
  highlights: string[];
};

type ProjectCard = {
  slug: string;
  title: string;
  summary: string;
  stack: string[];
  type: string;
  detail: ProjectDetail | null;
  liveUrl?: string;
  screenshotUrl?: string;
};

type PlanetContent = {
  eyebrow: string;
  title: string;
  intro: string;
};

type SkillCategory = {
  label: string;
  items: string[];
};

type HomePlanetContent = PlanetContent & {
  pitch: string;
  stats: Array<{ value: string; label: string }>;
  navHeading: string;
  destinations: Array<{ id: string; name: string; description: string }>;
};

type PortfolioData = {
  planets: {
    home: HomePlanetContent;
    projects: PlanetContent & { cards: ProjectCard[] };
    about: PlanetContent & {
      body: string;
      timelineHeading: string;
      timeline: string[];
      skillsHeading: string;
      skills: string[];
      factsHeading: string;
      facts: string[];
    };
    contact: PlanetContent & {
      availability: string;
      formHeading: string;
      directLabel: string;
      responseNote: string;
      channels: string[];
    };
    skills: PlanetContent & {
      categories: SkillCategory[];
    };
  };
  contact: {
    email: string;
    phone: string;
    linkedinUrl: string;
    githubUrl: string;
  };
  references: {
    quoteLabel: string;
    quote: string;
  };
};

type PlanetConfig = {
  id: PlanetId;
  name: string;
  description: string;
  colorA: string;
  colorB: string;
  glow: string;
  baseRadius: number;
  worldX: number;
  worldY: number;
  worldZ: number;
  textureSeed: number;
  spinSpeed: number;
  axialTilt: number;
  hologramTone: 'sky' | 'amber' | 'fuchsia';
};

type DecorativeBody = {
  id: string;
  name: string;
  colorA: string;
  colorB: string;
  glow: string;
  baseRadius: number;
  worldX: number;
  worldY: number;
  worldZ: number;
  textureSeed: number;
  spinSpeed: number;
  axialTilt: number;
};

type CameraState = {
  x: number;
  y: number;
  z: number;
};

type RenderState = {
  camera: CameraState;
  selectedPlanetId: PlanetId | null;
  flightT: number;
  flightDuration: number;
  speed: number;
  speedNorm: number;
  phase: 'idle' | 'accelerate';
  flash: number;
  hologramShown: boolean;
  motionMode: SceneMode;
  returnProgress: number;
  time: number;
};

type PlanetScreen = {
  x: number;
  y: number;
  radius: number;
  relZ: number;
};

type ViewportSize = {
  width: number;
  height: number;
};

type Star = {
  x: number;
  y: number;
  z: number;
  size: number;
  alpha: number;
  layerDepth: number;
  twinkleSeed: number;
};

declare global {
  interface Window {
    __planetFlyInPreview?: {
      beginFlight: (planetId: PlanetId) => void;
      returnToSpace: () => void;
    };
  }
}

const planetConfig: PlanetConfig[] = [
  {
    // Orbit 1 — upper-right, prominent
    id: 'projects',
    name: 'PROJECT CLUSTER',
    description: 'Utvalt arbete och levererade projekt',
    colorA: '#e9d5ff',
    colorB: '#9333ea',
    glow: 'rgba(192,132,252,0.36)',
    baseRadius: 40,
    worldX: 290,
    worldY: -100,
    worldZ: -420,
    textureSeed: 2.2,
    spinSpeed: 0.34,
    axialTilt: -0.18,
    hologramTone: 'fuchsia',
  },
  {
    // Orbit 2 — left, mid-level
    id: 'about',
    name: 'EXPERIENCE',
    description: 'Bakgrund, profil och riktning',
    colorA: '#93c5fd',
    colorB: '#2563eb',
    glow: 'rgba(96,165,250,0.3)',
    baseRadius: 36,
    worldX: -300,
    worldY: 50,
    worldZ: -480,
    textureSeed: 4.6,
    spinSpeed: 0.26,
    axialTilt: 0.12,
    hologramTone: 'sky',
  },
  {
    // Orbit 3 — lower-right, far
    id: 'contact',
    name: 'CONTACT BEACON',
    description: 'Oppen kanal for direktkontakt',
    colorA: '#fde047',
    colorB: '#d97706',
    glow: 'rgba(251,191,36,0.32)',
    baseRadius: 30,
    worldX: 260,
    worldY: 150,
    worldZ: -560,
    textureSeed: 7.1,
    spinSpeed: 0.41,
    axialTilt: -0.1,
    hologramTone: 'amber',
  },
  {
    // Orbit 0 — upper-left, closest
    id: 'skills',
    name: 'SKILL GALAXY',
    description: 'Tekniska fardigheter och verktyg',
    colorA: '#6ee7b7',
    colorB: '#059669',
    glow: 'rgba(52,211,153,0.32)',
    baseRadius: 28,
    worldX: -240,
    worldY: -110,
    worldZ: -340,
    textureSeed: 5.4,
    spinSpeed: 0.3,
    axialTilt: -0.12,
    hologramTone: 'sky',
  },
  {
    // Central star — the sun, anchor of the solar system
    id: 'home',
    name: 'HOME STATION',
    description: 'Kaptensbriefing och snabbnavigering',
    colorA: '#fb923c',
    colorB: '#9a3412',
    glow: 'rgba(251,146,60,0.4)',
    baseRadius: 48,
    worldX: 0,
    worldY: 10,
    worldZ: -420,
    textureSeed: 1.2,
    spinSpeed: 0.18,
    axialTilt: 0.06,
    hologramTone: 'amber',
  },
];

const decorativeBodies: DecorativeBody[] = [];

function easeInOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

function mix(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function getPlanetFocusOffsets(planetId: PlanetId) {
  if (planetId === 'projects') {
    return { x: -190, y: 0 };
  }
  if (planetId === 'contact') {
    return { x: -170, y: -6 };
  }
  return { x: -145, y: -10 };
}

function makeStars(): Star[] {
  return Array.from({ length: STAR_COUNT }, (_, index) => {
    const layer = index % 3;
    const layerDepth = layer === 0 ? 0.45 : layer === 1 ? 0.8 : 1.25;
    return {
      x: (Math.random() - 0.5) * STARFIELD_WIDTH,
      y: (Math.random() - 0.5) * STARFIELD_HEIGHT,
      z: Math.random() * WORLD_DEPTH,
      size: Math.random() * 2.2 + 0.15,
      alpha: layer === 0 ? 0.95 : layer === 1 ? 0.72 : 0.44,
      layerDepth,
      twinkleSeed: Math.random() * 1000,
    };
  });
}

interface Comet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  tailLength: number;
}

function spawnComet(w: number, h: number): Comet {
  const fromLeft = Math.random() > 0.5;
  const x = fromLeft ? -40 : w + 40;
  const targetX = fromLeft ? w * (0.3 + Math.random() * 0.7) : w * Math.random() * 0.7;
  const y = -20 + Math.random() * h * 0.3;
  const targetY = h * (0.5 + Math.random() * 0.5);
  const dx = targetX - x;
  const dy = targetY - y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const speed = 2.5 + Math.random() * 2.5;
  return {
    x,
    y,
    vx: (dx / dist) * speed,
    vy: (dy / dist) * speed,
    life: 1,
    maxLife: dist / speed,
    size: 1.2 + Math.random() * 1.2,
    tailLength: 60 + Math.random() * 80,
  };
}

function projectPlanet(planet: PlanetConfig, camera: CameraState, w: number, h: number): PlanetScreen {
  const relZ = planet.worldZ - camera.z;
  const distanceFromCamera = Math.max(140, camera.z - planet.worldZ);
  const perspective = 560 / Math.max(280, distanceFromCamera + 176);

  // Responsive scaling: on portrait mobile, compress X but spread Y
  const isPortrait = w < 768;
  const xScale = Math.min(1, w / 1200);
  const yScale = isPortrait ? Math.min(1.4, h / 650) : Math.min(1, w / 1200);
  const radiusScale = Math.max(0.55, Math.min(1, Math.min(w, h) / 900));

  return {
    x: w * 0.5 + (planet.worldX - camera.x) * perspective * xScale,
    y: h * 0.5 + (planet.worldY - camera.y) * perspective * yScale,
    radius: planet.baseRadius * perspective * 1.18 * radiusScale,
    relZ,
  };
}

function getAnimatedPlanet(planet: PlanetConfig) {
  return { ...planet, hidden: false };
}

function getPanelPlacement(planetId: PlanetId, screen: PlanetScreen | undefined, viewport: ViewportSize) {
  const config = PANEL_POSITION[planetId];
  const panelWidth = Math.min(config.panelWidth, viewport.width < 768 ? viewport.width - 40 : 640);
  const panelHeight = viewport.width < 768 ? Math.min(520, viewport.height * 0.68) : Math.min(viewport.height - 80, viewport.height * 0.82);
  const left = viewport.width < 768 ? 20 : 48;
  const top = viewport.width < 768 ? Math.max(8, (viewport.height - panelHeight) * 0.15) : Math.max(16, (viewport.height - panelHeight) * 0.4);
  const connectorEndX = left + panelWidth;
  const connectorEndY = top + panelHeight * 0.42;

  return {
    side: 'left' as const,
    left,
    top,
    width: panelWidth,
    height: panelHeight,
    connectorStartX: screen?.x ?? viewport.width * 0.5,
    connectorStartY: screen?.y ?? viewport.height * 0.5,
    connectorEndX,
    connectorEndY,
  };
}

function drawPlanet(
  ctx: CanvasRenderingContext2D,
  planet: Pick<PlanetConfig, 'colorA' | 'colorB' | 'glow' | 'axialTilt' | 'textureSeed'>,
  screen: PlanetScreen,
  highlight: number,
  arrivalGlow: number,
  spin = 0,
  time = 0,
  particles?: Array<{ angle: number; distance: number; speed: number; size: number }>
) {
  if (screen.radius <= 0) {
    return;
  }

  // Hologram flicker
  const flicker = Math.random() > 0.97 ? 0.7 : 1;
  ctx.globalAlpha = flicker;

  ctx.save();
  ctx.translate(screen.x, screen.y);

  // Pulse breathing
  const pulse = Math.sin(time * 1.2) * 0.04 + 1;
  const r = screen.radius * pulse;

  // Outer atmospheric halo (uses pulsing radius)
  ctx.save();
  ctx.globalAlpha = highlight * 0.14 + 0.04;
  const haloGrad = ctx.createRadialGradient(0, 0, r * 0.5, 0, 0, r * 3.5);
  haloGrad.addColorStop(0, planet.glow);
  haloGrad.addColorStop(0.35, planet.glow.replace(/[\d.]+\)$/, '0.06)'));
  haloGrad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = haloGrad;
  ctx.beginPath();
  ctx.arc(0, 0, r * 3.5, 0, TAU);
  ctx.fill();
  ctx.restore();

  const glow = ctx.createRadialGradient(0, 0, r * 0.9, 0, 0, r * 2.4);
  glow.addColorStop(0, planet.glow.replace(/0\.\d+\)/, `${0.2 + arrivalGlow * 0.13})`));
  glow.addColorStop(0.5, planet.glow.replace(/0\.\d+\)/, '0.1)'));
  glow.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(0, 0, r * 2.4, 0, TAU);
  ctx.fill();

  const g = ctx.createRadialGradient(-screen.radius * 0.3, -screen.radius * 0.3, screen.radius * 0.1, 0, 0, screen.radius);
  g.addColorStop(0, planet.colorA);
  g.addColorStop(0.38, planet.colorA);
  g.addColorStop(0.72, planet.colorB);
  g.addColorStop(1, '#08111f');
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(0, 0, screen.radius, 0, TAU);
  ctx.fill();

  ctx.save();
  ctx.beginPath();
  ctx.arc(0, 0, screen.radius, 0, TAU);
  ctx.clip();
  ctx.globalAlpha = 0.14;
  for (let i = 0; i < 5; i += 1) {
    ctx.fillStyle = i % 2 === 0 ? 'rgba(255,255,255,0.12)' : 'rgba(10,15,30,0.18)';
    ctx.beginPath();
    const stripeY = Math.sin(planet.textureSeed + spin + i * 1.1) * screen.radius * 0.56;
    const stripeX = Math.cos(planet.textureSeed * 0.7 + spin * 0.9 + i * 0.6) * screen.radius * 0.18;
    ctx.ellipse(
      stripeX,
      stripeY,
      screen.radius * 0.9,
      screen.radius * 0.12,
      planet.axialTilt + Math.sin(spin) * 0.08,
      0,
      TAU
    );
    ctx.fill();
  }
  ctx.restore();

  const shadow = ctx.createRadialGradient(screen.radius * 0.22, -screen.radius * 0.14, screen.radius * 0.12, 0, 0, screen.radius * 1.1);
  shadow.addColorStop(0, 'rgba(0,0,0,0)');
  shadow.addColorStop(0.65, 'rgba(5,10,20,0.1)');
  shadow.addColorStop(1, 'rgba(2,6,18,0.46)');
  ctx.fillStyle = shadow;
  ctx.beginPath();
  ctx.arc(0, 0, screen.radius, 0, TAU);
  ctx.fill();

  ctx.save();
  ctx.beginPath();
  ctx.arc(0, 0, screen.radius, 0, TAU);
  ctx.clip();
  ctx.strokeStyle = 'rgba(6, 182, 212, 0.15)';
  ctx.lineWidth = 0.5;
  for (let i = 0; i < 5; i += 1) {
    const lineY = -screen.radius + (i * screen.radius * 2) / 5 + ((spin * 30) % ((screen.radius * 2) / 5));
    ctx.beginPath();
    ctx.moveTo(-screen.radius, lineY);
    ctx.lineTo(screen.radius, lineY);
    ctx.stroke();
  }
  ctx.restore();

  ctx.strokeStyle = 'rgba(6, 182, 212, 0.25)';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.ellipse(0, 0, screen.radius * 1.3, screen.radius * 0.2, spin * 0.35 + planet.axialTilt, 0, TAU);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.strokeStyle = `rgba(255,255,255,${0.2 + highlight * 0.45})`;
  ctx.lineWidth = Math.max(1, screen.radius * 0.045);
  ctx.beginPath();
  ctx.arc(0, 0, screen.radius * (1.02 + highlight * 0.08), 0, TAU);
  ctx.stroke();

  if (highlight > 0.1) {
    ctx.strokeStyle = `rgba(125,211,252,${highlight * 0.8})`;
    ctx.lineWidth = Math.max(1, screen.radius * 0.02);
    ctx.beginPath();
    ctx.arc(0, 0, screen.radius * 1.16, 0, TAU);
    ctx.stroke();
  }

  // Orbiting particles
  if (particles) {
    for (const p of particles) {
      p.angle += p.speed;
      const px = Math.cos(p.angle) * p.distance;
      const py = Math.sin(p.angle) * p.distance;
      ctx.fillStyle = planet.glow.replace(/[\d.]+\)$/, '0.6)');
      ctx.beginPath();
      ctx.arc(px, py, p.size, 0, TAU);
      ctx.fill();
    }
  }

  ctx.globalAlpha = 1;
  ctx.restore();
}

function HologramFrame({
  children,
  tone = 'sky',
  visible = false,
}: {
  children: React.ReactNode;
  tone?: 'sky' | 'amber' | 'fuchsia';
  visible?: boolean;
}) {
  const accent =
    tone === 'amber'
      ? 'text-amber-300/70 border-amber-300/20'
      : tone === 'fuchsia'
      ? 'text-fuchsia-300/70 border-fuchsia-300/20'
      : 'text-cyan-300/70 border-cyan-300/20';

  return (
    <div className={'relative w-full max-w-xl transition-all duration-700 delay-200 ' + (visible ? 'translate-x-0 opacity-100' : '-translate-x-[100px] opacity-0')}>
      <div className="absolute inset-0 bg-cyan-400/10 blur-3xl" />
      <div className="relative flex flex-col border border-cyan-400/30 bg-black/80 p-4 sm:p-6 lg:p-8 backdrop-blur-xl" style={{ maxHeight: 'min(68vh, calc(100dvh - 60px))' }}>
        <div className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-cyan-400/60" />
        <div className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-cyan-400/60" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-cyan-400/60" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-cyan-400/60" />
        <div className={'pointer-events-none absolute left-8 right-8 top-0 h-px bg-gradient-to-r from-transparent via-current to-transparent ' + accent} />
        <div className={'pointer-events-none absolute left-8 right-8 bottom-0 h-px bg-gradient-to-r from-transparent via-current to-transparent ' + accent} />
        <div className="holo-scroll relative z-10 flex-1 overflow-y-auto overflow-x-hidden pr-2" style={{ paddingBottom: '3.5rem', scrollPaddingBottom: '3.5rem' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

function ProjectsHologramContent({
  section,
  sectionLabelTone,
  closeButton,
  ui,
}: {
  section: PortfolioData['planets']['projects'];
  sectionLabelTone: string;
  closeButton: React.ReactNode;
  ui: UILabels;
}) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [viewKey, setViewKey] = useState(0);

  const selectedCard = selectedSlug
    ? section.cards.find((c) => c.slug === selectedSlug) ?? null
    : null;

  const handleSelect = (slug: string) => {
    setSelectedSlug(slug);
    setViewKey((k) => k + 1);
  };

  const handleBack = () => {
    setSelectedSlug(null);
    setViewKey((k) => k + 1);
  };

  if (selectedCard?.detail) {
    const { detail } = selectedCard;
    return (
      <div className="space-y-6 pb-12 text-white/70 leading-relaxed">
        {closeButton}
        <div key={`detail-${viewKey}`} className="animate-holo-drill-in pt-12">
          <button
            type="button"
            onClick={handleBack}
            className="group mb-6 flex items-center gap-2.5 border border-cyan-400/30 px-4 py-2 text-xs uppercase tracking-[0.28em] text-cyan-400/70 transition-colors hover:bg-cyan-400/10 hover:text-cyan-400"
          >
            <span className="inline-block transition-transform group-hover:-translate-x-0.5">&lsaquo;</span>
            {ui.backToProjects}
          </button>

          <div className="flex items-center justify-between gap-3">
            <h2 className="text-3xl font-thin tracking-wide text-white">{selectedCard.title}</h2>
            <span className="shrink-0 border border-cyan-400/20 px-2 py-0.5 text-[11px] text-cyan-400/60">
              {selectedCard.type}
            </span>
          </div>
          {selectedCard.liveUrl ? (
            <a
              href={selectedCard.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 border border-cyan-400/30 bg-cyan-400/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-cyan-400/80 transition-colors hover:bg-cyan-400/15 hover:text-cyan-300"
            >
              {ui.liveSite}
              <span className="text-[10px]">&nearr;</span>
            </a>
          ) : null}
          <div className="mt-4 h-px w-16 bg-gradient-to-r from-cyan-400/60 to-transparent" />

          {selectedCard.screenshotUrl ? (
            <div className="mt-5">
              <div className="text-[10px] uppercase tracking-[0.28em] text-cyan-400/50 mb-2">{ui.siteScan}</div>
              <div className="relative overflow-hidden border border-cyan-400/20">
                <img
                  src={selectedCard.screenshotUrl}
                  alt={`${selectedCard.title} screenshot`}
                  className="w-full object-cover object-top"
                  style={{ maxHeight: '220px' }}
                />
                <div className="pointer-events-none absolute inset-0" style={{ background: 'repeating-linear-gradient(180deg, rgba(0,255,255,0.03) 0px, rgba(0,255,255,0.03) 1px, transparent 1px, transparent 4px)' }} />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
            </div>
          ) : null}

          <div className="mt-5 space-y-4">
            {detail.description.split('\n\n').map((para, i) => (
              <p key={i} className="text-sm leading-7 text-white/70">{para}</p>
            ))}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="border border-cyan-400/15 bg-cyan-400/5 p-4">
              <div className="text-[10px] uppercase tracking-[0.28em] text-cyan-400/50">{ui.role}</div>
              <div className="mt-1.5 text-sm text-white">{detail.role}</div>
            </div>
            <div className="border border-cyan-400/15 bg-cyan-400/5 p-4">
              <div className="text-[10px] uppercase tracking-[0.28em] text-cyan-400/50">{ui.duration}</div>
              <div className="mt-1.5 text-sm text-white">{detail.duration}</div>
            </div>
          </div>

          <div className="mt-6">
            <div className="text-[10px] uppercase tracking-[0.28em] text-cyan-400/50">{ui.highlights}</div>
            <div className="mt-2 h-px w-10 bg-cyan-400/30" />
            <ul className="mt-3 space-y-2.5">
              {detail.highlights.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm leading-7 text-white/70">
                  <span className="mt-2 block h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400/60" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <div className="text-[10px] uppercase tracking-[0.28em] text-cyan-400/50">{ui.tech}</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {selectedCard.stack.map((item) => (
                <span key={item} className="text-xs text-cyan-400/60">{item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12 text-white/70 leading-relaxed">
      {closeButton}
      <div key={`list-${viewKey}`} className={viewKey > 0 ? 'animate-holo-drill-back' : ''}>
        <div className="pt-12">
          <div className={'mb-4 text-xs uppercase tracking-[0.3em] ' + sectionLabelTone}>{section.eyebrow}</div>
          <h2 className="mb-6 text-3xl font-thin tracking-wide text-white">{section.title}</h2>
          <p className="text-sm leading-7 text-white/70">{section.intro}</p>
        </div>
        <div className="mt-6 grid max-h-[56vh] gap-4 overflow-auto pr-1">
          {section.cards.map((card) => (
            <div key={card.slug} className="border-l-2 border-cyan-400/40 pl-4">
              <div className="flex items-center justify-between gap-3">
                {card.detail ? (
                  <button
                    type="button"
                    onClick={() => handleSelect(card.slug)}
                    className="group flex items-center gap-2 text-left"
                  >
                    <h3 className="text-lg text-white transition-colors hover:text-cyan-300">{card.title}</h3>
                    <span className="text-sm text-cyan-400/0 transition-colors group-hover:text-cyan-400/60">&rsaquo;</span>
                  </button>
                ) : (
                  <h3 className="text-lg text-white">{card.title}</h3>
                )}
                <span className="border border-cyan-400/20 px-2 py-0.5 text-[11px] text-cyan-400/60">
                  {card.type}
                </span>
              </div>
              <p className="mt-2 text-sm text-white/60">{card.summary}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {card.stack.map((item) => (
                  <span key={item} className="text-xs text-cyan-400/60">
                    {item}
                  </span>
                ))}
                {card.liveUrl ? (
                  <>
                    <span className="text-xs text-white/20">|</span>
                    <a
                      href={card.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-cyan-400/70 transition-colors hover:text-cyan-300"
                    >
                      {ui.visitLink}
                    </a>
                  </>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionPanel({
  sectionId,
  onClose,
  visible,
}: {
  sectionId: PlanetId | null;
  onClose: () => void;
  visible: boolean;
}) {
  const language = useJourneyStore((s) => s.language);

  if (!sectionId) {
    return null;
  }

  const portfolio = getPortfolio(language as ShellLang) as PortfolioData;
  const ui = getUI(language as ShellLang);

  const tone = planetConfig.find((planet) => planet.id === sectionId)?.hologramTone || 'sky';
  const sectionLabelTone = tone === 'amber' ? 'text-amber-300/70' : tone === 'fuchsia' ? 'text-fuchsia-300/70' : 'text-cyan-400/60';
  const subheadingTone = tone === 'amber' ? 'text-amber-300' : tone === 'fuchsia' ? 'text-fuchsia-300' : 'text-cyan-400';
  const closeButton = (
    <button
      onClick={onClose}
      className="absolute right-4 top-4 z-20 border border-cyan-400/40 px-4 py-2 text-xs tracking-widest text-cyan-400 transition-colors hover:bg-cyan-400/10"
    >
      {ui.close}
    </button>
  );

  if (sectionId === 'projects') {
    const section = portfolio.planets.projects;
    return (
      <HologramFrame tone={tone} visible={visible}>
        <ProjectsHologramContent
          section={section}
          sectionLabelTone={sectionLabelTone}
          closeButton={closeButton}
          ui={ui}
        />
      </HologramFrame>
    );
  }

  if (sectionId === 'home') {
    const section = portfolio.planets.about;
    return (
      <HologramFrame tone={tone} visible={visible}>
        <div className="space-y-6 pb-12 text-white/70 leading-relaxed">
          {closeButton}
          <div className="pt-12">
            <div className={'mb-4 text-xs uppercase tracking-[0.3em] ' + sectionLabelTone}>{section.eyebrow}</div>
            <h2 className="mb-6 text-3xl font-thin tracking-wide text-white">{section.title}</h2>
            <p className="text-sm leading-7 text-white/70">{section.intro}</p>
            <p className="mt-4 text-sm leading-7 text-white/60">{section.body}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <div className={'mb-3 text-sm tracking-wider ' + subheadingTone}>{section.timelineHeading}</div>
              <ul className="space-y-2 text-sm text-white/70">
                {section.timeline.map((item) => (
                  <li key={item}>&bull; {item}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <div>
                <div className={'mb-3 text-sm tracking-wider ' + subheadingTone}>{section.skillsHeading}</div>
                <div className="flex flex-wrap gap-2 text-sm text-white/70">
                  {section.skills.map((item) => (
                    <span key={item}>&bull; {item}</span>
                  ))}
                </div>
              </div>
              <div>
                <div className={'mb-3 text-sm tracking-wider ' + subheadingTone}>{section.factsHeading}</div>
                <ul className="space-y-2 text-sm text-white/70">
                  {section.facts.map((item) => (
                    <li key={item}>&bull; {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="border-l-2 border-cyan-400/40 pl-4 text-sm text-white/70">
            <div className="font-medium">{portfolio.references.quoteLabel}</div>
            <p className="mt-2 leading-6">&ldquo;{portfolio.references.quote}&rdquo;</p>
          </div>
        </div>
      </HologramFrame>
    );
  }

  if (sectionId === 'about') {
    const home = portfolio.planets.home as any;
    return (
      <HologramFrame tone={tone} visible={visible}>
        <div className="space-y-6 pb-12 text-white/70 leading-relaxed">
          {closeButton}
          <div className="pt-12 flex flex-col sm:flex-row gap-6 items-start">
            <div className="relative shrink-0 mx-auto sm:mx-0">
              <div className="relative h-32 w-32 sm:h-36 sm:w-36 overflow-hidden rounded-full">
                <Image src={karezPhoto} alt="Karez" fill className="object-cover" />
              </div>
            </div>
            <div>
              <div className={'mb-4 text-xs uppercase tracking-[0.3em] ' + sectionLabelTone}>{home.eyebrow}</div>
              <h2 className="mb-4 text-3xl font-thin tracking-wide text-white">{home.title}</h2>
              <div className="mb-5 text-xs uppercase tracking-[0.28em] text-cyan-400/60">{home.intro}</div>
              <p className="text-sm leading-7 text-white/70">{home.pitch}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-6">
            {home.stats.map((stat: any) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-light leading-none text-cyan-400">{stat.value}</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/40">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* External validation */}
          <div>
            <div className={'mb-3 text-sm tracking-wider ' + subheadingTone}>{home.externalProof.heading}</div>
            <div className="border-l-2 border-amber-400/40 pl-4">
              <p className="text-sm leading-7 text-white/70 italic">&ldquo;{home.externalProof.reaktionQuote}&rdquo;</p>
              <a
                href={home.externalProof.reaktionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 text-xs text-amber-400/80 transition-colors hover:text-amber-300"
              >
                {home.externalProof.reaktionLabel} <span className="text-[10px]">↗</span>
              </a>
            </div>
            <div className="mt-4 border-l-2 border-cyan-400/40 pl-4">
              <div className="text-[10px] uppercase tracking-[0.28em] text-cyan-400/50 mb-1">{home.externalProof.supervisorHeading}</div>
              <p className="text-sm leading-7 text-white/70 italic">&ldquo;{home.externalProof.supervisorQuote}&rdquo;</p>
            </div>
          </div>

          {/* Backstory */}
          <div>
            <div className={'mb-3 text-sm tracking-wider ' + subheadingTone}>{home.backstory.heading}</div>
            <ul className="space-y-2.5">
              {home.backstory.items.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-2.5 text-sm leading-7 text-white/70">
                  <span className="mt-2 block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400/60" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="border border-amber-400/20 bg-amber-400/5 p-5">
            <div className="text-[10px] uppercase tracking-[0.28em] text-amber-400/60 mb-2">{home.cta.heading}</div>
            <p className="text-sm text-white/80">{home.cta.text}</p>
            <div className="mt-3 flex flex-wrap gap-3">
              <a href={`mailto:${portfolio.contact.email}`} className="text-xs text-amber-400/80 transition-colors hover:text-amber-300">
                {portfolio.contact.email}
              </a>
              <span className="text-white/20">|</span>
              <a href={portfolio.contact.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-amber-400/80 transition-colors hover:text-amber-300">
                LinkedIn ↗
              </a>
            </div>
          </div>
        </div>
      </HologramFrame>
    );
  }

  if (sectionId === 'skills') {
    const section = portfolio.planets.skills;
    return (
      <HologramFrame tone={tone} visible={visible}>
        <div className="space-y-6 pb-12 text-white/70 leading-relaxed">
          {closeButton}
          <div className="pt-12">
            <div className={'mb-4 text-xs uppercase tracking-[0.3em] ' + sectionLabelTone}>{section.eyebrow}</div>
            <h2 className="mb-6 text-3xl font-thin tracking-wide text-white">{section.title}</h2>
            <p className="text-sm leading-7 text-white/70">{section.intro}</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {section.categories.map((cat) => (
              <div key={cat.label} className="border border-cyan-400/15 bg-cyan-400/5 p-4">
                <div className="text-[10px] uppercase tracking-[0.28em] text-cyan-400/50">{cat.label}</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span key={item} className="border border-cyan-400/20 bg-cyan-400/5 px-2.5 py-1 text-xs text-white/80">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </HologramFrame>
    );
  }

  const section = portfolio.planets.contact;
  return (
    <HologramFrame tone={tone} visible={visible}>
      <div className="space-y-6 pb-12 text-white/70 leading-relaxed">
        {closeButton}
        <div className="pt-12">
          <div className={'mb-4 text-xs uppercase tracking-[0.3em] ' + sectionLabelTone}>{section.eyebrow}</div>
          <h2 className="mb-6 text-3xl font-thin tracking-wide text-white">{section.title}</h2>
          <p className="text-sm leading-7 text-white/70">{section.intro}</p>
          <p className="mt-4 text-sm leading-7 text-white/60">{section.availability}</p>
        </div>
        <div>
          <div className={'mb-3 text-sm tracking-wider ' + subheadingTone}>{section.formHeading}</div>
          <div className="space-y-3 text-sm text-white/70">
            {section.channels.map((item) => (
              <div key={item}>&bull; {item}</div>
            ))}
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <a href={`mailto:${portfolio.contact.email}`} className="border-l-2 border-cyan-400/40 pl-4 transition">
            <div className="text-xs uppercase tracking-[0.2em] text-cyan-400/60">{section.directLabel}</div>
            <div className="mt-2 text-cyan-400">{portfolio.contact.email}</div>
          </a>
          <a href={portfolio.contact.linkedinUrl} target="_blank" rel="noreferrer" className="border-l-2 border-cyan-400/40 pl-4 transition">
            <div className="text-xs uppercase tracking-[0.2em] text-cyan-400/60">LinkedIn</div>
            <div className="mt-2 text-cyan-400">Karez Peshawa</div>
          </a>
          <a href={portfolio.contact.githubUrl} target="_blank" rel="noreferrer" className="border-l-2 border-cyan-400/40 pl-4 transition">
            <div className="text-xs uppercase tracking-[0.2em] text-cyan-400/60">GitHub</div>
            <div className="mt-2 text-cyan-400">github.com/KarezP</div>
          </a>
          <a href={`tel:${portfolio.contact.phone.replace(/\s+/g, '')}`} className="border-l-2 border-cyan-400/40 pl-4 transition">
            <div className="text-xs uppercase tracking-[0.2em] text-cyan-400/60">Telefon</div>
            <div className="mt-2 text-cyan-400">{portfolio.contact.phone}</div>
          </a>
        </div>
        <div className="border-l-2 border-cyan-400/40 pl-4 text-sm text-white/70">
          {section.responseNote}
        </div>
      </div>
    </HologramFrame>
  );
}

function HologramConnector({
  startX,
  startY,
  endX,
  endY,
}: {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}) {
  const midX = mix(startX, endX, 0.52);

  return (
    <svg className="pointer-events-none absolute inset-0 z-30 h-full w-full overflow-visible">
      <defs>
        <linearGradient id="connectorLine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(125,211,252,0.9)" />
          <stop offset="55%" stopColor="rgba(125,211,252,0.28)" />
          <stop offset="100%" stopColor="rgba(125,211,252,0.08)" />
        </linearGradient>
      </defs>
      <path
        d={`M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`}
        fill="none"
        stroke="url(#connectorLine)"
        strokeWidth="1.5"
        strokeDasharray="5 6"
        opacity="0.92"
      />
      <circle cx={startX} cy={startY} r="4.5" fill="rgba(186,230,253,0.95)" />
      <circle cx={startX} cy={startY} r="14" fill="rgba(125,211,252,0.18)" />
      <circle cx={endX} cy={endY} r="4.5" fill="rgba(186,230,253,0.95)" />
      <circle cx={endX} cy={endY} r="12" fill="rgba(125,211,252,0.12)" />
    </svg>
  );
}

function HologramPlanet() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return undefined;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return undefined;
    }

    let frame = 0;
    let scanOffset = 0;
    let orbitRotation = 0;
    let raf = 0;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const centerX = 125;
      const centerY = 125;
      const radius = 60;

      frame += 0.005;
      scanOffset += 0.35;
      orbitRotation += 0.01;

      ctx.clearRect(0, 0, width, height);

      const glow = ctx.createRadialGradient(centerX, centerY, radius * 0.8, centerX, centerY, radius * 1.8);
      glow.addColorStop(0, 'rgba(251, 146, 60, 0.4)');
      glow.addColorStop(0.55, 'rgba(251, 146, 60, 0.2)');
      glow.addColorStop(1, 'rgba(251, 146, 60, 0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.8, 0, TAU);
      ctx.fill();

      const body = ctx.createRadialGradient(centerX - 20, centerY - 20, 10, centerX, centerY, radius);
      body.addColorStop(0, '#fb923c');
      body.addColorStop(0.38, '#f97316');
      body.addColorStop(0.72, '#ea580c');
      body.addColorStop(1, '#9a3412');
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, TAU);
      ctx.fill();

      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, TAU);
      ctx.clip();
      ctx.globalAlpha = 0.26;
      for (let i = 0; i < 7; i += 1) {
        ctx.fillStyle = i % 2 === 0 ? 'rgba(255,255,255,0.2)' : 'rgba(50,15,5,0.24)';
        ctx.beginPath();
        const stripeY = centerY + Math.sin(frame * 8 + i * 0.9) * radius * 0.5;
        const stripeX = centerX + Math.cos(frame * 6 + i * 0.8) * radius * 0.16;
        ctx.ellipse(stripeX, stripeY, radius * 0.86, radius * 0.12, -0.18, 0, TAU);
        ctx.fill();
      }
      ctx.restore();

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(orbitRotation);
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.6)';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.ellipse(0, 0, radius * 1.5, radius * 0.3, 0.34, 0, TAU);
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, TAU);
      ctx.clip();
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.3)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 8; i += 1) {
        const y = centerY - radius + 14 + ((i * 16 + scanOffset) % 120);
        ctx.beginPath();
        ctx.moveTo(centerX - radius, y);
        ctx.lineTo(centerX + radius, y);
        ctx.stroke();
      }
      ctx.restore();

      ctx.strokeStyle = 'rgba(255,255,255,0.12)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.02, 0, TAU);
      ctx.stroke();

      raf = window.requestAnimationFrame(render);
    };

    raf = window.requestAnimationFrame(render);
    return () => window.cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="relative mx-auto h-[250px] w-[250px]">
      <div className="absolute inset-0 rounded-full bg-cyan-400/10 blur-3xl" />
      <canvas
        ref={canvasRef}
        width={250}
        height={250}
        className="relative z-10 h-[250px] w-[250px]"
        style={{ filter: 'drop-shadow(0 0 30px rgba(6, 182, 212, 0.5))' }}
      />
      <svg className="pointer-events-none absolute inset-0 z-20 h-full w-full">
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(6, 182, 212, 0.1)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <circle cx="125" cy="125" r="120" fill="url(#grid)" opacity="0.3" />
      </svg>
    </div>
  );
}

function CaptainIntro({
  onBegin,
}: {
  onBegin: () => void;
}) {
  const language = useJourneyStore((s) => s.language);
  const setLanguage = useJourneyStore((s) => s.setLanguage);
  const ui = getUI(language as ShellLang);
  const portfolio = getPortfolio(language as ShellLang) as PortfolioData;

  return (
    <div className="absolute inset-0 z-20 overflow-y-auto sm:overflow-hidden bg-[#0a0e1a]" style={{ minHeight: '100%' }}>
      <div className="pointer-events-none absolute inset-0 opacity-5 [background-image:repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(6,182,212,0.05)_2px,rgba(6,182,212,0.05)_4px)]" />

      <div className="pointer-events-none absolute left-5 top-5 h-4 w-4 border-l border-t border-cyan-400/60" />
      <div className="pointer-events-none absolute right-5 top-5 h-4 w-4 border-r border-t border-cyan-400/60" />
      <div className="pointer-events-none absolute bottom-5 left-5 h-4 w-4 border-b border-l border-cyan-400/60" />
      <div className="pointer-events-none absolute bottom-5 right-5 h-4 w-4 border-b border-r border-cyan-400/60" />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/70 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/70 to-transparent" />

      <div className="absolute inset-x-4 sm:inset-x-6 lg:inset-x-8 top-6 z-30 flex items-center justify-between font-mono text-xs uppercase tracking-[0.3em] text-cyan-400/60">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-cyan-400 hud-pulse" />
          <span>{ui.navOnline}</span>
        </div>
        <div className="flex items-center gap-4">
          <span>{ui.destination}</span>
          <button
            type="button"
            onClick={() => setLanguage(language === 'sv' ? 'en' : 'sv')}
            className="pointer-events-auto cursor-pointer font-mono text-[10px] tracking-[0.28em] text-cyan-400/70 transition hover:text-cyan-400"
          >
            {language === 'sv' ? 'EN' : 'SV'}
          </button>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-4 sm:inset-x-6 lg:inset-x-8 bottom-5 hidden sm:grid grid-cols-3 font-mono text-xs uppercase tracking-widest text-cyan-400/40">
        <div>{ui.systemStatus}</div>
        <div className="text-center">{ui.focus}</div>
        <div className="text-right">{ui.distance}</div>
      </div>

      <div className="pointer-events-auto relative z-10 mx-auto grid min-h-full w-full max-w-7xl grid-cols-1 items-center gap-6 px-4 py-20 sm:gap-6 sm:px-6 sm:py-20 lg:px-8 lg:py-28 xl:grid-cols-3 xl:-translate-x-8">
        <div className="flex justify-center xl:justify-center">
          <div className="relative">
            <HologramPlanet />
          </div>
        </div>

        <div className="text-center xl:text-left">
          <div className="flex items-center justify-center gap-3 xl:justify-start">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-cyan-400/40" />
            <span className="font-mono text-xs tracking-[0.4em] text-cyan-400/60">
              {ui.title}
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-cyan-400/40" />
          </div>

          <div className="relative mb-6 mt-6">
            <h1 className="relative z-10 text-3xl font-thin tracking-[0.1em] text-white sm:text-4xl sm:tracking-[0.16em] xl:text-6xl">
              KAREZ PESHAWA
            </h1>
            <div className="absolute inset-0 text-3xl font-thin tracking-[0.1em] text-cyan-400/20 blur-sm sm:text-4xl sm:tracking-[0.16em] xl:text-6xl">
              KAREZ PESHAWA
            </div>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-cyan-400/10 to-cyan-500/5 blur-xl" />
              <p className="relative mx-auto max-w-xl text-sm leading-relaxed text-white/80 sm:text-base xl:mx-0 xl:text-lg">
                {ui.introWelcome}
              </p>
          </div>

          <div className="flex items-center justify-center gap-3 sm:gap-4 xl:gap-6 xl:justify-start">
            <div className="text-center">
              <div className="mb-1 text-xl sm:text-2xl lg:text-[1.8rem] font-light leading-none text-cyan-400">{ui.statInternship}</div>
              <div className="text-[8px] sm:text-[10px] tracking-[0.18em] text-white/40">{ui.statInternshipLabel}</div>
            </div>

            <div className="h-10 w-px bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent" />

            <div className="text-center">
              <div className="mb-1 text-xl sm:text-2xl lg:text-[1.8rem] font-light leading-none text-cyan-400">{ui.statSites}</div>
              <div className="text-[8px] sm:text-[10px] tracking-[0.18em] text-white/40">{ui.statSitesLabel}</div>
            </div>

            <div className="h-10 w-px bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent" />

            <div className="text-center">
              <div className="mb-1 text-xl sm:text-2xl lg:text-[1.8rem] font-light leading-none text-cyan-400">{ui.statGrade}</div>
              <div className="text-[8px] sm:text-[10px] tracking-[0.18em] text-white/40">{ui.statGradeLabel}</div>
            </div>
          </div>

          <div className="mt-6 flex justify-center sm:mt-8 xl:mt-10 xl:justify-start">
            <button
              type="button"
              onClick={onBegin}
              className="pointer-events-auto group relative transition duration-300 hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-cyan-400/20 blur-lg transition-all group-hover:blur-xl" />
              <div className="relative border border-cyan-400/40 bg-black/50 px-10 py-3 backdrop-blur-sm transition-all group-hover:border-cyan-400/70 group-hover:bg-cyan-400/10">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm tracking-[0.3em] text-cyan-400">{ui.beginNav}</span>
                  <span className="arrow-shift text-cyan-400">&rarr;</span>
                </div>
              </div>
              <div className="absolute left-0 top-0 h-2 w-2 border-l border-t border-cyan-400/60" />
              <div className="absolute right-0 top-0 h-2 w-2 border-r border-t border-cyan-400/60" />
              <div className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-cyan-400/60" />
              <div className="absolute bottom-0 right-0 h-2 w-2 border-b border-r border-cyan-400/60" />
            </button>
          </div>
        </div>

        <div className="space-y-4 xl:translate-x-8">
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent opacity-0 blur-md transition-opacity group-hover:opacity-100" />
            <div className="relative border border-cyan-400/20 bg-black/30 p-3 sm:p-4 lg:p-5 backdrop-blur-sm transition-colors group-hover:border-cyan-400/40">
              <div className="mb-3 flex items-center gap-2">
                <div className="h-3 w-1 bg-cyan-400" />
                <h3 className="font-mono text-xs tracking-[0.3em] text-cyan-400/80">{ui.proofSignal}</h3>
              </div>
              <p className="text-sm leading-relaxed text-white/60">
                {portfolio.references.quote}
              </p>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent opacity-0 blur-md transition-opacity group-hover:opacity-100" />
            <div className="relative border border-cyan-400/20 bg-black/30 p-3 sm:p-4 lg:p-5 backdrop-blur-sm transition-colors group-hover:border-cyan-400/40">
              <div className="mb-3 flex items-center gap-2">
                <div className="h-3 w-1 bg-purple-400" />
                <h3 className="font-mono text-xs tracking-[0.3em] text-cyan-400/80">{ui.navGuide}</h3>
              </div>
              <p className="text-sm leading-relaxed text-white/60">
                {ui.introNavNote}
              </p>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-transparent opacity-0 blur-md transition-opacity group-hover:opacity-100" />
            <div className="relative border border-cyan-400/20 bg-black/30 p-3 sm:p-4 lg:p-5 backdrop-blur-sm transition-colors group-hover:border-cyan-400/40">
              <div className="mb-3 flex items-center gap-2">
                <div className="h-3 w-1 bg-orange-400" />
                <h3 className="font-mono text-xs tracking-[0.3em] text-cyan-400/80">{ui.currentMode}</h3>
              </div>
              <p className="font-mono text-sm uppercase tracking-[0.28em] text-white/74">{ui.bridgeBriefing}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioExperienceShell() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stars = useMemo(() => makeStars(), []);
  const cometsRef = useRef<Comet[]>([]);
  const cometTimerRef = useRef(0);
  const planetParticles = useMemo(() => {
    const particles: Record<string, Array<{ angle: number; distance: number; speed: number; size: number }>> = {};
    for (const planet of planetConfig) {
      const arr = [];
      for (let i = 0; i < 15; i++) {
        arr.push({
          angle: Math.random() * TAU,
          distance: planet.baseRadius * 1.8 + Math.random() * 25,
          speed: 0.003 + Math.random() * 0.006,
          size: 0.5 + Math.random() * 1.5,
        });
      }
      particles[planet.id] = arr;
    }
    return particles;
  }, []);
  const planetParticlesRef = useRef(planetParticles);
  const [activePlanetId, setActivePlanetId] = useState<PlanetId | null>(null);
  const [hoverPlanetId, setHoverPlanetId] = useState<PlanetId | null>(null);
  const [planetScreens, setPlanetScreens] = useState<Record<string, PlanetScreen>>({});
  const [hologramVisible, setHologramVisible] = useState(false);
  const [sceneMode, setSceneMode] = useState<SceneMode>('idle');
  const [viewportSize, setViewportSize] = useState<ViewportSize>({ width: 1280, height: 820 });
  const [introDismissed, setIntroDismissed] = useState(false);
  const activePlanetIdRef = useRef<PlanetId | null>(null);
  const hoverPlanetIdRef = useRef<PlanetId | null>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const introActive = !activePlanetId && sceneMode === 'idle' && !introDismissed;

  const language = useJourneyStore((s) => s.language);
  const setLanguage = useJourneyStore((s) => s.setLanguage);
  const ui = getUI(language as ShellLang);

  useEffect(() => {
    activePlanetIdRef.current = activePlanetId;
  }, [activePlanetId]);

  useEffect(() => {
    hoverPlanetIdRef.current = hoverPlanetId;
  }, [hoverPlanetId]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = (e.clientX - window.innerWidth / 2) * 0.02;
      mouseY.current = (e.clientY - window.innerHeight / 2) * 0.02;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = containerRef.current;
    if (!canvas || !host) {
      return undefined;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return undefined;
    }

    let width = 0;
    let height = 0;
    let raf = 0;
    let last = performance.now();

    const state: RenderState = {
      camera: { x: 0, y: 0, z: -110 },
      selectedPlanetId: null,
      flightT: 0,
      flightDuration: 2.5,
      speed: 0,
      speedNorm: 0,
      phase: 'idle',
      flash: 0,
      hologramShown: false,
      motionMode: 'idle',
      returnProgress: 0,
      time: 0,
    };

    const resize = () => {
      const rect = host.getBoundingClientRect();
      width = Math.max(320, rect.width);
      height = Math.max(540, rect.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      setViewportSize({ width, height });
    };

    const beginFlight = (planetId: PlanetId) => {
      state.selectedPlanetId = planetId;
      state.flightT = 0;
      state.phase = 'accelerate';
      state.flash = 1;
      state.hologramShown = false;
      state.motionMode = 'focus';
      state.returnProgress = 0;
      setActivePlanetId(planetId);
      setHologramVisible(false);
      setSceneMode('focus');
    };

    const returnToSpace = () => {
      state.motionMode = 'return';
      state.returnProgress = 0;
      setHologramVisible(false);
      setSceneMode('return');
    };

    window.__planetFlyInPreview = { beginFlight, returnToSpace };

    const render = (now: number) => {
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;
      state.time += dt;

      if (state.motionMode === 'focus' && state.selectedPlanetId) {
        state.flightT = Math.min(1, state.flightT + dt / state.flightDuration);
        const t = easeInOutCubic(state.flightT);
        const selected = planetConfig.find((item) => item.id === state.selectedPlanetId);
        if (selected) {
          const focusOffset = getPlanetFocusOffsets(state.selectedPlanetId);
          const swayX = Math.sin(state.time * 0.86) * 1.0 * (1 - t);
          const swayY = Math.cos(state.time * 0.62) * 0.6 * (1 - t);
          state.camera.x = mix(0, selected.worldX + focusOffset.x, t) + swayX;
          state.camera.y = mix(0, selected.worldY + focusOffset.y, t) + swayY;
          state.camera.z = mix(-110, selected.worldZ + 84, t);
        }
        state.speedNorm = clamp(state.flightT < 0.5 ? state.flightT * 2 : (1 - state.flightT) * 2, 0, 1);
        state.speed = state.speedNorm * 120;
        if (state.flightT >= 1 && !state.hologramShown) {
          state.hologramShown = true;
          setHologramVisible(true);
        }
      } else if (state.motionMode === 'return' && state.selectedPlanetId) {
        state.returnProgress = Math.min(1, state.returnProgress + dt / 1.8);
        const t = easeInOutCubic(state.returnProgress);
        const selected = planetConfig.find((item) => item.id === state.selectedPlanetId);
        if (selected) {
          const focusOffset = getPlanetFocusOffsets(state.selectedPlanetId);
          const swayX = Math.sin(state.time * 0.7) * 1.2 * (1 - t);
          const swayY = Math.cos(state.time * 0.52) * 0.9 * (1 - t);
          state.camera.x = mix(selected.worldX + focusOffset.x, 0, t) + swayX;
          state.camera.y = mix(selected.worldY + focusOffset.y, 0, t) + swayY;
          state.camera.z = mix(selected.worldZ + 84, -110, t);
        }
        state.speedNorm = mix(0.22, 0, t);
        state.speed = state.speedNorm * 90;
        if (state.returnProgress >= 1) {
          state.motionMode = 'idle';
          state.selectedPlanetId = null;
          state.speed = 0;
          state.speedNorm = 0;
          setActivePlanetId(null);
          setSceneMode('idle');
          setHoverPlanetId(null);
        }
      } else {
        state.camera.z = mix(state.camera.z, -110, 0.04);
        state.camera.x = mix(state.camera.x, Math.sin(state.time * 0.2) * 2.2, 0.04);
        state.camera.y = mix(state.camera.y, Math.cos(state.time * 0.18) * 1.2 - 0.6, 0.04);
        state.speedNorm = mix(state.speedNorm, 0, 0.06);
        state.speed = state.speedNorm * 40;
      }

      state.flash *= 0.96;

      ctx.fillStyle = '#020510';
      ctx.fillRect(0, 0, width, height);

      // Nebula gradients
      const neb1 = ctx.createRadialGradient(width * 0.72, height * 0.28, 0, width * 0.72, height * 0.28, width * 0.48);
      neb1.addColorStop(0, 'rgba(88, 28, 135, 0.07)');
      neb1.addColorStop(0.5, 'rgba(88, 28, 135, 0.025)');
      neb1.addColorStop(1, 'transparent');
      ctx.fillStyle = neb1;
      ctx.fillRect(0, 0, width, height);

      const neb2 = ctx.createRadialGradient(width * 0.18, height * 0.72, 0, width * 0.18, height * 0.72, width * 0.38);
      neb2.addColorStop(0, 'rgba(6, 182, 212, 0.045)');
      neb2.addColorStop(0.5, 'rgba(6, 182, 212, 0.015)');
      neb2.addColorStop(1, 'transparent');
      ctx.fillStyle = neb2;
      ctx.fillRect(0, 0, width, height);

      for (const star of stars) {
        star.z -= dt * (8 + state.speed * star.layerDepth);
        if (star.z < 1) {
          star.z += WORLD_DEPTH;
        }

        const depth = clamp(1 - star.z / WORLD_DEPTH, 0.05, 1);
        const perspective = 1.2 / Math.max(0.25, star.z / WORLD_DEPTH + 0.08);
        const sx = width * 0.5 + (star.x * width * 0.52 - state.camera.x * star.layerDepth * 14) * perspective + mouseX.current * star.layerDepth * 8;
        const sy = height * 0.5 + (star.y * height * 0.5 - state.camera.y * star.layerDepth * 14) * perspective + mouseY.current * star.layerDepth * 8;

        if (sx < -140) {
          star.x += STARFIELD_WIDTH;
        }
        if (sx > width + 140) {
          star.x -= STARFIELD_WIDTH;
        }
        if (sy < -120) {
          star.y += STARFIELD_HEIGHT;
        }
        if (sy > height + 120) {
          star.y -= STARFIELD_HEIGHT;
        }

        const wrappedSx = width * 0.5 + (star.x * width * 0.52 - state.camera.x * star.layerDepth * 14) * perspective + mouseX.current * star.layerDepth * 8;
        const wrappedSy = height * 0.5 + (star.y * height * 0.5 - state.camera.y * star.layerDepth * 14) * perspective + mouseY.current * star.layerDepth * 8;
        if (wrappedSx < -140 || wrappedSx > width + 140 || wrappedSy < -120 || wrappedSy > height + 120) {
          continue;
        }

        const streak = state.speedNorm * 42 * star.layerDepth * depth;
        const radius = Math.max(0.4, star.size * (0.7 + depth));
        const twinkleBase = Math.sin(state.time * 3.5 + star.twinkleSeed) * 0.5 + 0.5;
        const twinkleFlash = Math.sin(state.time * 8.2 + star.twinkleSeed * 3.7) > 0.92 ? 1.5 : 1;
        const twinkle = twinkleBase * twinkleFlash;
        ctx.save();
        ctx.translate(wrappedSx, wrappedSy);
        ctx.rotate(Math.PI * 0.5 + state.camera.x * 0.005);
        ctx.globalAlpha = clamp((star.alpha * 0.6 + depth * 0.16) * twinkle, 0.04, 0.95);

        if (streak > 2) {
          const grad = ctx.createLinearGradient(0, -streak * 0.6, 0, streak * 0.6);
          grad.addColorStop(0, 'rgba(147,197,253,0)');
          grad.addColorStop(0.5, 'rgba(147,197,253,0.92)');
          grad.addColorStop(1, 'rgba(147,197,253,0)');
          ctx.fillStyle = grad;
          ctx.fillRect(-radius * 0.55, -streak * 0.6, radius * 1.1, streak * 1.2);
        } else {
          ctx.fillStyle = 'rgba(147,197,253,0.92)';
          ctx.beginPath();
          ctx.arc(0, 0, radius, 0, TAU);
          ctx.fill();
        }
        ctx.restore();
      }

      // Comets
      cometTimerRef.current += dt;
      if (cometTimerRef.current > 1 && cometsRef.current.length < COMET_MAX && Math.random() < 0.004) {
        cometsRef.current.push(spawnComet(width, height));
        cometTimerRef.current = 0;
      }
      cometsRef.current = cometsRef.current.filter((c) => c.life > 0);
      for (const comet of cometsRef.current) {
        comet.x += comet.vx;
        comet.y += comet.vy;
        comet.life -= 1 / comet.maxLife;
        const alpha = Math.min(1, comet.life * 3) * Math.min(1, (1 - comet.life) * 5);
        ctx.save();
        const angle = Math.atan2(comet.vy, comet.vx);
        ctx.translate(comet.x, comet.y);
        ctx.rotate(angle);
        const tailGrad = ctx.createLinearGradient(0, 0, -comet.tailLength, 0);
        tailGrad.addColorStop(0, `rgba(200, 230, 255, ${alpha * 0.9})`);
        tailGrad.addColorStop(0.3, `rgba(140, 200, 255, ${alpha * 0.4})`);
        tailGrad.addColorStop(1, 'rgba(140, 200, 255, 0)');
        ctx.strokeStyle = tailGrad;
        ctx.lineWidth = comet.size;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-comet.tailLength, 0);
        ctx.stroke();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = '#e0f0ff';
        ctx.beginPath();
        ctx.arc(0, 0, comet.size * 1.2, 0, TAU);
        ctx.fill();
        ctx.fillStyle = `rgba(140, 210, 255, ${alpha * 0.3})`;
        ctx.beginPath();
        ctx.arc(0, 0, comet.size * 4, 0, TAU);
        ctx.fill();
        ctx.restore();
      }

      // Connection lines between planets
      ctx.save();
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.06)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 6]);
      const screenPlanets = planetConfig.map(p => projectPlanet(p, state.camera, width, height));
      for (let i = 0; i < screenPlanets.length; i++) {
        for (let j = i + 1; j < screenPlanets.length; j++) {
          ctx.beginPath();
          ctx.moveTo(screenPlanets[i].x, screenPlanets[i].y);
          ctx.lineTo(screenPlanets[j].x, screenPlanets[j].y);
          ctx.stroke();
        }
      }
      ctx.setLineDash([]);
      ctx.restore();

      const orderedBodies = [...decorativeBodies, ...planetConfig]
        .map((planet) => ({ planet, screen: projectPlanet(planet as PlanetConfig, state.camera, width, height) }))
        .sort((a, b) => b.screen.relZ - a.screen.relZ);

      const nextScreens: Record<string, PlanetScreen> = {};
      for (const entry of orderedBodies) {
        const planet = entry.planet;
        const screen = entry.screen;
        const isInteractive = planetConfig.some((item) => item.id === planet.id);
        if (isInteractive) {
          nextScreens[planet.id] = screen;
        }
        const isActive = isInteractive && planet.id === activePlanetIdRef.current;
        const isHovered = isInteractive && hoverPlanetIdRef.current === planet.id;
        const highlight = isActive ? 1 : isHovered ? 0.72 : 0.16;
        const arrivalGlow = isActive ? 0.65 + state.speedNorm * 0.35 : 0.12;
        const spin = state.time * planet.spinSpeed + planet.textureSeed * 0.2;
        drawPlanet(ctx, planet as PlanetConfig, screen, highlight, arrivalGlow, spin, state.time, isInteractive ? planetParticlesRef.current[planet.id] : undefined);

        if (isActive) {
          ctx.save();
          ctx.strokeStyle = 'rgba(125,211,252,0.38)';
          ctx.lineWidth = Math.max(1, screen.radius * 0.018);
          ctx.beginPath();
          ctx.arc(screen.x, screen.y, screen.radius * 1.48, 0, TAU);
          ctx.stroke();
          ctx.restore();
        }
      }

      setPlanetScreens((prev) => {
        const next: Record<string, PlanetScreen> = {};
        for (const key of Object.keys(nextScreens)) {
          const current = nextScreens[key];
          const prior = prev[key];
          next[key] = prior
            ? {
                x: mix(prior.x, current.x, 0.24),
                y: mix(prior.y, current.y, 0.24),
                radius: mix(prior.radius, current.radius, 0.24),
                relZ: current.relZ,
              }
            : current;
        }
        return next;
      });

      const vignette = ctx.createRadialGradient(width * 0.5, height * 0.5, width * 0.12, width * 0.5, height * 0.5, width * 0.72);
      vignette.addColorStop(0, 'rgba(0,0,0,0)');
      vignette.addColorStop(1, 'rgba(0,0,0,0.58)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      raf = requestAnimationFrame(render);
    };

    resize();
    raf = requestAnimationFrame(render);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      delete window.__planetFlyInPreview;
    };
  }, [introActive, stars]);

  const openSection = (planetId: PlanetId) => {
    window.__planetFlyInPreview?.beginFlight(planetId);
  };

  const closeSection = () => {
    window.__planetFlyInPreview?.returnToSpace();
    setHoverPlanetId(null);
  };

  const activePlacement =
    activePlanetId && planetScreens[activePlanetId]
      ? getPanelPlacement(activePlanetId, planetScreens[activePlanetId], viewportSize)
      : null;

  return (
    <div className="min-h-screen w-full bg-slate-950 p-4 text-slate-100 md:p-6">
      <div className="mx-auto flex min-h-[88vh] max-w-7xl flex-col gap-4">
        <div className="relative flex-1 overflow-hidden rounded-[30px] border border-white/10 bg-slate-950/40 shadow-2xl shadow-slate-950/50 backdrop-blur">
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-950/70 to-transparent" />

          <div className="min-h-[90vh] p-4 lg:p-5">
            <div ref={containerRef} className="relative min-h-[90vh] overflow-hidden rounded-[28px] border border-white/10 bg-black/60 shadow-2xl shadow-sky-950/20">
              {!introActive ? <canvas ref={canvasRef} className="block h-full min-h-[90vh] w-full" /> : null}

              {introActive ? (
                <CaptainIntro onBegin={() => setIntroDismissed(true)} />
              ) : null}

              {!introActive ? (
                <>
                  <div className="pointer-events-none absolute inset-0 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(6, 182, 212, 0.05) 2px, rgba(6, 182, 212, 0.05) 4px)' }} />

                  <div className="pointer-events-none absolute left-4 top-4 sm:left-6 sm:top-6 lg:left-8 lg:top-8">
                    <div className="text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.3em] text-cyan-400/60">{ui.galaxyOverview}</div>
                    <div className="h-[1px] w-16 bg-cyan-400/40" />
                    <div className="h-16 w-[1px] bg-cyan-400/40" />
                  </div>

                  <div className="absolute right-4 top-4 sm:right-6 sm:top-6 lg:right-8 lg:top-8 z-30 flex items-center gap-4 text-right">
                    <div className="pointer-events-none text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.3em] text-cyan-400/60">{ui.deepSpaceScan}</div>
                    <button
                      type="button"
                      onClick={() => setLanguage(language === 'sv' ? 'en' : 'sv')}
                      className="pointer-events-auto cursor-pointer font-mono text-[10px] tracking-[0.28em] text-cyan-400/70 transition hover:text-cyan-400"
                    >
                      {language === 'sv' ? 'EN' : 'SV'}
                    </button>
                    <div className="pointer-events-none absolute right-0 top-8 h-[1px] w-16 bg-cyan-400/40" />
                    <div className="pointer-events-none absolute right-0 top-8 h-16 w-[1px] bg-cyan-400/40" />
                  </div>

                  {!activePlanetId ? (
                    <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 lg:bottom-8 lg:left-8 z-20 scale-75 origin-bottom-left sm:scale-100">
                      <div className="relative h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28 border border-cyan-400/30 bg-black/40 backdrop-blur-sm">
                        <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: '200px' }}>
                          <motion.div
                            className="absolute h-14 w-14 sm:h-[4.5rem] sm:w-[4.5rem] lg:h-20 lg:w-20 rounded-full border-2 border-cyan-400/25"
                            animate={{ rotateY: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                            style={{ transformStyle: 'preserve-3d' }}
                          />
                          <motion.div
                            className="absolute h-11 w-11 sm:h-14 sm:w-14 lg:h-16 lg:w-16 rounded-full border-2 border-purple-400/25"
                            animate={{ rotateX: 360 }}
                            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                            style={{ transformStyle: 'preserve-3d' }}
                          />
                          <motion.div
                            className="absolute h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 rounded-full border-2 border-orange-400/25"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                          />
                          <div className="absolute h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.8)]" />
                        </div>
                      </div>
                      <div className="mt-2 text-[8px] sm:text-[10px] tracking-[0.3em] text-cyan-400/60">{ui.navigation}</div>
                      <div className="text-[8px] sm:text-[10px] text-cyan-400/40">{ui.navSubtext}</div>
                    </div>
                  ) : (
                    <div className="pointer-events-none absolute bottom-4 left-4 sm:bottom-6 sm:left-6 lg:bottom-8 lg:left-8">
                      <div className="h-16 w-[1px] bg-cyan-400/40" />
                      <div className="h-[1px] w-16 bg-cyan-400/40" />
                      <div className="mt-2 text-xs tracking-[0.3em] text-cyan-400/60">{ui.navigation}</div>
                      <div className="text-xs text-cyan-400/40">{ui.navSubtext}</div>
                    </div>
                  )}

                  <div className="pointer-events-none absolute bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 scale-75 origin-bottom-right sm:scale-100">
                    <div className="absolute bottom-16 right-0 h-16 w-[1px] bg-cyan-400/40" />
                    <div className="absolute bottom-16 right-0 h-[1px] w-16 bg-cyan-400/40" />
                    <div className="relative h-32 w-32 border border-cyan-400/30 bg-black/40 backdrop-blur-sm">
                      <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/20" />
                      <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/20" />
                      <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/20" />
                      <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400" />
                      <div className="absolute left-1/2 top-1/2 h-[1px] w-12 origin-left -translate-y-1/2 bg-gradient-to-r from-cyan-400 to-transparent radar-spin" />
                      <div className="absolute left-[74%] top-[34%] h-2.5 w-2.5 rounded-full bg-fuchsia-400 animate-pulse" />
                      <div className="absolute left-[28%] top-[62%] h-2.5 w-2.5 rounded-full bg-sky-400 animate-pulse" />
                      <div className="absolute left-[62%] top-[72%] h-2.5 w-2.5 rounded-full bg-amber-400 animate-pulse" />
                      <div className="absolute left-[32%] top-[30%] h-2.5 w-2.5 rounded-full bg-green-400 animate-pulse" />
                    </div>
                    <div className="mt-2 text-center text-xs tracking-[0.3em] text-cyan-400/60">{ui.radar}</div>
                  </div>
                </>
              ) : null}

              {!introActive && !activePlanetId ? (
                <div className="pointer-events-none absolute left-1/2 top-8 z-20 -translate-x-1/2 hidden sm:block">
                  <div className="border border-cyan-400/30 bg-black/40 px-6 py-2 backdrop-blur-sm">
                    <div className="mb-1 text-center text-[10px] tracking-[0.3em] text-cyan-400/60">VELOCITY</div>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="font-mono text-lg text-cyan-400">0.0</div>
                        <div className="text-[10px] text-white/40">m/s</div>
                      </div>
                      <div className="h-8 w-px bg-cyan-400/30" />
                      <div className="text-center">
                        <div className="font-mono text-lg text-green-400">100</div>
                        <div className="text-[10px] text-white/40">%</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

              {!introActive && !activePlanetId ? (
                <div className="absolute bottom-6 left-1/2 lg:bottom-8 z-20 -translate-x-1/2 hidden sm:block">
                  <button
                    type="button"
                    onClick={() => setIntroDismissed(false)}
                    className="group relative transition duration-300 hover:scale-105 active:scale-95"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-cyan-400/20 blur-lg transition-all group-hover:blur-xl" />
                    <div className="relative border border-cyan-400/40 bg-black/50 px-10 py-3 backdrop-blur-sm transition-all group-hover:border-cyan-400/70 group-hover:bg-cyan-400/10">
                      <div className="flex items-center gap-3">
                        <span className="arrow-shift text-cyan-400">&larr;</span>
                        <span className="font-mono text-sm tracking-[0.3em] text-cyan-400">{ui.backToIntro}</span>
                      </div>
                    </div>
                    <div className="absolute left-0 top-0 h-2 w-2 border-l border-t border-cyan-400/60" />
                    <div className="absolute right-0 top-0 h-2 w-2 border-r border-t border-cyan-400/60" />
                    <div className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-cyan-400/60" />
                    <div className="absolute bottom-0 right-0 h-2 w-2 border-b border-r border-cyan-400/60" />
                  </button>
                </div>
              ) : null}

              {!introActive &&
                Object.entries(planetScreens).map(([planetId, screen]) => {
                const config = planetConfig.find((item) => item.id === planetId);
                if (!config || !screen || (activePlanetId && sceneMode !== 'return')) {
                  return null;
                }

                const labelText =
                  planetId === 'home' ? 'HOME' : planetId === 'projects' ? ui.projects : planetId === 'about' ? ui.about : planetId === 'skills' ? ui.skills : ui.contact;
                const labelTop = 'bottom-full mb-3';

                return (
                  <div
                    key={planetId}
                    className="absolute z-20"
                    style={{
                      left: screen.x,
                      top: screen.y,
                      width: Math.max(90, screen.radius * 2.4),
                      height: Math.max(90, screen.radius * 2.4),
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <button
                      onClick={() => openSection(planetId as PlanetId)}
                      onMouseEnter={() => setHoverPlanetId(planetId as PlanetId)}
                      onMouseLeave={() => setHoverPlanetId(null)}
                      className="group absolute inset-0 rounded-full bg-transparent outline-none transition duration-300 hover:scale-110"
                      aria-label={`Open ${config.name}`}
                    >
                      <span className="sr-only">{`Open ${config.name}`}</span>
                    </button>
                    {hoverPlanetId === planetId ? (() => {
                      const dist = Math.round(Math.sqrt((screen.x - viewportSize.width / 2) ** 2 + (screen.y - viewportSize.height / 2) ** 2));
                      const preview = planetId === 'projects' ? 'HRnytt \u00b7 Linnea \u00b7 DESMAL'
                        : planetId === 'about' ? 'Reaktion \u00b7 Frontend \u00b7 UX/UI'
                        : planetId === 'skills' ? 'React \u00b7 Figma \u00b7 Node.js'
                        : planetId === 'contact' ? 'Email \u00b7 LinkedIn \u00b7 GitHub'
                        : 'Social proof \u00b7 Backstory';
                      return (
                        <div className="pointer-events-none absolute inset-0">
                          {/* Rotating dashed orbital ring */}
                          <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1, rotate: 360 }}
                            transition={{ opacity: { duration: 0.3 }, scale: { duration: 0.3 }, rotate: { duration: 20, repeat: Infinity, ease: 'linear' } }}
                            className="absolute rounded-full border-2 border-dashed border-cyan-400/40"
                            style={{ inset: '-30%' }}
                          />
                          {/* 4 corner brackets */}
                          {[
                            { top: '-26%', left: '-26%', borderClass: 'border-l-2 border-t-2' },
                            { top: '-26%', right: '-26%', borderClass: 'border-r-2 border-t-2' },
                            { bottom: '-26%', left: '-26%', borderClass: 'border-l-2 border-b-2' },
                            { bottom: '-26%', right: '-26%', borderClass: 'border-r-2 border-b-2' },
                          ].map((pos, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.1 + i * 0.05 }}
                              className={`absolute h-4 w-4 ${pos.borderClass} border-cyan-400/70`}
                              style={{ top: pos.top, left: pos.left, right: (pos as any).right, bottom: (pos as any).bottom }}
                            />
                          ))}
                          {/* Info panel */}
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 }}
                            className="absolute left-1/2 -translate-x-1/2 w-48 sm:w-52"
                            style={{ top: 'calc(100% + 20px)' }}
                          >
                            <div className="border border-cyan-400/40 bg-black/90 px-5 py-4 backdrop-blur-md">
                              <div className="font-mono text-xs tracking-[0.2em] text-cyan-400 mb-3">
                                {config?.name}
                              </div>
                              <div className="flex items-center gap-4 text-[10px]">
                                <div>
                                  <div className="uppercase tracking-[0.2em] text-white/40">DISTANCE</div>
                                  <div className="font-mono text-cyan-400 mt-0.5">{dist}km</div>
                                </div>
                                <div className="h-6 w-px bg-cyan-400/30" />
                                <div>
                                  <div className="uppercase tracking-[0.2em] text-white/40">STATUS</div>
                                  <div className="font-mono text-green-400 mt-0.5">LOCKED</div>
                                </div>
                              </div>
                              <div className="mt-2.5 text-[10px] text-white/50">{preview}</div>
                              <motion.div
                                className="mt-2.5 text-center font-mono text-[10px] tracking-[0.2em] text-cyan-400"
                                animate={{ opacity: [0.4, 1, 0.4] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              >
                                ▸ CLICK TO ENGAGE ◂
                              </motion.div>
                            </div>
                          </motion.div>
                        </div>
                      );
                    })() : null}
                    <div className={'pointer-events-none absolute left-1/2 z-30 -translate-x-1/2 ' + labelTop}>
                      <div className="px-3 py-1.5">
                        <div className="whitespace-nowrap text-[8px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.28em] text-cyan-400/70">{labelText}</div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {activePlanetId && activePlacement ? (
                <div className={'absolute inset-0 z-30 transition-opacity duration-500 ' + (hologramVisible ? 'opacity-100' : 'opacity-0')}>
                  <div
                    onClick={closeSection}
                    aria-label="Close hologram"
                    className="absolute inset-0 z-10 h-full w-full bg-black/10"
                    style={{ pointerEvents: hologramVisible ? 'auto' : 'none' }}
                  />

                  <HologramConnector
                    startX={activePlacement.connectorStartX}
                    startY={activePlacement.connectorStartY}
                    endX={activePlacement.connectorEndX}
                    endY={activePlacement.connectorEndY}
                  />

                  <div
                    className={
                      'absolute inset-0 z-20 flex items-start md:items-center justify-start px-5 md:px-12 transition-all duration-700 ' +
                      (hologramVisible ? 'translate-x-0 opacity-100' : '-translate-x-24 opacity-0')
                    }
                    style={{ pointerEvents: hologramVisible ? 'auto' : 'none' }}
                    onClick={(event) => event.stopPropagation()}
                  >
                    <div
                      style={{
                        width: activePlacement.width,
                        maxHeight: activePlacement.height,
                        marginTop: activePlacement.top,
                      }}
                    >
                      <SectionPanel sectionId={activePlanetId} onClose={closeSection} visible={hologramVisible} />
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        {!introActive && !activePlanetId ? (
          <div className="flex justify-center py-4 sm:hidden">
            <button
              type="button"
              onClick={() => setIntroDismissed(false)}
              className="group relative transition duration-300 hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-cyan-400/20 blur-lg transition-all group-hover:blur-xl" />
              <div className="relative border border-cyan-400/40 bg-black/50 px-10 py-3 backdrop-blur-sm transition-all group-hover:border-cyan-400/70 group-hover:bg-cyan-400/10">
                <div className="flex items-center gap-3">
                  <span className="arrow-shift text-cyan-400">&larr;</span>
                  <span className="font-mono text-sm tracking-[0.3em] text-cyan-400">{ui.backToIntro}</span>
                </div>
              </div>
              <div className="absolute left-0 top-0 h-2 w-2 border-l border-t border-cyan-400/60" />
              <div className="absolute right-0 top-0 h-2 w-2 border-r border-t border-cyan-400/60" />
              <div className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-cyan-400/60" />
              <div className="absolute bottom-0 right-0 h-2 w-2 border-b border-r border-cyan-400/60" />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
