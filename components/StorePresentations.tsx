import React from 'react'
import Image from 'next/image'

const stores = [
  { name: 'Elegance Emporium', logo: '/heart.jpg', description: 'Curated collections for the discerning shopper.' },
  { name: 'Luxe Haven', logo: '/heart.jpg', description: 'Where luxury meets comfort in perfect harmony.' },
  { name: 'Opulent Oasis', logo: '/heart.jpg', description: 'Discover a world of refined tastes and exquisite craftsmanship.' },
]

const StorePresentations = () => {
  return (
    <div className="container mx-auto my-12">
      <h2 className="text-3xl mb-8 text-center text-gray-200">Featured Boutiques</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {stores.map((store) => (
          <div key={store.name} className="form-card">
            <Image src={store.logo} alt={store.name} width={128} height={128} className="mx-auto mb-4" />
            <h3 className="text-xl mb-2 text-gray-900">{store.name}</h3>
            <p className="mb-4 text-gray-200">{store.description}</p>
            <button className="btn btn-primary w-full">Explore Collection</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StorePresentations

