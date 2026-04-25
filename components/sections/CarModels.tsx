'use client'

import { useRef, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'
import { CAR_MODELS } from '@/data/models'
import { buildWhatsAppUrl } from '@/config/site'

function ModelCard({ model, index, reduceMotion }: { model: typeof CAR_MODELS[0]; index: number; reduceMotion: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || !cardRef.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 15
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * -15
    cardRef.current.style.transform = `perspective(800px) rotateX(${x}deg) rotateY(${y}deg) scale(1.03)`
  }

  const reset = () => {
    if (cardRef.current) cardRef.current.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)'
  }

  const handleClick = () => {
    window.open(buildWhatsAppUrl(`Hi, I'd like a quote for my ${model.name}. ${model.desc}`), '_blank')
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      style={{ transform: 'perspective(800px) rotateX(0) rotateY(0) scale(1)', transition: 'transform 0.2s ease' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      onClick={handleClick}
      className="relative flex-shrink-0 w-72 rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden cursor-pointer group will-change-transform"
    >
      {/* Accent bar */}
      <div className="h-0.5 w-full" style={{ background: model.color }} />

      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-white font-bold text-lg">{model.name}</h3>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full border mt-1 inline-block"
              style={{ color: model.color, borderColor: `${model.color}40`, background: `${model.color}15` }}>
              {model.tagline}
            </span>
          </div>
          <ChevronRight
            className="w-4 h-4 text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all mt-1"
          />
        </div>

        {/* Car image */}
        <div className="relative h-36 my-3 rounded-xl overflow-hidden bg-white/[0.02]">
          <Image
            src={model.img}
            alt={model.name}
            fill
            className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 288px"
          />
        </div>

        <p className="text-white/40 text-xs leading-relaxed mt-3">{model.desc}</p>
      </div>

      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl"
        style={{ boxShadow: `inset 0 0 30px ${model.color}15` }} />
    </motion.div>
  )
}

export default function CarModels() {
  const trackRef = useRef<HTMLDivElement>(null)
  const posRef = useRef(0)
  const rafRef = useRef<number>()
  const pausedRef = useRef(false)
  const lastTsRef = useRef<number>()
  const reduceMotion = useReducedMotion() ?? false

  useEffect(() => {
    const track = trackRef.current
    if (!track || reduceMotion) return
    const cardWidth = 288 + 20
    const totalWidth = CAR_MODELS.length * cardWidth
    const speed = 24 // px per second

    const tick = (ts: number) => {
      if (lastTsRef.current === undefined) lastTsRef.current = ts
      const delta = (ts - lastTsRef.current) / 1000
      lastTsRef.current = ts

      if (!pausedRef.current) {
        posRef.current += speed * delta
        if (posRef.current >= totalWidth) posRef.current -= totalWidth
        track.style.transform = `translate3d(-${posRef.current}px, 0, 0)`
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    const pause = () => { pausedRef.current = true }
    const resume = () => { pausedRef.current = false }
    track.addEventListener('mouseenter', pause)
    track.addEventListener('mouseleave', resume)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      lastTsRef.current = undefined
      track.removeEventListener('mouseenter', pause)
      track.removeEventListener('mouseleave', resume)
    }
  }, [reduceMotion])

  return (
    <section id="models" className="py-24 bg-[#060606] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-accent text-sm font-semibold tracking-widest uppercase">All Arena Models</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mt-3 mb-4">We Service Every Maruti</h2>
          <p className="text-white/40 max-w-xl mx-auto">
            From city hatchbacks to bold SUVs — expert repair for every model in the Maruti Suzuki Arena lineup.
          </p>
        </motion.div>
      </div>

      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#060606] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#060606] to-transparent z-10 pointer-events-none" />

        <div ref={trackRef} className="flex gap-5 will-change-transform pb-4" style={{ width: 'max-content' }}>
          {/* Duplicate for seamless loop */}
          {[...CAR_MODELS, ...CAR_MODELS].map((model, i) => (
            <ModelCard key={`${model.name}-${i}`} model={model} index={i % CAR_MODELS.length} reduceMotion={reduceMotion} />
          ))}
        </div>
      </div>
    </section>
  )
}
