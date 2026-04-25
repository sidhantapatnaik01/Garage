'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ClipboardList, Wrench, CheckCircle } from 'lucide-react'

const STEPS = [
  {
    icon: ClipboardList,
    title: 'Book Your Slot',
    desc: "WhatsApp or call us to describe your car's damage. We'll confirm your appointment within minutes.",
    color: '#e63946',
  },
  {
    icon: Wrench,
    title: 'Expert Repair',
    desc: 'Our trained technicians use OEM-grade materials and professional equipment for a flawless finish.',
    color: '#3b82f6',
  },
  {
    icon: CheckCircle,
    title: 'Drive Away Happy',
    desc: "Thorough quality check, detailed handover inspection, and a satisfaction guarantee on every job.",
    color: '#10b981',
  },
]

const STEP_DURATION_MS = 3000

export default function HowItWorks() {
  const [active, setActive] = useState(0)
  const reduceMotion = useReducedMotion()

  // Refs to each step's progress bar — direct DOM mutation, no React re-render per frame
  const barRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (reduceMotion) return
    let raf: number
    let start: number | null = null

    const tick = (ts: number) => {
      if (start === null) start = ts
      const elapsed = ts - start
      const pct = Math.min((elapsed / STEP_DURATION_MS) * 100, 100)
      const bar = barRefs.current[active]
      if (bar) bar.style.width = `${pct}%`

      if (elapsed >= STEP_DURATION_MS) {
        setActive((prev) => (prev + 1) % STEPS.length)
        return
      }
      raf = requestAnimationFrame(tick)
    }

    // Reset all bars and start the active one
    barRefs.current.forEach((b, i) => { if (b) b.style.width = i === active ? '0%' : '0%' })
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, reduceMotion])

  const onSelect = (i: number) => setActive(i)

  return (
    <section id="how-it-works" className="py-24 bg-[#080808]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-semibold tracking-widest uppercase">Simple Process</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mt-3 mb-4">How It Works</h2>
          <p className="text-white/40 max-w-xl mx-auto">Three simple steps from damage to showroom finish.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-12 left-[calc(16.67%+1.5rem)] right-[calc(16.67%+1.5rem)] h-px bg-white/5" />

          {STEPS.map((step, i) => {
            const Icon = step.icon
            const isActive = active === i
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                onClick={() => onSelect(i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(i) } }}
                className={`relative rounded-2xl border p-6 cursor-pointer transition-all duration-500 text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  isActive
                    ? 'bg-white/[0.06] border-white/10 shadow-xl'
                    : 'bg-white/[0.02] border-white/[0.04] hover:bg-white/[0.04]'
                }`}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-all duration-500"
                  style={{
                    background: isActive ? `${step.color}20` : 'rgba(255,255,255,0.03)',
                    borderColor: isActive ? `${step.color}40` : 'rgba(255,255,255,0.06)',
                    border: '1px solid',
                    boxShadow: isActive ? `0 0 30px ${step.color}20` : 'none',
                  }}
                >
                  <Icon className="w-7 h-7" style={{ color: isActive ? step.color : '#ffffff40' }} />
                </div>

                <div
                  className="text-xs font-bold uppercase tracking-widest mb-2"
                  style={{ color: isActive ? step.color : '#ffffff30' }}
                >
                  Step {i + 1}
                </div>
                <h3 className={`text-lg font-bold mb-3 transition-colors ${isActive ? 'text-white' : 'text-white/50'}`}>
                  {step.title}
                </h3>
                <p className={`text-sm leading-relaxed transition-colors ${isActive ? 'text-white/60' : 'text-white/30'}`}>
                  {step.desc}
                </p>

                {/* Progress bar — width mutated directly via ref */}
                <div className={`mt-5 h-0.5 bg-white/10 rounded-full overflow-hidden ${isActive ? '' : 'opacity-0'}`}>
                  <div
                    ref={(el) => { barRefs.current[i] = el }}
                    className="h-full rounded-full"
                    style={{ width: '0%', background: step.color }}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
