import { Category } from '../../types/categories';
import { generateStores } from '../stores';

export const beautyCategory: Category = {
  id: 4,
  name: 'Beauty & Personal Care',
  icon: 'Sparkles',
  description: 'Beauty products and personal care items',
  subcategories: [
    {
      name: 'Skincare',
      description: 'Facial and body skincare products',
      products: [
        {
          id: 401,
          name: 'Premium Face Serum',
          image: '/products/beauty/serum1.jpg',
          price: 899.99,
          description: 'Anti-aging face serum with vitamin C',
          category: 'Beauty & Personal Care',
          subcategory: 'Skincare',
          tags: ['skincare', 'face', 'premium'],
          stores: generateStores(73)
        },
        {
          id: 402,
          name: 'Hydrating Cream',
          image: '/products/beauty/cream1.jpg',
          price: 599.99,
          description: '24-hour hydrating face cream',
          category: 'Beauty & Personal Care',
          subcategory: 'Skincare',
          tags: ['skincare', 'face', 'hydrating'],
          stores: generateStores(77)
        }
      ]
    },
    {
      name: 'Makeup',
      description: 'Cosmetics and makeup products',
      products: [
        {
          id: 403,
          name: 'Luxury Makeup Set',
          image: '/products/beauty/makeup1.jpg',
          price: 1999.99,
          description: 'Complete luxury makeup collection',
          category: 'Beauty & Personal Care',
          subcategory: 'Makeup',
          tags: ['makeup', 'luxury', 'set'],
          stores: generateStores(81)
        }
      ]
    },
    {
      name: 'Fragrances',
      description: 'Premium perfumes and colognes',
      products: [
        {
          id: 404,
          name: 'Designer Perfume',
          image: '/products/beauty/perfume1.jpg',
          price: 2499.99,
          description: 'Exclusive designer fragrance',
          category: 'Beauty & Personal Care',
          subcategory: 'Fragrances',
          tags: ['fragrance', 'luxury', 'designer'],
          stores: generateStores(85)
        }
      ]
    }
  ]
};
