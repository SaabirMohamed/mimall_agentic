-- Insert sample categories
INSERT INTO shop_categories (id, name, icon, description)
VALUES 
  ('c1', 'Electronics', 'computer', 'Electronic devices and accessories'),
  ('c2', 'Clothing', 'checkroom', 'Fashion and apparel'),
  ('c3', 'Furniture', 'chair', 'Home and office furniture'),
  ('c4', 'Books', 'menu_book', 'Books and publications');

-- Insert sample subcategories
INSERT INTO shop_subcategories (id, category_id, name, description)
VALUES
  ('s1', 'c1', 'Smartphones', 'Mobile phones and accessories'),
  ('s2', 'c1', 'Laptops', 'Notebooks and accessories'),
  ('s3', 'c2', 'Men''s Clothing', 'Men''s fashion and accessories'),
  ('s4', 'c2', 'Women''s Clothing', 'Women''s fashion and accessories'),
  ('s5', 'c3', 'Living Room', 'Living room furniture'),
  ('s6', 'c3', 'Bedroom', 'Bedroom furniture'),
  ('s7', 'c4', 'Fiction', 'Fiction books'),
  ('s8', 'c4', 'Non-Fiction', 'Non-fiction books');

-- Insert sample stores
INSERT INTO shop_stores (id, name, location, lat, lng, owner_id)
VALUES
  ('st1', 'TechHub', 'Mall of Africa', -26.0167, 28.1167, 'user1'),
  ('st2', 'Fashion World', 'Sandton City', -26.1067, 28.0567, 'user2');

-- Insert sample products
INSERT INTO shop_products (id, name, image, price, description, sku, stock_quantity, category_id, subcategory_id, vendor_id, location, area_name)
VALUES
  ('p1', 'iPhone 13', '/images/iphone13.jpg', 999.99, 'Latest iPhone model', 'IPHONE13-128GB', 50, 'c1', 's1', 'vendor1', 'Johannesburg', 'Sandton'),
  ('p2', 'MacBook Pro', '/images/macbook.jpg', 1299.99, 'Latest MacBook model', 'MACBOOK-PRO-M1', 30, 'c1', 's2', 'vendor1', 'Johannesburg', 'Sandton');

-- Insert sample product images
INSERT INTO shop_product_images (id, product_id, image_url)
VALUES
  ('img1', 'p1', '/images/iphone13-1.jpg'),
  ('img2', 'p1', '/images/iphone13-2.jpg'),
  ('img3', 'p2', '/images/macbook-1.jpg');

-- Insert sample product videos
INSERT INTO shop_product_videos (id, product_id, video_url)
VALUES
  ('vid1', 'p1', '/videos/iphone13-preview.mp4'),
  ('vid2', 'p2', '/videos/macbook-preview.mp4');

-- Insert sample product tags
INSERT INTO shop_product_tags (id, product_id, tag)
VALUES
  ('t1', 'p1', 'smartphone'),
  ('t2', 'p1', 'apple'),
  ('t3', 'p2', 'laptop'),
  ('t4', 'p2', 'apple');

-- Insert sample product-store relationships
INSERT INTO shop_product_stores (id, product_id, store_id, availability)
VALUES
  ('ps1', 'p1', 'st1', 'In Stock'),
  ('ps2', 'p2', 'st1', 'In Stock'),
  ('ps3', 'p1', 'st2', 'Limited Stock');
