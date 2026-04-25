'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'

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

  const filtered = filter === 'All' ? GALLERY_ITEMS : GALLERY_ITEMS.filter((g) => g.category === filter)

  return (
    <section id="gallery" className="py-24 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
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
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
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
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setLightbox(item)}
                className="group relative rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6 cursor-pointer hover:bg-white/[0.06] hover:-translate-y-1 transition-all duration-300 aspect-video flex flex-col justify-between"
              >
                <div className="flex justify-between items-start">
                  <span
                    className="text-xs font-medium px-2.5 py-1 rounded-full"
                    style={{ background: `${item.color}20`, color: item.color }}
                  >
                    {item.category}
                  </span>
                  <ZoomIn className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors" />
                </div>
                <div>
                  <div className="text-5xl mb-3">{item.emoji}</div>
                  <h3 className="text-white font-medium text-sm">{item.label}</h3>
                  <p className="text-white/30 text-xs mt-1">{item.detail}</p>
                </div>
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{ boxShadow: `inset 0 0 40px ${item.color}10` }}
                />
              </motion.div>
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
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4 text-white/60" />
              </button>
              <div className="text-7xl mb-5">{lightbox.emoji}</div>
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
