'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const stores = [
  {
    name: "Gucci",
    description: "Italian luxury fashion house",
    logo: "/gucci_card.jpeg",
    location: "Ground Floor, Diamond Walk"
  },
  {
    name: "Louis Vuitton",
    description: "French luxury goods company",
    logo: "/louis_vuitton_card.jpeg",
    location: "Upper Level, Diamond Walk"
  },
  {
    name: "Cartier",
    description: "French luxury goods conglomerate",
    logo: "/cartier_card.jpeg",
    location: "Ground Floor, Diamond Walk"
  },
  {
    name: "Prada",
    description: "Italian luxury fashion house",
    logo: "/prada_card.jpeg",
    location: "Upper Level, Diamond Walk"
  },
  {
    name: "Nike",
    description: "Nike luxury brand",
    logo: "/nike_card.jpeg",
    location: "Ground Floor, Sandton City"
  },
  {
    name: "Tiffany & Co.",
    description: "American luxury jewelry retailer",
    logo: "/tiffany_card.jpeg",
    location: "Ground Floor, Diamond Walk"
  }
]

const StoresPage = () => {
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
        className="text-4xl text-gray-200 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Our Luxury Stores
      </motion.h1>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {stores.map((store) => (
          <motion.div
            key={store.name}
            className="bg-black bg-opacity-70 shadow-md rounded-lg overflow-hidden"
            variants={item}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)"
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={store.logo}
                alt={store.name}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
            </motion.div>
            <motion.div
              className="p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.h2
                className="text-xl text-gray-200 font-bold mb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                {store.name}
              </motion.h2>
              <motion.p
                className="text-gray-200 mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {store.description}
              </motion.p>
              <motion.p
                className="text-sm text-gray-200-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {store.location}
              </motion.p>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default StoresPage

