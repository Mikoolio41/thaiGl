/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          base: '#0d0d0d',
          surface: '#161616',
          elevated: '#1e1c1c',
          overlay: '#262224',
        },
        rose: {
          dust: '#c98b8b',
          muted: '#9e6060',
          pale: '#e8c5c5',
        },
        gold: {
          warm: '#c9a84c',
          muted: '#9e7f35',
          pale: '#ecdfa8',
        },
        mauve: {
          deep: '#7c4d6e',
          mid: '#9e6a8e',
          pale: '#c9a8bc',
        },
        border: {
          subtle: '#2a2228',
          strong: '#3d3040',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(1.8rem, 4vw, 3.5rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'display-md': ['clamp(1.4rem, 3vw, 2.25rem)', { lineHeight: '1.2' }],
      },
      boxShadow: {
        'glow-rose': '0 0 30px rgba(201, 139, 139, 0.15), 0 0 60px rgba(201, 139, 139, 0.05)',
        'glow-gold': '0 0 30px rgba(201, 168, 76, 0.15), 0 0 60px rgba(201, 168, 76, 0.05)',
        'glow-mauve': '0 0 30px rgba(124, 77, 110, 0.2), 0 0 60px rgba(124, 77, 110, 0.08)',
        'card-hover': '0 8px 40px rgba(201, 139, 139, 0.12), 0 2px 8px rgba(0,0,0,0.4)',
      },
      backgroundImage: {
        'gradient-hero': 'radial-gradient(ellipse at 60% 0%, rgba(124,77,110,0.18) 0%, transparent 60%), radial-gradient(ellipse at 10% 80%, rgba(201,139,139,0.1) 0%, transparent 50%)',
        'gradient-card': 'linear-gradient(135deg, #1e1c1c 0%, #161416 100%)',
        'gradient-mauve': 'linear-gradient(135deg, rgba(124,77,110,0.3) 0%, rgba(201,139,139,0.15) 100%)',
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
