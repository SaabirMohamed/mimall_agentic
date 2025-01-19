'use client'

import './globals.css'
import { Marvel } from 'next/font/google'
import Header from './Header'
import VideoBackground from '../components/VideoBackground'
import { ThemeProvider } from '../components/ThemeProvider'
import AgenticUI from '../components/AgenticUI'
import { SessionProvider } from 'next-auth/react'

const marvel = Marvel({weight: '700', subsets: ['latin']})

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
            <VideoBackground />
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
                  {/* <Sidebar /> */}
                </div>
              </div>

              {/* Floating Agent */}
              {/* <FloatingAgent
                elevenLabsKey="sk_167d6fb6888cb139283e7447503fa673bcc2545ab0c78052"
              /> */}
            </AgenticUI>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
