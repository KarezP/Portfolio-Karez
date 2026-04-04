'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';

const TAU = Math.PI * 2;
const STAR_COUNT = 480;
const WORLD_DEPTH = 240;
const STARFIELD_WIDTH = 4.4;
const STARFIELD_HEIGHT = 2.4;

const PANEL_POSITION = {
  projects: { justify: 'justify-end', panelShift: 'mr-2', width: 'max-w-[52rem]', panelWidth: 832 },
  about: { justify: 'justify-center', panelShift: '', width: 'max-w-[46rem]', panelWidth: 736 },
  contact: { justify: 'justify-start', panelShift: 'ml-2', width: 'max-w-[52rem]', panelWidth: 832 },
} as const;

type PlanetId = 'projects' | 'about' | 'contact';
type SceneMode = 'idle' | 'focus' | 'return';

type ProjectCard = {
  slug: string;
  title: string;
  summary: string;
  stack: string[];
  type: string;
};

type PlanetContent = {
  eyebrow: string;
  title: string;
  intro: string;
};

type PortfolioData = {
  planets: {
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

const portfolio: PortfolioData = {
  planets: {
    projects: {
      eyebrow: 'Utvalt arbete',
      title: 'Projekt som visar leveransförmåga, gränssnittsomdöme och teknisk bredd.',
      intro:
        'Urvalet fokuserar på arbete som visar verklig implementation, visuell disciplin och produkttänkande snarare än mängd.',
      cards: [
        {
          slug: 'hrnytt',
          title: 'HRnytt',
          summary:
            'Responsiv redesign av en svensk HR-nyhetsplattform, från koncept och Figma-system till frontendimplementation och lansering.',
          stack: ['HTML', 'CSS', 'Figma', 'Tillgänglighet'],
          type: 'Kundarbete',
        },
        {
          slug: 'linnea-medical',
          title: 'Linnea Medical Care',
          summary:
            'Tvåspråkig vårdwebbplats utformad för att förmedla tydlighet, förtroende och lugn samtidigt som praktiska tillgänglighetskrav möts.',
          stack: ['Frontend', 'UX/UI', 'Tvåspråkigt innehåll', 'WCAG'],
          type: 'Kundarbete',
        },
        {
          slug: 'questos',
          title: 'QuestOS',
          summary:
            'Produktdesignbidrag till en AI-driven karriärplattform, inklusive mascot-design, onboardingförbättring och förenklad navigation.',
          stack: ['Figma', 'UX-arkitektur', 'Produktdesign'],
          type: 'Produktbidrag',
        },
      ],
    },
    about: {
      eyebrow: 'Uppdragsprofil',
      title: 'Frontendutvecklare med stark designkänsla och tydlig vilja att leverera.',
      intro:
        'Jag gör just nu en 7 månader lång praktik på Reaktion där jag har levererat två live kundwebbplatser och arbetat med design, utveckling, tillgänglighet och samarbete i tvärfunktionella team.',
      body:
        'Mitt starkaste arbete finns mellan produktklarhet och frontendexekvering. Jag tycker om att omvandla otydliga behov till gränssnitt som känns strukturerade, lugna och redo för riktiga användare.',
      timelineHeading: 'Nylig riktning',
      timeline: [
        'Levererat live kundarbete på Reaktion från designriktning till produktionsfrontend.',
        'Byggt tvåspråkiga och tillgänglighetsmedvetna gränssnitt för verkliga organisationer.',
        'Bidragit med produkt- och visuellt tänk utöver ren implementation.',
      ],
      skillsHeading: 'Kärnstyrkor',
      skills: [
        'Frontendutveckling',
        'UX/UI-design',
        'Responsiva system',
        'Tillgänglighetsmedveten implementation',
        'Design-till-kod-flöde',
      ],
      factsHeading: 'Bevispunkter',
      facts: ['Byråmiljö med 25 personer', 'Samarbete i leveransteam om 6 personer', 'Två live kundlanseringar'],
    },
    contact: {
      eyebrow: 'Öppen kanal',
      title: 'Tillgänglig för ambitiösa team som värdesätter frontendkvalitet och designomdöme.',
      intro:
        'Jag söker möjligheter där jag kan bidra till gränssnittskvalitet, implementationsdetaljer och produkttänkande i samma arbete.',
      availability:
        'Just nu öppen för praktik och frontendroller på junior till mellan-nivå, särskilt i team där design och utveckling arbetar nära varandra.',
      formHeading: 'Inled samtalet',
      directLabel: 'Direktkontakt',
      responseNote:
        'Den bästa kontakten är konkret: team, roll, produkt och varför matchningen är relevant.',
      channels: [
        'Praktikmöjligheter med starkt frontend- och UX-ansvar',
        'Frontendroller på junior till mellan-nivå med nära designsamarbete',
        'Utvalda freelance- eller projektbaserade digitala produktuppdrag',
      ],
    },
  },
  contact: {
    email: 'karezpeshawa75@gmail.com',
    phone: '+46 70 752 8875',
    linkedinUrl: 'https://www.linkedin.com/in/karez-peshawa/',
    githubUrl: 'https://github.com/KarezP',
  },
  references: {
    quoteLabel: 'Handledarbedömning',
    quote:
      'Mycket nyfiken, engagerad och kapabel junior frontendutvecklare med starkt ansvarstagande för lärande och leverans.',
  },
};

const planetConfig: PlanetConfig[] = [
  {
    id: 'projects',
    name: 'PROJECT CLUSTER',
    description: 'Selected work and shipped delivery',
    colorA: '#e9d5ff',
    colorB: '#9333ea',
    glow: 'rgba(192,132,252,0.36)',
    baseRadius: 46,
    worldX: 435,
    worldY: -95,
    worldZ: -420,
    textureSeed: 2.2,
    spinSpeed: 0.34,
    axialTilt: -0.18,
    hologramTone: 'fuchsia',
  },
  {
    id: 'about',
    name: 'EXPERIENCE',
    description: 'Background, profile and trajectory',
    colorA: '#93c5fd',
    colorB: '#2563eb',
    glow: 'rgba(96,165,250,0.3)',
    baseRadius: 42,
    worldX: -430,
    worldY: 58,
    worldZ: -390,
    textureSeed: 4.6,
    spinSpeed: 0.26,
    axialTilt: 0.12,
    hologramTone: 'sky',
  },
  {
    id: 'contact',
    name: 'CONTACT BEACON',
    description: 'Open channel for direct contact',
    colorA: '#fde047',
    colorB: '#d97706',
    glow: 'rgba(251,191,36,0.32)',
    baseRadius: 40,
    worldX: 330,
    worldY: 165,
    worldZ: -455,
    textureSeed: 7.1,
    spinSpeed: 0.41,
    axialTilt: -0.1,
    hologramTone: 'amber',
  },
];

const decorativeBodies: DecorativeBody[] = [
  {
    id: 'home-station',
    name: 'HOME STATION',
    colorA: '#fb923c',
    colorB: '#9a3412',
    glow: 'rgba(251,146,60,0.36)',
    baseRadius: 54,
    worldX: 8,
    worldY: -8,
    worldZ: -360,
    textureSeed: 1.2,
    spinSpeed: 0.22,
    axialTilt: 0.08,
  },
  {
    id: 'skill-galaxy',
    name: 'SKILL GALAXY',
    colorA: '#6ee7b7',
    colorB: '#059669',
    glow: 'rgba(52,211,153,0.32)',
    baseRadius: 36,
    worldX: -420,
    worldY: -150,
    worldZ: -440,
    textureSeed: 5.4,
    spinSpeed: 0.3,
    axialTilt: -0.12,
  },
];

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
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
      size: Math.random() * 2,
      alpha: layer === 0 ? 0.95 : layer === 1 ? 0.72 : 0.44,
      layerDepth,
      twinkleSeed: Math.random() * 1000,
    };
  });
}

