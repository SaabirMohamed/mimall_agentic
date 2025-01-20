import { Category } from '../../types/categories';
import { generateStores } from '../stores';

export const homeCategory: Category = {
  id: 3,
  name: 'Home & Living',
  icon: 'Home',
  description: 'Furniture and home decor',
  subcategories: [
    {
      name: 'Furniture',
      description: 'Modern and classic furniture',
      products: [
        {
          id: 301,
          name: 'Modern Sofa Set',
          image: '/products/home/sofa1.jpg',
          price: 19999.99,
          description: 'Contemporary 3-seater sofa with ottoman',
          category: 'Home & Living',
          subcategory: 'Furniture',
          tags: ['furniture', 'modern', 'living room'],
          stores: generateStores(53)
        },
        {
          id: 302,
          name: 'Dining Table Set',
          image: '/products/home/dining1.jpg',
          price: 15999.99,
          description: '6-seater dining table with chairs',
          category: 'Home & Living',
          subcategory: 'Furniture',
          tags: ['furniture', 'dining', 'modern'],
          stores: generateStores(57)
        }
      ]
    },
    {
      name: 'Decor',
      description: 'Home decoration items',
      products: [
        {
          id: 303,
          name: 'Abstract Wall Art',
          image: '/products/home/art1.jpg',
          price: 2999.99,
          description: 'Modern abstract canvas wall art',
          category: 'Home & Living',
          subcategory: 'Decor',
          tags: ['decor', 'art', 'modern'],
          stores: generateStores(61)
        }
      ]
    },
    {
      name: 'Lighting',
      description: 'Indoor and outdoor lighting',
      products: [
        {
          id: 304,
          name: 'Modern Chandelier',
          image: '/products/home/light1.jpg',
          price: 8999.99,
          description: 'Contemporary LED chandelier',
          category: 'Home & Living',
          subcategory: 'Lighting',
          tags: ['lighting', 'modern', 'LED'],
          stores: generateStores(65)
        }
      ]
    },
    {
      name: 'Kitchen',
      description: 'Kitchen appliances and accessories',
      products: [
        {
          id: 305,
          name: 'Coffee Maker Pro',
          image: '/products/home/coffee1.jpg',
          price: 4999.99,
          description: 'Professional grade coffee maker',
          category: 'Home & Living',
          subcategory: 'Kitchen',
          tags: ['kitchen', 'appliance', 'coffee'],
          stores: generateStores(69)
        }
      ]
    }
  ]
};
