import React from 'react'
import Image from 'next/image'

const stores = [
  {
    name: "Gucci",
    description: "Italian luxury fashion house",
    logo: "/heart.jpg",
    location: "Ground Floor, Diamond Walk"
  },
  {
    name: "Louis Vuitton",
    description: "French luxury goods company",
    logo: "/heart.jpg",
    location: "Upper Level, Diamond Walk"
  },
  {
    name: "Cartier",
    description: "French luxury goods conglomerate",
    logo: "/heart.jpg",
    location: "Ground Floor, Diamond Walk"
  },
  {
    name: "Prada",
    description: "Italian luxury fashion house",
    logo: "/heart.jpg",
    location: "Upper Level, Diamond Walk"
  },
  {
    name: "Burberry",
    description: "British luxury fashion house",
    logo: "/heart.jpg",
    location: "Ground Floor, Sandton City"
  },
  {
    name: "Tiffany & Co.",
    description: "American luxury jewelry retailer",
    logo: "/heart.jpg",
    location: "Ground Floor, Diamond Walk"
  }
]

const StoresPage = () => {
  return (
    <div className="container mx-auto my-8 text-gray-200">
      <h1 className="text-4xl text-gray-200 mb-6 ">Our Luxury Stores</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stores.map((store) => (
          <div key={store.name} className="bg-black bg-opacity-70 shadow-md rounded-lg overflow-hidden">
            <Image src={store.logo} alt={store.name} width={300} height={200} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl text-gray-200 font-bold mb-2">{store.name}</h2>
              <p className="text-gray-200 mb-2">{store.description}</p>
              <p className="text-sm text-gray-200-500">{store.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StoresPage

