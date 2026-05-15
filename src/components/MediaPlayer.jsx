import { useState, useRef } from 'react'

/**
 * Audio snippet player UI for audio-type quiz questions.
 * Accepts a `src` prop (placeholder until real audio is wired up).
 * @param {{ src: string | null }} props
 */
export default function MediaPlayer({ src }) {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef(null)

  const toggle = () => {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(() => {})
    }
    setPlaying((v) => !v)
  }

  const onTimeUpdate = () => {
    if (!audioRef.current) return
    const { currentTime, duration } = audioRef.current
    if (duration) setProgress((currentTime / duration) * 100)
  }

  const onEnded = () => {
    setPlaying(false)
    setProgress(0)
  }

  return (
    <div className="flex items-center gap-4 bg-bg-elevated border border-border-subtle rounded-xl px-5 py-4 max-w-sm">
      {src && (
        <audio
          ref={audioRef}
          src={src}
          onTimeUpdate={onTimeUpdate}
          onEnded={onEnded}
          preload="metadata"
        />
      )}

      <button
        onClick={toggle}
        disabled={!src}
        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 shrink-0 ${
          src
            ? 'bg-mauve-deep hover:bg-mauve-mid hover:shadow-glow-mauve active:scale-95'
            : 'bg-bg-overlay opacity-40 cursor-not-allowed'
        }`}
        aria-label={playing ? 'Pause' : 'Play'}
      >
        {playing ? (
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      <div className="flex-1">
        <div className="h-1 bg-bg-overlay rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-mauve-deep to-rose-dust rounded-full transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="font-body text-xs text-zinc-500 mt-1.5">
          {src ? 'Listen to the audio clip' : 'Audio coming soon'}
        </p>
      </div>
    </div>
  )
}
