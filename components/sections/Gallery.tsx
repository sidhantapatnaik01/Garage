'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'
import SectionBg from '@/components/SectionBg'

const CATEGORIES = ['All', 'Dents', 'Scratches', 'Bumpers', 'Polish']

const GALLERY_ITEMS = [
  { id: 1, category: 'Dents', label: 'Door Panel Dent — Alto K10', emoji: '🔧', color: '#e63946', detail: 'Paintless dent removal, 2h' },
  { id: 2, category: 'Scratches', label: 'Key Scratch — Swift', emoji: '✨', color: '#3b82f6', detail: 'OEM colour match, same day' },
  { id: 3, category: 'Bumpers', label: 'Front Bumper Crack — WagonR', emoji: '🛡️', color: '#f59e0b', detail: 'Structural repair + repaint' },
  { id: 4, category: 'Polish', label: 'Full Body Polish — Brezza', emoji: '💎', color: '#10b981', detail: 'Ceramic coating, showroom shine' },
  { id: 5, category: 'Dents', label: 'Hail Damage — Celerio', emoji: '⚡', color: '#8b5cf6', detail: 'Multiple dents, panel restored' },
  { id: 6, category: 'Scratches', label: 'Rear Quarter — Dzire', emoji: '🎨', color: '#06b6d4', detail: 'Invisible blend repair' },
  { id: 7, category: 'Bumpers', label: 'Rear Bumper — Ertiga', emoji: '🚗', color: '#f97316', detail: 'Repainted + polished' },
  { id: 8, category: 'Polish', label: 'Full Detail — S-Presso', emoji: '⭐', color: '#ec4899', detail: 'Interior + exterior deep clean' },
  { id: 9, category: 'Dents', label: 'Side Panel — Eeco', emoji: '🔩', color: '#14b8a6', detail: 'Commercial restoration' },
]

export default function Gallery() {
  const [filter, setFilter] = useState('All')
  const [lightbox, setLightbox] = useState<typeof GALLERY_ITEMS[0] | null>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const lastFocusedRef = useRef<HTMLElement | null>(null)

  const filtered = filter === 'All' ? GALLERY_ITEMS : GALLERY_ITEMS.filter((g) => g.category === filter)

  // Escape to close + focus management + body scroll lock
  useEffect(() => {
    if (!lightbox) return
    lastFocusedRef.current = document.activeElement as HTMLElement
    closeBtnRef.current?.focus()

    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null) }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      lastFocusedRef.current?.focus?.()
    }
  }, [lightbox])

  return (
    <section id="gallery" className="relative py-24 bg-[#080808] overflow-hidden">
      <SectionBg tone="green" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-accent text-sm font-semibold tracking-widest uppercase">Our Work</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mt-3 mb-4">Work Gallery</h2>
          <p className="text-white/40 max-w-xl mx-auto">
            A snapshot of recent repairs across Nabarangapur. Click any card to view details.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-10" role="tablist" aria-label="Filter gallery">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              role="tab"
              aria-selected={filter === cat}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                filter === cat
                  ? 'bg-accent text-white shadow-lg shadow-accent/25'
                  : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
            {filtered.map((item) => (
              <motion.button
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setLightbox(item)}
                aria-label={`View details: ${item.label}`}
                className="group relative rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6 cursor-pointer hover:bg-white/[0.06] hover:-translate-y-1 transition-all duration-300 aspect-video flex flex-col justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <div className="flex justify-between items-start">
                  <span
                    className="text-xs font-medium px-2.5 py-1 rounded-full"
                    style={{ background: `${item.color}20`, color: item.color }}
                  >
                    {item.category}
                  </span>
                  <ZoomIn className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-5xl mb-3" aria-hidden="true">{item.emoji}</div>
                  <h3 className="text-white font-medium text-sm">{item.label}</h3>
                  <p className="text-white/30 text-xs mt-1">{item.detail}</p>
                </div>
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{ boxShadow: `inset 0 0 40px ${item.color}10` }}
                />
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label={lightbox.label}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
              className="relative bg-[#0d0d0d] border border-white/10 rounded-2xl p-10 max-w-sm w-full text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                ref={closeBtnRef}
                onClick={() => setLightbox(null)}
                aria-label="Close"
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <X className="w-4 h-4 text-white/60" />
              </button>
              <div className="text-7xl mb-5" aria-hidden="true">{lightbox.emoji}</div>
              <span
                className="text-xs font-medium px-3 py-1 rounded-full mb-4 inline-block"
                style={{ background: `${lightbox.color}20`, color: lightbox.color }}
              >
                {lightbox.category}
              </span>
              <h3 className="text-white font-bold text-xl mt-3 mb-2">{lightbox.label}</h3>
              <p className="text-white/50 text-sm">{lightbox.detail}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
