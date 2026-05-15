import { Link } from 'react-router-dom'
import QuizCard from '../components/QuizCard'
import SeriesTag from '../components/SeriesTag'
import quizzes from '../data/quizzes.json'

const FEATURED_SERIES = [
  { name: 'The Loyal Pin', note: 'FreenBecky · 16 eps · 300M+ views' },
  { name: 'GAP The Series', note: 'FreenBecky · First Thai GL series' },
  { name: 'Affair', note: 'LMSY · 8 eps · GAP universe' },
  { name: '23.5', note: 'MilkLove · GMMTV · Netflix' },
  { name: 'Petrichor', note: 'EngLot · Engfa & Charlotte' },
  { name: 'The Secret of Us', note: 'Lingling & Orm · Netflix' },
  { name: 'Hometown Romance', note: 'LMSY · Premiered Apr 2026' },
  { name: '4 Elements: The Earth', note: 'Apple & Mim · Channel 7' },
]

export default function Home() {
  const featuredQuizzes = quizzes.slice(0, 3)

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative min-h-[90dvh] flex flex-col items-center justify-center px-4 text-center bg-gradient-hero overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-mauve-deep/8 blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-rose-dust/6 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gold-warm/4 blur-3xl" />
        </div>

        {/* Thai geometric border top */}
        <div className="absolute top-24 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #7c4d6e, #c9a84c, #7c4d6e, transparent)' }} />

        <div className="relative z-10 max-w-3xl mx-auto space-y-8 animate-fade-up">
          <div className="hr-ornament justify-center">
            <span>สัพพรส · All Flavors</span>
          </div>

          <h1 className="font-display text-display-xl text-zinc-100">
            <span className="italic">How well do you know</span>
            <br />
            <span className="text-gradient-rose italic">your Thai GL?</span>
          </h1>

          <p className="font-body text-zinc-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Quizzes for the fans — couples, plot, history, and everything in between.
            From GAP to The Loyal Pin and beyond.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
            <Link to="/quizzes" className="btn-primary text-base px-8 py-4">
              Browse All Quizzes
            </Link>
            <Link to="/quiz/thai-gl-couples-101" className="btn-ghost text-base px-8 py-4">
              Quick Start →
            </Link>
          </div>
        </div>

        {/* Thai geometric border bottom */}
        <div className="absolute bottom-8 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #7c4d6e, #c9a84c, #7c4d6e, transparent)' }} />
      </section>

      {/* Featured Quizzes */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="mb-10">
          <p className="section-subtitle mb-2">Start here</p>
          <h2 className="section-title">Featured Quizzes</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredQuizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link to="/quizzes" className="btn-ghost">
            View All Quizzes
          </Link>
        </div>
      </section>

      {/* Series Showcase */}
      <section className="py-20 px-4 border-t border-border-subtle">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="section-subtitle mb-2">The shows</p>
            <h2 className="section-title">Thai GL Universe</h2>
            <p className="font-body text-zinc-500 text-sm mt-2 max-w-md">
              From the groundbreaking first series to the 2026 releases — the genre keeps growing.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {FEATURED_SERIES.map(({ name, note }) => (
              <div
                key={name}
                className="card-base px-4 py-3 flex flex-col gap-1 hover:border-mauve-deep/50 transition-colors cursor-default"
              >
                <SeriesTag tag={name} size="md" />
                <p className="font-body text-xs text-zinc-600 mt-1">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 px-4">
        <div className="max-w-2xl mx-auto text-center bg-gradient-mauve rounded-2xl border border-mauve-deep/30 px-8 py-12 shadow-glow-mauve">
          <div className="hr-ornament justify-center">
            <span>Challenge yourself</span>
          </div>
          <h2 className="font-display text-display-md text-zinc-100 italic mt-2 mb-4">
            Ready to prove your GL knowledge?
          </h2>
          <p className="font-body text-zinc-400 text-sm mb-8 max-w-sm mx-auto">
            Pick a quiz and find out whether you're a casual viewer or the ultimate Thai GL scholar.
          </p>
          <Link to="/quizzes" className="btn-primary text-sm px-8 py-3">
            Take a Quiz Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border-subtle py-10 px-4 text-center">
        <p className="font-display italic text-zinc-600 text-sm">
          Enemize Ben Yafit — made with 💕 for the Thai GL community
        </p>
        <p className="font-body text-xs text-zinc-700 mt-2">
          Fan site · Not affiliated with any studio or network
        </p>
      </footer>
    </div>
  )
}
