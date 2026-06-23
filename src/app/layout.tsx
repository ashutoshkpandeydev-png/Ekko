import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'EKKO — An AI version of you, built from your memories',
  description:
    'Upload chats, emails, notes, and journal entries. Ekko builds a digital twin that sounds like you, remembers what matters to you, and can speak to others on your behalf.',
  metadataBase: new URL('https://ekko.so'),
  applicationName: 'EKKO',
  keywords: [
    'Ekko',
    'AI twin',
    'digital twin',
    'personal AI',
    'AI clone',
    'memory AI',
    'voice model',
    'AI persona',
    'AI identity',
  ],
  openGraph: {
    title: 'EKKO — An AI version of you, built from your memories',
    description:
      'Upload chats, emails, notes, and journal entries. Ekko builds a digital twin that sounds like you, remembers what matters to you, and can speak to others on your behalf.',
    siteName: 'EKKO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EKKO — An AI version of you, built from your memories',
    description:
      'Upload chats, emails, notes, and journal entries. Ekko builds a digital twin that sounds like you, remembers what matters to you, and can speak to others on your behalf.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}