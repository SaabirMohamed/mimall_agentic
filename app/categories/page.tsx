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
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-800 to-rose-800 opacity-70"></div>
      
      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Glass Header */}
        <div className="backdrop-blur-md bg-white/30 rounded-xl p-6 mb-8 shadow-xl">
          <h1 className="text-4xl font-bold text-white mb-6">Categories</h1>
          
          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm text-white placeholder-white/70"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            
            <select
              className="w-full px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm text-white"
              value={selectedCategory || ''}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>

            <select
              className="w-full px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm text-white"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortType)}
            >
              {Object.entries(sortOptions).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>

            <div className="flex gap-4">
              <input
                type="number"
                placeholder="Min Price"
                className="w-1/2 px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm text-white placeholder-white/70"
                value={priceRange.min}
                onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
              />
              <input
                type="number"
                placeholder="Max Price"
                className="w-1/2 px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm text-white placeholder-white/70"
                value={priceRange.max}
                onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
              />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                className="backdrop-blur-md bg-white/20 rounded-xl overflow-hidden shadow-xl group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                onClick={() => {
                  setSelectedProduct(product);
                }}
              >
                <div className="relative aspect-w-1 aspect-h-1">
                  <Image
                    src={product.image_url || '/placeholder.jpg'}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
                </div>
                
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-white mb-2">{product.name}</h3>
                  <p className="text-3xl font-bold text-green-400 mb-2">
                    R{product.price.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                  {product.description && (
                    <p className="text-white/80 text-sm">{product.description}</p>
                  )}
                  
                  <div className="mt-4 flex items-center justify-between text-white/70">
                    <span className="text-sm">{product.category}</span>
                    <span className="text-sm">{product.subcategory}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {selectedProduct && (
        <div>
          <h2 className="text-2xl font-bold text-amber-500">{selectedProduct.name}</h2>
          <p className="text-gray-400">{selectedProduct.category} / {selectedProduct.subcategory}</p>
          <p className="text-2xl text-amber-500 mb-2">R {selectedProduct.price.toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
