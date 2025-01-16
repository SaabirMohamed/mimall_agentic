'use client'

import React from 'react'
import { Watch, Diamond, Briefcase, Car, ShoppingBag, Shirt, Gift, Utensils } from 'lucide-react'
import { motion } from 'framer-motion'

const categories = [
  { name: 'Watches & Jewelry', icon: Watch },
  { name: 'Fashion & Accessories', icon: ShoppingBag },
  { name: 'Beauty & Fragrance', icon: Diamond },
  { name: 'Electronics & Gadgets', icon: Briefcase },
  { name: 'Home & Decor', icon: Utensils },
  { name: 'Automotive', icon: Car },
  { name: 'Travel & Luggage', icon: Shirt },
  { name: 'Gifts & Experiences', icon: Gift },
]

const CategoriesPage = () => {
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
      className="container mx-auto my-8 text-gray-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-4xl text-green-500 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Product Categories
      </motion.h1>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-gray-200"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {categories.map((category) => (
          <motion.div
            key={category.name}
            className="bg-black text-gray-200 bg-opacity-70 shadow-md rounded-lg p-6 text-center"
            variants={item}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <category.icon className="mx-auto mb-4 text-amber-500" size={48} />
            </motion.div>
            <motion.h2
              className="text-xl font-semibold text-amber-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {category.name}
            </motion.h2>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default CategoriesPage

