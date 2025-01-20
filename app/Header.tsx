'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { usePathname } from 'next/navigation'

const supabase = createClientComponentClient()
export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    checkUser()
  }, [pathname])

  async function checkUser() {
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      setIsLoggedIn(true)
      // Commented out unused profile query - can be re-enabled when needed
      /*const { data: profile } = await supabase
        .from('mimall_client')
        .select('ui_state')
        .eq('user_id', session.user.id)
        .single()*/
      
    } else {
      setIsLoggedIn(false)
    }
  }

  return (
    <header className="bg-black/40 sticky top-0 z-50 backdrop-blur-sm border-b border-white/10">
      <nav className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <div className="border-2 border-amber-600 rounded-lg p-1">
                <Image src="/mimall-bg.jpg" alt="MiMall Logo" width={120} height={40} className="block" />
              </div>
            </Link>
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/" className="text-white hover:text-amber-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Home
              </Link>
              <Link href="/stores" className="text-white hover:text-amber-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Stores
              </Link>
              <Link href="/categories" className="text-white hover:text-amber-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Categories
              </Link>
              <Link href="/locations" className="text-white hover:text-amber-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Locations
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/mimall-medical" className="text-white hover:text-amber-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              MiLA Medical
            </Link>
            <Link href="/seller" className="text-white hover:text-amber-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Seller
            </Link>
            <Link href="/healthcare" className="text-white hover:text-amber-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Healthcare
            </Link>
            {isLoggedIn ? (
              <button
                onClick={() => supabase.auth.signOut()}
                className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}
