import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="glass fixed top-0 left-0 right-0 h-16 md:h-20 z-50">
      <div className="container mx-auto px-4 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-gold-500 hover:text-gold-600 transition-colors">
            miMall
          </Link>

          {/* Navigation */}
          <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block absolute md:relative top-16 md:top-0 left-0 right-0 bg-dark-900/95 md:bg-transparent p-4 md:p-0`}>
            <ul className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
              <li>
                <Link href="/" className="text-gray-300 hover:text-gold-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-gold-500 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/stores" className="text-gray-300 hover:text-gold-500 transition-colors">
                  Stores
                </Link>
              </li>
              <li>
                <Link href="/signup/user" className="text-gray-300 hover:text-gold-500 transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/signup/business" className="text-gray-300 hover:text-gold-500 transition-colors">
                  Business
                </Link>
              </li>
            </ul>
          </nav>

          {/* Theme Toggle */}
          <div className="flex items-center gap-4">
            <button 
              className="p-2 rounded-full hover:bg-dark-700 transition-colors"
              onClick={() => document.documentElement.classList.toggle('dark')}
            >
              <svg className="w-6 h-6 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </button>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-full hover:bg-dark-700 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
