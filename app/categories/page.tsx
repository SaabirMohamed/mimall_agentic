'use client'

import { getCategories } from '@/utils/supabase/queries'
import { categories as localCategories } from '@/data/categories'
import { Category, Product, Store, Subcategory } from '@/types/categories'
import Link from 'next/link'
import Image from 'next/image'
import { Store as StoreIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icons } from '@/components/icons'
import { useState, useEffect, useMemo } from 'react'

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

const ProductModal = ({ product, isOpen, onClose, categories }: { 
  product: Product | null; 
  isOpen: boolean; 
  onClose: () => void;
  categories: Category[];
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

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(category => category.id === categoryId);
    return category ? category.name : 'Unknown Category';
  };

  const getSubcategoryName = (subcategoryId: string, categories: Category[]): string => {
    for (const category of categories) {
      const subcategory = category.subcategories?.find(sub => sub.id === subcategoryId);
      if (subcategory) return subcategory.name;
    }
    return 'Unknown Subcategory';
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
                <p className="text-gray-400">{getCategoryName(product.category_id)} / {getSubcategoryName(product.subcategory_id, categories)}</p>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-white">
                <Icons.x size={24} />
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
                  {product.tags?.map(tag => (
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
                      value={selectedStore?.id || ''}
                      onChange={(e) => setSelectedStore(product.stores.find(s => s.id === e.target.value) || null)}
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
                        <Icons.creditCard className="inline-block mr-2" size={16} />
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
                        <Icons.banknote className="inline-block mr-2" size={16} />
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
                      <Icons.shoppingCart className="mr-2" size={16} />
                      Add to Cart
                    </button>
                    <button 
                      className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-3 px-4 rounded flex items-center justify-center"
                      onClick={handleBuyNow}
                    >
                      <Icons.creditCard className="mr-2" size={16} />
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
                    <div className="flex items-center text-gray-400 mb-4">
                      <Icons.mapPin className="mr-2" size={16} />
                      <span>{selectedStore.location}</span>
                    </div>
                    <button 
                      onClick={() => window.open(`https://www.google.com/maps?q=${selectedStore.lat},${selectedStore.lng}`)}
                      className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded flex items-center justify-center"
                    >
                      <Icons.navigation className="mr-2" size={16} />
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

const SubcategoryProducts = ({ subcategory, onProductClick }: { subcategory: Subcategory; onProductClick: (product: Product) => void }) => {
  return (
    <div className="mt-4">
      <h3 className="text-xl font-semibold mb-4 text-black">{subcategory.name}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {subcategory.products?.map((product) => (
          <motion.div
            key={product.id}
            whileHover={{ scale: 1.02 }}
            className="relative group cursor-pointer bg-white rounded-lg shadow-sm overflow-hidden"
            onClick={() => onProductClick(product)}
          >
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
              <Image
                src={product.image_url || '/placeholder.jpg'}
                alt={product.name}
                width={300}
                height={300}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-200" />
            </div>
            <div className="p-4">
              <h4 className="text-lg font-semibold text-black mb-1">{product.name}</h4>
              <p className="text-2xl font-bold text-green-600">
                R{product.price.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              {product.description && (
                <p className="text-gray-600 text-sm mt-1">{product.description}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>(localCategories);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'name' | 'newest'>('newest');

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
      
      const matchesSubcategory = !selectedSubcategory || 
        product.subcategory_id === selectedSubcategory;
      
      const matchesPrice = product.price >= priceRange.min && 
        product.price <= priceRange.max;

      return matchesSearch && matchesCategory && matchesSubcategory && matchesPrice;
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
        default:
          return 0;
      }
    });
  }, [categories, searchQuery, selectedCategory, selectedSubcategory, priceRange, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-rose-800">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        className="fixed inset-0 w-full h-full object-cover z-0"
        style={{ filter: 'brightness(0.4)' }}
      >
        <source src="/mall-background.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 container mx-auto px-4 py-8">
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
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <option value="newest">Newest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name</option>
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
                  setIsModalOpen(true);
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

      <ProductModal 
        product={selectedProduct} 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
        categories={categories}
      />
    </div>
  );
};

export default CategoriesPage;
