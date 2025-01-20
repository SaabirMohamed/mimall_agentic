import { categories } from './categories';

// Helper function to get all unique store locations
export const getAllStoreLocations = () => {
  const locations = new Set<string>();
  categories.forEach(category => {
    if (category.subcategories) {
      category.subcategories.forEach(subcategory => 
        subcategory.products?.forEach(product => 
          product.stores.forEach(store => 
            locations.add(store.location)
          )
        )
      );
    }
  });
  return Array.from(locations);
};

// Helper function to get price range
export const getPriceRange = () => {
  let min = Infinity;
  let max = -Infinity;
  
  categories.forEach(category => {
    if (category.subcategories) {
      category.subcategories.forEach(subcategory => 
        subcategory.products?.forEach(product => {
          min = Math.min(min, product.price);
          max = Math.max(max, product.price);
        })
      );
    }
  });
  
  return { min, max };
};
