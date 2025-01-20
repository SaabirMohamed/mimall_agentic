import { Category } from '../../types/categories';
import { generateStores } from '../stores';

export const electronicsCategory: Category = {
  id: '2',
  name: 'Electronics',
  icon: 'Smartphone',
  description: 'Latest gadgets and electronic devices',
  subcategories: [
    {
      id: 'smartphones',
      category_id: '2',
      name: 'Smartphones',
      description: 'Latest mobile phones and accessories',
      created_at: '2025-01-20T15:28:28Z',
      updated_at: '2025-01-20T15:28:28Z',
      products: [
        {
          id: '201',
          name: 'Premium Smartphone X',
          image: '/products/electronics/phone1.jpg',
          price: 15999.99,
          description: '5G enabled smartphone with pro camera system',
          category: 'Electronics',
          subcategory: 'Smartphones',
          tags: ['phone', '5G', 'premium'],
          category_id: '2',
          subcategory_id: 'smartphones',
          vendor_id: 'v1',
          sku: 'PHONE-201',
          stock_quantity: 50,
          location: 'Warehouse A',
          area_name: 'Electronics Section',
          created_at: '2025-01-20T15:28:28Z',
          updated_at: '2025-01-20T15:28:28Z',
          stores: generateStores(29)
        },
        {
          id: '202',
          name: 'Budget Smartphone Y',
          image: '/products/electronics/phone2.jpg',
          price: 4999.99,
          description: 'Affordable smartphone with great features',
          category: 'Electronics',
          subcategory: 'Smartphones',
          tags: ['phone', 'budget', 'value'],
          category_id: '2',
          subcategory_id: 'smartphones',
          vendor_id: 'v1',
          sku: 'PHONE-202',
          stock_quantity: 100,
          location: 'Warehouse A',
          area_name: 'Electronics Section',
          created_at: '2025-01-20T15:28:28Z',
          updated_at: '2025-01-20T15:28:28Z',
          stores: generateStores(33)
        }
      ]
    },
    {
      id: 'laptops',
      category_id: '2',
      name: 'Laptops',
      description: 'Professional and gaming laptops',
      created_at: '2025-01-20T15:28:28Z',
      updated_at: '2025-01-20T15:28:28Z',
      products: [
        {
          id: '203',
          name: 'Ultra Laptop Pro',
          image: '/products/electronics/laptop1.jpg',
          price: 24999.99,
          description: 'Powerful laptop for professionals',
          category: 'Electronics',
          subcategory: 'Laptops',
          tags: ['laptop', 'business', 'premium'],
          category_id: '2',
          subcategory_id: 'laptops',
          vendor_id: 'v1',
          sku: 'LAPTOP-203',
          stock_quantity: 30,
          location: 'Warehouse B',
          area_name: 'Electronics Section',
          created_at: '2025-01-20T15:28:28Z',
          updated_at: '2025-01-20T15:28:28Z',
          stores: generateStores(37)
        },
        {
          id: '204',
          name: 'Gaming Laptop Elite',
          image: '/products/electronics/laptop2.jpg',
          price: 34999.99,
          description: 'High-performance gaming laptop',
          category: 'Electronics',
          subcategory: 'Laptops',
          tags: ['laptop', 'gaming', 'premium'],
          category_id: '2',
          subcategory_id: 'laptops',
          vendor_id: 'v1',
          sku: 'LAPTOP-204',
          stock_quantity: 25,
          location: 'Warehouse B',
          area_name: 'Electronics Section',
          created_at: '2025-01-20T15:28:28Z',
          updated_at: '2025-01-20T15:28:28Z',
          stores: generateStores(41)
        }
      ]
    },
    {
      id: 'tablets',
      category_id: '2',
      name: 'Tablets',
      description: 'Tablets and e-readers',
      created_at: '2025-01-20T15:28:28Z',
      updated_at: '2025-01-20T15:28:28Z',
      products: [
        {
          id: '205',
          name: 'Pro Tablet X',
          image: '/products/electronics/tablet1.jpg',
          price: 12999.99,
          description: 'Professional tablet with stylus support',
          category: 'Electronics',
          subcategory: 'Tablets',
          tags: ['tablet', 'stylus', 'premium'],
          category_id: '2',
          subcategory_id: 'tablets',
          vendor_id: 'v1',
          sku: 'TABLET-205',
          stock_quantity: 40,
          location: 'Warehouse A',
          area_name: 'Electronics Section',
          created_at: '2025-01-20T15:28:28Z',
          updated_at: '2025-01-20T15:28:28Z',
          stores: generateStores(45)
        }
      ]
    },
    {
      id: 'accessories',
      category_id: '2',
      name: 'Accessories',
      description: 'Electronic accessories and peripherals',
      created_at: '2025-01-20T15:28:28Z',
      updated_at: '2025-01-20T15:28:28Z',
      products: [
        {
          id: '206',
          name: 'Wireless Earbuds Pro',
          image: '/products/electronics/earbuds1.jpg',
          price: 3999.99,
          description: 'Premium wireless earbuds with noise cancellation',
          category: 'Electronics',
          subcategory: 'Accessories',
          tags: ['audio', 'wireless', 'premium'],
          category_id: '2',
          subcategory_id: 'accessories',
          vendor_id: 'v1',
          sku: 'ACC-206',
          stock_quantity: 75,
          location: 'Warehouse A',
          area_name: 'Electronics Section',
          created_at: '2025-01-20T15:28:28Z',
          updated_at: '2025-01-20T15:28:28Z',
          stores: generateStores(49)
        }
      ]
    }
  ]
};
