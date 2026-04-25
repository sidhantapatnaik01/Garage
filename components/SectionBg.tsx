// Reusable animated background — soft blurred gradient orbs that drift slowly.
// CSS-only (transform/opacity), GPU-accelerated, cheap on mobile.
// Honors prefers-reduced-motion via Tailwind's `motion-reduce:` modifier.

const TONES = {
  accent: { primary: '#e63946', secondary: '#3b82f6' },
  blue:   { primary: '#3b82f6', secondary: '#06b6d4' },
  green:  { primary: '#10b981', secondary: '#14b8a6' },
  purple: { primary: '#8b5cf6', secondary: '#ec4899' },
  mixed:  { primary: '#e63946', secondary: '#8b5cf6' },
} as const

type Tone = keyof typeof TONES

export default function SectionBg({ tone = 'accent' }: { tone?: Tone }) {
  const { primary, secondary } = TONES[tone]
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full blur-[120px] opacity-[0.10] motion-safe:animate-orb-slow will-change-transform"
        style={{ background: primary }}
      />
      <div
        className="absolute -bottom-32 -right-32 w-[520px] h-[520px] rounded-full blur-[110px] opacity-[0.08] motion-safe:animate-orb-fast will-change-transform"
        style={{ background: secondary }}
      />
    </div>
  )
}
