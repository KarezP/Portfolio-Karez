export type ShellLang = 'en' | 'sv';

export type UILabels = {
  close: string;
  liveSite: string;
  siteScan: string;
  visitLink: string;
  backToProjects: string;
  beginNav: string;
  proofSignal: string;
  navGuide: string;
  currentMode: string;
  bridgeBriefing: string;
  navOnline: string;
  destination: string;
  systemStatus: string;
  focus: string;
  distance: string;
  role: string;
  duration: string;
  highlights: string;
  tech: string;
  title: string;
  galaxyOverview: string;
  deepSpaceScan: string;
  navigation: string;
  navSubtext: string;
  radar: string;
  backToIntro: string;
  projects: string;
  about: string;
  contact: string;
  skills: string;
  introWelcome: string;
  introProof: string;
  introNavNote: string;
  statInternship: string;
  statInternshipLabel: string;
  statSites: string;
  statSitesLabel: string;
  statGrade: string;
  statGradeLabel: string;
};

const uiEN: UILabels = {
  close: 'CLOSE',
  liveSite: 'LIVE SITE',
  siteScan: 'SITE SCAN',
  visitLink: 'Live ↗',
  backToProjects: 'BACK TO PROJECTS',
  beginNav: 'BEGIN NAVIGATION',
  proofSignal: 'PROOF SIGNAL',
  navGuide: 'NAVIGATION NOTE',
  currentMode: 'CURRENT MODE',
  bridgeBriefing: 'BRIDGE BRIEFING ACTIVE',
  navOnline: 'Navigation online',
  destination: 'Destination: Home Station',
  systemStatus: 'System status: nominal',
  focus: 'Focus',
  distance: 'Distance: 0 LY',
  role: 'ROLE',
  duration: 'DURATION',
  highlights: 'KEY DELIVERABLES',
  tech: 'TECHNOLOGY',
  title: 'FRONTEND DEVELOPER & UX/UI DESIGNER',
  galaxyOverview: 'GALAXY OVERVIEW',
  deepSpaceScan: 'DEEP SPACE SCAN',
  navigation: 'NAVIGATION',
  navSubtext: 'Moving into parallel paths',
  radar: 'RADAR',
  backToIntro: 'Back to intro',
  projects: 'PROJECTS',
  about: 'ABOUT',
  contact: 'CONTACT',
  skills: 'SKILLS',
  introWelcome: 'Welcome aboard. I design, build, and deliver digital experiences from Figma wireframes through development to production.',
  introProof: 'Very curious, engaged, and capable junior frontend developer with strong responsibility for learning and delivery.',
  introNavNote: 'The planets in space hold the sections of the portfolio. Choose a destination to travel there and open its holographic information layer.',
  statInternship: '5 mo',
  statInternshipLabel: 'INTERNSHIP REAKTION',
  statSites: '2 live',
  statSitesLabel: 'CLIENT SITES SHIPPED',
  statGrade: 'A+',
  statGradeLabel: 'SUPERVISOR ASSESSMENT',
};

const uiSV: UILabels = {
  close: 'STÄNG',
  liveSite: 'LIVE SIDA',
  siteScan: 'WEBBSKANNING',
  visitLink: 'Besök ↗',
  backToProjects: 'TILLBAKA TILL PROJEKT',
  beginNav: 'STARTA NAVIGERING',
  proofSignal: 'BEVIS SIGNAL',
  navGuide: 'NAVIGERINGSGUIDE',
  currentMode: 'AKTUELLT LÄGE',
  bridgeBriefing: 'BRYGGBRIEFING AKTIV',
  navOnline: 'Navigering online',
  destination: 'Destination: Hemstation',
  systemStatus: 'Systemstatus: nominal',
  focus: 'Fokus',
  distance: 'Avstånd: 0 LY',
  role: 'ROLL',
  duration: 'PERIOD',
  highlights: 'NYCKELLEVERANSER',
  tech: 'TEKNOLOGI',
  title: 'FRONTENDUTVECKLARE & UX/UI DESIGNER',
  galaxyOverview: 'GALAXÖVERSIKT',
  deepSpaceScan: 'DJUPRYMDSSCANNING',
  navigation: 'NAVIGERING',
  navSubtext: 'Parallella banor aktiva',
  radar: 'RADAR',
  backToIntro: 'Tillbaka till intro',
  projects: 'PROJEKT',
  about: 'OM MIG',
  contact: 'KONTAKT',
  skills: 'FÄRDIGHETER',
  introWelcome: 'Välkommen ombord. Jag designar, bygger och levererar digitala upplevelser från Figma-wireframes genom utveckling till produktion.',
  introProof: 'Mycket nyfiken, engagerad och kapabel frontendutvecklare med starkt ansvarstagande för lärande och leverans.',
  introNavNote: 'Planeterna i rymden håller sektionerna i portfolion. Välj en destination för att resa dit och öppna dess holografiska informationslager.',
  statInternship: '5 mån',
  statInternshipLabel: 'PRAKTIK REAKTION',
  statSites: '2 live',
  statSitesLabel: 'KUNDSAJTER LEVERERADE',
  statGrade: 'A+',
  statGradeLabel: 'HANDLEDARBEDÖMNING',
};

