'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import Image from 'next/image'
import VideoBackground from '../../components/VideoBackground'
import StoreModal from '../../components/StoreModal'

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

const stores: Store[] = [
  {
    id: 'gs1',
    name: 'Fashion Hub',
    type: 'Fashion Boutique',
    description: 'Trendy fashion store with latest styles',
    image: '/fashion-hub.jpeg',
    address: '123 Fashion Street, Greenside, Johannesburg',
    hours: [
      'Monday - Friday: 9:00 AM - 6:00 PM',
      'Saturday: 9:00 AM - 5:00 PM',
      'Sunday: 10:00 AM - 3:00 PM'
    ],
    phone: '+27 11 123 4567',
    website: 'https://fashionhub.co.za',
    coordinates: { lat: -26.1668, lng: 28.0168 }
  },
  {
    id: 'gs2',
    name: 'Beauty World',
    type: 'Health & Beauty',
    description: 'Complete beauty and wellness center',
    image: '/beauty-world.jpeg',
    address: '45 Wellness Road, Greenside, Johannesburg',
    hours: [
      'Monday - Friday: 8:00 AM - 7:00 PM',
      'Saturday: 8:00 AM - 5:00 PM',
      'Sunday: Closed'
    ],
    phone: '+27 11 234 5678',
    website: 'https://beautyworld.co.za',
    coordinates: { lat: -26.1669, lng: 28.0169 }
  },
  {
    id: 'rb1',
    name: 'Style Studio',
    type: 'Fashion Boutique',
    description: 'Designer fashion and accessories',
    image: '/style-studio.jpeg',
    address: '78 Style Avenue, Rosebank, Johannesburg',
    hours: [
      'Monday - Saturday: 9:00 AM - 6:00 PM',
      'Sunday: 10:00 AM - 2:00 PM'
    ],
    phone: '+27 11 345 6789',
    website: 'https://stylestudio.co.za',
    coordinates: { lat: -26.1468, lng: 28.0401 }
  },
  {
    id: 'st1',
    name: 'Luxury Finds',
    type: 'High-End Boutique',
    description: 'Premium fashion and accessories',
    image: '/luxury-finds.jpeg',
    address: '100 Luxury Lane, Sandton, Johannesburg',
    hours: [
      'Monday - Friday: 10:00 AM - 7:00 PM',
      'Saturday: 9:00 AM - 6:00 PM',
      'Sunday: 11:00 AM - 4:00 PM'
    ],
    phone: '+27 11 456 7890',
    website: 'https://luxuryfinds.co.za',
    coordinates: { lat: -26.1068, lng: 28.0568 }
  },
  {
    id: 'bk1',
    name: 'Elite Fashion',
    type: 'High-End Boutique',
    description: 'Exclusive designer wear',
    image: '/elite-fashion.jpeg',
    address: '200 Elite Street, Brooklyn, Pretoria',
    hours: [
      'Monday - Saturday: 9:00 AM - 7:00 PM',
      'Sunday: By Appointment'
    ],
    phone: '+27 12 123 4567',
    website: 'https://elitefashion.co.za',
    coordinates: { lat: -25.7701, lng: 28.2301 }
  },
  {
    id: 'hf1',
    name: 'Urban Style',
    type: 'Fashion Boutique',
    description: 'Contemporary fashion for young professionals',
    image: '/urban-style.jpeg',
    address: '150 Urban Road, Hatfield, Pretoria',
    hours: [
      'Monday - Friday: 8:30 AM - 6:00 PM',
      'Saturday: 9:00 AM - 5:00 PM',
      'Sunday: Closed'
    ],
    phone: '+27 12 234 5678',
    coordinates: { lat: -25.7490, lng: 28.2293 }
  }
]

const cities = ['All Cities', 'Johannesburg', 'Pretoria']
const suburbs = {
  'All Cities': ['All Suburbs'],
  'Johannesburg': ['All Suburbs', 'Greenside', 'Rosebank', 'Sandton'],
  'Pretoria': ['All Suburbs', 'Brooklyn', 'Hatfield']
}
const types = ['All Types', 'Fashion Boutique', 'Health & Beauty', 'High-End Boutique']

