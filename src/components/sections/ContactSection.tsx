import { getPortfolioContent } from '../../lib/content/portfolioContent';
import { SECTION_ACCENTS } from '../../lib/space/constants';
import { useJourneyStore } from '../../stores/useJourneyStore';
import PlanetPanelShell from './PlanetPanelShell';

export default function ContactSection() {
  const language = useJourneyStore((state) => state.language);
  const content = getPortfolioContent(language);
  const accent = SECTION_ACCENTS.contact;

  return (
    <section className="relative z-10 flex min-h-screen items-center justify-end px-4 py-24 sm:px-8 lg:px-14">
      <PlanetPanelShell accent={accent} align="right">
        <div className="grid w-full gap-6 rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(10,10,20,0.92),rgba(10,10,20,0.78))] p-5 shadow-hud backdrop-blur sm:p-7 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:p-8">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.34em]" style={{ color: `${accent}cc` }}>
              {content.planets.contact.eyebrow}
            </p>
            <h2 className="mt-5 text-3xl leading-tight text-white sm:text-4xl">
              {content.planets.contact.title}
            </h2>
            <p className="mt-5 text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
              {content.planets.contact.intro}
            </p>
            <p className="mt-5 text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
              {content.planets.contact.availability}
            </p>

            <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-300">
              {content.planets.contact.channels.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full" style={{ backgroundColor: accent }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5 sm:p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-slate-400">
              {content.planets.contact.formHeading}
            </p>
            <div className="mt-6 space-y-5">
              <ContactRow label={content.common.email} value={content.contact.email} />
              <ContactRow label={content.common.phone} value={content.contact.phone} />
              <ContactRow label={content.common.linkedin} value={content.contact.linkedinUrl} />
              <ContactRow label={content.common.github} value={content.contact.githubUrl} />
            </div>
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-slate-500">
                Response note
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                {content.planets.contact.responseNote}
              </p>
            </div>
          </div>
        </div>
      </PlanetPanelShell>
    </section>
  );
}

function ContactRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-slate-500">
        {label}
      </p>
      <p className="mt-2 break-all text-sm leading-7 text-white">{value}</p>
    </div>
  );
}
