import type { ProjectCard } from '../../lib/content/portfolioContent';
import { getPortfolioContent } from '../../lib/content/portfolioContent';
import { SECTION_ACCENTS } from '../../lib/space/constants';
import { useJourneyStore } from '../../stores/useJourneyStore';
import PlanetPanelShell from './PlanetPanelShell';

function ProjectCardItem({ card }: { card: ProjectCard }) {
  return (
    <article className="rounded-[28px] border border-cyan-400/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-200/70">
          {card.type}
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-slate-500">
          {card.links.label}
        </p>
      </div>
      <h3 className="mt-4 text-2xl text-white">{card.title}</h3>
      <div className="mt-4 h-px w-16 bg-cyan-300/30" />
      <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">{card.summary}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {card.stack.map((item) => (
          <span
            key={item}
            className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-slate-300"
          >
            {item}
          </span>
        ))}
      </div>
    </article>
  );
}

export default function ProjectsSection() {
  const language = useJourneyStore((state) => state.language);
  const content = getPortfolioContent(language).planets.projects;
  const accent = SECTION_ACCENTS.projects;

  return (
    <section className="relative z-10 flex min-h-screen items-center justify-end px-4 py-24 sm:px-8 lg:px-14">
      <PlanetPanelShell accent={accent} align="right">
        <div className="w-full rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(10,10,20,0.92),rgba(10,10,20,0.78))] p-5 shadow-hud backdrop-blur sm:p-7 lg:p-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.34em]" style={{ color: `${accent}cc` }}>
                {content.eyebrow}
              </p>
              <h2 className="mt-5 max-w-3xl text-3xl leading-tight text-white sm:text-4xl">
                {content.title}
              </h2>
              <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
                {content.intro}
              </p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-slate-400">
                Editorial filter
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                This planet prioritizes shipped and client-facing work first, then selected product concepts and practice builds that show useful range.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {content.cards.map((card) => (
              <ProjectCardItem key={card.slug} card={card} />
            ))}
          </div>
        </div>
      </PlanetPanelShell>
    </section>
  );
}
