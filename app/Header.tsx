'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userType, setUserType] = useState<string | null>(null)
  const supabase = createClientComponentClient()
  const pathname = usePathname()

  useEffect(() => {
    checkUser()
  }, [pathname])

  async function checkUser() {
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      setIsLoggedIn(true)
      const { data: profile } = await supabase
        .from('mimall_client')
        .select('ui_state')
        .eq('user_id', session.user.id)
        .single()
      
      setUserType(profile?.ui_state?.user_type || null)
    } else {
      setIsLoggedIn(false)
      setUserType(null)
    }
  }

  return (
    <header className="bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image src="/mimall.png" alt="MiMall Logo" width={120} height={40} className="block" />
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/" className="text-gray-900 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
              <Link href="/stores" className="text-gray-900 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium">
                Stores
              </Link>
              <Link href="/categories" className="text-gray-900 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium">
                Categories
              </Link>
              <Link href="/locations" className="text-gray-900 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium">
                Locations
              </Link>
              <Link href="/michina" className="text-gray-900 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium">
                MiChina
              </Link>
              <Link href="/hailoride" className="text-gray-900 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium">
                HailoRide
              </Link>
              <Link href="/miia" className="text-gray-900 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium">
                MiiA Medical
              </Link>
              {isLoggedIn && (
                <Link href="/dashboard" className="text-purple-600 hover:text-purple-800 px-3 py-2 rounded-md text-sm font-medium">
                  Dashboard
                </Link>
              )}
            </div>
          </div>
          <div className="flex items-center">
            {!isLoggedIn ? (
              <>
                <div className="flex space-x-2 mr-4">
                  <input
                    type="radio"
                    id="shopper"
                    name="userType"
                    value="shopper"
                    defaultChecked
                    className="form-radio text-purple-600"
                  />
                  <label htmlFor="shopper" className="text-sm text-gray-700">Shopper</label>
                  
                  <input
                    type="radio"
                    id="seller"
                    name="userType"
                    value="seller"
                    className="form-radio text-purple-600 ml-2"
                  />
                  <label htmlFor="seller" className="text-sm text-gray-700">Seller</label>
                  
                  <input
                    type="radio"
                    id="healthcare"
                    name="userType"
                    value="healthcare"
                    className="form-radio text-purple-600 ml-2"
                  />
                  <label htmlFor="healthcare" className="text-sm text-gray-700">Healthcare</label>
                </div>
                <Link
                  href="/login"
                  className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700"
                >
                  Login
                </Link>
              </>
            ) : (
              <Link
                href="/login"
                className="bg-amber-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-amber-600"
                onClick={async () => {
                  await supabase.auth.signOut()
                  setIsLoggedIn(false)
                  setUserType(null)
                }}
              >
                Logout
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}
