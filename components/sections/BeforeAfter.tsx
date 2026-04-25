'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
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
  const [pos, setPos] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const setFromEvent = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const p = Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100))
    setPos(p)
  }, [])

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragging.current) setFromEvent(e.clientX)
  }
  const onPointerUp = () => { dragging.current = false }

  // Auto-demo on mount
  useEffect(() => {
    let frame: number
    let t = 0
    const animate = () => {
      t += 0.008
      const p = 50 + Math.sin(t) * 30
      setPos(p)
      if (t < Math.PI) frame = requestAnimationFrame(animate)
    }
    const timeout = setTimeout(() => { frame = requestAnimationFrame(animate) }, 800)
    return () => { clearTimeout(timeout); cancelAnimationFrame(frame) }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative h-72 rounded-2xl overflow-hidden cursor-ew-resize select-none"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
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
        className="absolute inset-0 flex items-center justify-center"
        style={{
          clipPath: `inset(0 0 0 ${pos}%)`,
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
        className="absolute top-0 bottom-0 w-0.5 bg-white z-10 pointer-events-none"
        style={{ left: `${pos}%` }}
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
            Drag the slider to see the transformation. Every repair is backed by our quality guarantee.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 justify-center mb-8">
          {CASES.map((c, i) => (
            <button
              key={c.model}
              onClick={() => setActive(i)}
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
            <span className="text-white/30 text-sm">{CASES[active].service} — drag slider to compare</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
