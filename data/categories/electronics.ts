import { Category } from '../../types/categories';
import { generateStores } from '../stores';

export const electronicsCategory: Category = {
  id: 2,
  name: 'Electronics',
  icon: 'Smartphone',
  description: 'Latest gadgets and electronic devices',
  subcategories: [
    {
      name: 'Smartphones',
      description: 'Latest mobile phones and accessories',
      products: [
        {
          id: 201,
          name: 'Premium Smartphone X',
          image: '/products/electronics/phone1.jpg',
          price: 15999.99,
          description: '5G enabled smartphone with pro camera system',
          category: 'Electronics',
          subcategory: 'Smartphones',
          tags: ['phone', '5G', 'premium'],
          stores: generateStores(29)
        },
        {
          id: 202,
          name: 'Budget Smartphone Y',
          image: '/products/electronics/phone2.jpg',
          price: 4999.99,
          description: 'Affordable smartphone with great features',
          category: 'Electronics',
          subcategory: 'Smartphones',
          tags: ['phone', 'budget', 'value'],
          stores: generateStores(33)
        }
      ]
    },
    {
      name: 'Laptops',
      description: 'Professional and gaming laptops',
      products: [
        {
          id: 203,
          name: 'Ultra Laptop Pro',
          image: '/products/electronics/laptop1.jpg',
          price: 24999.99,
          description: 'Powerful laptop for professionals',
          category: 'Electronics',
          subcategory: 'Laptops',
          tags: ['laptop', 'business', 'premium'],
          stores: generateStores(37)
        },
        {
          id: 204,
          name: 'Gaming Laptop Elite',
          image: '/products/electronics/laptop2.jpg',
          price: 34999.99,
          description: 'High-performance gaming laptop',
          category: 'Electronics',
          subcategory: 'Laptops',
          tags: ['laptop', 'gaming', 'premium'],
          stores: generateStores(41)
        }
      ]
    },
    {
      name: 'Tablets',
      description: 'Tablets and e-readers',
      products: [
        {
          id: 205,
          name: 'Pro Tablet X',
          image: '/products/electronics/tablet1.jpg',
          price: 12999.99,
          description: 'Professional tablet with stylus support',
          category: 'Electronics',
          subcategory: 'Tablets',
          tags: ['tablet', 'stylus', 'premium'],
          stores: generateStores(45)
        }
      ]
    },
    {
      name: 'Accessories',
      description: 'Electronic accessories and peripherals',
      products: [
        {
          id: 206,
          name: 'Wireless Earbuds Pro',
          image: '/products/electronics/earbuds1.jpg',
          price: 3999.99,
          description: 'Premium wireless earbuds with noise cancellation',
          category: 'Electronics',
          subcategory: 'Accessories',
          tags: ['audio', 'wireless', 'premium'],
          stores: generateStores(49)
        }
      ]
    }
  ]
};
