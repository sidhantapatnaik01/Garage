import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#e63946',
          dark: '#c62828',
          light: '#ff6b6b',
        },
        surface: {
          DEFAULT: '#060606',
          100: '#080808',
          200: '#050505',
          300: '#0a0a0a',
        },
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        blink: { '50%': { opacity: '0' } },
        twinkle: {
          '0%, 100%': { opacity: 'var(--p-opacity, 0.3)' },
          '50%': { opacity: 'calc(var(--p-opacity, 0.3) * 2)' },
        },
        orbFloat: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '33%':      { transform: 'translate3d(40px, -30px, 0) scale(1.08)' },
          '66%':      { transform: 'translate3d(-30px, 30px, 0) scale(0.95)' },
        },
      },
      animation: {
        blink: 'blink 0.7s step-end infinite',
        twinkle: 'twinkle var(--dur, 4s) ease-in-out infinite',
        'orb-slow': 'orbFloat 22s ease-in-out infinite',
        'orb-fast': 'orbFloat 16s ease-in-out infinite reverse',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
