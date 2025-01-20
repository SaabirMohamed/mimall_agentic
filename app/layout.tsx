'use client'

import './globals.css'
import { Marvel } from 'next/font/google'
import Header from './Header'
import VideoBackground from '../components/VideoBackground'
import { ThemeProvider } from '../components/ThemeProvider'
import { SessionProvider } from 'next-auth/react'
import { RouteProvider, useRoute } from '../context/RouteContext'
import { motion } from 'framer-motion'

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
    <div className="min-h-screen">
      {/* Main Content */}
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 relative">
          <VideoBackground />
          <div className="relative z-10">
            {children}
          </div>
        </main>
      </div>

      {/* Floating Agentic UI Widget */}
      {isAgenticUIVisible && (
        <div className="fixed bottom-6 right-6 z-50">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <button 
              className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              aria-label="Agentic UI"
            >
              <span className="text-2xl">AI</span>
            </button>
          </motion.div>
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
