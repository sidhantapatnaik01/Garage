'use client'

import { useEffect, useRef } from 'react'

// Ref-based animated counter — IntersectionObserver triggers a rAF loop
// that writes directly to the element's textContent. Zero React re-renders.
// Attach the returned ref to a <span> (or any text-content element).
export function useCounter(target: number, duration = 2000) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    let raf: number | undefined
    let started = false

    const animate = () => {
      const start = performance.now()
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        if (ref.current) ref.current.textContent = String(Math.round(eased * target))
        if (progress < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      node.textContent = String(target)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true
          animate()
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(node)

    return () => {
      observer.disconnect()
      if (raf) cancelAnimationFrame(raf)
    }
  }, [target, duration])

  return ref
}
