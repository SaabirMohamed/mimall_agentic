import React from 'react'
import { Search } from 'lucide-react'

const SearchBar = () => {
  return (
    <div className="container mx-auto my-8">
      <div className="relative">
        <input
          type="text"
          placeholder="Discover luxury in every corner..."
          className="w-full py-3 px-4 pr-12 rounded-md border border-primary-color focus:outline-none focus:ring-2 focus:ring-accent-color text-gray-900 bg-black bg-opacity-70"
        />
        <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <Search className="text-gray-200" size={24} />
        </button>
      </div>
    </div>
  )
}

export default SearchBar

