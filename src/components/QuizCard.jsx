import { Link } from 'react-router-dom'
import SeriesTag from './SeriesTag'

const DIFFICULTY_STYLES = {
  easy: 'text-emerald-400 bg-emerald-900/20 border-emerald-800/30',
  medium: 'text-gold-warm bg-gold-warm/10 border-gold-muted/30',
  hard: 'text-rose-dust bg-rose-dust/10 border-rose-muted/30',
}

/**
 * Browse card shown in the quiz listing page.
 * @param {{ quiz: object }} props
 */
export default function QuizCard({ quiz }) {
  return (
    <Link to={`/quiz/${quiz.id}`} className="block group">
      <article className="card-interactive h-full flex flex-col overflow-hidden">
        {/* Cover image */}
        <div className="relative overflow-hidden h-44 bg-bg-overlay">
          <img
            src={quiz.coverImage}
            alt={quiz.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
            loading="lazy"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg-surface via-bg-surface/30 to-transparent" />
          {/* Difficulty badge */}
          <div className="absolute top-3 right-3">
            <span className={`tag-base border text-[11px] font-medium ${DIFFICULTY_STYLES[quiz.difficulty]}`}>
              {quiz.difficulty}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-3 p-5 flex-1">
          <div className="flex items-start gap-2 flex-wrap">
            <SeriesTag tag={quiz.seriesTag} />
            <SeriesTag tag={quiz.category} />
          </div>

          <h3 className="font-display text-lg italic text-zinc-100 leading-snug group-hover:text-rose-pale transition-colors duration-200">
            {quiz.title}
          </h3>

          <p className="font-body text-sm text-zinc-500 leading-relaxed line-clamp-2 flex-1">
            {quiz.description}
          </p>

          <div className="flex items-center gap-4 pt-1 border-t border-border-subtle">
            <div className="flex items-center gap-1.5 text-zinc-500">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-body text-xs">{quiz.questionCount} questions</span>
            </div>
            <div className="flex items-center gap-1.5 text-zinc-500">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-body text-xs">~{quiz.estimatedMinutes} min</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
