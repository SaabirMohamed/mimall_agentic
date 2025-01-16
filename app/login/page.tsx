'use client'

import { Suspense } from 'react'
import LoginForm from '../../components/LoginForm'
import { motion } from 'framer-motion'

export default function LoginPage() {
  return (
    <motion.div
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <LoginForm />
        </motion.div>
      </Suspense>
    </motion.div>
  )
}