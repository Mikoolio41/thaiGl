import { useEffect } from 'react'
import useQuizStore from '../store/useQuizStore'

/**
 * Per-question countdown timer (30 seconds).
 * On expiry: records a null answer then advances to the next question.
 */
export default function Timer({ isAnswered }) {
  const { timeLeft, timePerQuestion, setTimeLeft, timeExpired, nextQuestion } = useQuizStore()

  useEffect(() => {
    if (timePerQuestion === null) return
    if (isAnswered) return

    if (timeLeft <= 0) {
      timeExpired()
      nextQuestion()
      return
    }

    const id = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    return () => clearTimeout(id)
  }, [timeLeft, isAnswered, timePerQuestion, setTimeLeft, timeExpired, nextQuestion])

  if (timePerQuestion === null) return null

  const pct = (timeLeft / timePerQuestion) * 100
  const isUrgent = timeLeft <= Math.min(10, Math.floor(timePerQuestion * 0.2))

  return (
    <div className="flex items-center gap-2.5">
      <div
        className={`relative w-9 h-9 rounded-full border-2 flex items-center justify-center transition-colors duration-300 ${
          isUrgent ? 'border-rose-dust' : 'border-mauve-deep'
        }`}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(${isUrgent ? '#c98b8b' : '#7c4d6e'} ${pct}%, transparent ${pct}%)`,
            opacity: 0.3,
          }}
        />
        <span
          className={`font-body font-medium text-xs tabular-nums z-10 transition-colors duration-300 ${
            isUrgent ? 'text-rose-dust' : 'text-mauve-pale'
          }`}
        >
          {timeLeft}
        </span>
      </div>
      <span className="font-body text-xs text-zinc-500 hidden sm:block">sec</span>
    </div>
  )
}
