import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { to: '/quizzes', label: 'Quizzes' },
  { to: '/about', label: 'About' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-bg-base/95 backdrop-blur-md border-b border-border-subtle shadow-[0_1px_0_rgba(201,139,139,0.05)]' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex flex-col leading-none group">
          <span className="font-display text-xl italic text-zinc-100 group-hover:text-gradient-rose transition-all duration-300">
            Enemize Ben Yafit
          </span>
          <span className="font-body text-[10px] tracking-[0.2em] uppercase text-mauve-pale/70 mt-0.5">
            สัพพรส
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-1">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-body text-sm transition-all duration-200 ${
                  isActive
                    ? 'text-rose-pale bg-rose-dust/10'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-bg-elevated'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <Link to="/quizzes" className="ml-3 btn-primary text-xs">
            Take a Quiz
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="sm:hidden p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-bg-elevated transition-colors"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden bg-bg-surface/98 backdrop-blur-md border-b border-border-subtle animate-fade-in">
          <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-lg font-body text-sm transition-colors ${
                    isActive ? 'text-rose-pale bg-rose-dust/10' : 'text-zinc-300 hover:text-zinc-100 hover:bg-bg-elevated'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            <Link to="/quizzes" className="btn-primary mt-2 justify-center text-sm">
              Take a Quiz
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
