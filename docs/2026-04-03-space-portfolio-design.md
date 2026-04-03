# Karez Peshawa - Cinematic Space Portfolio

## Overview

A cinematic sci-fi portfolio website where the user begins inside a spaceship cockpit looking into the galaxy. Scrolling drives a camera journey through space, revealing planets. Each planet represents a portfolio section. Clicking a planet triggers a cinematic fly-in transition to that section's content.

**Approach**: Hybrid (Scroll + Click) — scrolling moves through the overview, clicking a planet triggers the cinematic deep dive.

## Key Decisions

- **Sections (3 planets)**: Projects, About, Contact
- **Language**: Bilingual (Swedish / English) with toggle
- **Stack**: Next.js + React Three Fiber + Tailwind CSS + Zustand
- **Rendering**: Full 3D via Three.js / React Three Fiber
- **Design reference**: Figma Make prototype — dark theme, cyan/teal accents, spaceship HUD aesthetic

---

## 1. Scene & Camera Architecture

### The 3D Scene

One continuous Three.js canvas (`<Canvas>` from React Three Fiber) filling the viewport. All 3D elements live inside this single canvas. HTML overlays are positioned absolutely on top.

### Camera Journey (Scroll-Driven)

| Scroll Range | Phase | What Happens |
|-------------|------------------|------------------------------------------------------------------------------|
| 0-10% | Cockpit View | Camera inside spaceship cockpit frame. HUD overlays visible. Name + title displayed as "destination" readout. Starfield through viewport. |
| 10-70% | Galaxy Panorama | Camera drifts forward into open space. Three planets become visible at different distances/angles. Info tooltips fade in as planets enter proximity. Telemetry bar updates. |
| 70-100% | Orbit Zone | Camera settles into position where all 3 planets are visible. Navigation hub — user can see everything and click to dive in. |

### Click-Driven Deep Dive

- Clicking any planet (wherever visible) triggers a cinematic fly-in
- Camera accelerates toward the planet with star-streak effect
- Camera decelerates as planet fills the view
- Transitions to a 2D content overlay (HTML) over the dimmed/blurred 3D scene
- "Return to space" button flies the camera back out
- Mini-map clicks also trigger the fly-in from anywhere

---

## 2. The Three Planets

### Planet 1: Projects (Closest, Largest)

- **Visual**: Blue-teal gas giant with animated cloud bands and faint ring system
- **Fly-in content**: Project cards in a grid — thumbnail, title, tech stack tags, links (live site / GitHub)
- **Initial content**: 2 production projects + practice work

### Planet 2: About (Medium Distance, Warm Tones)

- **Visual**: Rocky Mars-like planet with amber/orange surface glow
- **Fly-in content**: Bio, photo/avatar, skills as floating HUD elements (tech icons with proficiency), 7-month experience timeline
- **Contains**: The "welcome aboard" introductory text

### Planet 3: Contact (Furthest, Small and Bright)

- **Visual**: Small luminous planet, almost star-like, white/cyan glow
- **Fly-in content**: Contact form, email, LinkedIn/GitHub links
- **Minimal and clean** — glow draws attention despite small size

### Content Overlays

When flying into a planet, the 3D scene doesn't disappear. It blurs/dims behind a semi-transparent dark panel that slides in. The planet remains subtly visible and rotating in the background to maintain immersion.

---

## 3. HUD System & UI Overlays

All HUD elements are HTML/CSS overlaid on the canvas (not 3D-rendered). This keeps text crisp and accessible.

### Top Bar (Always Visible)

- **Left**: Green dot + "NAVIGATION ONLINE" / "SYSTEM STATUS: NOMINAL"
- **Right**: "DESTINATION: [current section]" / "DISTANCE: [value] LY"
- Updates dynamically with scroll progress and fly-in state

### Bottom Telemetry Bar (Always Visible)

| State | Velocity | Course | Integrity |
|-------------|----------|--------------|-----------|
| At rest | 0.0c | STABLE | 100% |
| Scrolling | 0.5c | [direction] | 100% |
| Fly-in | 2.5c | [planet name] | 100% |

Values animate in response to scroll speed and fly-in phase.

### Mini Solar System Nav (Bottom-Right)

- Small dot representation of 3 planets in orbital layout
- Current position indicator (pulsing dot)
- Click any planet to trigger fly-in
- "HOME" label returns to cockpit view

### Language Toggle

- "SV / EN" toggle in the top bar
- HUD labels stay in English (part of sci-fi aesthetic regardless of language)
- Content sections (bio, project descriptions, etc.) switch between Swedish and English

### "NAVIGATION SYSTEM ONLINE" Button

- Appears at cockpit view as the call-to-action
- Clicking smooth-scrolls to galaxy panorama, initiating the journey

---

## 4. Animation & Performance

### Starfield

- ~2000 instanced point sprites (single draw call)
- Parallax layers: near stars move faster than far stars
- During fly-in: stars elongate into streaks via custom shader (stretches geometry based on camera velocity)

