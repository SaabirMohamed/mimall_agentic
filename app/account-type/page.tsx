'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { AccountType } from '@/types/auth'

export default function AccountTypePage() {
  const router = useRouter()
  const [hasSelectedType, setHasSelectedType] = useState(false)

  useEffect(() => {
    // Check if user has already selected an account type
    const accountType = localStorage.getItem('accountType')
    if (accountType) {
      setHasSelectedType(true)
      router.push('/') // Redirect to home if already selected
    }
  }, [router])

  const handleAccountTypeSelection = (type: AccountType) => {
    localStorage.setItem('accountType', type)
    switch (type) {
      case 'healthcare':
        router.push('/onboarding/healthcare')
        break
      case 'seller':
        router.push('/onboarding/seller')
        break
      case 'shopper':
        router.push('/onboarding/shopper')
        break
    }
  }

  if (hasSelectedType) {
    return null // Don't render anything while redirecting
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-rose-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
            Select Your Account Type
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Shopper Card */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 cursor-pointer hover:bg-white/20 transition-all"
              onClick={() => handleAccountTypeSelection('shopper')}
            >
              <h3 className="text-2xl font-bold text-white mb-4">Shopper</h3>
              <p className="text-white/80">
                Browse and shop from our wide selection of products and services.
              </p>
            </motion.div>

            {/* Seller Card */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 cursor-pointer hover:bg-white/20 transition-all"
              onClick={() => handleAccountTypeSelection('seller')}
            >
              <h3 className="text-2xl font-bold text-white mb-4">Seller</h3>
              <p className="text-white/80">
                Set up your store and start selling your products to our community.
              </p>
            </motion.div>

            {/* Healthcare Professional Card */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 cursor-pointer hover:bg-white/20 transition-all"
              onClick={() => handleAccountTypeSelection('healthcare')}
            >
              <h3 className="text-2xl font-bold text-white mb-4">Healthcare Professional</h3>
              <p className="text-white/80">
                Join our healthcare network and connect with patients seeking your services.
              </p>
            </motion.div>
          </div>

          <p className="text-white/60 text-center mt-8">
            This selection will determine your experience on our platform.
            Choose the option that best describes your role.
          </p>
        </div>
      </div>
    </div>
  )
}
