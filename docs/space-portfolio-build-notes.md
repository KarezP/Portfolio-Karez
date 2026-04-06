# Space Portfolio Build Notes

## Viktigaste regler

- Intro-sidan och galaxy-sidan är två olika lägen.
- Första sidan visar cockpit-intro med egen design.
- Galaxy-sidan visar planeter, stjärnfält och navigation.
- Behåll befintligt textinnehåll om inte annat uttryckligen efterfrågas.
- När design ändras ska fokus vara på design och animation, inte copy.
- Planeter ska kännas som fasta kroppar i rymden.
- Endast kameran ska resa mot vald planet.
- Hologram ska kännas som ett in-world lager, inte som en vanlig modal.
- Vid planetöppning ska vald planet helst ligga bredvid hologrammet, inte bakom eller under.
- Ändringar ska hållas små, reversibla och verifieras med build.

## Viktiga beslut

- Portfolion körs nu på Next.js App Router med TypeScript.
- `src/pages/_document.tsx` togs bort för att undvika konflikt mellan App Router och pages-lagret.
- En särskild introvy används innan användaren går in i galaxnavigeringen.
- Galaxy-sidan använder canvas för stjärnfält och planeter.
- Hologram-paneler använder samma innehåll som tidigare, men eget sci-fi/HUD-formspråk.
- Click-outside ska stänga hologrammet.
- Hologram ska kunna scrollas utan att panelhöjden behöver ökas.

## Genomförda ändringar

### Intro / första sidan

- Första sidan byggdes om till en mörk cockpit-introvy.
- Textinnehåll återställdes till önskad version medan designen behölls.
- Namn, stats och stat-labels skalades ner för bättre balans.

### Galaxy navigation

- Galaxy-sidan fick ny cockpit-HUD-design.
- Canvasen använder mörk rymdbakgrund och tätare stjärnfält.
- Planeterna ritades om med mer subtil glow, scan lines och orbital rings.
- Dekorativa kroppar som `HOME STATION` och `SKILL GALAXY` lades till i scenen.
- Planeterna gjordes mindre och djupare placerade i rymden.
- Planetplaceringar justerades för att undvika konflikt med radar och andra HUD-element.
- Planetnamn visas nu alltid direkt i scenen.
- Hover-popup med namn/beskrivning togs bort.
- `Back to intro` flyttades till mitten längst ner i viewporten.

### Hologram-paneler

- Hologram fick nytt formspråk enligt Figma-inspiration:
  - slide-in från vänster
  - cyan glow bakom panelen
  - black/80 + backdrop blur
  - corner brackets
  - CLOSE-knapp uppe till höger
- Click-outside för stängning lades tillbaka.
- Kamerafokus justerades så vald planet hamnar bredvid hologrammet.
- Hologrammets scrollbeteende förbättrades:
  - en enda riktig scroll-yta
  - mer bottenutrymme för sista raderna

## Felsökningar och tekniska fixar

- Flera `.next`-problem löstes genom att rensa stale build-state.
- `allowedDevOrigins` lades till i [next.config.ts](/Users/karez/Portfolio-Karez/next.config.ts) för stabilare dev-körning via nätverksadress.
- En sannolik canvas/dev-runtime-källa till fel reducerades genom att ta bort `roundRect` i star streak rendering.
- Favicon kopplades i App Router-layouten.

## Nuvarande resultat

- Första sidan fungerar som separat cockpit-intro.
- Galaxy-sidan visar en tydligare space-navigation med planeter som sektioner.
- Vald planet kan öppna ett hologram med nuvarande innehåll.
- Hologram går att stänga via `CLOSE` eller klick utanför.
- Hologram är scrollbart och bättre anpassat för längre innehåll.
- Planeter, HUD och hologram har nu ett mer enhetligt sci-fi-formspråk.

## Kända förbättringspunkter

- Hologram-scrollen kan fortfarande fintrimmas om sista rader känns för nära botten.
- Planeternas exakta komposition kan finjusteras ytterligare efter screenshots.
- Djupkänsla och cinematic travel kan förbättras vidare utan att ändra innehåll.
- Dev-läge kan fortfarande kräva `.next`-rensning efter större strukturändringar.

## Rekommenderat arbetsmönster framåt

1. Ändra en sak i taget: intro, galaxy, hologram eller kamera.
2. Behåll textinnehållet stabilt om fokus är visuell iteration.
3. Verifiera alltid med `npm run build`.
4. Vid konstiga dev-fel:
   - stoppa dev-servern
   - kör `rm -rf .next`
   - starta om med `npm run dev`
