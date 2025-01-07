import React from 'react'
import Link from 'next/link'
import { ShoppingBag, Truck, Clock } from 'lucide-react'

const MiChinaPage = () => {
  return (
    <div className="container mx-auto my-8 text-white">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-red-600">Welcome to MiChina</h1>
        <p className="text-xl mb-6">Your Marketplace Inspired by China</p>
        <p className="text-lg">Discover the best of China Mall products delivered on-demand to your door!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-gray-800 shadow-md rounded-lg p-6 text-center border border-red-600">
          <ShoppingBag className="mx-auto mb-4 text-red-600" size={48} />
          <h2 className="text-2xl font-semibold mb-2">Vast Selection</h2>
          <p>Browse through thousands of products from local South African China Mall stores.</p>
        </div>
        <div className="bg-gray-800 shadow-md rounded-lg p-6 text-center border border-red-600">
          <Truck className="mx-auto mb-4 text-red-600" size={48} />
          <h2 className="text-2xl font-semibold mb-2">Fast Delivery</h2>
          <p>Get your favorite China Mall products delivered right to your doorstep.</p>
        </div>
        <div className="bg-gray-800 shadow-md rounded-lg p-6 text-center border border-red-600">
          <Clock className="mx-auto mb-4 text-red-600" size={48} />
          <h2 className="text-2xl font-semibold mb-2">On-Demand</h2>
          <p>Shop whenever you want, with our 24/7 online marketplace.</p>
        </div>
      </div>

      <div className="bg-gray-800 p-8 rounded-lg mb-12 border border-red-600">
        <h2 className="text-3xl mb-4 text-center text-red-600">Why Choose MiChina?</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>Access to a wide range of affordable products</li>
          <li>Support local South African China Mall businesses</li>
          <li>Convenient online shopping experience</li>
          <li>Reliable and fast delivery service</li>
          <li>Exclusive deals and promotions</li>
        </ul>
      </div>

      <div className="text-center">
        <h2 className="text-3xl mb-4 text-red-600">Ready to Explore?</h2>
        <div className="flex justify-center space-x-4">
          <Link href="/michina/categories" className="btn btn-red">
            Browse MiChina Categories
          </Link>
          <Link href="/michina/locations" className="btn btn-red">
            View China Mall Locations
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MiChinaPage