export function getUI(lang: ShellLang): UILabels {
  return lang === 'sv' ? uiSV : uiEN;
}

/* ── Portfolio content ─────────────────────────────── */

const sharedCards = {
  hrnytt: { slug: 'hrnytt', title: 'HRnytt', liveUrl: 'https://hrnytt.se', screenshotUrl: '/projects/hrnytt.png' },
  linnea: { slug: 'linnea-medical', title: 'Linnea Medical Care', liveUrl: 'https://www.linnemedical.se/', screenshotUrl: '/projects/linnea-medical.png' },
  questos: { slug: 'questos', title: 'QuestOS' },
  desmal: { slug: 'desmal', title: 'DESMAL', liveUrl: 'https://mellifluous-donut-47403b.netlify.app/', screenshotUrl: '/projects/desmal.png' },
  snabbsnack: { slug: 'snabbsnack', title: 'SnabbSnack' },
  nandin: { slug: 'nandin', title: 'NANDIN', liveUrl: 'https://gleeful-liger-216a6b.netlify.app/', screenshotUrl: '/projects/nandin.png' },
  suntrip: { slug: 'suntrip', title: 'SUNTRIP', liveUrl: 'https://www.figma.com/proto/tbrqAhCCuxietNhI1FlFr6/SunTrips?node-id=159-338', screenshotUrl: '/projects/suntrip.png' },
  weather: { slug: 'weather-app', title: 'Weather App', liveUrl: 'https://jovial-smakager-1f9157.netlify.app/', screenshotUrl: '/projects/weather.png' },
  todo: { slug: 'todo-app', title: 'To-Do & To-Buy', liveUrl: 'https://comfy-gumdrop-c0f696.netlify.app/', screenshotUrl: '/projects/todo.png' },
  quiz: { slug: 'quiz-game', title: 'Quiz Game', liveUrl: 'https://verdant-gingersnap-51bad0.netlify.app/', screenshotUrl: '/projects/quiz.png' },
  karezai: { slug: 'karezai', title: 'KarezAI', liveUrl: 'https://github.com/KarezP/karezai' },
} as const;

const contactInfo = {
  email: 'karezpeshawa75@gmail.com',
  phone: '+46 70 752 8875',
  linkedinUrl: 'https://www.linkedin.com/in/karez-peshawa/',
  githubUrl: 'https://github.com/KarezP',
};

