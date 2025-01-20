import { Category } from '../types/categories';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Fashion & Apparel',
    icon: 'ShoppingBag',
    description: 'Latest fashion trends and clothing for all ages',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    subcategories: [
      {
        id: '1',
        name: "Women's Clothing",
        description: 'Fashion for women',
        category_id: '1',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
        products: [
          {
            id: '101',
            name: 'Summer Floral Dress',
            image: '/ai_product_images/Fashion_&_Apparel/summer_floral_dress.png',
            price: 1299.99,
            description: 'Light and breezy summer dress with floral pattern',
            category: 'Fashion & Apparel',
            subcategory: "Women's Clothing",
            category_id: '1',
            subcategory_id: '1',
            vendor_id: 'vendor1',
            sku: 'SFD-101',
            stock_quantity: 50,
            location: 'Mall of Africa',
            area_name: 'Fashion Wing',
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
            tags: ['summer', 'dress', 'floral'],
            stores: [
              {
                id: '1',
                name: 'Fashion Hub',
                location: 'Mall of Africa',
                lat: -26.0167,
                lng: 28.1167,
                owner_id: 'owner1',
                availability: 'In Stock',
                created_at: '2024-01-01T00:00:00Z',
                updated_at: '2024-01-01T00:00:00Z',
                coordinates: { lat: -26.0167, lng: 28.1167 }
              },
              {
                id: '2',
                name: 'Fashion Hub',
                location: 'Mall of Africa',
                lat: -26.0167,
                lng: 28.1167,
                owner_id: 'owner1',
                availability: 'In Stock',
                created_at: '2024-01-01T00:00:00Z',
                updated_at: '2024-01-01T00:00:00Z',
                coordinates: { lat: -26.0167, lng: 28.1167 }
              }
            ]
          }
        ]
      },
      {
        id: '2',
        name: "Men's Clothing",
        description: 'Fashion for men',
        category_id: '1',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
        products: [
          {
            id: '102',
            name: 'Classic Suit',
            image: '/ai_product_images/Fashion_&_Apparel/Coats.png',
            price: 4999.99,
            description: 'High-quality business suit for men',
            category: 'Fashion & Apparel',
            subcategory: "Men's Clothing",
            category_id: '1',
            subcategory_id: '2',
            vendor_id: 'vendor2',
            sku: 'CS-102',
            stock_quantity: 30,
            location: 'Sandton City',
            area_name: 'Formal Wear',
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
            tags: ['formal', 'suit', 'business'],
            stores: [
              {
                id: '2',
                name: 'Suits & Co',
                location: 'Sandton City',
                lat: -26.1067,
                lng: 28.0567,
                owner_id: 'owner2',
                availability: 'In Stock',
                created_at: '2024-01-01T00:00:00Z',
                updated_at: '2024-01-01T00:00:00Z',
                coordinates: { lat: -26.1067, lng: 28.0567 }
              },
              {
                id: '3',
                name: 'Suits & Co',
                location: 'Sandton City',
                lat: -26.1067,
                lng: 28.0567,
                owner_id: 'owner2',
                availability: 'In Stock',
                created_at: '2024-01-01T00:00:00Z',
                updated_at: '2024-01-01T00:00:00Z',
                coordinates: { lat: -26.1067, lng: 28.0567 }  
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Electronics',
    icon: 'Laptop',
    description: 'Latest gadgets and electronic devices',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    subcategories: [
      {
        id: '3',
        name: 'Smartphones',
        description: 'Latest mobile phones and accessories',
        category_id: '2',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
        products: [
          {
            id: '201',
            name: 'Premium Smartphone X',
            image: '/ai_product_images/Electronics/mobile_phones.png',
            price: 15999.99,
            description: '5G enabled smartphone with pro camera system',
            category: 'Electronics',
            subcategory: 'Smartphones',
            category_id: '2',
            subcategory_id: '3',
            vendor_id: 'vendor3',
            sku: 'PSX-201',
            stock_quantity: 20,
            location: 'Eastgate',
            area_name: 'Electronics',
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
            tags: ['phone', '5G', 'premium'],
            stores: [
              {
                id: '3',
                name: 'Digital World',
                location: 'Eastgate',
                lat: -26.1833,
                lng: 28.1167,
                owner_id: 'owner3',
                availability: 'Limited Stock',
                created_at: '2024-01-01T00:00:00Z',
                updated_at: '2024-01-01T00:00:00Z',
                coordinates: { lat: -26.1833, lng: 28.1167 }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: '3',
    name: 'Home & Garden',
    icon: 'Home',
    description: 'Decor and furniture for your home',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    subcategories: [
      {
        id: '4',
        name: 'Furniture',
        description: 'Sofas, beds, tables and more',
        category_id: '3',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
        products: [
          {
            id: '301',
            name: 'Modern Sofa',
            image: '/ai_product_images/Home_&_Living/Home_Decor.png',
            price: 9999.99,
            description: 'Stylish and comfortable sofa for your living room',
            category: 'Home & Garden',
            subcategory: 'Furniture',
            category_id: '3',
            subcategory_id: '4',
            vendor_id: 'vendor4',
            sku: 'MS-301',
            stock_quantity: 15,
            location: 'Fourways',
            area_name: 'Home Decor',
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
            tags: ['sofa', 'modern', 'furniture'],
            stores: [
              {
                id: '4',
                name: 'Home Decor',
                location: 'Fourways',
                lat: -26.0167,
                lng: 28.0167,
                owner_id: 'owner4',
                availability: 'In Stock',
                created_at: '2024-01-01T00:00:00Z',
                updated_at: '2024-01-01T00:00:00Z',
                coordinates: { lat: -26.0167, lng: 28.0167 }
              }
            ]
          }
        ]
      },
      {
        id: '5',
        name: 'Kitchenware',
        description: 'Cooking utensils and appliances',
        category_id: '3',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
        products: [
          {
            id: '302',
            name: 'Stainless Steel Frying Pan',
            image: '/ai_product_images/Home_and_Living/Kitchenware.png',
            price: 499.99,
            description: 'High-quality non-stick frying pan',
            category: 'Home & Garden',
            subcategory: 'Kitchenware',
            category_id: '3',
            subcategory_id: '5',
            vendor_id: 'vendor5',
            sku: 'SSFP-302',
            stock_quantity: 25,
            location: 'Northgate',
            area_name: 'Kitchen Essentials',
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
            tags: ['pan', 'stainless steel', 'kitchenware'],
            stores: [
              {
                id: '5',
                name: 'Kitchen Essentials',
                location: 'Northgate',
                lat: -26.1167,
                lng: 27.9667,
                owner_id: 'owner5',
                availability: 'In Stock',
                created_at: '2024-01-01T00:00:00Z',
                updated_at: '2024-01-01T00:00:00Z',
                coordinates: { lat: -26.1167, lng: 27.9667 }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: '4',
    name: 'Sports & Outdoors',
    icon: 'Football',
    description: 'Fitness gear and outdoor equipment',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    subcategories: [
      {
        id: '6',
        name: 'Fitness',
        description: 'Gym equipment and accessories',
        category_id: '4',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
        products: [
          {
            id: '401',
            name: 'Adjustable Dumbbells',
            image: '/ai_product_images/fitness.png',
            price: 299.99,
            description: 'High-quality adjustable dumbbells',
            category: 'Sports & Outdoors',
            subcategory: 'Fitness',
            category_id: '4',
            subcategory_id: '6',
            vendor_id: 'vendor6',
            sku: 'ADB-401',
            stock_quantity: 10,
            location: 'Cresta',
            area_name: 'Sports World',
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
            tags: ['dumbbells', 'fitness', 'adjustable'],
            stores: [
              {
                id: '6',
                name: 'Sports World',
                location: 'Cresta',
                lat: -26.1167,
                lng: 28.0167,
                owner_id: 'owner6',
                availability: 'In Stock',
                created_at: '2024-01-01T00:00:00Z',
                updated_at: '2024-01-01T00:00:00Z',
                coordinates: { lat: -26.1167, lng: 28.0167 }
              }
            ]
          }
        ]
      },
      {
        id: '7',
        name: 'Camping',
        description: 'Tents, sleeping bags, and more',
        category_id: '4',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
        products: [
          {
            id: '402',
            name: 'Waterproof Tent',
            image: '/ai_product_images/Sports_and_Outdoors/Camping_and_Hiking_Equipment.png',
            price: 1999.99,
            description: 'High-quality waterproof tent for camping',
            category: 'Sports & Outdoors',
            subcategory: 'Camping',
            category_id: '4',
            subcategory_id: '7',
            vendor_id: 'vendor7',
            sku: 'WT-402',
            stock_quantity: 5,
            location: 'Bryanston',
            area_name: 'Outdoor Adventures',
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
            tags: ['tent', 'waterproof', 'camping'],
            stores: [
              {
                id: '7',
                name: 'Outdoor Adventures',
                location: 'Bryanston',
                lat: -26.0667,
                lng: 28.0167,
                owner_id: 'owner7',
                availability: 'In Stock',
                created_at: '2024-01-01T00:00:00Z',
                updated_at: '2024-01-01T00:00:00Z',
                coordinates: { lat: -26.0667, lng: 28.0167 }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: '5',
    name: 'Health & Beauty',
    icon: 'Heart',
    description: 'Skincare, makeup, and wellness products',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    subcategories: [
      {
        id: '8',
        name: 'Skincare',
        description: 'Face creams, serums, and more',
        category_id: '5',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
        products: [
          {
            id: '501',
            name: 'Moisturizing Cream',
            image: '/ai_product_images/Health_and_Beauty/Skincare.png',
            price: 99.99,
            description: 'Nourishing moisturizing cream',
            category: 'Health & Beauty',
            subcategory: 'Skincare',
            category_id: '5',
            subcategory_id: '8',
            vendor_id: 'vendor8',
            sku: 'MC-501',
            stock_quantity: 20,
            location: 'Rosebank',
            area_name: 'Beauty Shop',
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
            tags: ['cream', 'moisturizing', 'skincare'],
            stores: [
              {
                id: '8',
                name: 'Beauty Shop',
                location: 'Rosebank',
                lat: -26.1167,
                lng: 28.0667,
                owner_id: 'owner8',
                availability: 'In Stock',
                created_at: '2024-01-01T00:00:00Z',
                updated_at: '2024-01-01T00:00:00Z',
                coordinates: { lat: -26.1167, lng: 28.0667 }
              }
            ]
          }
        ]
      },
      {
        id: '9',
        name: 'Makeup',
        description: 'Lipstick, eyeshadow, and more',
        category_id: '5',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
        products: [
          {
            id: '502',
            name: 'Lipstick Set',
            image: '/ai_product_images/Health_and_Beauty/Makeup.png',
            price: 199.99,
            description: 'Set of 6 lipsticks',
            category: 'Health & Beauty',
            subcategory: 'Makeup',
            category_id: '5',
            subcategory_id: '9',
            vendor_id: 'vendor9',
            sku: 'LS-502',
            stock_quantity: 15,
            location: 'Sandton',
            area_name: 'Makeup Studio',
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
            tags: ['lipstick', 'set', 'makeup'],
            stores: [
              {
                id: '9',
                name: 'Makeup Studio',
                location: 'Sandton',
                lat: -26.1067,
                lng: 28.0567,
                owner_id: 'owner9',
                availability: 'In Stock',
                created_at: '2024-01-01T00:00:00Z',
                updated_at: '2024-01-01T00:00:00Z',
                coordinates: { lat: -26.1067, lng: 28.0567 }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: '6',
    name: 'Baby & Kids',
    icon: 'Baby',
    description: 'Toys, clothing, and accessories for little ones',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    subcategories: [
      {
        id: '10',
        name: 'Toys',
        description: 'Action figures, dolls, and more',
        category_id: '6',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
        products: [
          {
            id: '601',
            name: 'Teddy Bear',
            image: '/ai_product_images/Baby_and_Kids/Toys_and_Games.png',
            price: 49.99,
            description: 'Cuddly teddy bear',
            category: 'Baby & Kids',
            subcategory: 'Toys',
            category_id: '6',
            subcategory_id: '10',
            vendor_id: 'vendor10',
            sku: 'TB-601',
            stock_quantity: 30,
            location: 'Northgate',
            area_name: 'Toy World',
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
            tags: ['teddy bear', 'toy', 'kids'],
            stores: [
              {
                id: '10',
                name: 'Toy World',
                location: 'Northgate',
                lat: -26.1167,
                lng: 27.9667,
                owner_id: 'owner10',
                availability: 'In Stock',
                created_at: '2024-01-01T00:00:00Z',
                updated_at: '2024-01-01T00:00:00Z',
                coordinates: { lat: -26.1167, lng: 27.9667 }
              }
            ]
          }
        ]
      },
      {
        id: '11',
        name: 'Clothing',
        description: "Kids clothing and accessories",
        category_id: '6',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
        products: [
          {
            id: '602',
            name: 'Onesie',
            image: '/ai_product_images/Baby_and_Kids/Clothing_and_Shoes.png',
            price: 29.99,
            description: 'Adorable onesie',
            category: 'Baby & Kids',
            subcategory: 'Clothing',
            category_id: '6',
            subcategory_id: '11',
            vendor_id: 'vendor11',
            sku: 'O-602',
            stock_quantity: 25,
            location: 'Clearwater',
            area_name: 'Kids Fashion',
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
            tags: ['onesie', 'clothing', 'kids'],
            stores: [
              {
                id: '11',
                name: 'Kids Fashion',
                location: 'Clearwater',
                lat: -26.1167,
                lng: 27.8667,
                owner_id: 'owner11',
                availability: 'In Stock',
                created_at: '2024-01-01T00:00:00Z',
                updated_at: '2024-01-01T00:00:00Z',
                coordinates: { lat: -26.1167, lng: 27.8667 }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: '7',
    name: 'Pet Care',
    icon: 'Pet',
    description: 'Pet food, toys, and accessories',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    subcategories: [
      {
        id: '12',
        name: 'Food',
        description: 'Pet food and nutrition',
        category_id: '7',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
        products: [
          {
            id: '701',
            name: 'Dry Dog Food',
            image: '/ai_product_images/Pets/Pet_Food.png',
            price: 49.99,
            description: 'High-quality dry dog food',
            category: 'Pet Care',
            subcategory: 'Food',
            category_id: '7',
            subcategory_id: '12',
            vendor_id: 'vendor12',
            sku: 'DDF-701',
            stock_quantity: 20,
            location: 'Fourways',
            area_name: 'Pet Shop',
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
            tags: ['dog food', 'dry', 'pet'],
            stores: [
              {
                id: '12',
                name: 'Pet Shop',
                location: 'Fourways',
                lat: -26.0167,
                lng: 28.0167,
                owner_id: 'owner12',
                availability: 'In Stock',
                created_at: '2024-01-01T00:00:00Z',
                updated_at: '2024-01-01T00:00:00Z',
                coordinates: { lat: -26.0167, lng: 28.0167 }
              }
            ]
          }
        ]
      },
      {
        id: '13',
        name: 'Toys',
        description: 'Pet toys and accessories',
        category_id: '7',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
        products: [
          {
            id: '702',
            name: 'Pet Ball',
            image: '/ai_product_images/Pets/Pet_Toys_and_Accessories.png',
            price: 29.99,
            description: 'Durable pet ball',
            category: 'Pet Care',
            subcategory: 'Toys',
            category_id: '7',
            subcategory_id: '13',
            vendor_id: 'vendor13',
            sku: 'PB-702',
            stock_quantity: 15,
            location: 'Northgate',
            area_name: 'Pet Play',
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
            tags: ['pet ball', 'toy', 'pet'],
            stores: [
              {
                id: '13',
                name: 'Pet Play',
                location: 'Northgate',
                lat: -26.1167,
                lng: 27.9667,
                owner_id: 'owner13',
                availability: 'In Stock',
                created_at: '2024-01-01T00:00:00Z',
                updated_at: '2024-01-01T00:00:00Z',
                coordinates: { lat: -26.1167, lng: 27.9667 }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: '8',
    name: 'Arts & Crafts',
    icon: 'Paintbrush',
    description: 'Paints, brushes, and creative supplies',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    subcategories: [
      {
        id: '14',
        name: 'Painting',
        description: 'Paints, brushes, and canvases',
        category_id: '8',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
        products: [
          {
            id: '801',
            name: 'Acrylic Paint Set',
            image: '/ai_product_images/Art_and_Crafts/Painting_Supplies.png',
            price: 99.99,
            description: 'High-quality acrylic paint set',
            category: 'Arts & Crafts',
            subcategory: 'Painting',
            category_id: '8',
            subcategory_id: '14',
            vendor_id: 'vendor14',
            sku: 'APS-801',
            stock_quantity: 10,
            location: 'Cresta',
            area_name: 'Art Supplies',
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
            tags: ['paint', 'acrylic', 'arts'],
            stores: [
              {
                id: '14',
                name: 'Art Supplies',
                location: 'Cresta',
                lat: -26.1167,
                lng: 28.0167,
                owner_id: 'owner14',
                availability: 'In Stock',
                created_at: '2024-01-01T00:00:00Z',
                updated_at: '2024-01-01T00:00:00Z',
                coordinates: { lat: -26.1167, lng: 28.0167 }
              }
            ]
          }
        ]
      },
      {
        id: '15',
        name: 'Crafts',
        description: 'Handmade jewelry, pottery, and more',
        category_id: '8',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
        products: [
          {
            id: '802',
            name: 'Jewelry Box',
            image: '/ai_product_images/Art_and_Crafts/Jewelry_and_Accessories.png',
            price: 199.99,
            description: 'Handmade jewelry box',
            category: 'Arts & Crafts',
            subcategory: 'Crafts',
            category_id: '8',
            subcategory_id: '15',
            vendor_id: 'vendor15',
            sku: 'JB-802',
            stock_quantity: 5,
            location: 'Bryanston',
            area_name: 'Craft Shop',
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
            tags: ['jewelry', 'box', 'crafts'],
            stores: [
              {
                id: '15',
                name: 'Craft Shop',
                location: 'Bryanston',
                lat: -26.0667,
                lng: 28.0167,
                owner_id: 'owner15',
                availability: 'In Stock',
                created_at: '2024-01-01T00:00:00Z',
                updated_at: '2024-01-01T00:00:00Z',
                coordinates: { lat: -26.0667, lng: 28.0167 }
              }
            ]
          }
        ]
      }
    ]
  }
];

// Add more categories following the same pattern...
