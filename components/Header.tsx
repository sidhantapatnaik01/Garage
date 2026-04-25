'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Menu, X, Wrench } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { Button } from '@/components/ui/button'

const navLinks = [
  { label: 'Models', href: '#models' },
  { label: 'Before & After', href: '#before-after' },
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const firstMobileLinkRef = useRef<HTMLButtonElement>(null)
  const lastFocusedRef = useRef<HTMLElement | null>(null)
  const reduceMotion = useReducedMotion()

  // Track scroll, including initial position on mount
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Body scroll lock + Escape close + focus management for mobile menu
  useEffect(() => {
    if (!open) return
    lastFocusedRef.current = document.activeElement as HTMLElement
    firstMobileLinkRef.current?.focus()

    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      lastFocusedRef.current?.focus?.()
    }
  }, [open])

  const handleNav = (href: string) => {
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  const scrollToTop = () => {
    setOpen(false)
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5 shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo — click to scroll to top */}
          <button
            type="button"
            onClick={scrollToTop}
            aria-label={`${siteConfig.name} — back to top`}
            className="flex items-center gap-2.5 hover:opacity-80 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg"
          >
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shadow-lg shadow-accent/30">
              <Wrench className="w-4 h-4 text-white" />
            </div>
            <div className="text-left">
              <span className="block text-white font-bold text-lg leading-none">{siteConfig.name}</span>
              <p className="text-white/40 text-xs leading-none mt-0.5">{siteConfig.location}</p>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="text-white/60 hover:text-white text-sm px-3 py-2 rounded-lg hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a href={`tel:${siteConfig.phone}`} className="text-white/60 hover:text-white text-sm transition-colors">
              {siteConfig.phone}
            </a>
            <Button size="sm" onClick={() => handleNav('#contact')}>
              Get Quote
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-white/70 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/5"
          >
            <nav className="px-4 py-4 space-y-1" aria-label="Mobile">
              {navLinks.map((link, i) => (
                <button
                  key={link.href}
                  ref={i === 0 ? firstMobileLinkRef : undefined}
                  onClick={() => handleNav(link.href)}
                  className="w-full text-left text-white/70 hover:text-white text-sm px-3 py-3 rounded-lg hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-3 border-t border-white/10 space-y-2">
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="block text-center text-white/60 text-sm py-2"
                >
                  {siteConfig.phone}
                </a>
                <Button className="w-full" onClick={() => handleNav('#contact')}>
                  Get Quote
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
