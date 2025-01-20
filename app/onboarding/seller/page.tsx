'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Seller } from '@/types/auth'

const businessTypes = [
  'Retail Store',
  'Online Store',
  'Restaurant',
  'Service Provider',
  'Manufacturer',
  'Distributor',
  'Artisan/Craftsperson',
  'Technology',
  'Fashion & Apparel',
  'Health & Beauty',
  'Food & Beverage',
  'Electronics',
  'Home & Living',
  'Sports & Fitness',
  'Other'
]

export default function SellerOnboarding() {
  const router = useRouter()
  const [formData, setFormData] = useState<Partial<Seller>>({
    type: 'seller',
    businessName: '',
    businessType: '',
    categories: [],
    storeLocation: '',
    description: '',
    contactEmail: '',
    contactPhone: '',
    website: '',
    socialMedia: {
      facebook: '',
      instagram: '',
      twitter: ''
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Save to localStorage for now
    localStorage.setItem('userProfile', JSON.stringify(formData))
    router.push('/')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name.startsWith('social_')) {
      const platform = name.replace('social_', '')
      setFormData(prev => ({
        ...prev,
        socialMedia: {
          ...prev.socialMedia,
          [platform]: value
        }
      }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleCategoriesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const categories = e.target.value.split(',').map(cat => cat.trim())
    setFormData(prev => ({ ...prev, categories }))
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
            <h1 className="text-3xl font-bold text-white mb-8">Seller Profile</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Business Name */}
              <div>
                <label className="block text-white mb-2">Business Name</label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/20 text-white"
                  placeholder="Your business name"
                  required
                />
              </div>

              {/* Business Type */}
              <div>
                <label className="block text-white mb-2">Business Type</label>
                <select
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/20 text-white"
                  required
                >
                  <option value="">Select business type</option>
                  {businessTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Categories */}
              <div>
                <label className="block text-white mb-2">Categories (comma-separated)</label>
                <input
                  type="text"
                  value={formData.categories?.join(', ')}
                  onChange={handleCategoriesChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/20 text-white"
                  placeholder="Category 1, Category 2, ..."
                  required
                />
              </div>

              {/* Store Location */}
              <div>
                <label className="block text-white mb-2">Store Location</label>
                <input
                  type="text"
                  name="storeLocation"
                  value={formData.storeLocation}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/20 text-white"
                  placeholder="Your store address"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-white mb-2">Business Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/20 text-white"
                  placeholder="Describe your business..."
                  rows={4}
                  required
                />
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white mb-2">Contact Email</label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-white/20 text-white"
                    placeholder="business@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">Contact Phone</label>
                  <input
                    type="tel"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-white/20 text-white"
                    placeholder="Your phone number"
                    required
                  />
                </div>
              </div>

              {/* Website */}
              <div>
                <label className="block text-white mb-2">Website (optional)</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/20 text-white"
                  placeholder="https://your-website.com"
                />
              </div>

              {/* Social Media */}
              <div className="space-y-4">
                <h3 className="text-white font-semibold">Social Media (optional)</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-white mb-2">Facebook</label>
                    <input
                      type="text"
                      name="social_facebook"
                      value={formData.socialMedia?.facebook}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg bg-white/20 text-white"
                      placeholder="Facebook URL"
                    />
                  </div>
                  <div>
                    <label className="block text-white mb-2">Instagram</label>
                    <input
                      type="text"
                      name="social_instagram"
                      value={formData.socialMedia?.instagram}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg bg-white/20 text-white"
                      placeholder="Instagram URL"
                    />
                  </div>
                  <div>
                    <label className="block text-white mb-2">Twitter</label>
                    <input
                      type="text"
                      name="social_twitter"
                      value={formData.socialMedia?.twitter}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg bg-white/20 text-white"
                      placeholder="Twitter URL"
                    />
                  </div>
                </div>
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
