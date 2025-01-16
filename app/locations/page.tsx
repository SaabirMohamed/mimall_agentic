'use client'

import React from 'react'
import LocationMap from '../../components/LocationMap'
import VideoBackground from '../../components/VideoBackground'
import { MapPin, Clock, Phone } from 'lucide-react'

const locations = [
  {
    name: "Sandton City",
    address: "83 Rivonia Rd, Sandhurst, Sandton, 2196",
    hours: "Mon-Sat: 9am-8pm, Sun: 10am-6pm",
    phone: "+27 11 217 6000",
    coordinates: { lat: -26.1052, lng: 28.0567 }
  },
  {
    name: "Hyde Park Corner",
    address: "Cnr Jan Smuts Ave & William Nicol Dr, Hyde Park, Johannesburg, 2196",
    hours: "Mon-Sat: 9am-6pm, Sun: 10am-3pm",
    phone: "+27 11 325 4340",
    coordinates: { lat: -26.1172, lng: 28.0328 }
  },
  {
    name: "Rosebank Mall",
    address: "50 Bath Ave, Rosebank, Johannesburg, 2196",
    hours: "Mon-Sat: 9am-6pm, Sun: 10am-3pm",
    phone: "+27 11 788 5530",
    coordinates: { lat: -26.1467, lng: 28.0415 }
  },
  {
    name: "The Zone @ Rosebank",
    address: "177 Oxford Rd, Rosebank, Johannesburg, 2196",
    hours: "Mon-Sun: 9am-8pm",
    phone: "+27 11 325 4340",
    coordinates: { lat: -26.1458, lng: 28.0403 }
  },
  {
    name: "Melrose Arch",
    address: "Melrose Blvd, Melrose North, Johannesburg, 2196",
    hours: "Mon-Sat: 9am-8pm, Sun: 10am-6pm",
    phone: "+27 11 684 0000",
    coordinates: { lat: -26.1308, lng: 28.0672 }
  },
  {
    name: "Mall of Africa",
    address: "Magwa Crescent, Waterfall City, Midrand, 1686",
    hours: "Mon-Sun: 9am-9pm",
    phone: "+27 10 596 1470",
    coordinates: { lat: -26.0167, lng: 28.1074 }
  },
  {
    name: "Greenstone Shopping Centre",
    address: "Cnr Modderfontein Rd & Van Riebeeck Ave, Edenvale, 1609",
    hours: "Mon-Sat: 9am-7pm, Sun: 9am-5pm",
    phone: "+27 11 524 0445",
    coordinates: { lat: -26.1242, lng: 28.1595 }
  },
  {
    name: "Eastgate Shopping Centre",
    address: "43 Bradford Rd, Bedfordview, Johannesburg, 2008",
    hours: "Mon-Sat: 9am-7pm, Sun: 9am-5pm",
    phone: "+27 11 479 6000",
    coordinates: { lat: -26.1786, lng: 28.1181 }
  }
]

const LocationsPage = () => {
  return (
    <>
      <VideoBackground />
      <div className="container relative z-10 mx-auto my-8 px-4">
        <h1 className="text-5xl font-bold text-gray-200 mb-8 text-center animate-slide-up">Our Locations</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {locations.map((location, index) => (
            <div
              key={location.name}
              className="bg-black/40 backdrop-blur-sm shadow-xl rounded-lg overflow-hidden transition-all duration-300 hover:bg-black/60 animate-slide-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <LocationMap
                lat={location.coordinates.lat}
                lng={location.coordinates.lng}
                className="w-full h-[200px]"
              />
              <div className="p-6">
                <h2 className="text-2xl text-gray-200 font-semibold mb-4">{location.name}</h2>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-yellow-200 mt-1 flex-shrink-0" />
                    <p className="text-yellow-200">{location.address}</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                    <p className="text-amber-600">{location.hours}</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <p className="text-green-500">{location.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default LocationsPage

