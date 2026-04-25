import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-dm-sans',
})

export const metadata: Metadata = {
  title: 'Maruti Care Nabarangapur — Car Repair & Restoration',
  description:
    "Nabarangapur's trusted garage for Maruti Suzuki Arena car repair. Expert dent repair, scratch removal, bumper restoration, and body polishing.",
  keywords: [
    'car repair Nabarangapur',
    'Maruti garage',
    'dent repair',
    'scratch removal',
    'bumper repair',
    'body polishing',
  ],
  openGraph: {
    title: 'Maruti Care Nabarangapur',
    description: 'Expert Maruti car repair in Nabarangapur. Dent, scratch, bumper & body work.',
    type: 'website',
  },
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
