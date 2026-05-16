import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/quizzes', label: 'Quizzes' },
  { to: '/compete', label: 'Compete' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/about', label: 'About' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, profile, signOut, openModal } = useAuthStore()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false); setUserMenuOpen(false) }, [location])

  const displayName = profile?.username ?? user?.email?.split('@')[0] ?? 'You'
  const avatarUrl = profile?.avatar_url

  const isHome = location.pathname === '/'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'backdrop-blur-lg border-b'
          : ''
      } ${
        isHome
          ? scrolled ? 'bg-[#08070c]/80 border-[#241d36]' : 'bg-transparent'
          : scrolled ? 'bg-bg-base/90 border-border-subtle' : 'bg-transparent'
      }`}
    >
      <nav className="w-full px-5 sm:px-14 h-14 flex items-center justify-between sm:grid sm:grid-cols-[1fr_auto_1fr]">
        {/* Logo — left */}
        <Link to="/" className="group flex items-center gap-3">
          {isHome ? (
            <>
              <span style={{
                width: 32, height: 32, borderRadius: '50%',
                background: 'conic-gradient(from 0deg, #d27a92, #e5c068, #a872c4, #d27a92)',
                padding: 2, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <span style={{
                  width: '100%', height: '100%', borderRadius: '50%',
                  background: '#08070c',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic',
                  fontSize: 16, color: '#e5c068',
                }}>e</span>
              </span>
              <span className="flex flex-col">
                <span className="font-display text-[18px] italic text-white leading-none">Emenize Ben Yafit</span>
                <span className="hidden sm:block font-mono text-[9px] tracking-[0.28em] uppercase mt-1" style={{ color: '#c896e0' }}>สัพพรส · all flavors</span>
              </span>
            </>
          ) : (
            <>
              <span className="font-display text-lg italic text-white group-hover:text-rose-pale transition-colors duration-200">
                Emenize Ben Yafit
              </span>
              <span className="font-body text-[9px] tracking-[0.22em] uppercase text-zinc-600 hidden sm:block">
                สัพพรส
              </span>
            </>
          )}
        </Link>

        {/* Nav links — center */}
        <div className="hidden sm:flex items-center gap-6">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `font-body text-sm transition-colors duration-200 pb-0.5 border-b ${
                  isActive
                    ? isHome ? 'text-white border-[#c896e0]' : 'text-white border-rose-dust'
                    : isHome ? 'text-[#bcb4c8] border-transparent hover:text-white hover:border-[#c896e0]' : 'text-zinc-500 border-transparent hover:text-zinc-200 hover:border-zinc-600'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Profile — right */}
        <div className="hidden sm:flex items-center justify-end">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen((v) => !v)}
                className="flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-lg border border-border-strong hover:border-border-subtle bg-bg-elevated hover:bg-bg-overlay transition-all duration-200"
              >
                {avatarUrl ? (
                  <img src={avatarUrl} alt={displayName} className="w-5 h-5 rounded-full object-cover" />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-mauve-deep flex items-center justify-center text-[10px] font-medium text-white">
                    {displayName[0].toUpperCase()}
                  </div>
                )}
                <span className="font-body text-xs text-zinc-300 max-w-[100px] truncate">{displayName}</span>
                <svg className="w-3 h-3 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-44 bg-bg-surface border border-border-strong rounded-xl shadow-xl overflow-hidden animate-fade-in">
                  <button
                    onClick={() => { navigate('/profile'); setUserMenuOpen(false) }}
                    className="w-full text-left px-4 py-3 font-body text-sm text-zinc-400 hover:text-white hover:bg-bg-elevated transition-colors"
                  >
                    Profile
                  </button>
                  <div className="border-t border-border-subtle" />
                  <button
                    onClick={() => { signOut(); setUserMenuOpen(false) }}
                    className="w-full text-left px-4 py-3 font-body text-sm text-zinc-400 hover:text-white hover:bg-bg-elevated transition-colors"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={openModal}
              className="font-body text-xs font-medium px-4 py-2 rounded-md bg-rose-dust/10 text-rose-pale border border-rose-dust/20 hover:bg-rose-dust/20 hover:border-rose-dust/40 transition-all duration-200"
            >
              Sign In
            </button>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="sm:hidden p-1.5 text-zinc-400 hover:text-white transition-colors"
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
        <div className="sm:hidden bg-bg-base/98 backdrop-blur-lg border-b border-border-subtle animate-fade-in">
          <div className="max-w-6xl mx-auto px-5 py-5 flex flex-col gap-1">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `px-3 py-2.5 font-body text-sm transition-colors rounded-lg ${
                    isActive ? 'text-white bg-rose-dust/10' : 'text-zinc-400 hover:text-white'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            {user ? (
              <>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `px-3 py-2.5 font-body text-sm transition-colors rounded-lg ${
                      isActive ? 'text-white bg-rose-dust/10' : 'text-zinc-400 hover:text-white'
                    }`
                  }
                >
                  Profile
                </NavLink>
                <button
                  onClick={signOut}
                  className="px-3 py-2.5 font-body text-sm text-zinc-400 hover:text-white text-left transition-colors rounded-lg"
                >
                  Sign out ({displayName})
                </button>
              </>
            ) : (
              <button onClick={openModal} className="btn-primary mt-3 justify-center">
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
