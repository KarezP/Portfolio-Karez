# Portfolio System Playbook

## Purpose
This repository uses a persistent agent system to steer the portfolio toward a premium cinematic sci-fi experience that remains realistic to ship. The root `AGENTS.md` defines the repo-wide operating model. The local skills focus Codex on the right discipline for each class of problem.

## Skills

### `cinematic-portfolio-architect`
Use for overall experience direction.
Best for:
- scene-to-content mapping
- cockpit and galaxy structure
- route and section strategy
- homepage concepting
- implementation sequencing

### `r3f-performance-systems`
Use for 3D systems and render discipline.
Best for:
- React Three Fiber architecture
- camera systems
- scene state coordination
- post-processing decisions
- mobile fallbacks
- frame-budget work

### `sci-fi-ui-motion-director`
Use for overlays, transitions, and cinematic choreography.
Best for:
- HUD design
- overlay interaction
- motion timing
- scroll-to-focus behavior
- planet click transitions
- polish passes

### `portfolio-content-bilingual`
Use for all English and Swedish content decisions.
Best for:
- translation structure
- homepage copy
- About and Contact writing
- case study storytelling
- CTA refinement

### `senior-portfolio-architect`
Legacy premium portfolio strategy skill. Keep for non-cinematic portfolio tasks or when the user wants stronger portfolio thinking without the full sci-fi world framing.

## Recommended Order Of Work
1. Use `cinematic-portfolio-architect` to define the experience map, section logic, and build phases.
2. Use `r3f-performance-systems` to design the scene shell, camera rig, and state model before building many visuals.
3. Use `sci-fi-ui-motion-director` to shape the HUD language and transition choreography.
4. Use `portfolio-content-bilingual` to structure translation keys and write the first real content pass.
5. Revisit `r3f-performance-systems` for optimization once the experience is assembled.
6. Finish with `sci-fi-ui-motion-director` and `portfolio-content-bilingual` for final polish, pacing, and clarity.

## Prompt Examples

### Scene Architecture
`Use the cinematic-portfolio-architect and r3f-performance-systems skills. Design the high-level architecture for a cinematic portfolio with a cockpit intro, galaxy overview, and three planet sections for Projects, About, and Contact. Keep it realistic for Next.js App Router, TypeScript, Zustand, and React Three Fiber.`

### Homepage / Cockpit Build
`Use the cinematic-portfolio-architect and sci-fi-ui-motion-director skills. Design and implement the first pass of a cinematic cockpit homepage with strong hierarchy, premium HUD overlays, and a clear transition into the galaxy overview.`

### Planet Interaction System
`Use the r3f-performance-systems and sci-fi-ui-motion-director skills. Build a planet interaction system where scroll moves through the galaxy and clicking a planet triggers a controlled cinematic fly-in with clear arrival states and mobile-safe fallbacks.`

### HUD Overlay Design
`Use the sci-fi-ui-motion-director skill. Create a HUD design system for this portfolio with panel styles, nav treatment, telemetry-inspired labels, focused overlay transitions, and accessible contrast.`

### Performance Optimization
`Use the r3f-performance-systems skill. Audit the current 3D scene for frame-budget risks, overdraw, unnecessary per-frame work, and mobile bottlenecks. Then implement the highest-leverage optimizations without flattening the experience.`

### Bilingual Content Implementation
`Use the portfolio-content-bilingual skill. Create a maintainable Swedish and English content structure for the cinematic portfolio, including cockpit intro copy, section headings, CTA text, and translation key organization.`

### Case Study Writing
`Use the portfolio-content-bilingual skill. Write a bilingual case study structure for the Projects planet that explains problem, role, system decisions, visual choices, technical tradeoffs, and outcomes without generic portfolio language.`

### Final Polish Pass
`Use the sci-fi-ui-motion-director, r3f-performance-systems, and portfolio-content-bilingual skills. Perform a final polish pass on the portfolio experience with emphasis on timing, overlay clarity, accessibility, performance, and sharper bilingual copy.`

## Working Heuristics
- Build the content and interaction map before overbuilding the scene.
- Keep one primary camera system and one primary experience state model.
- Separate semantic HTML from decorative or atmospheric 3D.
- Prefer staged implementation:
  - shell
  - one strong transition
  - one strong section
  - optimization
  - polish
- Reduce scope before increasing technical complexity.

## Validation Expectations
- Every substantial change should report:
  - what was implemented
  - what was validated
  - what remains risky
- For scene-heavy tasks, always mention:
  - reduced-motion behavior
  - mobile fallback behavior
  - likely performance hotspots
