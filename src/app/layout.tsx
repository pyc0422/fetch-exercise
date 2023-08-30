import { AppWrapper } from '@/Components/AppContext'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Fetch Dog Project',
  description: 'Helping dog-lover to find a shelter dog, and finding a new home for the shelter dog',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <main className="flex w-screen min-h-screen flex-col items-center p-10 lg:p-24 sm:p-20">
        <strong className="text-xl text-primary">Welcome to <span className="text-3xl text-secondary">Dog Lover</span> !</strong>
        <AppWrapper>{children}</AppWrapper>
      </main>
      </body>
    </html>
  )
}
