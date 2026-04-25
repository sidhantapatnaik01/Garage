'use client'

import { useEffect, useState, useMemo, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCounter } from '@/hooks/useCounter'
import { siteConfig } from '@/config/site'
import { buildWhatsAppUrl } from '@/config/site'

const TYPING_WORDS = ['Dent Repair', 'Scratch Removal', 'Bumper Restore', 'Full Polish', 'Accident Repair']

function StatCard({ value, label, suffix = '' }: { value: number | string; label: string; suffix?: string }) {
  const isNum = typeof value === 'number'
  const { count, ref } = useCounter(isNum ? (value as number) : 0)
  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl font-bold text-white">
        {isNum ? count : value}{suffix}
      </div>
      <div className="text-white/50 text-xs mt-1">{label}</div>
    </div>
  )
}

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // Typing animation
  useEffect(() => {
    const word = TYPING_WORDS[wordIdx]
    let timeout: ReturnType<typeof setTimeout>
    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80)
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 1800)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45)
    } else {
      setDeleting(false)
      setWordIdx((i) => (i + 1) % TYPING_WORDS.length)
    }
    return () => clearTimeout(timeout)
  }, [displayed, deleting, wordIdx])

  // Mouse parallax
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e
    const { width, height, left, top } = currentTarget.getBoundingClientRect()
    setMousePos({
      x: (clientX - left - width / 2) / width,
      y: (clientY - top - height / 2) / height,
    })
  }

  // Particles
  const particles = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 10 + 8,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.5 + 0.1,
      })),
    []
  )

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#060606]"
      onMouseMove={handleMouseMove}
    >
      {/* Gradient mesh */}
      <div
        className="absolute inset-0 opacity-30 transition-transform duration-300"
        style={{ transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)` }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-accent/20 blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full bg-blue-600/15 blur-[80px]" />
      </div>

      {/* Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-white animate-pulse"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
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
            {displayed}
            <span className="animate-pulse">|</span>
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

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-white text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  )
}
