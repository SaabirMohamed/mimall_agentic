'use client'

import './globals.css'
import { Marvel } from 'next/font/google'
import Header from './Header'
import VideoBackground from '../components/VideoBackground'
import { ThemeProvider } from '../components/ThemeProvider'
import { SessionProvider } from 'next-auth/react'
import { RouteProvider, useRoute } from '../context/RouteContext'

const marvel = Marvel({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-marvel'
})

function MainLayout({ children }: { children: React.ReactNode }) {
  const { isAgenticUIVisible } = useRoute()

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 relative">
          <VideoBackground />
          <div className="relative z-10 container mx-auto px-4">
            {children}
          </div>
        </main>
      </div>
      {isAgenticUIVisible && (
        <div className="w-1/4 min-w-[300px] bg-background border-l">
          <div className="p-4 h-full">
            <h2 className="text-2xl font-bold mb-4 text-white">Agentic UI</h2>
            <div className="agentic-ui-content">
              {/* Agentic UI content will be injected here */}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={marvel.className}>
        <ThemeProvider>
          <SessionProvider>
            <RouteProvider>
              <MainLayout>{children}</MainLayout>
            </RouteProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
