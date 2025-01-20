'use client'

import { getCategories } from '@/utils/supabase/queries'
import { Category, Product, Store, Subcategory } from '@/types/categories'
import Link from 'next/link'
import Image from 'next/image'
import { Store as StoreIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icons } from '@/components/icons'
import { useState, useEffect } from 'react'

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

const SubcategoryProducts = ({ 
  subcategory,
  onProductClick 
}: { 
  subcategory: Subcategory;
  onProductClick: (product: Product) => void;
}) => {
  return (
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {subcategory.products?.map((product: Product) => (
        <motion.div
          key={product.id}
          className="relative w-[280px] h-[400px] rounded-lg overflow-hidden cursor-pointer"
          whileHover={{ scale: 1.02 }}
          onClick={() => onProductClick(product)}
        >
          {/* White border overlay */}
          <div className="absolute inset-0 border-[6px] border-white rounded-lg z-20"></div>
          
          {/* Image background */}
          <div className="absolute inset-0 z-10">
            <Image
              src={product.images?.[0]?.image_url || '/placeholder.jpg'}
              alt={product.name}
              fill
              sizes="280px"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              className="transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-20"></div>
          
          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 z-30">
            <h3 className="text-xl font-marvel font-bold text-white mb-1 drop-shadow-lg line-clamp-2">
              {product.name}
            </h3>
            <p className="text-lg font-marvel text-amber-500 mb-3 drop-shadow-lg">
              R {product.price.toLocaleString()}
            </p>
            
            <div className="flex items-center space-x-4 text-white/90">
              <div className="flex items-center">
                <Icons.store size={16} className="mr-1" />
                <span className="font-marvel text-sm">{product.stores?.length} store</span>
              </div>
              <div className="flex items-center">
                <Icons.tag size={16} className="mr-1" />
                <span className="font-marvel text-sm">{subcategory.name}</span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default function CategoriesPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const loadCategories = async () => {
      const cats = await getCategories()
      if (cats) {
        setCategories(cats)
      }
    }
    loadCategories()
  }, [])

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category: Category) => (
          <div key={category.id} className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2 flex items-center">
              <span className="material-icons mr-2">{category.icon}</span>
              {category.name}
            </h2>
            <p className="text-gray-600 mb-4">{category.description}</p>
            
            {category.subcategories?.map((subcategory) => (
              <div key={subcategory.id} className="mb-4">
                <h3 className="font-medium mb-2">{subcategory.name}</h3>
                <div className="grid grid-cols-1 gap-2">
                  {subcategory.products?.map((product) => (
                    <Link 
                      key={product.id}
                      href={`/product/${product.id}`}
                      className="block hover:bg-gray-50 p-2 rounded"
                    >
                      <div className="flex items-center">
                        {product.image && (
                          <Image 
                            src={product.image} 
                            alt={product.name}
                            width={64}
                            height={64}
                            className="object-cover rounded mr-2"
                          />
                        )}
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-gray-600">
                            ${product.price.toFixed(2)}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <StoreIcon className="w-4 h-4 mr-1" />
                            {product.stores?.[0]?.availability || 'Checking availability...'}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <ProductModal 
        product={selectedProduct} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        categories={categories}
      />
    </div>
  )
}
