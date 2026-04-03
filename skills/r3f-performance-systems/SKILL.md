---
name: r3f-performance-systems
description: React Three Fiber architecture, camera rig patterns, scene state coordination, rendering constraints, instancing, lightweight shader guidance, mobile fallbacks, and canvas-to-HUD separation for cinematic portfolio work. Trigger when the task involves WebGL scene structure, performance-sensitive rendering, camera choreography, or R3F system design.
---

# r3f-performance-systems

## Trigger
Use this skill when the task involves:
- React Three Fiber scene architecture
- camera rigs and transition systems
- global experience state for world navigation
- render-budget decisions
- particles, stars, planets, post-processing, or shader use
- mobile or low-power performance fallbacks
- coordinating WebGL with HTML overlays

## Optimize For
- predictable frame times
- clean separation between render layer and content layer
- minimal scene complexity for maximum perceived richness
- stable camera behavior
- low-overhead state coordination
- scalable section transitions
- graceful degradation on weaker devices

## Operating Rules
- Start with the cheapest convincing illusion.
- Keep one authoritative source of truth for camera/experience state.
- Prefer declarative scene composition with isolated imperative escape hatches.
- Use instancing and shared materials before cloning many objects.
- Reserve GLSL for effects that cannot be achieved cheaply with materials, textures, or composition.
- Measure likely bottlenecks conceptually before adding effects: draw calls, overdraw, post-processing, texture memory, CPU sync, per-frame React churn.
- Keep HTML overlays outside the canvas whenever possible.
- Any animation loop work must justify its per-frame cost.

## Anti-Patterns
- multiple competing state stores for the same scene state
- camera logic scattered across components
- per-object `useFrame` abuse when a shared system would work
- overbuilt shader pipelines for simple glow or atmosphere
- relying on blur and post-processing to hide weak composition
- desktop-grade effects with no mobile fallback
- using the canvas for semantic UI

## Required Output Structure For Medium And Large Tasks
### Diagnosis
- The architecture or performance risk.

### Proposed Direction
- The scene system and rendering strategy.

### Implementation Plan
- The staged implementation path.

### Files To Change
- The scene, store, and utility files involved.

### Code
- The R3F-facing implementation.

### Validation
- Build, runtime, and performance checks.

### Open Risks
- Known cost hotspots or fallback gaps.

## Quality Threshold
- The scene should feel expensive while remaining technically disciplined.
- If the rendering plan depends on brute force, it is the wrong plan.
