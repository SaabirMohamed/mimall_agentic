import { Category } from '../../types/categories';
import { generateStores } from '../stores';

export const fashionCategory: Category = {
  id: '1',
  name: 'Fashion',
  icon: 'ShoppingBag',
  image: '/categories/fashion.jpg',
  image_url: '/categories/fashion.jpg',
  description: 'Latest fashion trends and accessories',
  subcategories: [
    {
      id: '101',
      category_id: '1',
      name: "Women's Clothing",
      description: 'Fashion for women',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
      products: [
        {
          id: '101',
          name: 'Summer Floral Dress',
          image: '/ai_product_images/Fashion_&_Apparel/Women\'s_Clothing.png',
          image_url: '/ai_product_images/Fashion_&_Apparel/Women\'s_Clothing.png',
          price: 1299.99,
          description: 'Light and breezy summer dress with floral pattern',
          category: 'Fashion & Apparel',
          subcategory: "Women's Clothing",
          tags: ['summer', 'dress', 'floral'],
          category_id: '1',
          subcategory_id: '101',
          vendor_id: 'vendor1',
          sku: 'SFD-101',
          stock_quantity: 100,
          location: 'Fashion Wing',
          area_name: 'Clothing Section',
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
          stores: generateStores(1)
        },
        {
          id: '102',
          name: 'Business Blazer',
          image: '/ai_product_images/Fashion_&_Apparel/Women\'s_Clothing.png',
          image_url: '/ai_product_images/Fashion_&_Apparel/Women\'s_Clothing.png',
          price: 2499.99,
          description: 'Professional blazer for the modern businesswoman',
          category: 'Fashion & Apparel',
          subcategory: "Women's Clothing",
          tags: ['business', 'formal', 'blazer'],
          category_id: '1',
          subcategory_id: '102',
          vendor_id: 'vendor2',
          sku: 'BB-102',
          stock_quantity: 50,
          location: 'Fashion Wing',
          area_name: 'Clothing Section',
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
          stores: generateStores(5)
        }
      ]
    },
    {
      id: '102',
      category_id: '1',
      name: "Men's Clothing",
      description: 'Fashion for men',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
      products: [
        {
          id: '103',
          name: 'Classic Suit',
          image: '/ai_product_images/Fashion_&_Apparel/Men\'s_Clothing.png',
          image_url: '/ai_product_images/Fashion_&_Apparel/Men\'s_Clothing.png',
          price: 4999.99,
          description: 'Premium wool blend suit in navy blue',
          category: 'Fashion & Apparel',
          subcategory: "Men's Clothing",
          tags: ['formal', 'suit', 'business'],
          category_id: '1',
          subcategory_id: '102',
          vendor_id: 'vendor2',
          sku: 'CS-103',
          stock_quantity: 30,
          location: 'Fashion Wing',
          area_name: 'Clothing Section',
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
          stores: generateStores(9)
        },
        {
          id: '104',
          name: 'Casual Denim Jacket',
          image: '/ai_product_images/Fashion_&_Apparel/Men\'s_Clothing.png',
          image_url: '/ai_product_images/Fashion_&_Apparel/Men\'s_Clothing.png',
          price: 1799.99,
          description: 'Classic denim jacket with modern fit',
          category: 'Fashion & Apparel',
          subcategory: "Men's Clothing",
          tags: ['casual', 'denim', 'jacket'],
          category_id: '1',
          subcategory_id: '102',
          vendor_id: 'vendor2',
          sku: 'JD-104',
          stock_quantity: 50,
          location: 'Fashion Wing',
          area_name: 'Clothing Section',
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
          stores: generateStores(13)
        }
      ]
    },
    {
      id: '103',
      category_id: '1',
      name: "Kids' Clothing",
      description: 'Fashion for kids',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
      products: [
        {
          id: '105',
          name: 'Kids Play Set',
          image: '/ai_product_images/Fashion_&_Apparel/Kids\'_Clothing.png',
          image_url: '/ai_product_images/Fashion_&_Apparel/Kids\'_Clothing.png',
          price: 599.99,
          description: 'Comfortable and durable play set for active kids',
          category: 'Fashion & Apparel',
          subcategory: "Kids' Clothing",
          tags: ['kids', 'play', 'comfortable'],
          category_id: '1',
          subcategory_id: '103',
          vendor_id: 'vendor3',
          sku: 'KP-105',
          stock_quantity: 20,
          location: 'Fashion Wing',
          area_name: 'Clothing Section',
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
          stores: generateStores(17)
        }
      ]
    },
    {
      id: '104',
      category_id: '1',
      name: 'Shoes',
      description: 'Footwear for all ages',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
      products: [
        {
          id: '106',
          name: 'Running Shoes',
          image: '/ai_product_images/Fashion_&_Apparel/Shoes.png',
          image_url: '/ai_product_images/Fashion_&_Apparel/Shoes.png',
          price: 1499.99,
          description: 'Professional running shoes with advanced cushioning',
          category: 'Fashion & Apparel',
          subcategory: 'Shoes',
          tags: ['sports', 'running', 'shoes'],
          category_id: '1',
          subcategory_id: '104',
          vendor_id: 'vendor4',
          sku: 'RS-106',
          stock_quantity: 15,
          location: 'Fashion Wing',
          area_name: 'Clothing Section',
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
          stores: generateStores(21)
        }
      ]
    },
    {
      id: '105',
      category_id: '1',
      name: 'Accessories',
      description: 'Fashion accessories and jewelry',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
      products: [
        {
          id: '107',
          name: 'Designer Sunglasses',
          image: '/ai_product_images/Fashion_&_Apparel/Accessories.png',
          image_url: '/ai_product_images/Fashion_&_Apparel/Accessories.png',
          price: 2999.99,
          description: 'Premium designer sunglasses with UV protection',
          category: 'Fashion & Apparel',
          subcategory: 'Accessories',
          tags: ['accessories', 'sunglasses', 'designer'],
          category_id: '1',
          subcategory_id: '105',
          vendor_id: 'vendor5',
          sku: 'DS-107',
          stock_quantity: 10,
          location: 'Fashion Wing',
          area_name: 'Clothing Section',
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
          stores: generateStores(25)
        }
      ]
    }
  ]
};
