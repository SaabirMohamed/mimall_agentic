-- Create enum if it doesn't exist
DO $$ BEGIN
    CREATE TYPE availability_status AS ENUM ('In Stock', 'Out of Stock', 'Limited Stock');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create categories table if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'shop_categories') THEN
        CREATE TABLE shop_categories (
            id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            icon VARCHAR(255) NOT NULL,
            description TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    END IF;
END $$;

-- Create subcategories table if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'shop_subcategories') THEN
        CREATE TABLE shop_subcategories (
            id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
            category_id uuid REFERENCES shop_categories(id),
            name VARCHAR(255) NOT NULL,
            description TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(category_id, name)
        );
    END IF;
END $$;

-- Create stores table if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'shop_stores') THEN
        CREATE TABLE shop_stores (
            id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            location VARCHAR(255) NOT NULL,
            lat DOUBLE PRECISION NOT NULL,
            lng DOUBLE PRECISION NOT NULL,
            owner_id uuid REFERENCES auth.users(id),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    END IF;
END $$;

-- Create products table if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'shop_products') THEN
        CREATE TABLE shop_products (
            id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            image VARCHAR(255),
            price DECIMAL(10,2) NOT NULL,
            description TEXT,
            sku VARCHAR(255) UNIQUE,
            stock_quantity INTEGER NOT NULL DEFAULT 0,
            category_id uuid REFERENCES shop_categories(id),
            subcategory_id uuid REFERENCES shop_subcategories(id),
            vendor_id uuid REFERENCES auth.users(id),
            location VARCHAR(255),
            area_name VARCHAR(255),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    END IF;
END $$;

-- Create supporting tables if they don't exist
DO $$ 
BEGIN
    -- product_images
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'shop_product_images') THEN
        CREATE TABLE shop_product_images (
            id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
            product_id uuid REFERENCES shop_products(id),
            image_url VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    END IF;

    -- product_videos
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'shop_product_videos') THEN
        CREATE TABLE shop_product_videos (
            id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
            product_id uuid REFERENCES shop_products(id),
            video_url VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    END IF;

    -- product_tags
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'shop_product_tags') THEN
        CREATE TABLE shop_product_tags (
            id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
            product_id uuid REFERENCES shop_products(id),
            tag VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(product_id, tag)
        );
    END IF;

    -- product_stores
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'shop_product_stores') THEN
        CREATE TABLE shop_product_stores (
            id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
            product_id uuid REFERENCES shop_products(id),
            store_id uuid REFERENCES shop_stores(id),
            availability availability_status NOT NULL DEFAULT 'In Stock',
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(product_id, store_id)
        );
    END IF;
END $$;

-- Create or replace the updated_at function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers if they don't exist
DO $$ 
BEGIN
    -- categories
    IF NOT EXISTS (SELECT 1 FROM information_schema.triggers WHERE trigger_name = 'update_shop_categories_updated_at') THEN
        CREATE TRIGGER update_shop_categories_updated_at
            BEFORE UPDATE ON shop_categories
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
    END IF;

    -- subcategories
    IF NOT EXISTS (SELECT 1 FROM information_schema.triggers WHERE trigger_name = 'update_shop_subcategories_updated_at') THEN
        CREATE TRIGGER update_shop_subcategories_updated_at
            BEFORE UPDATE ON shop_subcategories
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
    END IF;

    -- products
    IF NOT EXISTS (SELECT 1 FROM information_schema.triggers WHERE trigger_name = 'update_shop_products_updated_at') THEN
        CREATE TRIGGER update_shop_products_updated_at
            BEFORE UPDATE ON shop_products
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
    END IF;

    -- stores
    IF NOT EXISTS (SELECT 1 FROM information_schema.triggers WHERE trigger_name = 'update_shop_stores_updated_at') THEN
        CREATE TRIGGER update_shop_stores_updated_at
            BEFORE UPDATE ON shop_stores
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
    END IF;

    -- product_stores
    IF NOT EXISTS (SELECT 1 FROM information_schema.triggers WHERE trigger_name = 'update_shop_product_stores_updated_at') THEN
        CREATE TRIGGER update_shop_product_stores_updated_at
            BEFORE UPDATE ON shop_product_stores
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;

-- Create indexes if they don't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_shop_products_category_id') THEN
        CREATE INDEX idx_shop_products_category_id ON shop_products(category_id);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_shop_products_subcategory_id') THEN
        CREATE INDEX idx_shop_products_subcategory_id ON shop_products(subcategory_id);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_shop_products_vendor_id') THEN
        CREATE INDEX idx_shop_products_vendor_id ON shop_products(vendor_id);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_shop_product_tags_product_id') THEN
        CREATE INDEX idx_shop_product_tags_product_id ON shop_product_tags(product_id);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_shop_product_stores_product_id') THEN
        CREATE INDEX idx_shop_product_stores_product_id ON shop_product_stores(product_id);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_shop_product_stores_store_id') THEN
        CREATE INDEX idx_shop_product_stores_store_id ON shop_product_stores(store_id);
    END IF;
END $$;
