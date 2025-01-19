'use client'

import './globals.css'
import { Marvel } from 'next/font/google'
import Header from './Header'
import VideoBackground from '../components/VideoBackground'
import { ThemeProvider } from '../components/ThemeProvider'
import AgenticUI from '../components/AgenticUI'
import { SessionProvider } from 'next-auth/react'
import { RouteProvider, useRoute } from '../context/RouteContext'

const marvel = Marvel({weight: '700', subsets: ['latin']})

function MainLayout({ children }: { children: React.ReactNode }) {
  const { isAgenticUIVisible } = useRoute()

  return (
    <div className="min-h-screen">
      <VideoBackground />
      {isAgenticUIVisible ? (
        <AgenticUI>
          {/* Dark Overlay */}
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-5"></div>
          {/* Main Content */}
          <div className="relative z-10">
            <Header />
            <div className="flex">
              <main className="flex-grow bg-transparent overflow-y-auto min-h-screen">
                {children}
              </main>
            </div>
          </div>
        </AgenticUI>
      ) : (
        <>
          {/* Dark Overlay */}
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-5"></div>
          {/* Main Content */}
          <div className="relative z-10">
            <Header />
            <div className="flex">
              <main className="flex-grow bg-transparent overflow-y-auto min-h-screen">
                {children}
              </main>
            </div>
          </div>
          {/* Empty Circle */}
          <div className="fixed bottom-6 right-6 w-12 h-12 rounded-full border-2 border-white opacity-50 hover:opacity-100 transition-opacity duration-300"></div>
        </>
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
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <RouteProvider>
              <MainLayout>{children}</MainLayout>
            </RouteProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
