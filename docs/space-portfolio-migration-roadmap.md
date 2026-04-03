# Space Portfolio Migration Roadmap

## Diagnosis
- The current repository is a Create React App portfolio in plain JavaScript with route-based pages and a conventional component tree.
- The target experience is a single cinematic Next.js App Router experience with:
  - one scene shell
  - one primary camera journey
  - one global interaction state
  - HTML overlays layered above a 3D world
- The current codebase has useful portfolio content and visual assets, but the architecture does not fit:
  - scroll-driven camera choreography
  - persistent HUD overlays
  - planet-based section navigation
  - bilingual content as a first-class system
  - React Three Fiber performance constraints
- The current translation setup is too flat for the target concept.
- The new `content/` files and `docs/2026-04-03-space-portfolio-design.md` are now the correct source of truth for the next experience.

## Proposed Migration Direction
- Migrate in slices rather than rewriting everything at once.
- Keep the existing CRA app intact while the future Next.js shell is scaffolded in parallel.
- First target architecture:
  - `src/app/` for App Router shell
  - `src/components/canvas/` for future R3F scene primitives
  - `src/components/hud/` for HTML overlays
  - `src/components/sections/` for content overlays
  - `src/stores/` for Zustand experience state
  - `src/lib/content/` for bilingual content access
  - `src/lib/space/` for constants and journey structure

## Recommended Phases
1. Scaffold the App Router shell, journey store, HUD shell, and section overlay contract.
2. Add the real Next.js + TypeScript toolchain and move the portfolio entrypoint to the new shell.
3. Replace the scene placeholder with a real R3F canvas and camera rig.
4. Implement one working planet flow end to end.
5. Add the remaining planets, content polish, and mobile/reduced-motion fallbacks.
6. Optimize frame budget and remove obsolete CRA-era code when the new experience is stable.

## First Scaffold Scope
- Included in this slice:
  - App Router layout and page shell
  - typed journey store
  - planet configuration
  - content access contract
  - HUD component shell
  - section overlay shell
  - scene placeholder that mirrors the future architecture
- Explicitly deferred:
  - real `<Canvas>` rendering
  - camera interpolation
  - shaders
  - post-processing
  - route cutover from CRA to Next.js

## Validation Expectations
- The scaffold should make the future architecture obvious.
- State ownership must be centralized in the journey store.
- HUD, scene, and content overlays must already be separated by responsibility.
- No attempt should be made to simulate full cinematic polish yet.
