'use client'

import { Suspense } from 'react'
import LoginForm from '../../components/LoginForm'

export default function LoginPage() {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  )
}