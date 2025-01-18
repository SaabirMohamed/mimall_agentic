'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

interface ProductVariant {
  size: string
  color: string
}

interface ProductData {
  name: string
  description: string
  category: string
  brand: string
  sku: string
  price: string
  images: File[]
  quantity: string
  variants: ProductVariant[]
}

export default function AddProductPage() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [step, setStep] = useState(1)

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login')
      }
    }
    checkAuth()
  }, [router, supabase.auth])

  const [productData, setProductData] = useState<ProductData>({
    name: '',
    description: '',
    category: '',
    brand: '',
    sku: '',
    price: '',
    images: [],
    quantity: '',
    variants: []
  })
  const [aiSuggestions, setAiSuggestions] = useState<{
    title: string;
    description: string;
    keywords: string[];
  }>({
    title: '',
    description: '',
    keywords: []
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setProductData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProductData(prev => ({
        ...prev,
        images: [...Array.from(e.target.files!)]
      }))
    }
  }

  const handleAddVariant = () => {
    setProductData(prev => ({
      ...prev,
      variants: [...prev.variants, { size: '', color: '' }]
    }))
  }

  const handleVariantChange = (index: number, field: 'size' | 'color', value: string) => {
    setProductData(prev => {
      const newVariants = [...prev.variants]
      newVariants[index] = { ...newVariants[index], [field]: value }
      return { ...prev, variants: newVariants }
    })
  }

  const generateAiSuggestions = async () => {
    // TODO: Integrate with AI API
    setAiSuggestions({
      title: `Premium ${productData.name}`,
      description: `High-quality ${productData.name} by ${productData.brand}. ${productData.description}`,
      keywords: ['premium', productData.category, productData.brand]
    })
  }

  const handleSubmit = async () => {
    try {
      // TODO: Submit to API
      router.push('/dashboard')
    } catch (error) {
      console.error('Error submitting product:', error)
    }
  }

  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-4xl mx-auto glass p-6">
        <h1 className="text-3xl font-bold mb-8">Add New Product</h1>

        {/* Progress Steps */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`w-1/4 text-center ${
                s === step ? 'text-gold-500' : 'text-gray-500'
              }`}
            >
              Step {s}
            </div>
          ))}
        </div>

        {/* Step 1: Product Information */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Product Information</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={productData.name}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg glass border border-gray-700"
              />
              <textarea
                name="description"
                placeholder="Product Description"
                value={productData.description}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg glass border border-gray-700"
                rows={4}
              />
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={productData.category}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg glass border border-gray-700"
              />
              <input
                type="text"
                name="brand"
                placeholder="Brand"
                value={productData.brand}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg glass border border-gray-700"
              />
              <input
                type="text"
                name="sku"
                placeholder="SKU"
                value={productData.sku}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg glass border border-gray-700"
              />
              <input
                type="number"
                name="price"
                placeholder="Price (ZAR)"
                value={productData.price}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg glass border border-gray-700"
              />
            </div>
          </div>
        )}

        {/* Step 2: Media Upload */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Media Upload</h2>
            <div 
              className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault()
                const files = Array.from(e.dataTransfer.files)
                setProductData(prev => ({
                  ...prev,
                  images: [...prev.images, ...files]
                }))
              }}
            >
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label 
                htmlFor="image-upload"
                className="cursor-pointer text-gold-500 hover:text-gold-600"
              >
                Click to upload or drag images here
              </label>
            </div>
            {productData.images.length > 0 && (
              <div className="grid grid-cols-3 gap-4">
                {productData.images.map((image, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={URL.createObjectURL(image)}
                      alt={`Product ${index + 1}`}
                      width={300}
                      height={128}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Step 3: Inventory and Variants */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Inventory & Variants</h2>
            <input
              type="number"
              name="quantity"
              placeholder="Stock Quantity"
              value={productData.quantity}
              onChange={handleInputChange}
              className="w-full p-3 rounded-lg glass border border-gray-700"
            />
            <div className="space-y-4">
              {productData.variants.map((variant, index) => (
                <div key={index} className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Size"
                    value={variant.size}
                    onChange={(e) => handleVariantChange(index, 'size', e.target.value)}
                    className="w-1/2 p-3 rounded-lg glass border border-gray-700"
                  />
                  <input
                    type="text"
                    placeholder="Color"
                    value={variant.color}
                    onChange={(e) => handleVariantChange(index, 'color', e.target.value)}
                    className="w-1/2 p-3 rounded-lg glass border border-gray-700"
                  />
                </div>
              ))}
              <button
                onClick={handleAddVariant}
                className="w-full p-3 rounded-lg glass hover:bg-opacity-50 transition-colors"
              >
                Add Variant
              </button>
            </div>
          </div>
        )}

        {/* Step 4: AI Optimization */}
        {step === 4 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">AI Optimization</h2>
            <button
              onClick={generateAiSuggestions}
              className="w-full p-3 rounded-lg bg-gold-500 text-black font-semibold hover:bg-gold-600 transition-colors mb-6"
            >
              Generate AI Suggestions
            </button>
            {aiSuggestions.title && (
              <div className="space-y-4 glass p-6 rounded-lg">
                <div>
                  <h3 className="font-semibold mb-2">Suggested Title</h3>
                  <p>{aiSuggestions.title}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Suggested Description</h3>
                  <p>{aiSuggestions.description}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Suggested Keywords</h3>
                  <div className="flex flex-wrap gap-2">
                    {aiSuggestions.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 glass rounded-full text-sm"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="px-6 py-2 rounded-lg glass hover:bg-opacity-50 transition-colors"
            >
              Previous
            </button>
          )}
          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-6 py-2 rounded-lg bg-gold-500 text-black font-semibold hover:bg-gold-600 transition-colors"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 rounded-lg bg-gold-500 text-black font-semibold hover:bg-gold-600 transition-colors"
            >
              Submit Product
            </button>
          )}
        </div>
      </div>
    </div>
  )
}