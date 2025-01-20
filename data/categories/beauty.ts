import { Category } from '../../types/categories';
import { Product } from '../../types/products';
import { generateStores } from '../stores';

export const beautyCategory: Category = {
  id: '4',
  name: 'Beauty & Personal Care',
  icon: 'Sparkles',
  description: 'Beauty products and personal care items',
  subcategories: [
    {
      id: '401',
      name: 'Skincare',
      description: 'Facial and body skincare products',
      category_id: '4',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
      products: [
        {
          id: '4001',
          name: 'Premium Face Serum',
          image: '/ai_product_images/Health_&_Beauty/Skincare.png',
          price: 899.99,
          description: 'Advanced anti-aging face serum',
          category_id: '4',
          subcategory_id: '401',
          vendor_id: 'vendor73',
          sku: 'PFS-401',
          stock_quantity: 1,
          location: 'Beauty Wing',
          area_name: 'Skincare Section',
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
          stores: generateStores(73)
        },
        {
          id: '4002',
          name: 'Hydrating Cream',
          image: '/ai_product_images/Health_&_Beauty/Skincare.png',
          price: 599.99,
          description: 'Deep hydrating face cream',
          category_id: '4',
          subcategory_id: '401',
          vendor_id: 'vendor74',
          sku: 'HC-402',
          stock_quantity: 150,
          location: 'Beauty Wing',
          area_name: 'Skincare Section',
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
          stores: generateStores(74)
        }
      ]
    },
    {
      id: '402',
      name: 'Makeup',
      description: 'Cosmetics and makeup products',
      category_id: '4',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
      products: [
        {
          id: '4003',
          name: 'Luxury Lipstick Set',
          image: '/ai_product_images/Health_&_Beauty/Makeup.png',
          price: 799.99,
          description: 'Set of premium lipsticks',
          category_id: '4',
          subcategory_id: '402',
          vendor_id: 'vendor75',
          sku: 'LLS-403',
          stock_quantity: 80,
          location: 'Beauty Wing',
          area_name: 'Makeup Section',
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
          stores: generateStores(75)
        },
        {
          id: '4004',
          name: 'Professional Makeup Palette',
          image: '/ai_product_images/Health_&_Beauty/Makeup.png',
          price: 1299.99,
          description: 'Professional-grade eyeshadow palette',
          category_id: '4',
          subcategory_id: '402',
          vendor_id: 'vendor76',
          sku: 'PMP-404',
          stock_quantity: 60,
          location: 'Beauty Wing',
          area_name: 'Makeup Section',
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
          stores: generateStores(76)
        }
      ]
    },
    {
      id: '403',
      name: 'Fragrances',
      description: 'Premium perfumes and colognes',
      category_id: '4',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
      products: [
        {
          id: '4005',
          name: 'Designer Perfume',
          image: '/ai_product_images/Health_&_Beauty/Fragrances.png',
          price: 2499.99,
          description: 'Luxury designer perfume',
          category_id: '4',
          subcategory_id: '403',
          vendor_id: 'vendor77',
          sku: 'DP-405',
          stock_quantity: 40,
          location: 'Beauty Wing',
          area_name: 'Fragrance Section',
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
          stores: generateStores(77)
        }
      ]
    }
  ]
};
