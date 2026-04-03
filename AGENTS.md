# Portfolio Agent Guide

## Project Mission
- Build a premium cinematic portfolio that feels like a real interactive world, not a conventional personal site.
- The experience should combine technical credibility, visual authorship, narrative control, and product clarity.
- The portfolio should be memorable enough to stand apart from typical developer portfolios while still being understandable, fast, and shippable.

## Experience Vision
- The portfolio is a cinematic sci-fi web experience anchored by a spaceship cockpit, a navigable galaxy view, and planets that map to major sections.
- Core world structure:
  - cockpit intro
  - galaxy overview
  - Projects planet
  - About planet
  - Contact planet
- Camera motion, scroll progression, and planet interaction should feel deliberate and premium, not game-like chaos.
- HTML overlays should remain crisp, accessible, and fast while the 3D world provides atmosphere, depth, and narrative framing.
- The 3D layer supports the story. It must never make content harder to access.

## Product Positioning
- This is not a template portfolio, startup landing page, or experiment dump.
- It should communicate:
  - principal-level engineering judgment
  - product and UX maturity
  - cinematic creative technology capability
  - strong implementation standards
- Prefer a smaller number of strong ideas executed properly over a large number of effects.

## Target Stack
- Default technical target unless explicitly redirected:
  - Next.js App Router
  - TypeScript
  - React
  - Tailwind CSS
  - Three.js
  - `@react-three/fiber`
  - `@react-three/drei`
  - Zustand
  - optional Theatre.js only when sequencing complexity justifies it
- GLSL should be used selectively. Do not introduce shaders just to look advanced.

## Architectural Principles
- Separate world rendering, experience state, and content overlays clearly.
- Prefer a stable scene shell with modular feature slices:
  - `app/` routes and layout shell
  - `components/scene/` for R3F scene composition
  - `components/hud/` for HTML overlays and interface
  - `components/sections/` for route-level or overlay content
  - `stores/` for Zustand state
  - `lib/` for utilities, math helpers, camera logic, i18n helpers
- Keep camera choreography and global scene state centralized.
- Avoid mixing presentation copy, scene math, and interaction state in one component.
- Keep the HTML layer independently testable and understandable without the 3D layer.
- Build for progressive enhancement, not all-or-nothing immersion.

## Design Philosophy
- Aim for cinematic restraint rather than visual excess.
- The aesthetic should feel like premium sci-fi instrumentation:
  - precise
  - atmospheric
  - intelligent
  - calm under pressure
- Use darkness, depth, glows, lines, grids, telemetry, and framing devices with discipline.
- Favor composition, hierarchy, and rhythm over decoration.
- Typography and overlays must remain crisp and readable. Futuristic styling must not reduce comprehension.
- The interface should feel authored by a creative technology studio, not assembled from generic “cyberpunk” tropes.

## Motion Philosophy
- Motion is used to direct attention, reveal scale, and reinforce narrative progression.
- Scroll should feel like camera travel, not parallax clutter.
- Planet click interactions should feel intentional and cinematic, with clear arrival states.
- HUD transitions should support focus and context switching without flicker or noise.
- Use restrained timing curves and pacing. Avoid constant motion in the background.
- Motion must degrade gracefully:
  - reduced motion users get a stable, readable experience
  - mobile users get simplified choreography
  - low-power devices get lighter effects and fewer animated layers

## Scene Strategy
- The scene should have a clear experience map:
  - intro state
  - overview state
  - section focus states
  - transition states
- Every scene element should have a role:
  - navigation
  - atmosphere
  - depth cue
  - storytelling
  - interaction feedback
- Avoid adding ambient objects that do not improve composition, orientation, or immersion.
- Prefer fake complexity with cheap rendering techniques over real complexity with heavy runtime cost.

## Content Strategy
- Lead with signal, not autobiography.
- The cockpit/home sequence should quickly establish:
  - who this person is
  - the level they operate at
  - why this portfolio is different
  - what type of work they want
- Projects content should prioritize selected work over exhaustive archives.
- Case studies should explain:
  - problem framing
  - role and ownership
  - constraints
  - system decisions
  - design tradeoffs
  - technical tradeoffs
  - outcomes and learning
- Avoid vague self-branding and generic “passionate developer” copy.
- Copy should feel concise, confident, and proof-driven.

## Bilingual Strategy
- English and Swedish are first-class languages, not afterthought translations.
- Content architecture should support language switching without layout instability.
- Keep translation keys structured by section and intent rather than dumping large flat dictionaries.
- Maintain consistent meaning, tone, and hierarchy across languages. Do not let one language become more detailed or more polished than the other.
- Prefer source content that is concise enough to translate cleanly.
- UI labels, section headings, CTAs, and case study metadata must all be localized together.

## Performance Budgets
- Treat performance as part of the premium feel.
- Default expectations:
  - stable 60fps on capable desktop devices during core interactions
  - acceptable simplified experience on mid-range mobile devices
  - minimal layout shift in HTML overlays
  - only one primary WebGL canvas for the main experience
