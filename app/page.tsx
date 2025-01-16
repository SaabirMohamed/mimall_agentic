'use client'

import React from 'react'
import Link from 'next/link'
import SearchBar from '../components/SearchBar'
import LuxuryCategories from '../components/LuxuryCategories'
import StorePresentations from '../components/StorePresentations'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <motion.div
      className="container mx-auto my-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="text-center mb-12">
        <motion.h1
          className="text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >Welcome to MiMall</motion.h1>
        <motion.p
          className="text-xl mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >Your Modern, Intelligent Mall for All your Luxury Lifestyle needs</motion.p>
        <SearchBar />
      </div>
      <LuxuryCategories />
      <StorePresentations />
      <div className="mt-12 text-center">
        <h2 className="text-2xl mb-4">Join MiMall Today</h2>
        <div className="flex justify-center space-x-4">
          <Link href="/signup/buyer" className="btn btn-primary">Sign Up as Buyer</Link>
          <Link href="/signup/seller" className="btn btn-secondary">Sign Up as Seller</Link>
          <Link href="/signup/driver" className="btn btn-primary">Sign Up as Driver</Link>
        </div>
      </div>
      <div className="mt-12 text-center">
        <h2 className="text-2xl mb-4">Explore Our Other Marketplaces</h2>
        <div className="flex justify-center space-x-4">
          <Link href="/michina" className="btn btn-red">
            Explore MiChina: Your Marketplace Inspired by China
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
