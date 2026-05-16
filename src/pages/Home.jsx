import { Link } from 'react-router-dom'
import { useRef } from 'react'
import Reveal from '../components/Reveal'
import NoirPoster from '../components/NoirPoster'
import quizzes from '../data/quizzes.json'

const sorted = [...quizzes].sort((a, b) => {
  if (a.id === 'name-that-series') return -1
  if (b.id === 'name-that-series') return 1
  return 0
})

const MARQUEE_ITEMS = [
  '"The Loyal Pin trended in 38 countries."',
  '★ GAP The Series — first ever full-length Thai GL.',
  '"Affair runs eight episodes, October 2024."',
  '✦ Show Me Love — EngLot\'s first GL collab.',
  '"23.5 streams on Netflix in SEA & Latin America."',
  '★ The Secret of Us — LingOrm, on Netflix, 2024.',
]

const ALMANAC_SHOWS = [
  { title: 'GAP', year: '2022', tone: '#d27a92' },
  { title: 'Affair', year: '2024', tone: '#c896e0' },
  { title: 'The Loyal Pin', year: '2024', tone: '#e5c068' },
  { title: 'The Secret of Us', year: '2024', tone: '#d27a92' },
  { title: '23.5', year: '2024', tone: '#c896e0' },
  { title: 'Pluto', year: '2025', tone: '#e5c068' },
  { title: '4 Elements', year: '2025', tone: '#d27a92' },
]

const P = {
  bg: '#08070c',
  surface: '#10101b',
  elevated: '#1a1828',
  overlay: '#231e38',
  border: '#241d36',
  border2: '#3a2e54',
  ink: '#f0ecf3',
  inkSoft: '#bcb4c8',
  inkMuted: '#7a708a',
  inkDim: '#544a64',
  rose: '#d27a92',
  rosePale: '#f4cad8',
  gold: '#e5c068',
  goldDeep: '#a07a30',
  mauve: '#a872c4',
  mauveDeep: '#5e3a7c',
  mauveGlow: '#c896e0',
}

