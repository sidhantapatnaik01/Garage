'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { GripVertical } from 'lucide-react'

const CASES = [
  {
    model: 'Swift',
    service: 'Dent Repair',
    before: 'Deep dent on driver door panel',
    after: 'Factory-smooth finish restored',
    beforeColor: '#1a0a0a',
    afterColor: '#0a1a0a',
  },
  {
    model: 'WagonR',
    service: 'Bumper Repair',
    before: 'Cracked & scuffed front bumper',
    after: 'Fully repaired & colour-matched',
    beforeColor: '#0a0a1a',
    afterColor: '#0a1a18',
  },
  {
    model: 'Brezza',
    service: 'Scratch Removal',
    before: 'Deep key scratch on door',
    after: 'Invisible repair, OEM finish',
    beforeColor: '#1a0f0a',
    afterColor: '#0f1a0a',
  },
]

function Slider({ caseData }: { caseData: typeof CASES[0] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const afterRef = useRef<HTMLDivElement>(null)
  const handleRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const posRef = useRef(50)
  const [ariaPos, setAriaPos] = useState(50)
  const reduceMotion = useReducedMotion()

  const apply = useCallback((p: number) => {
    posRef.current = p
    if (afterRef.current) afterRef.current.style.clipPath = `inset(0 0 0 ${p}%)`
    if (handleRef.current) handleRef.current.style.left = `${p}%`
  }, [])

  const setPos = useCallback((p: number) => {
    const clamped = Math.max(5, Math.min(95, p))
    apply(clamped)
  }, [apply])

  const setFromEvent = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    setPos(((clientX - rect.left) / rect.width) * 100)
  }, [setPos])

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true
    containerRef.current?.setPointerCapture(e.pointerId)
    setFromEvent(e.clientX)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragging.current) setFromEvent(e.clientX)
  }
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = false
    containerRef.current?.releasePointerCapture(e.pointerId)
    setAriaPos(Math.round(posRef.current))
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setPos(posRef.current - 5)
      setAriaPos(Math.round(posRef.current))
    } else if (e.key === 'ArrowRight') {
      setPos(posRef.current + 5)
      setAriaPos(Math.round(posRef.current))
    } else if (e.key === 'Home') {
      setPos(5); setAriaPos(5)
    } else if (e.key === 'End') {
      setPos(95); setAriaPos(95)
    } else {
      return
    }
    e.preventDefault()
  }

  // Initial position + auto-demo on mount
  useEffect(() => {
    apply(50)
    if (reduceMotion) return
    let frame: number
    let t = 0
    const animate = () => {
      t += 0.012
      const p = 50 + Math.sin(t) * 35
      apply(Math.max(5, Math.min(95, p)))
      if (t < Math.PI * 2) {
        frame = requestAnimationFrame(animate)
      } else {
        apply(50)
        setAriaPos(50)
      }
    }
    const timeout = setTimeout(() => { frame = requestAnimationFrame(animate) }, 800)
    return () => { clearTimeout(timeout); cancelAnimationFrame(frame) }
  }, [apply, reduceMotion])

  return (
    <div
      ref={containerRef}
      role="slider"
      tabIndex={0}
      aria-label={`Before and after comparison: ${caseData.service}`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={ariaPos}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onKeyDown={onKeyDown}
      className="relative h-72 rounded-2xl overflow-hidden cursor-ew-resize select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      {/* BEFORE */}
      <div className="absolute inset-0 flex items-center justify-center"
        style={{ background: `radial-gradient(ellipse at center, ${caseData.beforeColor} 0%, #080808 100%)` }}>
        <div className="text-center p-6">
          <div className="text-6xl mb-3">🚗</div>
          <span className="text-white/30 text-xs uppercase tracking-widest font-medium">Before</span>
          <p className="text-white/50 text-sm mt-2 max-w-xs">{caseData.before}</p>
        </div>
        <div className="absolute top-3 left-3 bg-red-500/80 text-white text-xs px-2.5 py-1 rounded-full font-medium">
          BEFORE
        </div>
      </div>

      {/* AFTER — clipped */}
      <div
        ref={afterRef}
        className="absolute inset-0 flex items-center justify-center"
        style={{
          clipPath: 'inset(0 0 0 50%)',
          background: `radial-gradient(ellipse at center, ${caseData.afterColor} 0%, #060606 100%)`,
        }}
      >
        <div className="text-center p-6">
          <div className="text-6xl mb-3">✨</div>
          <span className="text-white/40 text-xs uppercase tracking-widest font-medium">After</span>
          <p className="text-white/60 text-sm mt-2 max-w-xs">{caseData.after}</p>
        </div>
        <div className="absolute top-3 right-3 bg-green-500/80 text-white text-xs px-2.5 py-1 rounded-full font-medium">
          AFTER
        </div>
      </div>

      {/* Handle */}
      <div
        ref={handleRef}
        className="absolute top-0 bottom-0 w-0.5 bg-white z-10 pointer-events-none will-change-[left]"
        style={{ left: '50%' }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white shadow-xl flex items-center justify-center">
          <GripVertical className="w-4 h-4 text-gray-600" />
        </div>
      </div>
    </div>
  )
}

export default function BeforeAfter() {
  const [active, setActive] = useState(0)

  return (
    <section id="before-after" className="py-24 bg-[#080808]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-accent text-sm font-semibold tracking-widest uppercase">Real Results</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mt-3 mb-4">Before & After</h2>
          <p className="text-white/40 max-w-xl mx-auto">
            Drag the slider — or use arrow keys — to compare. Every repair is backed by our quality guarantee.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 justify-center mb-8">
          {CASES.map((c, i) => (
            <button
              key={c.model}
              onClick={() => setActive(i)}
              aria-pressed={active === i}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                active === i
                  ? 'bg-accent text-white shadow-lg shadow-accent/25'
                  : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80'
              }`}
            >
              {c.model}
            </button>
          ))}
        </div>

        <motion.div key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          <Slider caseData={CASES[active]} />
          <div className="mt-4 text-center">
            <span className="text-white/30 text-sm">{CASES[active].service} — drag slider or use ← → keys</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
