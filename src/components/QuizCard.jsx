import { Link } from "react-router-dom";
import SeriesTag from "./SeriesTag";

const CARD_ACCENTS = [
  "from-rose-dust to-mauve-deep",
  "from-gold-warm to-rose-dust",
  "from-mauve-deep to-gold-warm",
];

const DIFFICULTY_LABEL = {
  easy: { text: "text-emerald-500", label: "Easy" },
  medium: { text: "text-gold-warm", label: "Medium" },
  hard: { text: "text-rose-dust", label: "Hard" },
};

export default function QuizCard({ quiz, index = 0 }) {
  const accent = CARD_ACCENTS[index % CARD_ACCENTS.length];
  const num = String(index + 1).padStart(2, "0");
  const diff = DIFFICULTY_LABEL[quiz.difficulty] ?? DIFFICULTY_LABEL.easy;

  if (quiz.comingSoon) {
    return (
      <article className="card-base relative h-full flex flex-col overflow-hidden opacity-60 cursor-default select-none">
        <div className={`h-[2px] bg-gradient-to-r ${accent} opacity-20`} />
        <div className="flex flex-col gap-5 p-6 flex-1">
          <div className="flex items-start justify-between">
            <p className="section-overline pt-0.5">{quiz.category}</p>
            {quiz.id !== "name-that-series" && (
              <span className="font-body text-[10px] tracking-[0.2em] uppercase text-mauve-mid border border-mauve-deep/40 rounded-full px-2.5 py-1 shrink-0">
                Coming Soon
              </span>
            )}
          </div>
          <h3 className="font-display text-[1.6rem] italic leading-tight text-zinc-600">
            {quiz.title}
          </h3>
          <p className="font-body text-sm text-zinc-700 leading-relaxed line-clamp-2 flex-1">
            {quiz.description}
          </p>
          <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
            <SeriesTag tag={quiz.seriesTag} />
            <div className="flex items-center gap-3 font-body text-xs text-zinc-700">
              <span>{diff.label}</span>
              <span>·</span>
              <span>{quiz.questionCount}Q</span>
            </div>
          </div>
        </div>

        {quiz.id === "name-that-series" && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span
              className="font-display italic text-4xl text-rose-dust whitespace-nowrap bg-bg-base/80 px-4 py-2 rounded"
              style={{ transform: "rotate(-28deg)" }}
            >
              Will open on Tzet Shabbat!
            </span>
          </div>
        )}
      </article>
    );
  }

  return (
    <Link to={`/quiz/${quiz.id}`} className="block group">
      <article className="card-interactive relative h-full flex flex-col overflow-hidden">
        <div
          className={`h-[2px] bg-gradient-to-r ${accent} opacity-50 group-hover:opacity-100 transition-opacity duration-300`}
        />
        <div className="flex flex-col gap-5 p-6 flex-1">
          <div className="flex items-start justify-between">
            <p className="section-overline pt-0.5">{quiz.category}</p>
            <span className="font-display text-7xl font-bold leading-none text-white/[0.05] select-none group-hover:text-white/[0.09] transition-colors duration-400 -mt-2 -mr-1">
              {num}
            </span>
          </div>
          <h3 className="font-display text-[1.6rem] italic leading-tight text-zinc-100 group-hover:text-rose-pale transition-colors duration-200">
            {quiz.title}
          </h3>
          <p className="font-body text-sm text-zinc-500 leading-relaxed line-clamp-2 flex-1">
            {quiz.description}
          </p>
          <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
            <SeriesTag tag={quiz.seriesTag} />
            <div className="flex items-center gap-3 font-body text-xs text-zinc-600">
              <span className={diff.text}>{diff.label}</span>
              <span>·</span>
              <span>{quiz.questionCount}Q</span>
              <span>·</span>
              <span>~{quiz.estimatedMinutes}m</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
