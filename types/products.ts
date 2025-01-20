export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
  subcategory: string;
  tags: string[];
  description: string;
  category_id: string;
  subcategory_id: string;
  vendor_id: string;
  sku: string;
  stock_quantity: number;
  location: string;
  area_name: string;
  created_at: string;
  updated_at?: string;
}
