'use client'

import React, { useState } from 'react'
import { MapPin, DollarSign } from 'lucide-react'
import Map from '../../components/Map'

const HailoRidePage = () => {
  const [requestType, setRequestType] = useState('ride')
  const [vehicleType, setVehicleType] = useState('car')

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-4xl font-bold mb-8 text-center">HailoRide</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-black bg-opacity-70 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Request a {requestType === 'ride' ? 'Ride' : 'Delivery'}</h2>
          
          <div className="mb-4">
            <label className="block mb-2">Request Type</label>
            <div className="flex space-x-4">
              <button
                className={`px-4 py-2 rounded ${requestType === 'ride' ? 'bg-green-500 text-gray-200' : 'bg-gray-200'}`}
                onClick={() => setRequestType('ride')}
              >
                Ride
              </button>
              <button
                className={`px-4 py-2 rounded ${requestType === 'delivery' ? 'bg-green-500 text-gray-200' : 'bg-gray-200'}`}
                onClick={() => setRequestType('delivery')}
              >
                Delivery
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-2">Vehicle Type</label>
            <select
              className="w-full p-2 border rounded"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
            >
              <option value="scooter">Scooter</option>
              <option value="car">Car</option>
              <option value="pickup">Pickup</option>
              <option value="truck">Truck</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2">Pick-up Location</label>
            <div className="flex items-center border rounded p-2">
              <MapPin className="mr-2 text-gray-200" />
              <input type="text" className="w-full outline-none" placeholder="Enter pick-up address" />
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-2">Drop-off Location</label>
            <div className="flex items-center border rounded p-2">
              <MapPin className="mr-2 text-gray-200" />
              <input type="text" className="w-full outline-none" placeholder="Enter drop-off address" />
            </div>
          </div>

          {requestType === 'delivery' && (
            <div className="mb-4">
              <label className="block mb-2">Package Details</label>
              <textarea
                className="w-full p-2 border rounded"
                rows={3}
                placeholder="Describe your package (size, weight, etc.)"
              ></textarea>
            </div>
          )}

          <div className="mb-4">
            <label className="block mb-2">Estimated Price</label>
            <div className="flex items-center text-2xl font-bold text-gray-200-600">
              <DollarSign />
              <span>25.00</span>
            </div>
          </div>

          <button className="w-full bg-green-500 text-gray-200 py-3 rounded font-bold hover:bg-green-600 transition-colors duration-300">
            Request {requestType === 'ride' ? 'Ride' : 'Delivery'}
          </button>
        </div>

        <div className="bg-black bg-opacity-70 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Trip Details</h2>
          <div className="h-64 bg-gray-200 mb-4 rounded">
            <Map />
          </div>
          <div className="space-y-2">
            <p><strong>Distance:</strong> 5.2 km</p>
            <p><strong>Estimated Time:</strong> 15 minutes</p>
            <p><strong>Vehicle Type:</strong> {vehicleType.charAt(0).toUpperCase() + vehicleType.slice(1)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HailoRidePage
