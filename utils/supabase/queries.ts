import { createClient } from './client'
import { CategoryRow, SubcategoryRow, ProductRow, StoreRow } from './types'

const supabase = createClient()

export async function getCategories() {
  const { data, error } = await supabase
    .from('shop_categories')
    .select(`
      *,
      subcategories:shop_subcategories(
        *,
        products:shop_products(
          *,
          stores:shop_product_stores(
            store:shop_stores(*)
          ),
          tags:shop_product_tags(tag),
          images:shop_product_images(image_url),
          videos:shop_product_videos(video_url)
        )
      )
    `)
    .order('name')

  if (error) throw error
  return data
}

export async function getCategory(id: string) {
  const { data, error } = await supabase
    .from('shop_categories')
    .select(`
      *,
      subcategories:shop_subcategories(
        *,
        products:shop_products(
          *,
          stores:shop_product_stores(
            store:shop_stores(*)
          ),
          tags:shop_product_tags(tag),
          images:shop_product_images(image_url),
          videos:shop_product_videos(video_url)
        )
      )
    `)
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export async function getProduct(id: string) {
  const { data, error } = await supabase
    .from('shop_products')
    .select(`
      *,
      category:shop_categories(*),
      subcategory:shop_subcategories(*),
      stores:shop_product_stores(
        store:shop_stores(*)
      ),
      tags:shop_product_tags(tag),
      images:shop_product_images(image_url),
      videos:shop_product_videos(video_url)
    `)
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export async function searchProducts(query: string) {
  const { data, error } = await supabase
    .from('shop_products')
    .select(`
      *,
      category:shop_categories(*),
      subcategory:shop_subcategories(*),
      stores:shop_product_stores(
        store:shop_stores(*)
      ),
      tags:shop_product_tags(tag),
      images:shop_product_images(image_url),
      videos:shop_product_videos(video_url)
    `)
    .textSearch('name', query)
    .order('name')

  if (error) throw error
  return data
}

export async function getStores() {
  const { data, error } = await supabase
    .from('shop_stores')
    .select('*')
    .order('name')

  if (error) throw error
  return data
}

export async function getStore(id: string) {
  const { data, error } = await supabase
    .from('shop_stores')
    .select(`
      *,
      products:shop_product_stores(
        product:shop_products(
          *,
          category:shop_categories(*),
          subcategory:shop_subcategories(*),
          tags:shop_product_tags(tag),
          images:shop_product_images(image_url),
          videos:shop_product_videos(video_url)
        )
      )
    `)
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}
