'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Upload, X, MapPin, Phone, Clock, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { CAR_MODELS } from '@/data/models'
import { siteConfig, buildWhatsAppUrl } from '@/config/site'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Enter a valid phone number').max(13, 'Phone number too long'),
  carModel: z.string().min(1, 'Please select your car model'),
  issue: z.string().min(10, 'Please describe the issue in at least 10 characters'),
})

type FormData = z.infer<typeof schema>

export default function Contact() {
  const [preview, setPreview] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const handleFile = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be under 5MB')
      return
    }
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      toast.error('Only JPEG, PNG and WebP are supported')
      return
    }
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target?.result as string)
      setFileName(file.name)
    }
    reader.readAsDataURL(file)
  }

  const onSubmit = async (data: FormData) => {
    const imageNote = preview ? '\n\n📷 Image attached in browser preview' : ''
    const message = `Hello, I would like a car service estimate.\n\n👤 Name: ${data.name}\n📱 Phone: ${data.phone}\n🚗 Car: ${data.carModel}\n🔧 Issue: ${data.issue}${imageNote}`

    toast.success('Opening WhatsApp...')
    setTimeout(() => {
      window.open(buildWhatsAppUrl(message), '_blank')
      reset()
      setPreview(null)
      setFileName(null)
    }, 1000)
  }

  return (
    <section id="contact" className="py-24 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-semibold tracking-widest uppercase">Get In Touch</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mt-3 mb-4">Book Your Repair</h2>
          <p className="text-white/40 max-w-xl mx-auto">
            Fill in the form and we'll open WhatsApp with your details pre-filled for a quick response.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            {[
              { icon: MapPin, label: 'Address', value: siteConfig.address, sub: siteConfig.city },
              { icon: Phone, label: 'Phone', value: siteConfig.phone, sub: siteConfig.email },
              { icon: Clock, label: 'Hours', value: siteConfig.hours.weekdays, sub: siteConfig.hours.weekend },
            ].map(({ icon: Icon, label, value, sub }) => (
              <div key={label} className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="text-white/30 text-xs uppercase tracking-widest font-medium">{label}</div>
                  <div className="text-white text-sm mt-0.5">{value}</div>
                  <div className="text-white/40 text-xs mt-0.5">{sub}</div>
                </div>
              </div>
            ))}

            <div className="pt-4 border-t border-white/5">
              <p className="text-white/30 text-sm mb-3">Quick actions</p>
              <div className="flex flex-col gap-2">
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4" /> Call Now
                </a>
                <button
                  onClick={() => window.open(buildWhatsAppUrl('Hi, I have a quick question about car repair.'), '_blank')}
                  className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <MessageSquare className="w-4 h-4" /> WhatsApp Chat
                </button>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Input placeholder="Your name" {...register('name')} />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <Input placeholder="Phone number" {...register('phone')} />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
                </div>
              </div>

              <div>
                <select
                  {...register('carModel')}
                  className="flex h-11 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition-colors focus-visible:outline-none focus-visible:border-accent focus-visible:ring-1 focus-visible:ring-accent/50 disabled:cursor-not-allowed disabled:opacity-50"
                  style={{ colorScheme: 'dark' }}
                >
                  <option value="" className="bg-[#0d0d0d]">Select your car model</option>
                  {CAR_MODELS.map((m) => (
                    <option key={m.name} value={m.name} className="bg-[#0d0d0d]">
                      {m.name}
                    </option>
                  ))}
                </select>
                {errors.carModel && <p className="text-red-400 text-xs mt-1">{errors.carModel.message}</p>}
              </div>

              <div>
                <Textarea placeholder="Describe the damage or service you need (e.g., dent on driver door, scratches on bonnet...)" {...register('issue')} />
                {errors.issue && <p className="text-red-400 text-xs mt-1">{errors.issue.message}</p>}
              </div>

              {/* Image upload */}
              <div>
                {!preview ? (
                  <div
                    onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault()
                      setDragging(false)
                      const file = e.dataTransfer.files[0]
                      if (file) handleFile(file)
                    }}
                    onClick={() => fileRef.current?.click()}
                    className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${
                      dragging
                        ? 'border-accent/60 bg-accent/5'
                        : 'border-white/10 hover:border-white/20 hover:bg-white/[0.02]'
                    }`}
                  >
                    <Upload className="w-6 h-6 text-white/30 mx-auto mb-2" />
                    <p className="text-white/40 text-sm">
                      Drag & drop a photo or <span className="text-accent">browse</span>
                    </p>
                    <p className="text-white/20 text-xs mt-1">JPEG, PNG, WebP · Max 5MB · Optional</p>
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                      onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f) }}
                    />
                  </div>
                ) : (
                  <div className="relative rounded-lg overflow-hidden border border-white/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={preview} alt="Preview" className="w-full h-40 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                      <span className="text-white/60 text-xs truncate flex-1">{fileName}</span>
                      <button
                        type="button"
                        onClick={() => { setPreview(null); setFileName(null) }}
                        className="ml-2 p-1 rounded-full bg-black/40 hover:bg-black/60 transition-colors"
                      >
                        <X className="w-4 h-4 text-white/70" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? 'Opening WhatsApp...' : 'Send via WhatsApp'}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
