import { Category } from '../../types/categories';
import { generateStores } from '../stores';

export const fashionCategory: Category = {
  id: 1,
  name: 'Fashion & Apparel',
  icon: 'ShoppingBag',
  description: 'Latest fashion trends and clothing for all ages',
  subcategories: [
    {
      name: "Women's Clothing",
      description: 'Fashion for women',
      products: [
        {
          id: 101,
          name: 'Summer Floral Dress',
          image: '/products/fashion/dress1.jpg',
          price: 1299.99,
          description: 'Light and breezy summer dress with floral pattern',
          category: 'Fashion & Apparel',
          subcategory: "Women's Clothing",
          tags: ['summer', 'dress', 'floral'],
          stores: generateStores(1)
        },
        {
          id: 102,
          name: 'Business Blazer',
          image: '/products/fashion/blazer1.jpg',
          price: 2499.99,
          description: 'Professional blazer for the modern businesswoman',
          category: 'Fashion & Apparel',
          subcategory: "Women's Clothing",
          tags: ['business', 'formal', 'blazer'],
          stores: generateStores(5)
        }
      ]
    },
    {
      name: "Men's Clothing",
      description: 'Fashion for men',
      products: [
        {
          id: 103,
          name: 'Classic Suit',
          image: '/products/fashion/suit1.jpg',
          price: 4999.99,
          description: 'Premium wool blend suit in navy blue',
          category: 'Fashion & Apparel',
          subcategory: "Men's Clothing",
          tags: ['formal', 'suit', 'business'],
          stores: generateStores(9)
        },
        {
          id: 104,
          name: 'Casual Denim Jacket',
          image: '/products/fashion/jacket1.jpg',
          price: 1799.99,
          description: 'Classic denim jacket with modern fit',
          category: 'Fashion & Apparel',
          subcategory: "Men's Clothing",
          tags: ['casual', 'denim', 'jacket'],
          stores: generateStores(13)
        }
      ]
    },
    {
      name: "Kids' Clothing",
      description: 'Fashion for children',
      products: [
        {
          id: 105,
          name: 'Kids Play Set',
          image: '/products/fashion/kids1.jpg',
          price: 599.99,
          description: 'Comfortable and durable play set for active kids',
          category: 'Fashion & Apparel',
          subcategory: "Kids' Clothing",
          tags: ['kids', 'play', 'comfortable'],
          stores: generateStores(17)
        }
      ]
    },
    {
      name: 'Shoes',
      description: 'Footwear for all ages',
      products: [
        {
          id: 106,
          name: 'Running Shoes',
          image: '/products/fashion/shoes1.jpg',
          price: 1499.99,
          description: 'Professional running shoes with advanced cushioning',
          category: 'Fashion & Apparel',
          subcategory: 'Shoes',
          tags: ['sports', 'running', 'shoes'],
          stores: generateStores(21)
        }
      ]
    },
    {
      name: 'Accessories',
      description: 'Fashion accessories and jewelry',
      products: [
        {
          id: 107,
          name: 'Designer Sunglasses',
          image: '/products/fashion/sunglasses1.jpg',
          price: 2999.99,
          description: 'Premium designer sunglasses with UV protection',
          category: 'Fashion & Apparel',
          subcategory: 'Accessories',
          tags: ['accessories', 'sunglasses', 'designer'],
          stores: generateStores(25)
        }
      ]
    }
  ]
};
