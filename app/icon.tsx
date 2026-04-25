import { ImageResponse } from 'next/og'
import { siteConfig } from '@/config/site'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
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
          borderRadius: 7,
          color: 'white',
          fontSize: 22,
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
