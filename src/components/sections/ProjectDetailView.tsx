'use client';

import { getPortfolioContent } from '../../lib/content/portfolioContent';
import { useJourneyStore } from '../../stores/useJourneyStore';

type ProjectDetail = {
  description: string;
  role: string;
  duration: string;
  highlights: string[];
};

type ProjectDetailCard = {
  slug: string;
  title: string;
  type: string;
  stack: string[];
  links: { label: string };
  detail: ProjectDetail;
};

type ProjectDetailViewProps = {
  card: ProjectDetailCard;
  accent: string;
  onBack: () => void;
};

export default function ProjectDetailView({ card, accent, onBack }: ProjectDetailViewProps) {
  const language = useJourneyStore((state) => state.language);
  const content = getPortfolioContent(language).planets.projects;
  const { detail } = card;

  return (
    <div className="animate-holo-drill-in">
      {/* Navigation bar */}
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="group flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.28em] text-white/70 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
        >
          <span className="inline-block text-sm transition-transform group-hover:-translate-x-0.5">‹</span>
          {content.backLabel}
        </button>
        <span
          className="shrink-0 rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em]"
          style={{ borderColor: `${accent}40`, color: `${accent}cc`, backgroundColor: `${accent}0e` }}
        >
          {card.type}
        </span>
      </div>

      {/* Title block */}
      <h2 className="mt-7 text-3xl text-white sm:text-4xl">{card.title}</h2>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.28em] text-slate-500">
        {card.links.label}
      </p>
      <div
        className="mt-5 h-px w-20"
        style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
      />

      {/* Description */}
      <div className="mt-6 space-y-4">
        {detail.description.split('\n\n').map((paragraph, i) => (
          <p key={i} className="max-w-2xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Role & Duration */}
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <div className="rounded-[20px] border border-white/10 bg-white/[0.03] p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-slate-500">
            {content.detailLabels.role}
          </p>
          <p className="mt-2.5 text-sm text-white">{detail.role}</p>
        </div>
        <div className="rounded-[20px] border border-white/10 bg-white/[0.03] p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-slate-500">
            {content.detailLabels.duration}
          </p>
          <p className="mt-2.5 text-sm text-white">{detail.duration}</p>
        </div>
      </div>

      {/* Highlights */}
      <div className="mt-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-slate-500">
          {content.detailLabels.highlights}
        </p>
        <div className="mt-3 h-px w-12" style={{ background: `${accent}44` }} />
        <ul className="mt-4 space-y-3">
          {detail.highlights.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm leading-7 text-slate-300">
              <span
                className="mt-2 block h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: accent }}
              />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Tech stack */}
      <div className="mt-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-slate-500">
          {content.detailLabels.tech}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {card.stack.map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-slate-300"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
