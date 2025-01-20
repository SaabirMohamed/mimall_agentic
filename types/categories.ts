export interface Store {
  id: string;  // UUID
  name: string;
  location: string;
  lat: number;
  lng: number;
  owner_id: string;  // UUID reference to auth.users
  availability: 'In Stock' | 'Out of Stock' | 'Limited Stock';
  created_at: string;  // ISO timestamp
  updated_at: string;
  coordinates: { lat: number; lng: number };  // ISO timestamp
}

export interface Product {
  id: string;  // UUID
  name: string;
  image: string;
  price: number;
  category: string;
  subcategory: string;
  description: string | null;
  sku: string;
  stock_quantity: number;
  category_id: string;  // UUID reference to categories
  subcategory_id: string;  // UUID reference to subcategories
  vendor_id: string;  // UUID reference to auth.users
  location: string | null;
  area_name: string | null;
  created_at: string;  // ISO timestamp
  updated_at: string;  // ISO timestamp
  stores: Store[];  // Add stores array property
  // Virtual fields from joins
  tags?: string[];
  images?: { image_url: string }[];
  videos?: string[];
}

export interface Subcategory {
  id: string;  // UUID
  category_id: string;  // UUID reference to categories
  name: string;
  description: string;
  created_at: string;  // ISO timestamp
  updated_at: string;  // ISO timestamp
  // Virtual field from joins
  products?: Product[];
}

export interface Category {
  id: string;  // UUID
  name: string;
  icon: string;
  description: string;
  created_at?: string;  // ISO timestamp
  updated_at?: string;  // ISO timestamp
  subcategories?: Subcategory[];
}

// Database table types (match exactly with Supabase schema)
export interface DbCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface DbSubcategory {
  id: string;
  category_id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface DbProduct {
  id: string;
  name: string;
  image: string;
  price: number;
  description: string | null;
  sku: string;
  stock_quantity: number;
  category_id: string;
  subcategory_id: string;
  vendor_id: string;
  location: string | null;
  area_name: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbStore {
  id: string;
  name: string;
  location: string;
  lat: number;
  lng: number;
  owner_id: string;
  created_at: string;
  updated_at: string;
}

export interface DbProductImage {
  id: string;
  product_id: string;
  image_url: string;
  created_at: string;
}

export interface DbProductVideo {
  id: string;
  product_id: string;
  video_url: string;
  created_at: string;
}

export interface DbProductTag {
  id: string;
  product_id: string;
  tag: string;
  created_at: string;
}

export interface DbProductStore {
  id: string;
  product_id: string;
  store_id: string;
  availability: 'In Stock' | 'Out of Stock' | 'Limited Stock';
  created_at: string;
  updated_at: string;
}
