'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'

const DriverSignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    license: '',
    password: '',
    vehicleType: '',
    vehicleModel: '',
    vehicleYear: '',
    vehiclePlate: ''
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
            Sign Up as a Driver
          </motion.h1>
          <motion.p
            className="text-gray-300 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Join MiMall's delivery network
          </motion.p>
        </motion.div>

        <motion.form
          className="space-y-6"
          variants={item}
          onSubmit={handleSubmit}
        >
          <motion.div variants={item}>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              Full Name
            </label>
            <motion.input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
            <label htmlFor="license" className="block text-sm font-medium text-gray-300 mb-2">
              Driver's License Number
            </label>
            <motion.input
              type="text"
              id="license"
              value={formData.license}
              onChange={(e) => setFormData({ ...formData, license: e.target.value })}
              className="block w-full rounded-lg border border-gray-600 bg-black/30 p-3 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              required
              whileFocus={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </motion.div>

          <motion.div variants={item}>
            <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-300 mb-2">
              Vehicle Type
            </label>
            <motion.select
              id="vehicleType"
              value={formData.vehicleType}
              onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
              className="block w-full rounded-lg border border-gray-600 bg-black/30 p-3 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              required
              whileFocus={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <option value="">Select vehicle type</option>
              <option value="car">Car</option>
              <option value="motorcycle">Motorcycle</option>
              <option value="van">Van</option>
              <option value="truck">Truck</option>
            </motion.select>
          </motion.div>

          <motion.div variants={item}>
            <label htmlFor="vehicleModel" className="block text-sm font-medium text-gray-300 mb-2">
              Vehicle Model
            </label>
            <motion.input
              type="text"
              id="vehicleModel"
              value={formData.vehicleModel}
              onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
              className="block w-full rounded-lg border border-gray-600 bg-black/30 p-3 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              required
              whileFocus={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </motion.div>

          <motion.div variants={item}>
            <label htmlFor="vehicleYear" className="block text-sm font-medium text-gray-300 mb-2">
              Vehicle Year
            </label>
            <motion.input
              type="number"
              id="vehicleYear"
              value={formData.vehicleYear}
              onChange={(e) => setFormData({ ...formData, vehicleYear: e.target.value })}
              className="block w-full rounded-lg border border-gray-600 bg-black/30 p-3 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              required
              min="2000"
              max={new Date().getFullYear()}
              whileFocus={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </motion.div>

          <motion.div variants={item}>
            <label htmlFor="vehiclePlate" className="block text-sm font-medium text-gray-300 mb-2">
              Vehicle Plate Number
            </label>
            <motion.input
              type="text"
              id="vehiclePlate"
              value={formData.vehiclePlate}
              onChange={(e) => setFormData({ ...formData, vehiclePlate: e.target.value })}
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

          <motion.button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-700"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            Sign Up as Driver
          </motion.button>
        </motion.form>
      </motion.div>
    </motion.div>
  )
}

export default DriverSignUp

