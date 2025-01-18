'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

interface Product {
  id: string
  name: string
  price: number
  category: string
  status: 'pending' | 'active' | 'optimized'
  aiScore: number
  thumbnail: string
  createdAt: string
}

export default function ListingsPage() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [filter, setFilter] = useState('all')
const supabase = createClientComponentClient()

useEffect(() => {
  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      router.push('/login')
      return
    }

    // TODO: Fetch actual products from API using session.user.id
    setProducts([
      {
        id: '1',
        name: 'Sample Product',
        price: 299.99,
        category: 'Electronics',
        status: 'optimized',
        aiScore: 92,
        thumbnail: '/placeholder.jpg',
        createdAt: '2024-01-14'
      }
    ])
  }
  checkAuth()
}, [router, supabase.auth])

  const getStatusColor = (status: Product['status']) => {
    switch (status) {
      case 'optimized':
        return 'text-green-500'
      case 'pending':
        return 'text-yellow-500'
      case 'active':
        return 'text-blue-500'
      default:
        return 'text-gray-500'
    }
  }

  const handleOptimize = async (productId: string) => {
    // TODO: Integrate with AI optimization API
    console.log('Optimizing product:', productId)
  }

  const handleDelete = async (productId: string) => {
    // TODO: Integrate with delete API
    console.log('Deleting product:', productId)
  }

  const filteredProducts = products.filter(product => {
    if (filter === 'all') return true
    return product.status === filter
  })

  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-7xl mx-auto glass p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Product Listings</h1>
          <button
            onClick={() => router.push('/dashboard/add-product')}
            className="bg-gold-500 text-black font-semibold px-6 py-2 rounded-lg hover:bg-gold-600 transition-colors"
          >
            Add New Product
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          {['all', 'pending', 'active', 'optimized'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg capitalize ${
                filter === status
                  ? 'bg-gold-500 text-black'
                  : 'glass text-white hover:bg-opacity-50'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="glass rounded-lg overflow-hidden"
            >
              <div className="aspect-w-16 aspect-h-9 glass">
                <Image
                  src={product.thumbnail}
                  alt={product.name}
                  width={400}
                  height={192}
                  className="object-cover w-full h-48"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <span className={`${getStatusColor(product.status)} capitalize`}>
                    {product.status}
                  </span>
                </div>
                <p className="text-gray-400 mb-2">Category: {product.category}</p>
                <p className="text-xl font-bold mb-4 currency">{product.price}</p>
                
                {product.status === 'optimized' && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-400">AI Optimization Score</p>
                    <div className="flex items-center">
                      <div className="flex-1 glass rounded-full h-2 mr-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${product.aiScore}%` }}
                        />
                      </div>
                      <span className="text-green-500">{product.aiScore}%</span>
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() => handleOptimize(product.id)}
                    className="flex-1 px-3 py-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors"
                  >
                    Optimize
                  </button>
                  <button
                    onClick={() => router.push(`/dashboard/edit-product/${product.id}`)}
                    className="flex-1 px-3 py-2 glass rounded hover:bg-opacity-50 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="px-3 py-2 bg-red-600 rounded hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No products found</p>
          </div>
        )}
      </div>
    </div>
  )
}