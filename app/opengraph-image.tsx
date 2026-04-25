import { ImageResponse } from 'next/og'
import { siteConfig } from '@/config/site'

export const alt = `${siteConfig.name} ${siteConfig.location} — Car Repair`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #060606 0%, #1a0a0a 100%)',
          padding: 80,
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 64,
              height: 64,
              background: '#e63946',
              borderRadius: 14,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: 38,
              fontWeight: 800,
            }}
          >
            {siteConfig.name.charAt(0)}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ color: 'white', fontSize: 28, fontWeight: 700 }}>{siteConfig.name}</div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 18 }}>{siteConfig.location}</div>
          </div>
        </div>

        {/* Spacer */}
        <div style={{ display: 'flex', flex: 1 }} />

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ color: '#e63946', fontSize: 22, fontWeight: 600, letterSpacing: 4 }}>
            {siteConfig.tagline.toUpperCase()}
          </div>
          <div style={{ display: 'flex', color: 'white', fontSize: 72, fontWeight: 800, lineHeight: 1.05 }}>
            Expert Car Repair
          </div>
          <div style={{ display: 'flex', color: 'white', fontSize: 72, fontWeight: 800, lineHeight: 1.05 }}>
            for Your Maruti
          </div>
          <div style={{ display: 'flex', color: 'rgba(255,255,255,0.55)', fontSize: 24, marginTop: 12 }}>
            Dent · Scratch · Bumper · Paint · Polish
          </div>
        </div>

        {/* Accent bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 8,
            display: 'flex',
            background: 'linear-gradient(90deg, #e63946 0%, #3b82f6 100%)',
          }}
        />
      </div>
    ),
    { ...size }
  )
}
