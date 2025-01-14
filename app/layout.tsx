'use client'

import './globals.css'
import { Inter } from 'next/font/google'
import Header from './Header'
import Sidebar from '../components/Sidebar'
import VideoBackground from '../components/VideoBackground'
import { ThemeProvider } from '../components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <VideoBackground />
          
          {/* Main Content */}
          <div className="relative z-10">
            <Header />
            <div className="flex">
              <main className="flex-grow overflow-y-auto min-h-screen pt-20">
                <div className="glass p-6 mx-6 my-4 rounded-xl animate-fade-in">
                  {children}
                </div>
              </main>
              <Sidebar />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
