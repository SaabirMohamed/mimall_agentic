import React from 'react'
import { Watch, Diamond, Briefcase, Car } from 'lucide-react'

const categories = [
  { name: 'Timeless Jewelry', icon: Diamond },
  { name: 'Luxury Watches', icon: Watch },
  { name: 'Designer Accessories', icon: Briefcase },
  { name: 'Premium Automobiles', icon: Car },
]

const LuxuryCategories = () => {
  return (
    <div className="container mx-auto my-12">
      <h2 className="text-3xl mb-8 text-gray-200 text-center ">Explore Luxury</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {categories.map((category) => (
          <div key={category.name} className="form-card text-center group">
            <div className="mb-4 p-6 bg-black bg-opacity-70 rounded-full shadow-md inline-block group-hover:shadow-lg transition-shadow duration-300">
              <category.icon className="text-gray-200" size={64} />
            </div>
            <h3 className="text-xl text-gray-900">{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LuxuryCategories

