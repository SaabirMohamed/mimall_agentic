export interface ImageMapping {
  oldPath: string;
  newPath: string;
  category: string;
  name: string;
  price: number;
}

export const imagePathMappings: ImageMapping[] = [
  // Fashion & Apparel
  {
    oldPath: '/ai_product_images/Fashion_&_Apparel/Men\'s_Clothing.png',
    newPath: '/ai_product_images/Fashion/mens_clothing.png',
    category: 'Fashion',
    name: 'Men\'s Clothing',
    price: 0
  },
  {
    oldPath: '/ai_product_images/Fashion_&_Apparel/Women\'s_Clothing.png',
    newPath: '/ai_product_images/Fashion/womens_clothing.png',
    category: 'Fashion',
    name: 'Women\'s Clothing',
    price: 0
  },
  {
    oldPath: '/ai_product_images/Fashion_&_Apparel/Kids\'_Clothing.png',
    newPath: '/ai_product_images/Fashion/kids_clothing.png',
    category: 'Fashion',
    name: 'Kids\' Clothing',
    price: 0
  },
  {
    oldPath: '/ai_product_images/Fashion_&_Apparel/Activewear.png',
    newPath: '/ai_product_images/Fashion/activewear.png',
    category: 'Fashion',
    name: 'Activewear',
    price: 0
  },
  {
    oldPath: '/ai_product_images/Fashion_&_Apparel/Outerwear_(Jackets.png',
    newPath: '/ai_product_images/Fashion/outerwear.png',
    category: 'Fashion',
    name: 'Outerwear',
    price: 0
  },
  {
    oldPath: '/ai_product_images/Fashion_&_Apparel/Handbags.png',
    newPath: '/ai_product_images/Fashion/handbags.png',
    category: 'Fashion',
    name: 'Handbags',
    price: 0
  },
  {
    oldPath: '/ai_product_images/Fashion_&_Apparel/Accessories_(Jewelry.png',
    newPath: '/ai_product_images/Fashion/accessories.png',
    category: 'Fashion',
    name: 'Accessories',
    price: 0
  },
  {
    oldPath: '/ai_product_images/Fashion_&_Apparel/Watches.png',
    newPath: '/ai_product_images/Fashion/watches.png',
    category: 'Fashion',
    name: 'Watches',
    price: 0
  },
  
  // Electronics
  {
    oldPath: '/ai_product_images/Electronics/mobile_phones.png',
    newPath: '/ai_product_images/Electronics/mobile_phones.png',
    category: 'Electronics',
    name: 'Mobile Phones',
    price: 0
  },
  {
    oldPath: '/ai_product_images/Electronics/laptops.png',
    newPath: '/ai_product_images/Electronics/laptops.png',
    category: 'Electronics',
    name: 'Laptops',
    price: 0
  },
  {
    oldPath: '/ai_product_images/Electronics/gaming.png',
    newPath: '/ai_product_images/Electronics/gaming.png',
    category: 'Electronics',
    name: 'Gaming',
    price: 0
  },
  {
    oldPath: '/ai_product_images/Electronics/speakers.png',
    newPath: '/ai_product_images/Electronics/speakers.png',
    category: 'Electronics',
    name: 'Speakers',
    price: 0
  },
  {
    oldPath: '/ai_product_images/Electronics/tv_and_entertainment.png',
    newPath: '/ai_product_images/Electronics/tv_and_entertainment.png',
    category: 'Electronics',
    name: 'TV & Entertainment',
    price: 0
  },
  
  // Health & Beauty
  {
    oldPath: '/ai_product_images/Health_&_Beauty/Skincare.png',
    newPath: '/ai_product_images/health_and_beauty/skincare.png',
    category: 'Health & Beauty',
    name: 'Skincare',
    price: 0
  },
  {
    oldPath: '/ai_product_images/Health_&_Beauty/Makeup.png',
    newPath: '/ai_product_images/health_and_beauty/makeup.png',
    category: 'Health & Beauty',
    name: 'Makeup',
    price: 0
  },
  {
    oldPath: '/ai_product_images/Health_&_Beauty/Haircare.png',
    newPath: '/ai_product_images/health_and_beauty/haircare.png',
    category: 'Health & Beauty',
    name: 'Haircare',
    price: 0
  },
  {
    oldPath: '/ai_product_images/Health_&_Beauty/Fragrances.png',
    newPath: '/ai_product_images/health_and_beauty/fragrances.png',
    category: 'Health & Beauty',
    name: 'Fragrances',
    price: 0
  }
];

export function getNewImagePath(oldPath: string): string {
  const mapping = imagePathMappings.find(m => m.oldPath === oldPath);
  return mapping ? mapping.newPath : oldPath;
}

export function getAllImagePaths(): ImageMapping[] {
  return imagePathMappings;
}
