import { AppWrapper } from '@/Components/AppContext'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dog Lover',
  description: 'Finding a new home for the shelter dog',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} font-extralight`}>
      <main>
        <AppWrapper>{children}</AppWrapper>
      </main>
      </body>
    </html>
  )
}
