'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'

const SellerSignUp = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    businessType: '',
    description: ''
  })

  const container = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
  }

  return (
    <motion.div
      className="flex min-h-screen flex-col items-center justify-start p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-full max-w-md space-y-8 rounded-2xl bg-black/60 p-8 shadow-lg backdrop-blur-sm"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div className="text-center" variants={item}>
          <motion.h1
            className="text-3xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Sign Up as a Seller/Retailer
          </motion.h1>
          <motion.p
            className="text-gray-300 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Join MiMall and start selling your products
          </motion.p>
        </motion.div>

        <motion.form
          className="space-y-6"
          variants={item}
          onSubmit={handleSubmit}
        >
          <motion.div variants={item}>
            <label htmlFor="businessName" className="block text-sm font-medium text-gray-300 mb-2">
              Business Name
            </label>
            <motion.input
              type="text"
              id="businessName"
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              className="block w-full rounded-lg border border-gray-600 bg-black/30 p-3 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              required
              whileFocus={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </motion.div>

          <motion.div variants={item}>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <motion.input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="block w-full rounded-lg border border-gray-600 bg-black/30 p-3 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              required
              whileFocus={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </motion.div>

          <motion.div variants={item}>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <motion.input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="block w-full rounded-lg border border-gray-600 bg-black/30 p-3 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              required
              whileFocus={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </motion.div>

          <motion.div variants={item}>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
              Phone Number
            </label>
            <motion.input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="block w-full rounded-lg border border-gray-600 bg-black/30 p-3 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              required
              whileFocus={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </motion.div>

          <motion.div variants={item}>
            <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-2">
              Business Address
            </label>
            <motion.textarea
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="block w-full rounded-lg border border-gray-600 bg-black/30 p-3 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              required
              rows={3}
              whileFocus={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </motion.div>

          <motion.div variants={item}>
            <label htmlFor="businessType" className="block text-sm font-medium text-gray-300 mb-2">
              Business Type
            </label>
            <motion.select
              id="businessType"
              value={formData.businessType}
              onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
              className="block w-full rounded-lg border border-gray-600 bg-black/30 p-3 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              required
              whileFocus={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <option value="">Select business type</option>
              <option value="retail">Retail</option>
              <option value="wholesale">Wholesale</option>
              <option value="manufacturer">Manufacturer</option>
              <option value="service">Service Provider</option>
            </motion.select>
          </motion.div>

          <motion.div variants={item}>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
              Business Description
            </label>
            <motion.textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="block w-full rounded-lg border border-gray-600 bg-black/30 p-3 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              required
              rows={4}
              whileFocus={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </motion.div>

          <motion.button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-700"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            Sign Up as Seller
          </motion.button>
        </motion.form>
      </motion.div>
    </motion.div>
  )
}

export default SellerSignUp