function projectPlanet(planet: PlanetConfig, camera: CameraState, w: number, h: number): PlanetScreen {
  const relZ = planet.worldZ - camera.z;
  const distanceFromCamera = Math.max(140, camera.z - planet.worldZ);
  const perspective = 560 / Math.max(280, distanceFromCamera + 176);

  return {
    x: w * 0.5 + (planet.worldX - camera.x) * perspective,
    y: h * 0.5 + (planet.worldY - camera.y) * perspective,
    radius: planet.baseRadius * perspective * 1.18,
    relZ,
  };
}

function getAnimatedPlanet(planet: PlanetConfig) {
  return { ...planet, hidden: false };
}

function getPanelPlacement(planetId: PlanetId, screen: PlanetScreen | undefined, viewport: ViewportSize) {
  const config = PANEL_POSITION[planetId];
  const panelWidth = Math.min(config.panelWidth, viewport.width < 768 ? viewport.width - 40 : 640);
  const panelHeight = viewport.width < 768 ? Math.min(520, viewport.height * 0.68) : Math.min(640, viewport.height - 120);
  const left = viewport.width < 768 ? 20 : 48;
  const top = Math.max(32, (viewport.height - panelHeight) * 0.5);
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
  spin = 0
) {
  if (screen.radius <= 0) {
    return;
  }

  ctx.save();
  ctx.translate(screen.x, screen.y);

  const glow = ctx.createRadialGradient(0, 0, screen.radius * 0.9, 0, 0, screen.radius * 1.4);
  glow.addColorStop(0, planet.glow.replace(/0\.\d+\)/, `${0.2 + arrivalGlow * 0.13})`));
  glow.addColorStop(0.5, planet.glow.replace(/0\.\d+\)/, '0.1)'));
  glow.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(0, 0, screen.radius * 1.4, 0, TAU);
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
      <div className="relative flex flex-col overflow-hidden border border-cyan-400/30 bg-black/80 p-8 backdrop-blur-xl" style={{ maxHeight: '72vh' }}>
        <div className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-cyan-400/60" />
        <div className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-cyan-400/60" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-cyan-400/60" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-cyan-400/60" />
        <div className={'pointer-events-none absolute left-8 right-8 top-0 h-px bg-gradient-to-r from-transparent via-current to-transparent ' + accent} />
        <div className="relative z-10 flex-1 overflow-y-auto overflow-x-hidden pr-2" style={{ paddingBottom: '3.5rem', scrollPaddingBottom: '3.5rem' }}>
          {children}
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
  if (!sectionId) {
    return null;
  }

  const tone = planetConfig.find((planet) => planet.id === sectionId)?.hologramTone || 'sky';
  const sectionLabelTone = tone === 'amber' ? 'text-amber-300/70' : tone === 'fuchsia' ? 'text-fuchsia-300/70' : 'text-cyan-400/60';
  const subheadingTone = tone === 'amber' ? 'text-amber-300' : tone === 'fuchsia' ? 'text-fuchsia-300' : 'text-cyan-400';
  const closeButton = (
    <button
      onClick={onClose}
      className="absolute right-4 top-4 border border-cyan-400/40 px-4 py-2 text-xs tracking-widest text-cyan-400 transition-colors hover:bg-cyan-400/10"
    >
      CLOSE
    </button>
  );

  if (sectionId === 'projects') {
    const section = portfolio.planets.projects;
    return (
      <HologramFrame tone={tone} visible={visible}>
        <div className="space-y-6 pb-12 text-white/70 leading-relaxed">
          {closeButton}
          <div className="pt-12">
            <div className={'mb-4 text-xs uppercase tracking-[0.3em] ' + sectionLabelTone}>{section.eyebrow}</div>
            <h2 className="mb-6 text-3xl font-thin tracking-wide text-white">{section.title}</h2>
            <p className="text-sm leading-7 text-white/70">{section.intro}</p>
          </div>
          <div className="grid max-h-[56vh] gap-4 overflow-auto pr-1">
            {section.cards.map((card) => (
              <div key={card.slug} className="border-l-2 border-cyan-400/40 pl-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg text-white">{card.title}</h3>
                  <span className="border border-cyan-400/20 px-2 py-0.5 text-[11px] text-cyan-400/60">
                    {card.type}
                  </span>
                </div>
                <p className="mt-2 text-sm text-white/60">{card.summary}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {card.stack.map((item) => (
                    <span key={item} className="text-xs text-cyan-400/60">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </HologramFrame>
    );
  }

  if (sectionId === 'about') {
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
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <div>
                <div className={'mb-3 text-sm tracking-wider ' + subheadingTone}>{section.skillsHeading}</div>
                <div className="flex flex-wrap gap-2 text-sm text-white/70">
                  {section.skills.map((item) => (
                    <span key={item}>• {item}</span>
                  ))}
                </div>
              </div>
              <div>
                <div className={'mb-3 text-sm tracking-wider ' + subheadingTone}>{section.factsHeading}</div>
                <ul className="space-y-2 text-sm text-white/70">
                  {section.facts.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="border-l-2 border-cyan-400/40 pl-4 text-sm text-white/70">
            <div className="font-medium">{portfolio.references.quoteLabel}</div>
            <p className="mt-2 leading-6">“{portfolio.references.quote}”</p>
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
              <div key={item}>• {item}</div>
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
  return (
    <div className="absolute inset-0 z-20 bg-[#0a0e1a]">
      <div className="pointer-events-none absolute inset-0 opacity-5 [background-image:repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(6,182,212,0.05)_2px,rgba(6,182,212,0.05)_4px)]" />

      <div className="pointer-events-none absolute left-5 top-5 h-4 w-4 border-l border-t border-cyan-400/60" />
      <div className="pointer-events-none absolute right-5 top-5 h-4 w-4 border-r border-t border-cyan-400/60" />
      <div className="pointer-events-none absolute bottom-5 left-5 h-4 w-4 border-b border-l border-cyan-400/60" />
      <div className="pointer-events-none absolute bottom-5 right-5 h-4 w-4 border-b border-r border-cyan-400/60" />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/70 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/70 to-transparent" />

      <div className="pointer-events-none absolute inset-x-8 top-6 flex items-center justify-between font-mono text-xs uppercase tracking-[0.3em] text-cyan-400/60">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-cyan-400 hud-pulse" />
          <span>Navigation online</span>
        </div>
        <div>Destination: Home Station</div>
      </div>

      <div className="pointer-events-none absolute inset-x-8 bottom-5 grid grid-cols-3 font-mono text-xs uppercase tracking-widest text-cyan-400/40">
        <div>System status: nominal</div>
        <div className="text-center">Focus</div>
        <div className="text-right">Distance: 0 LY</div>
      </div>

      <div className="pointer-events-auto relative z-10 mx-auto grid h-full w-full max-w-7xl grid-cols-1 items-center gap-8 px-8 py-24 lg:grid-cols-3">
        <div className="flex justify-center lg:justify-end">
          <div className="relative">
            <HologramPlanet />
          </div>
        </div>

        <div className="text-center lg:text-left">
          <div className="flex items-center justify-center gap-3 lg:justify-start">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-cyan-400/40" />
            <span className="font-mono text-xs tracking-[0.4em] text-cyan-400/60">
              FRONT-END DEVELOPER &amp; UX/UI DESIGNER
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-cyan-400/40" />
          </div>

          <div className="relative mb-6 mt-6">
            <h1 className="relative z-10 text-4xl font-thin tracking-[0.16em] text-white lg:text-6xl">
              KAREZ PESHAWA
            </h1>
            <div className="absolute inset-0 text-4xl font-thin tracking-[0.16em] text-cyan-400/20 blur-sm lg:text-6xl">
              KAREZ PESHAWA
            </div>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-cyan-400/10 to-cyan-500/5 blur-xl" />
              <p className="relative mx-auto max-w-xl text-base leading-relaxed text-white/80 lg:mx-0 lg:text-lg">
                Välkommen ombord. Jag designar, bygger och levererar digitala upplevelser från Figma-wireframes genom utveckling till produktion.
              </p>
          </div>

          <div className="flex items-center justify-center gap-6 lg:justify-start">
            <div className="text-center">
              <div className="mb-1 text-[1.8rem] font-light leading-none text-cyan-400">7 mån</div>
              <div className="text-[10px] tracking-[0.18em] text-white/40">PRAKTIK REAKTION</div>
            </div>

            <div className="h-10 w-px bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent" />

            <div className="text-center">
              <div className="mb-1 text-[1.8rem] font-light leading-none text-cyan-400">2 live</div>
              <div className="text-[10px] tracking-[0.18em] text-white/40">KUNDSAJTER SHIPADE</div>
            </div>

            <div className="h-10 w-px bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent" />

            <div className="text-center">
              <div className="mb-1 text-[1.8rem] font-light leading-none text-cyan-400">A+</div>
              <div className="text-[10px] tracking-[0.18em] text-white/40">HANDLEDARBEDÖMNING</div>
            </div>
          </div>

          <div className="mt-10 flex justify-center lg:justify-start">
            <button
              type="button"
              onClick={onBegin}
              className="pointer-events-auto group relative transition duration-300 hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-cyan-400/20 blur-lg transition-all group-hover:blur-xl" />
              <div className="relative border border-cyan-400/40 bg-black/50 px-10 py-3 backdrop-blur-sm transition-all group-hover:border-cyan-400/70 group-hover:bg-cyan-400/10">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm tracking-[0.3em] text-cyan-400">BEGIN NAVIGATION</span>
                  <span className="arrow-shift text-cyan-400">→</span>
                </div>
              </div>
              <div className="absolute left-0 top-0 h-2 w-2 border-l border-t border-cyan-400/60" />
              <div className="absolute right-0 top-0 h-2 w-2 border-r border-t border-cyan-400/60" />
              <div className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-cyan-400/60" />
              <div className="absolute bottom-0 right-0 h-2 w-2 border-b border-r border-cyan-400/60" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent opacity-0 blur-md transition-opacity group-hover:opacity-100" />
            <div className="relative border border-cyan-400/20 bg-black/30 p-5 backdrop-blur-sm transition-colors group-hover:border-cyan-400/40">
              <div className="mb-3 flex items-center gap-2">
                <div className="h-3 w-1 bg-cyan-400" />
                <h3 className="font-mono text-xs tracking-[0.3em] text-cyan-400/80">PROOF SIGNAL</h3>
              </div>
              <p className="text-sm leading-relaxed text-white/60">
                Mycket nyfiken, engagerad och kapabel frontendutvecklare med starkt ansvarstagande för lärande och leverans.
              </p>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent opacity-0 blur-md transition-opacity group-hover:opacity-100" />
            <div className="relative border border-cyan-400/20 bg-black/30 p-5 backdrop-blur-sm transition-colors group-hover:border-cyan-400/40">
              <div className="mb-3 flex items-center gap-2">
                <div className="h-3 w-1 bg-purple-400" />
                <h3 className="font-mono text-xs tracking-[0.3em] text-cyan-400/80">NAVIGATION NOTE</h3>
              </div>
              <p className="text-sm leading-relaxed text-white/60">
                Planeterna i rymden håller sektionerna i portfolion. Välj en destination för att resa dit och öppna dess holografiska informationslager.
              </p>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-transparent opacity-0 blur-md transition-opacity group-hover:opacity-100" />
            <div className="relative border border-cyan-400/20 bg-black/30 p-5 backdrop-blur-sm transition-colors group-hover:border-cyan-400/40">
              <div className="mb-3 flex items-center gap-2">
                <div className="h-3 w-1 bg-orange-400" />
                <h3 className="font-mono text-xs tracking-[0.3em] text-cyan-400/80">CURRENT MODE</h3>
              </div>
              <p className="font-mono text-sm uppercase tracking-[0.28em] text-white/74">BRIDGE BRIEFING ACTIVE</p>
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
  const [activePlanetId, setActivePlanetId] = useState<PlanetId | null>(null);
  const [hoverPlanetId, setHoverPlanetId] = useState<PlanetId | null>(null);
  const [planetScreens, setPlanetScreens] = useState<Record<string, PlanetScreen>>({});
  const [hologramVisible, setHologramVisible] = useState(false);
  const [sceneMode, setSceneMode] = useState<SceneMode>('idle');
  const [viewportSize, setViewportSize] = useState<ViewportSize>({ width: 1280, height: 820 });
  const [introDismissed, setIntroDismissed] = useState(false);
  const activePlanetIdRef = useRef<PlanetId | null>(null);
  const hoverPlanetIdRef = useRef<PlanetId | null>(null);
  const introActive = !activePlanetId && sceneMode === 'idle' && !introDismissed;

  useEffect(() => {
    activePlanetIdRef.current = activePlanetId;
  }, [activePlanetId]);

  useEffect(() => {
    hoverPlanetIdRef.current = hoverPlanetId;
  }, [hoverPlanetId]);

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
      flightDuration: 4.2,
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
          const swayX = Math.sin(state.time * 0.86) * 2.2 * (1 - t * 0.36);
          const swayY = Math.cos(state.time * 0.62) * 1.4 * (1 - t * 0.32);
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

      for (const star of stars) {
        star.z -= dt * (8 + state.speed * star.layerDepth);
        if (star.z < 1) {
          star.z += WORLD_DEPTH;
        }

        const depth = clamp(1 - star.z / WORLD_DEPTH, 0.05, 1);
        const perspective = 1.2 / Math.max(0.25, star.z / WORLD_DEPTH + 0.08);
        const sx = width * 0.5 + (star.x * width * 0.52 - state.camera.x * star.layerDepth * 14) * perspective;
        const sy = height * 0.5 + (star.y * height * 0.5 - state.camera.y * star.layerDepth * 14) * perspective;

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

        const wrappedSx = width * 0.5 + (star.x * width * 0.52 - state.camera.x * star.layerDepth * 14) * perspective;
        const wrappedSy = height * 0.5 + (star.y * height * 0.5 - state.camera.y * star.layerDepth * 14) * perspective;
        if (wrappedSx < -140 || wrappedSx > width + 140 || wrappedSy < -120 || wrappedSy > height + 120) {
          continue;
        }

        const streak = state.speedNorm * 42 * star.layerDepth * depth;
        const radius = Math.max(0.4, star.size * (0.7 + depth));
        const twinkle = Math.sin(state.time * 2 + star.twinkleSeed + star.x) * 0.5 + 0.5;
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
        drawPlanet(ctx, planet, screen, highlight, arrivalGlow, spin);

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

          <div className="min-h-[78vh] p-4 lg:p-5">
            <div ref={containerRef} className="relative min-h-[78vh] overflow-hidden rounded-[28px] border border-white/10 bg-black/60 shadow-2xl shadow-sky-950/20">
              {!introActive ? <canvas ref={canvasRef} className="block h-full min-h-[78vh] w-full" /> : null}

              {introActive ? (
                <CaptainIntro onBegin={() => setIntroDismissed(true)} />
              ) : null}

              {!introActive ? (
                <>
                  <div className="pointer-events-none absolute inset-0 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(6, 182, 212, 0.05) 2px, rgba(6, 182, 212, 0.05) 4px)' }} />

                  <div className="pointer-events-none absolute left-8 top-8">
                    <div className="text-xs tracking-[0.3em] text-cyan-400/60">GALAXY OVERVIEW</div>
                    <div className="h-[1px] w-16 bg-cyan-400/40" />
                    <div className="h-16 w-[1px] bg-cyan-400/40" />
                  </div>

                  <div className="pointer-events-none absolute right-8 top-8 text-right">
                    <div className="text-xs tracking-[0.3em] text-cyan-400/60">DEEP SPACE SCAN</div>
                    <div className="absolute right-0 top-8 h-[1px] w-16 bg-cyan-400/40" />
                    <div className="absolute right-0 top-8 h-16 w-[1px] bg-cyan-400/40" />
                  </div>

                  <div className="pointer-events-none absolute bottom-8 left-8">
                    <div className="h-16 w-[1px] bg-cyan-400/40" />
                    <div className="h-[1px] w-16 bg-cyan-400/40" />
                    <div className="mt-2 text-xs tracking-[0.3em] text-cyan-400/60">NAVIGATION</div>
                    <div className="text-xs text-cyan-400/40">Moving into parallel paths</div>
                  </div>

                  <div className="pointer-events-none absolute bottom-8 right-8">
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
                    </div>
                    <div className="mt-2 text-center text-xs tracking-[0.3em] text-cyan-400/60">RADAR</div>
                  </div>
                </>
              ) : null}

              {!introActive && !activePlanetId ? (
                <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2">
                  <button
                    type="button"
                    onClick={() => setIntroDismissed(false)}
                    className="rounded-full border border-cyan-300/20 bg-slate-950/55 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-200/80 backdrop-blur-sm transition hover:border-cyan-300/40 hover:bg-cyan-400/10"
                  >
                    Back to intro
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
                  planetId === 'projects' ? 'PROJECTS' : planetId === 'about' ? 'ABOUT' : 'CONTACT';
                const labelTop = screen.y < viewportSize.height * 0.3 ? 'top-full mt-3' : 'bottom-full mb-3';

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
                    <div className={'pointer-events-none absolute left-1/2 z-30 -translate-x-1/2 ' + labelTop}>
                      <div className="rounded-full border border-cyan-400/20 bg-black/45 px-3 py-1.5 backdrop-blur-sm">
                        <div className="text-[10px] tracking-[0.28em] text-cyan-400/70">{labelText}</div>
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
                      'absolute inset-0 z-20 flex items-center justify-start px-5 md:px-12 transition-all duration-700 ' +
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
      </div>
    </div>
  );
}
