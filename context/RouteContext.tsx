'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

type RouteContextType = {
  currentRoute: string
  isAgenticUIVisible: boolean
}

const RouteContext = createContext<RouteContextType>({
  currentRoute: '',
  isAgenticUIVisible: true
})

export const useRoute = () => useContext(RouteContext)

export function RouteProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [currentRoute, setCurrentRoute] = useState(pathname)
  const [isAgenticUIVisible, setIsAgenticUIVisible] = useState(true)

  useEffect(() => {
    setCurrentRoute(pathname)
    // Hide AgenticUI on /miia route
    setIsAgenticUIVisible(pathname !== '/miia')
  }, [pathname])

  return (
    <RouteContext.Provider value={{ currentRoute, isAgenticUIVisible }}>
      {children}
    </RouteContext.Provider>
  )
}
