import { ImageResponse } from 'next/og'
import { siteConfig } from '@/config/site'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#e63946',
          borderRadius: 36,
          color: 'white',
          fontSize: 110,
          fontWeight: 800,
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {siteConfig.name.charAt(0)}
      </div>
    ),
    { ...size }
  )
}
