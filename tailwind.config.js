/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        noir: {
          bg:         '#08070c',
          surface:    '#10101b',
          elevated:   '#1a1828',
          overlay:    '#231e38',
          border:     '#241d36',
          'border-2': '#3a2e54',
          ink:        '#f0ecf3',
          'ink-soft': '#bcb4c8',
          'ink-muted':'#7a708a',
          'ink-dim':  '#544a64',
        },
        bg: {
          base: '#0c0b0f',
          surface: '#141218',
          elevated: '#1c1820',
          overlay: '#251f2b',
        },
        rose: {
          dust: '#c4708a',
          muted: '#9e4d6a',
          pale: '#f0c8d8',
        },
        gold: {
          warm: '#d4aa50',
          muted: '#a07c30',
          pale: '#f0dfa0',
        },
        mauve: {
          deep: '#6b3d78',
          mid: '#9a60a8',
          pale: '#c8a8d8',
        },
        border: {
          subtle: '#281e30',
          strong: '#3d2848',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body:    ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(1.8rem, 4vw, 3.5rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'display-md': ['clamp(1.4rem, 3vw, 2.25rem)', { lineHeight: '1.2' }],
      },
      boxShadow: {
        'glow-rose': '0 0 30px rgba(196, 112, 138, 0.18), 0 0 60px rgba(196, 112, 138, 0.07)',
        'glow-gold': '0 0 30px rgba(212, 170, 80, 0.18), 0 0 60px rgba(212, 170, 80, 0.07)',
        'glow-mauve': '0 0 30px rgba(107, 61, 120, 0.25), 0 0 60px rgba(107, 61, 120, 0.1)',
        'card-hover':  '0 8px 40px rgba(196, 112, 138, 0.14), 0 2px 8px rgba(0,0,0,0.5)',
        'noir-cta':   '0 20px 50px -20px rgb(200 150 224 / 0.8), inset 0 0 0 1px rgb(200 150 224 / 0.4)',
        'noir-lift':  '0 12px 32px -12px rgb(200 150 224 / 0.5)',
      },
      backgroundImage: {
        'gradient-hero': 'radial-gradient(ellipse at 60% 0%, rgba(107,61,120,0.22) 0%, transparent 60%), radial-gradient(ellipse at 10% 80%, rgba(196,112,138,0.12) 0%, transparent 50%)',
        'gradient-card': 'linear-gradient(135deg, #1c1820 0%, #141218 100%)',
        'gradient-mauve': 'linear-gradient(135deg, rgba(107,61,120,0.35) 0%, rgba(196,112,138,0.18) 100%)',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0', transform: 'translateY(10px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        fadeUp: { from: { opacity: '0', transform: 'translateY(24px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        glowPulse: { '0%, 100%': { opacity: '0.6' }, '50%': { opacity: '1' } },
        progressFill: { from: { width: '0%' }, to: { width: 'var(--progress-width)' } },
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'fade-up': 'fadeUp 0.5s ease-out',
        'fade-up-delay': 'fadeUp 0.5s ease-out 0.15s both',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'progress-fill': 'progressFill 0.6s ease-out forwards',
      },
    },
  },
  plugins: [],
}
