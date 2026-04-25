'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, Clock, Palette, Wrench, ThumbsUp, BadgePercent } from 'lucide-react'

const REASONS = [
  {
    icon: ShieldCheck,
    title: 'Satisfaction Guarantee',
    desc: 'Every job comes with our quality guarantee. Not happy? We fix it — no questions asked.',
    color: '#e63946',
  },
  {
    icon: Clock,
    title: 'Same-Day Service',
    desc: 'Most minor repairs completed the same day. We respect your time.',
    color: '#3b82f6',
  },
  {
    icon: Palette,
    title: 'OEM Colour Match',
    desc: 'Exact factory colour codes used for every paint job — invisible repairs every time.',
    color: '#f59e0b',
  },
  {
    icon: Wrench,
    title: 'Maruti Specialists',
    desc: 'Exclusively trained on the full Maruti Suzuki Arena lineup for 8+ years.',
    color: '#10b981',
  },
  {
    icon: ThumbsUp,
    title: '500+ Happy Cars',
    desc: 'Trusted by hundreds of Nabarangapur families for all their car body repair needs.',
    color: '#8b5cf6',
  },
  {
    icon: BadgePercent,
    title: 'Transparent Pricing',
    desc: 'Free estimates upfront. No hidden charges, ever. What we quote is what you pay.',
    color: '#06b6d4',
  },
]

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="py-24 bg-[#060606]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-semibold tracking-widest uppercase">Why Us</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mt-3 mb-4">Why Choose Maruti Care</h2>
          <p className="text-white/40 max-w-xl mx-auto">
            Six reasons why Nabarangapur's Maruti owners come back to us every time.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {REASONS.map((reason, i) => {
            const Icon = reason.icon
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group relative rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6 hover:bg-white/[0.05] hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                  style={{ background: `${reason.color}15`, border: `1px solid ${reason.color}30` }}
                >
                  <Icon className="w-6 h-6" style={{ color: reason.color }} />
                </div>
                <h3 className="text-white font-semibold text-base mb-2">{reason.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{reason.desc}</p>

                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"
                  style={{ background: reason.color }}
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
