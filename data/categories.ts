import { Category } from '../types/categories';

export const categories: Category[] = [
  {
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
            stores: [
              {
                id: 1,
                name: 'Fashion Hub',
                location: 'Mall of Africa',
                coordinates: {lat: -26.0167, lng: 28.1167},
                availability: 'In Stock'
              }
            ]
          }
        ]
      },
      {
        name: "Men's Clothing",
        description: 'Fashion for men',
        products: [
          {
            id: 102,
            name: 'Classic Suit',
            image: '/products/fashion/suit1.jpg',
            price: 4999.99,
            description: 'Premium wool blend suit in navy blue',
            category: 'Fashion & Apparel',
            subcategory: "Men's Clothing",
            tags: ['formal', 'suit', 'business'],
            stores: [
              {
                id: 2,
                name: 'Suits & Co',
                location: 'Sandton City',
                coordinates: {lat: -26.1067, lng: 28.0567},
                availability: 'In Stock'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 2,
    name: 'Electronics',
    icon: 'Laptop',
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
            stores: [
              {
                id: 3,
                name: 'Digital World',
                location: 'Eastgate',
                coordinates: {lat: -26.1833, lng: 28.1167},
                availability: 'Limited Stock'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 3,
    name: 'Home & Garden',
    icon: 'Home',
    description: 'Decor and furniture for your home',
    subcategories: [
      {
        name: 'Furniture',
        description: 'Sofas, beds, tables and more',
        products: [
          {
            id: 301,
            name: 'Modern Sofa',
            image: '/products/home/sofa1.jpg',
            price: 9999.99,
            description: 'Stylish and comfortable sofa for your living room',
            category: 'Home & Garden',
            subcategory: 'Furniture',
            tags: ['sofa', 'modern', 'furniture'],
            stores: [
              {
                id: 4,
                name: 'Home Decor',
                location: 'Fourways',
                coordinates: {lat: -26.0167, lng: 28.0167},
                availability: 'In Stock'
              }
            ]
          }
        ]
      },
      {
        name: 'Kitchenware',
        description: 'Cooking utensils and appliances',
        products: [
          {
            id: 302,
            name: 'Stainless Steel Frying Pan',
            image: '/products/home/pan1.jpg',
            price: 499.99,
            description: 'High-quality non-stick frying pan',
            category: 'Home & Garden',
            subcategory: 'Kitchenware',
            tags: ['pan', 'stainless steel', 'kitchenware'],
            stores: [
              {
                id: 5,
                name: 'Kitchen Essentials',
                location: 'Northgate',
                coordinates: {lat: -26.1167, lng: 27.9667},
                availability: 'In Stock'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 4,
    name: 'Sports & Outdoors',
    icon: 'Football',
    description: 'Fitness gear and outdoor equipment',
    subcategories: [
      {
        name: 'Fitness',
        description: 'Gym equipment and accessories',
        products: [
          {
            id: 401,
            name: 'Adjustable Dumbbells',
            image: '/products/sports/dumbbells1.jpg',
            price: 299.99,
            description: 'High-quality adjustable dumbbells',
            category: 'Sports & Outdoors',
            subcategory: 'Fitness',
            tags: ['dumbbells', 'fitness', 'adjustable'],
            stores: [
              {
                id: 6,
                name: 'Sports World',
                location: 'Cresta',
                coordinates: {lat: -26.1167, lng: 28.0167},
                availability: 'In Stock'
              }
            ]
          }
        ]
      },
      {
        name: 'Camping',
        description: 'Tents, sleeping bags, and more',
        products: [
          {
            id: 402,
            name: 'Waterproof Tent',
            image: '/products/sports/tent1.jpg',
            price: 1999.99,
            description: 'High-quality waterproof tent for camping',
            category: 'Sports & Outdoors',
            subcategory: 'Camping',
            tags: ['tent', 'waterproof', 'camping'],
            stores: [
              {
                id: 7,
                name: 'Outdoor Adventures',
                location: 'Bryanston',
                coordinates: {lat: -26.0667, lng: 28.0167},
                availability: 'In Stock'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 5,
    name: 'Health & Beauty',
    icon: 'Heart',
    description: 'Skincare, makeup, and wellness products',
    subcategories: [
      {
        name: 'Skincare',
        description: 'Face creams, serums, and more',
        products: [
          {
            id: 501,
            name: 'Moisturizing Cream',
            image: '/products/beauty/cream1.jpg',
            price: 99.99,
            description: 'Nourishing moisturizing cream',
            category: 'Health & Beauty',
            subcategory: 'Skincare',
            tags: ['cream', 'moisturizing', 'skincare'],
            stores: [
              {
                id: 8,
                name: 'Beauty Shop',
                location: 'Rosebank',
                coordinates: {lat: -26.1167, lng: 28.0667},
                availability: 'In Stock'
              }
            ]
          }
        ]
      },
      {
        name: 'Makeup',
        description: 'Lipstick, eyeshadow, and more',
        products: [
          {
            id: 502,
            name: 'Lipstick Set',
            image: '/products/beauty/lipstick1.jpg',
            price: 199.99,
            description: 'Set of 6 lipsticks',
            category: 'Health & Beauty',
            subcategory: 'Makeup',
            tags: ['lipstick', 'set', 'makeup'],
            stores: [
              {
                id: 9,
                name: 'Makeup Studio',
                location: 'Sandton',
                coordinates: {lat: -26.1067, lng: 28.0567},
                availability: 'In Stock'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 6,
    name: 'Baby & Kids',
    icon: 'Baby',
    description: 'Toys, clothing, and accessories for little ones',
    subcategories: [
      {
        name: 'Toys',
        description: 'Action figures, dolls, and more',
        products: [
          {
            id: 601,
            name: 'Teddy Bear',
            image: '/products/kids/teddy1.jpg',
            price: 49.99,
            description: 'Cuddly teddy bear',
            category: 'Baby & Kids',
            subcategory: 'Toys',
            tags: ['teddy bear', 'toy', 'kids'],
            stores: [
              {
                id: 10,
                name: 'Toy World',
                location: 'Northgate',
                coordinates: {lat: -26.1167, lng: 27.9667},
                availability: 'In Stock'
              }
            ]
          }
        ]
      },
      {
        name: 'Clothing',
        description: 'Kids clothing and accessories',
        products: [
          {
            id: 602,
            name: 'Onesie',
            image: '/products/kids/onesie1.jpg',
            price: 29.99,
            description: 'Adorable onesie',
            category: 'Baby & Kids',
            subcategory: 'Clothing',
            tags: ['onesie', 'clothing', 'kids'],
            stores: [
              {
                id: 11,
                name: 'Kids Fashion',
                location: 'Clearwater',
                coordinates: {lat: -26.1167, lng: 27.8667},
                availability: 'In Stock'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 7,
    name: 'Pet Care',
    icon: 'Pet',
    description: 'Pet food, toys, and accessories',
    subcategories: [
      {
        name: 'Food',
        description: 'Pet food and treats',
        products: [
          {
            id: 701,
            name: 'Dry Dog Food',
            image: '/products/pet/dogfood1.jpg',
            price: 49.99,
            description: 'High-quality dry dog food',
            category: 'Pet Care',
            subcategory: 'Food',
            tags: ['dog food', 'dry', 'pet'],
            stores: [
              {
                id: 12,
                name: 'Pet Shop',
                location: 'Fourways',
                coordinates: {lat: -26.0167, lng: 28.0167},
                availability: 'In Stock'
              }
            ]
          }
        ]
      },
      {
        name: 'Toys',
        description: 'Pet toys and accessories',
        products: [
          {
            id: 702,
            name: 'Pet Ball',
            image: '/products/pet/ball1.jpg',
            price: 29.99,
            description: 'Durable pet ball',
            category: 'Pet Care',
            subcategory: 'Toys',
            tags: ['pet ball', 'toy', 'pet'],
            stores: [
              {
                id: 13,
                name: 'Pet Play',
                location: 'Northgate',
                coordinates: {lat: -26.1167, lng: 27.9667},
                availability: 'In Stock'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 8,
    name: 'Arts & Crafts',
    icon: 'Paintbrush',
    description: 'Paints, brushes, and creative supplies',
    subcategories: [
      {
        name: 'Painting',
        description: 'Paints, brushes, and canvases',
        products: [
          {
            id: 801,
            name: 'Acrylic Paint Set',
            image: '/products/arts/paint1.jpg',
            price: 99.99,
            description: 'High-quality acrylic paint set',
            category: 'Arts & Crafts',
            subcategory: 'Painting',
            tags: ['paint', 'acrylic', 'arts'],
            stores: [
              {
                id: 14,
                name: 'Art Supplies',
                location: 'Cresta',
                coordinates: {lat: -26.1167, lng: 28.0167},
                availability: 'In Stock'
              }
            ]
          }
        ]
      },
      {
        name: 'Crafts',
        description: 'Handmade jewelry, pottery, and more',
        products: [
          {
            id: 802,
            name: 'Jewelry Box',
            image: '/products/arts/jewelry1.jpg',
            price: 199.99,
            description: 'Handmade jewelry box',
            category: 'Arts & Crafts',
            subcategory: 'Crafts',
            tags: ['jewelry', 'box', 'crafts'],
            stores: [
              {
                id: 15,
                name: 'Craft Shop',
                location: 'Bryanston',
                coordinates: {lat: -26.0667, lng: 28.0167},
                availability: 'In Stock'
              }
            ]
          }
        ]
      }
    ]
  }
];

// Add more categories following the same pattern...
