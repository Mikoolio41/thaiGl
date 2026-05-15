import { useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import useQuizStore from '../store/useQuizStore'
import QuestionBlock from '../components/QuestionBlock'
import ProgressBar from '../components/ProgressBar'
import Timer from '../components/Timer'
import quizzes from '../data/quizzes.json'

export default function QuizPlayer() {
  const { id } = useParams()
  const navigate = useNavigate()
  const {
    currentQuiz,
    currentQuestionIndex,
    answers,
    isFinished,
    isStarted,
    startQuiz,
    answerQuestion,
    nextQuestion,
    reset,
  } = useQuizStore()

  const quizData = quizzes.find((q) => q.id === id)

  useEffect(() => {
    if (!quizData) return
    if (!currentQuiz || currentQuiz.id !== quizData.id) {
      reset()
      startQuiz(quizData)
    }
  }, [id]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isFinished) navigate('/results')
  }, [isFinished, navigate])

  if (!quizData) {
    return (
      <div className="pt-24 px-4 text-center">
        <h1 className="font-display text-2xl italic text-zinc-400">Quiz not found</h1>
        <Link to="/quizzes" className="btn-ghost mt-6 inline-flex">← Browse quizzes</Link>
      </div>
    )
  }

  if (!isStarted || !currentQuiz) {
    return (
      <div className="pt-24 px-4 text-center">
        <p className="font-body text-zinc-500">Loading…</p>
      </div>
    )
  }

  const question = currentQuiz.questions[currentQuestionIndex]
  if (!question) return null

  // The current question is "answered" once an entry exists in the answers array for it.
  const currentAnswer = answers.find((a) => a.questionId === question.id)
  const isAnswered = !!currentAnswer
  const isLastQuestion = currentQuestionIndex + 1 >= currentQuiz.questions.length

  const handleNext = () => {
    nextQuestion()
  }

  return (
    <div className="pt-24 pb-20 px-4 max-w-2xl mx-auto">
      {/* Quiz header */}
      <div className="mb-8">
        <Link
          to="/quizzes"
          className="inline-flex items-center gap-1.5 font-body text-xs text-zinc-600 hover:text-zinc-400 transition-colors mb-6"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          All Quizzes
        </Link>

        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <p className="font-body text-xs tracking-widest uppercase text-zinc-600 mb-1">
              {currentQuiz.category}
            </p>
            <h1 className="font-display text-xl italic text-zinc-100">{currentQuiz.title}</h1>
          </div>
          <Timer isAnswered={isAnswered} />
        </div>

        <ProgressBar current={currentQuestionIndex} total={currentQuiz.questions.length} />
      </div>

      {/* Decorative rule */}
      <div
        className="h-px mb-8"
        style={{ background: 'linear-gradient(90deg, transparent, #7c4d6e, transparent)' }}
      />

      {/* Question — key forces full remount on question change so local state resets cleanly */}
      <QuestionBlock
        key={question.id}
        question={question}
        onAnswer={answerQuestion}
        isAnswered={isAnswered}
        selectedAnswer={currentAnswer?.selectedAnswer ?? null}
      />

      {/* Next / Results button shown after answering */}
      {isAnswered && (
        <div className="mt-8 flex justify-end animate-fade-in">
          {isLastQuestion ? (
            <button onClick={handleNext} className="btn-primary">
              See Results →
            </button>
          ) : (
            <button onClick={handleNext} className="btn-primary">
              Next Question →
            </button>
          )}
        </div>
      )}
    </div>
  )
}
