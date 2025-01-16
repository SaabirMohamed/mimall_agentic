import React from 'react'
import Link from 'next/link'
import { ShoppingBag, Truck, Clock } from 'lucide-react'
import VideoBackground from '../../components/VideoBackground'

const MiChinaPage = () => {
  return (
    <>
      <VideoBackground />
      <div className="container relative z-10 mx-auto my-8 text-gray-200 animate-fade-in">
      <div className="text-center mb-12 animate-slide-up">
        <h1 className="text-4xl font-bold mb-4 text-red-600">Welcome to MiChina</h1>
        <p className="text-xl mb-6 text-red-600">Your Marketplace Inspired by China</p>
        <p className="text-lg text-gray-200">Discover the best of China Mall products delivered on-demand to your door!</p>
      </div>

      <div className="grid grid-cols-1 text-gray-200 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-gray-800 shadow-md rounded-lg p-6 text-center border border-red-600 animate-slide-up [animation-delay:200ms]">
          <ShoppingBag className="mx-auto mb-4 text-red-600" size={48} />
          <h2 className="text-2xl font-semibold mb-2">Vast Selection</h2>
          <p>Browse through thousands of products from local South African China Mall stores.</p>
        </div>
        <div className="bg-gray-800 shadow-md rounded-lg p-6 text-center border border-red-600 animate-slide-up [animation-delay:400ms]">
          <Truck className="mx-auto mb-4 text-red-600" size={48} />
          <h2 className="text-2xl font-semibold mb-2">Fast Delivery</h2>
          <p>Get your favorite China Mall products delivered right to your doorstep.</p>
        </div>
        <div className="bg-gray-800 shadow-md rounded-lg p-6 text-center border border-red-600 animate-slide-up [animation-delay:600ms]">
          <Clock className="mx-auto mb-4 text-red-600" size={48} />
          <h2 className="text-2xl font-semibold mb-2">On-Demand</h2>
          <p>Shop whenever you want, with our 24/7 online marketplace.</p>
        </div>
      </div>

      <div className="bg-gray-800 p-8 rounded-lg mb-12 border border-red-600 animate-slide-up [animation-delay:800ms]">
        <h2 className="text-3xl mb-4 text-center text-red-600">Why Choose MiChina?</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>Access to a wide range of affordable products</li>
          <li>Support local South African China Mall businesses</li>
          <li>Convenient online shopping experience</li>
          <li>Reliable and fast delivery service</li>
          <li>Exclusive deals and promotions</li>
        </ul>
      </div>

      <div className="text-center animate-slide-up [animation-delay:1000ms]">
        <h2 className="text-3xl mb-4 text-red-600">Ready to Explore?</h2>
        <div className="flex justify-center space-x-4">
          <Link href="/michina/categories" className="btn btn-red animate-scale-in [animation-delay:1200ms] hover:scale-105 transition-transform">
            Browse MiChina Categories
          </Link>
          <Link href="/michina/locations" className="btn btn-red animate-scale-in [animation-delay:1400ms] hover:scale-105 transition-transform">
            View China Mall Locations
          </Link>
        </div>
      </div>
    </div>
    </>
  )
}

export default MiChinaPage

