'use client'

import { useState } from 'react'
import { MapPin } from 'lucide-react'

export default function Map() {
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')

  return (
    <div className="h-[500px] w-full rounded-lg overflow-hidden relative">
      {/* Map Container */}
      <div className="absolute inset-0 bg-gray-200 animate-pulse">
        {/* Map will be rendered here */}
      </div>

      {/* Search Controls */}
      <div className="absolute top-4 left-4 right-4 glass p-4 rounded-lg space-y-2">
        <div className="flex items-center gap-2">
          <MapPin className="text-gold-500" />
          <input
            type="text"
            placeholder="Enter pickup location"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="flex-1 bg-transparent outline-none placeholder:text-gray-400"
          />
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="text-gold-500" />
          <input
            type="text"
            placeholder="Enter destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="flex-1 bg-transparent outline-none placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Ride Options */}
      <div className="absolute bottom-4 left-4 right-4 glass p-4 rounded-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <button className="p-2 rounded-lg bg-dark-800 hover:bg-dark-700 transition-colors">
            <div className="text-gold-500">Standard</div>
            <div className="text-sm text-gray-400">ZAR 50-70</div>
          </button>
          <button className="p-2 rounded-lg bg-dark-800 hover:bg-dark-700 transition-colors">
            <div className="text-gold-500">Premium</div>
            <div className="text-sm text-gray-400">ZAR 80-100</div>
          </button>
          <button className="p-2 rounded-lg bg-dark-800 hover:bg-dark-700 transition-colors">
            <div className="text-gold-500">XL</div>
            <div className="text-sm text-gray-400">ZAR 100-120</div>
          </button>
          <button className="p-2 rounded-lg bg-dark-800 hover:bg-dark-700 transition-colors">
            <div className="text-gold-500">Bike</div>
            <div className="text-sm text-gray-400">ZAR 30-50</div>
          </button>
        </div>
      </div>
    </div>
  )
}
