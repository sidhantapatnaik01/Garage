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
      },
      animation: {
        blink: 'blink 0.7s step-end infinite',
        twinkle: 'twinkle var(--dur, 4s) ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
