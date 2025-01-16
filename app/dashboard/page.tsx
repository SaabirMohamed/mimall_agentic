'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

interface DashboardMetrics {
  uploadedProducts: number
  pendingApprovals: number
  optimizedListings: number
  totalSales: number
}

export default function DashboardPage() {
  const router = useRouter()
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    uploadedProducts: 0,
    pendingApprovals: 0,
    optimizedListings: 0,
    totalSales: 0
  })

  const supabase = createClientComponentClient()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login')
        return
      }
      // TODO: Fetch actual metrics from API using session.user.id
      setMetrics({
        uploadedProducts: 12,
        pendingApprovals: 3,
        optimizedListings: 8,
        totalSales: 15000
      })
    }
    checkAuth()
  }, [router, supabase.auth])

  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-7xl mx-auto glass">
        <h1 className="text-3xl font-bold mb-8">Seller Dashboard</h1>
        
        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-black bg-opacity-70 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Uploaded Products</h3>
            <p className="text-2xl">{metrics.uploadedProducts}</p>
          </div>
          <div className="bg-black bg-opacity-70 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Pending Approvals</h3>
            <p className="text-2xl">{metrics.pendingApprovals}</p>
          </div>
          <div className="bg-black bg-opacity-70 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">AI-Optimized Listings</h3>
            <p className="text-2xl">{metrics.optimizedListings}</p>
          </div>
          <div className="bg-black bg-opacity-70 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Total Sales</h3>
            <p className="text-2xl currency">{metrics.totalSales}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button 
            onClick={() => router.push('/dashboard/add-product')}
            className="bg-gold-500 text-black font-semibold py-3 px-6 rounded-lg hover:bg-gold-600 transition-colors"
          >
            Add Products
          </button>
          <button 
            onClick={() => router.push('/dashboard/listings')}
            className="bg-gold-500 text-black font-semibold py-3 px-6 rounded-lg hover:bg-gold-600 transition-colors"
          >
            View Listings
          </button>
          <button 
            onClick={() => router.push('/dashboard/analytics')}
            className="bg-gold-500 text-black font-semibold py-3 px-6 rounded-lg hover:bg-gold-600 transition-colors"
          >
            Sales Analytics
          </button>
        </div>

        {/* Recent Activity */}
        <div className="glass rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <p className="text-gray-300">No recent activity to display</p>
          </div>
        </div>
      </div>
    </div>
  )
}