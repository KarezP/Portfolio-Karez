import { useJourneyStore } from '../../stores/useJourneyStore';

export default function LangToggle() {
  const language = useJourneyStore((state) => state.language);
  const setLanguage = useJourneyStore((state) => state.setLanguage);

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-cyan-400/20 bg-[linear-gradient(180deg,rgba(10,10,20,0.84),rgba(10,10,20,0.64))] p-1 shadow-hud backdrop-blur">
      {(['sv', 'en'] as const).map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => setLanguage(option)}
          className={`rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.28em] transition ${
            language === option
              ? 'border border-cyan-300/30 bg-cyan-400/10 text-white'
              : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
