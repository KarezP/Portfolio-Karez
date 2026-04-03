# Portfolio Content System

## Purpose
This document defines the bilingual content system for the cinematic space portfolio. It translates the experience concept into a durable content model that future implementation can use in Next.js, TypeScript, and React Three Fiber.

## Diagnosis
- The current repository copy is split across a flat translation file and a conventional portfolio structure that does not match the cinematic space concept.
- The design document clearly separates HUD language from section content, but that rule was not yet encoded in the repo.
- The CV contains stronger proof points than the current portfolio, especially around Reaktion, bilingual delivery, design-to-code ownership, and live client work.
- The future portfolio needs shorter, more controlled copy blocks because overlays sit on top of an immersive 3D scene.

## Proposed Direction
- Keep HUD text in English at all times to preserve the spaceship system aesthetic.
- Switch all narrative content between English and Swedish:
  - cockpit intro
  - section headings
  - project descriptions
  - About narrative
  - Contact messaging
  - CTA copy outside strict HUD labels
- Use a nested translation structure by experience layer:
  - `meta`
  - `hud`
  - `cockpit`
  - `overview`
  - `planets.projects`
  - `planets.about`
  - `planets.contact`
  - `common`
- Keep overlay copy compact and proof-driven. One short paragraph is better than three average paragraphs.

## HUD Language Rules
These remain in English regardless of selected content language:
- `NAVIGATION ONLINE`
- `SYSTEM STATUS: NOMINAL`
- `DESTINATION`
- `DISTANCE`
- `VELOCITY`
- `COURSE`
- `INTEGRITY`
- `HOME`
- `PROJECTS`
- `ABOUT`
- `CONTACT`
- `RETURN TO SPACE`
- `SV / EN`

Rationale:
- These labels function as part of the interface fiction rather than normal page copy.
- Consistent English labels reduce visual churn and preserve orientation during transitions.

## Content Language Rules
These switch between Swedish and English:
- cockpit intro headline and supporting copy
- section intros and body text
- project summaries and case study text
- About narrative and timeline copy
- Contact invitation and response expectations
- CTA text when it acts as editorial content rather than system chrome

## Translation Key Structure
Recommended JSON shape:

```json
{
  "meta": {
    "siteTitle": "",
    "siteDescription": ""
  },
  "hud": {
    "statusOnline": "NAVIGATION ONLINE",
    "statusNominal": "SYSTEM STATUS: NOMINAL",
    "destination": "DESTINATION",
    "distance": "DISTANCE",
    "velocity": "VELOCITY",
    "course": "COURSE",
    "integrity": "INTEGRITY",
    "home": "HOME",
    "returnToSpace": "RETURN TO SPACE",
    "languageToggle": "SV / EN"
  },
  "cockpit": {
    "eyebrow": "",
    "title": "",
    "body": "",
    "primaryCta": "",
    "secondaryCta": ""
  },
  "overview": {
    "intro": "",
    "projectsLabel": "PROJECTS",
    "aboutLabel": "ABOUT",
    "contactLabel": "CONTACT"
  },
  "planets": {
    "projects": {
      "eyebrow": "",
      "title": "",
      "intro": "",
      "cards": []
    },
    "about": {
      "eyebrow": "",
      "title": "",
      "intro": "",
      "timelineHeading": "",
      "skillsHeading": ""
    },
    "contact": {
      "eyebrow": "",
      "title": "",
      "intro": "",
      "availability": "",
      "formHeading": ""
    }
  },
  "common": {
    "liveSite": "",
    "github": "",
    "linkedin": "",
    "email": ""
  }
}
```

## Copy Principles
- Write like a calm, high-end creative technology studio, not a résumé generator.
- Prefer specifics over adjectives.
- Let proof points do the selling:
  - 7-month internship
  - two live client sites
  - highest assessment from supervisor
  - design-to-code ownership
  - bilingual delivery
  - AI and workflow tooling introduced to team
- Keep overlays tight:
  - headline
  - one concise paragraph
  - optional short proof list or metadata row

## Section Writing Direction

### Cockpit
- Purpose: establish level, focus, and curiosity.
- Tone: cinematic but controlled.
- Content should answer:
  - who you are
  - what you build
  - why this portfolio is worth exploring

### Projects Planet
- Purpose: trust through selected work.
- Lead with shipped or client-facing work before practice projects.
- Each card should show:
  - project name
  - one-line value statement
  - stack tags
  - links

### About Planet
- Purpose: show judgment, trajectory, and how you work.
- Use the CV to ground the story in delivered outcomes.
- The 7-month Reaktion period is a strong spine for the narrative.

### Contact Planet
- Purpose: make reaching out feel easy, serious, and worth doing.
- Avoid desperate or generic “let’s connect” copy.
- Emphasize the kinds of roles, teams, or collaborations you want.

## Implementation Plan
1. Keep the design document inside the repo for future sessions.
2. Create bilingual content files with the recommended nested key structure.
3. Use the content files as the source of truth for future Next.js overlay components.
4. Refine the first content pass during real UI implementation once overlay space is confirmed.

## Files To Change
- `docs/2026-04-03-space-portfolio-design.md`
- `docs/portfolio-content-system.md`
- `content/portfolio.en.json`
- `content/portfolio.sv.json`

## Validation
- English and Swedish should carry the same meaning and confidence level.
- HUD keys should remain English in both files.
- Overlay copy should be short enough for cinematic layouts.
- Contact and About copy should reflect actual CV proof, not generic self-branding.

## Open Risks
- Project details may need another pass once the final project selection is locked.
- Swedish copy may need small idiomatic refinement after the real UI establishes line lengths.
