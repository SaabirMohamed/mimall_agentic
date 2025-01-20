export interface Store {
  id: number;
  name: string;
  location: string;
  coordinates: { lat: number; lng: number };
  availability: string;
}

export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
  category: string;
  subcategory: string;
  stores: Store[];
  tags: string[];
}

export interface Subcategory {
  name: string;
  description: string;
  products: Product[];
}

export interface Category {
  id: number;
  name: string;
  icon: string;
  description: string;
  subcategories: Subcategory[];
}