export default function Home() {
  return (
    <div style={{ background: P.bg, color: P.ink, fontFamily: "'DM Sans', system-ui, sans-serif", position: 'relative', overflow: 'hidden' }}>

      {/* ── Global mood gradient ─────────────────────────── */}
      <div aria-hidden="true" style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: `
          radial-gradient(ellipse 80% 50% at 50% 0%, rgba(94,58,124,0.27), transparent 70%),
          radial-gradient(ellipse 60% 40% at 10% 30%, rgba(210,122,146,0.10), transparent 60%),
          radial-gradient(ellipse 60% 40% at 90% 60%, rgba(229,192,104,0.06), transparent 65%)
        `,
      }} />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section style={{ position: 'relative', zIndex: 1, minHeight: '75vh', overflow: 'hidden' }} className="sm:min-h-[820px]">

        {/* Mobile background image */}
        <div className="absolute inset-0 sm:hidden overflow-hidden" aria-hidden="true">
          <img
            src="/hero.jpg"
            alt=""
            className="w-full h-full object-cover"
            style={{ objectPosition: '65% center' }}
          />
          <div className="absolute inset-0" style={{ background: `${P.bg}99` }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${P.bg} 0%, ${P.bg}66 40%, transparent 100%)` }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${P.bg}bb 0%, transparent 70%)` }} />
        </div>

        {/* ghost letterform */}
        <div aria-hidden="true" style={{
          position: 'absolute',
          top: '50%', left: -60,
          transform: 'translateY(-50%)',
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontWeight: 600,
          fontSize: 'clamp(240px, 50vw, 720px)',
          lineHeight: 0.78,
          letterSpacing: '-0.04em',
          color: `${P.mauve}10`,
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          userSelect: 'none',
        }}>GL.</div>

        {/* split grid */}
        <div className="flex flex-col sm:grid sm:grid-cols-2 h-full" style={{ minHeight: 'inherit' }}>

          {/* Left — type */}
          <div className="relative z-10 flex flex-col justify-between px-5 sm:px-14 pt-24 sm:pt-20 pb-12 sm:pb-16">

            {/* kicker */}
            <div>
              <div className="flex items-center gap-3 mb-8 hero-anim" style={{ animationDelay: '0ms' }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '6px 12px',
                  background: `linear-gradient(95deg, ${P.gold}, ${P.goldDeep})`,
                  color: '#1a1208',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase',
                  fontWeight: 600,
                }}>
                  <span style={{ width: 5, height: 5, background: '#1a1208', borderRadius: '50%', display: 'inline-block' }} />
                  Late Night Edition
                </span>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase',
                  color: P.inkMuted,
                }}>presents · feature one</span>
              </div>

              <h1
                className="hero-anim"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: 'italic',
                  fontWeight: 500,
                  fontSize: 'clamp(52px, 9vw, 124px)',
                  lineHeight: 0.88,
                  letterSpacing: '-0.025em',
                  color: P.ink,
                  margin: '0 0 40px',
                  animationDelay: '150ms',
                }}
              >
                How well<br />
                do you <span style={{ color: P.gold }}>really</span><br />
                know your<br />
                <span style={{
                  background: `linear-gradient(110deg, ${P.rosePale} 0%, ${P.rose} 35%, ${P.mauveGlow} 75%, ${P.gold} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontWeight: 600,
                  paddingRight: '0.2em',
                }}>Thai GL?</span>
              </h1>
            </div>

            {/* credits + CTAs */}
            <div className="hero-anim" style={{ animationDelay: '300ms' }}>
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: 32,
                paddingBottom: 28, marginBottom: 28,
                borderBottom: `1px solid ${P.border2}`,
                width: 'fit-content',
              }}>
                {[['No.', '04'], ['Runtime', '4–10 min'], ['Featuring', '27 shows']].map(([k, v]) => (
                  <div key={k}>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: P.inkMuted, marginBottom: 6 }}>{k}</div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 28, color: P.ink, lineHeight: 1 }}>{v}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 items-start hero-anim" style={{ animationDelay: '440ms' }}>
                <Link to="/quizzes" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 14,
                  padding: '18px 32px',
                  background: `linear-gradient(110deg, ${P.rose}, ${P.mauve})`,
                  color: '#0d0617',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13, fontWeight: 700,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  textDecoration: 'none',
                  borderRadius: 2,
                  boxShadow: `0 20px 50px -20px ${P.mauveGlow}cc, inset 0 0 0 1px ${P.mauveGlow}66`,
                }}>
                  Browse Quizzes <span style={{ fontSize: 18 }}>→</span>
                </Link>
                <Link to="/quizzes" style={{
                  padding: '18px 22px',
                  color: P.gold,
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: 'italic', fontSize: 18,
                  textDecoration: 'none',
                  borderBottom: `1px solid ${P.gold}66`,
                }}>or skim the marquee →</Link>
              </div>
            </div>
          </div>

          {/* Right — hero photo (letterboxed) */}
          <div className="hidden sm:block relative overflow-hidden">
            <img
              src="/hero.jpg"
              alt="Two Thai GL actresses"
              style={{
                position: 'absolute', inset: '64px 0',
                width: '100%', height: 'calc(100% - 128px)',
                objectFit: 'cover', objectPosition: '65% center',
              }}
            />
            {/* letterbox bars */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 64, background: P.bg }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 64, background: P.bg }} />
            {/* color frame */}
            <div style={{
              position: 'absolute', top: 64, bottom: 64, left: 0, right: 0,
              boxShadow: `inset 0 0 0 1px rgba(229,192,104,0.2), inset 0 0 80px rgba(8,7,12,0.8)`,
            }} />
            {/* "now playing" card */}
            <div style={{
              position: 'absolute', bottom: 80, right: 40,
              padding: 16,
              background: 'rgba(8,7,12,0.55)',
              border: `1px solid ${P.gold}33`,
              backdropFilter: 'blur(10px)',
              maxWidth: 280,
            }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: P.gold, marginBottom: 8 }}>Now playing</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 22, lineHeight: 1.1, color: P.ink, marginBottom: 6 }}>The Loyal Pin · ep. 11</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: P.inkSoft }}>w/ FreenBecky · 16 ep · 2024</div>
            </div>
            {/* film code */}
            <div style={{
              position: 'absolute', top: 80, left: 24,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11, letterSpacing: '0.18em',
              color: `${P.gold}cc`,
            }}>REEL 04 · FRAME 1102</div>
          </div>
        </div>
      </section>

      {/* ── Marquee ticker ───────────────────────────────── */}
      <div style={{
        position: 'relative', zIndex: 1,
        padding: '14px 0',
        background: `linear-gradient(90deg, ${P.elevated}, ${P.overlay}, ${P.elevated})`,
        borderTop: `1px solid ${P.border2}`,
        borderBottom: `1px solid ${P.border2}`,
        overflow: 'hidden',
      }}>
        <div className="marquee-track" style={{
          display: 'inline-flex',
          whiteSpace: 'nowrap',
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontSize: 22,
          color: P.inkSoft,
        }}>
          {[0, 1].map((copy) => (
            <span key={copy} style={{ display: 'inline-flex', gap: 36, paddingRight: 36 }}>
              {MARQUEE_ITEMS.map((text, j) => (
                <span key={j} style={{ display: 'inline-flex', alignItems: 'center', gap: 36 }}>
                  <span style={{ color: P.gold }}>·</span>
                  <span>{text}</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ── Featured Quizzes ─────────────────────────────── */}
      <section style={{ position: 'relative', zIndex: 1 }} className="px-5 sm:px-14 py-20 sm:py-24">

        {/* section header */}
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-6">
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                <span style={{ width: 24, height: 1, background: P.gold, display: 'inline-block' }} />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: P.gold }}>The marquee</span>
              </div>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: 'italic',
                fontWeight: 500,
                fontSize: 'clamp(40px, 6vw, 80px)',
                lineHeight: 0.95,
                letterSpacing: '-0.018em',
                color: P.ink,
                margin: 0,
              }}>
                Five features.<br />
                <span style={{
                  background: `linear-gradient(110deg, ${P.mauveGlow}, ${P.gold})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>Pick your screening.</span>
              </h2>
            </div>

            {/* filter pills */}
            <div className="flex items-center gap-2 flex-wrap">
              {['All', 'Couples', 'Plot', 'Lore', 'General'].map((t, i) => (
                <span key={t} style={{
                  padding: '8px 16px',
                  border: `1px solid ${i === 0 ? P.mauveGlow : P.border2}`,
                  background: i === 0 ? `${P.mauveDeep}55` : 'transparent',
                  color: i === 0 ? P.ink : P.inkMuted,
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12, fontWeight: 500,
                  letterSpacing: '0.04em',
                  borderRadius: 999,
                  cursor: 'pointer',
                }}>{t}</span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* row 1: 1 large + 2 small */}
        <div className="grid grid-cols-1 sm:grid-cols-[1.5fr_1fr_1fr] gap-4 mb-4">
          {sorted.slice(0, 3).map((quiz, i) => (
            <Reveal key={quiz.id} delay={i * 100}>
              <NoirPoster quiz={quiz} index={i} large={i === 0} />
            </Reveal>
          ))}
        </div>

        {/* row 2: 3 + see-all */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {sorted.slice(3, 5).map((quiz, i) => (
            <Reveal key={quiz.id} delay={i * 100}>
              <NoirPoster quiz={quiz} index={i + 3} />
            </Reveal>
          ))}

          {/* see all card */}
          <Reveal delay={200}>
            <Link to="/quizzes" className="block h-full hover:-translate-y-[3px] transition-transform duration-[350ms] [transition-timing-function:cubic-bezier(.22,1,.36,1)]">
              <div style={{
                position: 'relative',
                background: `linear-gradient(135deg, ${P.elevated}, ${P.overlay})`,
                border: `1px solid ${P.border2}`,
                padding: '36px 32px',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                overflow: 'hidden',
                minHeight: 300,
                height: '100%',
              }}>
                <div style={{
                  position: 'absolute', right: -40, top: -40,
                  width: 160, height: 160, borderRadius: '50%',
                  background: `radial-gradient(circle, ${P.mauveGlow}33, transparent 70%)`,
                  filter: 'blur(20px)',
                }} />
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: P.gold }}>+ Showing all</div>
                <div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 34, lineHeight: 1.05, color: P.ink, marginBottom: 20 }}>
                    The full marquee — every quiz in rotation.
                  </div>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 10,
                    padding: '12px 20px',
                    background: 'rgba(255,255,255,0.06)',
                    border: `1px solid ${P.mauveGlow}66`,
                    color: P.ink,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 12, fontWeight: 600,
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                    textDecoration: 'none',
                  }}>
                    Open marquee →
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Almanac teaser ───────────────────────────────── */}
      <Reveal>
        <section style={{
          position: 'relative', zIndex: 1,
          background: P.surface,
          borderTop: `1px solid ${P.border}`,
          borderBottom: `1px solid ${P.border}`,
        }} className="px-5 sm:px-14 py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-10 sm:gap-14 items-center">
            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: P.gold, marginBottom: 12 }}>The almanac</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 44, lineHeight: 1, color: P.ink }}>
                27 shows, <span style={{ color: P.mauveGlow }}>2022—now.</span>
              </div>
            </div>
            <div className="flex items-stretch gap-2 overflow-x-auto">
              {ALMANAC_SHOWS.map((s) => (
                <div key={s.title} style={{
                  flex: '1 0 80px',
                  padding: '14px 12px',
                  border: `1px solid ${s.tone}44`,
                  background: 'rgba(255,255,255,0.02)',
                  minWidth: 0,
                }}>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic',
                    fontSize: 17, lineHeight: 1.15, color: P.ink, marginBottom: 4,
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  }}>{s.title}</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.18em', color: s.tone }}>{s.year}</div>
                </div>
              ))}
              <Link to="/about" style={{
                flex: '0 0 90px',
                padding: '14px 12px',
                border: `1px dashed ${P.border2}`,
                fontFamily: "'DM Sans', sans-serif", fontSize: 12,
                color: P.gold, textDecoration: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                textAlign: 'center',
              }}>+ 20 more</Link>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── Ticket-stub CTA ──────────────────────────────── */}
      <section style={{ position: 'relative', zIndex: 1 }} className="px-5 sm:px-14 py-20 sm:py-28">
        <Reveal>
          <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
            <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] relative overflow-hidden" style={{
              background: `linear-gradient(135deg, ${P.surface}, ${P.overlay})`,
              border: `1px solid ${P.border2}`,
            }}>
              {/* perforation line (desktop only) */}
              <div className="hidden sm:block" style={{
                position: 'absolute',
                left: '66.66%', top: 12, bottom: 12,
                width: 1,
                background: `repeating-linear-gradient(180deg, ${P.border2} 0, ${P.border2} 8px, transparent 8px, transparent 16px)`,
              }} />
              {/* notches */}
              <div className="hidden sm:block" style={{ position: 'absolute', left: '66.66%', top: -16, width: 32, height: 32, borderRadius: '50%', background: P.bg, transform: 'translateX(-50%)' }} />
              <div className="hidden sm:block" style={{ position: 'absolute', left: '66.66%', bottom: -16, width: 32, height: 32, borderRadius: '50%', background: P.bg, transform: 'translateX(-50%)' }} />

              {/* main side */}
              <div className="px-8 sm:px-16 py-12 sm:py-16 relative">
                <div style={{
                  position: 'absolute', right: 80, top: '50%', transform: 'translateY(-50%)',
                  width: 360, height: 360, borderRadius: '50%',
                  background: `radial-gradient(circle, ${P.mauveGlow}22, transparent 65%)`,
                  filter: 'blur(30px)',
                  pointerEvents: 'none',
                }} />
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: P.gold, marginBottom: 18 }}>Admission · one</div>
                <h2 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: 'italic', fontWeight: 500,
                  fontSize: 'clamp(40px, 5.5vw, 78px)',
                  lineHeight: 0.96, letterSpacing: '-0.022em',
                  color: P.ink, margin: '0 0 28px',
                  position: 'relative', zIndex: 1,
                }}>
                  Ready to prove your<br />
                  <span style={{
                    background: `linear-gradient(95deg, ${P.rose}, ${P.mauveGlow}, ${P.gold})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>GL knowledge?</span>
                </h2>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 15, lineHeight: 1.65,
                  color: P.inkSoft, margin: '0 0 36px', maxWidth: 540,
                  position: 'relative', zIndex: 1,
                }}>
                  From easy couple-matching to hard lore deep-dives — pick a feature, take a seat, and find out where you stand. Solo or with five friends in a live room.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 items-start relative" style={{ zIndex: 1 }}>
                  <Link to="/quizzes" style={{
                    display: 'inline-flex', alignItems: 'center', gap: 14,
                    padding: '18px 36px',
                    background: `linear-gradient(110deg, ${P.rose}, ${P.mauve})`,
                    color: '#0d0617',
                    fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 700,
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                    textDecoration: 'none', borderRadius: 2,
                    boxShadow: `0 20px 50px -20px ${P.mauveGlow}cc`,
                  }}>
                    Take a quiz now <span style={{ fontSize: 18 }}>→</span>
                  </Link>
                  <Link to="/compete" style={{
                    display: 'inline-flex', alignItems: 'center', gap: 10,
                    padding: '18px 24px',
                    border: `1px solid ${P.border2}`,
                    color: P.ink,
                    fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500,
                    letterSpacing: '0.04em',
                    textDecoration: 'none', borderRadius: 2,
                  }}>
                    Start a 6-seat room →
                  </Link>
                </div>
              </div>

              {/* stub side */}
              <div className="hidden sm:flex flex-col justify-between px-14 py-16" style={{ background: `linear-gradient(135deg, ${P.elevated}, ${P.surface})` }}>
                {[['Showtime', 'now', P.ink], ['Hall', 'sàppharot', P.gold], ['Edition', '№ 04', P.mauveGlow]].map(([label, val, color]) => (
                  <div key={label}>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase', color: P.inkMuted, marginBottom: 6 }}>{label}</div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 26, color, lineHeight: 1 }}>{val}</div>
                  </div>
                ))}
                <div style={{ paddingTop: 16, borderTop: `1px solid ${P.border}`, fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 14, color: P.inkDim, lineHeight: 1.45 }}>
                  printed nightly,<br />kept lightly.
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── Footer ───────────────────────────────────────── */}
      <footer style={{
        position: 'relative', zIndex: 1,
        background: P.surface,
        borderTop: `1px solid ${P.border}`,
      }} className="px-5 sm:px-14 pt-12 pb-9">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-9 mb-10">
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 26, color: P.ink, marginBottom: 6 }}>Emenize Ben Yafit</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: P.inkMuted, maxWidth: 320, lineHeight: 1.6 }}>
              A late-night cinema for Thai GL. Fan site · not affiliated with any studio, network, or production. Made with love in Tel Aviv.
            </div>
          </div>
          <div className="flex gap-12">
            {[
              ['The marquee', [['Quizzes', '/quizzes'], ['Compete', '/compete'], ['Leaderboard', '/leaderboard']]],
              ['The almanac', [['About', '/about'], ['Pairings', '/about'], ['Archive', '/about']]],
            ].map(([title, items]) => (
              <div key={title}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase', color: P.gold, marginBottom: 14 }}>{title}</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {items.map(([label, href]) => (
                    <li key={label}><Link to={href} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: P.inkSoft, textDecoration: 'none' }}>{label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div style={{
          paddingTop: 20, borderTop: `1px solid ${P.border}`,
          display: 'flex', flexDirection: 'column', gap: 4,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase',
          color: P.inkDim,
        }} className="sm:flex-row sm:justify-between">
          <span>© 2026 Mika Bibas</span>
          <span>Reel 04 · printed in tel aviv</span>
          <span>Set in Cormorant &amp; DM Sans</span>
        </div>
      </footer>
    </div>
  )
}
