'use client'

import React, { useState } from 'react'
import { DollarSign } from 'lucide-react'
import Map from '../../components/Map'
import AutocompleteInput from '../../components/AutocompleteInput'

const HailoRidePage = () => {
  const [requestType, setRequestType] = useState('ride')
  const [vehicleType, setVehicleType] = useState('car')
  const [pickupLocation, setPickupLocation] = useState<google.maps.places.PlaceResult | null>(null)
  const [dropoffLocation, setDropoffLocation] = useState<google.maps.places.PlaceResult | null>(null)
  const [distance, setDistance] = useState(5.2)
  const [duration, setDuration] = useState(15)

  return (
    <div className="relative h-screen font-marvel flex">
      <div className="w-1/2 p-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl md:text-4xl font-marvel mb-6 text-center">HailoRide</h1>
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
              <option value="bucky">Bucky (Van)</option>
              <option value="trailer">Trailer</option>
              <option value="durbanTaxi">Durban Taxi</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2">Pick-up Location</label>
            <AutocompleteInput
              placeholder="Enter pick-up address"
              onPlaceSelected={(place) => setPickupLocation(place)}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Drop-off Location</label>
            <AutocompleteInput
              placeholder="Enter drop-off address"
              onPlaceSelected={(place) => setDropoffLocation(place)}
            />
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

        <div className="bg-white rounded-lg shadow-lg p-6 mt-4">
          <h2 className="text-2xl font-semibold mb-4">Trip Details</h2>
          <div className="h-64 w-full bg-gray-100 mb-4 rounded-lg overflow-hidden">
            <Map />
          </div>
          <div className="space-y-2">
            <p><strong>Distance:</strong> {distance.toFixed(1)} km</p>
            <p><strong>Estimated Time:</strong> {Math.round(duration)} minutes</p>
            <p><strong>Vehicle Type:</strong> {vehicleType.charAt(0).toUpperCase() + vehicleType.slice(1)}</p>
          </div>
        </div>
      </div>
      <div className="w-1/2 h-screen relative">
        <div className="absolute inset-0">
          <Map
            pickup={pickupLocation?.geometry?.location?.toJSON()}
            dropoff={dropoffLocation?.geometry?.location?.toJSON()}
            onRouteCalculated={(distance, duration) => {
              setDistance(distance);
              setDuration(duration);
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default HailoRidePage
