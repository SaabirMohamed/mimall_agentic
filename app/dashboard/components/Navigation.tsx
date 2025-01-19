'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function DashboardNavigation() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname?.startsWith(path) ? 'bg-gold-500 text-black' : 'text-gray-300 hover:text-white hover:bg-gray-700'
  }

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex space-x-4">
          <Link
            href="/dashboard"
            className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/dashboard')}`}
          >
            Dashboard
          </Link>
          
          <Link
            href="/dashboard/products"
            className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/dashboard/products')}`}
          >
            Products
          </Link>

          <Link
            href="/dashboard/add-product"
            className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/dashboard/add-product')}`}
          >
            Add Product
          </Link>

          <Link
            href="/dashboard/analytics"
            className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/dashboard/analytics')}`}
          >
            Analytics
          </Link>
        </div>
      </div>
    </nav>
  )
}
