'use client'

import { getCategories } from '@/utils/supabase/queries'
import { categories as localCategories } from '@/data/categories'
import { Category, Product } from '@/types/categories'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState, useEffect, useMemo } from 'react'

interface SortOptions {
  'price-asc': string;
  'price-desc': string;
  'name': string;
  'newest': string;
}

const sortOptions: SortOptions = {
  'price-asc': 'Price: Low to High',
  'price-desc': 'Price: High to Low',
  'name': 'Name',
  'newest': 'Newest First'
};

type SortType = keyof typeof sortOptions;

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>(localCategories);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [sortBy, setSortBy] = useState<SortType>('newest');

  useEffect(() => {
    const fetchSupabaseCategories = async () => {
      try {
        setLoading(true);
        const supabaseCategories = await getCategories();
        if (supabaseCategories && supabaseCategories.length > 0) {
          setCategories(supabaseCategories);
        }
      } catch (error) {
        console.error('Error fetching Supabase categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSupabaseCategories();
  }, []);

  const filteredProducts = useMemo(() => {
    let products: Product[] = [];
    categories.forEach(category => {
      category.subcategories?.forEach(subcategory => {
        if (subcategory.products) {
          products = [...products, ...subcategory.products];
        }
      });
    });

    return products.filter(product => {
      const matchesSearch = searchQuery === '' || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = !selectedCategory || 
        product.category_id === selectedCategory;
      
      const matchesPrice = product.price >= priceRange.min && 
        product.price <= priceRange.max;

      return matchesSearch && matchesCategory && matchesPrice;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });
  }, [categories, searchQuery, selectedCategory, priceRange, sortBy]);

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-800 to-rose-800 opacity-70"></div>
      
      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Search and Filter Section */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full md:w-96 p-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortType)}
            className="w-full md:w-48 p-2 rounded-lg bg-white/10 border border-white/20 text-white"
          >
            {Object.entries(sortOptions).map(([value, label]) => (
              <option key={value} value={value} className="bg-gray-800">
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white/10 rounded-lg overflow-hidden border border-white/20 backdrop-blur-sm hover:transform hover:scale-105 transition-transform duration-200"
            >
              <div className="relative h-48">
                <Image
                  src={product.image_url || '/placeholder.jpg'}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-2">{product.name}</h3>
                <p className="text-white/70 text-sm mb-2 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-white font-bold">₹{product.price.toLocaleString()}</span>
                  <button 
                    onClick={() => setSelectedProduct(product)}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
