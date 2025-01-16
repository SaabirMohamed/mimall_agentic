'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const stores = [
  { name: 'Elegance Emporium', logo: '/heart.jpg', description: 'Curated collections for the discerning shopper.' },
  { name: 'Luxe Haven', logo: '/heart.jpg', description: 'Where luxury meets comfort in perfect harmony.' },
  { name: 'Opulent Oasis', logo: '/heart.jpg', description: 'Discover a world of refined tastes and exquisite craftsmanship.' },
]

const StorePresentations = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
        className="text-3xl mb-8 text-center text-gray-200"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Featured Boutiques
      </motion.h2>
      <motion.div
        className="grid md:grid-cols-3 gap-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {stores.map((store) => (
          <motion.div
            key={store.name}
            className="form-card"
            variants={item}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={store.logo}
                alt={store.name}
                width={128}
                height={128}
                className="mx-auto mb-4 w-auto h-auto"
              />
            </motion.div>
            <motion.h3
              className="text-xl mb-2 text-gray-900"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {store.name}
            </motion.h3>
            <motion.p
              className="mb-4 text-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {store.description}
            </motion.p>
            <motion.button
              className="btn btn-primary w-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              Explore Collection
            </motion.button>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default StorePresentations

