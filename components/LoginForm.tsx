'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

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

      // Update user profile with type
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
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-black/60 p-8 shadow-lg backdrop-blur-sm">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white capitalize">
            {userType} Login
          </h2>
          <p className="mt-2 text-sm text-gray-300">
            Welcome back to MiMall
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-3 rounded-lg bg-white px-4 py-3 text-black transition-colors hover:bg-gray-200 disabled:opacity-50"
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
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-black/60 px-2 text-gray-300">Or continue with email</span>
            </div>
          </div>

          <form onSubmit={handlePasswordSignIn} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="block w-full rounded-lg border border-gray-600 bg-black/30 p-3 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="block w-full rounded-lg border border-gray-600 bg-black/30 p-3 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Password"
                />
              </div>
            </div>

            {error && (
              <div className="rounded-lg bg-red-500/10 p-3 text-sm text-red-500">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          <div className="text-center text-sm">
            <Link href="/forgot-password" className="text-blue-400 hover:text-blue-300">
              Forgot your password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}