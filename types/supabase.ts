export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      shop_categories: {
        Row: {
          id: string
          name: string
          icon: string
          description: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          icon: string
          description?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          icon?: string
          description?: string
          created_at?: string
          updated_at?: string
        }
      }
      shop_subcategories: {
        Row: {
          id: string
          category_id: string
          name: string
          description: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          category_id: string
          name: string
          description?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          category_id?: string
          name?: string
          description?: string
          created_at?: string
          updated_at?: string
        }
      }
      shop_products: {
        Row: {
          id: string
          name: string
          image: string
          price: number
          description: string | null
          sku: string
          stock_quantity: number
          category_id: string
          subcategory_id: string
          vendor_id: string
          location: string | null
          area_name: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          image: string
          price: number
          description?: string | null
          sku: string
          stock_quantity?: number
          category_id: string
          subcategory_id: string
          vendor_id: string
          location?: string | null
          area_name?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          image?: string
          price?: number
          description?: string | null
          sku?: string
          stock_quantity?: number
          category_id?: string
          subcategory_id?: string
          vendor_id?: string
          location?: string | null
          area_name?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      shop_stores: {
        Row: {
          id: string
          name: string
          location: string
          lat: number
          lng: number
          owner_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          location: string
          lat: number
          lng: number
          owner_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          location?: string
          lat?: number
          lng?: number
          owner_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      shop_product_images: {
        Row: {
          id: string
          product_id: string
          image_url: string
          created_at: string
        }
        Insert: {
          id?: string
          product_id: string
          image_url: string
          created_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          image_url?: string
          created_at?: string
        }
      }
      shop_product_videos: {
        Row: {
          id: string
          product_id: string
          video_url: string
          created_at: string
        }
        Insert: {
          id?: string
          product_id: string
          video_url: string
          created_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          video_url?: string
          created_at?: string
        }
      }
      shop_product_tags: {
        Row: {
          id: string
          product_id: string
          tag: string
          created_at: string
        }
        Insert: {
          id?: string
          product_id: string
          tag: string
          created_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          tag?: string
          created_at?: string
        }
      }
      shop_product_stores: {
        Row: {
          id: string
          product_id: string
          store_id: string
          availability: 'In Stock' | 'Out of Stock' | 'Limited Stock'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          product_id: string
          store_id: string
          availability?: 'In Stock' | 'Out of Stock' | 'Limited Stock'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          store_id?: string
          availability?: 'In Stock' | 'Out of Stock' | 'Limited Stock'
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
