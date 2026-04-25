'use client'

import { MessageCircle } from 'lucide-react'
import { buildWhatsAppUrl } from '@/config/site'

export default function FloatingWhatsApp() {
  const handleClick = () => {
    window.open(buildWhatsAppUrl('Hi, I need help with my car service.'), '_blank')
  }

  return (
    <button
      onClick={handleClick}
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] shadow-lg shadow-[#25D366]/30 hover:shadow-[#25D366]/50 hover:scale-110 active:scale-95 transition-all duration-200 flex items-center justify-center group"
    >
      <MessageCircle className="w-7 h-7 text-white fill-white" />
      <span className="absolute right-16 bg-black/80 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10">
        Chat on WhatsApp
      </span>
    </button>
  )
}