export default function LocationsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCity, setSelectedCity] = useState('All Cities')
  const [selectedSuburb, setSelectedSuburb] = useState('All Suburbs')
  const [selectedType, setSelectedType] = useState('All Types')
  const [selectedStore, setSelectedStore] = useState<Store | null>(null)

  const handleCityChange = (city: string) => {
    setSelectedCity(city)
    setSelectedSuburb('All Suburbs')
  }

  const filteredStores = stores.filter(store => {
    const matchesSearch = 
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCity = 
      selectedCity === 'All Cities' ||
      (selectedCity === 'Johannesburg' && store.address.includes('Johannesburg')) ||
      (selectedCity === 'Pretoria' && store.address.includes('Pretoria'))
    
    const matchesSuburb =
      selectedSuburb === 'All Suburbs' ||
      store.address.includes(selectedSuburb)
    
    const matchesType =
      selectedType === 'All Types' ||
      store.type === selectedType

    return matchesSearch && matchesCity && matchesSuburb && matchesType
  })

  return (
    <>
      <VideoBackground />
      <div className="min-h-screen relative">
        <div className="container mx-auto py-8 px-4 relative z-10">
          {/* Header */}
          <div className="text-center mb-12 animate-slide-up">
            <h1 className="text-5xl font-marvel mb-4 text-white text-shadow-lg">MiMall Locations</h1>
            <p className="text-gray-200 max-w-3xl mx-auto">
              Explore an incredible variety of independent retailers, local boutiques, and specialty stores across Gauteng. 
              Support local businesses while discovering unique shopping experiences in your neighborhood.
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8 space-y-4">
            {/* Search */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search stores..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-black/30 backdrop-blur-sm text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              {/* Cities */}
              <div className="flex flex-wrap gap-2">
                {cities.map(city => (
                  <button
                    key={city}
                    onClick={() => handleCityChange(city)}
                    className={`px-4 py-2 rounded-lg backdrop-blur-sm border border-gray-700 transition-all ${
                      selectedCity === city ? 'bg-blue-600 text-white' : 'bg-black/30 text-gray-300 hover:bg-black/50'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>

              {/* Suburbs */}
              <div className="flex flex-wrap gap-2">
                {suburbs[selectedCity as keyof typeof suburbs].map(suburb => (
                  <button
                    key={suburb}
                    onClick={() => setSelectedSuburb(suburb)}
                    className={`px-4 py-2 rounded-lg backdrop-blur-sm border border-gray-700 transition-all ${
                      selectedSuburb === suburb ? 'bg-blue-600 text-white' : 'bg-black/30 text-gray-300 hover:bg-black/50'
                    }`}
                  >
                    {suburb}
                  </button>
                ))}
              </div>

              {/* Store Types */}
              <div className="flex flex-wrap gap-2">
                {types.map(type => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-4 py-2 rounded-lg backdrop-blur-sm border border-gray-700 transition-all ${
                      selectedType === type ? 'bg-blue-600 text-white' : 'bg-black/30 text-gray-300 hover:bg-black/50'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Stores Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredStores.map((store) => (
              <div
                key={store.id}
                onClick={() => setSelectedStore(store)}
                className="group cursor-pointer animate-slide-up border-4 border-white shadow-lg rounded-lg overflow-hidden"
              >
                <div className="relative h-64 overflow-hidden rounded-lg">
                  <Image
                    src={store.image}
                    alt={store.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-xl font-semibold text-white mb-1">{store.name}</h3>
                    <p className="text-sm text-gray-300">{store.type}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Store Modal */}
          {selectedStore && (
            <StoreModal
              store={selectedStore}
              onClose={() => setSelectedStore(null)}
            />
          )}
        </div>
      </div>
    </>
  )
}
