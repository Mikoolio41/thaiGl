import { useState } from 'react'
import Fuse from 'fuse.js'
import MediaPlayer from './MediaPlayer'
import SeriesTag from './SeriesTag'

function isCloseEnough(typed, correct) {
  const normalise = (s) => s.toLowerCase().trim().replace(/^the\s+/i, '')
  if (normalise(typed) === normalise(correct)) return true
  const fuse = new Fuse([correct], { includeScore: true, threshold: 0.4 })
  const results = fuse.search(typed)
  return results.length > 0 && results[0].score < 0.4
}

const OPTION_LABELS = ['A', 'B', 'C', 'D']

/**
 * Renders any question type: multiple-choice, image, quote, audio.
 * Emits onAnswer(selectedAnswer) when the user picks an option.
 *
 * @param {{
 *   question: object,
 *   onAnswer: (answer: string) => void,
 *   isAnswered: boolean,
 *   selectedAnswer: string | null
 * }} props
 */
export default function QuestionBlock({ question, onAnswer, isAnswered, selectedAnswer }) {
  const [localSelected, setLocalSelected] = useState(null)
  const [typedAnswer, setTypedAnswer] = useState('')
  const [submitState, setSubmitState] = useState(null) // 'correct' | 'wrong' | null

  const handleSelect = (option) => {
    if (isAnswered || localSelected) return
    setLocalSelected(option)
    onAnswer(option)
  }

  const handleTypeSubmit = () => {
    if (isAnswered || submitState || !typedAnswer.trim()) return
    const correct = isCloseEnough(typedAnswer.trim(), question.correctAnswer)
    setSubmitState(correct ? 'correct' : 'wrong')
    onAnswer(correct ? question.correctAnswer : typedAnswer.trim())
  }

  const getOptionState = (option) => {
    if (!isAnswered && !localSelected) return 'idle'
    if (option === question.correctAnswer) return 'correct'
    if (option === (localSelected ?? selectedAnswer) && option !== question.correctAnswer) return 'wrong'
    return 'dim'
  }

  const optionClasses = {
    idle: 'border-border-strong bg-bg-elevated hover:border-mauve-deep/60 hover:bg-bg-overlay cursor-pointer hover:shadow-[0_0_16px_rgba(124,77,110,0.12)]',
    correct: 'border-emerald-500/60 bg-emerald-900/20 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.12)]',
    wrong: 'border-rose-dust/60 bg-rose-dust/10 text-rose-pale shadow-[0_0_20px_rgba(201,139,139,0.12)]',
    dim: 'border-border-subtle bg-bg-surface opacity-40',
  }

  return (
    <div className="animate-fade-in space-y-6">
      {/* Series / difficulty meta */}
      <div className="flex items-center gap-2 flex-wrap">
        <SeriesTag tag={question.seriesTag} />
        <span className="font-body text-[10px] tracking-widest uppercase text-zinc-600">
          {question.difficulty}
        </span>
      </div>

      {/* Media: image */}
      {question.type === 'image' && question.mediaUrl && (
        <div className="rounded-xl overflow-hidden border border-border-subtle max-w-md">
          <img
            src={question.mediaUrl}
            alt="Quiz visual"
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>
      )}

      {/* Media: audio */}
      {question.type === 'audio' && (
        <MediaPlayer src={question.mediaUrl} />
      )}

      {/* Question text */}
      <div>
        {question.type === 'quote' && (
          <p className="font-body text-xs tracking-widest uppercase text-mauve-pale mb-3">
            — Quote Question —
          </p>
        )}
        <h2 className="font-display text-display-md text-zinc-100 italic leading-snug">
          {question.question}
        </h2>
      </div>

      {/* Image-identify: full-width image + text input */}
      {question.type === 'image-identify' && (
        <div className="space-y-4">
          {question.mediaUrl && (
            <div className="rounded-xl overflow-hidden border border-border-subtle">
              <img
                src={question.mediaUrl}
                alt="Identify this series"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          )}
          <div className="flex gap-2">
            <input
              type="text"
              value={typedAnswer}
              onChange={(e) => setTypedAnswer(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleTypeSubmit()}
              disabled={!!submitState}
              placeholder="Type the series name…"
              className={`flex-1 bg-bg-elevated border rounded-xl px-4 py-3 font-body text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-all duration-200 ${
                submitState === 'correct'
                  ? 'border-emerald-500/60 bg-emerald-900/20'
                  : submitState === 'wrong'
                  ? 'border-rose-dust/60 bg-rose-dust/10'
                  : 'border-border-strong focus:border-mauve-deep/60'
              }`}
            />
            {!submitState && (
              <button
                onClick={handleTypeSubmit}
                disabled={!typedAnswer.trim()}
                className="btn-primary px-5 py-3 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Submit
              </button>
            )}
            {submitState === 'correct' && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-900/20 border border-emerald-500/60 text-emerald-400 font-body text-sm">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Correct!
              </div>
            )}
            {submitState === 'wrong' && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-rose-dust/10 border border-rose-dust/60 text-rose-pale font-body text-sm whitespace-nowrap">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
                {question.correctAnswer}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Options (multiple-choice / image / quote / audio) */}
      {question.type !== 'image-identify' && <div className="grid gap-3">
        {question.options.map((option, i) => {
          const state = getOptionState(option)
          return (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              disabled={isAnswered || !!localSelected}
              className={`flex items-center gap-4 px-5 py-4 rounded-xl border text-left transition-all duration-200 group ${optionClasses[state]}`}
            >
              <span
                className={`w-7 h-7 rounded-full border flex items-center justify-center font-body font-medium text-xs shrink-0 transition-colors duration-200 ${
                  state === 'correct'
                    ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                    : state === 'wrong'
                    ? 'bg-rose-dust/20 border-rose-dust/50 text-rose-pale'
                    : state === 'idle'
                    ? 'border-border-strong text-zinc-500 group-hover:border-mauve-mid group-hover:text-mauve-pale'
                    : 'border-border-subtle text-zinc-600'
                }`}
              >
                {OPTION_LABELS[i]}
              </span>
              <span className="font-body text-sm text-zinc-200 leading-snug">
                {option}
              </span>
              {state === 'correct' && (
                <svg className="w-4 h-4 text-emerald-400 ml-auto shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              )}
              {state === 'wrong' && (
                <svg className="w-4 h-4 text-rose-dust ml-auto shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          )
        })}
      </div>}

      {/* Explanation revealed after answering */}
      {isAnswered && question.explanation && (
        <div className="animate-fade-in border border-gold-warm/20 bg-gold-warm/5 rounded-xl px-5 py-4">
          <p className="font-body text-xs tracking-widest uppercase text-gold-warm mb-2">Did you know?</p>
          <p className="font-body text-sm text-zinc-300 leading-relaxed">{question.explanation}</p>
        </div>
      )}
    </div>
  )
}
