import { Category } from '../../types/categories';
import { generateStores } from '../stores';

export const homeCategory: Category = {
  id: '3',
  name: 'Home & Living',
  icon: 'Home',
  description: 'Furniture and home decor',
  subcategories: [
    {
      id: '301',
      category_id: '3',
      name: 'Furniture',
      description: 'Modern and classic furniture',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
      products: [
        {
          id: '301',
          name: 'Modern Sofa Set',
          image: '/ai_product_images/Home_&_Living/Furniture_(Bedroom.png',
          price: 19999.99,
          description: 'Contemporary 3-seater sofa with ottoman',
          category: 'Home & Living',
          subcategory: 'Furniture',
          tags: ['furniture', 'modern', 'living room'],
          category_id: '3',
          subcategory_id: '301',
          vendor_id: 'vendor53',
          sku: 'MS-301',
          stock_quantity: 25,
          location: 'Home Wing',
          area_name: 'Furniture Section',
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
          stores: generateStores(53)
        },
        {
          id: '302',
          name: 'Dining Table Set',
          image: '/ai_product_images/Home_&_Living/Furniture_(Bedroom.png',
          price: 15999.99,
          description: '6-seater dining table with chairs',
          category: 'Home & Living',
          subcategory: 'Furniture',
          tags: ['furniture', 'dining', 'modern'],
          category_id: '3',
          subcategory_id: '301',
          vendor_id: 'vendor54',
          sku: 'DT-302',
          stock_quantity: 15,
          location: 'Home Wing',
          area_name: 'Furniture Section',
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
          stores: generateStores(54)
        }
      ]
    },
    {
      id: '302',
      category_id: '3',
      name: 'Decor',
      description: 'Home decoration items',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
      products: [
        {
          id: '303',
          name: 'Abstract Wall Art',
          image: '/ai_product_images/Home_&_Living/Decor_(Art.png',
          price: 2999.99,
          description: 'Modern abstract canvas wall art',
          category: 'Home & Living',
          subcategory: 'Decor',
          tags: ['decor', 'art', 'modern'],
          category_id: '3',
          subcategory_id: '302',
          vendor_id: 'vendor55',
          sku: 'WA-303',
          stock_quantity: 50,
          location: 'Home Wing',
          area_name: 'Decor Section',
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
          stores: generateStores(55)
        }
      ]
    },
    {
      id: '303',
      category_id: '3',
      name: 'Lighting',
      description: 'Indoor and outdoor lighting',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
      products: [
        {
          id: '304',
          name: 'Modern Chandelier',
          image: '/ai_product_images/Home_&_Living/Lighting_(Chandelier.png',
          price: 8999.99,
          description: 'Contemporary crystal chandelier',
          category: 'Home & Living',
          subcategory: 'Lighting',
          tags: ['lighting', 'modern', 'luxury'],
          category_id: '3',
          subcategory_id: '303',
          vendor_id: 'vendor56',
          sku: 'MC-304',
          stock_quantity: 10,
          location: 'Home Wing',
          area_name: 'Lighting Section',
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
          stores: generateStores(56)
        }
      ]
    },
    {
      id: '304',
      category_id: '3',
      name: 'Kitchen',
      description: 'Kitchen appliances and accessories',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
      products: [
        {
          id: '305',
          name: 'Coffee Maker Pro',
          image: '/ai_product_images/Home_&_Living/Kitchenware_(Cookware.png',
          price: 4999.99,
          description: 'Professional grade coffee maker',
          category: 'Home & Living',
          subcategory: 'Kitchen',
          tags: ['kitchen', 'appliances', 'coffee'],
          category_id: '3',
          subcategory_id: '304',
          vendor_id: 'vendor57',
          sku: 'CM-305',
          stock_quantity: 30,
          location: 'Home Wing',
          area_name: 'Kitchen Section',
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
          stores: generateStores(57)
        }
      ]
    }
  ]
};
