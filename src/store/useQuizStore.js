import { create } from 'zustand'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/**
 * Central quiz state. Session flow:
 * startQuiz → answerQuestion (records answer, stays on question) →
 * nextQuestion (advances index) → ... → isFinished → reset
 */
const useQuizStore = create((set, get) => ({
  currentQuiz: null,
  currentQuestionIndex: 0,
  answers: [],        // [{ questionId, selectedAnswer, isCorrect }]
  score: 0,
  timeLeft: 30,
  isFinished: false,
  isStarted: false,

  startQuiz: (quiz) => {
    const shuffledQuiz = {
      ...quiz,
      questions: quiz.questions.map((q) => ({ ...q, options: shuffle(q.options) })),
    }
    set({
      currentQuiz: shuffledQuiz,
      currentQuestionIndex: 0,
      answers: [],
      score: 0,
      timeLeft: 30,
      isFinished: false,
      isStarted: true,
    })
  },

  /** Records the answer for the current question. Does NOT advance the index. */
  answerQuestion: (selectedAnswer) => {
    const { currentQuiz, currentQuestionIndex, answers, score } = get()
    if (!currentQuiz) return

    const question = currentQuiz.questions[currentQuestionIndex]
    // Prevent double-answering
    if (answers.find((a) => a.questionId === question.id)) return

    const isCorrect = selectedAnswer === question.correctAnswer

    set({
      answers: [...answers, { questionId: question.id, selectedAnswer, isCorrect }],
      score: isCorrect ? score + 1 : score,
    })
  },

  /** Advances to the next question (or marks finished if on the last). */
  nextQuestion: () => {
    const { currentQuiz, currentQuestionIndex } = get()
    if (!currentQuiz) return

    const nextIndex = currentQuestionIndex + 1
    const isFinished = nextIndex >= currentQuiz.questions.length

    set({ currentQuestionIndex: nextIndex, timeLeft: 30, isFinished })
  },

  /** Called by the Timer when time runs out — records a null answer and advances. */
  timeExpired: () => {
    const { currentQuiz, currentQuestionIndex, answers } = get()
    if (!currentQuiz) return

    const question = currentQuiz.questions[currentQuestionIndex]
    if (answers.find((a) => a.questionId === question.id)) return

    set({
      answers: [...answers, { questionId: question.id, selectedAnswer: null, isCorrect: false }],
    })
  },

  setTimeLeft: (t) => set({ timeLeft: t }),

  reset: () =>
    set({
      currentQuiz: null,
      currentQuestionIndex: 0,
      answers: [],
      score: 0,
      timeLeft: 30,
      isFinished: false,
      isStarted: false,
    }),
}))

export default useQuizStore
