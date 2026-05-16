import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useCompetitionStore from '../store/useCompetitionStore'
import useQuizStore from '../store/useQuizStore'
import useAuthStore from '../store/useAuthStore'
import QuestionBlock from '../components/QuestionBlock'
import ProgressBar from '../components/ProgressBar'
import Timer from '../components/Timer'

export default function CompetitionPlay() {
  const { joinCode } = useParams()
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const { competition, quiz, submitScore } = useCompetitionStore()
  const {
    currentQuiz,
    currentQuestionIndex,
    answers,
    score,
    isFinished,
    isStarted,
    startQuiz,
    answerQuestion,
    nextQuestion,
    reset,
  } = useQuizStore()

  // Start quiz on mount
  useEffect(() => {
    if (!competition || !quiz) {
      navigate(`/room/${joinCode}`, { replace: true })
      return
    }
    if (!isStarted || currentQuiz?.id !== quiz.id) {
      reset()
      startQuiz(quiz)
    }
  }, []) // eslint-disable-line

  // On finish — save score then go to results
  useEffect(() => {
    if (!isFinished || !user || !competition) return
    submitScore(user.id, score).then(() => {
      navigate(`/room/${joinCode}/results`)
    })
  }, [isFinished]) // eslint-disable-line

  if (!isStarted || !currentQuiz) {
    return (
      <div className="pt-32 text-center">
        <p className="font-body text-zinc-500 animate-pulse">Loading…</p>
      </div>
    )
  }

  const question = currentQuiz.questions[currentQuestionIndex]
  if (!question) return null

  const currentAnswer = answers.find((a) => a.questionId === question.id)
  const isAnswered = !!currentAnswer
  const isLastQuestion = currentQuestionIndex + 1 >= currentQuiz.questions.length

  return (
    <div className="pt-24 pb-20 px-4 max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <p className="font-body text-xs tracking-widest uppercase text-zinc-600 mb-1">
              {competition?.name}
            </p>
            <h1 className="font-display text-xl italic text-zinc-100">{currentQuiz.title}</h1>
          </div>
          <Timer isAnswered={isAnswered} />
        </div>
        <ProgressBar current={currentQuestionIndex} total={currentQuiz.questions.length} />
      </div>

      <div
        className="h-px mb-8"
        style={{ background: 'linear-gradient(90deg, transparent, #7c4d6e, transparent)' }}
      />

      <QuestionBlock
        key={question.id}
        question={question}
        onAnswer={answerQuestion}
        isAnswered={isAnswered}
        selectedAnswer={currentAnswer?.selectedAnswer ?? null}
      />

      {isAnswered && (
        <div className="mt-8 flex justify-end animate-fade-in">
          <button onClick={nextQuestion} className="btn-primary">
            {isLastQuestion ? 'Submit →' : 'Next →'}
          </button>
        </div>
      )}
    </div>
  )
}
