import type { WishlistItem } from '@/features/wishlist/types/wishlist.types'
import { products } from '@/features/products/data/products'

export const wishlistItems: WishlistItem[] = products
  .slice(0, 6)
  .map((product, index) => ({
    id: `wishlist-${product.id}`,
    product,
    addedAt: Date.now() - index * 24 * 60 * 60 * 1000,
  }))