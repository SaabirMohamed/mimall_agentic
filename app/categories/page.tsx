'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import * as Icons from 'lucide-react'
import { categories } from '@/data/categories'
import { Category, Product, Store, Subcategory } from '@/types/categories'
import { useRouter, useSearchParams } from 'next/navigation'

interface FilterState {
  category: string | null;
  subcategory: string | null;
  priceRange: {
    min: number;
    max: number;
  };
  location: string | null;
  searchTerm: string;
}

const ProductModal = ({ product, isOpen, onClose }: { 
  product: Product | null; 
  isOpen: boolean; 
  onClose: () => void 
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash' | null>(null);

  useEffect(() => {
    if (product && product.stores.length > 0) {
      setSelectedStore(product.stores[0]);
    }
  }, [product]);

  if (!product) return null;

  const handleAddToCart = () => {
    // TODO: Implement cart functionality
    console.log('Added to cart:', {
      product,
      quantity,
      store: selectedStore,
      paymentMethod
    });
  };

  const handleBuyNow = () => {
    // TODO: Implement immediate purchase
    console.log('Buy now:', {
      product,
      quantity,
      store: selectedStore,
      paymentMethod
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gray-900 rounded-lg p-6 max-w-4xl w-full shadow-xl border-2 border-white/20"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-amber-500">{product.name}</h2>
                <p className="text-gray-400">{product.category} / {product.subcategory}</p>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-white">
                <Icons.X size={24} />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="relative h-64 bg-gray-800 rounded-lg overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <p className="text-gray-300">{product.description}</p>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-gray-800 rounded text-sm text-amber-500">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-800 rounded-lg p-4">
                  <p className="text-2xl text-amber-500 mb-2">R {product.price.toLocaleString()}</p>
                  
                  {/* Quantity Selector */}
                  <div className="flex items-center space-x-4 mb-4">
                    <label className="text-gray-300">Quantity:</label>
                    <div className="flex items-center bg-gray-700 rounded">
                      <button 
                        className="px-3 py-1 text-white hover:bg-gray-600"
                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      >
                        -
                      </button>
                      <span className="px-4 py-1 text-white">{quantity}</span>
                      <button 
                        className="px-3 py-1 text-white hover:bg-gray-600"
                        onClick={() => setQuantity(q => q + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Store Selector */}
                  <div className="mb-4">
                    <label className="text-gray-300 block mb-2">Select Store:</label>
                    <select 
                      className="w-full p-2 bg-gray-700 rounded text-white"
                      value={selectedStore?.id}
                      onChange={(e) => setSelectedStore(product.stores.find(s => s.id === Number(e.target.value)) || null)}
                    >
                      {product.stores.map(store => (
                        <option key={store.id} value={store.id}>
                          {store.name} - {store.location} ({store.availability})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Payment Method */}
                  <div className="mb-4">
                    <label className="text-gray-300 block mb-2">Payment Method:</label>
                    <div className="flex space-x-2">
                      <button
                        className={`flex-1 py-2 px-4 rounded ${
                          paymentMethod === 'card' 
                            ? 'bg-amber-600 text-white' 
                            : 'bg-gray-700 text-gray-300'
                        }`}
                        onClick={() => setPaymentMethod('card')}
                      >
                        <Icons.CreditCard className="inline-block mr-2" size={16} />
                        Card
                      </button>
                      <button
                        className={`flex-1 py-2 px-4 rounded ${
                          paymentMethod === 'cash' 
                            ? 'bg-amber-600 text-white' 
                            : 'bg-gray-700 text-gray-300'
                        }`}
                        onClick={() => setPaymentMethod('cash')}
                      >
                        <Icons.Banknote className="inline-block mr-2" size={16} />
                        Cash
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button 
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded flex items-center justify-center"
                      onClick={handleAddToCart}
                    >
                      <Icons.ShoppingCart className="mr-2" size={16} />
                      Add to Cart
                    </button>
                    <button 
                      className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-3 px-4 rounded flex items-center justify-center"
                      onClick={handleBuyNow}
                    >
                      <Icons.CreditCard className="mr-2" size={16} />
                      Buy Now
                    </button>
                  </div>
                </div>

                {selectedStore && (
                  <div className="bg-gray-800 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">Store Details</h3>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-white">{selectedStore.name}</h4>
                      <span className="text-sm text-green-400">{selectedStore.availability}</span>
                    </div>
                    <div className="flex items-center text-gray-400 mb-2">
                      <Icons.MapPin size={16} className="mr-2" />
                      <span>{selectedStore.location}</span>
                    </div>
                    <button 
                      onClick={() => window.open(`https://www.google.com/maps?q=${selectedStore.coordinates.lat},${selectedStore.coordinates.lng}`)}
                      className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded flex items-center justify-center"
                    >
                      <Icons.Navigation className="mr-2" size={16} />
                      Get Directions
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const SubcategoryProducts = ({ 
  subcategory,
  onProductClick 
}: { 
  subcategory: Subcategory;
  onProductClick: (product: Product) => void;
}) => {
  return (
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {subcategory.products.map((product) => (
        <motion.div
          key={product.id}
          className="bg-gray-800 bg-opacity-50 rounded-lg p-4 cursor-pointer"
          whileHover={{ scale: 1.02 }}
          onClick={() => onProductClick(product)}
        >
          <div className="flex items-center space-x-4">
            <div className="relative w-20 h-20 bg-gray-700 rounded-lg overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{product.name}</h3>
              <p className="text-amber-500">R {product.price.toLocaleString()}</p>
              <div className="flex items-center text-gray-400 mt-1">
                <Icons.Store size={16} className="mr-2" />
                <span>{product.stores.length} stores available</span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const CategoriesPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()!
  
  // Initialize filters from URL parameters
  const [filters, setFilters] = useState<FilterState>({
    category: searchParams.get('category'),
    subcategory: searchParams.get('subcategory'),
    priceRange: { 
      min: Number(searchParams.get('min_price')) || 0, 
      max: Number(searchParams.get('max_price')) || 100000 
    },
    location: searchParams.get('location'),
    searchTerm: searchParams.get('search') || ''
  });

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.searchTerm) params.set('search', filters.searchTerm);
    if (filters.category) params.set('category', filters.category);
    if (filters.subcategory) params.set('subcategory', filters.subcategory);
    if (filters.location) params.set('location', filters.location);
    if (filters.priceRange.min > 0) params.set('min_price', filters.priceRange.min.toString());
    if (filters.priceRange.max < 100000) params.set('max_price', filters.priceRange.max.toString());
    
    const url = params.toString() ? `?${params.toString()}` : '';
    router.push(`/categories${url}`, { scroll: false });
  }, [filters, router]);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get unique locations from all stores
  const locations = useMemo(() => {
    const locationSet = new Set<string>();
    categories.forEach(category => 
      category.subcategories.forEach(subcategory => 
        subcategory.products.forEach(product => 
          product.stores.forEach(store => 
            locationSet.add(store.location)
          )
        )
      )
    );
    return Array.from(locationSet);
  }, []);

  // Filter categories based on all criteria
  const filteredCategories = useMemo(() => {
    return categories.map(category => ({
      ...category,
      subcategories: category.subcategories.map(subcategory => ({
        ...subcategory,
        products: subcategory.products.filter(product => {
          const matchesSearch = filters.searchTerm === '' || 
            product.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(filters.searchTerm.toLowerCase());
          
          const matchesCategory = !filters.category || category.name === filters.category;
          const matchesSubcategory = !filters.subcategory || subcategory.name === filters.subcategory;
          const matchesPrice = product.price >= filters.priceRange.min && 
                             product.price <= filters.priceRange.max;
          const matchesLocation = !filters.location || 
            product.stores.some(store => store.location === filters.location);
          
          return matchesSearch && matchesCategory && matchesSubcategory && 
                 matchesPrice && matchesLocation;
        })
      })).filter(sub => sub.products.length > 0)
    })).filter(cat => cat.subcategories.length > 0);
  }, [filters]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <>
      <motion.div
        className="container mx-auto my-8 px-4 text-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-4xl text-amber-500 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Product Categories
        </motion.h1>

        {/* Enhanced Filter Section */}
        <motion.div 
          className="mb-8 glass bg-opacity-30 p-6 rounded-lg border-2 border-white/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full p-3 rounded bg-gray-800 bg-opacity-50 border border-gray-700 focus:border-amber-500"
              value={filters.searchTerm}
              onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
            />
            
            <select
              className="w-full p-3 rounded bg-gray-800 bg-opacity-50 border border-gray-700 focus:border-amber-500"
              value={filters.category || ''}
              onChange={(e) => setFilters(prev => ({ 
                ...prev, 
                category: e.target.value || null,
                subcategory: null // Reset subcategory when category changes
              }))}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>

            <select
              className="w-full p-3 rounded bg-gray-800 bg-opacity-50 border border-gray-700 focus:border-amber-500"
              value={filters.location || ''}
              onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value || null }))}
            >
              <option value="">All Locations</option>
              {locations.map(location => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>

            <div className="flex items-center space-x-2">
              <input
                type="number"
                placeholder="Min Price"
                className="w-1/2 p-3 rounded bg-gray-800 bg-opacity-50 border border-gray-700 focus:border-amber-500"
                value={filters.priceRange.min}
                onChange={(e) => setFilters(prev => ({ 
                  ...prev, 
                  priceRange: { ...prev.priceRange, min: Number(e.target.value) }
                }))}
              />
              <input
                type="number"
                placeholder="Max Price"
                className="w-1/2 p-3 rounded bg-gray-800 bg-opacity-50 border border-gray-700 focus:border-amber-500"
                value={filters.priceRange.max}
                onChange={(e) => setFilters(prev => ({ 
                  ...prev, 
                  priceRange: { ...prev.priceRange, max: Number(e.target.value) }
                }))}
              />
            </div>
          </div>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
          {filteredCategories.map((category) => (
            <motion.div
              key={category.id}
              className="bg-gray-900 bg-opacity-70 shadow-xl rounded-lg p-6 border-2 border-white/30 hover:border-white/50 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center mb-4">
                {/* @ts-ignore */}
                {Icons[category.icon] && React.createElement(Icons[category.icon], {
                  className: "text-amber-500 mr-3",
                  size: 32
                })}
                <div>
                  <h2 className="text-xl font-semibold text-white">{category.name}</h2>
                  <p className="text-sm text-gray-400">{category.description}</p>
                </div>
              </div>

              {category.subcategories.map(subcategory => (
                <div key={subcategory.name} className="mb-6 last:mb-0">
                  <h3 className="text-lg font-medium text-amber-500 mb-2">
                    {subcategory.name}
                  </h3>
                  <SubcategoryProducts 
                    subcategory={subcategory}
                    onProductClick={handleProductClick}
                  />
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </motion.div>

      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default CategoriesPage
