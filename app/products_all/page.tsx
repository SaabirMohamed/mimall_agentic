'use client';

import { getAllImagePaths } from '@/data/image-paths';
import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

export default function ProductsAllPage() {
  const imagePaths = getAllImagePaths();
  const [errorImages, setErrorImages] = useState<Set<string>>(new Set());

  const handleImageError = (path: string) => {
    setErrorImages(prev => new Set(Array.from(prev).concat(path)));
  };

  // Try oldPath first, fallback to newPath
  const getImagePath = (item: { oldPath: string; newPath: string }) => {
    return errorImages.has(item.oldPath) ? item.newPath : item.oldPath;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Add Marvel font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Marvel:wght@400;700&display=swap"
        rel="stylesheet"
      />
      
      <h1 className="text-3xl font-marvel font-bold text-white mb-8">All Products</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {imagePaths.map((item, index) => (
          <motion.div
            key={index}
            className="group relative h-96 rounded-lg overflow-hidden cursor-pointer"
            whileHover={{ scale: 1.02 }}
          >
            {/* White border overlay */}
            <div className="absolute inset-0 border-8 border-white rounded-lg z-20"></div>
            
            {/* Image background */}
            <div className="absolute inset-0 z-10">
              {errorImages.has(item.oldPath) && errorImages.has(item.newPath) ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 font-marvel">
                  Image not found
                </div>
              ) : (
                <Image
                  src={getImagePath(item)}
                  alt={item.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-500 group-hover:scale-110"
                  onError={() => handleImageError(getImagePath(item))}
                />
              )}
            </div>
            
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/0 z-20"></div>
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-30">
              <h3 className="text-2xl font-marvel font-bold text-white mb-2 drop-shadow-lg">
                {item.name}
              </h3>
              <p className="text-lg font-marvel text-amber-500 mb-3 drop-shadow-lg">
                R {item.price.toLocaleString()}
              </p>
              
              <div className="flex items-center justify-between text-white/80">
                <div className="flex items-center">
                  <Icons.Store size={16} className="mr-2" />
                  <span className="font-marvel">1 store</span>
                </div>
                <div className="flex items-center">
                  <Icons.Tag size={16} className="mr-2" />
                  <span className="font-marvel">{item.category}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