- Avoid expensive transparent overdraw, excessive post-processing, and heavy shader stacks.
- Use instancing, texture discipline, and render-budget awareness.
- Lazy-load non-critical 3D features and secondary content where reasonable.
- Do not ship multiple overlapping animation systems unless the benefit is clear.

## Accessibility Standards
- HTML overlays must remain semantic, keyboard accessible, and screen-reader understandable.
- The portfolio must still communicate core content without relying solely on 3D motion or visual spectacle.
- Respect `prefers-reduced-motion`.
- Keep focus states visible within the HUD aesthetic.
- Maintain usable contrast even when overlays sit above blurred or glowing backgrounds.
- Provide non-ambiguous controls for language switching, navigation, and contact actions.
- Avoid scroll traps, motion traps, and pointer-only interactions.

## SEO Standards
- The HTML layer must carry meaningful metadata, headings, and crawlable content.
- Each major section or route should have unique titles, descriptions, and structured content.
- Case studies should be indexable and understandable without the 3D layer.
- Prefer route and metadata structures that support future Open Graph, structured data, and sharable case study pages.

## Testing And Validation Expectations
- Validate at three levels whenever work is substantial:
  - implementation correctness
  - UX and interaction quality
  - performance and accessibility basics
- For major scene work, check:
  - camera transitions
  - overlay readability
  - interaction handoff between 3D and HTML
  - mobile and reduced-motion behavior
- Run available build and test commands when relevant.
- If full verification is not possible, explicitly state what was checked and what remains open.

## Mobile Degradation Strategy
- Mobile should preserve concept, not duplicate full desktop spectacle.
- Prioritize:
  - readable overlays
  - stable section navigation
  - simplified camera choreography
  - reduced particle counts and effects
  - faster scene entry
- It is acceptable for mobile to show a lighter world model, fewer animated elements, or partially flattened transitions if it improves reliability and readability.

## Maintainability Rules
- Cinematic quality must not depend on fragile one-off hacks.
- Prefer durable scene primitives, reusable state patterns, and explicit naming.
- Keep math-heavy logic isolated and documented when not self-evident.
- Avoid clever abstractions that make choreography harder to reason about.
- Add comments only where they clarify scene intent, camera behavior, or performance constraints.
- If a sequence requires complexity, structure it cleanly instead of hiding it in anonymous callbacks.

## Change Workflow
### 1. Diagnose First
- Inspect the relevant scene, UI, copy, and architecture before proposing changes.
- Identify whether the issue is about:
  - positioning
  - information hierarchy
  - world design
  - motion
  - accessibility
  - performance
  - maintainability
- Do not jump directly to effects or code.

### 2. Propose With Intent
- For meaningful tasks, present:
  - diagnosis
  - proposed direction
  - implementation plan
  - files to change
- Explain scene-to-content mapping and interaction rationale when relevant.

### 3. Implement In Slices
- Prefer high-leverage slices:
  - scene shell
  - camera system
  - overlay system
  - language system
  - one strong section
- Avoid rebuilding the entire experience at once unless explicitly requested.

### 4. Validate
- Check visual regressions, interaction regressions, route behavior, and content readability.
- Check reduced-motion and mobile fallbacks on any motion-heavy change.
- Check whether cinematic additions preserved clarity and maintainability.

## Default Behavior For This Repo
- Operate like a cross-functional creative technology lead, not a single-discipline implementer.
- Balance engineering rigor, motion direction, design taste, copy quality, and ship-readiness.
- Challenge weak concepts, generic sci-fi styling, and unnecessary technical complexity.
- Prefer cinematic originality with clear user orientation.
- Assume future work should progressively move this repository toward the target Next.js + TypeScript + R3F architecture unless the user redirects that plan.

## Anti-Patterns To Avoid
- generic cyberpunk gradients and neon overload
- noisy HUDs with no information hierarchy
- 3D scenes that exist only to be flashy
- scroll-jacking that fights reading
- camera motion that causes disorientation
- shipping unreadable overlays over busy backgrounds
- tying core content access to WebGL success
- large custom shader systems without clear need
- premature engine-like abstractions
- mixing scene state, copy, routing, and camera math in one file
- desktop-only ambition with no mobile degradation strategy
- cinematic polish that hides weak storytelling

## Balancing Cinematic Quality With Maintainability
- Start with clear content structure and interaction states before adding spectacle.
- Use HTML for meaning and WebGL for depth, atmosphere, and world-building.
- Keep effects additive. The experience should still work when expensive layers are removed.
- If a cinematic idea is difficult to implement cleanly, reduce scope before increasing complexity.
- Prefer one excellent transition over five average ones.

## Preferred Deliverable Shape For Medium And Large Tasks
- `Diagnosis`
- `Proposed Direction`
- `Implementation Plan`
- `Files To Change`
- `Code`
- `Validation`
- `Open Risks`
