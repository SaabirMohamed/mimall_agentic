import React from 'react'
import Link from 'next/link'

const BusinessSignUp = () => {
  return (
    <div className="container mx-auto my-8 max-w-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Sign Up Your Business FOR FREE</h1>
      <div className="bg-black bg-opacity-70 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <p className="mb-4 text-center">Choose your business type:</p>
        <div className="space-y-4">
          <Link href="/signup/business/retailer" className="block w-full  hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-center">
            Retailer
          </Link>
          <Link href="/signup/business/professional" className="block w-full  hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-center">
            Professional Service Provider
          </Link>
          <Link href="/signup/business/driver" className="block w-full  hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-center">
            Driver (Logistics Provider)
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BusinessSignUp

