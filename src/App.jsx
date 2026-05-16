import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import AuthModal from './components/AuthModal'
import Home from './pages/Home'
import QuizBrowser from './pages/QuizBrowser'
import QuizPlayer from './pages/QuizPlayer'
import Results from './pages/Results'
import About from './pages/About'
import Profile from './pages/Profile'
import Leaderboard from './pages/Leaderboard'
import Compete from './pages/Compete'
import WaitingRoom from './pages/WaitingRoom'
import CompetitionPlay from './pages/CompetitionPlay'
import CompetitionResults from './pages/CompetitionResults'
import useAuthStore from './store/useAuthStore'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function AuthInit() {
  const init = useAuthStore((s) => s.init)
  useEffect(() => { const unsub = init(); return unsub }, [init])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthInit />
      <ScrollToTop />
      <div className="flex flex-col min-h-dvh">
        <Navbar />
        <AuthModal />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quizzes" element={<QuizBrowser />} />
            <Route path="/quiz/:id" element={<QuizPlayer />} />
            <Route path="/results" element={<Results />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/compete" element={<Compete />} />
            <Route path="/room/:joinCode" element={<WaitingRoom />} />
            <Route path="/room/:joinCode/play" element={<CompetitionPlay />} />
            <Route path="/room/:joinCode/results" element={<CompetitionResults />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
