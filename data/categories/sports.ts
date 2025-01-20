import { Category } from '../../types/categories';
import { generateStores } from '../stores';

export const sportsCategory: Category = {
  id: 5,
  name: 'Sports & Fitness',
  icon: 'Dumbbell',
  description: 'Sports equipment and fitness gear',
  subcategories: [
    {
      name: 'Exercise Equipment',
      description: 'Home gym and fitness equipment',
      products: [
        {
          id: 501,
          name: 'Smart Treadmill',
          image: '/products/sports/treadmill1.jpg',
          price: 29999.99,
          description: 'Smart treadmill with virtual training',
          category: 'Sports & Fitness',
          subcategory: 'Exercise Equipment',
          tags: ['fitness', 'cardio', 'smart'],
          stores: generateStores(89)
        },
        {
          id: 502,
          name: 'Adjustable Dumbbell Set',
          image: '/products/sports/dumbbells1.jpg',
          price: 4999.99,
          description: 'Space-saving adjustable dumbbells',
          category: 'Sports & Fitness',
          subcategory: 'Exercise Equipment',
          tags: ['fitness', 'weights', 'adjustable'],
          stores: generateStores(93)
        }
      ]
    },
    {
      name: 'Sportswear',
      description: 'Athletic clothing and accessories',
      products: [
        {
          id: 503,
          name: 'Performance Running Set',
          image: '/products/sports/running1.jpg',
          price: 1499.99,
          description: 'Moisture-wicking running outfit',
          category: 'Sports & Fitness',
          subcategory: 'Sportswear',
          tags: ['clothing', 'running', 'performance'],
          stores: generateStores(97)
        }
      ]
    },
    {
      name: 'Team Sports',
      description: 'Equipment for team sports',
      products: [
        {
          id: 504,
          name: 'Professional Soccer Ball',
          image: '/products/sports/soccer1.jpg',
          price: 799.99,
          description: 'Match-quality soccer ball',
          category: 'Sports & Fitness',
          subcategory: 'Team Sports',
          tags: ['soccer', 'sports', 'professional'],
          stores: generateStores(101)
        }
      ]
    }
  ]
};
