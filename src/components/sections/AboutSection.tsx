import { getPortfolioContent } from '../../lib/content/portfolioContent';
import { SECTION_ACCENTS } from '../../lib/space/constants';
import { useJourneyStore } from '../../stores/useJourneyStore';
import PlanetPanelShell from './PlanetPanelShell';

export default function AboutSection() {
  const language = useJourneyStore((state) => state.language);
  const content = getPortfolioContent(language).planets.about;
  const accent = SECTION_ACCENTS.about;

  return (
    <section className="relative z-10 flex min-h-screen items-center justify-start px-4 py-24 sm:px-8 lg:px-14">
      <PlanetPanelShell accent={accent} align="left">
        <div className="grid w-full gap-6 rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(10,10,20,0.92),rgba(10,10,20,0.78))] p-5 shadow-hud backdrop-blur sm:p-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.72fr)] lg:p-8">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.34em]" style={{ color: `${accent}cc` }}>
              {content.eyebrow}
            </p>
            <h2 className="mt-5 text-3xl leading-tight text-white sm:text-4xl">
              {content.title}
            </h2>
            <p className="mt-5 text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">{content.intro}</p>
            <p className="mt-5 text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">{content.body}</p>

            <div className="mt-8 rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-slate-400">
                {content.timelineHeading}
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                {content.timeline.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full" style={{ backgroundColor: accent }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-slate-400">
                {content.skillsHeading}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {content.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-slate-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-slate-400">
                {content.factsHeading}
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                {content.facts.map((fact) => (
                  <li key={fact} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-cyan-300" />
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </PlanetPanelShell>
    </section>
  );
}
