import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pdsgafvukmroinlqrgyz.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Storage helper functions
export const uploadProductImage = async (file: File, productId: string): Promise<{ url: string; path: string }> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${productId}/${Date.now()}.${fileExt}`;
  const filePath = `products/${fileName}`;

  const { error } = await supabase.storage
    .from('resources')
    .upload(filePath, file);

  if (error) throw error;
  
  const { data: { publicUrl } } = await supabase.storage
    .from('resources')
    .getPublicUrl(filePath);

  return {
    url: publicUrl,
    path: filePath
  };
};

// Product types
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category_id: string;
  stock_quantity: number;
  status: 'draft' | 'published' | 'archived';
  metadata: {
    brand?: string;
    sku?: string;
    variants?: Array<{
      size: string;
      color: string;
    }>;
    ai_optimized?: boolean;
  };
  created_at: string;
  updated_at: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  storage_path: string;
  alt_text?: string;
  is_primary: boolean;
  display_order: number;
  created_at: string;
}
