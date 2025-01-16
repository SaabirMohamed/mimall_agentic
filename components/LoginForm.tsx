'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { motion, AnimatePresence } from 'framer-motion'

interface FormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClientComponentClient()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [userType, setUserType] = useState(searchParams?.get('type') || 'shopper')
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
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

  useEffect(() => {
    if (searchParams) {
      const type = searchParams.get('type')
      if (type) {
        setUserType(type)
      }
    }
  }, [searchParams])

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true)
      setError('')
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `https://mimall.ageye.pro/auth/callback?type=${userType}`
        }
      })

      if (error) throw error
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      setError('')

      const { error, data } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      if (error) throw error

      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: data.user.id,
            user_type: userType,
            updated_at: new Date().toISOString(),
          })

        if (profileError) throw profileError
      }

      router.push('/dashboard')
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in')
    } finally {
      setIsLoading(false)
    }
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
          <motion.h2 
            className="text-3xl font-bold text-white capitalize"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {userType} Login
          </motion.h2>
          <motion.p 
            className="mt-2 text-sm text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Welcome back to MiMall
          </motion.p>
        </motion.div>

        <motion.div 
          className="mt-8 space-y-6"
          variants={item}
        >
          <motion.button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-3 rounded-lg bg-transparent px-4 py-3 text-black transition-colors hover:bg-gray-200 disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </motion.button>

          <motion.div 
            className="relative"
            variants={item}
          >
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <motion.span 
                className="bg-black/60 px-2 text-gray-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Or continue with email
              </motion.span>
            </div>
          </motion.div>

          <motion.form 
            onSubmit={handlePasswordSignIn} 
            className="mt-8 space-y-6"
            variants={item}
          >
            <motion.div 
              className="space-y-4"
              variants={item}
            >
              <motion.div variants={item}>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <motion.input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="block w-full rounded-lg border border-gray-600 bg-black/30 p-3 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Email address"
                  whileFocus={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              </motion.div>
              <motion.div variants={item}>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <motion.input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="block w-full rounded-lg border border-gray-600 bg-black/30 p-3 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Password"
                  whileFocus={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              </motion.div>
            </motion.div>

            <AnimatePresence>
              {error && (
                <motion.div 
                  className="rounded-lg bg-red-500/10 p-3 text-sm text-red-500"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div variants={item}>
              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </motion.button>
            </motion.div>
          </motion.form>

          <motion.div 
            className="text-center text-sm"
            variants={item}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Link href="/forgot-password" className="text-blue-400 hover:text-blue-300">
                Forgot your password?
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}