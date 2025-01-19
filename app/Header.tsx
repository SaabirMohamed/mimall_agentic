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
    <header className="bg-black bg-opacity-20 position-sticky top-0 shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex  items-center">
            <Link href="/" className="flex-shrink-0 flex items-center border-amber-600 border border-solid p-2 rounded-lg border-[5px] " >
              <Image src="/mimall-bg.jpg" alt="MiMall Logo" width={120} height={40} className="block" />
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/" className="text-gray-900 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
              <Link href="/stores" className="text-white hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium">
                Stores
              </Link>
              <Link href="/categories" className="text-white hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium">
                Categories
              </Link>
              <Link href="/locations" className="text-white hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium">
                Locations
              </Link>
              <Link href="/michina" className="text-white hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium">
                MiChina
              </Link>
              {/* <Link href="/hailoride" className="text-white hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium">
                HailoRide
              </Link> */}
              <Link href="/miia" className="text-white hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium">
                MiiA Medical
              </Link>
              {isLoggedIn && (
                <Link href="/dashboard" className="text-amber-600 hover:text-purple-800 px-3 py-2 rounded-md text-sm font-medium">
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
                  <label htmlFor="shopper" className="text-sm text-amber-600">Shopper</label>
                  
                  <input
                    type="radio"
                    id="seller"
                    name="userType"
                    value="seller"
                    className="form-radio text-purple-600 ml-2"
                  />
                  <label htmlFor="seller" className="text-sm text-amber-600">Seller</label>
                  
                  <input
                    type="radio"
                    id="healthcare"
                    name="userType"
                    value="healthcare"
                    className="form-radio text-purple-600 ml-2 p-2"
                  />
                  <label htmlFor="healthcare" className="text-sm text-amber-600">Healthcare</label>
                </div>
                <Link
                  href="/login"
                  className="bg-amber-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700"
                >
                  Login
                </Link>
              </>
            ) : (
              <Link
                href="/login"
                className="bg-amber-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-amber-600"
                onClick={async () => {
                  await supabase.auth.signOut()
                  setIsLoggedIn(false)
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
