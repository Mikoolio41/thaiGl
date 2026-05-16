import { Link } from 'react-router-dom'
import DifficultyMeter from './DifficultyMeter'

const TONE_COLORS = {
  rose:     '#d27a92',
  gold:     '#e5c068',
  mauve:    '#c896e0',
  sepia:    '#e5c068',
  midnight: '#c896e0',
}

const TONE_BG = {
  rose:     'rgba(210,122,146,0.55)',
  gold:     'rgba(229,192,104,0.45)',
  mauve:    'rgba(200,150,224,0.45)',
  sepia:    'rgba(229,192,104,0.45)',
  midnight: 'rgba(200,150,224,0.45)',
}

export default function NoirPoster({ quiz, index, large = false }) {
  const idx = String(index + 1).padStart(2, '0')
  const tone = quiz.tone ?? 'rose'
  const toneColor = TONE_COLORS[tone] ?? TONE_COLORS.rose
  const toneBg    = TONE_BG[tone]    ?? TONE_BG.rose

  const cardStyle = {
    position: 'relative',
    background: '#10101b',
    border: '1px solid #3a2e54',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    minHeight: large ? 420 : 360,
    cursor: 'pointer',
    transition: 'transform 350ms cubic-bezier(.22,1,.36,1)',
  }

  const photoHeight = large ? 240 : 200

  if (quiz.comingSoon) {
    return (
      <article
        style={cardStyle}
        className="hover:-translate-y-[3px]"
      >
        {/* top banner */}
        <div style={{
          padding: '14px 22px',
          borderBottom: '1px solid #241d36',
          background: `linear-gradient(90deg, rgba(229,192,104,0.06), transparent 70%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9, letterSpacing: '0.26em', textTransform: 'uppercase',
            color: '#e5c068',
          }}>
            <span className="prod-dot" style={{
              width: 5, height: 5,
              background: '#e5c068',
              borderRadius: '50%',
              display: 'inline-block',
            }} />
            Upcoming
          </span>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: 16,
            color: '#e5c068',
          }}>{quiz.releaseDate ?? 'Coming soon'}</span>
        </div>

        {/* photo region */}
        <div style={{ position: 'relative', flex: 1, minHeight: photoHeight, overflow: 'hidden' }}>
          {quiz.coverImage ? (
            <img
              src={quiz.coverImage}
              alt=""
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <div style={{
              position: 'absolute', inset: 0,
              background: `radial-gradient(ellipse at 35% 40%, ${toneColor}44, transparent 60%),
                           radial-gradient(ellipse at 70% 65%, ${toneColor}22, transparent 55%),
                           linear-gradient(160deg, #0e0c15 0%, #1a1828 100%)`,
            }} />
          )}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, rgba(8,7,12,0.33) 0%, transparent 30%, rgba(8,7,12,0.87) 100%)',
          }} />
          <div style={{
            position: 'absolute', top: 18, right: 22,
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: 56, lineHeight: 0.8,
            color: 'rgba(255,255,255,0.5)',
            textShadow: '0 4px 16px rgba(0,0,0,0.6)',
          }}>{idx}</div>
          <div style={{
            position: 'absolute', bottom: 16, left: 20,
            padding: '5px 10px',
            background: 'rgba(8,7,12,0.55)',
            border: '1px solid #3a2e54',
            backdropFilter: 'blur(8px)',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 10, fontWeight: 600,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            color: '#bcb4c8',
          }}>{quiz.seriesTag}</div>
        </div>

        {/* lower content */}
        <div style={{ padding: '20px 24px 24px', borderTop: '1px solid #241d36' }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase',
            color: '#7a708a', marginBottom: 8,
          }}>
            {quiz.category} · scene {idx}
          </div>
          <h3 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: large ? 38 : 26,
            lineHeight: 1,
            color: '#f0ecf3',
            margin: '0 0 12px',
            fontWeight: 500,
          }}>{quiz.title}</h3>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13, lineHeight: 1.5,
            color: '#bcb4c8', margin: 0,
          }}>{quiz.description}</p>
          <div style={{
            marginTop: 16, paddingTop: 14,
            borderTop: '1px solid #241d36',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <DifficultyMeter level={quiz.difficulty} color={toneColor} />
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase',
              color: '#7a708a',
            }}>{quiz.questionCount}q · {quiz.estimatedMinutes}min</span>
          </div>
        </div>
      </article>
    )
  }

  // Active poster
  return (
    <Link to={`/quiz/${quiz.id}`} className="block hover:-translate-y-[3px] transition-transform duration-[350ms] [transition-timing-function:cubic-bezier(.22,1,.36,1)]">
      <article style={cardStyle}>
        {/* photo region */}
        <div style={{ position: 'relative', flex: 1, minHeight: photoHeight, overflow: 'hidden' }}>
          {quiz.coverImage ? (
            <img
              src={quiz.coverImage}
              alt=""
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <div style={{
              position: 'absolute', inset: 0,
              background: `radial-gradient(ellipse at 35% 40%, ${toneColor}55, transparent 60%),
                           radial-gradient(ellipse at 70% 65%, ${toneColor}22, transparent 55%),
                           linear-gradient(160deg, #0e0c15 0%, #1a1828 100%)`,
            }} />
          )}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, transparent 30%, rgba(8,7,12,0.8) 100%)',
          }} />

          {/* top tags */}
          <div style={{
            position: 'absolute', top: 20, left: 20, right: 20,
            display: 'flex', justifyContent: 'space-between', alignItems: 'start',
          }}>
            <span style={{
              padding: '5px 10px',
              background: toneBg,
              border: `1px solid ${toneColor}88`,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 10, fontWeight: 600,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              color: '#f0ecf3',
              backdropFilter: 'blur(6px)',
            }}>{quiz.seriesTag}</span>
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontSize: 56, lineHeight: 0.8,
              color: 'rgba(255,255,255,0.85)',
              textShadow: '0 4px 12px rgba(0,0,0,0.5)',
            }}>{idx}</span>
          </div>
        </div>

        {/* lower content */}
        <div style={{ padding: '20px 24px 24px' }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase',
            color: toneColor, marginBottom: 8,
          }}>
            {quiz.category} · open
          </div>
          <h3 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: large ? 38 : 26,
            lineHeight: 1,
            color: '#f0ecf3',
            margin: '0 0 12px',
            fontWeight: 500,
          }}>{quiz.title}</h3>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13, lineHeight: 1.5,
            color: '#bcb4c8', margin: 0,
          }}>{quiz.description}</p>
          <div style={{
            marginTop: 16, paddingTop: 14,
            borderTop: '1px solid #241d36',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <DifficultyMeter level={quiz.difficulty} color={toneColor} />
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase',
              color: '#7a708a',
            }}>{quiz.questionCount}q · {quiz.estimatedMinutes}min</span>
          </div>
        </div>
      </article>
    </Link>
  )
}
