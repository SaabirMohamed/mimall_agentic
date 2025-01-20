'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Shopper } from '@/types/auth'

const categories = [
  'Electronics',
  'Fashion & Apparel',
  'Home & Living',
  'Health & Beauty',
  'Sports & Fitness',
  'Books & Media',
  'Food & Beverage',
  'Toys & Games',
  'Art & Crafts',
  'Automotive',
  'Pet Supplies',
  'Office Supplies'
]

export default function ShopperOnboarding() {
  const router = useRouter()
  const [formData, setFormData] = useState<Partial<Shopper>>({
    type: 'shopper',
    preferences: [],
    favoriteCategories: []
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Save to localStorage for now
    localStorage.setItem('userProfile', JSON.stringify(formData))
    router.push('/')
  }

  const handleCategoryChange = (category: string) => {
    setFormData(prev => ({
      ...prev,
      favoriteCategories: prev.favoriteCategories?.includes(category)
        ? prev.favoriteCategories.filter(c => c !== category)
        : [...(prev.favoriteCategories || []), category]
    }))
  }

  const handlePreferencesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const preferences = e.target.value.split(',').map(pref => pref.trim())
    setFormData(prev => ({ ...prev, preferences }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-rose-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-md rounded-xl p-8"
          >
            <h1 className="text-3xl font-bold text-white mb-8">Welcome Shopper!</h1>
            <p className="text-white/80 mb-8">
              Help us personalize your shopping experience by telling us a bit about your preferences.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Favorite Categories */}
              <div>
                <label className="block text-white mb-4 text-lg font-semibold">
                  Select your favorite categories
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {categories.map(category => (
                    <motion.div
                      key={category}
                      whileTap={{ scale: 0.95 }}
                      className={`
                        p-4 rounded-lg cursor-pointer transition-all
                        ${formData.favoriteCategories?.includes(category)
                          ? 'bg-amber-600 text-white'
                          : 'bg-white/10 text-white/80 hover:bg-white/20'}
                      `}
                      onClick={() => handleCategoryChange(category)}
                    >
                      {category}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Shopping Preferences */}
              <div>
                <label className="block text-white mb-2 text-lg font-semibold">
                  Shopping Preferences
                </label>
                <p className="text-white/60 mb-4 text-sm">
                  Enter your preferences (e.g., eco-friendly, budget-friendly, luxury, etc.)
                </p>
                <input
                  type="text"
                  value={formData.preferences?.join(', ')}
                  onChange={handlePreferencesChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/20 text-white"
                  placeholder="Enter preferences, separated by commas"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
              >
                Complete Profile
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
