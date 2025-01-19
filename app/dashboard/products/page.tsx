'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { supabase } from '../../../lib/supabase'
import type { Product, ProductImage } from '../../../lib/supabase'

interface ProductWithImage extends Product {
  primary_image?: ProductImage
}

export default function ProductsPage() {
  const router = useRouter()
  const [products, setProducts] = useState<ProductWithImage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      // Fetch products
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (productsError) throw productsError

      // Fetch primary images for each product
      const productsWithImages = await Promise.all(
        productsData.map(async (product) => {
          const { data: imageData } = await supabase
            .from('product_images')
            .select('*')
            .eq('product_id', product.id)
            .eq('is_primary', true)
            .single()

          return {
            ...product,
            primary_image: imageData || undefined
          }
        })
      )

      setProducts(productsWithImages)
    } catch (error) {
      console.error('Error loading products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (productId: string) => {
    try {
      // Delete product (cascade will handle images)
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId)

      if (error) throw error

      // Refresh products list
      loadProducts()
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gold-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Products</h1>
          <button
            onClick={() => router.push('/dashboard/add-product')}
            className="px-6 py-2 rounded-lg bg-gold-500 text-black font-semibold hover:bg-gold-600 transition-colors"
          >
            Add Product
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="glass rounded-lg overflow-hidden">
              <div className="relative h-48">
                {product.primary_image ? (
                  <Image
                    src={product.primary_image.url}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-800">
                    <span className="text-gray-500">No image</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-400 mb-2 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-gold-500 font-semibold">
                    R{product.price.toFixed(2)}
                  </span>
                  <div className="space-x-2">
                    <button
                      onClick={() => router.push(`/dashboard/products/${product.id}`)}
                      className="px-4 py-1 rounded glass hover:bg-opacity-50 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="px-4 py-1 rounded bg-red-500 hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No products found</p>
            <button
              onClick={() => router.push('/dashboard/add-product')}
              className="px-6 py-2 rounded-lg bg-gold-500 text-black font-semibold hover:bg-gold-600 transition-colors"
            >
              Add Your First Product
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
