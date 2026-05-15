import { Link } from "react-router-dom";
import QuizCard from "../components/QuizCard";
import quizzes from "../data/quizzes.json";

const SERIES_LIST = [
  { name: "GAP The Series",          year: "2022", note: "FreenBecky · First Thai GL" },
  { name: "Show Me Love",            year: "2023", note: "EngLot debut" },
  { name: "Affair",                  year: "2024", note: "LMSY · GAP universe" },
  { name: "23.5",                    year: "2024", note: "MilkLove · GMMTV · Netflix" },
  { name: "The Loyal Pin",           year: "2024", note: "FreenBecky · 300M+ views" },
  { name: "The Secret of Us",        year: "2024", note: "Netflix" },
  { name: "Us",                      year: "2024", note: "" },
  { name: "ClaireBell",              year: "2025", note: "" },
  { name: "Dangerous Queen",         year: "2025", note: "" },
  { name: "Denied Love",             year: "2025", note: "" },
  { name: "Harmony Secret",          year: "2025", note: "LMSY" },
  { name: "Love Bully",              year: "2025", note: "EngLot" },
  { name: "Love Design",             year: "2025", note: "" },
  { name: "My Safe Zone",            year: "2025", note: "" },
  { name: "Only You",                year: "2025", note: "" },
  { name: "Petrichor",               year: "2025", note: "EngLot" },
  { name: "Player",                  year: "2025", note: "" },
  { name: "Poisonous Love",          year: "2025", note: "" },
  { name: "Queendom",                year: "2025", note: "" },
  { name: "Reverse for You",         year: "2025", note: "" },
  { name: "Reverse with Me",         year: "2025", note: "" },
  { name: "Roller Coaster",          year: "2025", note: "" },
  { name: "Somewhere Somehow",       year: "2025", note: "" },
  { name: "Unlimited Love",          year: "2025", note: "EngLot" },
  { name: "Whale Store xoxo",        year: "2025", note: "Netflix" },
  { name: "4 Elements: The Water",   year: "2025", note: "EngLot" },
  { name: "4 Elements: The Earth",   year: "2026", note: "" },
  { name: "Hometown Romance",        year: "2026", note: "LMSY" },
];

export default function Home() {
  const featuredQuizzes = quizzes.slice(0, 3);

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative mt-14 min-h-[calc(100dvh-3.5rem)] flex flex-col justify-end pb-16 sm:pb-24 px-5 sm:px-8 overflow-hidden">
        {/* Full-bleed background image */}
        <div className="absolute inset-0">
          <img
            src="/hero.jpg"
            alt=""
            className="w-full h-full object-cover object-center"
            aria-hidden="true"
          />
          {/* Multi-layer overlay: keep the dark base + let image bleed through */}
          <div className="absolute inset-0 bg-bg-base/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-bg-base/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-bg-base/70 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          {/* Overline */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-6 h-px bg-rose-dust" />
            <span className="font-body text-[10px] tracking-[0.3em] uppercase text-zinc-500">
              Thai GL Quiz Site · สัพพรส
            </span>
          </div>

          {/* Headline — intentionally oversized */}
          <h1
            className="font-display italic text-white leading-[0.92] tracking-tight mb-10"
            style={{ fontSize: "clamp(3.2rem, 10vw, 8.5rem)" }}
          >
            How well
            <br />
            do you know
            <br />
            <span className="text-gradient-rose">your Thai GL?</span>
          </h1>

          {/* Stats bar */}
          <div className="flex items-center gap-5 mb-10 flex-wrap">
            <span className="stat-item">{quizzes.length} Quizzes</span>
            <span className="text-zinc-700">—</span>
            <span className="stat-item">
              {quizzes.reduce((sum, q) => sum + q.questionCount, 0)} Questions
            </span>
            <span className="text-zinc-700">—</span>
            <span className="stat-item">2022 – 2026</span>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/quizzes" className="btn-primary text-sm px-7 py-3">
              Browse All Quizzes
            </Link>
            <Link
              to="/quiz/thai-gl-couples-101"
              className="btn-ghost text-sm px-7 py-3"
            >
              Quick Start →
            </Link>
          </div>
        </div>

        {/* Thin bottom rule */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-border-subtle" />
      </section>

      {/* ── Featured Quizzes ─────────────────────────────── */}
      <section className="py-20 px-5 sm:px-8 max-w-6xl mx-auto">
        <div className="section-header">
          <div className="section-accent-bar" />
          <div>
            <span className="section-overline">Start here</span>
            <h2 className="section-title">Featured Quizzes</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredQuizzes.map((quiz, i) => (
            <QuizCard key={quiz.id} quiz={quiz} index={i} />
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <Link to="/quizzes" className="btn-ghost text-sm">
            All Quizzes →
          </Link>
        </div>
      </section>

      {/* ── Series Timeline ───────────────────────────────── */}
      <section className="py-20 px-5 sm:px-8 border-t border-border-subtle">
        <div className="max-w-6xl mx-auto">
          <div className="section-header">
            <div
              className="section-accent-bar"
              style={{
                background: "linear-gradient(to bottom, #c9a84c, #7c4d6e)",
              }}
            />
            <div>
              <span className="section-overline">The universe</span>
              <h2 className="section-title">Thai GL Shows</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border-subtle rounded-xl overflow-hidden border border-border-subtle">
            {SERIES_LIST.map(({ name, year, note }, i) => (
              <div
                key={name}
                className="flex items-center gap-4 bg-bg-base px-5 py-4 hover:bg-bg-surface transition-colors duration-150 group"
              >
                <span className="font-body text-xs text-zinc-700 tabular-nums shrink-0 w-8">
                  {year}
                </span>
                <div className="w-px h-8 bg-border-subtle shrink-0" />
                <div className="min-w-0">
                  <p className="font-display italic text-zinc-200 text-base leading-tight truncate group-hover:text-rose-pale transition-colors duration-150">
                    {name}
                  </p>
                  <p className="font-body text-[11px] text-zinc-600 mt-0.5">
                    {note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="py-24 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl border border-border-strong bg-bg-surface px-8 sm:px-16 py-16">
            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-mauve-deep/20 to-transparent rounded-bl-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-rose-dust/8 to-transparent rounded-tr-full pointer-events-none" />

            <div className="relative z-10 max-w-xl">
              <span className="section-overline">Challenge yourself</span>
              <h2 className="font-display text-4xl sm:text-5xl italic text-white mb-4 leading-tight">
                Ready to prove your GL knowledge?
              </h2>
              <p className="font-body text-zinc-500 text-sm mb-8 leading-relaxed">
                From easy couple-matching to hard lore deep-dives — pick a quiz
                and find out where you stand.
              </p>
              <Link to="/quizzes" className="btn-primary">
                Take a Quiz Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────── */}
      <footer className="border-t border-border-subtle py-8 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-display italic text-zinc-600 text-sm">
            Emenize Ben Yafit
          </span>
          <span className="font-body text-xs text-zinc-700">
            Fan site · Not affiliated with any studio or network
          </span>
        </div>
      </footer>
    </div>
  );
}
