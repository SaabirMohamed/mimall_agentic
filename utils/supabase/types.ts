import { Database } from '@/types/supabase'

export type Tables = Database['public']['Tables']

// Categories
export type CategoryRow = Tables['shop_categories']['Row']
export type CategoryInsert = Tables['shop_categories']['Insert']
export type CategoryUpdate = Tables['shop_categories']['Update']

// Subcategories
export type SubcategoryRow = Tables['shop_subcategories']['Row']
export type SubcategoryInsert = Tables['shop_subcategories']['Insert']
export type SubcategoryUpdate = Tables['shop_subcategories']['Update']

// Products
export type ProductRow = Tables['shop_products']['Row']
export type ProductInsert = Tables['shop_products']['Insert']
export type ProductUpdate = Tables['shop_products']['Update']

// Stores
export type StoreRow = Tables['shop_stores']['Row']
export type StoreInsert = Tables['shop_stores']['Insert']
export type StoreUpdate = Tables['shop_stores']['Update']

// Product Images
export type ProductImageRow = Tables['shop_product_images']['Row']
export type ProductImageInsert = Tables['shop_product_images']['Insert']
export type ProductImageUpdate = Tables['shop_product_images']['Update']

// Product Videos
export type ProductVideoRow = Tables['shop_product_videos']['Row']
export type ProductVideoInsert = Tables['shop_product_videos']['Insert']
export type ProductVideoUpdate = Tables['shop_product_videos']['Update']

// Product Tags
export type ProductTagRow = Tables['shop_product_tags']['Row']
export type ProductTagInsert = Tables['shop_product_tags']['Insert']
export type ProductTagUpdate = Tables['shop_product_tags']['Update']

// Product Stores
export type ProductStoreRow = Tables['shop_product_stores']['Row']
export type ProductStoreInsert = Tables['shop_product_stores']['Insert']
export type ProductStoreUpdate = Tables['shop_product_stores']['Update']
