import { Link } from "react-router-dom";
import QuizCard from "../components/QuizCard";
import Reveal from "../components/Reveal";
import quizzes from "../data/quizzes.json";

export default function Home() {
  const sorted = [...quizzes].sort((a, b) => {
    if (a.id === "name-that-series") return -1;
    if (b.id === "name-that-series") return 1;
    return 0;
  });
  const featuredQuizzes = sorted.slice(0, 3);

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative mt-14 min-h-[75vh] sm:min-h-[calc(100dvh-3.5rem)] flex flex-col justify-end pb-16 sm:pb-24 px-5 sm:px-8">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/hero.jpg"
            alt=""
            className="w-full h-full object-cover [object-position:65%_center] sm:object-center"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-bg-base/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-bg-base/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-bg-base/70 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <div
            className="flex items-center gap-3 mb-8 hero-anim"
            style={{ animationDelay: "0ms" }}
          >
            <div className="w-6 h-px bg-rose-dust" />
            <span className="font-body text-[10px] tracking-[0.3em] uppercase text-zinc-500">
              Thai GL Quiz Site · สัพพรส
            </span>
          </div>

          <h1
            className="font-display italic text-white leading-[0.92] tracking-tight mb-10 hero-anim"
            style={{
              fontSize: "clamp(3.2rem, 10vw, 8.5rem)",
              animationDelay: "150ms",
            }}
          >
            How well
            <br />
            do you know
            <br />
            <span className="text-gradient-rose pr-3">your Thai GL?</span>
          </h1>

          <div
            className="flex items-center gap-5 mb-10 flex-wrap hero-anim"
            style={{ animationDelay: "300ms" }}
          >
            <span className="stat-item">{quizzes.length} Quizzes</span>
            <span className="text-zinc-700">—</span>
            <span className="stat-item">
              {quizzes.reduce((sum, q) => sum + q.questionCount, 0)} Questions
            </span>
            <span className="text-zinc-700">—</span>
            <span className="stat-item">2022 – 2026</span>
          </div>

          <div
            className="flex flex-col sm:flex-row gap-3 hero-anim"
            style={{ animationDelay: "440ms" }}
          >
            <Link to="/quizzes" className="btn-primary text-sm px-7 py-3">
              Browse All Quizzes
            </Link>
            <Link to="/quizzes" className="btn-ghost text-sm px-7 py-3">
              Browse Quizzes →
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-border-subtle" />
      </section>

      {/* ── Featured Quizzes ─────────────────────────────── */}
      <section className="py-20 px-5 sm:px-8 max-w-6xl mx-auto">
        <Reveal>
          <div className="section-header">
            <div className="section-accent-bar" />
            <div>
              <span className="section-overline">Start here</span>
              <h2 className="section-title">Featured Quizzes</h2>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredQuizzes.map((quiz, i) => (
            <Reveal key={quiz.id} delay={i * 120}>
              <QuizCard quiz={quiz} index={i} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={360}>
          <div className="mt-8 flex justify-end">
            <Link to="/quizzes" className="btn-ghost text-sm">
              All Quizzes →
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ── Genre teaser ─────────────────────────────────── */}
      <section className="py-16 px-5 sm:px-8 border-t border-border-subtle">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-6 flex-wrap">
          <Reveal>
            <div>
              <span className="section-overline">The universe</span>
              <p className="font-display italic text-2xl text-zinc-300 mt-1">
                27 shows and counting
              </p>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <Link to="/about" className="btn-ghost text-sm">
              Explore the genre →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="py-24 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl border border-border-strong bg-bg-surface px-8 sm:px-16 py-16">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-mauve-deep/20 to-transparent rounded-bl-full pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-rose-dust/8 to-transparent rounded-tr-full pointer-events-none" />

              <div className="relative z-10 max-w-xl">
                <span className="section-overline">Challenge yourself</span>
                <h2 className="font-display text-4xl sm:text-5xl italic text-white mb-4 leading-tight">
                  Ready to prove your GL knowledge?
                </h2>
                <p className="font-body text-zinc-500 text-sm mb-8 leading-relaxed">
                  From easy couple-matching to hard lore deep-dives — pick a
                  quiz and find out where you stand.
                </p>
                <Link to="/quizzes" className="btn-primary">
                  Take a Quiz Now
                </Link>
              </div>
            </div>
          </Reveal>
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
          <span className="font-body text-xs text-zinc-700">
            © 2026 Mika Bibas · All rights reserved
          </span>
        </div>
      </footer>
    </div>
  );
}
