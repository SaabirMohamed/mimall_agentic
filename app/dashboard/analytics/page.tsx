'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

interface SalesData {
  date: string
  amount: number
}

interface ProductPerformance {
  id: string
  name: string
  sales: number
  revenue: number
  trend: 'up' | 'down' | 'stable'
}

interface AiInsight {
  type: 'success' | 'warning' | 'info'
  message: string
  recommendation: string
}

export default function AnalyticsPage() {
  const router = useRouter()
  const [salesData, setSalesData] = useState<SalesData[]>([])
  const [topProducts, setTopProducts] = useState<ProductPerformance[]>([])
  const [insights, setInsights] = useState<AiInsight[]>([])

  const supabase = createClientComponentClient()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login')
        return
      }

      // TODO: Fetch actual data from API using session.user.id
      setSalesData([
        { date: '2024-01-14', amount: 1500 },
        { date: '2024-01-13', amount: 2200 },
        { date: '2024-01-12', amount: 1800 },
        { date: '2024-01-11', amount: 2500 },
        { date: '2024-01-10', amount: 1900 }
      ])

      setTopProducts([
        {
          id: '1',
          name: 'Premium Product',
          sales: 45,
          revenue: 13500,
          trend: 'up'
        },
        {
          id: '2',
          name: 'Standard Product',
          sales: 32,
          revenue: 6400,
          trend: 'stable'
        },
        {
          id: '3',
          name: 'Basic Product',
          sales: 28,
          revenue: 4200,
          trend: 'down'
        }
      ])

      setInsights([
        {
          type: 'success',
          message: 'Your premium products are performing well',
          recommendation: 'Consider expanding your premium product line'
        },
        {
          type: 'warning',
          message: 'Basic product sales are declining',
          recommendation: 'Review pricing strategy for basic products'
        },
        {
          type: 'info',
          message: 'New market trend detected',
          recommendation: 'Add products in the emerging category'
        }
      ])
    }
    checkAuth()
  }, [router, supabase.auth])

  const getTrendIcon = (trend: ProductPerformance['trend']) => {
    switch (trend) {
      case 'up':
        return '↑'
      case 'down':
        return '↓'
      default:
        return '→'
    }
  }

  const getTrendColor = (trend: ProductPerformance['trend']) => {
    switch (trend) {
      case 'up':
        return 'text-green-500'
      case 'down':
        return 'text-red-500'
      default:
        return 'text-yellow-500'
    }
  }

  const getInsightColor = (type: AiInsight['type']) => {
    switch (type) {
      case 'success':
        return 'border-green-500 bg-green-500/10'
      case 'warning':
        return 'border-yellow-500 bg-yellow-500/10'
      case 'info':
        return 'border-blue-500 bg-blue-500/10'
      default:
        return 'border-gray-500 bg-gray-500/10'
    }
  }

  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-7xl mx-auto glass">
        <h1 className="text-3xl font-bold mb-8">Sales Analytics</h1>

        {/* Sales Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Sales Chart */}
          <div className="glass p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Sales Trend</h2>
            <div className="h-64 flex items-end justify-between gap-2">
              {salesData.map((data, index) => {
                const height = (data.amount / 3000) * 100
                return (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div
                      className="w-full bg-gold-500 rounded-t"
                      style={{ height: `${height}%` }}
                    />
                    <p className="text-xs mt-2 rotate-45 origin-left">
                      {new Date(data.date).toLocaleDateString()}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Top Products */}
          <div className="glass p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Top Performing Products</h2>
            <div className="space-y-4">
              {topProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-4 glass rounded-lg"
                >
                  <div>
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-gray-400">
                      {product.sales} sales
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold currency">{product.revenue}</p>
                    <p className={`text-sm ${getTrendColor(product.trend)}`}>
                      {getTrendIcon(product.trend)} {product.trend}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <div className="glass p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">AI-Driven Insights</h2>
          <div className="grid gap-4">
            {insights.map((insight, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg ${getInsightColor(
                  insight.type
                )}`}
              >
                <p className="font-semibold mb-2">{insight.message}</p>
                <p className="text-sm text-gray-400">
                  Recommendation: {insight.recommendation}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}