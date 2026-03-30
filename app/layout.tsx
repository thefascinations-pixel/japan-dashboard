import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '東京 Dashboard — Japan Life',
  description: 'Your expat toolkit for living in Japan',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
