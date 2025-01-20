import { Category } from '../../types/categories';
import { generateStores } from '../stores';

export const sportsCategory: Category = {
  id: '5',
  name: 'Sports & Fitness',
  icon: 'Dumbbell',
  image: '/categories/sports.jpg',
  image_url: '/categories/sports.jpg',
  description: 'Sports equipment and fitness gear',
  subcategories: [
    {
      id: '501',
      category_id: '5',
      name: 'Exercise Equipment',
      description: 'Home gym and fitness equipment',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
      products: [
        {
          id: '501',
          name: 'Smart Treadmill',
          image: '/products/sports/treadmill.jpg',
          image_url: '/products/sports/treadmill.jpg',
          price: 29999.99,
          description: 'Smart treadmill with virtual training',
          category: 'Sports & Fitness',
          subcategory: 'Exercise Equipment',
          tags: ['fitness', 'cardio', 'smart'],
          category_id: '5',
          subcategory_id: '501',
          vendor_id: 'vendor89',
          sku: 'ST-501',
          stock_quantity: 10,
          location: 'Sports Wing',
          area_name: 'Fitness Section',
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
          stores: generateStores(89)
        },
        {
          id: '502',
          name: 'Adjustable Dumbbell Set',
          image: '/ai_product_images/Sports_&_Outdoors/Fitness_Equipment.png',
          image_url: '/ai_product_images/Sports_&_Outdoors/Fitness_Equipment.png',
          price: 4999.99,
          description: 'Space-saving adjustable dumbbells',
          category: 'Sports & Fitness',
          subcategory: 'Exercise Equipment',
          tags: ['fitness', 'weights', 'adjustable'],
          category_id: '5',
          subcategory_id: '501',
          vendor_id: 'vendor93',
          sku: 'AD-502',
          stock_quantity: 20,
          location: 'Sports Wing',
          area_name: 'Fitness Section',
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
          stores: generateStores(93)
        }
      ]
    },
    {
      id: '502',
      category_id: '5',
      name: 'Sports Wear',
      description: 'Athletic and sports clothing',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
      products: [
        {
          id: '503',
          name: 'Performance Running Set',
          image: '/ai_product_images/Sports_&_Outdoors/Sportswear.png',
          image_url: '/ai_product_images/Sports_&_Outdoors/Sportswear.png',
          price: 1499.99,
          description: 'High-performance running outfit',
          category: 'Sports & Fitness',
          subcategory: 'Sports Wear',
          tags: ['clothing', 'running', 'performance'],
          category_id: '5',
          subcategory_id: '502',
          vendor_id: 'vendor97',
          sku: 'PR-503',
          stock_quantity: 50,
          location: 'Sports Wing',
          area_name: 'Clothing Section',
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
          stores: generateStores(97)
        }
      ]
    },
    {
      id: '503',
      category_id: '5',
      name: 'Sports Equipment',
      description: 'Equipment for various sports',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
      products: [
        {
          id: '504',
          name: 'Professional Soccer Ball',
          image: '/ai_product_images/Sports_&_Outdoors/Sports_Equipment.png',
          image_url: '/ai_product_images/Sports_&_Outdoors/Sports_Equipment.png',
          price: 799.99,
          description: 'Competition-grade soccer ball',
          category: 'Sports & Fitness',
          subcategory: 'Sports Equipment',
          tags: ['soccer', 'sports', 'professional'],
          category_id: '5',
          subcategory_id: '503',
          vendor_id: 'vendor101',
          sku: 'SB-504',
          stock_quantity: 100,
          location: 'Sports Wing',
          area_name: 'Equipment Section',
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
          stores: generateStores(101)
        }
      ]
    }
  ]
};
