'use client'

import { X, Clock, Phone, Globe, MapPin } from 'lucide-react'
import LocationMap from './LocationMap'

interface Store {
  id: string
  name: string
  type: string
  description: string
  image: string
  address: string
  hours: string[]
  phone: string
  website?: string
  coordinates: {
    lat: number
    lng: number
  }
}

interface StoreModalProps {
  store: Store
  onClose: () => void
}

export default function StoreModal({ store, onClose }: StoreModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-gray-900 rounded-xl shadow-xl w-full max-w-4xl overflow-hidden animate-slide-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white bg-black/20 rounded-full transition-colors z-10"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid md:grid-cols-2">
          {/* Left Column - Image */}
          <div className="relative h-64 md:h-full">
            <img
              src={store.image}
              alt={store.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent" />
          </div>

          {/* Right Column - Details */}
          <div className="p-6 space-y-6">
            {/* Header */}
            <div>
              <h2 className="text-2xl font-semibold text-white mb-2">{store.name}</h2>
              <span className="inline-block px-3 py-1 rounded-full text-sm bg-blue-600/20 text-blue-400 border border-blue-600/30">
                {store.type}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-300">{store.description}</p>

            {/* Address */}
            <div className="flex items-start gap-3 text-gray-300">
              <MapPin className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
              <p>{store.address}</p>
            </div>

            {/* Hours */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-blue-400">
                <Clock className="h-5 w-5" />
                <h3 className="font-medium">Opening Hours</h3>
              </div>
              <ul className="space-y-1 text-gray-300">
                {store.hours.map((hour, index) => (
                  <li key={index}>{hour}</li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <a 
                  href={`tel:${store.phone}`}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {store.phone}
                </a>
              </div>
              {store.website && (
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-blue-400" />
                  <a 
                    href={store.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {store.website}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="h-[300px] w-full">
          <LocationMap
            lat={store.coordinates.lat}
            lng={store.coordinates.lng}
            zoom={15}
          />
        </div>
      </div>
    </div>
  )
}
