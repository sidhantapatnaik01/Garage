import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import { Toaster } from 'sonner'
import { siteConfig } from '@/config/site'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-dm-sans',
})

const title = `${siteConfig.name} ${siteConfig.location} — Car Repair, Dent & Paint`
const description = siteConfig.description

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: title,
    template: `%s — ${siteConfig.name} ${siteConfig.location}`,
  },
  description,
  applicationName: siteConfig.name,
  alternates: { canonical: '/' },
  keywords: [
    `car repair ${siteConfig.location}`,
    `Maruti garage ${siteConfig.location}`,
    `dent repair ${siteConfig.location}`,
    'scratch removal',
    'bumper repair',
    'body polishing',
    'auto body shop',
    'Maruti Suzuki repair',
    'Arena models service',
    `garage ${siteConfig.region}`,
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: { telephone: true, address: true, email: true },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title,
    description,
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  ...(siteConfig.googleVerification ? { verification: { google: siteConfig.googleVerification } } : {}),
  category: 'automotive',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="bg-surface text-white antialiased overflow-x-hidden font-sans">
        {children}
        <Toaster theme="dark" position="top-center" richColors />
      </body>
    </html>
  )
}
