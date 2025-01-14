import React from 'react'
import { Watch, Diamond, Briefcase, Car, ShoppingBag, Shirt, Gift, Utensils } from 'lucide-react'

const categories = [
  { name: 'Watches & Jewelry', icon: Watch },
  { name: 'Fashion & Accessories', icon: ShoppingBag },
  { name: 'Beauty & Fragrance', icon: Diamond },
  { name: 'Electronics & Gadgets', icon: Briefcase },
  { name: 'Home & Decor', icon: Utensils },
  { name: 'Automotive', icon: Car },
  { name: 'Travel & Luggage', icon: Shirt },
  { name: 'Gifts & Experiences', icon: Gift },
]

const CategoriesPage = () => {
  return (
    <div className="container mx-auto my-8 text-gray-200">
      <h1 className="text-4xl text-green-500 mb-6">Product Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-gray-200">
        {categories.map((category) => (
          <div key={category.name} className="bg-black text-gray-200 bg-opacity-70 shadow-md rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <category.icon className="mx-auto mb-4 text-amber-500" size={48} />
            <h2 className="text-xl font-semibold text-amber-500">{category.name}</h2>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoriesPage

