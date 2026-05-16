import { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useQuizStore from '../store/useQuizStore'
import useAuthStore from '../store/useAuthStore'
import ResultCard from '../components/ResultCard'
import { supabase } from '../lib/supabase'

export default function Results() {
  const navigate = useNavigate()
  const { currentQuiz, score, answers, isFinished, reset } = useQuizStore()
  const { user, openModal } = useAuthStore()
  const savedRef = useRef(false)

  useEffect(() => {
    if (!isFinished || !currentQuiz) {
      navigate('/quizzes', { replace: true })
    }
  }, [isFinished, currentQuiz, navigate])

  // Save attempt once per completion, only when logged in
  useEffect(() => {
    if (!isFinished || !currentQuiz || !user || savedRef.current) return
    savedRef.current = true

    supabase.from('quiz_attempts').insert({
      user_id: user.id,
      quiz_id: currentQuiz.id,
      score,
      total_questions: currentQuiz.questions.length,
    }).then(({ error }) => {
      if (error) console.error('[quiz_attempts insert]', error)
    })
  }, [isFinished, currentQuiz, user, score])

  if (!currentQuiz || !isFinished) return null

  return (
    <div className="pt-24 pb-20 px-4">
      <div className="max-w-2xl mx-auto mb-12">
        <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, #7c4d6e, #c9a84c, #7c4d6e, transparent)' }} />
      </div>

      <div className="max-w-2xl mx-auto">
        <p className="font-body text-xs tracking-widest uppercase text-zinc-600 text-center mb-2">
          Quiz complete
        </p>
        <h1 className="font-display text-display-md italic text-zinc-100 text-center mb-10">
          {currentQuiz.title}
        </h1>

        <ResultCard
          score={score}
          total={currentQuiz.questions.length}
          quizTitle={currentQuiz.title}
          quizId={currentQuiz.id}
          answers={answers}
        />

        {/* Leaderboard link */}
        <div className="mt-4 text-center">
          <Link to="/leaderboard" className="font-body text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
            View leaderboard →
          </Link>
        </div>

        {/* Sign-in prompt for guests */}
        {!user && (
          <div className="mt-6 flex items-center justify-between gap-4 bg-bg-surface border border-border-strong rounded-xl px-5 py-4">
            <div>
              <p className="font-body text-sm text-zinc-300">Want to save your score?</p>
              <p className="font-body text-xs text-zinc-600 mt-0.5">Create an account to track progress and compete.</p>
            </div>
            <button onClick={openModal} className="btn-primary text-xs shrink-0">
              Sign In
            </button>
          </div>
        )}
      </div>

      <div className="max-w-2xl mx-auto mt-12">
        <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, #7c4d6e, #c9a84c, #7c4d6e, transparent)' }} />
      </div>
    </div>
  )
}