const skillCategories = {
  en: [
    { label: 'Frontend', items: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS', 'Vite'] },
    { label: 'Backend', items: ['Node.js', 'Express', 'MySQL', 'Python'] },
    { label: 'Design & UX', items: ['Figma', 'Wireframing', 'Responsive Design', 'WCAG/Accessibility'] },
    { label: 'Platforms & CMS', items: ['Webflow', 'Netlify', 'localStorage'] },
    { label: 'Tools & Workflow', items: ['Git', 'GitHub', 'VS Code', 'Claude Code'] },
    { label: 'AI-Driven Development', items: ['Claude Code', 'OpenAI Codex CLI', 'ChatGPT', 'Vercel AI', 'Figma AI (Make Design)', 'AI-assisted code review & debugging'] },
  ],
  sv: [
    { label: 'Frontend', items: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS', 'Vite'] },
    { label: 'Backend', items: ['Node.js', 'Express', 'MySQL', 'Python'] },
    { label: 'Design & UX', items: ['Figma', 'Wireframing', 'Responsiv design', 'WCAG/Tillgänglighet'] },
    { label: 'Plattformar & CMS', items: ['Webflow', 'Netlify', 'localStorage'] },
    { label: 'Verktyg & Workflow', items: ['Git', 'GitHub', 'VS Code', 'Claude Code'] },
    { label: 'AI-driven utveckling', items: ['Claude Code', 'OpenAI Codex CLI', 'ChatGPT', 'Vercel AI', 'Figma AI (Make Design)', 'AI-stödd kodgranskning & felsökning'] },
  ],
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildPortfolio(lang: ShellLang): any {
  const en = lang === 'en';
  return {
    planets: {
      home: {
        eyebrow: en ? 'Who is this person?' : 'Vem ligger bakom spakarna?',
        title: 'Karez Peshawa',
        intro: en ? 'Frontend Developer & UX/UI Designer' : 'Frontendutvecklare & UX/UI Designer',
        pitch: en
          ? 'Frontend developer who bridges design thinking and technical execution \u2014 from Figma concepts to production-ready code. I build interfaces that don\u2019t just work, but genuinely make the experience better.'
          : 'Frontendutvecklare som bygger bryggan mellan designt\u00e4nk och teknisk exekvering \u2014 fr\u00e5n Figma-koncept till produktionsklar kod. Jag bygger gr\u00e4nssnitt som inte bara fungerar, utan verkligen g\u00f6r upplevelsen b\u00e4ttre.',
        externalProof: {
          heading: en ? 'External validation' : 'Extern validering',
          reaktionQuote: en
            ? 'Reaktion, one of the Nordics\u2019 leading agencies, called Karez their "design-savvy intern" \u2014 highlighting his ability to simplify and realize user needs.'
            : 'Reaktion, en av Nordens ledande byr\u00e5er, kallade Karez sin "designvassa praktikant" \u2014 och lyfte hans f\u00f6rm\u00e5ga att f\u00f6renkla och f\u00f6rverkliga anv\u00e4ndarnas behov.',
          reaktionUrl: 'https://reaktion.se/blogg/mot-karez-var-designvassa-praktikant/',
          reaktionLabel: en ? 'Read the full article at Reaktion.se' : 'L\u00e4s hela artikeln p\u00e5 Reaktion.se',
          supervisorHeading: en ? 'Supervisor assessment' : 'Handledarbed\u00f6mning',
          supervisorQuote: en
            ? 'Very curious, engaged, and capable junior frontend developer with strong responsibility for learning and delivery.'
            : 'Mycket nyfiken, engagerad och kapabel junior frontendutvecklare med starkt ansvarstagande f\u00f6r l\u00e4rande och leverans.',
        },
        backstory: {
          heading: en ? 'The path here' : 'V\u00e4gen hit',
          items: en
            ? [
                'Discovered digital creation through Photoshop at age 12',
                'Theater background \u2014 writing and acting built creativity and courage',
                'Political science degree + worked at the Speaker\u2019s office in Kurdistan\u2019s parliament',
                'Moved to Sweden and found frontend development as the true calling',
              ]
            : [
                'Uppt\u00e4ckte digitalt skapande genom Photoshop vid 12 \u00e5rs \u00e5lder',
                'Teaterbakgrund \u2014 manusskrivande och sk\u00e5despel byggde kreativitet och mod',
                'Statsvetenskaplig examen + arbete p\u00e5 Talmannens kontor i Kurdistans parlament',
                'Flyttade till Sverige och hittade sitt kall inom frontendutveckling',
              ],
        },
        cta: {
          heading: en ? 'Available now' : 'Tillg\u00e4nglig nu',
          text: en
            ? 'Looking for frontend and design roles where quality, execution, and product thinking matter.'
            : 'S\u00f6ker frontend- och designroller d\u00e4r kvalitet, exekvering och produktt\u00e4nk spelar roll.',
        },
        stats: en
          ? [{ value: '5 mo', label: 'Internship Reaktion' }, { value: '2 live', label: 'Client sites shipped' }, { value: 'A+', label: 'Supervisor grade' }]
          : [{ value: '5 m\u00e5n', label: 'Praktik Reaktion' }, { value: '2 live', label: 'Kundsajter levererade' }, { value: 'A+', label: 'Handledarbed\u00f6mning' }],
        navHeading: '',
        destinations: [],
      },
      projects: {
        eyebrow: en ? 'Selected work' : 'Utvalt arbete',
        title: en ? 'Projects that show delivery, interface judgment, and technical range.' : 'Projekt som visar leveransförmåga, gränssnittsomdöme och teknisk bredd.',
        intro: en ? 'This selection focuses on work that demonstrates real implementation, visual discipline, and product thinking rather than volume.' : 'Urvalet fokuserar på arbete som visar verklig implementation, visuell disciplin och produkttänkande snarare än mängd.',
        cards: [
          { ...sharedCards.hrnytt, stack: ['HTML', 'CSS', 'Python', 'Figma', en ? 'Accessibility' : 'Tillgänglighet'], type: en ? 'Client work' : 'Kundarbete', detail: { description: en ? 'HRnytt is one of Sweden\'s leading digital platforms for HR professionals, delivering news, analysis, and editorial content. The platform needed a complete responsive redesign to modernize its reading experience and improve accessibility.\n\nI was responsible for the frontend — from early concept work and building a component-based Figma design system, through semantic HTML/CSS/Python implementation, to final launch. The project was driven in collaboration with a backend developer via GitHub, where we coordinated deliveries and code reviews throughout the process.' : 'HRnytt är en av Sveriges ledande digitala plattformar för HR-proffs, med nyheter, analyser och redaktionellt innehåll för HR-communityn. Plattformen behövde en komplett responsiv redesign för att modernisera läsupplevelsen, förbättra tillgängligheten och skapa ett konsekvent visuellt system över alla skärmstorlekar.\n\nJag ansvarade för frontenden — från tidigt konceptarbete och uppbyggnad av ett komponentbaserat Figma-designsystem, genom semantisk HTML/CSS/Python-implementation, till slutlig lansering. Projektet drevs i samarbete med en backendutvecklare via GitHub, där vi koordinerade leveranser och kodgranskning genom hela processen.', role: en ? 'Frontend Developer & Designer' : 'Frontendutvecklare & Designer', duration: en ? 'Multi-week client engagement' : 'Flerveckors kunduppdrag', highlights: en ? ['Built a complete Figma design system from scratch with reusable, scalable components', 'Implemented a fully responsive frontend with semantic HTML, CSS, and Python', 'Collaborated with a backend developer via GitHub with code reviews and coordinated deliveries', 'Prioritized editorial readability with clear typographic hierarchy', 'Delivered accessibility improvements aligned with WCAG guidelines', 'Launched as a live production website serving real users'] : ['Byggde ett komplett Figma-designsystem från grunden med återanvändbara, skalbara komponenter', 'Implementerade en helt responsiv frontend med semantisk HTML, CSS och Python', 'Samarbetade med backendutvecklare via GitHub med kodgranskning och koordinerade leveranser', 'Prioriterade redaktionell läsbarhet med tydlig typografisk hierarki och innehållsstruktur', 'Levererade tillgänglighetsförbättringar i linje med WCAG-riktlinjer', 'Lanserat som en live produktionswebbplats för riktiga användare'] } },
          { ...sharedCards.linnea, stack: ['Webflow', 'Figma', 'CMS', 'UX/UI', 'WCAG'], type: en ? 'Client work' : 'Kundarbete', detail: { description: en ? 'Linné Medical Care is a corporate healthcare company in Bromma offering personalized, authorized care. The project involved building the entire website from scratch — from design concept to production and launch.\n\nI worked closely with the production manager to understand the client\'s needs and vision. After reviewing the brief, I drew inspiration from Japanese harmonious therapy websites, shaping a calm, balanced, and trust-building design. The client was very pleased at the first presentation, and I moved directly into building the site.\n\nI was solely responsible for everything: Figma design, Webflow development, CMS setup, responsive implementation, and final launch.' : 'Linné Medical Care är ett företagshälsovårdsföretag i Bromma som erbjuder personlig, auktoriserad vård. Projektet innebar att bygga hela webbplatsen från grunden — från designkoncept till färdig produktion och lansering.\n\nJag arbetade nära produktionsledaren för att förstå kundens behov och vision. Efter att ha tagit del av kundens önskemål hämtade jag inspiration från japanska harmoniska terapiwebbplatser, vilket formade en lugn, balanserad och förtroendeskapande design. Vid första presentationen var kunden mycket nöjd, och jag gick direkt vidare med att bygga siten.\n\nJag ansvarade för allt själv: Figma-design, Webflow-utveckling, CMS-uppbyggnad, responsiv implementation och slutlig lansering.', role: en ? 'Fullstack Designer & Developer' : 'Fullstack Designer & Utvecklare', duration: en ? 'Client engagement' : 'Kunduppdrag', highlights: en ? ['Solely responsible for the entire project — from Figma design to Webflow production and launch', 'Close collaboration with production manager to understand client needs', 'Design inspiration from Japanese harmonious therapy for calm, balance, and trust', 'Built CMS structure in Webflow for easy content management', 'Client very satisfied at the first design presentation', 'Responsive implementation with focus on accessibility and professional tone'] : ['Ensam ansvarig för hela projektet — från Figma-design till Webflow-produktion och lansering', 'Nära samarbete med produktionsledare för att förstå kundens behov och önskemål', 'Designinspiration från japansk harmonisk terapi för att skapa lugn, balans och förtroende', 'Byggde CMS-struktur i Webflow för enkel innehållshantering', 'Kunden mycket nöjd redan vid första designpresentationen', 'Responsiv implementation med fokus på tillgänglighet och professionell ton'] } },
          { ...sharedCards.questos, stack: ['Figma', en ? 'UX Architecture' : 'UX-arkitektur', en ? 'Product Design' : 'Produktdesign'], type: en ? 'Product contribution' : 'Produktbidrag', detail: null },
          { ...sharedCards.desmal, stack: ['React', 'Node.js', 'MySQL', 'Tailwind CSS', 'Context API'], type: en ? 'Product concept' : 'Produktkoncept', detail: { description: en ? 'DESMAL is a modern fashion e-commerce web app built from scratch with a React frontend and Node.js backend. The application includes login, product filtering, favorites, shopping cart, and a complete checkout flow.\n\nThe project uses Tailwind CSS for responsive styling and Context API for global state management. The backend is built with Express and MySQL for data storage.' : 'DESMAL är en modern e-handelswebbapp för mode, byggd från grunden med React-frontend och Node.js-backend. Applikationen innehåller inloggning, produktfiltrering, favoritfunktion, kundvagn och komplett checkout-flöde.\n\nProjektet använder Tailwind CSS för responsiv styling och Context API för global state-hantering. Backend är byggd med Express och MySQL för datalagring.', role: en ? 'Fullstack Developer' : 'Fullstackutvecklare', duration: en ? 'Personal project' : 'Eget projekt', highlights: en ? ['Fullstack implementation with React, Node.js, and MySQL', 'Authentication system with login and registration', 'Product filtering, search, and favorites', 'Shopping cart and checkout flow', 'Responsive design with Tailwind CSS', 'Global state management with Context API'] : ['Fullstack-implementation med React, Node.js och MySQL', 'Autentiseringssystem med inloggning och registrering', 'Produktfiltrering, sökning och favoritfunktion', 'Kundvagns- och checkout-flöde', 'Responsiv design med Tailwind CSS', 'Global state-hantering med Context API'] } },
          { ...sharedCards.snabbsnack, stack: ['React', 'Vite', 'WebSockets'], type: en ? 'Practice project' : 'Övningsprojekt', detail: { description: en ? 'SnabbSnack is a real-time chat application built with React and WebSockets. The focus was on creating a fast, responsive chat experience with clear message flows and live interaction between users.\n\nThe project was built with Vite as the build tool for fast development and hot module replacement.' : 'SnabbSnack är en realtidschattapplikation byggd med React och WebSockets. Fokus låg på att skapa en snabb, responsiv chattupplevelse med tydliga meddelandeflöden och live-interaktion mellan användare.\n\nProjektet byggdes med Vite som build-verktyg för snabb utveckling och hot module replacement.', role: en ? 'Frontend Developer' : 'Frontendutvecklare', duration: en ? 'Practice project' : 'Övningsprojekt', highlights: en ? ['Real-time communication via WebSockets', 'Responsive chat interface built in React', 'Fast development environment with Vite', 'Clear message flows and UX'] : ['Realtidskommunikation via WebSockets', 'Responsivt chattgränssnitt byggt i React', 'Snabb utvecklingsmiljö med Vite', 'Tydliga meddelandeflöden och UX'] } },
          { ...sharedCards.nandin, stack: ['React', 'Context API', 'CSS', 'localStorage'], type: en ? 'Personal project' : 'Eget projekt', detail: { description: en ? 'NANDIN is a recipe application where users can search, filter, and save recipes as favorites. The app also has a rating system.\n\nBuilt entirely in React with Context API for global state and localStorage to persist data between sessions. The design is mobile-first with plain CSS.' : 'NANDIN är en receptapplikation där användare kan söka, filtrera och spara recept som favoriter. Appen har även ett betygssystem.\n\nByggd helt i React med Context API för global state och localStorage för att bevara data mellan sessioner. Designen är mobile-first med ren CSS.', role: en ? 'Frontend Developer' : 'Frontendutvecklare', duration: en ? 'Personal project' : 'Eget projekt', highlights: en ? ['Search and filtering system for recipes', 'Favorites with localStorage persistence', 'Rating system for recipes', 'Mobile-first responsive design', 'Global state with Context API'] : ['Sök- och filtreringssystem för recept', 'Favoritfunktion med localStorage-persistens', 'Betygssystem för recept', 'Mobile-first responsiv design', 'Global state med Context API'] } },
          { ...sharedCards.suntrip, stack: ['Figma', 'Wireframing', en ? 'Responsive Design' : 'Responsiv design', en ? 'UX Testing' : 'UX-testning'], type: en ? 'UX/UI Design' : 'UX/UI-design', detail: { description: en ? 'SUNTRIP is a UX/UI design project for a travel booking website, designed in Figma with both desktop and mobile views.\n\nThe focus was on filtering and discoverability — users should easily find and compare destinations. The desktop view includes destination filters, highlights, and booking overview. The mobile view offers a compact interface with smooth scrolling.' : 'SUNTRIP är ett UX/UI-designprojekt för en resebokningswebbplats, designad i Figma med både desktop- och mobilvy.\n\nFokus låg på filtrering och upptäckbarhet — användare ska enkelt kunna hitta och jämföra resmål. Desktop-vyn inkluderar destinationsfilter, höjdpunkter och bokningsöversikt. Mobilvyn erbjuder ett kompakt gränssnitt med smidig scrollupplevelse.', role: en ? 'UX/UI Designer' : 'UX/UI-designer', duration: en ? 'Design project' : 'Designprojekt', highlights: en ? ['Complete prototype for desktop and mobile in Figma', 'Destination filtering and booking overview', 'Compact mobile view with smooth scrolling', 'Consistent component library and branding', 'UX testing and iterative design process'] : ['Komplett prototyp för desktop och mobil i Figma', 'Destinationsfiltrering och bokningsöversikt', 'Kompakt mobilvy med smidig scrollupplevelse', 'Konsekvent komponentbibliotek och varumärke', 'UX-testning och iterativ designprocess'] } },
          { ...sharedCards.weather, stack: ['HTML', 'CSS', 'JavaScript', 'OpenWeatherMap API'], type: en ? 'Personal project' : 'Eget projekt', detail: { description: en ? 'A weather application that automatically detects the user\'s location and shows current weather. Users can search for cities, save favorites, and see real-time updates.\n\nBuilt with plain HTML, CSS, and JavaScript with weather data from OpenWeatherMap API. Responsive design that works on all devices.' : 'En väderapplikation som automatiskt detekterar användarens plats och visar aktuellt väder. Användare kan söka efter städer, spara favoriter och se realtidsuppdateringar.\n\nByggd med ren HTML, CSS och JavaScript med väderdata från OpenWeatherMap API. Responsiv design som fungerar på alla enheter.', role: en ? 'Frontend Developer' : 'Frontendutvecklare', duration: en ? 'Personal project' : 'Eget projekt', highlights: en ? ['Automatic location detection for current weather', 'City search and favorites', 'Real-time weather data via OpenWeatherMap API', 'Responsive design with plain CSS'] : ['Automatisk platsdetektering för aktuellt väder', 'Stadssökning och favoritfunktion', 'Realtidsväderdata via OpenWeatherMap API', 'Responsiv design med ren CSS'] } },
          { ...sharedCards.todo, stack: ['HTML', 'CSS', 'JavaScript', 'localStorage'], type: en ? 'Personal project' : 'Eget projekt', detail: { description: en ? 'A simple but functional list application with separate pages for to-do and to-buy. Tasks are saved automatically with localStorage so data is preserved between sessions.\n\nBuilt with plain HTML, CSS, and JavaScript with focus on mobile responsiveness and clear UX.' : 'En enkel men funktionell listapplikation med separata sidor för att-göra och att-köpa. Uppgifter sparas automatiskt med localStorage så data bevaras mellan sessioner.\n\nByggd med ren HTML, CSS och JavaScript med fokus på mobilresponsivitet och tydlig UX.', role: en ? 'Frontend Developer' : 'Frontendutvecklare', duration: en ? 'Personal project' : 'Eget projekt', highlights: en ? ['Separate To-Do and To-Buy lists', 'localStorage persistence between sessions', 'Mobile-responsive design', 'Plain JavaScript without frameworks'] : ['Separata To-Do och To-Buy-listor', 'localStorage-persistens mellan sessioner', 'Mobilresponsiv design', 'Ren JavaScript utan ramverk'] } },
          { ...sharedCards.quiz, stack: ['HTML', 'CSS', 'JavaScript'], type: en ? 'Personal project' : 'Eget projekt', detail: { description: en ? 'An interactive quiz game where the user answers multiple-choice questions with dynamic score tracking. The game shows one question at a time and keeps track of the player\'s results.\n\nBuilt with plain HTML, CSS, and JavaScript — an early project focused on DOM manipulation and game logic.' : 'Ett interaktivt quizspel där användaren svarar på flervalsfrågor med dynamisk poängspårning. Spelet visar en fråga i taget och håller koll på spelarens resultat.\n\nByggd med ren HTML, CSS och JavaScript — ett tidigt projekt som fokuserade på DOM-manipulation och spellogik.', role: en ? 'Frontend Developer' : 'Frontendutvecklare', duration: en ? 'Personal project' : 'Eget projekt', highlights: en ? ['Multiple-choice questions shown one at a time', 'Dynamic score tracking and results', 'Interactive game flow', 'Plain JavaScript and CSS'] : ['Flervalsfrågor visas en i taget', 'Dynamisk poängspårning och resultatvisning', 'Interaktivt spelflöde', 'Ren JavaScript och CSS'] } },
          { ...sharedCards.karezai, stack: ['Claude AI', 'Markdown', 'Git', 'Claude Code'], type: en ? 'AI Tool' : 'AI-verktyg', detail: { description: en ? 'KarezAI is an AI-powered agent system built with Claude for automating design analysis and project documentation.\n\nRedesign Agent analyzes websites and provides modern design recommendations with structured output. Documentation Agent tracks work sessions, documents progress, and updates the portfolio automatically. The system is built on modular markdown-based agent definitions.' : 'KarezAI är ett AI-drivet agentsystem byggt med Claude för att automatisera designanalys och projektdokumentation.\n\nRedesign Agent analyserar webbplatser och ger moderna designrekommendationer med strukturerad output. Documentation Agent spårar arbetssessioner, dokumenterar framsteg och uppdaterar portfolion automatiskt. Systemet bygger på modulära markdown-baserade agentdefinitioner.', role: en ? 'AI Developer' : 'AI-utvecklare', duration: en ? 'Personal project' : 'Eget projekt', highlights: en ? ['Redesign Agent that analyzes websites and gives design recommendations', 'Documentation Agent that tracks work and updates portfolio automatically', 'Modular markdown-based agent definitions', 'Integration with Claude Code'] : ['Redesign Agent som analyserar webbplatser och ger designrekommendationer', 'Documentation Agent som spårar arbete och uppdaterar portfolio automatiskt', 'Modulära markdown-baserade agentdefinitioner', 'Integration med Claude Code'] } },
        ],
      },
      about: {
        eyebrow: en ? 'Mission profile' : 'Uppdragsprofil',
        title: en ? 'A frontend developer with strong design instincts and a bias toward shipping.' : 'Frontendutvecklare med stark designkänsla och tydlig vilja att leverera.',
        intro: en ? 'I completed a 5-month internship at Reaktion, where I delivered two live client websites and worked across design, development, accessibility, and collaboration with broader teams.' : 'Jag har avslutat en 5 månader lång praktik på Reaktion där jag levererade två live kundwebbplatser och arbetade med design, utveckling, tillgänglighet och samarbete i tvärfunktionella team.',
        body: en ? 'My strongest work sits between product clarity and frontend execution. I enjoy turning rough requirements into interfaces that feel structured, calm, and ready for real users.' : 'Mitt starkaste arbete finns mellan produktklarhet och frontendexekvering. Jag tycker om att omvandla otydliga behov till gränssnitt som känns strukturerade, lugna och redo för riktiga användare.',
        timelineHeading: en ? 'Recent trajectory' : 'Nylig riktning',
        timeline: en ? ['Delivered live client work at Reaktion from design direction to production frontend.', 'Built bilingual and accessibility-aware interfaces for real organizations.', 'Contributed product and visual thinking beyond pure implementation.'] : ['Levererat live kundarbete på Reaktion från designriktning till produktionsfrontend.', 'Byggt tvåspråkiga och tillgänglighetsmedvetna gränssnitt för verkliga organisationer.', 'Bidragit med produkt- och visuellt tänk utöver ren implementation.'],
        skillsHeading: en ? 'Core strengths' : 'Kärnstyrkor',
        skills: en ? ['Frontend engineering', 'UX/UI design', 'Responsive systems', 'Accessibility-aware implementation', 'Design-to-code workflow'] : ['Frontendutveckling', 'UX/UI-design', 'Responsiva system', 'Tillgänglighetsmedveten implementation', 'Design-till-kod-flöde'],
        factsHeading: en ? 'Proof points' : 'Bevispunkter',
        facts: en ? ['25-person agency environment', '6-person delivery team collaboration', 'Two live client launches'] : ['Byråmiljö med 25 personer', 'Samarbete i leveransteam om 6 personer', 'Två live kundlanseringar'],
      },
      contact: {
        eyebrow: en ? 'Open channel' : 'Öppen kanal',
        title: en ? 'Available for ambitious teams that value frontend quality and design judgment.' : 'Tillgänglig för ambitiösa team som värdesätter frontendkvalitet och designomdöme.',
        intro: en ? 'I am looking for opportunities where I can contribute across interface quality, implementation detail, and product thinking.' : 'Jag söker möjligheter där jag kan bidra till gränssnittskvalitet, implementationsdetaljer och produkttänkande i samma arbete.',
        availability: en ? 'Currently open to internship and junior-to-mid frontend opportunities, especially in teams where design and engineering work closely together.' : 'Just nu öppen för praktik och frontendroller på junior till mellan-nivå, särskilt i team där design och utveckling arbetar nära varandra.',
        formHeading: en ? 'Start the conversation' : 'Inled samtalet',
        directLabel: en ? 'Direct contact' : 'Direktkontakt',
        responseNote: en ? 'The strongest outreach is specific: team, role, product, and why the fit makes sense.' : 'Den bästa kontakten är konkret: team, roll, produkt och varför matchningen är relevant.',
        channels: en ? ['Internship opportunities with strong frontend and UX ownership', 'Junior-to-mid frontend roles with close design collaboration', 'Selected freelance or project-based digital product work'] : ['Praktikmöjligheter med starkt frontend- och UX-ansvar', 'Frontendroller på junior till mellan-nivå med nära designsamarbete', 'Utvalda freelance- eller projektbaserade digitala produktuppdrag'],
      },
      skills: {
        eyebrow: en ? 'Technical arsenal' : 'Teknisk arsenal',
        title: en ? 'Tools and technologies I work with.' : 'Verktyg och teknologier jag arbetar med.',
        intro: en ? 'An overview of the languages, frameworks, tools, and platforms I use in my daily work — from frontend and backend to design and AI.' : 'En översikt av de språk, ramverk, verktyg och plattformar jag använder i mitt dagliga arbete — från frontend och backend till design och AI.',
        categories: skillCategories[lang],
      },
    },
    contact: contactInfo,
    references: {
      quoteLabel: en ? 'Supervisor assessment' : 'Handledarbedömning',
      quote: en ? 'Very curious, engaged, and capable junior frontend developer with strong responsibility for learning and delivery.' : 'Mycket nyfiken, engagerad och kapabel junior frontendutvecklare med starkt ansvarstagande för lärande och leverans.',
    },
  };
}

const contentCache: Record<string, ReturnType<typeof buildPortfolio>> = {};

export function getPortfolio(lang: ShellLang) {
  if (!contentCache[lang]) {
    contentCache[lang] = buildPortfolio(lang);
  }
  return contentCache[lang];
}
