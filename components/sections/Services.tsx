'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { SERVICES } from '@/data/models'
import { buildWhatsAppUrl } from '@/config/site'

export default function Services() {
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <section id="services" className="py-24 bg-[#060606]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-semibold tracking-widest uppercase">What We Do</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mt-3 mb-4">Our Services</h2>
          <p className="text-white/40 max-w-xl mx-auto">
            From a minor scratch to full accident repair — comprehensive body and paint services for every Maruti.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              className="group relative rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6 cursor-pointer hover:bg-white/[0.06] hover:-translate-y-1 transition-all duration-300"
              onClick={() => setExpanded(expanded === i ? null : i)}
            >
              {/* Gradient glow on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: `linear-gradient(135deg, ${service.color}15, transparent)` }}
              />

              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center text-xl mb-4 shadow-lg`}>
                {service.icon}
              </div>

              <h3 className="text-white font-semibold text-base mb-2">{service.title}</h3>

              <AnimatePresence>
                {expanded !== i && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-white/40 text-sm leading-relaxed line-clamp-2"
                  >
                    {service.desc}
                  </motion.p>
                )}
                {expanded === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="text-white/50 text-sm leading-relaxed mb-4">{service.desc}</p>
                    <a
                      href={buildWhatsAppUrl(`Hi, I need ${service.title} for my car.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-accent text-sm font-medium hover:gap-2.5 transition-all"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Get Quote <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>

              <ChevronDown
                className={`absolute bottom-4 right-4 w-4 h-4 text-white/20 transition-transform ${expanded === i ? 'rotate-180' : ''}`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
