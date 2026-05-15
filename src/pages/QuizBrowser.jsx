import { useState, useMemo } from 'react'
import QuizCard from '../components/QuizCard'
import quizzes from '../data/quizzes.json'

const ALL_CATEGORIES = ['all', ...new Set(quizzes.map((q) => q.category))]
const ALL_SERIES = ['all', ...new Set(quizzes.map((q) => q.seriesTag))]
const ALL_DIFFICULTIES = ['all', 'easy', 'medium', 'hard']

export default function QuizBrowser() {
  const [category, setCategory] = useState('all')
  const [series, setSeries] = useState('all')
  const [difficulty, setDifficulty] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    return quizzes.filter((q) => {
      if (category !== 'all' && q.category !== category) return false
      if (series !== 'all' && q.seriesTag !== series) return false
      if (difficulty !== 'all' && q.difficulty !== difficulty) return false
      if (search && !q.title.toLowerCase().includes(search.toLowerCase()) &&
          !q.description.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
  }, [category, series, difficulty, search])

  const resetFilters = () => {
    setCategory('all')
    setSeries('all')
    setDifficulty('all')
    setSearch('')
  }

  const hasFilters = category !== 'all' || series !== 'all' || difficulty !== 'all' || search !== ''

  return (
    <div className="pt-24 pb-20 px-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <p className="section-subtitle mb-2">Test yourself</p>
        <h1 className="section-title">All Quizzes</h1>
        <p className="font-body text-zinc-500 text-sm mt-2">
          {quizzes.length} quizzes across couples, plot, and Thai GL history.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-bg-surface border border-border-subtle rounded-xl p-4 mb-8 space-y-4">
        {/* Search */}
        <div className="relative">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search quizzes…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-bg-elevated border border-border-subtle rounded-lg pl-10 pr-4 py-2.5 font-body text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-mauve-deep/60 focus:ring-1 focus:ring-mauve-deep/30 transition-colors"
          />
        </div>

        <div className="flex flex-wrap gap-3 items-end">
          {/* Category filter */}
          <FilterSelect label="Category" value={category} onChange={setCategory} options={ALL_CATEGORIES} />
          {/* Series filter */}
          <FilterSelect label="Series" value={series} onChange={setSeries} options={ALL_SERIES} />
          {/* Difficulty filter */}
          <FilterSelect label="Difficulty" value={difficulty} onChange={setDifficulty} options={ALL_DIFFICULTIES} />

          {hasFilters && (
            <button onClick={resetFilters} className="btn-ghost text-xs px-4 py-2">
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      {filtered.length > 0 ? (
        <>
          <p className="font-body text-xs text-zinc-600 mb-5 tracking-wide">
            {filtered.length} quiz{filtered.length !== 1 ? 'zes' : ''} found
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((quiz, i) => (
              <QuizCard key={quiz.id} quiz={quiz} index={i} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-20 text-zinc-600">
          <p className="font-display italic text-2xl mb-2">No quizzes found</p>
          <p className="font-body text-sm">Try adjusting your filters</p>
          <button onClick={resetFilters} className="btn-ghost mt-6 text-sm">
            Clear all filters
          </button>
        </div>
      )}
    </div>
  )
}

function FilterSelect({ label, value, onChange, options }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-body text-[11px] tracking-widest uppercase text-zinc-600">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-bg-elevated border border-border-subtle rounded-lg px-3 py-2 font-body text-sm text-zinc-300 focus:outline-none focus:border-mauve-deep/60 focus:ring-1 focus:ring-mauve-deep/30 transition-colors capitalize"
      >
        {options.map((opt) => (
          <option key={opt} value={opt} className="capitalize bg-bg-surface">
            {opt === 'all' ? `All ${label === 'Difficulty' ? 'Difficulties' : label === 'Series' ? 'Series' : label + 's'}` : opt}
          </option>
        ))}
      </select>
    </div>
  )
}
