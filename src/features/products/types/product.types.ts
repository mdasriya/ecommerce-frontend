export type ProductBadge = 'new' | 'bestseller' | 'sale' | 'curators-pick'

export interface Product {
  id: number
  name: string
  slug: string
  price: number
  originalPrice?: number
  category: string
  categorySlug: string
  image: string
  rating: number
  reviewCount: number
  isFeatured: boolean
  isNew: boolean
  /** Filter group, e.g. "Gold Vermeil" */
  material?: string
  /** Filter group, e.g. "Hoops" (shown as "Silhouette" in the UI) */
  style?: string
  /** Short spec shown on the card, e.g. "18k Vermeil" */
  finish?: string
  inStock?: boolean
  badge?: ProductBadge
}

export interface ProductFilters {
  materials: string[]
  styles: string[]
  minPrice: number
  maxPrice: number
  inStockOnly: boolean
}

export interface FilterOption {
  value: string
  count: number
}

export type ProductSortOption =
  | 'recommended'
  | 'newest'
  | 'price-asc'
  | 'price-desc'
  | 'bestselling'
