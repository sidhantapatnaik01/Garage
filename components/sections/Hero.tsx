'use client'

import { useEffect, useState, useMemo, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCounter } from '@/hooks/useCounter'
import { siteConfig, buildWhatsAppUrl } from '@/config/site'

const TYPING_WORDS = ['Dent Repair', 'Scratch Removal', 'Bumper Restore', 'Full Polish', 'Accident Repair']

function StatCard({ value, label, suffix = '' }: { value: number | string; label: string; suffix?: string }) {
  const isNum = typeof value === 'number'
  const ref = useCounter(isNum ? (value as number) : 0)
  return (
    <div className="text-center">
      <div className="text-3xl font-bold text-white tabular-nums">
        {isNum ? <span ref={ref}>0</span> : value}{suffix}
      </div>
      <div className="text-white/50 text-xs mt-1">{label}</div>
    </div>
  )
}

export default function Hero() {
  const meshRef = useRef<HTMLDivElement>(null)
  const typingRef = useRef<HTMLSpanElement>(null)
  const reduceMotion = useReducedMotion()
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile for particle count tuning
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // Typing animation — entirely ref-based, no re-renders
  useEffect(() => {
    if (!typingRef.current) return
    if (reduceMotion) {
      typingRef.current.textContent = TYPING_WORDS[0]
      return
    }

    let timeout: ReturnType<typeof setTimeout> | undefined
    let wordIdx = 0
    let charIdx = 0
    let deleting = false

    const tick = () => {
      const word = TYPING_WORDS[wordIdx]
      if (!deleting) {
        if (charIdx < word.length) {
          charIdx++
          if (typingRef.current) typingRef.current.textContent = word.slice(0, charIdx)
          timeout = setTimeout(tick, 80)
        } else {
          deleting = true
          timeout = setTimeout(tick, 1800)
        }
      } else {
        if (charIdx > 0) {
          charIdx--
          if (typingRef.current) typingRef.current.textContent = word.slice(0, charIdx)
          timeout = setTimeout(tick, 45)
        } else {
          deleting = false
          wordIdx = (wordIdx + 1) % TYPING_WORDS.length
          timeout = setTimeout(tick, 100)
        }
      }
    }

    tick()
    return () => { if (timeout) clearTimeout(timeout) }
  }, [reduceMotion])

  // Mouse parallax — direct DOM mutation, no re-renders
  const handleMouseMove = (e: React.MouseEvent) => {
    if (reduceMotion || !meshRef.current) return
    const { clientX, clientY, currentTarget } = e
    const { width, height, left, top } = currentTarget.getBoundingClientRect()
    const x = ((clientX - left - width / 2) / width) * 20
    const y = ((clientY - top - height / 2) / height) * 20
    meshRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
  }

  // Particles — count tuned for mobile
  const particleCount = reduceMotion ? 0 : isMobile ? 16 : 40
  const particles = useMemo(
    () =>
      Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 6 + 4,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.5 + 0.1,
      })),
    [particleCount]
  )

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#060606]"
      onMouseMove={handleMouseMove}
    >
      {/* Gradient mesh */}
      <div ref={meshRef} className="absolute inset-0 opacity-30 transition-transform duration-300 will-change-transform">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-accent/20 blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full bg-blue-600/15 blur-[80px]" />
      </div>

      {/* Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            ['--p-opacity' as string]: p.opacity,
            ['--dur' as string]: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-24 pb-16">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8"
        >
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <span className="text-white/70 text-sm">{siteConfig.tagline}</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
        >
          Expert{' '}
          <span className="text-accent">
            <span ref={typingRef}>Dent Repair</span>
            <span className="animate-blink">|</span>
          </span>
          <br />
          <span className="text-white/80">for Your Maruti</span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/50 text-lg max-w-2xl mx-auto mb-10"
        >
          {siteConfig.description}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Button
            size="lg"
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group"
          >
            Get Free Estimate
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => window.open(buildWhatsAppUrl('Hi, I need a quick quote for my car.'), '_blank')}
          >
            WhatsApp Us
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-3 gap-8 max-w-sm mx-auto"
        >
          <StatCard value={siteConfig.stats.carsRestored} label="Cars Restored" suffix="+" />
          <StatCard value={siteConfig.stats.modelsServed} label="Models Served" />
          <StatCard value={siteConfig.stats.rating} label="Google Rating" suffix="★" />
        </motion.div>
      </div>

      {/* Scroll indicator — hidden on phone (overlapped stats grid) */}
      <div aria-hidden="true" className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 opacity-40">
        <span className="text-white text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  )
}
