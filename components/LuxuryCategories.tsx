'use client'

import React from 'react'
import { Watch, Diamond, Briefcase, Car } from 'lucide-react'
import { motion } from 'framer-motion'

const categories = [
  { name: 'Timeless Jewelry', icon: Diamond },
  { name: 'Luxury Watches', icon: Watch },
  { name: 'Designer Accessories', icon: Briefcase },
  { name: 'Premium Automobiles', icon: Car },
]

const LuxuryCategories = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <motion.div
      className="container mx-auto my-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        className="text-3xl mb-8 text-gray-200 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Explore Luxury
      </motion.h2>
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {categories.map((category) => (
          <motion.div
            key={category.name}
            className="form-card text-center group"
            variants={item}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              className="mb-4 p-6 bg-black bg-opacity-70 rounded-full shadow-md inline-block group-hover:shadow-lg transition-shadow duration-300"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8 }}
            >
              <category.icon className="text-gray-200" size={64} />
            </motion.div>
            <motion.h3
              className="text-xl text-gray-900"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {category.name}
            </motion.h3>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default LuxuryCategories

