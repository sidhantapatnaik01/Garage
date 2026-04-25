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
        particleFloat: {
          '0%': { transform: 'translateY(0) translateX(0)', opacity: '0' },
          '10%': { opacity: '0.4' },
          '90%': { opacity: '0.4' },
          '100%': { transform: 'translateY(-100vh) translateX(40px)', opacity: '0' },
        },
        meshRotate: {
          from: { filter: 'hue-rotate(0deg)' },
          to: { filter: 'hue-rotate(360deg)' },
        },
        logoPulse: {
          '0%, 100%': { boxShadow: '0 4px 16px rgba(230,57,70,0.4)' },
          '50%': { boxShadow: '0 4px 28px rgba(230,57,70,0.6)' },
        },
        scrollDot: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.5' },
          '50%': { transform: 'translateY(12px)', opacity: '1' },
        },
        floatCTA: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        blink: { '50%': { opacity: '0' } },
        damagePulse: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.4)' },
        },
        handleGlow: {
          '0%, 100%': { boxShadow: '0 8px 32px rgba(0,0,0,0.4)' },
          '50%': { boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 20px 4px rgba(255,255,255,0.1)' },
        },
        starPop: {
          from: { transform: 'scale(0) rotate(-20deg)', opacity: '0' },
          to: { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
        pulse: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.3)' },
        },
      },
      animation: {
        particle: 'particleFloat var(--dur, 20s) linear infinite',
        'mesh-rotate': 'meshRotate 20s linear infinite',
        'logo-pulse': 'logoPulse 3s ease-in-out infinite',
        'scroll-dot': 'scrollDot 2s ease-in-out infinite',
        'float-cta': 'floatCTA 3s ease-in-out infinite',
        blink: 'blink 0.7s step-end infinite',
        'damage-pulse': 'damagePulse 2s ease-in-out infinite',
        'handle-glow': 'handleGlow 2s ease-in-out infinite',
        'star-pop': 'starPop 0.3s ease-out both',
        pulse: 'pulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
