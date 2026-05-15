import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useQuizStore from '../store/useQuizStore'
import ResultCard from '../components/ResultCard'

export default function Results() {
  const navigate = useNavigate()
  const { currentQuiz, score, answers, isFinished, reset } = useQuizStore()

  // Guard: if somehow landed here without a finished quiz, redirect to quizzes
  useEffect(() => {
    if (!isFinished || !currentQuiz) {
      navigate('/quizzes', { replace: true })
    }
  }, [isFinished, currentQuiz, navigate])

  if (!currentQuiz || !isFinished) return null

  const handleReset = () => {
    reset()
    navigate('/quizzes')
  }

  return (
    <div className="pt-24 pb-20 px-4">
      {/* Top decorative line */}
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
      </div>

      {/* Bottom decorative line */}
      <div className="max-w-2xl mx-auto mt-12">
        <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, #7c4d6e, #c9a84c, #7c4d6e, transparent)' }} />
      </div>
    </div>
  )
}
