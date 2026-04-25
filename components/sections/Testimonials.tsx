'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const TESTIMONIALS = [
  {
    name: 'Rajesh Kumar',
    car: 'Maruti Swift',
    rating: 5,
    text: "My Swift had a nasty dent on the door after a parking mishap. The team fixed it in 3 hours and the finish is indistinguishable from the factory paint. Absolutely professional!",
    location: 'Nabarangapur',
  },
  {
    name: 'Sunita Patra',
    car: 'Maruti WagonR',
    rating: 5,
    text: "The bumper cracked after a minor accident. They gave me a fair estimate, did the repair same day, and even polished the whole front end. Outstanding service!",
    location: 'Nabarangapur',
  },
  {
    name: 'Amit Behera',
    car: 'Maruti Brezza',
    rating: 5,
    text: "Deep scratch on the side panel — I was worried about the colour match. They matched it perfectly. You can't tell there was ever a scratch. 5 stars easily.",
    location: 'Jeypore',
  },
  {
    name: 'Priya Das',
    car: 'Maruti Dzire',
    rating: 5,
    text: "Transparent pricing, no surprise charges, completed on time. My Dzire looks showroom fresh again. Will definitely come back for the annual polish.",
    location: 'Nabarangapur',
  },
  {
    name: 'Santosh Nayak',
    car: 'Maruti Alto K10',
    rating: 5,
    text: "Multiple small dents from hailstorm. Got them all removed without repainting using the paintless technique. Saved money and the car looks perfect. Highly recommend!",
    location: 'Umerkote',
  },
]

const ROTATE_MS = 5000

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const reduceMotion = useReducedMotion()

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    if (reduceMotion) return
    timerRef.current = setInterval(() => setCurrent((i) => (i + 1) % TESTIMONIALS.length), ROTATE_MS)
  }

  useEffect(() => {
    startTimer()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion])

  const goTo = (i: number) => {
    setCurrent(i)
    startTimer() // reset auto-rotate after manual selection
  }

  const t = TESTIMONIALS[current]

  return (
    <section id="testimonials" className="py-24 bg-[#060606]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-semibold tracking-widest uppercase">Reviews</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mt-3 mb-4">What Customers Say</h2>
        </motion.div>

        <div className="relative" aria-roledescription="carousel">
          <div aria-live="polite" aria-atomic="true">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 sm:p-10 text-center"
              >
                <Quote className="w-10 h-10 text-accent/30 mx-auto mb-6" aria-hidden="true" />

                <div className="flex justify-center gap-1 mb-6" aria-label={`${t.rating} out of 5 stars`}>
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" aria-hidden="true" />
                  ))}
                </div>

                <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
                  &ldquo;{t.text}&rdquo;
                </p>

                <div>
                  <div className="text-white font-semibold">{t.name}</div>
                  <div className="text-white/40 text-sm mt-1">
                    {t.car} · {t.location}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot nav */}
          <div className="flex justify-center gap-2 mt-8" role="tablist" aria-label="Choose testimonial">
            {TESTIMONIALS.map((review, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                role="tab"
                aria-selected={i === current}
                aria-label={`Show testimonial ${i + 1} of ${TESTIMONIALS.length} — ${review.name}`}
                className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  i === current ? 'w-8 bg-accent' : 'w-1.5 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
