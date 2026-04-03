import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          skillsTitle: "My Skills",
          projects: "Projects",
          about: "About Me",
          contact: "Contact",
          skills: "Skills",
          hireMe: "Hire Me",
          followMe: "Follow me",
          loadingGallery: "Loading gallery...",
          loadingProject: "Loading project...",
          loadingProjectInfo: "Loading project info...",
          loadingRelatedProjects: "Loading related projects...",
          relatedTitle: "Related Projects",
          allProjects: "All Projects", 
          projectsPortfolio: "Projects Portfolio",
          searchOrFilter: "Search projects by title or filter by category",
          searchProjects: "Search Projects",
          bannerGreeting: "Hi, I am Karez",
          bannerRole: "Frontend Developer & UX/UI Designer",
          bannerInternship: "Actively seeking an LIA (internship) opportunity starting week 48, 2025",
          bannerEyebrow: "Senior-minded fullstack craft",
          bannerTitle: "I design and build digital products where product thinking, interface quality, and frontend execution all matter.",
          bannerSummary: "I'm Karez, a fullstack and product-minded builder focused on clear interfaces, thoughtful systems, and polished implementation. I care about how products look, how they behave, and why they deserve to exist.",
          bannerPrimaryCta: "View selected work",
          bannerImageAlt: "Portrait of Karez",
          bannerCardEyebrow: "Current focus",
          bannerCardTitle: "Frontend systems with stronger product judgment",
          bannerCardBody: "I am sharpening the space between UI design and engineering: building interfaces that feel deliberate, accessible, and structurally sound from first concept to shipped experience.",
          bannerStat1Value: "7+",
          bannerStat1Label: "Selected projects",
          bannerStat2Value: "React + UX",
          bannerStat2Label: "Hybrid strength",
          bannerStat3Value: "2025",
          bannerStat3Label: "LIA ready",
          homeProofEyebrow: "Positioning",
          homeProofTitle: "A portfolio should show judgment, not just activity.",
          homeProofBody: "This work focuses on frontend implementation, product clarity, and visual restraint. The goal is not to present every project equally, but to highlight where design decisions, technical choices, and execution quality align.",
          homeAvailabilityEyebrow: "Availability",
          homeAvailabilityTitle: "Open to internships and ambitious digital product work",
          homeAvailabilityBody: "Currently seeking an LIA opportunity starting week 48, 2025, with teams that value thoughtful execution, strong collaboration, and products that benefit from both design sensitivity and technical rigor.",
          selectedWorkEyebrow: "Selected work",
          homeSelectedWorkTitle: "Projects that show range, intent, and execution",
          homeSelectedWorkIntro: "A focused selection across fullstack builds, interface design, and frontend problem-solving. Each project reflects a different angle of how I approach clarity, usability, and implementation detail.",
          viewProject: "View project",
          homeCapabilitiesEyebrow: "How I work",
          homeCapabilitiesTitle: "I care about the product around the interface, not only the interface itself.",
          homeCapabilitiesIntro: "My strongest work happens where structure, copy, layout, and implementation reinforce each other. I am most useful on products that need clean frontend execution without losing strategic thinking.",
          homeCapabilitiesApproachTitle: "What I optimize for",
          homeCapabilitiesApproach1: "Clear hierarchy and navigation so users understand value quickly.",
          homeCapabilitiesApproach2: "Interfaces that feel calm, fast, and maintainable rather than crowded or overly clever.",
          homeCapabilitiesApproach3: "A stronger bridge between visual design decisions and frontend implementation quality.",
          homeCapability1Title: "Frontend with product discipline",
          homeCapability1Body: "I build with attention to state, responsiveness, and maintainability, while still protecting the quality of the interface.",
          homeCapability2Title: "Design-aware execution",
          homeCapability2Body: "I work carefully with spacing, rhythm, component behavior, and visual hierarchy so the product feels considered, not assembled from defaults.",
          homeCapability3Title: "Strategic case study thinking",
          homeCapability3Body: "I present work through problems, tradeoffs, and outcomes instead of generic feature lists, which creates stronger trust and clearer differentiation.",
          homeCtaTitle: "Looking for someone who can build with both precision and taste?",
          homeCtaBody: "I am especially interested in teams and projects where frontend quality, product thinking, and user experience all shape the final outcome.",
          homeCtaButton: "Start a conversation",
          downloadCV: "Download CV",
          title: "What project are you looking for?",
          name: "Name",
          email: "Email",
          select: "Select project type",
          description: "Project description",
          send: "Send Request",
          close: "Close",  
          moreProjects: "More Projects",

          aboutMe: {
            1: "I'm a passionate Frontend Developer currently studying at Jensen Yrkeshögskola. I love building responsive and interactive web applications that combine functionality with great user experience.",
            2: "My skillset includes JavaScript, HTML, CSS, React, Tailwind CSS, Node.js, MySQL, and Figma. I’ve created several projects from scratch – including a fashion e-commerce app (DESMAL), a recipe app (NANDIN), a weather application, a quiz game, and a dual-list To-Do & To-Buy tool.",
            3: "I'm especially interested in creating clean, accessible interfaces and love working with both frontend logic and design details. I always strive to improve, explore new technologies, and deliver intuitive user experiences.",
            4: "Outside of coding, I enjoy learning about design systems, testing tools, and how to bring real-world problems into smart digital solutions."
          },
          desmal: {
            name: "DESMAL",
            category: "Fullstack",
            description: "An online fashion store built with React, Node.js, and MySQL.",
            role: "Fullstack Developer"
          },
          nandin: {
            name: "NANDIN",
            category: "Frontend",
            description: "A food recipe app with search, filters, favorites, ratings, and responsive design.",
            role: "Fullstack Developer"
          },
          suntrip: {
            name: "SUNTRIP",
            category: "UX/UI Design",
            description: "Travel agency website prototype in Figma (desktop and mobile).",
            role: "UX/UI Designer"
          },
          weather: {
            name: "Weather App",
            category: "Frontend",
            description: "Weather app with location-based data, favorites, and real-time clock.",
            role: "Frontend Developer"
          },
          todo: {
            name: "To-Do & To-Buy Lists",
            category: "Frontend",
            description: "Responsive app with separate To-Do and To-Buy pages using localStorage.",
            role: "Frontend Developer"
          },
          quiz: {
            name: "Quiz Game",
            category: "Frontend",
            description: "Multiple-choice quiz game with score tracking.",
            role: "Frontend Developer"
          },
          karezai: {
            name: "KarezAI",
            category: "AI Tool",
            description: "AI agent system for design analysis and project documentation with Claude.",
            role: "AI Developer"
          },
          project_nandin: {
            title: "NANDIN – Food Recipe App",
            imageTitle: "NANDIN Screenshot",
            aboutHeading: "About the Project",
            projectLabel: "Project",
            projectType: "Frontend Application",
            roleLabel: "Role",
            role: "Frontend Developer",
            objectiveHeading: "Objective",
            objective: "To design a responsive recipe app with features like search, filters, favorites, and ratings.",
            techTitle: "Tools & Technologies",
            detailsHeading: "Project Details",
            detail_1: "Users can search, filter, and save recipes as favorites.",
            detail_2: "Built entirely in React, with localStorage used to persist data.",
            detail_3: "Mobile-first design, styled with plain CSS.",
            shareHeading: "Share This",
            relatedTitle: "Related Projects"
          },
          project_desmal: {
            title: "DESMAL – Online Fashion Store",
            imageTitle: "DESMAL Screenshot",
            aboutHeading: "About the Project",
            projectLabel: "Project",
            projectType: "Personal Portfolio Project",
            roleLabel: "Role",
            role: "Fullstack Developer",
            objectiveHeading: "Objective",
            objective: "To build a full-featured online fashion store with login, filters, favorites, and checkout using React, Node.js, and MySQL.",
            techTitle: "Tools & Technologies",
            detailsHeading: "Project Details",
            detail_1: "DESMAL is a modern e-commerce web app built from scratch with React frontend and Node.js backend.",
            detail_2: "The application uses Tailwind CSS for responsive styling and Context API for global state.",
            shareHeading: "Share This",
            relatedTitle: "Related Projects"
          },
          
          
        
       

    project_todo: {
        title: "To-Do & To-Buy App",
        imageTitle: "Screenshot of To-Do App",
        aboutHeading: "About the Project",
        projectLabel: "Project",
        projectType: "Frontend Application",
        roleLabel: "Role",
        role: "Frontend Developer",
        objectiveHeading: "Objective",
        objective: "To build a responsive to-do app with two lists (To-Do and To-Buy) that saves tasks in localStorage.",
        techTitle: "Tools & Technologies",
        detailsHeading: "Project Details",
        detail_1: "The app includes separate To-Do and To-Buy lists with basic task functionality.",
        detail_2: "Uses localStorage to persist data between sessions.",
        detail_3: "Styled using plain CSS with mobile responsiveness.",
        shareHeading: "Share This",
        relatedTitle: "Related Projects"
    },
    
    project_weather: {
        title: "Weather App",
        imageTitle: "Screenshot of Weather App",
        aboutHeading: "About the Project",
        projectLabel: "Project",
        projectType: "Frontend Weather Application",
        roleLabel: "Role",
        role: "Frontend Developer",
        objectiveHeading: "Objective",
        objective: "To display live weather based on user location and allow searching for cities.",
        techTitle: "Tools & Technologies",
        detailsHeading: "Project Details",
        detail_1: "Automatically detects user location for current weather.",
        detail_2: "Allows search and favorite cities with real-time updates.",
        detail_3: "Responsive design using CSS, weather data via OpenWeatherMap API.",
        shareHeading: "Share This",
        relatedTitle: "Related Projects"
    },
    
    project_quiz: {
        title: "Quiz Game",
        imageTitle: "Screenshot of Quiz Game",
        aboutHeading: "About the Project",
        projectLabel: "Project",
        projectType: "Frontend Quiz Game",
        roleLabel: "Role",
        role: "Frontend Developer",
        objectiveHeading: "Objective",
        objective: "To build a simple interactive quiz game with score tracking.",
        techTitle: "Tools & Technologies",
        detailsHeading: "Project Details",
        detail_1: "Game shows one question at a time with multiple answers.",
        detail_2: "Tracks and displays score dynamically.",
        detail_3: "Built using plain JavaScript and styled with CSS.",
        shareHeading: "Share This",
        relatedTitle: "Related Projects"
    },
   
     
      
      project_suntrip: {
        title: "SUNTRIP – Travel Website (Figma)",
        imageTitle_1: "Suntrip – Desktop View",
        imageTitle_2: "Suntrip – Mobile View",
        aboutHeading: "About the Project",
        projectLabel: "Project",
        projectType: "UX/UI Design Project",
        roleLabel: "Role",
        role: "UX/UI Designer",
        objectiveHeading: "Objective",
        objective: "To design a travel booking website optimized for both desktop and mobile with a focus on filtering and discoverability.",
        techTitle: "Tools & Technologies",
        detailsHeading: "Design Highlights",
        detail_1: "The desktop view includes destination filters, highlights, and booking overview.",
        detail_2: "The mobile version provides a compact UI and easy scrolling experience.",
        detail_3: "Consistent components and branding throughout both views.",
        shareHeading: "Share This",
        relatedTitle: "Related Projects"
      },
      project_karezai: {
            title: "KarezAI – AI Agent System",
            imageTitle: "KarezAI Screenshot",
            aboutHeading: "About the Project",
            projectLabel: "Project",
            projectType: "AI Development Tool",
            roleLabel: "Role",
            role: "AI Developer",
            objectiveHeading: "Objective",
            objective: "To build an AI-powered agent system for design analysis and automated project documentation using Claude.",
            techTitle: "Tools & Technologies",
            detailsHeading: "Project Details",
            detail_1: "Redesign Agent analyzes websites and provides modern, high-class design recommendations with structured output.",
            detail_2: "Documentation Agent tracks work sessions, documents achievements, and updates portfolio automatically.",
            detail_3: "Built with Claude Code, featuring modular markdown-based agent definitions and templates.",
            shareHeading: "Share This",
            relatedTitle: "Related Projects"
          },
          hireMeModal: {
        title: "Hire Me",
        name: "Your Name",
        email: "Your Email",
        select: "Select a Service",
        description: "Project Description",
        send: "Send Message",
        close: "Close"
      },
      
  
      },

    },


      sv: {
        translation: {
          skillsTitle: "Mina färdigheter",
          projects: "Projekt",
          about: "Om mig",
          contact: "Kontakt",
          skills: "Färdigheter",
          hireMe: "Anställ mig",
          followMe: "Följ mig",
          loadingGallery: "Laddar galleriet...",
          loadingProject: "Laddar projekt...",
          loadingProjectInfo: "Laddar projektinformation...",
          loadingRelatedProjects: "Laddar relaterade projekt...",
          relatedTitle: "Relaterade projekt",
          imageTitle: "Skärmdump från DESMAL",
          allProjects: "Alla projekt",
          projectsPortfolio: "Projektportfölj",
          searchOrFilter: "Sök projekt via titel eller filtrera efter kategori",
          searchProjects: "Sök projekt",
          bannerGreeting: "Hej, jag är Karez",
          bannerRole: "Frontendutvecklare & UX/UI-designer",
          bannerInternship: "Söker aktivt en LIA-plats (praktik) med start vecka 48, 2025",
          bannerEyebrow: "Senior prägel i fullstack-arbetet",
          bannerTitle: "Jag designar och bygger digitala produkter där produkttänk, gränssnittskvalitet och frontend-exekvering måste hålla samma nivå.",
          bannerSummary: "Jag heter Karez och arbetar som fullstack- och produktmedveten builder med fokus på tydliga gränssnitt, genomtänkta system och välpolerad implementation. Jag bryr mig om hur produkter ser ut, hur de beter sig och varför de förtjänar att finnas.",
          bannerPrimaryCta: "Se utvalda projekt",
          bannerImageAlt: "Porträtt av Karez",
          bannerCardEyebrow: "Nuvarande fokus",
          bannerCardTitle: "Frontendsystem med starkare produktomdöme",
          bannerCardBody: "Jag utvecklar samspelet mellan UI-design och engineering: gränssnitt som känns genomtänkta, tillgängliga och strukturellt hållbara från idé till färdig upplevelse.",
          bannerStat1Value: "7+",
          bannerStat1Label: "Utvalda projekt",
          bannerStat2Value: "React + UX",
          bannerStat2Label: "Kombinerad styrka",
          bannerStat3Value: "2025",
          bannerStat3Label: "LIA redo",
          homeProofEyebrow: "Positionering",
          homeProofTitle: "En portfolio ska visa omdöme, inte bara aktivitet.",
          homeProofBody: "Det här arbetet fokuserar på frontendimplementation, produktklarhet och visuell återhållsamhet. Målet är inte att lyfta alla projekt lika mycket, utan att visa var designbeslut, tekniska val och exekveringskvalitet faktiskt möts.",
          homeAvailabilityEyebrow: "Tillgänglighet",
          homeAvailabilityTitle: "Öppen för praktik och ambitiösa digitala produktprojekt",
          homeAvailabilityBody: "Jag söker just nu en LIA-plats med start vecka 48, 2025, gärna i team som värdesätter genomtänkt exekvering, starkt samarbete och produkter där både designkänsla och teknisk kvalitet spelar roll.",
          selectedWorkEyebrow: "Utvalda projekt",
          homeSelectedWorkTitle: "Projekt som visar bredd, intention och genomförande",
          homeSelectedWorkIntro: "Ett fokuserat urval av fullstackbyggen, gränssnittsdesign och frontendnära problemlösning. Varje projekt visar en annan sida av hur jag arbetar med tydlighet, användbarhet och implementationsdetaljer.",
          viewProject: "Visa projekt",
          homeCapabilitiesEyebrow: "Så arbetar jag",
          homeCapabilitiesTitle: "Jag bryr mig om produkten runt gränssnittet, inte bara om gränssnittet i sig.",
          homeCapabilitiesIntro: "Mitt starkaste arbete sker där struktur, copy, layout och implementation förstärker varandra. Jag är som mest värdefull i produkter som behöver ren frontendexekvering utan att tappa strategiskt tänkande.",
          homeCapabilitiesApproachTitle: "Det jag optimerar för",
          homeCapabilitiesApproach1: "Tydlig hierarki och navigation så att användaren snabbt förstår värdet.",
          homeCapabilitiesApproach2: "Gränssnitt som känns lugna, snabba och hållbara i stället för stökiga eller överdrivet smarta.",
          homeCapabilitiesApproach3: "En starkare brygga mellan visuella designbeslut och kvaliteten i frontendimplementationen.",
          homeCapability1Title: "Frontend med produktdisciplin",
          homeCapability1Body: "Jag bygger med fokus på state, responsivitet och underhållbarhet, samtidigt som jag skyddar kvaliteten i gränssnittet.",
          homeCapability2Title: "Designmedveten exekvering",
          homeCapability2Body: "Jag arbetar noggrant med spacing, rytm, komponentbeteende och visuell hierarki så att produkten känns genomtänkt, inte sammansatt av standardval.",
          homeCapability3Title: "Strategiskt case study-tänk",
          homeCapability3Body: "Jag presenterar arbete genom problem, tradeoffs och resultat i stället för generiska feature-listor, vilket skapar starkare förtroende och tydligare differentiering.",
          homeCtaTitle: "Behöver du någon som kan bygga med både precision och smak?",
          homeCtaBody: "Jag är särskilt intresserad av team och projekt där frontendkvalitet, produkttänk och användarupplevelse tillsammans formar slutresultatet.",
          homeCtaButton: "Starta en dialog",
          downloadCV: "Ladda ner CV",  
          title: "Vilket projekt letar du efter?",
          name: "Namn",
          email: "E-post",
          select: "Välj projekttyp",
           description: "Projektbeskrivning",
          send: "Skicka förfrågan",
          close: "Stäng",
          moreProjects: "Fler projekt",
          aboutMe: {
            1: "Jag är en passionerad frontendutvecklare som för närvarande studerar på Jensen Yrkeshögskola. Jag älskar att bygga responsiva och interaktiva webbapplikationer som kombinerar funktionalitet med en bra användarupplevelse.",
            2: "Min kompetens inkluderar JavaScript, HTML, CSS, React, Tailwind CSS, Node.js, MySQL och Figma. Jag har skapat flera projekt från grunden – inklusive en mode-e-handelsapp (DESMAL), en receptapp (NANDIN), en väderapplikation, ett quizspel och ett dubbel-listverktyg för att göra och köpa.",
            3: "Jag är särskilt intresserad av att skapa rena, tillgängliga gränssnitt och tycker om att arbeta med både frontendlogik och design. Jag strävar alltid efter att förbättra mig, utforska nya teknologier och leverera intuitiva användarupplevelser.",
            4: "Utanför kodning tycker jag om att lära mig om designsystem, testverktyg och hur man förvandlar verkliga problem till smarta digitala lösningar."
          },
          desmal: {
            name: "DESMAL",
            category: "Fullstack",
            description: "En modebutik online byggd med React, Node.js och MySQL.",
            role: "Fullstackutvecklare"
          },
          nandin: {
            name: "NANDIN",
            category: "Frontend",
            description: "En receptapp med sökfunktion, filter, favoriter, betyg och responsiv design.",
            role: "Fullstackutvecklare"
          },
          suntrip: {
            name: "SUNTRIP",
            category: "UX/UI-design",
            description: "Prototyp för resebyrå i Figma – både desktop- och mobilversion.",
            role: "UX/UI-designer"
          },
          weather: {
            name: "Väderapp",
            category: "Frontend",
            description: "En väderapp som visar data baserat på plats, med favoriter och realtidsklocka.",
            role: "Frontendutvecklare"
          },
          todo: {
            name: "Att göra & Att köpa",
            category: "Frontend",
            description: "Responsiv lista med separata sidor för att göra och köpa. Lagring i localStorage.",
            role: "Frontendutvecklare"
          },
          quiz: {
            name: "Quizspel",
            category: "Frontend",
            description: "Flervalsquiz med poängräkning och en fråga i taget.",
            role: "Frontendutvecklare"
          },
          karezai: {
            name: "KarezAI",
            category: "AI-verktyg",
            description: "AI-agentsystem för designanalys och projektdokumentation med Claude.",
            role: "AI-utvecklare"
          },

          project_desmal: {
            title: "DESMAL – Modebutik Online",
            imageTitle: "DESMAL-skärmdump",
            aboutHeading: "Om projektet",
            projectLabel: "Projekt",
            projectType: "Personligt portföljprojekt",
            roleLabel: "Roll",
            role: "Fullstackutvecklare",
            objectiveHeading: "Syfte",
            objective: "Att bygga en komplett onlinebutik med inloggning, filter, favoriter och kassa med React, Node.js och MySQL.",
            techTitle: "Verktyg och tekniker",
            detailsHeading: "Projektbeskrivning",
            detail_1: "DESMAL är en modern e-handelsapp byggd från grunden med React frontend och Node.js backend.",
            detail_2: "Applikationen använder Tailwind CSS för responsiv design och Context API för global state.",
            shareHeading: "Dela projektet",
            relatedTitle: "Relaterade projekt"
          },
          
          
          
       
        project_todo: {
            title: "Att göra & Att köpa",
            imageTitle: "Skärmbild av To-Do App",
            aboutHeading: "Om projektet",
            projectLabel: "Projekt",
            projectType: "Frontend-applikation",
            roleLabel: "Roll",
            role: "Frontendutvecklare",
            objectiveHeading: "Syfte",
            objective: "Att bygga en responsiv to-do-app med två listor (Att göra och Att köpa) som sparar uppgifter i localStorage.",
            techTitle: "Verktyg & Tekniker",
            detailsHeading: "Projektbeskrivning",
            detail_1: "Appen innehåller separata listor för Att göra och Att köpa med enkel funktionalitet.",
            detail_2: "Använder localStorage för att spara data mellan sessioner.",
            detail_3: "Stilad med vanlig CSS och mobilanpassad design.",
            shareHeading: "Dela projektet",
            relatedTitle: "Relaterade projekt"
          },
          
          project_weather: {
            title: "Väderapp",
            imageTitle: "Skärmbild av väderappen",
            aboutHeading: "Om projektet",
            projectLabel: "Projekt",
            projectType: "Frontend väderapplikation",
            roleLabel: "Roll",
            role: "Frontendutvecklare",
            objectiveHeading: "Syfte",
            objective: "Att visa aktuell väderinformation baserat på användarens plats och tillåta sökningar efter städer.",
            techTitle: "Verktyg & Tekniker",
            detailsHeading: "Projektbeskrivning",
            detail_1: "Identifierar automatiskt användarens plats för att visa aktuellt väder.",
            detail_2: "Tillåter sökning och sparning av favoritstäder med realtidsuppdateringar.",
            detail_3: "Responsiv design med CSS och väderdata från OpenWeatherMap API.",
            shareHeading: "Dela projektet",
            relatedTitle: "Relaterade projekt"
          },
          
          project_quiz: {
            title: "Quizspel",
            imageTitle: "Skärmbild av quizspelet",
            aboutHeading: "Om projektet",
            projectLabel: "Projekt",
            projectType: "Frontend-quizspel",
            roleLabel: "Roll",
            role: "Frontendutvecklare",
            objectiveHeading: "Syfte",
            objective: "Att bygga ett enkelt interaktivt quizspel med poängräkning.",
            techTitle: "Verktyg & Tekniker",
            detailsHeading: "Projektbeskrivning",
            detail_1: "Visar en fråga i taget med flervalsalternativ.",
            detail_2: "Räknar och visar poäng i realtid.",
            detail_3: "Byggt med vanlig JavaScript och stylat med CSS.",
            shareHeading: "Dela projektet",
            relatedTitle: "Relaterade projekt"
          },
         
          
          project_nandin: {
            title: "NANDIN – Receptapp",
            imageTitle: "Skärmbild av NANDIN",
            aboutHeading: "Om projektet",
            projectLabel: "Projekt",
            projectType: "Frontend-applikation",
            roleLabel: "Roll",
            role: "Frontendutvecklare",
            objectiveHeading: "Syfte",
            objective: "Att designa en responsiv receptapp med favoriter, sök, filtrering och betyg.",
            techTitle: "Verktyg & Tekniker",
            detailsHeading: "Projektbeskrivning",
            detail_1: "Användare kan söka, filtrera och spara recept som favoriter.",
            detail_2: "Helt byggd i React med lokal lagring (localStorage) för att spara data.",
            detail_3: "Mobilförst-design med stil skriven i vanlig CSS.",
            shareHeading: "Dela projektet",
            relatedTitle: "Relaterade projekt"
          },
          
          project_suntrip: {
            title: "SUNTRIP – Resewebbplats (Figma)",
            imageTitle_1: "Suntrip – Desktopvy",
            imageTitle_2: "Suntrip – Mobilvy",
            aboutHeading: "Om projektet",
            projectLabel: "Projekt",
            projectType: "UX/UI-designprojekt",
            roleLabel: "Roll",
            role: "UX/UI-designer",
            objectiveHeading: "Syfte",
            objective: "Att designa en resewebbplats som fungerar smidigt både på desktop och mobil med fokus på filtrering och bokning.",
            techTitle: "Verktyg & Tekniker",
            detailsHeading: "Designbeskrivning",
            detail_1: "Desktopversionen innehåller sök, filter, kampanjer och bokningsöversikt.",
            detail_2: "Mobilversionen fokuserar på kompakt sökgränssnitt och enkel navigering.",
            detail_3: "Konsekvent komponentstruktur och branding i hela designen.",
            shareHeading: "Dela projektet",
            relatedTitle: "Relaterade projekt"
          },
          project_karezai: {
            title: "KarezAI – AI-agentsystem",
            imageTitle: "KarezAI-skärmdump",
            aboutHeading: "Om projektet",
            projectLabel: "Projekt",
            projectType: "AI-utvecklingsverktyg",
            roleLabel: "Roll",
            role: "AI-utvecklare",
            objectiveHeading: "Syfte",
            objective: "Att bygga ett AI-drivet agentsystem för designanalys och automatiserad projektdokumentation med Claude.",
            techTitle: "Verktyg & Tekniker",
            detailsHeading: "Projektbeskrivning",
            detail_1: "Redesign Agent analyserar webbplatser och ger moderna, högklassiga designrekommendationer med strukturerad output.",
            detail_2: "Documentation Agent spårar arbetssessioner, dokumenterar prestationer och uppdaterar portföljen automatiskt.",
            detail_3: "Byggt med Claude Code, med modulära markdown-baserade agentdefinitioner och mallar.",
            shareHeading: "Dela projektet",
            relatedTitle: "Relaterade projekt"
          },
          hireMeModal: {
            title: "Anlita mig",
            name: "Ditt namn",
            email: "Din e-post",
            select: "Välj tjänst",
            description: "Projektsammanfattning",
            send: "Skicka meddelande",
            close: "Stäng"
          },
          
      }
    }
    }
  });

export default i18n;