### Planet Animations

- **Idle**: Slow rotation, subtle atmosphere glow (shader-based rim lighting)
- **Scroll proximity**: Gentle scale-up, glow intensifies
- **Fly-in sequence** (~2.5 seconds, 3 phases):
  1. **Accelerate (0-1s)**: Camera lunges forward, stars streak, HUD velocity spikes
  2. **Cruise (1-1.8s)**: Steady speed, planet grows rapidly
  3. **Decelerate (1.8-2.5s)**: Easing out, content overlay fades in, planet fills background
- **Fly-out** (~1.5s): Reverse — content fades, camera pulls back, stars un-streak

### Performance Strategy

- `@react-three/drei` for helpers (Stars, Float, Html, ScrollControls)
- Instanced meshes for starfield (single draw call)
- Simple sphere geometry for planets (no heavy 3D models)
- Minimal shaders: rim glow + star stretch only
- Content overlays are HTML (no 3D text rendering cost)
- Lazy-load project images only when flying into Projects planet
- **Target**: 60fps on mid-range hardware
- **Graceful degradation**: Reduce star count, disable star-streak on low-end

### Mobile

- Touch scroll works naturally with ScrollControls
- Fly-in triggered by tap on planet
- Mini-map slightly larger for touch targets
- Star count reduced to ~800

---

## 5. Project Structure

```text
karez-portfolio/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout, fonts, metadata
│   │   └── page.tsx            # Single page - mounts the experience
│   ├── components/
│   │   ├── canvas/             # 3D components (inside <Canvas>)
│   │   │   ├── SpaceScene.tsx  # Main scene orchestrator
│   │   │   ├── Starfield.tsx   # Instanced star particles
│   │   │   ├── Planet.tsx      # Reusable planet with glow shader
│   │   │   ├── CockpitFrame.tsx# Minimal viewport frame (subtle edge geometry, not a detailed model)
│   │   │   └── CameraRig.tsx   # Scroll-bound + fly-in camera
│   │   ├── hud/                # HTML overlays
│   │   │   ├── TopBar.tsx      # Navigation status
│   │   │   ├── Telemetry.tsx   # Bottom velocity/course bar
│   │   │   ├── MiniMap.tsx     # Planet nav (bottom-right)
│   │   │   └── LangToggle.tsx  # SV/EN switch
│   │   └── sections/           # Content overlays per planet
│   │       ├── Projects.tsx
│   │       ├── About.tsx
│   │       └── Contact.tsx
│   ├── hooks/
│   │   ├── useJourney.ts       # Scroll progress + fly-in state machine
│   │   └── useLanguage.ts      # i18n context (SV/EN)
│   ├── shaders/
│   │   ├── starStretch.glsl    # Velocity-based star elongation
│   │   └── planetGlow.glsl     # Rim lighting / atmosphere
│   ├── content/
│   │   ├── en.json             # English strings
│   │   └── sv.json             # Swedish strings
│   └── lib/
│       └── constants.ts        # Planet positions, scroll breakpoints, colors
├── public/
│   └── textures/               # Planet surface textures (small, optimized)
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

### Key Dependencies

- `next` — framework (App Router)
- `react`, `react-dom` — UI
- `three` — 3D engine
- `@react-three/fiber` — React renderer for Three.js
- `@react-three/drei` — helpers (Stars, Float, Html, ScrollControls)
- `tailwindcss` — styling
- `zustand` — lightweight state management

### State Management (Zustand)

```typescript
interface JourneyStore {
  scrollProgress: number
  activePlanet: 'projects' | 'about' | 'contact' | null
  flyInPhase: 'idle' | 'accelerate' | 'cruise' | 'decelerate' | 'landed'
  language: 'en' | 'sv'
}
```

---

## 6. Design Tokens (from Figma Reference)

### Colors

- **Background**: Deep space black (`#0a0a0f`)
- **Primary accent**: Cyan/teal (`#00f0ff`)
- **Secondary accent**: Green status (`#00ff66`)
- **Planet Projects**: Blue-teal (`#0088aa` to `#00ccee`)
- **Planet About**: Amber/orange (`#cc6600` to `#ff9933`)
- **Planet Contact**: White/cyan glow (`#ccffff` to `#ffffff`)
- **Text primary**: White (`#ffffff`)
- **Text secondary**: Muted gray (`#888899`)
- **HUD panel background**: Semi-transparent dark (`rgba(10, 10, 20, 0.85)`)

### Typography

- Monospace font for HUD elements (e.g., JetBrains Mono or Space Mono)
- Clean sans-serif for content sections (e.g., Inter)
- All-caps tracking for labels ("NAVIGATION ONLINE", "DESTINATION")

### HUD Panel Style

- Subtle cyan/teal border glow on content panels
- Dark semi-transparent backgrounds
- Rounded corners with sci-fi frame aesthetic
